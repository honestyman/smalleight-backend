const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const OneSignal = require('onesignal-node');
const { ONE_SIGNAL_CONFIG }=require("../config/app.config");

const Client = db.client
const Query = db.query

const Op = db.Sequelize.Op
const Sequelize = db.Sequelize
var request = 	require('request');

// Retrieve all campaigns
exports.getAll = (req, res) => {
  Client.findAll({
    order: [['id', 'DESC']],
    // group: "campaignId",
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}

exports.addQuery = async (req, res) => {
  console.log(req.body);  
  
  try {
    const query = await Query.create({
      kind: req.body.kind,
      name: req.body.name,
      company: req.body.companyName,
      email: req.body.email,
      questionContent: req.body.questionContent
    });
    
    return res.status(200).json({ message: "success" });

  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}
// exports.getOneNotification = async (req, res) => {
//   // console.log(req.query);
//   const notifiaction = await Notification.findOne({
//     where: {
//       id: req.query.id
//     },
//   })
//     .then((data) => {
//       // console.log("111====", data);
//       res.json(data)
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: err.message || 'Some error occurred while retrieving campaigns',
//       })
//     })
// }



// exports.updateNotification = async (req, res) => {
//   // console.log("111", req.body); 
//   try {
//     const notification = await Notification.findOne({
//       where: {
//         id: req.body.id
//       },
//     });
//     notification.japanesetext=req.body.japanesetext;
//     notification.englishtext=req.body.englishtext;
//     notification.send_date=req.body.senddate;
//     notification.send_time=req.body.sendtime;
//     notification.save();  
//     return res.status(200).json("Success")
//   } catch (error) {
//     res.status(500).json({
//       message: error.message || ''
//     })
//   }
// }

// exports.deleteOne = async (req, res) => {
//   // console.log("111", req.query.id);
//   try {
//     const notifiaction = await Notification.findOne({
//       where: {
//         id: req.query.id
//       },
//       order:[['id','DESC']],
//     });
//     notifiaction.destroy();

//     return res.status(200).json("Success")
//   } catch (error) {
//     res.status(500).json({
//       message: error.message || ''
//     })
//   }
// }
