const palette = document.getElementById("palette-selector");

let palette_amount = 0;

db.collection('colors').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      let colors = doc.data().palette;
      console.log(colors);
      let gradient =`linear-gradient(to right, ${colors[0]}, ${colors[2]})`;

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
        circle.id = "selected"
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