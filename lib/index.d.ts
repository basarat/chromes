export interface LaunchOptions {
  /** @default false */
  ignoreHTTPSErrors?: boolean,

  /** @default true */
  headless?: boolean,

  /** 
   * Path to a Chromium executable to run instead of bundled Chromium. If executablePath is a relative path, then it is resolved relative to current working directory 
   * 
   * Puppeteer works best with the version of Chromium it is bundled with. 
   * There is no guarantee it will work with any other version. 
   * Use `executablePath` option with extreme caution.  
   * If Google Chrome (rather than Chromium) is preferred, 
   *  - a [Chrome Canary](https://www.google.com/chrome/browser/canary.html) 
   *  - or [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) build is suggested.
   */
  executablePath?: string,

  /** Slows down Puppeteer operations by the specified amount of milliseconds. Useful so that you can see what is going on. */
  slowMo?: number,

  /** Additional arguments to pass to the Chromium instance. List of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/) */
  args?: string[],

  /** Close chrome process on Ctrl-C. Defaults to `true`. */
  handleSIGINT?: boolean,

  /** Maximum time in milliseconds to wait for the Chrome instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. */
  timeout?: number,

  /** Whether to pipe browser process stdout and stderr into `process.stdout` and `process.stderr`. Defaults to `false`. */
  dumpio?: boolean,

  /** Path to a [User Data Directory](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md) */
  userDataDir?: string,
}

/**
 * The method launches a browser instance with given arguments. The browser will be closed when the parent node.js process is closed.
 */
export function launch(options?: LaunchOptions): Promise<Browser>;

/** 
 * A Browser is created when Puppeteer connects to a Chromium instance, 
 * either through `launch`
 * or `connect`
 */
export class Browser {
  /** Closes browser with all the pages (if any were opened). The browser object itself is considered to be disposed and could not be used anymore. */
  close(): void
  /**
   * Creates a new page
   */
  newPage(): Promise<Page>
  /**
   * For headless Chromium, this is similar to `HeadlessChrome/61.0.3153.0`. 
   * For non-headless, this is similar to `Chrome/61.0.3153.0`.
   * 
   * NOTE: the format of browser.version() might change with future releases of Chromium.
   */
  version(): string

  /** 
   * Browser websocket url.
   * It could be used as an argument to `connect`
   */
  wsEndpoint(): string
}

export type NavigationOptions = {
  /** Maximum navigation time in milliseconds, defaults to 30 seconds. */
  timeout?: number
  /** When to consider a navigation finished, defaults to `load`. */
  waitUntil?:
  /** consider navigation to be finished when the `load` event is fired. */
  | 'load'
  /** consider navigation to be finished when the network activity stays "idle" for at least `networkIdleTimeout` ms. */
  | 'networkidle'
  /** Maximum amount of inflight requests which are considered "idle". Takes effect only with `waitUntil: 'networkidle'` parameter. */
  networkIdleInflight?: number
  /** A timeout to wait before completing navigation. Takes effect only with `waitUntil: 'networkidle'` parameter. */
  networkIdleTimeout?: number
}

/** 
 * Page provides methods to interact with a single tab in Chromium.
 * One `Browser` instance might have multiple `Page` instances.
 */
export class Page {
  /**
   * Emitted when JavaScript within the page calls one of console API methods, 
   * e.g. `console.log` or `console.dir`. 
   * Also emitted if the page throws an error or a warning.
   * The arguments passed into `console.log` appear as arguments on the event handler.
   */
  on(event: 'console', cb: (...args: any[]) => any): void
  /**
   * Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. 
   * You can respond to the dialog via [Dialog]'s [accept](#dialogacceptprompttext) or [dismiss](#dialogdismiss) methods
   */
  on(event: 'dialog', cb: (dialog: Dialog) => any): void
  /** 
   * Emitted when the page crashes.
   * **NOTE** `error` event has a special meaning in Node, see [error events](https://nodejs.org/api/events.html#events_error_events) for details. 
   */
  on(event: 'error', cb: (e: Error) => any): void
  /**
   * Emitted when a frame is attached.
   */
  on(event: 'frameattached', cb: (e: Frame) => any): void
  /**
   * Emitted when a frame is detached.
   */
  on(event: 'framedetached', cb: (e: Frame) => any): void
  /**
   * Emitted when a frame is navigated to a new url.
   */
  on(event: 'framenavigated', cb: (e: Frame) => any): void
  /**
   * Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.
   */
  on(event: 'load', cb: () => any): void
  /** 
   * Emitted when an uncaught exception happens within the page.
   */
  on(event: 'pageerror', cb: (errorMessage: string) => any): void
  /**
   * Emitted when a page issues a request. 
   * The [request] object is read-only.
   * In order to intercept and mutate requests, see `page.setRequestInterceptionEnabled`.
   */
  on(event: 'request', cb: (req: Request) => any): void
  /**
   * Emitted when a request fails, for example by timing out.
   */
  on(event: 'requestfailed', cb: (req: Request) => any): void
  /**
   * Emitted when a request finishes successfully.
   */
  on(event: 'requestfinished', cb: (req: Request) => any): void
  /**
   * Emitted when a [response] is received.
   */
  on(event: 'response', cb: (req: Response) => any): void

