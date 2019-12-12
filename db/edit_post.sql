update posts
set 
content = $1,
img = $2,
title = $3
where posts.id = $4;

select author_id, posts.id, username, profile_pic, title, img, content from users
join posts on author_id = users.id
where posts.id = $4;