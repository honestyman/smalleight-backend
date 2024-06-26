const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const { query } = require('express-validator')
const cookieSession = require('cookie-session')
const { where } = require('sequelize')
const { name } = require('ejs')

const fs= require('fs')
const path = require('path');

const Company = db.company
const Client =db.client
const Solvedissue = db.solvedissue
const Startdate = db.startdate
const Expertise = db.expertise
const Tool = db.tool
const Pricesence = db.pricesence
const Industryexperience = db.industryexperience
const Campaign = db.campaign

const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

// Retrieve all campaigns
exports.getCompanyAll = async (req, res) => {
  const companys = await Company.findAll({
    include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience, Campaign],
    order: [['id', 'ASC']],
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}

exports.processAnswers = async (req, res) => {
  console.log(req.body);
  try {

    let result = [];
    // step1--------------------
    const companys = await Company.findAll({
      where: {
        publishForm:"掲載+リード"
      },
      include: Solvedissue
      // include: Expertise,
      // include: Startdate,
      // include: Pricesence,
    });
    var result1Len = 0;
    const result1 = [];
    if (companys && req.body.purpose) {
      for (let i = 0; i < req.body.purpose.length; i++) {
        for (let j = 0; j < companys.length; j++) {
          for (let k = 0; k < companys[j].solvedissues.length; k++) {
            // console.log(companys[j].solvedissues[k].text)
            if (req.body.purpose[i] == companys[j].solvedissues[k].text) {
              // console.log("===>",req.body.purpose[i]+" "+companys[j].solvedissues[k]);
              if (result1) {
                var flag = 1;
                for (let l = 0; l < result1Len; l++) {
                  if (result1[l].id == companys[j].id) {
                    flag = 0;
                  }
                }
                if (flag) {
                  result1[result1Len++] = companys[j];
                }
              } else {
                result1[result1Len++] = companys[j];
              }
            }
          }
        }
      }
    }
    if (result1.length) {
      result = [...result1];
    }
    // console.log("result1===>", result);

    // step2----------------------
    var result2Len = 0;
    const result2 = [];
    if (result.length) {
      const companys = [];
      for (let i = 0; i < result.length; i++) {
        companys[i] = await Company.findOne({
          include: Expertise,
          where: {
            id: result[i].id,
            publishForm:"掲載+リード"
          }
          // include: Startdate,
          // include: Pricesence,
        });
      }
      if (companys && req.body.measures) {
        for (let i = 0; i < req.body.measures.length; i++) {
          for (let j = 0; j < companys.length; j++) {
            for (let k = 0; k < companys[j].expertises.length; k++) {
              if (req.body.measures[i] == companys[j].expertises[k].text) {
                // console.log("===>",req.body.purpose[i]+" "+companys[j].solvedissues[k]);
                if (result2) {
                  var flag = 1;
                  for (let l = 0; l < result2Len; l++) {
                    if (result2[l].id == companys[j].id) {
                      flag = 0;
                    }
                  }
                  if (flag) {
                    result2[result2Len++] = companys[j];
                  }
                } else {
                  result2[result2Len++] = companys[j];
                }
              }
            }
          }
        }
      }
    } else {
      const companys = await Company.findAll({
        where:{
          publishForm:"掲載+リード"
        },
        include: Expertise,
        // include: Startdate,
        // include: Pricesence,
      });
      if (companys && req.body.measures) {
        for (let i = 0; i < req.body.measures.length; i++) {
          for (let j = 0; j < companys.length; j++) {
            for (let k = 0; k < companys[j].expertises.length; k++) {
              if (req.body.measures[i] == companys[j].expertises[k].text) {
                // console.log("===>",req.body.purpose[i]+" "+companys[j].solvedissues[k]);
                if (result2) {
                  var flag = 1;
                  for (let l = 0; l < result2Len; l++) {
                    if (result2[l].id == companys[j].id) {
                      flag = 0;
                    }
                  }
                  if (flag) {
                    result2[result2Len++] = companys[j];
                  }
                } else {
                  result2[result2Len++] = companys[j];
                }
              }
            }
          }
        }
      }
    }
    if (result2.length) {
      result = [...result2];
    }

    // step3----------------------
    var result3Len = 0;
    const result3 = [];
    if (result.length) {
      const companys = [];
      for (let i = 0; i < result.length; i++) {
        companys[i] = await Company.findOne({
          include: Startdate,
          where: {
            id: result[i].id,
            publishForm:"掲載+リード"
          }
          // include: Pricesence,
        });
      }
      if (companys && req.body.measures) {
        for (let i = 0; i < companys.length; i++) {
          if (req.body.startDate == companys[i].startdate.text) {
            if (result3) {
              var flag = 1;
              for (let j = 0; j < result3Len; j++) {
                if (result3[j].id == companys[i].id) {
                  flag = 0;
                }
              }
              if (flag) {
                result3[result3Len++] = companys[i];
              }
            } else {
              result3[result3Len++] = companys[i];
            }
          }
        }
      }
    } else {
      const companys = await Company.findAll({
        where:{
          publishForm:"掲載+リード"
        },
        include: Startdate
        // include: Pricesence,
      });
      if (companys && req.body.startDate) {
        for (let i = 0; i < companys.length; i++) {
          if (req.body.startDate == companys[i].startdate.text) {
            if (result3) {
              var flag = 1;
              for (let j = 0; j < result3Len; j++) {
                if (result3[j].id == companys[i].id) {
                  flag = 0;
                }
              }
              if (flag) {
                result3[result3Len++] = companys[i];
              }
            } else {
              result3[result3Len++] = companys[i];
            }
          }
        }
      }
    }
    if(result3.length){
      result=[...result3];
    }

     // step4----------------------
     var result4Len = 0;
     const result4 = [];
     if (result.length) {
       const companys = [];
       for (let i = 0; i < result.length; i++) {
         companys[i] = await Company.findOne({
           include: Pricesence,
           where: {
             id: result[i].id,
             publishForm:"掲載+リード"
           }
           // include: Pricesence,
         });
       }
       if (companys && req.body.measures) {
         for (let i = 0; i < companys.length; i++) {
           if (req.body.budget == companys[i].pricesence.text) {
             if (result4) {
               var flag = 1;
               for (let j = 0; j < result4Len; j++) {
                 if (result4[j].id == companys[i].id) {
                   flag = 0;
                 }
               }
               if (flag) {
                 result4[result4Len++] = companys[i];
               }
             } else {
               result3[result4Len++] = companys[i];
             }
           }
         }
       }
     } else {
       const companys = await Company.findAll({
         where:{
          publishForm:"掲載+リード"
         },
         include: Pricesence
       });
       if (companys && req.body.budget) {
         for (let i = 0; i < companys.length; i++) {
           if (req.body.budget == companys[i].pricesence.text) {
             if (result4) {
               var flag = 1;
               for (let j = 0; j < result4Len; j++) {
                 if (result4[j].id == companys[i].id) {
                   flag = 0;
                 }
               }
               if (flag) {
                 result4[result4Len++] = companys[i];
               }
             } else {
               result4[result4Len++] = companys[i];
             }
           }
         }
       }
     }
     if(result4.length){
       result=[...result4];
     }
     
     if(result.length){
      for(let i=0;i<result.length;i++){
        result[i] = await Company.findOne({
          include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience, Campaign],
          where: {
            id: result[i].id,
            publishForm:"掲載+リード"
          }
        });
      }
     }else{
      result = await Company.findAll({
        where: {
          publishForm:"掲載+リード"
        },
        include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience, Campaign],    
      });
     }
    //  console.log("result", result);
     
     const client = await Client.create({
       name:req.body.name,
       email:req.body.email,
       company:req.body.companyName,
       phoneNumber:req.body.phoneNumber,
       questionContent:req.body.questionContent,
       service:req.body.service,
       purpose:req.body.purpose.toString(),
       measures:req.body.measures.toString(),
       currentMeasures:req.body.currentMeasures.toString(),
       startDate:req.body.startDate,
       budget:req.body.budget
     })
    
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }

}

