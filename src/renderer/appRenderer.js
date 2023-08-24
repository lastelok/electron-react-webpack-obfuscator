const React = require('react')
const { createRoot } = require('react-dom/client')
const { Application } = require('./components/Application.jsx')

// Say something
console.log('[ERWO] : Renderer execution started')

// Render application in DOM
createRoot(document.getElementById('app')).render(<Application />)

// example of getting IPC answer
async function ipcExample() {
    const res = await window.api.ping(`hello world`)
    console.log(`[ERWO] : Received ${res}`)
}

ipcExample()
