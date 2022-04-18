const mysql = require("mysql");
const express = require('express');
const db = require('../scripts/db');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.test = async (req, res) => {

    const {myname} = req.body;
    console.log(myname);
    db.query('SELECT * FROM friends WHERE user_id = ?', [myname], async (error, results) =>{
          if(error){
              console.log(error);

          }
          console.log(results);

      //    const name = JSON.parse(results[0].name); //results[0].friends;
          const friends = JSON.parse(results[0].friends);
        /*  let myFriends = [];
          for (const x in friends) {
            myFriends.push(x);
          }
          */
        //  const abbc = {"friends":myFriends,"name":"sam"};
          return res.send(friends[0].EmployeeId);






      });

}

exports.gethello= async (req, res) => {
  console.log("Hello");
  return res.send("Hello");
}

exports.getId = async (req, res) => {

  const {callname, callid} = req.body;
  db.query('SELECT myID FROM ocw_users WHERE user_id = ? AND name = ?', [callid, callname], async (error, result) =>{
    if (error) {
      console.log(error);
    }
    else {
      console.log(result);
      if (result[0].myID) {
        console.log(result.length);
        console.log(result[0].myID);
        return res.send(result[0].myID);
      }
      else {
        console.log("offline");
          return res.send("offline");
      }
    }
  } );
}






exports.addId = async (req, res) => {

  const {myId, myEmail} = req.body;
  console.log(myId + " " + myEmail);
  db.query('UPDATE ocw_users SET myID = ? WHERE email = ?', [myId, myEmail], async (error, result) =>{
    if (error) {
      console.log(error);
    }
    else {
      const myStatus = true;

      return res.send(myStatus);
    }
  } )
}

exports.addfriend = async (req, res) => {
  const {myName, myId, youName, youId} = req.body;
  const yyname = "ABC"

  db.query('SELECT friends from ocw_users WHERE name = ? AND user_id = ?', [myName, myId], async (error, result) => {
    if (error) {
      console.log(error);
    }




    if (!(result[0].friends)) {


      const comF = "UPDATE ocw_users SET friends = '[{\"friendName\": \"" + youName + "\", \"friendId\": \"" + youId + "\"}]' WHERE name = \"" + myName + "\" AND user_id = \"" + myId + "\";";





      db.query(comF, async (error, results) => {
        if (error) {
          console.log(error);
        }
        return res.send("Done");
      });

  //  return res.send(com1);

    }
    else {
      const friends = JSON.parse(result[0].friends);
      console.log(result);
      let myFriendsName = [];
      for (const x in friends) {
        myFriendsName.push(friends[x].friendName);
      }
      if (!(youName in myFriendsName)) {
        console.log("nope");
        return res.send("NOPE");
      }

      const commUpdate = "UPDATE ocw_users SET friends = JSON_ARRAY_APPEND(friends, '$', CAST('{\"friendName\": \"" + youName + "\", \"friendId\": \"" + youId + "\" }' AS JSON)) WHERE name = \"" + myName + "\" AND user_id = \"" + myId + "\";";
      db.query(commUpdate, async (error, results) => {
        if (error) {
          console.log(error);
        }
        return res.send("Done");
      });
    }



    //return res.send(!(youName in myFriendsName));

  });
}



exports.search = async (req, res) => {
  const {searchName, searchUserId} = req.body;
  db.query('SELECT * from ocw_users WHERE name = ? AND user_id = ?', [searchName, searchUserId], async (error, results) => {
    if (error) {
      console.log(error);
    }
    const name = results[0].name;
    const user_id = results[0].user_id;
    return res.send({"name":name, "user_id":user_id});
  });
}

exports.dashboard = async (req, res) => {

    const {emailid} = req.body;
    db.query('SELECT * FROM ocw_users WHERE email = ?', [emailid], async (error, results) =>{
          if(error){
              console.log(error);

          }

          const name = results[0].name;
          const friends = JSON.parse(results[0].friends);
          let myFriends = [];
          for (const x in friends) {
            myFriends.push(x);
          }
          console.log(friends);
          return res.send({"name":name, "friends":friends});






      });

}

exports.signup = async (req, res) => {
  const {name, email, password} = req.body;
  const user_id = "N/A";
  const gender = "N/A";
  const day=00;
  const month=00;
  const year=0000;

  console.log(req.body);

  db.query('SELECT email FROM ocw_users WHERE email = ?', [email], async (error, results) =>{
        if(error){
            console.log(error);

        }

        if(results.length > 0){
            return res.send("Email Already In Use");
        }

      /*  else if( password == passwordConfirm ){
            return res.render('join',{
                message: 'Password do not match!'
            });
        }*/


        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO ocw_users SET ?', { user_id: user_id, email: email, name: name, password: hashedPassword, gender: gender, dob_mm: month, dob_dd: day, dob_yy: year }, (error, results) => {

            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.send("success");
            }

        });

    });

  return;
}

exports.signin = async (req, res) => {
  try {
        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(400).send("enter email/password");
        }


        db.query('SELECT * FROM ocw_users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if( !results || !(await bcrypt.compare(password, results[0].password))){
                return res.status(401).send("wrong email/password");
            } else {
                const emailid = results[0].email;

                const token = jwt.sign({ emailid }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });


                console.log("the token is: " + token);
                const cookieOptions = {
                    expires: new Date(
                        Date.now()  + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

            //  res.cookie('jwt', token, cookieOptions);

              return res.status(200).send(token)


            }

        })



    } catch (error) {
        console.log(error);
    }



}
