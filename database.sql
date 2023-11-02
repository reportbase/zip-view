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
  secret VARCHAR,
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

CREATE PROCEDURE update_user (
  IN p_id INTEGER, 
  IN p_email VARCHAR,
  IN p_name VARCHAR,
  IN p_secret VARCHAR
)
AS
BEGIN
  UPDATE users 
  SET 
    email = p_email, 
    name = p_name,
    secret = p_secret
  WHERE id = p_id;
END;

-- CALL update_user(1, 'newemail@test.com', 'New Name', 'newsecret');

CREATE PROCEDURE update_gallery_for_user (
  IN p_email VARCHAR,
  IN p_json TEXT  
)
AS
BEGIN
  UPDATE galleries g
  INNER JOIN user_galleries ug ON g.id = ug.gallery_id
  INNER JOIN users u ON ug.user_id = u.id
  SET g.json = p_json
  WHERE u.email = p_email; 
END;

-- CALL update_gallery_for_user('user@email.com', '{"new": "data"}');

CREATE PROCEDURE insert_gallery_for_user (
  IN p_email VARCHAR,
  IN p_json TEXT
)
AS 
BEGIN
  INSERT INTO galleries (json) 
  VALUES (p_json);
  
  SELECT last_insert_rowid() AS new_gallery_id;
  
  INSERT INTO user_galleries (user_id, gallery_id)
  SELECT id, new_gallery_id 
  FROM users
  WHERE email = p_email;
END;

-- CALL insert_gallery_for_user('user@email.com', '{"new": "gallery"}');

CREATE PROCEDURE insert_new_user (
  IN p_email VARCHAR,
  IN p_name VARCHAR, 
  IN p_secret VARCHAR
)
AS
BEGIN
  INSERT INTO users (email, name, secret)
  VALUES (p_email, p_name, p_secret);
END;

-- CALL insert_new_user('newuser@email.com', 'New User', 'secret');

CREATE PROCEDURE update_user_by_email (
  IN p_email VARCHAR,
  IN p_name VARCHAR,
  IN p_secret VARCHAR  
)
AS
BEGIN
  UPDATE users
  SET 
    name = p_name,
    secret = p_secret
  WHERE email = p_email;
END;

-- CALL update_user_by_email('user@email.com', 'New Name', 'newsecret');

CREATE PROCEDURE get_all_users()
AS
BEGIN
  SELECT * 
  FROM users;
END;

-- CALL get_all_users();

CREATE PROCEDURE get_galleries_for_user(IN p_email VARCHAR)
AS
BEGIN
  SELECT g.*
  FROM galleries g
  JOIN user_galleries ug ON g.id = ug.gallery_id
  JOIN users u ON ug.user_id = u.id
  WHERE u.email = p_email;
END;

-- CALL get_galleries_for_user('user@email.com');

CREATE PROCEDURE insert_user_image(
  IN p_email VARCHAR,
  IN p_image_id INTEGER
)
AS
BEGIN
  INSERT INTO user_images (image_id, user_id) 
  SELECT p_image_id, id
  FROM users
  WHERE email = p_email;
END;

-- CALL insert_user_image('user@email.com', 1234);

CREATE PROCEDURE get_images_for_user (
  IN p_email VARCHAR
)
AS
BEGIN
  SELECT i.image_id
  FROM user_images i 
  JOIN users u ON i.user_id = u.id
  WHERE u.email = p_email;
END;

-- CALL get_images_for_user('user@email.com');

CREATE PROCEDURE delete_images_for_user (
  IN p_email VARCHAR  
)
AS
BEGIN
  DELETE FROM user_images
  WHERE user_id IN (
    SELECT id FROM users 
    WHERE email = p_email
  );
END;

-- CALL delete_images_for_user('user@email.com');

CREATE PROCEDURE delete_galleries_for_user (
  IN p_email VARCHAR
)
AS 
BEGIN
  DELETE FROM galleries
  WHERE id IN (
    SELECT gallery_id 
    FROM user_galleries 
    WHERE user_id IN (
      SELECT id FROM users
      WHERE email = p_email
    )
  );
END;

-- CALL delete_galleries_for_user('user@email.com');

INSERT INTO users (email, name, secret)
VALUES
  ('user1@test.com', 'User 1', 'secret1'),
  ('user2@test.com', 'User 2', 'secret2'),
  ('user3@test.com', 'User 3', 'secret3');
  
-- Populate galleries  
INSERT INTO galleries (json)
VALUES
  ('{"gallery": "A"}'),
  ('{"gallery": "B"}'),
  ('{"gallery": "C"}');
  
-- Populate user_galleries
INSERT INTO user_galleries (user_id, gallery_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 3);
  
-- Populate user_images
INSERT INTO user_images (image_id, user_id) 
VALUES
  (1, 1),
  (2, 1),
  (3, 2);
