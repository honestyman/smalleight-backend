const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const Column = db.column
const ColumnFirstChild = db.columnfirstchild
const ColumnSecondChild = db.columnsecondchild
const ColumnCategory = db.columncategory
// const CampaignInfo = db.campaignInfo
// const AdgroupInfo = db.adgroupInfo
// const AdInfo = db.adInfo
// const User = db.user
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

// Retrieve all campaigns
exports.getColumnsAll = (req, res) => {
  Column.findAll({
    include: [
      {
        model:ColumnFirstChild,
        include: ColumnSecondChild
      },ColumnCategory
    ] ,
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

exports.getColumnsCategoryAll = (req, res) => {
  ColumnCategory.findAll({
    order: [['id', 'ASC']],
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

exports.getOneColumn = (req, res) => {
  console.log(req.query);
  Column.findOne({
    include: [
      {
        model:ColumnFirstChild,
        include: ColumnSecondChild
      }
    ] ,
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

