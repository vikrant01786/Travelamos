var express = require('express');
var router = express.Router();
var admin= require('../../models/admin/admin');



router.post('/', function(req, res, next) {
    if(req.query.mode){
      switch (req.query.mode){

        case 'SaveNewDestinationOption' :
          if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
            insertInd = true;
          } else {
            insertInd = false;
          }
            admin.SaveDestinationOption(req.body,insertInd,function(err,count){
              if(err)
              {
                res.json(err);
              }
              else
              {
                res.json(count);
              }

        });
        break;

        case 'SaveNewDestination' :
          admin.getMaxRow('LocationID','destination',function(err,count){
            if(count[0].MaxValue === null){
              count[0].MaxValue = 0;
              const CountAfterIncrement = count[0].MaxValue + 1;
              admin.SaveDestination(req.body,CountAfterIncrement,function(err,count){
                if(err)
                {
                  res.json(err);
                }
                else
                {
                  res.json(count);
                }
              });
            }else {
             const CountAfterIncrement = count[0].MaxValue + 1;
              admin.SaveDestination(req.body,CountAfterIncrement,function(err,count){
              if(err)
              {
                res.json(err);
              }
              else
              {
                res.json(count);
              }
            });
            }
        });
        break;

        case 'SaveCountry' :
          admin.getMaxRow('LocationID','country',function(err,count){
            if(count[0].MaxValue === null){
              count[0].MaxValue = 0;
              const CountAfterIncrement = count[0].MaxValue + 1;
              admin.saveCountry(req.body,CountAfterIncrement,function(err,count){
                if(err)
                {
                  res.json(err);
                }
                else
                {
                  res.json(count);
                }
              });
            }else {
             const CountAfterIncrement = count[0].MaxValue + 1;
              admin.saveCountry(req.body,CountAfterIncrement,function(err,count){
              if(err)
              {
                res.json(err);
              }
              else
              {
                res.json(count);
              }
            });
            }
        });
        break;
  case 'SaveNewCountryOption' :
          if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
            insertInd = true;
          } else {
            insertInd = false;
          }
            admin.SaveCountryOption(req.body,insertInd,function(err,count){
              if(err)
              {
                res.json(err);
              }
              else
              {
                res.json(count);
              }

        });
        break;
   
        case 'SaveDestinationImages' :
      
          admin.getMaxRow('LocationID','destination_images',function(err,count){
            if(count[0].MaxValue === null){
              count[0].MaxValue = 0;
              const CountAfterIncrement = count[0].MaxValue + 1;
              admin.saveDestinationImage(req.body,CountAfterIncrement,function(err,count){
                if(err)
                {
                  res.json(err);
                }
                else
                {
                  res.json(count);
                }
              });
            }else {
             const CountAfterIncrement = count[0].MaxValue + 1;
              admin.saveDestinationImage(req.body,CountAfterIncrement,function(err,count){
              if(err)
              {
                res.json(err);
              }
              else
              {
                res.json(count);
              }
            });
            }
        });
        break; 


      case 'SaveNewDestinationImageOption' :
                    if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                      insertInd = true;
                    } else {
                      insertInd = false;
                    }
                      admin.SaveDestinationImageOption(req.body,insertInd,function(err,count){
                        if(err)
                        {
                          res.json(err);
                        }
                        else
                        {
                          res.json(count);
                        }
          
                  });
                  break; 

                  
      case 'SaveCountryImages' :
      
                    admin.getMaxRow('LocationID','country_images',function(err,count){
                      if(count[0].MaxValue === null){
                        count[0].MaxValue = 0;
                        const CountAfterIncrement = count[0].MaxValue + 1;
                        admin.saveCountryImage(req.body,CountAfterIncrement,function(err,count){
                          if(err)
                          {
                            res.json(err);
                          }
                          else
                          {
                            res.json(count);
                          }
                        });
                      }else {
                       const CountAfterIncrement = count[0].MaxValue + 1;
                        admin.saveCountryImage(req.body,CountAfterIncrement,function(err,count){
                        if(err)
                        {
                          res.json(err);
                        }
                        else
                        {
                          res.json(count);
                        }
                      });
                      }
                  });
                break; //in use


  case 'SaveNewCountryImageOption' :
                    if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                      insertInd = true;
                    } else {
                      insertInd = false;
                    }
                      admin.SaveCountryImageOption(req.body,insertInd,function(err,count){
                        if(err)
                        {
                          res.json(err);
                        }
                        else
                        {
                          res.json(count);
                        }
          
                  });
                  break; //In Use


  case 'SaveCountryAttractionImages' : 

            admin.getMaxRow('LocationID','country_attraction_images',function(err,count){
              if(count[0].MaxValue === null){
                count[0].MaxValue = 0;
                const CountAfterIncrement = count[0].MaxValue + 1;
                admin.saveAttractionImage(req.body,CountAfterIncrement,function(err,count){
                  if(err)
                  {
                    res.json(err);
                  }
                  else
                  {
                    res.json(count);
                  }
                });
              }else {
               const CountAfterIncrement = count[0].MaxValue + 1;
                admin.saveAttractionImage(req.body,CountAfterIncrement,function(err,count){
                if(err)
                {
                  res.json(err);
                }
                else
                {
                  res.json(count);
                }
              });
              }
          });
          break; //in Use

