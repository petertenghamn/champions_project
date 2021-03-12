SELECT * FROM users;
SELECT * FROM articles;
SELECT * FROM comments;

SELECT username, password, is_admin FROM users WHERE username='peter' AND password='pass';
SELECT username FROM users;
SELECT article_id, date, title, snippet FROM articles;

SELECT article_id, date, title, article_intro, article_content, article_conclusion FROM articles WHERE article_id='1';
SELECT * FROM comments WHERE article_id='1';