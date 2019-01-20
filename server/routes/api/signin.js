const User = require('../../models/User')
const UserSession = require('../../models/UserSession')
const Songs = require('../../models/Songs')
const cloudinary = require('cloudinary')
require('../../handlers/cloudinary')
const multer = require('multer')
const uuidv4 = require('uuid/v4')
const path = require('path')
const bodyParser = require('body-parser');

module.exports = (app) => {

  let fileName='';

  const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          /*
            Files will be saved in the 'uploads' directory. Make
            sure this directory already exists!
          */
          cb(null, '/Users/afnanrehman/Downloads/data');
        },
        filename: (req, file, cb) => {
          /*
            uuidv4() will generate a random ID that we'll use for the
            new filename. We use path.extname() to get
            the extension from the original file name and add that to the new
            generated ID. These combined will create the file name used
            to save the file on the server and will be available as
            req.file.pathname in the router handler.
          */
          fileName = file.originalname;
          console.log("1 - File name is: "+file.originalname);
          const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
          console.log("File name is: "+newFilename);
          cb(null, newFilename);
        },
      });
      // create the multer instance that will be used to upload/save the file
      const upload = multer({ storage });

/*
 * Sign Up
 */
 app.post('/api/account/signup', (req, res, next) => {
   const { body } = req;
   const {
     firstName,
     lastName,
     password
   } = body;
     let {
          email
        } = body;

   if (!firstName){
     return res.send({
       success: false,
       message: 'Error: First Name can not be blank.'
     });
   }
   if (!lastName){
     return res.send({
       success: false,
       message: 'Error: Last Name can not be blank.'
     });
   }
   if (!email){
     return res.send({
       success: false,
       message: 'Error: Email can not be blank.'
     });
   }
   if (!password){
     return res.send({
       success: false,
       message: 'Error: Password can not be blank.'
     });
   }

   email = email.toLowerCase();

   User.find({
     email: email
   },(err, previousUsers) => {

     if(err){
       return res.send({
         success: false,
         message: 'Error: Server error.'
       });
     }else if(previousUsers.length > 0){
       return res.send({
         success: false,
         message: 'Error: Account already exists.'
       });
     }

     const newUser = new User();
     newUser.email = email;
     newUser.firstName = firstName;
     newUser.lastName = lastName;
     newUser.password = newUser.generateHash(password);
     newUser.save((err, user) => {
       if (err){
         return res.send({
           success: false,
           message: 'Error: Server error.'
         });
       }
       return res.send({
         success: true,
         message: 'Successful: Singed Up.'
       });
     });
   });

});

/*
 * Sign In
 */
 app.post('/api/account/signin', (req, res, next) => {
   const { body } = req;
   const {
     password
   } = body;
     let {
          email
        } = body;

        if (!email){
          return res.send({
            success: false,
            message: 'Error: Email can not be blank.'
          });
        }
        if (!password){
          return res.send({
            success: false,
            message: 'Error: Password can not be blank.'
          });
        }

        email = email.toLowerCase();

        User.find({
          email: email
        }, (err, users) => {
          if (err){
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: Server error.'
            });
          }
          if (users.length != 1){
            return res.send({
              success: false,
              message: 'Error: Invalid.'
            });
          }

          const user = users[0];
          if (!user.validPassword(password)){
            return res.send({
              success: false,
              message: 'Error: Invalid password.'
            });
          }

            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
              if (err){
                console.log(err);
                return res.send({
                  success: false,
                  message: 'Error: Server error.'
                });
              }
              console.log('User Name : '+user.firstName);
              return res.send({
                success: true,
                message: 'Successful: User is signed in Successfully.',
                userName: user.firstName,
                token: doc._id
              });

            });
        });

});

/*
 * Verify
 */
 app.get('/api/account/verify', (req, res, next) => {
   const { query } = req;
   const { token } = query;

   UserSession.find({
     _id: token,
     isDeleted: false
   }, (err, sessions) => {
      if (err){
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }

      if( sessions.length != 1 ){
        return res.send({
          success: false,
          message: 'Error: Invalid session.'
        });
      } else {
        return res.send({
          success: true,
          message: 'Successful: Authorized user.'
        });
      }

   });

 });

 /*
  * Log Out
  */
app.get('/api/account/logout', (req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
        $set: {
                isDeleted:true
              }
     }, null, (err, sessions) => {
     if (err){
       return res.send({
         success: false,
         message: 'Error: Server error.'
       });
     }
       return res.send({
         success: true,
         message: 'Successful: User logged out.'
       });
   });
  });

  /*
   * Upload to server
   */
app.post('/api/upload', upload.single('selectedFile'), async (req, res) => {
  /*
    We now have a new req.file object here. At this point the file has been saved
    and the req.file.filename value will be the name returned by the
    filename() function defined in the diskStorage configuration. Other form fields
    are available here in req.body.
  */
  console.log("The path is : "+req.file.path);
  const result = await cloudinary.v2.uploader.upload(req.file.path,{resource_type: "auto"});
  console.log("URL returned is : "+result.secure_url);

  let url = result.secure_url;
  let fields = fileName.split(' - ');
  let title = fields[0];
  let artists = fields[1];
  let cover = "http://res.cloudinary.com/dolxswfpc/image/upload/v1542682665/annonymous.png";
  console.log("2 - File name is: "+fileName);
  console.log("3 - Title is: "+title);
  console.log("4 - Artist is: "+artists);

  const newSong = new Songs();
  newSong.url = url;
  newSong.cover = cover;
  newSong.title = title;
  newSong.artist = artists;
  await newSong.save();

  return res.send({
    success: true,
    message: 'Success: Song saved in DB.',
    url: url,
    cover: cover,
    title: title,
    artist: artists
  });

});

/*
 * Get the list of songs already in db
 */
 app.get('/api/account/getlist', (req, res, next) => {
   let count = 0;
   Songs.find({}, function(err, songs) {
     var songList = [];
     songs.forEach(function(song) {
       songList[count] = song;
       count++;
      });
  console.log("This is the result : "+songList);
  return res.send({
    success: true,
    message: 'Success: results fetched',
    songList: songList
  });
});

 });

};
