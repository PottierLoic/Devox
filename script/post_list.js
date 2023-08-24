function full_post_list() {
  let list_data = `<div class="dashed-line-spaced"></div>`;
  //TODO: display actual tags
  list_data += `<div class="dashed-line"></div>`;
  list_data += `<h1><span class="symbol">-/</span> Here are all my posts:</h1>`;
  /* Retrieving data */
  list_data += `<div id="post-list">`;
  db.collection('posts').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const data = doc.data();
      list_data += `<p><a href="post-page.html" link-type="post" db-id="${doc.id}">.- ${data.title}</a>`;
      data.tags.forEach(tag => {
        list_data +=`<a href="posts.html" link-type="tag">&nbsp;[${tag}]&nbsp;</a>`;
      });
      list_data += `</p>`;
    });
    list_data += `</div>`;
    content_div.innerHTML += list_data;
    const post_list = document.getElementById('post-list');
    post_list.addEventListener('click', (event) => {
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

/* Connecting to Firebase db */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let content_div = document.getElementById('content')

full_post_list();



