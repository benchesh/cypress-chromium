# cypress-chromium

This node module provides an easy way to install and use the Chromium browser in a Cypress project. Chromium comes bundled with this module.

## Prerequisites

- [node 18 or above](https://nodejs.org/en/download)
- A [Cypress](https://www.npmjs.com/package/cypress) project (tested on version `13.7`)

## Usage

Simply import this module into your Cypress config like so, and Chromium will be added to the array of browsers:

```javascript
// cypress.config.ts

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-chromium')(config);
      
      return config;
    },
    // ...
  }
});
```

## Parameters

| Name                       | Type    | Default value | Description                                           |
| -------------------------- | ------- | ------------- | ----------------------------------------------------- |
| `config`                   | object  | null          | Cypress config object                                 |
| `errorIfChromiumIsMissing` | boolean | false         | If `true`, throw an error if Chromium can't be found. |
