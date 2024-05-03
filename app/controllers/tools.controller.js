const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const OneSignal = require('onesignal-node');
const { ONE_SIGNAL_CONFIG }=require("../config/app.config");

const Client = db.client
const Query = db.query
const WantedCompany = db.wantedcompany

const Op = db.Sequelize.Op
const Sequelize = db.Sequelize
var request = 	require('request');

// Retrieve all campaigns
exports.getData = async(req, res) => {
  try {
    const url = req.query.url; // Get URL from query parameters
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
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

exports.addWantedCompany = async (req, res) => {
  console.log(req.body);  
  try {
    const wantedcompany = await WantedCompany.create({
      companyName: req.body.name,
      companyEmail: req.body.email,
      officialPosition: req.body.officialPosition,
      phoneNumber: req.body.phoneNumber,
      publishForm:req.body.publishForm
    });
    
    return res.status(200).json({ message: "success" });

  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getOneClient = async (req, res) => {
  // console.log(req.query);
  const client = await Client.findOne({
    where: {
      id: req.query.id
    },
  })
    .then((data) => {
      // console.log("111====", data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}


exports.deleteOne = async (req, res) => {
  console.log( req.query.id);
  try {
    const client = await Client.findOne({
      where: {
        id: req.query.id
      },
      order:[['id','DESC']],
    });
    client.destroy();

    return res.status(200).json({ message:"Success" })
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}
