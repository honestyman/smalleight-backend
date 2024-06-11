const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const User = db.user

// Retrieve all campaigns

exports.addPlan=async(req, res)=>{
  try {
    var email=JSON.parse(req.body.email);
    var plan=JSON.parse(req.body.plan);
    const user=await User.update({ plan: plan[0] }, {
      where: {
        email: email
      }
    }); 
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}
exports.setNotification=async(req, res)=>{
  console.log(req.body);
  try {
    const user=await User.update({ notification: req.body.notification }, {
      where: {
        email: req.body.email
      }
    });
    return res.status(200).json("success")
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

// --------------admin--------------
exports.getAll = async (req, res) => {
  const users = await User.findAll({
    // order: [['recId', 'ASC']],
    // group: "campaignId",
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving campaigns',
      })
    })
}
