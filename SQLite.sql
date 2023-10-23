DROP TABLE IF EXISTS demo;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS galleries;
DROP TABLE IF EXISTS user_galleries;
DROP TABLE IF EXISTS user_images;

CREATE TABLE users 
(
  id INT PRIMARY KEY, 
  email VARCHAR(255)
);

CREATE TABLE galleries 
(
  id INT PRIMARY KEY, 
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

