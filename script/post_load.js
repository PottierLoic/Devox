/* <script type="module">
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2FiGvROENKdDLdQL1xT2C5EddUZnlw8w",
  authDomain: "devox-4e2cc.firebaseapp.com",
  projectId: "devox-4e2cc",
  storageBucket: "devox-4e2cc.appspot.com",
  messagingSenderId: "50545599343",
  appId: "1:50545599343:web:7f971c65e9e1c834f5fe9a",
  measurementId: "G-JZPN09M8QR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
</script> */

function display_post(post_id) {
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

/* Getting document references to add data to the page */
let content_div = document.getElementById('content')

const selected_post_id = localStorage.getItem('selected_post_id');

display_post(selected_post_id);