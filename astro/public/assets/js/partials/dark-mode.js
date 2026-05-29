/* @preserve Dark mode Init */
/*
 * There are two color palettes on CSS for the data-theme: 'light' and 'dark'.
 * Initially the script check if a theme is set in local storage and
 * alternatively listens to a MediaQuery callback looking for "prefers-color-scheme: dark".
 */

const themeButton = {
    'light': '<i class="fas fa-adjust" aria-hidden="true"></i>',
    'dark': '<i class="fas fa-adjust fa-rotate-180" aria-hidden="true"></i>'
}

const currentTheme = () => localStorage.getItem('theme')

function setMode(theme) {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    document.getElementById('theme-toggle').innerHTML = themeButton[theme]
}

function themeToggle() {
    let sessionPrefers = currentTheme()
    if (sessionPrefers === 'light') {
        setMode('dark')
    } else {
        setMode('light')
    }
}

window.onload = function bootstrapTheme() {
    let sessionPrefers = currentTheme() || document.documentElement.getAttribute('data-theme') || 'light'
    setMode(sessionPrefers)
}
