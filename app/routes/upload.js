const express = require("express");
const multer = require("multer");
const path = require("path");
require('dotenv').config();
const router = express.Router();
const config = require("config");
const moment = require('moment-timezone')

const { check, validationResult } = require("express-validator");

const db = require('../models');
const Company = db.company;
const Column = db.column;
const Columnfirstchild = db.columnfirstchild
const Columnsecondchild = db.columnsecondchild

const storageCompanyLogo = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where the file will be saved
    cb(null, './uploads/img/');
  },
  filename: async(req, file, cb) => {
        // Generate a unique filename for the uploaded file
    const company = await Company.findOne({
      where: {
        logo: file.originalname
      }
    });
    cb(null, Date.now().toString().slice(0,11)+file.originalname);
    company.logo = Date.now().toString().slice(0,11)+file.originalname;
    company.save();
  }
});  

const upload_Logo = multer({
   storage: storageCompanyLogo,
   fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
      var filetypes = /jpeg|jpg|png|webp/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
      );
      if (mimetype && extname) {
          return cb(null, true);
      }
      cb(
          "Error: File upload only supports the " +
              "following filetypes - " +
              filetypes
      );
  }, 
  }).single("file");

  const storageColumnThumbnail = multer.diskStorage({
    destination: (req, file, cb) => {
      // Specify the directory where the file will be saved
      cb(null, './uploads/img/');
    },
    filename: async(req, file, cb) => {
          // Generate a unique filename for the uploaded file
      const column = await Column.findOne({
        where: {
          thumbnail: file.originalname
        }
      });
      cb(null, Date.now().toString().slice(0,11)+file.originalname);
      column.thumbnail = Date.now().toString().slice(0,11)+file.originalname;
      column.save();
    }
  });  
  
  const upload_Thumbnail = multer({
     storage: storageColumnThumbnail,
     fileFilter: function (req, file, cb) {
      // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|webp/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(
            "Error: File upload only supports the " +
                "following filetypes - " +
                filetypes
        );
    }, 
    }).single("file");
  

    const storageColumnFirstImage = multer.diskStorage({
      destination: (req, file, cb) => {
        // Specify the directory where the file will be saved
        cb(null, './uploads/img/');
      },
      filename: async(req, file, cb) => {
            // Generate a unique filename for the uploaded file
        const columnfirstchild = await Columnfirstchild.findOne({
          where: {
            image: file.originalname
          },
          order: [['id', 'ASC']],
        });
        cb(null, Date.now().toString().slice(0,11)+file.originalname);
        columnfirstchild.image = Date.now().toString().slice(0,11)+file.originalname;
        columnfirstchild.save();
      }
    });  
    
    const upload_ColumnFirstImage = multer({
       storage: storageColumnFirstImage,
       fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
          var filetypes = /jpeg|jpg|png|webp/;
          var mimetype = filetypes.test(file.mimetype);
          var extname = filetypes.test(
              path.extname(file.originalname).toLowerCase()
          );
          if (mimetype && extname) {
              return cb(null, true);
          }
          cb(
              "Error: File upload only supports the " +
                  "following filetypes - " +
                  filetypes
          );
      }, 
      }).single("file");

      const storageColumnSecondImage = multer.diskStorage({
        destination: (req, file, cb) => {
          // Specify the directory where the file will be saved
          cb(null, './uploads/img/');
        },
        filename: async(req, file, cb) => {
              // Generate a unique filename for the uploaded file
          const columnsecondchild = await Columnsecondchild.findOne({
            where: {
              image: file.originalname
            },
            order: [['id', 'ASC']],
          });
          cb(null, Date.now().toString().slice(0,11)+file.originalname);
          columnsecondchild.image = Date.now().toString().slice(0,11)+file.originalname;
          columnsecondchild.save();
        }
      });  
      
      const upload_ColumnSecondImage = multer({
         storage: storageColumnSecondImage,
         fileFilter: function (req, file, cb) {
          // Set the filetypes, it is optional
            var filetypes = /jpeg|jpg|png|webp/;
            var mimetype = filetypes.test(file.mimetype);
            var extname = filetypes.test(
                path.extname(file.originalname).toLowerCase()
            );
            if (mimetype && extname) {
                return cb(null, true);
            }
            cb(
                "Error: File upload only supports the " +
                    "following filetypes - " +
                    filetypes
            );
        }, 
        }).single("file");

  // const storage_sound = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     // Specify the directory where the file will be saved
  //     cb(null, './uploads/sound/');
  //   },
  //   filename: async(req, file, cb) => {
  //     // Generate a unique filename for the uploaded file
  //     // console.log("==========>",date);
  //     const item = await Item.findOne({
  //       where: {
  //         filename: file.originalname
  //       },
  //     });
  //     cb(null, Date.now().toString().slice(0,11)+file.originalname);
  //     item.filename=Date.now().toString().slice(0,11)+file.originalname;
  //     item.save();
  //   }
  // });

  // const upload_sound = multer({
  //    storage: storage_sound, 
  //   }).single("sound");
// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send({msg: "Server Error "});
//   }
// });

// @route       POST api/auth
// @desc        Auth user & get Token
// @access      Public
router.post("/add_logoimage", function(req, res, next) {
  upload_Logo(req, res, function (err) {
    if (err) {
        res.send(err);
    } else {
        return res.status(200).json({ message: "Success!" });
    }
  });
});

router.post("/add_columnthumbnail", function(req, res, next) {
  upload_Thumbnail(req, res, function (err) {
    if (err) {
        res.send(err);
    } else {
        return res.status(200).json({ message: "Success!" });
    }
  });
});

router.post("/add_columnfirstimage", function(req, res, next) {
  upload_ColumnFirstImage(req, res, function (err) {
    if (err) {
        res.send(err);
    } else {
        return res.status(200).json({ message: "Success!" });
    }
  });
});

router.post("/add_columnsecondimage", function(req, res, next) {
  upload_ColumnSecondImage(req, res, function (err) {
    if (err) {
        res.send(err);
    } else {
        return res.status(200).json({ message: "Success!" });
    }
  });
});

// router.post("/addsound", function(req, res, next) {
//   upload_sound(req, res, function (err) {
//     if (err) {
//         // ERROR occurred (here it can be occurred due
//         // to uploading image of size greater than
//         // 1MB or uploading different file type)
//         res.send(err);
//     } else {
//         // SUCCESS, image successfully uploaded
//         res.send("Success, Sound uploaded!");
//     }
// });
//   // Error MiddleWare for multer file upload, so if any
//   // error occurs, the image would not be uploaded!
  
// });

module.exports = router;
