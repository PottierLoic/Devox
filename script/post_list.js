function display_full_post_list() {
  /* Retrieving data */
  db.collection('posts').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      content_div.innerHTML += `<p><a href="post-page.html" db-id="${doc.id}">.- ${doc.data().title}</a></p>`;
    });
  })
  .catch(error => {
    console.error('Error while retrieving documents data: ', error);
  });
}

/* Connecting to Firebase db */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let content_div = document.getElementById('post-list')

display_full_post_list();

const post_list = document.getElementById('post-list');
post_list.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    const db_id = event.target.getAttribute('db-id');
    localStorage.setItem('selected_post_id', db_id);
  }
});