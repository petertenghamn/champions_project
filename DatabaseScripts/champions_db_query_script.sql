SELECT * FROM users;
SELECT * FROM articles;
SELECT * FROM comments;

SELECT username, password, is_admin FROM users WHERE username='peter' AND password='pass';
SELECT username FROM users;
SELECT article_id, date, title, snippet FROM articles;

SELECT article_id, date, title, article_intro, article_content, article_conclusion FROM articles WHERE article_id='1';
SELECT * FROM comments WHERE article_id='1';

/*DELETE FROM comments WHERE comment_id='9';*/

SELECT username FROM users WHERE username='peter' AND is_admin='1';

SELECT * FROM articles;
/*UPDATE articles SET title="", article_intro="", article_content="", article_conclusion="" WHERE article_id='1';*/

SELECT * FROM brainstorming;

SELECT * FROM users;
INSERT INTO users (username, password) VALUES ('chris', '4321');