if (localStorage.getItem('background-color') != null) {
  document.documentElement.style.setProperty('--background-color', localStorage.getItem('background-color'));
  document.documentElement.style.setProperty('--title-color', localStorage.getItem('title-color'));
  document.documentElement.style.setProperty('--paraph-color', localStorage.getItem('paraph-color'));
  document.documentElement.style.setProperty('--symbol-color', localStorage.getItem('symbol-color'));
  document.documentElement.style.setProperty('--highlighted-color', localStorage.getItem('highlighted-color'));
  document.documentElement.style.setProperty('--highlighted-color-2', localStorage.getItem('highlighted-color2'));
  document.documentElement.style.setProperty('--inaccessible-color', localStorage.getItem('innaccessible-color'));
}
