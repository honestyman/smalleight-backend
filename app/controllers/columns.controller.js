const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const { where } = require('sequelize')
const { text } = require('body-parser')
const Column = db.column
const Columnfirstchild = db.columnfirstchild
const Columnsecondchild = db.columnsecondchild
const Columncategory = db.columncategory

const fs= require('fs')
const path = require('path');

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
        model:Columnfirstchild,
        include: Columnsecondchild
      },Columncategory
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
  Columncategory.findAll({
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
  Column.findOne({
    include: [
      {
        model:Columnfirstchild,
        include: Columnsecondchild
      },Columncategory
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

exports.addOneColumn = async(req, res) => {
  console.log(req.body)
  try {
    const columns = await Column.findOne({
      where:{
        title:req.body.title
      }
    });
    if(!columns){
      const column = await Column.create({
        title: req.body.title,
        description: req.body.description,
        thumbnail: req.body.thumbnail
      });
      const columncategorys = [];
      for (let i = 0; i < req.body.columnCategories.length; i++) {
        columncategorys[i] = await Columncategory.findOne({
          where: { text: req.body.columnCategories[i] },
          order: [['text', 'ASC']],
        });
        await column.addColumncategory(columncategorys[i], { through: { selfGranted: false } });
      }
      // console.log(Math.max(req.body.firstTitleValues.length, req.body.firstContentValues.length))

    if(req.body.firstTitleValues || req.body.firstContentValues){
      for(let i=0; i < Math.max(req.body.firstTitleValues.length, req.body.firstContentValues.length); i++){
        var columnfirstChild = await Columnfirstchild.create({
          title: req.body.firstTitleValues[i].value,
          description: req.body.firstContentValues[i].value
        });
        await column.addColumnfirstchild(columnfirstChild, { through: { selfGranted: false } });
        var secondTitleValues=[];
        for(let j=0;j<req.body.secondTitleValues.length; j++){
          if(req.body.secondTitleValues[j].key[0]==req.body.firstTitleValues[i].key){
            secondTitleValues.push(req.body.secondTitleValues[j]);
          }
        }
        console.log("secondTitleValues=====>",secondTitleValues)

        var secondContentValues=[];
        for(let j=0;j<req.body.secondContentValues.length;j++){
          if(req.body.secondContentValues[j].key[0]==req.body.firstTitleValues[i].key){
            secondContentValues.push(req.body.secondContentValues[j]);
          }
        }
        console.log("secondContentValues=========>",secondContentValues);
        for(let k=0; k<Math.max(secondTitleValues.length, secondContentValues.length); k++){
          var columnsecondChild = await Columnsecondchild.create({
            title: secondTitleValues[k].value,
            description: secondContentValues[k].value,
          })
          await columnfirstChild.addColumnsecondchild(columnsecondChild, { through: { selfGranted: false } })
        }
      }
    }
    }else{
      return res.status(500).json({
        message: "同名のコラム記事が既に存在します。"
      });  
    }
    return res.status(200).json({
      message:"success"
    });
  } catch (error) {
    
  }
}

exports.deleteOneColumn = async (req, res) => {
  console.log( req.query.id);
  try {
    const column = await Column.findOne({
      where: {
        id: req.query.id
      },
      include: [
        {
          model:Columnfirstchild,
          include: Columnsecondchild
        },Columncategory
      ] ,
      order:[['id','DESC']],
    });
    console.log(column)
    if(column){
        // const columncategorys = [];
        // for (let i = 0; i < column.columncategories.length; i++) {
        //   columncategorys[i] = await Columncategory.findOne({
        //     where: { text: column.columncategories[i].text },
        //     order: [['text', 'ASC']],
        //   });
        //   await column.removeColumncategory(([columncategorys[i].id]));
        // }
        if(column.columnfirstchildren){
          for (let i = 0; i < column.columnfirstchildren.length; i++) {
            const columnfirstchildren = await Columnfirstchild.findOne({
              where: { id: column.columnfirstchildren[i].id },
              include: Columnsecondchild,
              order: [['id', 'ASC']],
            });
            if(columnfirstchildren.columnsecondchildren){
              // console.log("========>",columnfirstchildren.columnsecondchildren)
              for(let j=0; j<columnfirstchildren.columnsecondchildren.length; j++){
                const columnsecondchildren = await Columnsecondchild.findOne({
                  where: {
                    id: columnfirstchildren.columnsecondchildren[j].id
                  },
                  order: [['id', 'ASC']],
                });
                columnsecondchildren.destroy();
              }
            }
            columnfirstchildren.destroy();
          }
          const imagePath = path.join(__dirname, '../../uploads/img', column.thumbnail);
          fs.unlink(imagePath, (error) => {
            if (error) {
              console.error('Error deleting image:', error);
            } else {
              console.log('Image deleted successfully');
            }
          });
          column.destroy();
        }
    }

    return res.status(200).json({ message:"Success" })
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

