var db = require("../../dbconnection");
var admin = {

    getMaxRow: function (LocationID,TableName,callback) { 
    qry = "SELECT MAX("+LocationID+") AS 'MaxValue'FROM "+TableName+"";
        return db.query(qry, callback);
    },


    saveLanguages: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into languages(LanguageName,LanguageValue,CreatedOn)values('"+data.LanguageName+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `languages` SET `LanguageName` = '" + data.LanguageName + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    SaveDestination: function (data,LocationID,callback) {    
        if(data.Id == null ){
            qry = "INSERT into destination(LocationID, DestinationName,HomeTitle,HomeDescription,Longitude,Latitude,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.DestinationName+"','"+data.HomeTitle+"','"+data.HomeDescription+"','"+data.Longitude+"','"+data.Latitude +"','EN',now())";
            } else {
             qry = "UPDATE `destination` SET `LocationID` = '" + data.LocationID + "', `DestinationName` = '" + data.DestinationName + "',`HomeTitle` = '" + data.HomeTitle + "',`HomeDescription` = '"+data.HomeDescription+"',`Longitude` = '"+data.Longitude+"',`Latitude` = '"+data.Latitude+"',`LanguageValue` = '"+data.LanguageValue+"',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
            }
        return db.query(qry, callback);
    },


    SaveDestinationOption: function (data,insertInd,callback) {   
     if (insertInd){
        qry = "INSERT into destination(LocationID,DestinationName,HomeTitle,HomeDescription,Longitude,Latitude,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.DestinationName+"','"+data.HomeTitle+"','"+data.HomeDescription+"','"+data.Longitude
        +"','"+data.Latitude +"','"+data.LanguageValue+"',now())";
    } else {
        qry = "UPDATE `destination` SET `LocationID` = '" + data.LocationID + "',`DestinationName` = '" + data.DestinationName + "',`HomeTitle` = '" + data.HomeTitle + "',`HomeDescription` = '"+data.HomeDescription+"',`Longitude` = '"+data.Longitude+"',`Latitude` = '"+data.Latitude+"',`LanguageValue` = '"+data.LanguageValue+"',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
    }
    return db.query(qry, callback);
    },

    SaveDestinationImageOption: function (data,insertInd,callback) {   
        if (insertInd){
           qry = "INSERT into destination_images(LocationID,DestinationId,DestinationLocationID,DestinationImage,ImageDescription,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.DestinationId+"','"+data.DestinationLocationID+"','"+data.DestinationImage+"','"+data.ImageDescription+"','"+data.LanguageValue+"',now())";
       } else {
           qry = "UPDATE `destination_images` SET `LocationID` = '" + data.LocationID + "',`DestinationId` = '" + data.DestinationId + "',`DestinationLocationID` = '" + data.DestinationLocationID + "',`DestinationImage` = '" + data.DestinationImage + "',`ImageDescription` = '"+data.ImageDescription+"',`LanguageValue` = '"+data.LanguageValue+"',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
       }
       return db.query(qry, callback);
       },

   


    saveCountry: function (data,LocationID,callback) { 
        console.log(data, 'Routes');  
        if(data.Id == null ){
            qry = "INSERT into country(LocationID,DestinationID,DestinationLocationID,CountryName,HomeTitle,HomeDescription,Longitude,Latitude,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.DestinationID+"','"+data.DestinationLocationID+"','"+data.CountryName+"','"+data.HomeTitle+"','"+data.HomeDescription+"','"+data.Longitude
            +"','"+data.Latitude +"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `country` SET `DestinationID` = '" + data.DestinationID + "',`CountryName` = '" + data.CountryName + "',`HomeTitle` = '" + data.HomeTitle + "',`HomeDescription` = '"+data.HomeDescription+"',`Longitude` = '"+data.Longitude+"',`Latitude` = '"+data.Latitude+"',`LanguageValue` = '"+data.LanguageValue+"',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    SaveCountryOption: function (data,insertInd,callback) {   
        if (insertInd){
           qry = "INSERT into country(LocationID,DestinationID,DestinationLocationID,CountryName,HomeTitle,HomeDescription,Longitude,Latitude,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.DestinationID+"','"+data.DestinationLocationID+"','"+data.CountryName+"','"+data.HomeTitle+"','"+data.HomeDescription+"','"+data.Longitude
           +"','"+data.Latitude +"','"+data.LanguageValue+"',now())";
       } else {
           qry = "UPDATE `country` SET `LocationID` = '" + data.LocationID + "',`DestinationID` = '" + data.DestinationID + "',`DestinationLocationID` = '" + data.DestinationLocationID + "',`CountryName` = '" + data.CountryName + "',`HomeTitle` = '" + data.HomeTitle + "',`HomeDescription` = '"+data.HomeDescription+"',`Longitude` = '"+data.Longitude+"',`Latitude` = '"+data.Latitude+"',`LanguageValue` = '"+data.LanguageValue+"',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
       }
       return db.query(qry, callback);
    },

    SaveCountryImageOption: function (data,insertInd,callback) {   
        if (insertInd){
           qry = "INSERT into country_images(LocationID,CountryLocationID,CountryID,CountryImage,ImageDescription,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.CountryLocationID+"','"+data.CountryID+"','"+data.CountryImage+"','"+data.ImageDescription+"','"+data.LanguageValue+"',now())";
       } else {
           qry = "UPDATE `country_images` SET `LocationID` = '" + data.LocationID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CountryID` = '" + data.CountryID + "',`CountryImage` = '" + data.CountryImage + "',`ImageDescription` = '"+data.ImageDescription+"',`LanguageValue` = '"+data.LanguageValue+"',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
       }
       return db.query(qry, callback);
       },


    saveDestinationImage: function (data,LocationID,callback) {  
        // console.log(data.Id);
        if(data.Id == null ){
            console.log(data,'INSERT QUERY');
            qry = "INSERT into destination_images(LocationID,DestinationId,DestinationLocationID,DestinationImage,ImageDescription,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.DestinationId+"','"+data.DestinationLocationID+"','"+data.DestinationImage+"','"+data.ImageDescription+"','"+data.LanguageValue+"',now())";
        } else {
            console.log(data, 'UPDATE QUERY');
            qry = "UPDATE `destination_images` SET `LocationID` = '" + data.LocationID + "',`DestinationId` = '" + data.DestinationId + "',`DestinationLocationID` = '" + data.DestinationLocationID + "',`DestinationImage` = '" + data.DestinationImage + "',`ImageDescription` = '" + data.ImageDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


    saveCountryImage: function (data,LocationID,callback) {   
        if(data.Id == null ){
            qry = "INSERT into country_images(LocationID,CountryLocationID,CountryID,CountryImage,ImageDescription,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.CountryLocationID+"','"+data.CountryID+"','"+data.CountryImage+"','"+data.ImageDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `country_images` SET `LocationID` = '" + data.LocationID + "',`CountryLocationID` = '" + data.CountryLocationID + "', `CountryID` = '" + data.CountryID + "',`CountryImage` = '" + data.CountryImage + "',`ImageDescription` = '" + data.ImageDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


    saveAttractionImage: function (data,LocationID,callback) {   
        if(data.AttractionId == null ){
            qry = "INSERT into country_attraction_images(LocationID,CountryLocationID,CountryID,AttractionImage,AttractionDescription,AttractionTitle,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.CountryLocationID+"','"+data.CountryID+"','"+data.AttractionImage+"','"+data.AttractionDescription+"','"+data.AttractionTitle+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `country_attraction_images` SET `LocationID` = '" + data.LocationID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CountryID` = '" + data.CountryID + "', `AttractionImage` = '" + data.AttractionImage + "',`AttractionDescription` = '" + data.AttractionDescription + "',`AttractionTitle` = '" + data.AttractionTitle + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `AttractionId` = '" + data.AttractionId + "'";
        }
        return db.query(qry, callback);
    },


    SaveCountryAttractionImageOption: function (data,insertInd,callback) { 
        if(insertInd){
            qry = "INSERT into country_attraction_images(LocationID,CountryLocationID,CountryID,AttractionImage,AttractionDescription,AttractionTitle,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.CountryLocationID+"','"+data.CountryID+"','"+data.AttractionImage+"','"+data.AttractionDescription+"','"+data.AttractionTitle+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `country_attraction_images` SET `LocationID` = '" + data.LocationID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CountryID` = '" + data.CountryID + "', `AttractionImage` = '" + data.AttractionImage + "',`AttractionDescription` = '" + data.AttractionDescription + "',`AttractionTitle` = '" + data.AttractionTitle + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `AttractionId` = '" + data.AttractionId + "'";
        }
        return db.query(qry, callback);
    },

    
    saveHeader: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into header(ContactNumber,FacebookLink,TwitterLink,LinkedInLink,CreatedOn)values('"+data.ContactNumber+"','"+data.FacebookLink+"','"+data.TwitterLink+"','"+data.LinkedInLink+"',now())";
        } else {
            qry = "UPDATE `header` SET `ContactNumber` = '" + data.ContactNumber + "',`FacebookLink` = '" + data.FacebookLink + "',`TwitterLink` = '" + data.TwitterLink + "',`LinkedInLink` = '" + data.LinkedInLink + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


    saveFooterContactInfo: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into footer_contact_info(CompanyAddressInEnglish,CompanyAddressInSpanish,CompanyContactNumber,CompanyEmail,CompanyWebsite,CreatedOn)values('"+data.CompanyAddressInEnglish+"','"+data.CompanyAddressInSpanish+"','"+data.CompanyContactNumber+"','"+data.CompanyEmail+"','"+data.CompanyWebsite+"',now())";
        } else {
            qry = "UPDATE `footer_contact_info` SET `CompanyAddressInEnglish` = '" + data.CompanyAddressInEnglish + "',`CompanyAddressInSpanish` = '" + data.CompanyAddressInSpanish + "',`CompanyContactNumber` = '" + data.CompanyContactNumber + "',`CompanyEmail` = '" + data.CompanyEmail + "',`CompanyWebsite` = '" + data.CompanyWebsite + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    saveDescription: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into footer_description(DescriptionInEnglish,DescriptionInSpanish,FacebookLink,TwitterLink,CreatedOn)values('"+data.DescriptionInEnglish+"','"+data.DescriptionInSpanish+"','"+data.FacebookLink+"','"+data.TwitterLink+"',now())";
        } else {
            qry = "UPDATE `footer_description` SET `DescriptionInEnglish` = '" + data.DescriptionInEnglish + "',`DescriptionInSpanish` = '" + data.DescriptionInSpanish + "',`FacebookLink` = '" + data.FacebookLink + "',`TwitterLink` = '" + data.TwitterLink + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },



    saveBlogPosts: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into footer_blog_posts(BlogImage,BlogNameInEnglish,BlogNameInSpanish,BlogDate,CreatedOn)values('"+data.BlogImage+"','"+data.BlogNameInEnglish+"','"+data.BlogNameInSpanish+"','"+data.BlogDate+"',now())";
        } else {
            qry = "UPDATE `footer_blog_posts` SET `BlogImage` = '" + data.BlogImage + "',`BlogNameInEnglish` = '" + data.BlogNameInEnglish + "',`BlogNameInSpanish` = '" + data.BlogNameInSpanish + "',`BlogDate` = '" + data.BlogDate + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },



    
    saveTags: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into footer_tags(TagNameInEnglish,TagNameInSpanish,TagLink,CreatedOn)values('"+data.TagNameInEnglish+"','"+data.TagNameInSpanish+"','"+data.TagLink+"',now())";
        } else {
            qry = "UPDATE `footer_tags` SET `TagNameInEnglish` = '" + data.TagNameInEnglish + "',`TagNameInSpanish` = '" + data.TagNameInSpanish + "',`TagLink` = '" + data.TagLink + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

       
    saveSlider: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into slider(SliderImages,SliderImagesLink,SliderCaptionInEnglish1,SliderCaptionInEnglish2,SliderCaptionInSpanish1,SliderCaptionInSpanish2,CreatedOn)values('"+data.SliderImages+"','"+data.SliderImagesLink+"','"+data.SliderCaptionInEnglish1+"','"+data.SliderCaptionInEnglish2+"','"+data.SliderCaptionInSpanish1+"','"+data.SliderCaptionInSpanish2+"',now())";
        } else {
            qry = "UPDATE `slider` SET `SliderImages` = '" + data.SliderImages + "',`SliderImagesLink` = '" + data.SliderImagesLink + "',`SliderCaptionInEnglish1` = '" + data.SliderCaptionInEnglish1 + "',`SliderCaptionInEnglish2` = '" + data.SliderCaptionInEnglish2 + "',`SliderCaptionInSpanish1` = '" + data.SliderCaptionInSpanish1 + "',`SliderCaptionInSpanish2` = '" + data.SliderCaptionInSpanish2 + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


    saveLogo: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into logo(LogoImages,CreatedOn)values('"+data.LogoImages+"',now())";
        } else {
            qry = "UPDATE `logo` SET `LogoImages` = '" + data.LogoImages + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },




    saveCity: function (data,LocationID,callback) {   
        if (data.Id == null){
  
            qry = "INSERT into city(LocationID,CountryLocationID,CountryID,CityName,HomeTitle,HomeDescription,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.CountryLocationID+"','"+data.CountryID+"','"+data.CityName+"','"+data.HomeTitle+"','"+data.HomeDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `city` SET `LocationID` = '" + data.LocationID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CountryID` = '" + data.CountryID + "',`CityName` = '" + data.CityName + "',`HomeTitle` = '" + data.HomeTitle + "',`HomeDescription` = '" + data.HomeDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    saveCityNewOption: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into city(LocationID,CountryID,CountryLocationID,CityName,HomeTitle,HomeDescription,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.CityName+"','"+data.HomeTitle+"','"+data.HomeDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `city` SET `LocationID` = '" + data.LocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CityName` = '" + data.CityName + "',`HomeTitle` = '" + data.HomeTitle + "',`HomeDescription` = '" + data.HomeDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },



    saveCityImages: function (data,LocationID,callback) {   
        if (data.Id == null){
  
            qry = "INSERT into city_images(LocationID,CountryID,CountryLocationID,CityID,CityLocationID,CityImages,ImagesDescription,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.CityID+"','"+data.CityLocationID+"','"+data.CityImages+"','"+data.ImagesDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `city_images` SET `LocationID` = '" + data.LocationID + "', `CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CityID` = '" + data.CityID + "',`CityLocationID` = '" + data.CityLocationID + "',`CityImages` = '" + data.CityImages + "',`ImagesDescription` = '" + data.ImagesDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


    saveHotel: function (data,LocationID,callback) {   
        if (data.Id == null){
  
            qry = "INSERT into hotel(LocationID,CountryID,CountryLocationID,CityID,CityLocationID,HotelName,HomeTitle,HomeDescription,Address,TelephoneNumber,WebsiteUrl,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.CityID+"','"+data.CityLocationID+"','"+data.HotelName+"','"+data.HomeTitle+"','"+data.HomeDescription+"','"+data.Address+"','"+data.TelephoneNumber+"','"+data.WebsiteUrl+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `hotel` SET `LocationID` = '" + data.LocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CityID` = '" + data.CityID + "',`CityLocationID` = '" + data.CityLocationID + "',`HotelName` = '" + data.HotelName + "',`HomeTitle` = '" + data.HomeTitle + "',`HomeDescription` = '" + data.HomeDescription + "',`Address` = '" + data.Address + "',`TelephoneNumber` = '" + data.TelephoneNumber + "',`WebsiteUrl` = '" + data.WebsiteUrl + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


    saveHotelNewOption: function (data,insertInd,callback) {   
        if (insertInd){
            qry = "INSERT into hotel(LocationID,CountryID,CountryLocationID,CityID,CityLocationID,HotelName,HomeTitle,HomeDescription,Address,TelephoneNumber,WebsiteUrl,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.CityID+"','"+data.CityLocationID+"','"+data.HotelName+"','"+data.HomeTitle+"','"+data.HomeDescription+"','"+data.Address+"','"+data.TelephoneNumber+"','"+data.WebsiteUrl+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `hotel` SET `LocationID` = '" + data.LocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CityID` = '" + data.CityID + "',`CityLocationID` = '" + data.CityLocationID + "',`HotelName` = '" + data.HotelName + "',`HomeTitle` = '" + data.HomeTitle + "',`HomeDescription` = '" + data.HomeDescription + "',`Address` = '" + data.Address + "',`TelephoneNumber` = '" + data.TelephoneNumber + "',`WebsiteUrl` = '" + data.WebsiteUrl + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


    
    saveHotelImages: function (data,LocationID,callback) {   
        if (data.Id == null){
            qry = "INSERT into hotel_images(LocationID,CountryID,CountryLocationID,CityID,CityLocationID,HotelID,HotelLocationID,HotelImages,ImagesDescription,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.CityID+"','"+data.CityLocationID+"','"+data.HotelID+"','"+data.HotelLocationID+"','"+data.HotelImages+"','"+data.ImagesDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `hotel_images` SET  `LocationID` = '" + data.LocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CityID` = '" + data.CityID + "',`CityLocationID` = '" + data.CityLocationID + "',`HotelID` = '" + data.HotelID + "',`HotelLocationID` = '" + data.HotelLocationID + "',`HotelImages` = '" + data.HotelImages + "',`ImagesDescription` = '" + data.ImagesDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


    saveHotelImagesNewOption: function (data,insertInd,callback) {   
        if (insertInd){
            qry = "INSERT into hotel_images(LocationID,CountryID,CountryLocationID,CityID,CityLocationID,HotelID,HotelLocationID,HotelImages,ImagesDescription,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.CityID+"','"+data.CityLocationID+"','"+data.HotelID+"','"+data.HotelLocationID+"','"+data.HotelImages+"','"+data.ImagesDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `hotel_images` SET  `LocationID` = '" + data.LocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`CityID` = '" + data.CityID + "',`CityLocationID` = '" + data.CityLocationID + "',`HotelID` = '" + data.HotelID + "',`HotelLocationID` = '" + data.HotelLocationID + "',`HotelImages` = '" + data.HotelImages + "',`ImagesDescription` = '" + data.ImagesDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },



    saveCategory: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into category(CategoryName,CreatedOn)values('"+data.CategoryName+"',now())";
        } else {
            qry = "UPDATE `category` SET `CategoryName` = '" + data.CategoryName + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },
    

    savePriceCategory: function (data,LocationID,callback) {   
        if (data.Id == null){
  
            qry = "INSERT into price_category(LocationID,TourID,TourLocationID,CategoryID,StartDate,EndDate,PriceIndividual,GuestPrice,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.CategoryID+"','"+data.StartDate+"','"+data.EndDate+"','"+data.PriceIndividual+"','"+data.GuestPrice+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `price_category` SET `LocationID` = '" + data.LocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`CategoryID` = '" + data.CategoryID + "',`StartDate` = '" + data.StartDate + "',`EndDate` = '" + data.EndDate + "',`PriceIndividual` = '" + data.PriceIndividual + "',`GuestPrice` = '" + data.GuestPrice + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    savePriceCategoryNewOption: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into price_category(LocationID,TourID,TourLocationID,CategoryID,StartDate,EndDate,PriceIndividual,GuestPrice,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.CategoryID+"','"+data.StartDate+"','"+data.EndDate+"','"+data.PriceIndividual+"','"+data.GuestPrice+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `price_category` SET `LocationID` = '" + data.LocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`CategoryID` = '" + data.CategoryID + "',`StartDate` = '" + data.StartDate + "',`EndDate` = '" + data.EndDate + "',`PriceIndividual` = '" + data.PriceIndividual + "',`GuestPrice` = '" + data.GuestPrice + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    saveTourPackages: function (data,LocationID,callback) {   
        if (data.Id == null){
  
            qry = "INSERT into tour_packages(LocationID,PackageName,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.PackageName+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `tour_packages` SET `LocationID` = '" + data.LocationID + "',`PackageName` = '" + data.PackageName + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    saveTourPackagesNewOption: function (data,insertInd,callback) {   
        if (insertInd){
  
            qry = "INSERT into tour_packages(LocationID,PackageName,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.PackageName+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `tour_packages` SET `LocationID` = '" + data.LocationID + "',`PackageName` = '" + data.PackageName + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

  


    saveTourProgram: function (data,LocationID,callback) {   
        if (data.Id == null){

            qry = "INSERT into program(LocationID,CountryID,CountryLocationID,TourID,TourLocationID,ProgramTitle,ProgramDescription,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.ProgramTitle+"','"+data.ProgramDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `program` SET `LocationID` = '" + data.LocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`ProgramTitle` = '" + data.ProgramTitle + "',`ProgramDescription` = '" + data.ProgramDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


    saveProgramNewOption: function (data,insertInd,callback) {   
        if (insertInd){

            qry = "INSERT into program(LocationID,CountryID,CountryLocationID,TourID,TourLocationID,ProgramTitle,ProgramDescription,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.ProgramTitle+"','"+data.ProgramDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `program` SET `LocationID` = '" + data.LocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`ProgramTitle` = '" + data.ProgramTitle + "',`ProgramDescription` = '" + data.ProgramDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },


saveProgramDays: function (data,LocationID,callback) {  
let i=0;
for( i= 0 ; i< data.length; i++){
if (data[i].Id == null){
qry = "INSERT into days(LocationID,ProgramID,ProgramLocationID,CountryID,CountryLocationID,TourID,TourLocationID,Days,DaysTitle,DaysDescription,DaysImage,LanguageValue,CreatedOn)values('"+LocationID+"','"+data[i].ProgramID+"','"+data[i].ProgramLocationID+"','"+data[i].CountryID+"','"+data[i].CountryLocationID+"','"+data[i].TourID+"','"+data[i].TourLocationID+"','"+data[i].Days+"','"+data[i].DaysTitle+"','"+data[i].DaysDescription+"','"+data[i].DaysImage+"','"+data[i].LanguageValue+"',now())";
} else {
qry = "UPDATE `days` SET `LocationID` = '" + data[i].LocationID + "',`ProgramID` = '" + data[i].ProgramID + "',`ProgramLocationID` = '" + data[i].ProgramLocationID + "',`CountryID` = '" + data[i].CountryID + "',`CountryLocationID` = '" + data[i].CountryLocationID + "',`TourID` = '" + data[i].TourID + "',`TourLocationID` = '" + data[i].TourLocationID + "',`Days` = '" + data[i].Days + "',`DaysTitle` = '" + data[i].DaysTitle + "',`DaysDescription` = '" + data[i].DaysDescription + "',`DaysImage` = '" + data[i].DaysImage + "',`LanguageValue` = '" + data[i].LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data[i].Id + "'";
}
if(i == data.length-1){
db.query(qry, callback);
}else {
db.query(qry);
}
} 
},



SaveProgramDaysNewOption: function (data,insertInd,callback) {  
let i=0;
for( i= 0 ; i< data.length; i++){
if (insertInd){
qry = "INSERT into days(LocationID,ProgramID,ProgramLocationID,CountryID,CountryLocationID,TourID,TourLocationID,Days,DaysTitle,DaysDescription,DaysImage,LanguageValue,CreatedOn)values('"+data[i].LocationID+"','"+data[i].ProgramID+"','"+data[i].ProgramLocationID+"','"+data[i].CountryID+"','"+data[i].CountryLocationID+"','"+data[i].TourID+"','"+data[i].TourLocationID+"','"+data[i].Days+"','"+data[i].DaysTitle+"','"+data[i].DaysDescription+"','"+data[i].DaysImage+"','"+data[i].LanguageValue+"',now())";
} else {
qry = "UPDATE `days` SET `LocationID` = '" + data[i].LocationID + "',`ProgramID` = '" + data[i].ProgramID + "',`ProgramLocationID` = '" + data[i].ProgramLocationID + "',`CountryID` = '" + data[i].CountryID + "',`CountryLocationID` = '" + data[i].CountryLocationID + "',`TourID` = '" + data[i].TourID + "',`TourLocationID` = '" + data[i].TourLocationID + "',`Days` = '" + data[i].Days + "',`DaysTitle` = '" + data[i].DaysTitle + "',`DaysDescription` = '" + data[i].DaysDescription + "',`DaysImage` = '" + data[i].DaysImage + "',`LanguageValue` = '" + data[i].LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data[i].Id + "'";
}
if(i == data.length-1){
db.query(qry, callback);
}else {
db.query(qry);
}
} 
},


SaveUpdatedDay: function (data,callback) { 
    console.log(data,' program data') 
 qry = "UPDATE `days` SET `LocationID` = '" + data.LocationID + "',`ProgramID` = '" + data.ProgramID + "',`ProgramLocationID` = '" + data.ProgramLocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`Days` = '" + data.Days + "',`DaysTitle` = '" + data.DaysTitle + "',`DaysDescription` = '" + data.DaysDescription + "',`DaysImage` = '" + data.DaysImage + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.DayRealID + "'";
return db.query(qry, callback);
},


    

saveTour: function (data,LocationID,callback) { 
console.log(data, 'Tour Data');
let FrontPageValue = Number(data.FrontPage); 
let Flight = Number(data.FlightIncluded);
if (data.Id == null){
qry = "INSERT into tour(LocationID,CountryID,CountryLocationID,TourProgramID,TourProgramLocationID,TourPackageID,TourPackageLocationID,CityID,CityLocationID,TourTitle,TourLocation,TourDescription,SeasonStartDate,SeasonEndDate,DurationInDays,DurationInNights,FrontPage,FlightIncluded,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.TourProgramID+"','"+data.TourProgramLocationID+"','"+data.TourPackageID+"','"+data.TourPackageLocationID+"','"+data.CityID+"','"+data.CityLocationID+"','"+data.TourTitle+"','"+data.TourLocation+"','"+data.TourDescription+"','"+data.SeasonStartDate+"','"+data.SeasonEndDate+"','"+data.DurationInDays+"','"+data.DurationInNights+"','"+FrontPageValue+"','"+Flight+"','"+data.LanguageValue+"',now())";
} else {
qry = "UPDATE `tour` SET `LocationID` = '" + data.LocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`TourProgramID` = '" + data.TourProgramID + "',`TourProgramLocationID` = '" + data.TourProgramLocationID + "',`TourPackageID` = '" + data.TourPackageID + "',`TourPackageLocationID` = '" + data.TourPackageLocationID + "',`CityID` = '" + data.CityID + "',`CityLocationID` = '" + data.CityLocationID + "',`TourTitle` = '" + data.TourTitle + "',`TourLocation` = '" + data.TourLocation + "',`TourDescription` = '" + data.TourDescription + "',`SeasonStartDate` = '" + data.SeasonStartDate + "',`SeasonEndDate` = '" + data.SeasonEndDate + "',`DurationInDays` = '" + data.DurationInDays + "',`DurationInNights` = '" + data.DurationInNights + "',`FrontPage` = '" + FrontPageValue + "',`FlightIncluded` = '" + Flight + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
console.log('updated' , qry);
}
return db.query(qry, callback);
},



saveTourDetailsNewOption: function (data,insertInd,callback) { 
        console.log(data, 'Tour Data');
        let FrontPageValue = Number(data.FrontPage); 
        let Flight = Number(data.FlightIncluded);
        if (insertInd){
            qry = "INSERT into tour(LocationID,CountryID,CountryLocationID,TourProgramID,TourProgramLocationID,TourPackageID,TourPackageLocationID,CityID,CityLocationID,TourTitle,TourLocation,TourDescription,SeasonStartDate,SeasonEndDate,DurationInDays,DurationInNights,FrontPage,FlightIncluded,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.CountryID+"','"+data.CountryLocationID+"','"+data.TourProgramID+"','"+data.TourProgramLocationID+"','"+data.TourPackageID+"','"+data.TourPackageLocationID+"','"+data.CityID+"','"+data.CityLocationID+"','"+data.TourTitle+"','"+data.TourLocation+"','"+data.TourDescription+"','"+data.SeasonStartDate+"','"+data.SeasonEndDate+"','"+data.DurationInDays+"','"+data.DurationInNights+"','"+FrontPageValue+"','"+Flight+"','"+data.LanguageValue+"',now())";
        
        } else {
            qry = "UPDATE `tour` SET `LocationID` = '" + data.LocationID + "',`CountryID` = '" + data.CountryID + "',`CountryLocationID` = '" + data.CountryLocationID + "',`TourProgramID` = '" + data.TourProgramID + "',`TourProgramLocationID` = '" + data.TourProgramLocationID + "',`TourPackageID` = '" + data.TourPackageID + "',`TourPackageLocationID` = '" + data.TourPackageLocationID + "',`CityID` = '" + data.CityID + "',`CityLocationID` = '" + data.CityLocationID + "',`TourTitle` = '" + data.TourTitle + "',`TourLocation` = '" + data.TourLocation + "',`TourDescription` = '" + data.TourDescription + "',`SeasonStartDate` = '" + data.SeasonStartDate + "',`SeasonEndDate` = '" + data.SeasonEndDate + "',`DurationInDays` = '" + data.DurationInDays + "',`DurationInNights` = '" + data.DurationInNights + "',`FrontPage` = '" +FrontPageValue + "',`FlightIncluded` = '" +Flight + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
            console.log('updated' , qry);

        }
        return db.query(qry, callback);
    },


    saveTourImages: function (data,LocationID,callback) {   
        if (data.Id == null){
            qry = "INSERT into tour_images(LocationID,TourID,TourLocationID,TourImages,Description,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.TourImages+"','"+data.Description+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `tour_images` SET `LocationID` = '" + data.LocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`TourImages` = '" + data.TourImages + "',`Description` = '" + data.Description + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    saveTourImagesNewOption: function (data,insertInd,callback) {   
        if (insertInd){
            qry = "INSERT into tour_images(LocationID,TourID,TourLocationID,TourImages,Description,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.TourImages+"','"+data.Description+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `tour_images` SET `LocationID` = '" + data.LocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`TourImages` = '" + data.TourImages + "',`Description` = '" + data.Description + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

  

    saveTourServices: function (data,LocationID,callback) {  
        if (data.Id == null){
  
            qry = "INSERT into tour_services(LocationID,TourID,TourLocationID,ServiceTitle,ServiceDescription,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.ServiceTitle+"','"+data.ServiceDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `tour_services` SET `LocationID` = '" + data.LocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`ServiceTitle` = '" + data.ServiceTitle + "',`ServiceDescription` = '" + data.ServiceDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    saveTourServicesNewOption: function (data,insertInd,callback) {  
        if (insertInd){
            qry = "INSERT into tour_services(LocationID,TourID,TourLocationID,ServiceTitle,ServiceDescription,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.ServiceTitle+"','"+data.ServiceDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `tour_services` SET `LocationID` = '" + data.LocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`ServiceTitle` = '" + data.ServiceTitle + "',`ServiceDescription` = '" + data.ServiceDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },



    saveTourTerm: function (data,LocationID,callback) {  
        if (data.Id == null){
  
            qry = "INSERT into tour_terms(LocationID,TourID,TourLocationID,TermTitle,TermDescription,LanguageValue,CreatedOn)values('"+LocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.TermTitle+"','"+data.TermDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `tour_terms` SET `LocationID` = '" + data.LocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`TermTitle` = '" + data.TermTitle + "',`TermDescription` = '" + data.TermDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },

    saveTourTermNewOption: function (data,insertInd,callback) {  
        if (insertInd){
            qry = "INSERT into tour_terms(LocationID,TourID,TourLocationID,TermTitle,TermDescription,LanguageValue,CreatedOn)values('"+data.LocationID+"','"+data.TourID+"','"+data.TourLocationID+"','"+data.TermTitle+"','"+data.TermDescription+"','"+data.LanguageValue+"',now())";
        } else {
            qry = "UPDATE `tour_terms` SET `LocationID` = '" + data.LocationID + "',`TourID` = '" + data.TourID + "',`TourLocationID` = '" + data.TourLocationID + "',`TermTitle` = '" + data.TermTitle + "',`TermDescription` = '" + data.TermDescription + "',`LanguageValue` = '" + data.LanguageValue + "',`CreatedOn` = now() WHERE `Id` = '" + data.Id + "'";
        }
        return db.query(qry, callback);
    },
 



    getDestinationListAccordingToLanguage: function (Lang,callback) {
        return db.query("SELECT destination.*,languages.LanguageName FROM destination LEFT JOIN languages ON languages.LanguageValue = destination.LanguageValue where destination.LanguageValue = '"+Lang+"'",callback);
    },
    getDestinationLocationID: function (Id,callback) {
        return db.query("SELECT * FROM destination where Id = '"+Id+"'",callback);
    },

    getDestinationListByDestinationLocationIDAndLanguage: function (Lang,Id,callback) {
        console.log(Lang, 'Language');
        console.log(Id, 'Id');
        return db.query("SELECT * FROM destination where LanguageValue= '"+Lang+"' AND LocationId = '"+Id+"'",callback);
    },

    getDestinationListInDestinationImages: function (Language,Id,callback) {
        console.log(Id, 'LocationID')
        return db.query("SELECT * FROM destination where LanguageValue = '"+Language+"' AND LocationID = '"+Id+"'",callback);
    },

    getDestinationListInEnglish: function (Language,callback) {
        
        return db.query("SELECT * FROM destination where LanguageValue = '"+Language+"'",callback);
    },

    getDestinationListInDestinationImagesByDestinationId: function (Id,callback) {
        return db.query("SELECT * FROM destination where Id = '"+Id+"'",callback);
    },

    getDestinationListByDestinationID:function (Id,callback){
        return db.query("SELECT * From destination where Id = '"+Id+"'",callback);
    },

    getCountryLists:function (callback){
        return db.query("SELECT * From country where LanguageValue = 'EN'",callback);
    },

    getCountryListByCountryID:function (Id,callback){
        return db.query("SELECT * From country where Id = '"+Id+"'",callback);
    },


    getCountryList: function (Lang,callback) {
        return db.query("SELECT country.* , destination.DestinationName AS DestinationNameEn,languages.LanguageName FROM `country` LEFT JOIN destination ON destination.Id = country.DestinationId LEFT JOIN languages ON languages.LanguageValue = country.LanguageValue where country.LanguageValue = '"+Lang+"'",callback);
    },
    getCountryLocationID: function (Id,callback) {
        return db.query("SELECT * from country where Id='"+Id+"'",callback);
    },

    getCountryListsInCountryImages: function (callback) {
        return db.query("SELECT * from country where LanguageValue = 'EN'",callback);
    },
    getCountryListsInCountryImagesByCountryId: function (Id,callback) {
        return db.query("SELECT * from country where Id='"+Id+"'",callback);
    },

    getCountryListsByCountryLocationID: function (Lang,Id,callback) {
        return db.query("SELECT * from country where LanguageValue = '"+Lang+"' AND LocationID='"+Id+"'",callback);
    },

    getCountryLocationIDByCountryID: function (Id,callback) {
        return db.query("SELECT * from country where  Id ='"+Id+"'",callback);
    },
    getCityLocationIDByCityID: function (Id,callback) {
        return db.query("SELECT * from city where  Id ='"+Id+"'",callback);
    },

    getcityListInCityImagesByCountryID: function (Id,callback) {
        return db.query("SELECT * from city where  CountryID ='"+Id+"'",callback);
    },

    getcityLocationIDInCityImages: function (Id,callback) {
        return db.query("SELECT * from city where  Id ='"+Id+"'",callback);
    },

    getHotelListByCityIDInHotelImages: function (Id,callback) {
        return db.query("SELECT * from hotel where  CityID ='"+Id+"'",callback);
    },

    getHotelLocationIDByHotelIDInHotelImages: function (Id,callback) {
        return db.query("SELECT * from hotel where  Id ='"+Id+"'",callback);
    },

    getCountryListsInAttractionImagesByCountryLocationID: function (Lang,Id,callback) {
        return db.query("SELECT * from country where LanguageValue = '"+Lang+"' And LocationID = '"+Id+"'",callback);
    },

    getCountryListsInAttractionImagesByCountryId: function (Id,callback) {
        return db.query("SELECT * from country where Id = '"+Id+"'",callback);
    },
    getCountryListsOnlyInEnglish: function (callback) {
        return db.query("SELECT * from country where LanguageValue = 'EN'",callback);
    },
    getCountryListByCountryLocationIDAndLanguage: function (Lang,Id,callback) {
        return db.query("SELECT * from country where LanguageValue = '"+Lang+"' AND LocationID = '"+Id+"'",callback);
    },

    getDestinationImagesListAccordingToLang: function (Lang,callback) {
        return db.query("SELECT  destination_images.*, destination.DestinationName,languages.LanguageName FROM  `destination_images` LEFT JOIN destination ON destination.Id = destination_images.DestinationId LEFT JOIN languages ON languages.LanguageValue = destination_images.LanguageValue where destination_images.LanguageValue = '"+Lang+"'",callback);
    },

    getTourByTourID: function (Id,callback) {
        return db.query("SELECT * from tour where Id = '"+Id+"'",callback);
    },

    getCountryByCountryIDInProgramNewOption: function (Id,callback) {
        return db.query("SELECT country.* FROM country where Id = '"+Id+"'",callback);
    },

    getLanguagesListByLanguageValue: function (LanguageValue,callback) {
        return db.query("SELECT * FROM `languages` WHERE `LanguageValue` = '"+LanguageValue+"'",callback);
    },


    getCountryImages: function (Lang,callback) {
        return db.query("SELECT  country_images.*, country.CountryName AS CountryNameEn, languages.LanguageName FROM  `country_images` LEFT JOIN country ON country.Id = country_images.CountryId LEFT JOIN languages ON languages.LanguageValue = country_images.LanguageValue where country_images.LanguageValue = '"+Lang+"'",callback);
    },


    getAttractionImages: function (Lang,callback) {
        return db.query("SELECT country_attraction_images.*, country.CountryName AS CountryNameEn,languages.LanguageName  FROM `country_attraction_images` LEFT JOIN country ON country.Id = country_attraction_images.CountryId LEFT JOIN languages ON languages.LanguageValue = country_attraction_images.LanguageValue WHERE country_attraction_images.LanguageValue = '"+Lang+"'",callback);
    },


    getHeader: function (callback) {
        return db.query("SELECT * FROM header",callback);
    },


    getContactInfo: function (callback) {
        return db.query("SELECT * FROM footer_contact_info",callback);
    },
    

    getDescription: function (callback) {
        return db.query("SELECT * FROM footer_description",callback);
    },


    getBlogPosts: function (callback) {
        return db.query("SELECT * FROM footer_blog_posts",callback);
    },


    getTagsList: function (callback) {
        return db.query("SELECT * FROM footer_tags",callback);
    },


    getSliderList: function (callback) {
        return db.query("SELECT * FROM slider",callback);
    },

    getLogoList: function (callback) {
        return db.query("SELECT * FROM logo",callback);
    },

    getCityList: function (Lang,callback) {
        return db.query("SELECT  city.*, country.CountryName AS CountryNameInEnglish,languages.LanguageName FROM  `city` LEFT JOIN country ON country.Id = city.CountryId LEFT JOIN languages ON languages.LanguageValue = city.LanguageValue where city.LanguageValue = '"+Lang+"'",callback);
    },

    getCityByCountryID: function (Id,callback) {
        return db.query("select * from city where CountryID = '"+Id+"'",callback);
    },

    getCityLocationByCityID: function (Id,callback) {
        return db.query("select * from city where Id = '"+Id+"'",callback);
    },

    getCityImagesList: function (Lang,callback) {
        return db.query("SELECT city_images.*, country.CountryName AS CountryNameInEnglish,city.CityName AS CityNameInEnglish,languages.LanguageName FROM `city_images` LEFT JOIN country ON country.Id = city_images.CountryId LEFT JOIN city ON city.Id = city_images.CityId LEFT JOIN languages ON languages.LanguageValue = city_images.LanguageValue where city_images.LanguageValue = '"+Lang+"' ",callback);
    },

    getHotelList: function (Lang,callback) {
        return db.query("SELECT hotel.*, country.CountryName AS CountryNameInEnglish,city.CityName AS CityNameInEnglish,languages.LanguageName FROM `hotel`LEFT JOIN country ON country.Id = hotel.CountryId LEFT JOIN city ON city.Id = hotel.CityId LEFT JOIN languages ON languages.LanguageValue= hotel.LanguageValue  where hotel.LanguageValue = '"+Lang+"'",callback);
    },

    getHotelLocationIDByHotelID: function (Id,callback) {
        return db.query("SELECT * from hotel where Id = '"+Id+"'",callback);
    },

    getHotelImagesList: function (Lang,callback) {
        return db.query("SELECT hotel_images.*, country.CountryName AS CountryNameInEnglish,city.CityName AS CityNameInEnglish, hotel.HotelName AS HotelNameInEnglish, languages.LanguageName FROM `hotel_images` LEFT JOIN country ON country.Id = hotel_images.CountryId LEFT JOIN city ON city.Id = hotel_images.CityId LEFT JOIN hotel ON hotel.Id = hotel_images.HotelId LEFT JOIN languages ON languages.LanguageValue = hotel_images.LanguageValue where hotel_images.LanguageValue= '"+Lang+"' ",callback);
    },
  
    getCategoryList: function (callback) {
        return db.query("SELECT * FROM category",callback);
    },
    getCategoryListById: function (Id,callback) {
        return db.query("SELECT * FROM category where Id = '"+Id+"'",callback);
    },

    getPriceCategoryListByLanguage: function (Lang,callback) {
        return db.query("SELECT price_category.*, category.CategoryName AS CategoryNameEn ,tour.TourTitle AS TourName,languages.LanguageName FROM `price_category` LEFT JOIN tour ON tour.Id = price_category.TourId LEFT JOIN category ON category.Id = price_category.CategoryId LEFT JOIN languages ON languages.LanguageValue = price_category.LanguageValue where price_category.LanguageValue = '"+Lang+"'",callback);
    },

    getCategoryDetailsByCategoryID: function (Id,callback) {
        return db.query("SELECT * FROM category where Id = '"+Id+"'",callback);
    },

    getTourPackagesList: function (Lang,callback) {
        return db.query("SELECT tour_packages.*, languages.LanguageName FROM tour_packages LEFT JOIN languages ON languages.LanguageValue = tour_packages.LanguageValue where tour_packages.LanguageValue = '"+Lang+"'",callback);
    },
    getTourPackagesListOnlyInEnglishInTours: function (Lang,callback) {
        return db.query("SELECT * from tour_packages where LanguageValue= '"+Lang+"'",callback);
    },

    FindTourPackageLocationIDByTourPackageID: function (Id,callback) {
        return db.query("SELECT * from tour_packages where Id= '"+Id+"'",callback);
    },

    FindTourProgramLocationIDByTourProgramID: function (Id,callback) {
        return db.query("SELECT * from tour_program where Id= '"+Id+"'",callback);
    },
    getTourPackagesListInTourByTourPackageId: function (Id,callback) {
        return db.query("SELECT * from tour_packages where Id= '"+Id+"'",callback);
    },
    getTourProgramListOnlyInEnglish: function (Lang,callback) {
        return db.query("SELECT * from tour_program where LanguageValue = '"+Lang+"'",callback);
    },
    getTourDetailsByTourID: function (Id,callback) {
        return db.query("SELECT * from tour where Id = '"+Id+"'",callback);
    },

    getAllToursByTourID: function (Id,callback) {
        return db.query("SELECT * from tour where CountryID = '"+Id+"'",callback);
    },

    getAllTourByTourLocationID: function (Lang,Id,callback) {
        return db.query("SELECT * from tour where  LocationID = '"+Id+"' AND LanguageValue = '"+Lang+"'",callback);
    },
    getTourProgramListInTourByTourProgramId: function (Id,callback) {
        return db.query("SELECT * from tour_program where Id = '"+Id+"'",callback);
    },
    getTourPriceCategoryListInTour: function (callback) {
        return db.query("SELECT * from price_category",callback);
    },
    getProgramList: function (Lang,callback) {
        return db.query("SELECT program.*, languages.LanguageName,country.*,country.LocationID AS RealCountryLocationID,tour.*,tour.LocationID AS RealTourLocationID FROM program LEFT JOIN languages ON languages.LanguageValue = program.LanguageValue LEFT JOIN country ON country.Id = program.CountryID LEFT JOIN tour ON tour.Id = program.TourID where program.LanguageValue = '"+Lang+"'",callback);
    },

    getDaysList: function (Lang,callback) {
        return db.query("SELECT days.*, days.Id AS DayRealID, languages.LanguageName,languages.Id AS LanguageRealID,country.*,country.LocationID AS RealCountryLocationID,country.Id as CountryRealID,tour.*,tour.LocationID AS RealTourLocationID ,tour.Id AS TourRealID,program.*, program.LocationID as RealProgramLocationID,program.Id AS ProgramRealID FROM days LEFT JOIN languages ON languages.LanguageValue = days.LanguageValue LEFT JOIN country ON country.Id = days.CountryID LEFT JOIN tour ON tour.Id = days.TourID LEFT JOIN program ON program.Id = days.ProgramID where days.LanguageValue = '"+Lang+"'",callback);
    },

    getCountryByLanguageInProgram: function (Lang,Id,callback) {
        return db.query("SELECT country.* FROM country where country.LanguageValue = '"+Lang+"' AND country.LocationID = '"+Id+"'",callback);
    },

    getToursForProgramNewOptionByCountryID: function (Id,callback) {
        return db.query("SELECT tour.* FROM tour where tour.CountryID = '"+Id+"'",callback);
    },
    getTourList: function (Lang,callback) {
        return db.query("SELECT tour.*, country.CountryName,tour_packages.PackageName,city.CityName,tour_program.Title,languages.LanguageName FROM tour LEFT JOIN country ON country.Id = tour.CountryId LEFT JOIN tour_packages ON tour_packages.Id = tour.TourPackageId LEFT JOIN city ON city.Id = tour.CityId LEFT JOIN tour_program ON tour_program.Id = tour.TourProgramId LEFT JOIN languages ON languages.LanguageValue = tour.LanguageValue where tour.LanguageValue = '"+Lang+"'",callback);
    },

    getTourListByTourId: function (Id,callback) {
        return db.query("SELECT * from tour where Id = '"+Id+"'",callback);
    },

    getTourServicesListByTourId: function (Id,callback) {
        return db.query("SELECT * from tour where Id = '"+Id+"'",callback);
    },

    getTourImagesListByLanguage: function (Lang,callback) {
        return db.query("SELECT  tour_images.*, tour.TourTitle, languages.LanguageName From  `tour_images` LEFT JOIN tour on tour.Id = tour_images.TourId LEFT JOIN languages on languages.LanguageValue = tour_images.LanguageValue where tour_images.LanguageValue = '"+Lang+"' ",callback);
    },
    getCityListId: function (Id,callback) {
        console.log(Id, '= countryId ')
        return db.query("SELECT * FROM `city` WHERE `CountryID` = '"+Id+"'",callback);
    },

    getHotelListId: function (Id,callback) {
        console.log(Id, '= HotelId ')
        return db.query("SELECT * FROM `hotel` WHERE `CityId` = '"+Id+"'",callback);
    },
    getTourServiceListByLanguage: function(Lang,callback) {
        return db.query("SELECT  tour_services.*, tour.TourTitle,languages.LanguageName  FROM  `tour_services` LEFT JOIN tour ON tour.Id = tour_services.TourId LEFT JOIN languages ON languages.LanguageValue = tour_services.LanguageValue where tour_services.LanguageValue = '"+Lang+"'",callback);
    },
    getTourTermListByLanguage: function(Lang,callback) {
        return db.query("SELECT  tour_terms.*, tour.TourTitle,languages.LanguageName  FROM  `tour_terms` LEFT JOIN tour ON tour.Id = tour_terms.TourId LEFT JOIN languages ON languages.LanguageValue = tour_terms.LanguageValue where tour_terms.LanguageValue = '"+Lang+"'",callback);
    },

    getToursByCountryIDInProgramDays: function (Id,callback) {   
        return db.query("SELECT tour.* FROM tour where tour.CountryID= '"+Id+"'",callback);
    },

    getProgramTitleByTourID: function (Id,callback) {   
        return db.query("SELECT program.* FROM program where program.TourID= '"+Id+"'",callback);
    },
    getAllLanguagesList: function (callback) {   
        return db.query("SELECT * FROM languages",callback);
    },

    getLanguagesListInCityDetails: function (callback) {   
        return db.query("SELECT * FROM languages",callback);
    },

    getCountryListsInCityImagesByLanguage: function (Lang,callback) {   
        return db.query("SELECT * FROM country  where LanguageValue = '"+Lang+"'",callback);
    },
    getCountryListsInCityImagesByCountryId: function (Id,callback) {   
        return db.query("SELECT * FROM country  where Id = '"+Id+"'",callback);
    },
    getCountryListsInHotelDetailsByLanguage: function (Lang,callback) {   
        return db.query("SELECT * FROM country  where LanguageValue = '"+Lang+"'",callback);
    },
    getCountryListsInHotelDetailsByCountryId: function (Id,callback) {   
        return db.query("SELECT * FROM country  where Id = '"+Id+"'",callback);
    },
    getCountryListsInHotelImages: function (callback) {   
        return db.query("SELECT * FROM country  where LanguageValue = 'En'",callback);
    },
    getCountryListsInTourByLanguage: function (Lang,Id,callback) {   
        return db.query("SELECT * FROM country where LanguageValue = '"+Lang+"' AND  LocationID = '"+Id+"'",callback);
    },
    getCountryListsInTourByCountryId: function (Id,callback) {   
        return db.query("SELECT * FROM country where id = '"+Id+"'",callback);
    },

    getAllDestinationOnlyInEnglish: function (Lang,callback) {   
        return db.query("SELECT * FROM destination where LanguageValue = '"+Lang+"'",callback);
    },
    getAllDestinationByDestinationId: function (Id,callback) {   
        return db.query("SELECT * FROM destination where Id = '"+Id+"'",callback);
    },
    getTourNameByCountryID: function (Id,callback) {   
        return db.query("SELECT * FROM tour where Id = '"+Id+"'",callback);
    },

    getTourProgramByProgramID: function (Id,callback) {   
        return db.query("SELECT * FROM program where Id = '"+Id+"'",callback);
    },

    getCountryByIDInDaysModule: function (Id,callback) {   
        return db.query("SELECT * FROM country where Id = '"+Id+"'",callback);
    },
    

    deleteLanguages: function(Id,callback) {
        return db.query(
          "Delete from languages where Id= ? ", [Id],
          callback
        );
    },


    deleteDestination: function(Id,callback) {
        return db.query(
          "Delete from destination where Id= ? ", [Id],
          callback
        );
    },
    deleteDestinationWithDestinationImage: function(Id,callback) {
        return db.query(
          "Delete from destination_images where DestinationId= ? ", [Id],
          callback
        );
    },
    deleteCountry: function(Id,callback) {
        return db.query(
          "Delete from country where Id= ? ", [Id],
          callback
        );
    },
    deleteCountrywithCity: function(Id,callback) {
        return db.query(
          "Delete from city where CountryId= ? ", [Id],
          callback
        );
    },

    deleteCountryWithCityImages: function(Id,callback) {
        return db.query(
          "Delete from city_images where CountryId= ? ", [Id],
          callback
        );
    },

    deleteCountryWithHotel: function(Id,callback) {
        return db.query(
          "Delete from hotel where CountryId= ? ", [Id],
          callback
        );
    },


    deleteCountryWithHotelImages: function(Id,callback) {
        return db.query(
          "Delete from hotel_images where CountryId= ? ", [Id],
          callback
        );
    },

    deleteCountryWithTourImages: function(Id,callback) {
        return db.query(
          "Delete from tour_images where CountryId= ? ", [Id],
          callback
        );
    },
    deleteCountryWithTour: function(Id,callback) {
        return db.query(
          "Delete from tour where CountryId= ? ", [Id],
          callback
        );
    },

    deleteCountryWithTourServices: function(Id,callback) {
        return db.query(
          "Delete from tour_services where CountryId= ? ", [Id],
          callback
        );
    },

   



    deleteDestinationImages: function(Id,callback) {
        return db.query(
          "Delete from destination_images where Id= ? ", [Id],
          callback
        );
    },


    deleteCountryImages: function(Id,callback) {
        return db.query(
          "Delete from country_images where Id= ? ", [Id],
          callback
        );
    },

    deleteCountryWithCountryImages: function(Id,callback) {
        return db.query(
          "Delete from country_images where CountryId= ? ", [Id],
          callback
        );
    },


    deleteAttractionImages: function(AttractionId,callback) {
        return db.query(
          "Delete from country_attraction_images where AttractionId= ? ", [AttractionId],
          callback
        );
    },

    deleteCountryWithAttractionImages: function(AttractionId,callback) {
        return db.query(
          "Delete from country_attraction_images where CountryId= ? ", [AttractionId],
          callback
        );
    },






    deleteHeader: function(Id,callback) {
        return db.query(
          "Delete from header where Id= ? ", [Id],
          callback
        );
    },

    deleteContactInfo: function(Id,callback) {
        return db.query(
          "Delete from footer_contact_info where Id= ? ", [Id],
          callback
        );
    },

    
    deleteDescription: function(Id,callback) {
        return db.query(
          "Delete from footer_description where Id= ? ", [Id],
          callback
        );
    },

    deleteBlogPosts: function(Id,callback) {
        return db.query(
          "Delete from footer_blog_posts where Id= ? ", [Id],
          callback
        );
    },


    deleteTags: function(Id,callback) {
        return db.query(
          "Delete from footer_tags where Id= ? ", [Id],
          callback
        );
    },

    deleteSliderImages: function(Id,callback) {
        return db.query(
          "Delete from slider where Id= ? ", [Id],
          callback
        );
    },

    deleteLogo: function(Id,callback) {
        return db.query(
          "Delete from logo where Id= ? ", [Id],
          callback
        );
    },

    deleteCity: function(Id,callback) {
        return db.query(
          "Delete from city where Id= ? ", [Id],
          callback
        );
    },
    deleteCityWithCityImages: function(Id,callback) {
        return db.query(
          "Delete from city_images where CityId= ? ", [Id],
          callback
        );
    },

    deleteCityImages: function(Id,callback) {
        return db.query(
          "Delete from city_images where Id= ? ", [Id],
          callback
        );
    },

    deleteHotel: function(Id,callback) {
        return db.query(
          "Delete from hotel where Id= ? ", [Id],
          callback
        );
    },
    deleteCityWithHotel: function(Id,callback) {
        return db.query(
          "Delete from hotel where CityId= ? ", [Id],
          callback
        );
    },


    deleteHotelImages: function(Id,callback) {
        return db.query(
          "Delete from hotel_images where Id= ? ", [Id],
          callback
        );
    },

    deleteHotelWithHotelImages: function(Id,callback) {
        return db.query(
          "Delete from hotel_images where HotelId= ? ", [Id],
          callback
        );
    },
    
    deleteCityWithHotelImages: function(Id,callback) {
        return db.query(
          "Delete from hotel_images where CityId= ? ", [Id],
          callback
        );
    },


    deleteCategory: function(Id,callback) {
        return db.query(
          "Delete from category where Id= ? ", [Id],
          callback
        );
    },

    deleteCategoryWithPriceCategory: function(Id,callback) {
        return db.query(
          "Delete from price_category where CategoryId= ? ", [Id],
          callback
        );
    },


    deletePriceCategory: function(Id,callback) {
        return db.query(
          "Delete from price_category where Id= ? ", [Id],
          callback
        );
    },


    deleteTourWithPriceCategory: function(Id,callback) {
        return db.query(
          "Delete from price_category where TourId= ? ", [Id],
          callback
        );
    },


    deleteTourPackages: function(Id,callback) {
        return db.query(
          "Delete from tour_packages where Id= ? ", [Id],
          callback
        );
    },

    deleteTourProgram: function(Id,callback) {
        return db.query(
          "Delete from tour_program where Id= ? ", [Id],
          callback
        );
    },

    deleteTour: function(Id,callback) {
        return db.query(
          "Delete from tour where Id= ? ", [Id],
          callback
        );
    },

    deleteProgram: function(Id,callback) {
        return db.query(
          "Delete from program where Id= ? ", [Id],
          callback
        );
    },

    deleteTourWithTourImages: function(Id,callback) {
        return db.query(
          "Delete from tour_images where TourId= ? ", [Id],
          callback
        );
    },

    deleteTourWithTourServices: function(Id,callback) {
        return db.query(
          "Delete from tour_services where TourId= ? ", [Id],
          callback
        );
    },


    deleteTourImages: function(Id,callback) {
        return db.query(
          "Delete from tour_images where Id= ? ", [Id],
          callback
        );
    },
    deleteTourServices: function(Id,callback) {
        return db.query(
          "Delete from tour_services where Id= ? ", [Id],
          callback
        );
    },
    deleteTourTerm: function(Id,callback) {
        return db.query(
          "Delete from tour_terms where Id= ? ", [Id],
          callback
        );
    },

    deleteDays: function(Id,callback) {
        return db.query(
          "Delete from days where Id= ? ", [Id],
          callback
        );
    },
 
}
module.exports=admin;