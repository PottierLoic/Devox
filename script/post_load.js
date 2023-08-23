function display_post(post_id) {
  /* Retrieving data */
  db.collection('posts').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.id == post_id ) {
          // Processing data (should be taken apart)
          handle_post(doc);
        }
      });
    })
    .catch(error => {
      console.error('Error while retrieving documents data: ', error);
    });
}

function handle_post(doc) {
  const data = doc.data();
  document.title = data.title;

  let postContent = `<p><a href="index.html">devox</a> \\ <a href="posts.html">posts</a> \\ <span class="link-end">${doc.id}</span></p>`;
  postContent += `<div class="dashed-line"></div>`;

  data.sections.forEach(section => {
    let sectionContent = '';
    if (section.type === "introduction") {
      sectionContent += `<h1><span class="entry-symbol">-/</span> ${section.title}</h1>`;
    } else if (section.type === "basic") {
      sectionContent += `<h2><span class="section-symbol">$</span> ${section.title}</h2>`;
    }

    section.content.forEach(field => {
      sectionContent += choose_handler(field);
    });

    postContent += sectionContent;
  });

  content_div.innerHTML = postContent;
}

function choose_handler(item) {
  if (item.type === 'text') {
    return handle_text(item.content);
  } else if (item.type === 'image') {
    return handle_image(item.path);
  } else if (item.type.startsWith('container')) {
    return handle_container(item);
  } else if (item.type === 'list') {
    return handle_list(item.items);
  }  else if (item.type === 'code') {
    return handle_code(item);
  }
}

function handle_container(field) {
  let container_data = `<div class="${field.type}">`;

  container_data += `<div class="${field.left_type}">`;
  field.left.forEach(child => {
    container_data += choose_handler(child);
  });
  container_data += `</div>`;

  container_data += `<div class="${field.right_type}">`;
  field.right.forEach(child => {
    container_data += choose_handler(child);
  });
  container_data += `</div>`;

  container_data += `</div>`;
  return container_data;
}

function handle_code(field) {
  let block_data = `<pre class="language-${field.language}"><code>`
  block_data += field.content;
  block_data += `</code></pre>`
  return block_data
}

function handle_list(items) {
  let list_data = `<ul>`;

  items.forEach(item => {
    list_data += `<li>`;
    list_data += choose_handler(item);
    list_data += `</li>`;
  });

  list_data += `</ul>`;
  return list_data;
}

function handle_text(text) {
  return `<p>${text}</p>`;
}

function handle_image(src) {
  return `<img src="${src}"></img>`;
}


/* Connecting to Firebase db */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* Getting document references to add data to the page */
let content_div = document.getElementById('content')

const selected_post_id = localStorage.getItem('selected_post_id');

display_post(selected_post_id);