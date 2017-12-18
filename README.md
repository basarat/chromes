# Chromes
A simple and typesafe chrome automation library 🌹

> Ships with TypeScript definitions ❤️

This is just a convinience wrapper around `puppeteer` to standardize common patterns used for testing. 

## Install
```js
npm install puppeteer @types/puppeteer chromes -D
```

## Usage
```js
import * as chs from 'chromes';

chs.launch().then(async ({browser, page}) => {
  // Use puppeteer's browser / page objects. 
});
```

### FAQ 
* `error while loading shared libraries: libXss.so.1`. Will not happen on any OS you use for dev. Sadly a common error in many (locked down) build servers. Solution is to run command specific to your OS. e.g. 
  * Fedora: `pkcon install libXScrnSaver` 
  * Debian: `sudo apt-get install libxss1`
  * CentOS / Redhat: `sudo yum install libXScrnSaver -y`

### Puppeter Docs 
* https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
