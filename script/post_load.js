function display_post(post_id) {
  /* Retrieving data */
  db.collection('posts').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.id == post_id ) {
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

  let post_content = `<p><a href="index.html">devox</a> \\ <a href="posts.html">posts</a> \\ <span class="link-end">${doc.id}</span></p>`;
  post_content += `<div class="dashed-line-spaced"></div><div class="container-even">`;
  post_content += `<div class="header-links"><p><a href="${data.github_link}">[GitHub]</a></p></div>`
  post_content += `<div class="header-tags">`
  data.tags.forEach(tag => {
    // TODO MAKE TAG SEARCH
    post_content += `<p><a href="posts.html" link_type="tag">&nbsp;[${tag}]&nbsp;</a></p>`
  });
  post_content += `</div></div><div class="dashed-line"></div>`

  data.sections.forEach(section => {
    let section_content = '';
    if (section.type === "introduction") {
      section_content += `<h1><span class="symbol">-/</span> ${section.title}</h1>`;
    } else if (section.type === "basic") {
      section_content += `<h2><span class="symbol">$</span> ${section.title}</h2>`;
    }

    section.content.forEach(field => {
      section_content += choose_handler(field);
    });

    post_content += section_content;
  });

  content_div.innerHTML = post_content;
  link_handler()
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