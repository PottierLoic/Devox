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
    content_div.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        if (event.target.getAttribute('link-type') === 'post') {
          const db_id = event.target.getAttribute('db-id');
          localStorage.setItem('selected_post_id', db_id);
        } else if (event.target.getAttribute('link-type') === 'tag') {
          const tag = event.target.textContent;
          add_search_tag(tag.substring(2, tag.length - 2));
        }
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