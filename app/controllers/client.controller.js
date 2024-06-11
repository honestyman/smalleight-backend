const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
require('dotenv').config()
const config = require('config')
const nodemailer = require('nodemailer')

const Client = db.client
const Query = db.query
const WantedCompany = db.wantedcompany
const Like = db.like

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

exports.getCounts = async (req, res) => {
  try {
    const like=await Like.findAll();
    res.json(like[0].count)
  } catch (error) {
    res.status(500).json({
      message: error.message || '',
    })
  }
}

exports.addLike = async (req, res) => {
  try {
    const like = await Like.findAll();
    console.log(like);
    if(like.length > 0){
      like[0].count = like[0].count+1;
      like[0].save();
    }else{
      await Like.create({
          count:1
        }
      );
    }
    res.json( {message: "success"})
  } catch (error) {
    res.status(500).json({
      message: error.message || '',
    })
  }
}

exports.addQuery = async (req, res) => {
  try {
    console.log(req.body);  
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
