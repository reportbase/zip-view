#https://sqliteonline.com/
  
DROP TABLE IF EXISTS users;
CREATE TABLE users 
(
  id VARCHAR PRIMARY KEY AUTOINCREMENT, 
  email VARCHAR UNIQUE,
  name VARCHAR,
  secret VARCHAR,
  created VARCHAR
);

DROP TABLE IF EXISTS images;
CREATE TABLE images 
(
  id VARCHAR PRIMARY KEY, 
  title VARCHAR,
  describe TEXT,
  created VARCHAR
)

DROP TABLE IF EXISTS gallery_folders;
CREATE TABLE gallery_folders 
(
  folder_id VARCHAR,
  gallery_id INTEGER,
  PRIMARY KEY(folder_id, gallery_id),
  FOREIGN KEY (folder_id) REFERENCES folders(id),
  FOREIGN KEY (gallery_id) REFERENCES galleries(id)
);

DROP TABLE IF EXISTS image_tags;
CREATE TABLE image_tags 
(
  image_id VARCHAR,
  tag_id INTEGER,
  PRIMARY KEY(image_id, tag_id),
  FOREIGN KEY (image_id) REFERENCES images(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

DROP TABLE IF EXISTS tags;
CREATE TABLE tags 
(
  id VARCHAR PRIMARY KEY AUTOINCREMENT, 
  title VARCHAR,
  describe TEXT
);

DROP TABLE IF EXISTS folders;
CREATE TABLE folders 
(
  id VARCHAR PRIMARY KEY AUTOINCREMENT, 
  title VARCHAR,
  describe TEXT
);

DROP TABLE IF EXISTS galleries;
CREATE TABLE galleries 
(
  id VARCHAR PRIMARY KEY AUTOINCREMENT, 
  title VARCHAR,
  describe TEXT
);

DROP TABLE IF EXISTS user_galleries;
CREATE TABLE user_galleries 
(
  user_id,
  gallery_id,
  PRIMARY KEY(user_id, gallery_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (gallery_id) REFERENCES galleries(id)
);

DROP TABLE IF EXISTS user_folders;
CREATE TABLE user_folders 
(
  user_id,
  folder_id,
  PRIMARY KEY(user_id, folder_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (folder_id) REFERENCES folders(id)
);

DROP TABLE IF EXISTS user_tags;
CREATE TABLE user_tags 
(
  user_id,
  tag_id,
  PRIMARY KEY(user_id, tag_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

DROP TABLE IF EXISTS user_images;
CREATE TABLE user_images 
(
  image_id,
  user_id,
  PRIMARY KEY(image_id, user_id),
  FOREIGN KEY (image_id) REFERENCES images(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (email, name, secret)
VALUES
  ('user1@test.com', 'User 1', 'secret1'),
  ('user2@test.com', 'User 2', 'secret2'),
  ('user3@test.com', 'User 3', 'secret3');
  
INSERT INTO galleries (json)
VALUES
  ('{"gallery": "A"}'),
  ('{"gallery": "B"}'),
  ('{"gallery": "C"}');
  
INSERT INTO user_galleries (user_id, gallery_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 3);

INSERT INTO user_images (image_id, user_id) 
VALUES
  (1, 1),
  (2, 1),
  (3, 2);

UPDATE users 
SET name = 'Updated Name', secret = 'new secret'
WHERE email = 'user1@test.com';

SELECT * FROM users;

UPDATE galleries 
SET json = '{"new": "data"}'
WHERE id IN (
  SELECT gallery_id
  FROM user_galleries
  WHERE user_id IN (
    SELECT id 
    FROM users
    WHERE email = 'user3@test.com'
  )
);

SELECT * FROM galleries;

INSERT INTO galleries (json) 
VALUES ('{"new": "gallery"}');

INSERT INTO user_galleries (user_id, gallery_id)
SELECT u.id, g.id
FROM users u 
CROSS JOIN galleries g
WHERE u.email = 'user2@test.com'
ORDER BY g.id DESC
LIMIT 1;

SELECT * FROM user_galleries;

INSERT INTO user_images (image_id, user_id)
SELECT 1234, u.id 
FROM users u
WHERE u.email = 'user2@test.com'; 
 
SELECT * from user_images;

DELETE FROM user_images
WHERE user_id IN (
  SELECT id FROM users
  WHERE email = 'user2@test.com'
);

SELECT * from user_images;

WHERE id IN (
  SELECT gallery_id
  FROM user_galleries
  WHERE user_id IN (
    SELECT id 
    FROM users
    WHERE email = 'user2@test.com'
  )
);

select * from user_images;

UPDATE users
SET 
  name = 'New Name',
  secret = 'new secret'
WHERE email = 'user2@test.com'; 

select * from users;

SELECT * 
FROM users
ORDER BY name
LIMIT 10;

SELECT g.*
FROM galleries g
JOIN user_galleries ug ON g.id = ug.gallery_id
JOIN users u ON ug.user_id = u.id
WHERE u.email = 'user2@test.com';

SELECT i.* 
FROM user_images i
JOIN users u ON i.user_id = u.id
JOIN images im ON i.image_id = im.id
WHERE u.email = 'user2@test.com';

SELECT images.*
FROM users
JOIN user_images ON users.id = user_images.user_id
JOIN images ON user_images.image_id = images.id
WHERE users.email = 'user@example.com';

INSERT INTO images (id, title, tags, describe, created)
VALUES ('image001', 'Cat Photo', 'cat,pet', 'Cute photo of a cat', 'date');

DELETE FROM images 
WHERE id = 'image001';

DELETE FROM images
WHERE id IN ('image001', 'image002');

UPDATE images
SET title = 'New Title', 
    tags = 'cat,kitten',
    describe = 'Updated description'
WHERE id = 'image001';