case 'SaveNewAttractionImageOption' :
            if(req.body.AttractionId == null || req.body.AttractionId == '' || req.body.AttractionId == 0 || req.body.AttractionId == 'undefined' ){
              insertInd = true;
            } else {
              insertInd = false;
            }
              admin.SaveCountryAttractionImageOption(req.body,insertInd,function(err,count){
                if(err)
                {
                  res.json(err);
                }
                else
                {
                  res.json(count);
                }
  
          });
          break; //in Use


          case 'SaveHeader' :
      
                        if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                          insertInd = true;
                        } else {
                          insertInd = false;
                        }
                        admin.saveHeader(req.body,insertInd,function(err,count){
                          if(err)
                          {
                            res.json(err);
                          }
                          else
                          {
                            res.json(count);
                          }
                        });
                        break;

          case 'SaveContactInfo' :
      
                          if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                            insertInd = true;
                          } else {
                            insertInd = false;
                          }
                          admin.saveFooterContactInfo(req.body,insertInd,function(err,count){
                            if(err)
                            {
                              res.json(err);
                            }
                            else
                            {
                              res.json(count);
                            }
                          });
                          break; 
            case 'SaveBlogPosts' :
      
                            if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                              insertInd = true;
                            } else {
                              insertInd = false;
                            }
                            admin.saveBlogPosts(req.body,insertInd,function(err,count){
                              if(err)
                              {
                                res.json(err);
                              }
                              else
                              {
                                res.json(count);
                              }
                            });
                            break; 
            case 'SaveDescription' :
      
                              if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                insertInd = true;
                              } else {
                                insertInd = false;
                              }
                              admin.saveDescription(req.body,insertInd,function(err,count){
                                if(err)
                                {
                                  res.json(err);
                                }
                                else
                                {
                                  res.json(count);
                                }
                              });
                              break;
            case 'SaveTags' :
      
                                if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                  insertInd = true;
                                } else {
                                  insertInd = false;
                                }
                                admin.saveTags(req.body,insertInd,function(err,count){
                                  if(err)
                                  {
                                    res.json(err);
                                  }
                                  else
                                  {
                                    res.json(count);
                                  }
                                });
                                break;  
            case 'SaveSliderImages' :
      
                                  if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                    insertInd = true;
                                  } else {
                                    insertInd = false;
                                  }
                                  admin.saveSlider(req.body,insertInd,function(err,count){
                                    if(err)
                                    {
                                      res.json(err);
                                    }
                                    else
                                    {
                                      res.json(count);
                                    }
                                  });
                                  break;  
             case 'SaveLogo' :
      
                                    if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                      insertInd = true;
                                    } else {
                                      insertInd = false;
                                    }
                                    admin.saveLogo(req.body,insertInd,function(err,count){
                                      if(err)
                                      {
                                        res.json(err);
                                      }
                                      else
                                      {
                                        res.json(count);
                                      }
                                    });
                                    break; 

              case 'SaveCity' : 

                                      admin.getMaxRow('LocationID','city',function(err,count){
                                        if(count[0].MaxValue === null){
                                          count[0].MaxValue = 0;
                                          const CountAfterIncrement = count[0].MaxValue + 1;
                                          admin.saveCity(req.body,CountAfterIncrement,function(err,count){
                                            if(err)
                                            {
                                              res.json(err);
                                            }
                                            else
                                            {
                                              res.json(count);
                                            }
                                          });
                                        }else {
                                         const CountAfterIncrement = count[0].MaxValue + 1;
                                          admin.saveCity(req.body,CountAfterIncrement,function(err,count){
                                          if(err)
                                          {
                                            res.json(err);
                                          }
                                          else
                                          {
                                            res.json(count);
                                          }
                                        });
                                        }
                                    });
                                    break; //in Use


               case 'SaveCityNewOption' :
      
                                      if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                        insertInd = true;
                                      } else {
                                        insertInd = false;
                                      }
                                      admin.saveCityNewOption(req.body,insertInd,function(err,count){
                                
                                        if(err)
                                        {
                                          res.json(err);
                                        }
                                        else
                                        {
                                          res.json(count);
                                        }
                                      });
                                      break;

                case 'SaveCityImages' :
      
                                          admin.getMaxRow('LocationID','city_images',function(err,count){
                                            if(count[0].MaxValue === null){
                                              count[0].MaxValue = 0;
                                              const CountAfterIncrement = count[0].MaxValue + 1;
                                              admin.saveCityImages(req.body,CountAfterIncrement,function(err,count){
                                                if(err)
                                                {
                                                  res.json(err);
                                                }
                                                else
                                                {
                                                  res.json(count);
                                                }
                                              });
                                            }else {
                                             const CountAfterIncrement = count[0].MaxValue + 1;
                                              admin.saveCityImages(req.body,CountAfterIncrement,function(err,count){
                                              if(err)
                                              {
                                                res.json(err);
                                              }
                                              else
                                              {
                                                res.json(count);
                                              }
                                            });
                                            }
                                        });
                                      break; //in use

                  case 'SaveHotel' :
      
                                        admin.getMaxRow('LocationID','hotel',function(err,count){
                                          if(count[0].MaxValue === null){
                                            count[0].MaxValue = 0;
                                            const CountAfterIncrement = count[0].MaxValue + 1;
                                            admin.saveHotel(req.body,CountAfterIncrement,function(err,count){
                                              if(err)
                                              {
                                                res.json(err);
                                              }
                                              else
                                              {
                                                res.json(count);
                                              }
                                            });
                                          }else {
                                           const CountAfterIncrement = count[0].MaxValue + 1;
                                            admin.saveHotel(req.body,CountAfterIncrement,function(err,count){
                                            if(err)
                                            {
                                              res.json(err);
                                            }
                                            else
                                            {
                                              res.json(count);
                                            }
                                          });
                                          }
                                      });
                                    break; //in use



                   case 'SaveHotelNewoption' :
      
                                      if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                        insertInd = true;
                                      } else {
                                        insertInd = false;
                                      }
                                      admin.saveHotelNewOption(req.body,insertInd,function(err,count){
                                
                                        if(err)
                                        {
                                          res.json(err);
                                        }
                                        else
                                        {
                                          res.json(count);
                                        }
                                      });
                                      break; //in use




                    case 'SaveHotelImages' :
      
                                        admin.getMaxRow('LocationID','hotel_images',function(err,count){
                                          if(count[0].MaxValue === null){
                                            count[0].MaxValue = 0;
                                            const CountAfterIncrement = count[0].MaxValue + 1;
                                            admin.saveHotelImages(req.body,CountAfterIncrement,function(err,count){
                                              if(err)
                                              {
                                                res.json(err);
                                              }
                                              else
                                              {
                                                res.json(count);
                                              }
                                            });
                                          }else {
                                           const CountAfterIncrement = count[0].MaxValue + 1;
                                            admin.saveHotelImages(req.body,CountAfterIncrement,function(err,count){
                                            if(err)
                                            {
                                              res.json(err);
                                            }
                                            else
                                            {
                                              res.json(count);
                                            }
                                          });
                                          }
                                      });
                                    break; //in use



                  case 'SaveHotelImagesNewOption' :
      
                                      if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                        insertInd = true;
                                      } else {
                                        insertInd = false;
                                      }
                                      admin.saveHotelImagesNewOption(req.body,insertInd,function(err,count){
                                
                                        if(err)
                                        {
                                          res.json(err);
                                        }
                                        else
                                        {
                                          res.json(count);
                                        }
                                      });
                                      break; //in use

                case 'SaveCategory' :
      
                                              if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                insertInd = true;
                                              } else {
                                                insertInd = false;
                                              }
                                              admin.saveCategory(req.body,insertInd,function(err,count){
                                                  // console.log(req.body);
                                                if(err)
                                                {
                                                  res.json(err);
                                                }
                                                else
                                                {
                                                  res.json(count);
                                                }
                                              });
                                              break;

                 case 'SavePriceCategory' :
      
                                                admin.getMaxRow('LocationID','price_category',function(err,count){
                                                  if(count[0].MaxValue === null){
                                                    count[0].MaxValue = 0;
                                                    const CountAfterIncrement = count[0].MaxValue + 1;
                                                    admin.savePriceCategory(req.body,CountAfterIncrement,function(err,count){
                                                      if(err)
                                                      {
                                                        res.json(err);
                                                      }
                                                      else
                                                      {
                                                        res.json(count);
                                                      }
                                                    });
                                                  }else {
                                                   const CountAfterIncrement = count[0].MaxValue + 1;
                                                    admin.savePriceCategory(req.body,CountAfterIncrement,function(err,count){
                                                    if(err)
                                                    {
                                                      res.json(err);
                                                    }
                                                    else
                                                    {
                                                      res.json(count);
                                                    }
                                                  });
                                                  }
                                              });
                                            break; //in use

                 case 'SavePriceCategoryNewOption' :
      
                                              if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                insertInd = true;
                                              } else {
                                                insertInd = false;
                                              }
                                              admin.savePriceCategoryNewOption(req.body,insertInd,function(err,count){
                                                  // console.log(req.body);
                                                if(err)
                                                {
                                                  res.json(err);
                                                }
                                                else
                                                {
                                                  res.json(count);
                                                }
                                              });
                                              break; // in use


                  case 'SaveTourPackages' :
      
                                                  admin.getMaxRow('LocationID','tour_packages',function(err,count){
                                                    if(count[0].MaxValue === null){
                                                      count[0].MaxValue = 0;
                                                      const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourPackages(req.body,CountAfterIncrement,function(err,count){
                                                        if(err)
                                                        {
                                                          res.json(err);
                                                        }
                                                        else
                                                        {
                                                          res.json(count);
                                                        }
                                                      });
                                                    }else {
                                                     const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourPackages(req.body,CountAfterIncrement,function(err,count){
                                                      if(err)
                                                      {
                                                        res.json(err);
                                                      }
                                                      else
                                                      {
                                                        res.json(count);
                                                      }
                                                    });
                                                    }
                                                });
                                              break; //in use


                    case 'SaveTourPackagesNewOption' :
      
                                                if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                  insertInd = true;
                                                } else {
                                                  insertInd = false;
                                                }
                                                admin.saveTourPackagesNewOption(req.body,insertInd,function(err,count){
                                                    // console.log(req.body);
                                                  if(err)
                                                  {
                                                    res.json(err);
                                                  }
                                                  else
                                                  {
                                                    res.json(count);
                                                  }
                                                });
                                                break;



                   case 'SaveProgram' :
      
                                                  admin.getMaxRow('LocationID','program',function(err,count){
                                                    if(count[0].MaxValue === null){
                                                      count[0].MaxValue = 0;
                                                      const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourProgram(req.body,CountAfterIncrement,function(err,count){
                                                        if(err)
                                                        {
                                                          res.json(err);
                                                        }
                                                        else
                                                        {
                                                          res.json(count);
                                                        }
                                                      });
                                                    }else {
                                                     const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourProgram(req.body,CountAfterIncrement,function(err,count){
                                                      if(err)
                                                      {
                                                        res.json(err);
                                                      }
                                                      else
                                                      {
                                                        res.json(count);
                                                      }
                                                    });
                                                    }
                                                });
                                              break; //in use

               case 'SaveProgramNewOption' :
      
                                                if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                  insertInd = true;
                                                } else {
                                                  insertInd = false;
                                                }
                                                admin.saveProgramNewOption(req.body,insertInd,function(err,count){
                                                    console.log(req.body.Id);
                                                  if(err)
                                                  {
                                                    res.json(err);
                                                  }
                                                  else
                                                  {
                                                    res.json(count);
                                                  }
                                                });
                                                break;// in use

                   case 'SaveProgramDays' :
      
                                                  admin.getMaxRow('LocationID','days',function(err,count){
                                                    if(count[0].MaxValue === null){
                                                      count[0].MaxValue = 0;
                                                      const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveProgramDays(req.body,CountAfterIncrement,function(err,count){
                                                        if(err)
                                                        {
                                                          res.json(err);
                                                        }
                                                        else
                                                        {
                                                          res.json(count);
                                                        }
                                                      });
                                                    }else {
                                                     const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveProgramDays(req.body,CountAfterIncrement,function(err,count){
                                                      if(err)
                                                      {
                                                        res.json(err);
                                                      }
                                                      else
                                                      {
                                                        res.json(count);
                                                      }
                                                    });
                                                    }
                                                });
                                              break; //in use


      case 'SaveProgramDaysNewOption' :
      
                                                if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                  insertInd = true;
                                                } else {
                                                  insertInd = false;
                                                }
                                                admin.SaveProgramDaysNewOption(req.body,insertInd,function(err,count){
                                      
                                                  if(err)
                                                  {
                                                    res.json(err);
                                                  }
                                                  else
                                                  {
                                                    res.json(count);
                                                  }
                                                });
                                                break;// in use

        case 'SaveUpdatedDay' :
      
                                                  admin.SaveUpdatedDay(req.body,function(err,count){
                                        
                                                    if(err)
                                                    {
                                                      res.json(err);
                                                    }
                                                    else
                                                    {
                                                      res.json(count);
                                                    }
                                                  });
                                                  break;// in use

      case 'SaveTour' :
      
                                                  admin.getMaxRow('LocationID','tour',function(err,count){
                                                    if(count[0].MaxValue === null){
                                                      count[0].MaxValue = 0;
                                                      const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTour(req.body,CountAfterIncrement,function(err,count){
                                                        if(err)
                                                        {
                                                          res.json(err);
                                                        }
                                                        else
                                                        {
                                                          res.json(count);
                                                        }
                                                      });
                                                    }else {
                                                     const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTour(req.body,CountAfterIncrement,function(err,count){
                                                      if(err)
                                                      {
                                                        res.json(err);
                                                      }
                                                      else
                                                      {
                                                        res.json(count);
                                                      }
                                                    });
                                                    }
                                                });
                                              break; //in use


                    case 'SaveTourNewOption' :
      
                                                if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                  insertInd = true;
                                                } else {
                                                  insertInd = false;
                                                }
                                                admin.saveTourDetailsNewOption(req.body,insertInd,function(err,count){
                                      
                                                  if(err)
                                                  {
                                                    res.json(err);
                                                  }
                                                  else
                                                  {
                                                    res.json(count);
                                                  }
                                                });
                                                break;// in use




                    case 'SaveTourImages' :
      
                                                  admin.getMaxRow('LocationID','tour_images',function(err,count){
                                                    if(count[0].MaxValue === null){
                                                      count[0].MaxValue = 0;
                                                      const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourImages(req.body,CountAfterIncrement,function(err,count){
                                                        if(err)
                                                        {
                                                          res.json(err);
                                                        }
                                                        else
                                                        {
                                                          res.json(count);
                                                        }
                                                      });
                                                    }else {
                                                     const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourImages(req.body,CountAfterIncrement,function(err,count){
                                                      if(err)
                                                      {
                                                        res.json(err);
                                                      }
                                                      else
                                                      {
                                                        res.json(count);
                                                      }
                                                    });
                                                    }
                                                });
                                              break; //in use

                    case 'SaveTourImagesNewOption' :
      
                                                if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                  insertInd = true;
                                                } else {
                                                  insertInd = false;
                                                }
                                                admin.saveTourImagesNewOption(req.body,insertInd,function(err,count){ 
                                                                    
                                                  if(err)
                                                  {
                                                    res.json(err);
                                                  }
                                                  else
                                                  {
                                                    res.json(count);
                                                  }
                                                });
                                                break;// in use



                    case 'SaveTourServices' :
      
                                                  admin.getMaxRow('LocationID','tour_services',function(err,count){
                                                    if(count[0].MaxValue === null){
                                                      count[0].MaxValue = 0;
                                                      const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourServices(req.body,CountAfterIncrement,function(err,count){
                                                        if(err)
                                                        {
                                                          res.json(err);
                                                        }
                                                        else
                                                        {
                                                          res.json(count);
                                                        }
                                                      });
                                                    }else {
                                                     const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourServices(req.body,CountAfterIncrement,function(err,count){
                                                      if(err)
                                                      {
                                                        res.json(err);
                                                      }
                                                      else
                                                      {
                                                        res.json(count);
                                                      }
                                                    });
                                                    }
                                                });
                                              break; //in use

                   case 'SaveTourServicesNewOption' :
      
                                                if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                  insertInd = true;
                                                } else {
                                                  insertInd = false;
                                                }
                                                admin.saveTourServicesNewOption(req.body,insertInd,function(err,count){                       
                                                  if(err)
                                                  {
                                                    res.json(err);
                                                  }
                                                  else
                                                  {
                                                    res.json(count);
                                                  }
                                                });
                                                break; // in use



                    case 'SaveTourTerm' :
      
                                                  admin.getMaxRow('LocationID','tour_terms',function(err,count){
                                                    if(count[0].MaxValue === null){
                                                      count[0].MaxValue = 0;
                                                      const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourTerm(req.body,CountAfterIncrement,function(err,count){
                                                        if(err)
                                                        {
                                                          res.json(err);
                                                        }
                                                        else
                                                        {
                                                          res.json(count);
                                                        }
                                                      });
                                                    }else {
                                                     const CountAfterIncrement = count[0].MaxValue + 1;
                                                      admin.saveTourTerm(req.body,CountAfterIncrement,function(err,count){
                                                      if(err)
                                                      {
                                                        res.json(err);
                                                      }
                                                      else
                                                      {
                                                        res.json(count);
                                                      }
                                                    });
                                                    }
                                                });
                                              break; //in use

                case 'SaveTourTermNewOption' :
      
                                                if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                  insertInd = true;
                                                } else {
                                                  insertInd = false;
                                                }
                                                admin.saveTourTermNewOption(req.body,insertInd,function(err,count){ 
                                                        
                                                  if(err)
                                                  {
                                                    res.json(err);
                                                  }
                                                  else
                                                  {
                                                    res.json(count);
                                                  }
                                                });
                                                break; // in use

               case 'SaveLanguages' :
      
                                                            if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
                                                              insertInd = true;
                                                            } else {
                                                              insertInd = false;
                                                            }
                                                            admin.saveLanguages(req.body,insertInd,function(err,count){ 
                                                              // console.log(req.body, 'Tour Service Data');                       
                                                              if(err)
                                                              {
                                                                res.json(err);
                                                              }
                                                              else
                                                              {
                                                                res.json(count);
                                                              }
                                                            });
                                                            break;
      }
    }
    });




    
