function add_search_tag(tag) {
  let tags_json = localStorage.getItem('search_tags');
  if (tags_json != null) {
    tags = JSON.parse(tags_json);
    if (tags.includes(tag) === false) {
      tags.push(tag);
    }
  } else {
    tags = [tag];
  }
  tags_json = JSON.stringify(tags);
  console.log(tags_json);
  localStorage.setItem('search_tags', tags_json);
}
