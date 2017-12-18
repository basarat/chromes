# Chromes
A simple and typesafe chrome automation library 🌹

> Ships with TypeScript definitions ❤️

## Install
```js
npm install puppeteer @types/puppeteer chromes -D
```

## Useage
```js
import * as chs from 'chromes';
```

### FAQ 
* `error while loading shared libraries: libXss.so.1`. Will not happen on any OS you use for dev. A common error in many build servers. Solution is to run command specific to your OS. e.g. 
  * Fedora: `pkcon install libXScrnSaver` 
  * CentOS: `sudo yum install libXScrnSaver`

## Docs 
* https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
