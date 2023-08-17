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
  data = doc.data()
  document.title = data.title
  content_div.innerHTML += `<p><a href="index.html">devox</a> \\ <a href="posts.html">posts</a> \\ <span class="link-end">${doc.id}</span></p>`
  content_div.innerHTML += `<div class="dashed-line"></div>`

  data.sections.forEach(section => {
    if (section.type == "introduction") {
      content_div.innerHTML += `<h1><span class="entry-symbol">-/</span>${section.title}</h1>`
      section.content.forEach(field => {
        if (field.type == "text" ) {
          content_div.innerHTML += `<p>${field.content}</p>`
        } else if (field.type == "image") {
          content_div.innerHTML += `<img src="${field.path}"></img>`
        } else if (field.type.startsWith("container")) {
          handle_container(field);
        }
      });
    }
  });
}


function handle_container(field) {
  console.log("handling container");
}


/* Getting document references to add data to the page */
let content_div = document.getElementById('content')

display_post("pqlxTv7ymzDiwhxyav58")