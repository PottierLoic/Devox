function full_post_list() {
  let list_data = `<div class="dashed-line-spaced"></div>`;

  list_data += `<div class="header-tags"><p></p>`;
  let tags_json = localStorage.getItem('search_tags');
  let tags = [];
  if (tags_json != null) {
    tags = JSON.parse(tags_json);
    tags.forEach(tag => {
      list_data += `<p><a href="" link-type="tag">&nbsp;[${tag}]&nbsp;</a></p>`;
    });
  }
  list_data += `</div>`;

  list_data += `<div class="dashed-line"></div>`;
  list_data += `<h1><span class="symbol">-/</span> Here are all my posts:</h1>`;
  /* Retrieving data */
  list_data += `<div id="post-list">`;
  db.collection('posts').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const data = doc.data();
      let disp = true;
      tags.forEach(tag => {
        if (data.tags.includes(tag) === false){
          disp = false;
        }
      });
      if (disp)  {
        console.log(tags_json);
        list_data += `<p><a href="post-page.html" link-type="post" db-id="${doc.id}">.- ${data.title}</a>`;
        data.tags.forEach(tag => {
          list_data +=`<a href="posts.html" link-type="tag">&nbsp;[${tag}]&nbsp;</a>`;
        });
        list_data += `</p>`;
      }
    });
    list_data += `</div>`;
    content_div.innerHTML += list_data;
    link_handler();
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



