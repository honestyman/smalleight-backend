const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const { where } = require('sequelize')
const News = db.news

// const CampaignInfo = db.campaignInfo
// const AdgroupInfo = db.adgroupInfo
// const AdInfo = db.adInfo
const Newschild = db.newschild
const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

const fs= require('fs')
const path = require('path')

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

exports.getOneNews = (req, res) => {
  // console.log(req.query);
  News.findOne({
    include:Newschild,
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

exports.addOneNews = async(req, res) => {
  console.log(req.body)
  try {
    const newsItem = await News.findOne({
      where:{
        title:req.body.title
      }
    });
    if(!newsItem){
      const news = await News.create({
        title: req.body.title,
        contents: req.body.contents,
        image: req.body.image
      }); 
    if(req.body.firstTitleValues || req.body.firstContentValues){
      for(let i=0; i < Math.max(req.body.firstTitleValues.length, req.body.firstContentValues.length); i++){
        var newsChild = await Newschild.create({
          title: req.body.firstTitleValues[i].value,
          description: req.body.firstContentValues[i].value,
          image:req.body.firstImageName[i]?req.body.firstImageName[i].image:null
        });
        await news.addNewschild(newsChild, { through: { selfGranted: false } });
        // console.log("======>",req.body.firstImage[i].image);
      }
    }
    }else{
      return res.status(500).json({
        message: " 同じ名前のニュースが既に存在します。"
      });  
    }
    return res.status(200).json({
      message:"success"
    });
  } catch (error) {
    
  }
}

exports.updateOneNews = async(req, res) => {
  console.log(req.body)
  try {
    const news = await News.findOne({
      where:{
        id: req.body.id
      },
      include:Newschild
    });
    if(news){
      // console.log(news)
      news.title = req.body.title;
      news.contents = req.body.contents;
      if(req.body.image){
        news.image=req.body.image
      }
      news.save();
      if(news.newschildren){
        for(let i=0; i<news.newschildren.length; i++){
          const newschild = await Newschild.findOne({
            where:{
              id: news.newschildren[i].id
            },
            order: [['id', 'ASC']]
          });
          newschild.destroy();
        }
      }
      if(req.body.firstTitleValues || req.body.firstContentValues){
        for(let i=0; i < Math.max(req.body.firstTitleValues.length, req.body.firstContentValues.length); i++){
          var newsChild = await Newschild.create({
            title: req.body.firstTitleValues[i].value,
            description: req.body.firstContentValues[i].value,
            image:req.body.firstImageName[i]?req.body.firstImageName[i].image:null
          });
          await news.addNewschild(newsChild, { through: { selfGranted: false } });
          // console.log("======>",req.body.firstImage[i].image);
        }
      }
    }
    return res.status(200).json({
      message:"success"
    });
  } catch (error) {
    
  }
}

exports.deleteOneNews = async (req, res) => {
  console.log( req.query.id);
  try {
    const news = await News.findOne({
      where: {
        id: req.query.id
      },
      include: Newschild,
      order:[['id','ASC']],
    });
    // console.log(column)
    if(news){
        if(news.newschildren){
          for (let i = 0; i < news.newschildren.length; i++) {
            const newschild = await Newschild.findOne({
              where: { id: news.newschildren[i].id },
              order: [['id', 'ASC']],
            });
            if(newschild.image){
              const firstimagePath = path.join(__dirname, '../../uploads/img', newschild.image);
              fs.unlink(firstimagePath, (error) => {
                if (error) {
                  console.error('Error deleting image:', error);
                } else {
                  console.log('Image deleted successfully');
                }
              });
            }
            newschild.destroy();
          }
          if(news.image){
            const imagePath = path.join(__dirname, '../../uploads/img', news.image);
            fs.unlink(imagePath, (error) => {
              if (error) {
                console.error('Error deleting image:', error);
              } else {
                console.log('Image deleted successfully');
              }
            });
          }
          news.destroy();
        }
    }

    return res.status(200).json({ message:"Success" })
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}