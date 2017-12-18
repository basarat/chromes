import * as pup from 'puppeteer';

export async function launch(options?: pup.LaunchOptions): Promise<{
  page: pup.Page,
  browser: pup.Browser,
}> {
  const browser = await pup.launch(options);
  const page = (await browser.pages())[0];
  return { browser, page };
}
