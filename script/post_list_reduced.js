function display_post_list_reduced() {
  let nb = 0;
  let list_data = ``;
  /* Retrieving data */
  db.collection('posts').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      if (nb < 7) {
        data = doc.data();
        list_data += `<p><a href="post-page.html" link-type="post" db-id="${doc.id}">.- ${data.title}</a>`;
        data.tags.forEach(tag => {
          list_data += `<a href="posts.html" link-type="tag">&nbsp;[${tag}]&nbsp;</a>`;
        });
        list_data += `</p>`;
        nb++;
      }
    });
    content_div.innerHTML += list_data;
    link_handler()
  })
  .catch(error => {
    console.error('Error while retrieving documents data: ', error);
  });
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let content_div = document.getElementById('post-list')

display_post_list_reduced();