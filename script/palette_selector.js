const palette = document.getElementById("palette-selector");

let palette_amount = 0;

db.collection('colors').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      let colors = doc.data().palette;
      let gradient =`linear-gradient(to right, ${colors[0]}, ${colors[2]}, ${colors[5]})`;

      var circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.background = gradient;
      palette.appendChild(circle);
      if (localStorage.getItem("palette_id") == doc.id) {
        circle.id = "selected";
        palette.prepend(circle);
      }

      circle.addEventListener("click", (event) => {
        var circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
          circle.removeAttribute('id', 'selected');
        });
        circle.id = "selected";
        document.documentElement.style.setProperty('--background-color', colors[0]);
        document.documentElement.style.setProperty('--title-color', colors[1]);
        document.documentElement.style.setProperty('--paraph-color', colors[2]);
        document.documentElement.style.setProperty('--symbol-color', colors[3]);
        document.documentElement.style.setProperty('--highlighted-color', colors[4]);
        document.documentElement.style.setProperty('--highlighted-color-2', colors[5]);
        document.documentElement.style.setProperty('--inaccessible-color', colors[6]);
        localStorage.setItem('background-color', colors[0]);
        localStorage.setItem('title-color', colors[1]);
        localStorage.setItem('paraph-color', colors[2]);
        localStorage.setItem('symbol-color', colors[3]);
        localStorage.setItem('highlighted-color', colors[4]);
        localStorage.setItem('highlighted-color2', colors[5]);
        localStorage.setItem('inaccessible-color', colors[6]);
        localStorage.setItem('palette_id', doc.id);
        palette.prepend(circle);
      })
      palette_amount++;
    });
    var rand_circle = document.createElement("div");
    rand_circle.classList.add("circle");
    rand_circle.style.backgroundImage = `url('img/refresh.png')`;
    rand_circle.style.backgroundSize = `cover`;
    rand_circle.style.backgroundPosition = `center`;
    palette.appendChild(rand_circle);
    rand_circle.addEventListener("click", (event) =>{
      var circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
          circle.removeAttribute('id', 'selected');
        });
        rand_circle.id = "selected";
      random_colors = get_random_palette();
      document.documentElement.style.setProperty('--background-color', random_colors[0]);
      document.documentElement.style.setProperty('--title-color', random_colors[1]);
      document.documentElement.style.setProperty('--paraph-color', random_colors[2]);
      document.documentElement.style.setProperty('--symbol-color', random_colors[3]);
      document.documentElement.style.setProperty('--highlighted-color', random_colors[4]);
      document.documentElement.style.setProperty('--highlighted-color-2', random_colors[5]);
      document.documentElement.style.setProperty('--inaccessible-color', random_colors[6]);
      localStorage.setItem('background-color', random_colors[0]);
      localStorage.setItem('title-color', random_colors[1]);
      localStorage.setItem('paraph-color', random_colors[2]);
      localStorage.setItem('symbol-color', random_colors[3]);
      localStorage.setItem('highlighted-color', random_colors[4]);
      localStorage.setItem('highlighted-color2', random_colors[5]);
      localStorage.setItem('inaccessible-color', random_colors[6]);
    });

    palette_amount++;
  })
  .catch(error => {
    console.error('Error while retrieving documents data: ', error);
  });

palette.addEventListener('mouseenter', (event) => {
  let nb = 50 * palette_amount;
  palette.style.height = `${nb}px`;
});

palette.addEventListener('mouseleave', (event) => {
  palette.style.height = `50px`;
});

function get_random_color() {
  const char = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += char[Math.floor(Math.random() * 16)];
  }
  return color;
}

function get_random_palette() {
  let palette = [];
  for (let i = 0; i < 6; i++) {
    palette[i] = get_random_color();
  }
  return palette;
}