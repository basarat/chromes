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