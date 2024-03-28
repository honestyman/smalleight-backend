const axios = require('axios')
const { format } = require('date-fns')
const db = require('../models')
const { query } = require('express-validator')
const Company = db.company
const Solvedissue = db.solvedissue
const Startdate = db.startdate
const Expertise = db.expertise
const Tool = db.tool
const Pricesence = db.pricesence
const Industryexperience = db.industryexperience

const Op = db.Sequelize.Op
const Sequelize = db.Sequelize

// Retrieve all campaigns
exports.getCompanyAll = async (req, res) => {
  const companys = await Company.findAll({
    include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience]
  })
    .then((data) => {
      // console.log("111====",data);
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving campaigns',
      })
    })
}

// exports.getPriceAll = async (req, res) => {
//   const pricesence = await PriceSence.findAll({
//     include: [Pricesence, Startdate, Expertise, Solvedissue, Tool, Industryexperience]
//   })
//     .then((data) => {
//       // console.log("111====",data);
//       res.json(data)
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: err.message || 'Some error occurred while retrieving campaigns',
//       })
//     })
// }

exports.processAnswers = async (req, res) => {
  console.log(req.body);
  try {
    let result = [];
    // step1--------------------
    const companys = await Company.findAll({
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
            id: result[i].id
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
            id: result[i].id
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
        include: Startdate,
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
             id: result[i].id
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
        //  include: Startdate,
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
          include: [Pricesence,Expertise],
          where: {
            id: result[i].id
          }
        });
      }
     }else{
      result = await Company.findAll({
        include: [Pricesence,Expertise],      
      });
     }
     console.log("result", result);
    return res.status(200).json(result)
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
      include: Tool
      // include: Expertise,
      // include: Startdate,
      // include: Pricesence,
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
            id: result[i].id
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
        include: Startdate,
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
             id: result[i].id
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
        //  include: Startdate,
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
          include: [Pricesence,Tool],
          where: {
            id: result[i].id
          }
        });
      }
     }else{
      result = await Company.findAll({
        include: [Pricesence,Tool],      
      });
     }
     console.log("result", result);
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message || ''
    })
  }

}
