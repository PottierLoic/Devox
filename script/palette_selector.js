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