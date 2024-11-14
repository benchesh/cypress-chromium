const { path: chromiumPath } = require('chromium');
const { execSync } = require('child_process');

const findChromium = () => {
    const browserPath = chromiumPath;

    const output = String(execSync(`${browserPath} --version`));

    const [, version] = /Chromium (\d+\.\d+\.\d+\.\d+)/.exec(output);
    const majorVersion = parseInt(version.split('.')[0], 10);

    return {
        name: 'chromium',
        channel: 'stable',
        family: 'chromium',
        displayName: 'Chromium',
        version,
        path: browserPath,
        majorVersion,
    };
};

const ccLogger = (msg, logType) => {
    const {
        name: pkgName,
    } = require('./package.json');

    if (logType === 'error') {
        throw new Error(`${pkgName}: ${msg}`);
    } else if (logType === 'warn') {
        console.warn(`${pkgName}: ${msg}`);
    } else {
        console.log(`${pkgName}: ${msg}`);
    }
};

/**
 * Pushes the Chromium browser into the Cypress config object
 * @param {Cypress.ConfigOptions} config
 * @param {boolean} errorIfChromiumIsMissing
 */
const addChromiumToConfig = (config, errorIfChromiumIsMissing) => {
    if (typeof config !== 'object') {
        ccLogger('config object expected', 'error');
    }

    if (!Array.isArray(config.browsers)) {
        ccLogger('config.browsers array expected', 'error');
    }

    try {
        config.browsers.push(findChromium());
    } catch (err) {
        ccLogger('Chromium couldn\'t be located. To test in that browser you\'ll need to reinstall your node modules.', errorIfChromiumIsMissing ? 'error' : 'warn');
    }

    return config;
};

module.exports = addChromiumToConfig;