exports.addSelectedCompanies = async (req, res) => {
  console.log(req.body);
  try {
     const client = await Client.findOne({
      where:{
        name:req.body.name,
        email:req.body.email
      },
      order: [['id', 'DESC']],
     });
     console.log(client);
     const selectedCompaniesName=[];
     console.log("---", req.body.selectedCompanise.length);
     for(let i=0;i<req.body.selectedCompanise.length;i++){
      const company=await Company.findOne({
        where:{
          id:req.body.selectedCompanise[i]
        }
      });
      if(company){
        selectedCompaniesName[i]=company.name;
      }
     }
     console.log(selectedCompaniesName);
     client.selectedCompany=selectedCompaniesName.toString();
     client.save();
    return res.status(200).json({
      message: "success"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.processAnswersTool = async (req, res) => {
  console.log(req.body);
  try {
    let result = [];
    // step1--------------------
    const companys = await Company.findAll({
      where:{
        publishForm:"掲載+リード"
      },
      include: Tool
    });
    var result1Len = 0;
    const result1 = [];
    if (companys && req.body.findTool) {
      for (let i = 0; i < req.body.findTool.length; i++) {
        for (let j = 0; j < companys.length; j++) {
          for (let k = 0; k < companys[j].tools.length; k++) {
            // console.log(companys[j].solvedissues[k].text)
            if (req.body.findTool[i] == companys[j].tools[k].text) {
              // console.log("===>",req.body.purpose[i]+" "+companys[j].solvedissues[k]);
              if (result1) {
                var flag = 1;
                for (let l = 0; l < result1Len; l++) {
                  if (result1[l].id == companys[j].id) {
                    flag = 0;
                  }
                }
                if (flag) {
                  result1[result1Len++] = companys[j];
                }
              } else {
                result1[result1Len++] = companys[j];
              }
            }
          }
        }
      }
    }
    if (result1.length) {
      result = [...result1];
    }
    // console.log("result1===>", result);

    // step2----------------------
    var result2Len = 0;
    const result2 = [];
    if (result.length) {
      const companys = [];
      for (let i = 0; i < result.length; i++) {
        companys[i] = await Company.findOne({
          include: Startdate,
          where: {
            id: result[i].id,
            publishForm:"掲載+リード"
          }
          // include: Pricesence,
        });
      }
      if (companys && req.body.measures) {
        for (let i = 0; i < companys.length; i++) {
          if (req.body.startDate == companys[i].startdate.text) {
            if (result2) {
              var flag = 1;
              for (let j = 0; j < result2Len; j++) {
                if (result2[j].id == companys[i].id) {
                  flag = 0;
                }
              }
              if (flag) {
                result2[result2Len++] = companys[i];
              }
            } else {
              result2[result2Len++] = companys[i];
            }
          }
        }
      }
    } else {
      const companys = await Company.findAll({
        where:{
          publishForm:"掲載+リード"
        },
        include: Startdate
        // include: Pricesence,
      });
      if (companys && req.body.startDate) {
        for (let i = 0; i < companys.length; i++) {
          if (req.body.startDate == companys[i].startdate.text) {
            if (result2) {
              var flag = 1;
              for (let j = 0; j < result2Len; j++) {
                if (result2[j].id == companys[i].id) {
                  flag = 0;
                }
              }
              if (flag) {
                result2[result2Len++] = companys[i];
              }
            } else {
              result2[result2Len++] = companys[i];
            }
          }
        }
      }
    }
    if(result2.length){
      result=[...result2];
    }

     // step3----------------------
     var result3Len = 0;
     const result3 = [];
     if (result.length) {
       const companys = [];
       for (let i = 0; i < result.length; i++) {
         companys[i] = await Company.findOne({
           include: Pricesence,
           where: {
             id: result[i].id,
             publishForm:"掲載+リード"
           }
           // include: Pricesence,
         });
       }
       if (companys && req.body.measures) {
         for (let i = 0; i < companys.length; i++) {
           if (req.body.budget == companys[i].pricesence.text) {
             if (result3) {
               var flag = 1;
               for (let j = 0; j < result3Len; j++) {
                 if (result3[j].id == companys[i].id) {
                   flag = 0;
                 }
               }
               if (flag) {
                 result3[result3Len++] = companys[i];
               }
             } else {
               result3[result3Len++] = companys[i];
             }
           }
         }
       }
     } else {
       const companys = await Company.findAll({
         where:{
          publishForm:"掲載+リード"
        },
         include: Pricesence
       });
       if (companys && req.body.budget) {
         for (let i = 0; i < companys.length; i++) {
           if (req.body.budget == companys[i].pricesence.text) {
             if (result3) {
               var flag = 1;
               for (let j = 0; j < result3Len; j++) {
                 if (result3[j].id == companys[i].id) {
                   flag = 0;
                 }
               }
               if (flag) {
                 result3[result3Len++] = companys[i];
               }
             } else {
               result3[result3Len++] = companys[i];
             }
           }
         }
       }
     }
     if(result3.length){
       result=[...result3];
     }
     
     if(result.length){
      for(let i=0;i<result.length;i++){
        result[i] = await Company.findOne({
          include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience, Campaign],
          where: {
            id: result[i].id,
            publishForm:"掲載+リード"
          }
        });
      }
     }else{
      result = await Company.findAll({
        where:{
          publishForm:"掲載+リード"
        },
        include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience, Campaign],    
      });
     }
     const client = await Client.create({
      name:req.body.name,
      email:req.body.email,
      company:req.body.companyName,
      phoneNumber:req.body.phoneNumber,
      questionContent:req.body.questionContent,
      service:req.body.service,
      tools:req.body.findTool.toString(),
      startDate:req.body.startDate,
      budget:req.body.budget
    })

    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }

}

exports.getOneCompany = async (req, res) => {
  const companys = await Company.findOne({
    include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience, Campaign],
    where:{
      id:req.query.id
    },
    order: [['id', 'ASC']],
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}

exports.getSelectedCompany = async (req, res) => {
  console.log(req.query)
  try {
    const idArray=req.query.ids.split("&");
    const companies=[];
    console.log(idArray)
    for(let i=0;i<idArray.length;i++){
      companies[i] = await Company.findOne({
        include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience, Campaign],
        where:{
          id:idArray[i]
        }
      });
    }
    return res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.addSelectedOneCompany = async (req, res) => {
  console.log(req.body);
  try {
    const company = await Company.findOne({
      where:{
        id:req.body.companyId
      },
      order: [['id', 'ASC']],
    });
    const client = await Client.create({
      name:req.body.name,
      email:req.body.email,
      company:req.body.companyName,
      phoneNumber:req.body.phoneNumber,
      questionContent:req.body.questionContent,
      selectedCompany:company.name
    });
    return res.status(200).json({
      message:"success"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }

}

exports.addSelectedMultifulCompany = async (req, res) => {
  console.log(req.body);
  try {
    var companyName="";
    if(req.body.companyIds){
      const idArray = req.body.companyIds.split("&");
      console.log(idArray);
      for(let i=0;i<idArray.length;i++){
        var company = await Company.findOne({
          where:{
            id:idArray[i]
          },
          order: [['id', 'ASC']],
        });
        companyName+=company.name;
        if(idArray[i+1]){
          companyName+=",";
        }
      }
    }
    console.log(companyName)
    
    const client = await Client.create({
      name:req.body.name,
      email:req.body.email,
      company:req.body.companyName,
      phoneNumber:req.body.phoneNumber,
      questionContent:req.body.questionContent,
      selectedCompany:companyName
    });
    return res.status(200).json({
      message:"success"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }

}

exports.deleteOneCompany = async (req, res) => {
  console.log( req.query.id);
  try {
    const company = await Company.findOne({
      where: {
        id: req.query.id
      },
      include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience, Campaign],
      order:[['id','DESC']],
    });
    if(company){
        const campaigns = [];
        for (let i = 0; i < company.campaigns.length; i++) {
          campaigns[i] = await Campaign.findOne({
            where: { text: company.campaigns[i].text },
            order: [['text', 'ASC']],
          });
          await company.removeCampaign(([campaigns[i].id]));
        }
        const expertise = [];
        for (let i = 0; i < company.expertises.length; i++) {
          expertise[i] = await Expertise.findOne({
            where: { text: company.expertises[i].text },
            order: [['text', 'ASC']],
          });
          await company.removeExpertise(([expertise[i].id]));
        }
        const tools = [];
        for (let i = 0; i < company.tools.length; i++) {
          tools[i] = await Tool.findOne({
            where: { text: company.tools[i].text },
            order: [['text', 'ASC']],
          });
          await company.removeTool(([tools[i].id]));
        }
        const solvedissues = [];
        for (let i = 0; i < company.solvedissues.length; i++) {
          solvedissues[i] = await Solvedissue.findOne({
            where: { text: company.solvedissues[i].text },
            order: [['text', 'ASC']],
          });
          await company.removeSolvedissue(([solvedissues[i].id]));
        }
        const industryExperiences = [];
        for (let i = 0; i < company.industryexperiences.length; i++) {
          industryExperiences[i] = await Industryexperience.findOne({
            where: { text: company.industryexperiences[i].text },
            order: [['text', 'ASC']],
          });
          await company.removeIndustryexperience(([industryExperiences[i].id]));
        }
        const imagePath = path.join(__dirname, '../../uploads/img', company.logo);
          fs.unlink(imagePath, (error) => {
            if (error) {
              console.error('Error deleting image:', error);
            } else {
              console.log('Image deleted successfully');
            }
          });
        company.destroy();
    }

    return res.status(200).json({ message:"Success" })
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.getCampaignAll = async (req, res) => {
  const campaigns = await Campaign.findAll({
    order: [['id', 'ASC']]
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}
exports.getExpertiseAll = async (req, res) => {
  const expertise = await Expertise.findAll({
    order: [['id', 'ASC']]
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}

exports.getToolsAll = async (req, res) => {
  const tool = await Tool.findAll({
    order: [['id', 'ASC']]
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}

exports.getSolvedissueAll = async (req, res) => {
  const solvedissue = await Solvedissue.findAll({
    order: [['id', 'ASC']]
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}
exports.getPricesenceAll = async (req, res) => {
  const pricesence = await Pricesence.findAll({
    order: [['id', 'ASC']]
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}
exports.getStartDateAll = async (req, res) => {
  const startdate = await Startdate.findAll({
    order: [['id', 'ASC']]
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}
exports.getIndustryExperienceAll = async (req, res) => {
  const industryexperience = await Industryexperience.findAll({
    order: [['id', 'ASC']]
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || '',
      })
    })
}

exports.addCompany = async (req, res) => {
  console.log(req.body);
  try {
    const companies = await Company.findOne({
      where:{
        name: req.body.name
      }
    });
    if(!companies){
      const pricesence = await Pricesence.findOne({
        where:{
          text: req.body.pricesence
        }
      });
      const startdate = await Startdate.findOne({
        where:{
          text: req.body.startdate
        }
      });    
      const company = await Company.create({
        name: req.body.name,
        logo: req.body.logo,
        title: req.body.title,
        description: req.body.description,
        representativeName: req.body.representativeName,
        address: req.body.address,
        establishedYear: req.body.establishedYear,
        memberCount: req.body.memberCount,
        publishForm: req.body.publishForm,
        pricesenceId: pricesence.id,
        startdateId: startdate.id
      });
      const campaigns = [];
      for (let i = 0; i < req.body.campaigns.length; i++) {
        campaigns[i] = await Campaign.findOne({
          where: { text: req.body.campaigns[i] },
          order: [['text', 'ASC']],
        });
        await company.addCampaign(campaigns[i], { through: { selfGranted: false } });
      }
  
      const expertise = [];
      for (let i = 0; i < req.body.expertise.length; i++) {
        expertise[i] = await Expertise.findOne({
          where: { text: req.body.expertise[i] },
          order: [['text', 'ASC']],
        });
        await company.addExpertise(expertise[i], { through: { selfGranted: false } });
      }
      const tools = [];
      for (let i = 0; i < req.body.tools.length; i++) {
        tools[i] = await Tool.findOne({
          where: { text: req.body.tools[i] },
          order: [['text', 'ASC']],
        });
        await company.addTool(tools[i], { through: { selfGranted: false } });
      }
  
      const solvedissues = [];
      for (let i = 0; i < req.body.solvedissues.length; i++) {
        solvedissues[i] = await Solvedissue.findOne({
          where: { text: req.body.solvedissues[i] },
          order: [['text', 'ASC']],
        });
        await company.addSolvedissue(solvedissues[i], { through: { selfGranted: false } });
      }
  
      const industryExperiences = [];
      for (let i = 0; i < req.body.industryExperiences.length; i++) {
        industryExperiences[i] = await Industryexperience.findOne({
          where: { text: req.body.industryExperiences[i] },
          order: [['text', 'ASC']],
        });
        await company.addIndustryexperience(industryExperiences[i], { through: { selfGranted: false } });
      }
    }else{
      return res.status(500).json({
        message: "同じ名前の会社がすでに存在します。"
      });  
    }
    return res.status(200).json({
      message:"success"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}

exports.updateCompany = async (req, res) => {
  console.log(req.body);
  try {
    const company = await Company.findOne({
      where:{
        id: req.body.id
      },
      include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience, Campaign],
    });
    if(company){
      const pricesence = await Pricesence.findOne({
        where:{
          text: req.body.pricesence
        }
      });
      const startdate = await Startdate.findOne({
        where:{
          text: req.body.startdate
        }
      });    
      
        company.name = req.body.name,
        // logo: req.body.logo,
        company.title = req.body.title,
        company.description = req.body.description,
        company.representativeName = req.body.representativeName,
        company.address = req.body.address,
        company.establishedYear = req.body.establishedYear,
        company.memberCount = req.body.memberCount,
        company.publishForm = req.body.publishForm,
        company.sales = req.body.sales,
        company.pricesenceId = pricesence.id,
        company.startdateId = startdate.id

        if(req.body.logo){
          company.logo=req.body.logo
        }
        company.save();

        const campaigns = [];
        for (let i = 0; i < company.campaigns.length; i++) {
          campaigns[i] = await Campaign.findOne({
            where: { text: company.campaigns[i].text },
            order: [['text', 'ASC']],
          });
          await company.removeCampaign(([campaigns[i].id]));
        }
        for (let i = 0; i < req.body.campaigns.length; i++) {
          campaigns[i] = await Campaign.findOne({
            where: { text: req.body.campaigns[i] },
            order: [['text', 'ASC']],
          });
          await company.addCampaign(campaigns[i], { through: { selfGranted: false } });
        }
        const expertise = [];
        for (let i = 0; i < company.expertises.length; i++) {
          expertise[i] = await Expertise.findOne({
            where: { text: company.expertises[i].text },
            order: [['text', 'ASC']],
          });
          await company.removeExpertise(([expertise[i].id]));
        }
        for (let i = 0; i < req.body.expertise.length; i++) {
          expertise[i] = await Expertise.findOne({
            where: { text: req.body.expertise[i] },
            order: [['text', 'ASC']],
          });
          await company.addExpertise(expertise[i], { through: { selfGranted: false } });
        }
        const tools = [];
        for (let i = 0; i < company.tools.length; i++) {
          tools[i] = await Tool.findOne({
            where: { text: company.tools[i].text },
            order: [['text', 'ASC']],
          });
          await company.removeTool(([tools[i].id]));
        }
        for (let i = 0; i < req.body.tools.length; i++) {
          tools[i] = await Tool.findOne({
            where: { text: req.body.tools[i] },
            order: [['text', 'ASC']],
          });
          await company.addTool(tools[i], { through: { selfGranted: false } });
        }
  
      const solvedissues = [];
      for (let i = 0; i < company.solvedissues.length; i++) {
        solvedissues[i] = await Solvedissue.findOne({
          where: { text: company.solvedissues[i].text },
          order: [['text', 'ASC']],
        });
        await company.removeSolvedissue(([tools[i].id]));
      }
      for (let i = 0; i < req.body.solvedissues.length; i++) {
        solvedissues[i] = await Solvedissue.findOne({
          where: { text: req.body.solvedissues[i] },
          order: [['text', 'ASC']],
        });
        await company.addSolvedissue(solvedissues[i], { through: { selfGranted: false } });
      }
  
      const industryExperiences = [];
      for (let i = 0; i < company.industryexperiences.length; i++) {
        industryExperiences[i] = await Industryexperience.findOne({
          where: { text: company.industryexperiences[i].text },
          order: [['text', 'ASC']],
        });
        await company.removeIndustryexperience(([industryExperiences[i].id]));
      }
      for (let i = 0; i < req.body.industryExperiences.length; i++) {
        industryExperiences[i] = await Industryexperience.findOne({
          where: { text: req.body.industryExperiences[i] },
          order: [['text', 'ASC']],
        });
        await company.addIndustryexperience(industryExperiences[i], { through: { selfGranted: false } });
      }
    }

    return res.status(200).json({
      message:"success"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }
}