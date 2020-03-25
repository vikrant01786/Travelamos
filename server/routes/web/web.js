var express = require('express');
var router = express.Router();
var web= require('../../models/web/web');



// router.post('/', function(req, res, next) {
//     if(req.query.mode){
//       switch (req.query.mode){

//         case 'SaveUser' :
      
//               if(req.body.Id == null || req.body.Id == '' || req.body.Id == 0 || req.body.Id == 'undefined' ){
//                 insertInd = true;
//               } else {
//                 insertInd = false;
//               }
//               web.saveDestination(req.body,insertInd,function(err,count){
//                 //   console.log(req.body);
//                 if(err)
//                 {
//                   res.json(err);
//                 }
//                 else
//                 {
//                   res.json(count);
//                 }
//               });
//               break;   
//       }
//     }
//     });




    
router.get('/',function(req,res,next){

    if(req.query.mode){
        switch (req.query.mode){


            case 'Headerlist' :
                    web.getHeaderList(function(err,rows){
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
                        web.getLanguagesList(function(err,rows){
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

            case 'TourCarouselImageslistByDefault' :
                        web.getTourCarouselImagesListByDefault(req.query.Lang,function(err,rows){
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

            case 'TourCarouselImageslistByLanguage' :
                        web.getTourCarouselImagesListByLanguage(req.query.Lang,function(err,rows){
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

            case 'DestinationImageslistByDefaultLanguage' :
                        web.getDestinationImagesListByDefaultLanguage(req.query.Lang,function(err,rows){
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
                            
            case 'DestinationImageslistByLanguage' :
                                web.getDestinationImagesListByLanguage(req.query.Lang,function(err,rows){
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

            case 'GetCountriesByDestinationLocationAndLanguage' :
                                    web.getCountriesByDestinationLocationAndLanguage(req.query.Lang,req.query.Id,function(err,rows){
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

            case 'getDestinationTitle' :
                                        web.getDestinationTitle(req.query.Lang,req.query.Id,function(err,rows){
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

            case 'GetAllDestinationsAccordingToLanguage' :
                                            web.getDestinationsAccordingToLanguages(req.query.Lang,function(err,rows){
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

            case 'CountryByCountryLocationID' :
                                            web.getCountryByCountryLocationID(req.query.Lang,req.query.Id,function(err,rows){
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

        case 'HotelsByCountryLocationID' :
                                                    web.getHotelsByCountryLocationID(req.query.Lang,req.query.Id,function(err,rows){
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

        case 'CitiesByCountryLocationID' :
                                                            web.getCitiesByCountryLocationID(req.query.Lang,req.query.Id,function(err,rows){
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


            case 'SearchCountry' :
                                                web.SearchCountry(req.query,function(err,rows){
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

            case 'GetCountryCount' :
                                                        web.getCountryCount(req.query.LocationID,req.query.Lang,function(err,rows){
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

                                                            
         case 'GetAllTourPackages' :
                                                                web.getAllTourPackages(req.query.Lang,function(err,rows){
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

        case 'GetToursByTourPackageID' :
                                        web.getToursByTourPackageID(req.query.Lang,req.query.PackageID,function(err,rows){
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

        case 'GetAllToursByCountryLocationID' :
                                            web.getAllToursByCountryLocationID(req.query.Lang,req.query.CountryLocationID,req.query.PackageID,function(err,rows){
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

        case 'GetAllTourDetailsInSpecificTours' :
                                                web.getAllTourDetailsInSpecificTours(req.query.TourLocationID,req.query.Lang,function(err,rows){
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
      case 'GetDaysDetailsByProgramID' :
                                                  
                                                        web.getDaysDetailsByProgramID(req.query.ProgramID,req.query.Lang,function(err,rows){
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

    case 'GetTourServicesInSpecificTour' :
                                                  
                                                                web.getTourServicesInSpecificTour(req.query.TourLocationID,req.query.Lang,function(err,rows){
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
     case 'GetTourTermsInSpecificTour' :
                                                  
                                                                        web.getTourTermsInSpecificTour(req.query.TourLocationID,req.query.Lang,function(err,rows){
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


     case 'GetPriceCategoryDetailsInSpecificTour' :
                                                  
                                                                                web.getPriceCategoryDetailsInSpecificTour(req.query.TourLocationID,req.query.Lang,function(err,rows){
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



//   router.delete('/',function(req,res,next){

//     if(req.query.mode){
//         switch (req.query.mode){
  
//             case 'DeleteDestination' :
//                 web.deleteDestination(req.query.Id,function(err,rows){
//                     if(err)
//                     {
//                         res.json(err);
//                     }
//                     else
//                     {
//                         res.json(rows);
//                     }     
//                 });
//                 break; 
//         }
//     }
//   });

    
    
    module.exports = router;