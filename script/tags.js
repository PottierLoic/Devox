function change_search_tag(tag) {
  let tags_json = localStorage.getItem('search_tags');
  if (tags_json != null) {
    tags = JSON.parse(tags_json);
    const index = tags.indexOf(tag);
    if (index === -1) {
      tags.push(tag);
    } else {
      tags.splice(index, 1);
    }
  } else {
    tags = [tag];
  }
  tags_json = JSON.stringify(tags);
  localStorage.setItem('search_tags', tags_json);
}