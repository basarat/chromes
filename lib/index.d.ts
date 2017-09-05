export function launch(options?: {
  /** @default false */
  ignoreHTTPSErrors?: boolean,

  /** @default true */
  headless?: boolean,

  /** Path to a Chromium executable to run instead of bundled Chromium. If executablePath is a relative path, then it is resolved relative to current working directory */
  executablePath?: string,

  /** Slows down Puppeteer operations by the specified amount of milliseconds. Useful so that you can see what is going on. */
  slowMo?: number
  
}): Promise<Browser>;

export class Browser { }