  /**
   * The method runs `document.querySelector` within the page. If no element matches the selector, the return value resolve to `null`.
   */
  $(selector: string): Promise<ElementHandle | null>

  /**
   * The method runs `document.querySelectorAll` within the page. If no elements match the selector, the return value resolve to `[]`.
   */
  $$(selector: string): Promise<ElementHandle[]>

  /**
   * This method runs `document.querySelector` within the page and passes it as the first argument to `pageFunction`. 
   * If there's no element matching `selector`, the method throws an error
   */
  $eval<T>(selector: string, pageFunction: (e: Node) => T, ...args: any[]): Promise<T>

  /**
   * Adds a `<script>` tag into the page with the desired url. 
   * @returns resolves when the scripts `onload` fires.
   * Alternatively, a local JavaScript file could be injected via [`page.injectFile`](#pageinjectfilefilepath) method.
   */
  addScriptTag(url: string): Promise<void>

  /**
   * This method fetches an element with `selector`, 
   * scrolls it into view if needed, 
   * and then uses [page.mouse](#pagemouse) to click in the center of the element.
   * If there's no element matching `selector`, the method throws an error.
   */
  click(selector: string, options?: {
    button?: 'left' | 'right' | 'middle',
    clickCount?: number,
    /** Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0. */
    delay?: number,
  }): Promise<void>

  close(): Promise<void>

  /** Gets the full HTML contents of the page, including the doctype. */
  content(): Promise<string>

  /**
   * 
   * @param urls If no URLs are specified, this method returns cookies for the current page URL.
If URLs are specified, only cookies for those URLs are returned.
   */
  cookies(...urls: string[]): Promise<{
    name: string,
    value: string,
    domain: string,
    path: string,
    expires: number,
    httpOnly: boolean,
    secure: boolean,
    sameSite: 'Strict' | 'Lax'
  }[]>

  deleteCookie(...cookies: {
    name: string,
    url?: string,
    domain?: string,
    path?: string,
    secure?: boolean,
  }[]): Promise<void>

  /** 
   * Emulates given device metrics and user agent. 
   * This method is a shortcut for calling two methods: 
   * - setViewport
   * - setUserAgent
   **/
  emulate(options: {
    viewport?: {
      /** page width in pixels */
      width?: number
      /** page height in pixels */
      height?: number
      /** Specify device scale factor (could be thought of as dpr). Defaults to `1`. */
      deviceScaleFactor?: number

      isMobile?: boolean,
      hasTouch?: boolean,
      isLandscape?: boolean,
    },
    userAgent?: string
  }): Promise<void>

  /** 
   * Changes the CSS media type of the page. 
   * Passing `null` disables media emulation.
   */
  emulateMedia(mediaType: 'screen' | 'print' | null): Promise<void>

  /** 
   * Function to be evaluated in the page context
   */
  evaluate<T>(pageFunction: () => T, ...args: any[]): T
  evaluate(str: string, ...args: any[]): any

  evaluateOnNewDocument(pageFunction: () => any, ...args: any[]): Promise<void>;

  /**
   * The method adds a function called `name` on the page's `window` object.
   * When called, the function executes `puppeteerFunction` in node.js and returns a [Promise] which resolves to the return value of `puppeteerFunction`.
   */
  exposeFunction(name: string, puppeteerFunction: () => any): Promise<void>;

