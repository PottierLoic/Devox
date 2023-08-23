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
const firebaseConfig = {
  apiKey: 'AIzaSyD2FiGvROENKdDLdQL1xT2C5EddUZnlw8w',
  authDomain: 'devox-4e2cc.firebaseapp.com',
  projectId: 'devox-4e2cc',
  storageBucket: 'devox-4e2cc.appspot.com',
  messagingSenderId: '50545599343',
  appId: '1:50545599343:web:7f971c65e9e1c834f5fe9a'
};
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