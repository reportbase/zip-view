#https://sqliteonline.com/
  
DROP TABLE IF EXISTS demo;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS galleries;
DROP TABLE IF EXISTS user_galleries;
DROP TABLE IF EXISTS user_images;

CREATE TABLE users 
(
  id INTEGER PRIMARY KEY, 
  email VARCHAR,
  name VARCHAR,
  secret VARCHAR
);

CREATE TABLE galleries 
(
  id INTEGER PRIMARY KEY, 
  json TEXT
);

CREATE TABLE user_galleries 
(
  user_id,
  gallery_id,
  PRIMARY KEY(user_id, gallery_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (gallery_id) REFERENCES galleries(id)
);

CREATE TABLE user_images 
(
  image_id,
  user_id,
  PRIMARY KEY(image_id, user_id),
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


