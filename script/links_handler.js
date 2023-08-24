function link_handler() {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        if (event.target.getAttribute('link-type') === 'post') {
          const db_id = event.target.getAttribute('db-id');
          localStorage.setItem('selected_post_id', db_id);
        } else if (event.target.getAttribute('link-type') === 'tag') {
          const tag = event.target.textContent;
          change_search_tag(tag.substring(2, tag.length - 2));
        }
      }
    });
  });
}
