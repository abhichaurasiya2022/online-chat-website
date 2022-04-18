
/* create table for user signed in */

  CREATE DATABASE online_chat_website;

  USE online_chat_website;

  CREATE TABLE IF NOT EXISTS ocw_users(
    user_no INT AUTO_INCREMENT NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(20) NOT NULL,
    password VARCHAR(500) NOT NULL,
    gender VARCHAR(50),
    dob_mm INT NOT NULL,
    dob_dd INT NOT NULL,
    dob_yy INT NOT NULL,
    friends JSON,
    myID VARCHAR(10000),
    PRIMARY KEY (user_no)
  );

  ALTER TABLE ocw_users
  ADD friends JSON;

  ALTER TABLE ocw_users
  ADD myID VARCHAR(10000);


 CREATE TABLE titties(
   nipple JSON,

 );

 CREATE TABLE friends(
  user_id VARCHAR(100) NOT NULL,
  friends JSON

 );

 UPDATE ocw_users
 SET friends = '{"xyz":"xyz001", "pqr":"pqr001"}'
 WHERE user_no = 1;

 UPDATE ocw_users
 SET myID = 'hhdhdhd'
 WHERE email = 'abc@email.com';

 UPDATE ocw_users
 SET friends = '[{"friendName": "pqr",
  "friendId": "pqr001"}]'
 WHERE user_no = 1;

 INSERT INTO friends (user_id, friends) VALUES (
   'you',
   '[{"EmployeeId": "EMP-101",
    "EmployeeName": "Chris"},
    {"EmployeeId": "EMP-102",
     "EmployeeName": "David"},
      {"EmployeeId": "EMP-103",
      "EmployeeName": "Sam"}]'
 )

/*Update JSON object by append thanks to titties*/
 UPDATE ocw_users
      SET friends = JSON_ARRAY_APPEND (
        friends,
        '$',
        CAST('{"friendName": "LMN",
        "friendId": "lmn001"}' AS JSON)
      )
  WHERE user_no = 1;



  UPDATE ocw_users SET friends = JSON_ARRAY_APPEND(friend, '$', CAST('{"friendName": "ABC", "friendId": "abc001" }' AS JSON)) WHERE name = "PQR" AND user_id = "pqr001";



  UPDATE ocw_users SET friends = JSON_ARRAY_APPEND(friends, '$', CAST('{"friendName": "ABC", "friendId": "abc001" }' AS JSON)) WHERE name = "PQR" AND user_id = "pqr001";

  UPDATE ocw_users SET friends = JSON_ARRAY_APPEND(friend, '$', CAST('{"friendName": "ABC", "friendId": 'abc001' }' AS JSON)) WHERE name = 'PQR' AND user_id = 'pqr001'
