select author_id, posts.id, username, profile_pic, title, img, content from users
join posts on author_id = users.id
where author_id != $1;