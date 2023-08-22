const fs = require(`fs`)
const { contextBridge, ipcRenderer } = require('electron')

// Say something
console.log('[ERWO] : Preload execution started')

// Get versions
window.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app')
    const { env } = process
    const versions = {}

    // ERWO Package version
    versions['erwo'] = env['npm_package_version']
    versions['license'] = env['npm_package_license']

    // Process versions
    for (const type of ['chrome', 'node', 'electron']) {
        versions[type] = process.versions[type]
    }

    if (fs.existsSync(`./package.json`)) {
        const packageJson = JSON.parse(fs.readFileSync(`./package.json`, `UTF-8`))

        const react_v = packageJson?.devDependencies?.[`react`] || packageJson?.dependencies?.[`react`]
        const webpack_v = packageJson?.devDependencies?.[`webpack`] || packageJson?.dependencies?.[`webpack`]
        const obfuscator_v = packageJson?.devDependencies?.[`javascript-obfuscator`] || packageJson?.dependencies?.[`javascript-obfuscator`]

        if (react_v) versions[`react`] = react_v.replace('^', '')
        if (webpack_v) versions[`webpack`] = webpack_v.replace('^', '')
        if (obfuscator_v) versions[`obfuscator`] = obfuscator_v.replace('^', '')
        if (packageJson?.license) versions[`license`] = packageJson.license
    }

    // Set versions to app data
    app.setAttribute('data-versions', JSON.stringify(versions))
})

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
    ping: (word) => ipcRenderer.invoke('ping', word),
})