router.get('/',function(req,res,next){

    if(req.query.mode){
        switch (req.query.mode){
  
            case 'DestinationListAccordingToLanguage' :
                admin.getDestinationListAccordingToLanguage(req.query.Lang,function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else
                    {
                        res.json(rows);
                    }     
                });
                break;

     case 'GetDestinationLocationID' :
                  admin.getDestinationLocationID(req.query.Id,function(err,rows){
                      if(err)
                      {
                          res.json(err);
                      }
                      else
                      {
                          res.json(rows);
                      }     
                  });
                  break;


  case 'TourByTourID' :
                    admin.getTourByTourID(req.query.Id,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    break;

  case 'GetCountryByCountryIDInProgramNewOption' :
                      admin.getCountryByCountryIDInProgramNewOption(req.query.Id,function(err,rows){
                          if(err)
                          {
                              res.json(err);
                          }
                          else
                          {
                              res.json(rows);
                          }     
                      });
                      break;

   case 'DestinationListByDestinationLocationID' :
                    admin.getDestinationListByDestinationLocationIDAndLanguage(req.query.Lang,req.query.Id,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    break;
                
            case 'DestinationListInDestinationImages' :
                  admin.getDestinationListInDestinationImages(req.query.Lang,req.query.Id,function(err,rows){
                      if(err)
                      {
                          res.json(err);
                      }
                      else
                      {
                          res.json(rows);
                      }     
                  });
                  break; 
        case 'DestinationListInEnglish' :
                    admin.getDestinationListInEnglish(req.query.Lang,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    break; 
             case 'DestinationListInDestinationImagesByDestinationId' :
                  admin.getDestinationListInDestinationImagesByDestinationId(req.query.Id,function(err,rows){
                      if(err)
                      {
                          res.json(err);
                      }
                      else
                      {
                          res.json(rows);
                      }     
                  });
                  break;
              case 'DestinationListByDestinationID' :
                    admin.getDestinationListByDestinationID(req.query.Id,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    break;
             case 'LanguagesListByLanguageValue' :
                    admin.getLanguagesListByLanguageValue(req.query.LanguageValue,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    break; 
                    
              case 'LanguagesListInCityDetails' :
                      admin.getLanguagesListInCityDetails(function(err,rows){
                          if(err)
                          {
                              res.json(err);
                          }
                          else
                          {
                              res.json(rows);
                          }     
                      });
                      break;
            case 'CountryList' :
                  admin.getCountryList(req.query.Lang,function(err,rows){
                      if(err)
                      {
                          res.json(err);
                      }
                      else
                      {
                          res.json(rows);
                      }     
                  });
                  break;

        case 'CountryDetailsByCountryID' :
                    admin.getCountryLocationID(req.query.Id,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    break;

              case 'CountryListInCountryImages' :
                    admin.getCountryListsInCountryImages(function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    break;

            case 'CountryListByCountryID' :
                      admin.getCountryListByCountryID(req.query.Id,function(err,rows){
                          if(err)
                          {
                              res.json(err);
                          }
                          else
                          {
                              res.json(rows);
                          }     
                      });
                      break;
              case 'CountryListInCountryImagesByCountryId' :
                      admin.getCountryListsInCountryImagesByCountryId(req.query.Id,function(err,rows){
                          if(err)
                          {
                              res.json(err);
                          }
                          else
                          {
                              res.json(rows);
                          }     
                      });
                      break;

              case 'CountryListByCountryLocationID' :
                        admin.getCountryListsByCountryLocationID(req.query.Lang,req.query.Id,function(err,rows){
                            if(err)
                            {
                                res.json(err);
                            }
                            else
                            {
                                res.json(rows);
                            }     
                        });
                        break; //In USe

              case 'CountryListInAttractionImages' :
                          admin.getCountryLists(function(err,rows){
                              if(err)
                              {
                                  res.json(err);
                              }
                              else
                              {
                                  res.json(rows);
                              }     
                          });
                          break; // in use
              case 'CountryListInAttractionImagesByCountryLocationID' :
                      admin.getCountryListsInAttractionImagesByCountryLocationID(req.query.Lang,req.query.Id,function(err,rows){
                          if(err)
                          {
                              res.json(err);
                          }
                          else
                          {
                              res.json(rows);
                          }     
                      });
                      break; // in Use


              case 'CountryListInAttractionImagesByCountryId' :
                        admin.getCountryListsInAttractionImagesByCountryId(req.query.Id,function(err,rows){
                            if(err)
                            {
                                res.json(err);
                            }
                            else
                            {
                                res.json(rows);
                            }     
                        });
                        break;

              case 'CountryListOnlyInEnglish' :
                        admin.getCountryListsOnlyInEnglish(function(err,rows){
                            if(err)
                            {
                                res.json(err);
                            }
                            else
                            {
                                res.json(rows);
                            }     
                        });
                        break; //in use


              case 'GetCountryLocationIDByCountryID' :
                          admin.getCountryLocationIDByCountryID(req.query.Id,function(err,rows){
                              if(err)
                              {
                                  res.json(err);
                              }
                              else
                              {
                                  res.json(rows);
                              }     
                          });
                          break; //in use

              case 'CityLocationIDByCityID' :
                            admin.getCityLocationIDByCityID(req.query.Id,function(err,rows){
                                if(err)
                                {
                                    res.json(err);
                                }
                                else
                                {
                                    res.json(rows);
                                }     
                            });
                            break; //in use

              case 'CoutryIDInCityImagesList' :
                              admin.getcityListInCityImagesByCountryID(req.query.Id,function(err,rows){
                                  if(err)
                                  {
                                      res.json(err);
                                  }
                                  else
                                  {
                                      res.json(rows);
                                  }     
                              });
                              break;// in use

             case 'CityLocationIDByCityIDInCityImagesList' :
                                admin.getcityLocationIDInCityImages(req.query.Id,function(err,rows){
                                    if(err)
                                    {
                                        res.json(err);
                                    }
                                    else
                                    {
                                        res.json(rows);
                                    }     
                                });
                                break;// in use


               case 'HotelListByCityIDInHotelImages' :
                                  admin.getHotelListByCityIDInHotelImages(req.query.Id,function(err,rows){
                                      if(err)
                                      {
                                          res.json(err);
                                      }
                                      else
                                      {
                                          res.json(rows);
                                      }     
                                  });
                                  break;// in use
              case 'HotelLocationIDByHotelIDInHotelImages' :
                                    admin.getHotelLocationIDByHotelIDInHotelImages(req.query.Id,function(err,rows){
                                        if(err)
                                        {
                                            res.json(err);
                                    }
                                        else
                                        {
                                            res.json(rows);
                                        }     
                                    });
                                    break;// in use

              case 'CountryListByCountryLocationIDAndLanguage' :
                          admin.getCountryListByCountryLocationIDAndLanguage(req.query.Lang,req.query.Id,function(err,rows){
                              if(err)
                              {
                                  res.json(err);
                              }
                              else
                              {
                                  res.json(rows);
                              }     
                          });
                          break;

              case 'CountryListInCityImagesByLanguage' :
                          admin.getCountryListsInCityImagesByLanguage(req.query.Lang,function(err,rows){
                              if(err)
                              {
                                  res.json(err);
                              }
                              else
                              {
                                  res.json(rows);
                              }     
                          });
                          break;

                          case 'CountryListInCityImagesByCountryId' :
                            admin.getCountryListsInCityImagesByCountryId(req.query.Id,function(err,rows){
                                if(err)
                                {
                                    res.json(err);
                                }
                                else
                                {
                                    res.json(rows);
                                }     
                            });
                            break;

              case 'CountryListInHotelDetailsByLanguage' :
                            admin.getCountryListsInHotelDetailsByLanguage(req.query.Lang,function(err,rows){
                                if(err)
                                {
                                    res.json(err);
                                }
                                else
                                {
                                    res.json(rows);
                                }     
                            });
                            break;
              case 'CountryListInHotelDetailsByCountryId' :
                              admin.getCountryListsInHotelDetailsByCountryId(req.query.Id,function(err,rows){
                                  if(err)
                                  {
                                      res.json(err);
                                  }
                                  else
                                  {
                                      res.json(rows);
                                  }     
                              });
                              break;

                case 'CountryListInHotelImages' :
                              admin.getCountryListsInHotelImages(function(err,rows){
                                  if(err)
                                  {
                                      res.json(err);
                                  }
                                  else
                                  {
                                      res.json(rows);
                                  }     
                              });
                              break;

                  case 'CountryListInTourByLanguage' :
                                admin.getCountryListsInTourByLanguage(req.query.Lang,req.query.Id,function(err,rows){
                                    if(err)
                                    {
                                        res.json(err);
                                    }
                                    else
                                    {
                                        res.json(rows);
                                    }     
                                });
                                break;// in use

               case 'CountryListInTourByCountryId' :
                                  admin.getCountryListsInTourByCountryId(req.query.Id,function(err,rows){
                                      if(err)
                                      {
                                          res.json(err);
                                      }
                                      else
                                      {
                                          res.json(rows);
                                      }     
                                  });
                                  break;
            case 'DestinationListAccordingToLang' :
                    admin.getDestinationImagesListAccordingToLang(req.query.Lang,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    break; 
            case 'CountryImagesList' :
                      admin.getCountryImages(req.query.Lang,function(err,rows){
                          if(err)
                          {
                              res.json(err);
                          }
                          else
                          {
                              res.json(rows);
                          }     
                      });
                      break;  
              case 'AttractionImagesList' :
                        admin.getAttractionImages(req.query.Lang,function(err,rows){
                            if(err)
                            {
                                res.json(err);
                            }
                            else
                            {
                                res.json(rows);
                            }     
                        });
                        break;  
              case 'HeaderList' :
                          admin.getHeader(function(err,rows){
                              if(err)
                              {
                                  res.json(err);
                              }
                              else
                              {
                                  res.json(rows);
                              }     
                          });
                          break;   
              case 'ContactInfoList' :
                            admin.getContactInfo(function(err,rows){
                                if(err)
                                {
                                    res.json(err);
                                }
                                else
                                {
                                    res.json(rows);
                                }     
                            });
                            break;
              case 'DescriptionList' :
                              admin.getDescription(function(err,rows){
                                  if(err)
                                  {
                                      res.json(err);
                                  }
                                  else
                                  {
                                      res.json(rows);
                                  }     
                              });
                              break;  
              case 'BlogPostsList' :
                                admin.getBlogPosts(function(err,rows){
                                    if(err)
                                    {
                                        res.json(err);
                                    }
                                    else
                                    {
                                        res.json(rows);
                                    }     
                                });
                                break; 
              case 'TagsList' :
                                  admin.getTagsList(function(err,rows){
                                      if(err)
                                      {
                                          res.json(err);
                                      }
                                      else
                                      {
                                          res.json(rows);
                                      }     
                                  });
                                  break;  
             case 'SliderImagesList' :
                                    admin.getSliderList(function(err,rows){
                                        if(err)
                                        {
                                            res.json(err);
                                        }
                                        else
                                        {
                                            res.json(rows);
                                        }     
                                    });
                                    break;  
              case 'LogoImagesList' :
                                      admin.getLogoList(function(err,rows){
                                          if(err)
                                          {
                                              res.json(err);
                                          }
                                          else
                                          {
                                              res.json(rows);
                                          }     
                                      });
                                      break;   
               case 'CityList' :
                                        admin.getCityList(req.query.Lang,function(err,rows){
                                            if(err)
                                            {
                                                res.json(err);
                                            }
                                            else
                                            {
                                                res.json(rows);
                                            }     
                                        });
                                        break; 


              case 'GetCityByCountryID' :
                                          admin.getCityByCountryID(req.query.Id,function(err,rows){
                                              if(err)
                                              {
                                                  res.json(err);
                                              }
                                              else
                                              {
                                                  res.json(rows);
                                              }     
                                          });
                                          break;


                case 'GetCityDetailsByByCityID' :
                                            admin.getCityLocationByCityID(req.query.Id,function(err,rows){
                                                if(err)
                                                {
                                                    res.json(err);
                                                }
                                                else
                                                {
                                                    res.json(rows);
                                                }     
                                            });
                                            break;
                case 'CityImagesList' :
                                          admin.getCityImagesList(req.query.Lang,function(err,rows){
                                              if(err)
                                              {
                                                  res.json(err);
                                              }
                                              else
                                              {
                                                  res.json(rows);
                                              }     
                                          });
                                          break;   
                 case 'HotelList' :
                                            admin.getHotelList(req.query.Lang,function(err,rows){
                                                if(err)
                                                {
                                                    res.json(err);
                                                }
                                                else
                                                {
                                                    res.json(rows);
                                                }     
                                            });
                                            break;  

               case 'HotelLocationIDByHotelID' :
                                              admin.getHotelLocationIDByHotelID(req.query.Id,function(err,rows){
                                                  if(err)
                                                  {
                                                      res.json(err);
                                                  }
                                                  else
                                                  {
                                                      res.json(rows);
                                                  }     
                                              });
                                              break;
                  case 'HotelImagesList' :
                                              admin.getHotelImagesList(req.query.Lang,function(err,rows){
                                                  if(err)
                                                  {
                                                      res.json(err);
                                                  }
                                                  else
                                                  {
                                                      res.json(rows);
                                                  }     
                                              });
                                              break; //in use
                                              
                                              
                  case 'CategoryList' :
                                                admin.getCategoryList(function(err,rows){
                                                    if(err)
                                                    {
                                                        res.json(err);
                                                    }
                                                    else
                                                    {
                                                        res.json(rows);
                                                    }     
                                                });
                                                break; 
                                                
                    case 'CategoryListById' :
                                                  admin.getCategoryListById(req.query.Id,function(err,rows){
                                                      if(err)
                                                      {
                                                          res.json(err);
                                                      }
                                                      else
                                                      {
                                                          res.json(rows);
                                                      }     
                                                  });
                                                  break; 
                  case 'PriceCategoryListByLanguage' :
                                                  admin.getPriceCategoryListByLanguage(req.query.Lang,function(err,rows){
                                                      if(err)
                                                      {
                                                          res.json(err);
                                                      }
                                                      else
                                                      {
                                                          res.json(rows);
                                                      }     
                                                  });
                                                  break; 

                  case 'GetCategoryDetailsByCategoryID' :
                                                    admin.getCategoryDetailsByCategoryID(req.query.Id,function(err,rows){
                                                        if(err)
                                                        {
                                                            res.json(err);
                                                        }
                                                        else
                                                        {
                                                            res.json(rows);
                                                        }     
                                                    });
                                                    break; 
                   case 'TourPackagesList' :
                                                    admin.getTourPackagesList(req.query.Lang,function(err,rows){
                                                        if(err)
                                                        {
                                                            res.json(err);
                                                        }
                                                        else
                                                        {
                                                            res.json(rows);
                                                        }     
                                                    });
                                                    break;  
                    case 'TourPackagesListOnlyInEnglishInTours' :
                                                      admin.getTourPackagesListOnlyInEnglishInTours(req.query.Lang,function(err,rows){
                                                          if(err)
                                                          {
                                                              res.json(err);
                                                          }
                                                          else
                                                          {
                                                              res.json(rows);
                                                          }     
                                                      });
                                                      break;
                                                      
                  case 'FindTourPackageLocationIDByPackageID' :
                                                        admin.FindTourPackageLocationIDByTourPackageID(req.query.Id,function(err,rows){
                                                            if(err)
                                                            {
                                                                res.json(err);
                                                            }
                                                            else
                                                            {
                                                                res.json(rows);
                                                            }     
                                                        });
                                                        break;
                                                        
                  case 'FindTourProgramLocationIDByTourProgramID' :
                                                          admin.FindTourProgramLocationIDByTourProgramID(req.query.Id,function(err,rows){
                                                              if(err)
                                                              {
                                                                  res.json(err);
                                                              }
                                                              else
                                                              {
                                                                  res.json(rows);
                                                              }     
                                                          });
                                                          break; 

                      case 'TourPackagesListInTourByTourPackageId' :
                                                        admin.getTourPackagesListInTourByTourPackageId(req.query.Id,function(err,rows){
                                                            if(err)
                                                            {
                                                                res.json(err);
                                                            }
                                                            else
                                                            {
                                                                res.json(rows);
                                                            }     
                                                        });
                                                        break;



                     case 'TourProgramListInEnglishInTour' :
                                                        admin.getTourProgramListOnlyInEnglish(req.query.Lang,function(err,rows){
                                                            if(err)
                                                            {
                                                                res.json(err);
                                                            }
                                                            else
                                                            {
                                                                res.json(rows);
                                                            }     
                                                        });
                                                        break; // in use
                      case 'TourProgramListInTourByTourProgramId' :
                                                          admin.getTourProgramListInTourByTourProgramId(req.query.Id,function(err,rows){
                                                              if(err)
                                                              {
                                                                  res.json(err);
                                                              }
                                                              else
                                                              {
                                                                  res.json(rows);
                                                              }     
                                                          });
                                                          break;

                      case 'PriceCategoryListInTour' :
                                                          admin.getTourPriceCategoryListInTour(function(err,rows){
                                                              if(err)
                                                              {
                                                                  res.json(err);
                                                              }
                                                              else
                                                              {
                                                                  res.json(rows);
                                                              }     
                                                          });
                                                          break;
                    case 'ProgramList' :
                                                      admin.getProgramList(req.query.Lang,function(err,rows){
                                                          if(err)
                                                          {
                                                              res.json(err);
                                                          }
                                                          else
                                                          {
                                                              res.json(rows);
                                                          }     
                                                      });
                                                      break; 
                                                      
                    case 'DaysList' :
                                                        admin.getDaysList(req.query.Lang,function(err,rows){
                                                            if(err)
                                                            {
                                                                res.json(err);
                                                            }
                                                            else
                                                            {
                                                                res.json(rows);
                                                            }     
                                                        });
                                                        break; 

                     case 'GetCountryByLanguageInProgram' :
                                                        admin.getCountryByLanguageInProgram(req.query.Lang,req.query.Id,function(err,rows){
                                                            if(err)
                                                            {
                                                                res.json(err);
                                                            }
                                                            else
                                                            {
                                                                res.json(rows);
                                                            }     
                                                        });
                                                        break; 

                      case 'GetToursForProgramNewOptionByCountryID' :
                                                          admin.getToursForProgramNewOptionByCountryID(req.query.Id,function(err,rows){
                                                              if(err)
                                                              {
                                                                  res.json(err);
                                                              }
                                                              else
                                                              {
                                                                  res.json(rows);
                                                              }     
                                                          });
                                                          break;
                    case 'TourList' :
                                                        admin.getTourList(req.query.Lang,function(err,rows){
                                                            if(err)
                                                            {
                                                                res.json(err);
                                                            }
                                                            else
                                                            {
                                                                res.json(rows);
                                                            }     
                                                        });
                                                        break;  

                case 'GetTourDetailsByTourID' :
                                                          admin.getTourDetailsByTourID(req.query.Id,function(err,rows){
                                                              if(err)
                                                              {
                                                                  res.json(err);
                                                              }
                                                              else
                                                              {
                                                                  res.json(rows);
                                                              }     
                                                          });
                                                          break;  

                case 'GetAllToursByTourID' :
                                                            admin.getAllToursByTourID(req.query.Id,function(err,rows){
                                                                if(err)
                                                                {
                                                                    res.json(err);
                                                                }
                                                                else
                                                                {
                                                                    res.json(rows);
                                                                }     
                                                            });
                                                            break;  


                    case 'GetAllTourByTourLocationID' :
                                                          admin.getAllTourByTourLocationID(req.query.Lang,req.query.Id,function(err,rows){
                                                              if(err)
                                                              {
                                                                  res.json(err);
                                                              }
                                                              else
                                                              {
                                                                  res.json(rows);
                                                              }     
                                                          });
                                                          break; 

                    case 'TourListInTourImagesByTourId' :
                                                          admin.getTourListByTourId(req.query.Id,function(err,rows){
                                                              if(err)
                                                              {
                                                                  res.json(err);
                                                              }
                                                              else
                                                              {
                                                                  res.json(rows);
                                                              }     
                                                          });
                                                          break;
                    case 'TourListInTourServicesByTourId' :
                                                            admin.getTourServicesListByTourId(req.query.Id,function(err,rows){
                                                                if(err)
                                                                {
                                                                    res.json(err);
                                                                }
                                                                else
                                                                {
                                                                    res.json(rows);
                                                                }     
                                                            });
                                                            break;  
                  case 'TourImagesListByLanguage' :
                                                          admin.getTourImagesListByLanguage(req.query.Lang,function(err,rows){
                                                              if(err)
                                                              {
                                                                  res.json(err);
                                                              }
                                                              else
                                                              {
                                                                  res.json(rows);
                                                              }     
                                                          });
                                                          break;     
                case 'CityListById' :
                                                            admin.getCityListId(req.query.Id,function(err,rows){
                                                                if(err)
                                                                {
                                                                    res.json(err);
                                                                }
                                                                else
                                                                {
                                                                    res.json(rows);
                                                                }     
                                                            });
                                                            break;  
                                                            
                  case 'HotelListById' :
                                                              admin.getHotelListId(req.query.Id,function(err,rows){
                                                                  if(err)
                                                                  {
                                                                      res.json(err);
                                                                  }
                                                                  else
                                                                  {
                                                                      res.json(rows);
                                                                  }     
                                                              });
                                                              break;

                  case 'TourServicesListByLanguage' :
                                                                admin.getTourServiceListByLanguage(req.query.Lang,function(err,rows){
                                                                    if(err)
                                                                    {
                                                                        res.json(err);
                                                                    }
                                                                    else
                                                                    {
                                                                        res.json(rows);
                                                                    }     
                                                                });
                                                                break; 
                 case 'TourTermListByLanguage' :
                                                                  admin.getTourTermListByLanguage(req.query.Lang,function(err,rows){
                                                                      if(err)
                                                                      {
                                                                          res.json(err);
                                                                      }
                                                                      else
                                                                      {
                                                                          res.json(rows);
                                                                      }     
                                                                  });
                                                                  break; 
               case 'LanguagesList' :
                                                                  admin.getAllLanguagesList(function(err,rows){
                                                                      if(err)
                                                                      {
                                                                          res.json(err);
                                                                      }
                                                                      else
                                                                      {
                                                                          res.json(rows);
                                                                      }     
                                                                  });
                                                                  break; 

                case 'DestinationListOnlyInEnglish' :
                                                                    admin.getAllDestinationOnlyInEnglish(req.query.Lang,function(err,rows){
                                                                        if(err)
                                                                        {
                                                                            res.json(err);
                                                                        }
                                                                        else
                                                                        {
                                                                            res.json(rows);
                                                                        }     
                                                                    });
                                                                    break; 
                case 'DestinationListByDestinationId' :
                                                                      admin.getAllDestinationByDestinationId(req.query.Id,function(err,rows){
                                                                          if(err)
                                                                          {
                                                                              res.json(err);
                                                                          }
                                                                          else
                                                                          {
                                                                              res.json(rows);
                                                                          }     
                                                                      });
                                                                      break; 

                case 'ToursByCountryIDInProgramDays' :
                                                                        admin.getToursByCountryIDInProgramDays(req.query.Id,function(err,rows){
                                                                            if(err)
                                                                            {
                                                                                res.json(err);
                                                                            }
                                                                            else
                                                                            {
                                                                                res.json(rows);
                                                                            }     
                                                                        });
                                                                        break; 

               case 'GetProgramTitleByTourID' :
                                                                          admin.getProgramTitleByTourID(req.query.Id,function(err,rows){
                                                                              if(err)
                                                                              {
                                                                                  res.json(err);
                                                                              }
                                                                              else
                                                                              {
                                                                                  res.json(rows);
                                                                              }     
                                                                          });
                                                                          break; 
                case 'GetTourNameByCountryID' :
                                                                            admin.getTourNameByCountryID(req.query.Id,function(err,rows){
                                                                                if(err)
                                                                                {
                                                                                    res.json(err);
                                                                                }
                                                                                else
                                                                                {
                                                                                    res.json(rows);
                                                                                }     
                                                                            });
                                                                            break; 

                case 'GetTourProgramByProgramID' :
                                                                              admin.getTourProgramByProgramID(req.query.Id,function(err,rows){
                                                                                  if(err)
                                                                                  {
                                                                                      res.json(err);
                                                                                  }
                                                                                  else
                                                                                  {
                                                                                      res.json(rows);
                                                                                  }     
                                                                              });
                                                                              break; 


                case 'GetCountryByIDInDaysModule' :
                                                                                admin.getCountryByIDInDaysModule(req.query.Id,function(err,rows){
                                                                                    if(err)
                                                                                    {
                                                                                        res.json(err);
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        res.json(rows);
                                                                                    }     
                                                                                });
                                                                                break; 

        }
    }
  });

  router.delete('/',function(req,res,next){

    if(req.query.mode){
        switch (req.query.mode){
  
            case 'DeleteDestination' :
                admin.deleteDestination(req.query.Id,function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else
                    {
                      admin.deleteDestinationWithDestinationImage(req.query.Id,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    }     
                });
                break; 
              case 'DeleteCountry' :
                  admin.deleteCountry(req.query.Id,function(err,rows){
                      if(err)
                      {
                          res.json(err);
                      }
                      else
                      {
                        admin.deleteCountryWithCountryImages(req.query.Id,function(err,rows){
                          if(err)
                          {
                              res.json(err);
                          }
                          else
                          {
                            admin.deleteCountryWithAttractionImages(req.query.Id,function(err,rows){
                              if(err)
                              {
                                  res.json(err);
                              }
                              else
                              {
                                admin.deleteCountrywithCity(req.query.Id,function(err,rows){
                                  if(err)
                                  {
                                      res.json(err);
                                  }
                                  else
                                  {
                                    admin.deleteCountryWithCityImages(req.query.Id,function(err,rows){
                                      if(err)
                                      {
                                          res.json(err);
                                      }
                                      else
                                      {
                                        admin.deleteCountryWithHotel(req.query.Id,function(err,rows){
                                          if(err)
                                          {
                                              res.json(err);
                                          }
                                          else
                                          {
                                            admin.deleteCountryWithHotelImages(req.query.Id,function(err,rows){
                                              if(err)
                                              {
                                                  res.json(err);
                                              }
                                              else
                                              {
                                                admin.deleteCountryWithTourImages(req.query.Id,function(err,rows){
                                                  if(err)
                                                  {
                                                      res.json(err);
                                                  }
                                                  else
                                                  {
                                                    admin.deleteCountryWithTour(req.query.Id,function(err,rows){
                                                      if(err)
                                                      {
                                                          res.json(err);
                                                      }
                                                      else
                                                      {
                                                        admin.deleteCountryWithTourServices(req.query.Id,function(err,rows){
                                                          if(err)
                                                          {
                                                              res.json(err);
                                                          }
                                                          else
                                                          {
                                                              res.json(rows);
                                                          }     
                                                      });
                                                      }     
                                                  });
                                                  }     
                                              });
                                              }     
                                          });
                                          }     
                                      });
                                      }     
                                  });
                                  }     
                              });
                              }     
                          });
                          }     
                      });
                      }     
                  });
                  break;
              case 'DeleteDestinationImage' :
                    admin.deleteDestinationImages(req.query.Id,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows);
                        }     
                    });
                    break;   
              case 'DeleteCountryImage' :
                      admin.deleteCountryImages(req.query.Id,function(err,rows){
                          if(err)
                          {
                              res.json(err);
                          }
                          else
                          {
                              res.json(rows);
                          }     
                      });
                      break;  
                case 'DeleteAttractionImage' :
                        admin.deleteAttractionImages(req.query.AttractionId,function(err,rows){
                            if(err)
                            {
                                res.json(err);
                            }
                            else
                            {
                                res.json(rows);
                            }     
                        });
                        break; 
                case 'DeleteHeader' :
                          admin.deleteHeader(req.query.Id,function(err,rows){
                              if(err)
                              {
                                  res.json(err);
                              }
                              else
                              {
                                  res.json(rows);
                              }     
                          });
                          break;  
                  case 'DeleteContactInfo' :
                            admin.deleteContactInfo(req.query.Id,function(err,rows){
                                if(err)
                                {
                                    res.json(err);
                                }
                                else
                                {
                                    res.json(rows);
                                }     
                            });
                            break;
                            
                case 'DeleteDescription' :
                              admin.deleteDescription(req.query.Id,function(err,rows){
                                  if(err)
                                  {
                                      res.json(err);
                                  }
                                  else
                                  {
                                      res.json(rows);
                                  }     
                              });
                              break; 
                case 'DeleteBlogPosts' :
                                admin.deleteBlogPosts(req.query.Id,function(err,rows){
                                    if(err)
                                    {
                                        res.json(err);
                                    }
                                    else
                                    {
                                        res.json(rows);
                                    }     
                                });
                                break; 
                case 'DeleteTags' :
                                  admin.deleteTags(req.query.Id,function(err,rows){
                                      if(err)
                                      {
                                          res.json(err);
                                      }
                                      else
                                      {
                                          res.json(rows);
                                      }     
                                  });
                                  break;
                case 'DeleteSliderImage' :
                                    admin.deleteSliderImages(req.query.Id,function(err,rows){
                                        if(err)
                                        {
                                            res.json(err);
                                        }
                                        else
                                        {
                                            res.json(rows);
                                        }     
                                    });
                                    break;

               case 'DeleteLogoImage' :
                                      admin.deleteLogo(req.query.Id,function(err,rows){
                                          if(err)
                                          {
                                              res.json(err);
                                          }
                                          else
                                          {
                                              res.json(rows);
                                          }     
                                      });
                                      break;

                case 'DeleteCity' :
                                        admin.deleteCity(req.query.Id,function(err,rows){
                                            if(err)
                                            {
                                                res.json(err);
                                            }
                                            else
                                            {
                                                // res.json(rows);
                                                admin.deleteCityWithCityImages(req.query.Id,function(err,rows){
                                                  if(err)
                                                  {
                                                      res.json(err);
                                                  }
                                                  else
                                                  {
                                                    admin.deleteCityWithHotel(req.query.Id,function(err,rows){
                                                      if(err)
                                                      {
                                                          res.json(err);
                                                      }
                                                      else
                                                      {
                                                        admin.deleteCityWithHotelImages(req.query.Id,function(err,rows){
                                                          if(err)
                                                          {
                                                              res.json(err);
                                                          }
                                                          else
                                                          {
                                                              res.json(rows);
                                                          }     
                                                      });
                                                      }     
                                                  });
                                                      
                                                  }     
                                              });
                                            }     
                                        });
                                        break;

                case 'DeleteCityImages' :
                                          admin.deleteCityImages(req.query.Id,function(err,rows){
                                              if(err)
                                              {
                                                  res.json(err);
                                              }
                                              else
                                              {
                                                  res.json(rows);
                                              }     
                                          });
                                          break;

                case 'DeleteHotel' :
                                            admin.deleteHotel(req.query.Id,function(err,rows){
                                                if(err)
                                                {
                                                    res.json(err);
                                                }
                                                else
                                                {
                                                  admin.deleteHotelWithHotelImages(req.query.Id,function(err,rows){
                                                    if(err)
                                                    {
                                                        res.json(err);
                                                    }
                                                    else
                                                    {
                                                        res.json(rows);
                                                    }     
                                                });
                                                }     
                                            });
                                            break;

                case 'DeleteHotelImages' :
                                              admin.deleteHotelImages(req.query.Id,function(err,rows){
                                                  if(err)
                                                  {
                                                      res.json(err);
                                                  }
                                                  else
                                                  {
                                                      res.json(rows);
                                                  }     
                                              });
                                              break;
                        
                 case 'DeleteCategory' :
                                                admin.deleteCategory(req.query.Id,function(err,rows){
                                                    if(err)
                                                    {
                                                        res.json(err);
                                                    }
                                                    else
                                                    {
                                                      admin.deleteCategoryWithPriceCategory(req.query.Id,function(err,rows){
                                                        if(err)
                                                        {
                                                            res.json(err);
                                                        }
                                                        else
                                                        {
                                                            res.json(rows);
                                                        }     
                                                    });
                                                    }     
                                                });
                                                break; 

                  case 'DeletePriceCategory' :
                                                  admin.deletePriceCategory(req.query.Id,function(err,rows){
                                                      if(err)
                                                      {
                                                          res.json(err);
                                                      }
                                                      else
                                                      {
                                                          res.json(rows);
                                                      }     
                                                  });
                                                  break; 
                 case 'DeleteTourPackages' :
                                                    admin.deleteTourPackages(req.query.Id,function(err,rows){
                                                        if(err)
                                                        {
                                                            res.json(err);
                                                        }
                                                        else
                                                        {
                                                            res.json(rows);
                                                        }     
                                                    });
                                                    break;
                  case 'DeleteTourProgram' :
                                                      admin.deleteTourProgram(req.query.Id,function(err,rows){
                                                          if(err)
                                                          {
                                                              res.json(err);
                                                          }
                                                          else
                                                          {
                                                              res.json(rows);
                                                          }     
                                                      });
                                                      break;

                  case 'DeleteProgram' :
                                                        admin.deleteProgram(req.query.Id,function(err,rows){
                                                            if(err)
                                                            {
                                                                res.json(err);
                                                            }
                                                            else
                                                            {
                                                                res.json(rows);
                                                            }     
                                                        });
                                                        break
                  case 'DeleteTour' :
                                                        admin.deleteTour(req.query.Id,function(err,rows){
                                                            if(err)
                                                            {
                                                                res.json(err);
                                                            }
                                                            else
                                                            {
                                                              admin.deleteTourWithTourImages(req.query.Id,function(err,rows){
                                                                if(err)
                                                                {
                                                                    res.json(err);
                                                                }
                                                                else
                                                                {
                                                                  admin.deleteTourWithPriceCategory(req.query.Id,function(err,rows){
                                                                    if(err)
                                                                    {
                                                                        res.json(err);
                                                                    }
                                                                    else
                                                                    {
                                                                      admin.deleteTourWithTourServices(req.query.Id,function(err,rows){
                                                                        if(err)
                                                                        {
                                                                            res.json(err);
                                                                        }
                                                                        else
                                                                        {
                                                                            res.json(rows);
                                                                        }     
                                                                    });
                                                                    }     
                                                                });
                                                                }     
                                                            });
                                                            }     
                                                        });
                                                        break;
                case 'DeleteTourImages' :
                                                          admin.deleteTourImages(req.query.Id,function(err,rows){
                                                              if(err)
                                                              {
                                                                  res.json(err);
                                                              }
                                                              else
                                                              {
                                                                  res.json(rows);
                                                              }     
                                                          });
                                                          break;

                case 'DeleteTourServices' :
                                                            admin.deleteTourServices(req.query.Id,function(err,rows){
                                                                if(err)
                                                                {
                                                                    res.json(err);
                                                                }
                                                                else
                                                                {
                                                                    res.json(rows);
                                                                }     
                                                            });
                                                            break; 
                  case 'DeleteTourTerm' :
                                                              admin.deleteTourTerm(req.query.Id,function(err,rows){
                                                                  if(err)
                                                                  {
                                                                      res.json(err);
                                                                  }
                                                                  else
                                                                  {
                                                                      res.json(rows);
                                                                  }     
                                                              });
                                                              break; 

               case 'DeleteLanguages' :
                                                              admin.deleteLanguages(req.query.Id,function(err,rows){
                                                                  if(err)
                                                                  {
                                                                      res.json(err);
                                                                  }
                                                                  else
                                                                  {
                                                                      res.json(rows);
                                                                  }     
                                                              });
                                                              break;

              case 'DeleteDays' :
                                                                admin.deleteDays(req.query.Id,function(err,rows){
                                                                    if(err)
                                                                    {
                                                                        res.json(err);
                                                                    }
                                                                    else
                                                                    {
                                                                        res.json(rows);
                                                                    }     
                                                                });
                                                                break;

                                                              

        }
    }
  });

    
    
    module.exports = router;