# Chromes

[![Greenkeeper badge](https://badges.greenkeeper.io/basarat/chromes.svg)](https://greenkeeper.io/)

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

### Puppeter Docs 
* https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
