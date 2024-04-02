const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const News = db.news

// const CampaignInfo = db.campaignInfo
// const AdgroupInfo = db.adgroupInfo
// const AdInfo = db.adInfo
const NewsChild = db.newschild
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

// Retrieve all campaigns
exports.getNewsAll = (req, res) => {
  News.findAll({
    order: [['id', 'DESC']],
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

// exports.getColumnsCategoryAll = (req, res) => {
//   ColumnCategory.findAll({
//     order: [['id', 'ASC']],
//     // group: "campaignId",
//   })
//     .then((data) => {
//       res.json(data)
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: err.message || 'Some error occurred while retrieving campaigns',
//       })
//     })
// }

exports.getOneNews = (req, res) => {
  // console.log(req.query);
  News.findOne({
    include:NewsChild,
    where:{
      id:req.query.id      
    }
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