  /**
   * A [selector] of an element to focus. 
   * If there are multiple elements satisfying the selector, the first will be focused.
   * If there's no element matching `selector`, the method throws an error.
   */
  focus(selector: string): Promise<void>;

  /** An array of all frames attached to the page */
  frames(): Frame[];

  /**
   * Navigate to the previous page in history.
   * 
   * @returns Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go back, resolves to null.
   */
  goBack(options?: NavigationOptions): Promise<Response | null>;
  /**
   * Navigate to the next page in history.
   * 
   * @returns Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go forward, resolves to null.
   */
  goForward(options?: NavigationOptions): Promise<Response | null>;

  /**
   * `goto` will throw an error if:
   * - there's an SSL error (e.g. in case of self-signed certificates).
   * - target URL is invalid.
   * - the `timeout` is exceeded during navigation.
   * - the main resource failed to load.
   * 
   * @returns Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.
   */
  goto(url: string, options?: NavigationOptions): Promise<Response>

  /** 
   * This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to hover over the center of the element.
If there's no element matching `selector`, the method throws an error.
   * @param selector to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered.
   * @returns Promise which resolves when the element matching `selector` is successfully hovered. Promise gets rejected if there's no element matching `selector`.
   */
  hover(selector: string): Promise<void>

  /**
   * @param filePath Path to the JavaScript file to be injected into frame. If `filePath` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd)
   * @returns Promise which resolves when file gets successfully evaluated in frame.
   */
  injectFile(filePath: string): Promise<void>

  keyboard: Keyboard

  /** Page is guaranteed to have a main frame which persists during navigations. */
  mainFrame(): Frame

  mouse: Mouse

  /**
   * **NOTE** Generating a pdf is currently only supported in Chrome headless.
   * 
   * `page.pdf()` generates a pdf of the page with `print` css media. To generate a pdf with `screen` media, call [page.emulateMedia('screen')](#pageemulatemediamediatype) before calling `page.pdf()`
   * 
   */
  pdf(options?: {
    /** The file path to save the PDF to. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the PDF won't be saved to the disk. */
    path?: string,
    /**  Scale of the webpage rendering. Defaults to `1`. */
    scale?: number,
    /**  Display header and footer. Defaults to `false`. */
    displayHeaderFooter?: boolean,
    /** 
     * Print background graphics. Defaults to `false`.
     **/
    printBackground?: boolean,
    /** 
     * Paper orientation. Defaults to `false`. 
     **/
    landscape?: boolean,
    /** 
     * Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages. 
     **/
    pageRanges?: string,
    /** 
     * Paper format.
     * If set, takes priority over`width` or`height` options.
     * Defaults to 'Letter'. */
    format?:
    | 'Letter'
    | 'Legal'
    | 'Tabloid'
    | 'Ledger'
    | 'A0'
    | 'A1'
    | 'A2'
    | 'A3'
    | 'A4'
    | 'A5'
    /** Paper width, accepts values labeled with units. */
    width?: string,
    /** Paper height, accepts values labeled with units. */
    height?: string,
    /** 
     * Paper margins, defaults to none.
     * For each sub prop example values: 
     *  100 
     *  '100px'
     *  '100in'
     *  '100cm'
     *  '100mm'
     */
    margin?: {
      /** Top margin, accepts values labeled with units. */
      top?: number | string,
      /** Right margin, accepts values labeled with units. */
      right?: number | string,
      /** Bottom margin, accepts values labeled with units. */
      bottom?: number | string,
      /** Left margin, accepts values labeled with units. */
      left?: number | string,
    }
  }): Promise<Buffer>

  /** 
   * Returns page's inner text.
   */
  plainText(): Promise<string>

  /**
   * Shortcut for `keyboard.down` and `keyboard.up`
   * @param key Name of key to press, such as `ArrowLeft`. See [KeyboardEvent.key](https://www.w3.org/TR/uievents-key/)
   */
  press(
    key: string,
    options?: {
      /** If specified, generates an input event with this text. */
      text?: string,
      /** Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0. */
      delay?: number
    }
  ): Promise<void>

  /** 
   * @returns Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.
   */
  reload(options?: NavigationOptions): Promise<Response>
}

export class Dialog {

}

export class Frame {

}

export class Request {

}

export class Response {

}

export class ElementHandle {

}

export class Keyboard {

}

export class Mouse {

}