const btn = document.getElementById("testbutton");

btn.addEventListener('click', (event) => {
  document.documentElement.style.setProperty('--background-color', '#11151D');
  document.documentElement.style.setProperty('--title-color', '#d85841');
  document.documentElement.style.setProperty('--paraph-color', '#7f5056');
  document.documentElement.style.setProperty('--symbol-color', '#D76c58');
  document.documentElement.style.setProperty('--highlighted-color', '#D76c58');
  document.documentElement.style.setProperty('--highlighted-color-2', '#D76c58');
  document.documentElement.style.setProperty('--inaccessible-color', '#ff4d5c');
});

const palette = document.getElementById("palette-selector");

palette.addEventListener('mouseenter', (event) => {
  palette.style.height = `250px`;
});

palette.addEventListener('mouseleave', (event) => {
  palette.style.height = `50px`;
});