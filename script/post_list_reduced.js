function display_post_list_reduced() {
  let nb = 0;
  /* Retrieving data */
  db.collection('posts').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      if (nb < 7) {
        content_div.innerHTML += `<p><a href="post-page.html" db-id="${doc.id}">.- ${doc.data().title}</a></p>`;
        nb++;
      }
    });
  })
  .catch(error => {
    console.error('Error while retrieving documents data: ', error);
  });
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let content_div = document.getElementById('post-list')

display_post_list_reduced();

const post_list = document.getElementById('post-list');
post_list.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    const db_id = event.target.getAttribute('db-id');
    localStorage.setItem('selected_post_id', db_id);
  }
});