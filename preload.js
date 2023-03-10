const electron = require('electron')
const ipc = electron.ipcRenderer

window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        const anchorElement = clickedElement.closest('a');
        if (anchorElement && anchorElement.tagName === 'A') {
            if (anchorElement.href.indexOf('file://') != -1) {
                return true
            }
            ipc.sendSync('open-link', anchorElement.href)
            event.preventDefault()
        }
    })
})

ipc.on('login-success', (event, data) => {
    localStorage.setItem('halistToken', data.token)
    window.location.reload()
})
