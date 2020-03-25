var db = require("../../dbconnection");
var web = {


getHeaderList: function (callback) {
return db.query("SELECT * FROM header",callback);
},


getLanguagesList: function (callback) {
return db.query("SELECT * FROM languages",callback);
},


getTourCarouselImagesListByLanguage: function (Lang,callback) {
return db.query("SELECT tour_images.*, tour.* FROM tour_images LEFT JOIN tour ON tour.Id = tour_images.TourId where FrontPage = 1 AND tour_images.LanguageValue = '"+Lang+"'",callback);
},


getTourCarouselImagesListByDefault: function (Lang,callback) {
return db.query("SELECT tour_images.*, tour.* FROM tour_images LEFT JOIN tour ON tour.Id = tour_images.TourId where FrontPage = 1 AND tour_images.LanguageValue = '"+Lang+"'",callback);
},


getDestinationImagesListByDefaultLanguage: function (Lang,callback) {
return db.query("SELECT destination_images.*, destination.* FROM destination_images LEFT JOIN destination ON destination.Id = destination_images.DestinationId where destination_images.LanguageValue= '"+Lang+"'",callback);
},


getDestinationImagesListByLanguage: function (Lang,callback) {
return db.query("SELECT destination_images.*, destination.* FROM destination_images LEFT JOIN destination ON destination.Id = destination_images.DestinationId where destination_images.LanguageValue = '"+Lang+"'",callback);
},


getCountriesByDestinationLocationAndLanguage: function (Lang,Id,callback) {
return db.query("SELECT country.*, country.LocationID as RealCountryLocationID,country_images.* FROM country LEFT JOIN country_images ON country.Id = country_images.CountryID where country.LanguageValue = '"+Lang+"' AND country.DestinationLocationID = '"+Id+"'",callback);
},


getDestinationTitle: function (Lang,Id,callback) {
return db.query("SELECT destination.* From destination where LanguageValue = '"+Lang+"' AND LocationID = '"+Id+"'",callback);
},


getDestinationsAccordingToLanguages: function (Lang,callback) {
return db.query("SELECT destination_images.*, destination.* FROM destination_images LEFT JOIN destination ON destination.Id = destination_images.DestinationId where destination_images.LanguageValue = '"+Lang+"'",callback);
},


getCountryByCountryLocationID: function (Lang,Id,callback) {
return db.query("SELECT country.*,country_images.*,country_attraction_images.* FROM country LEFT JOIN country_images ON country.Id = country_images.CountryID LEFT JOIN country_attraction_images ON country.Id = country_attraction_images.CountryID where country.LanguageValue = '"+Lang+"' AND country.LocationID = '"+Id+"'",callback);
},

getHotelsByCountryLocationID: function (Lang,Id,callback) {
return db.query("select hotel.*,hotel_images.*,hotel_images.Id As RealHotelImagesID from hotel LEFT JOIN hotel_images ON hotel_images.HotelID = hotel.Id where hotel.LanguageValue = '"+Lang+"' AND hotel.CountryLocationID = '"+Id+"'",callback);
},


getCitiesByCountryLocationID: function (Lang,Id,callback) {
return db.query("select city.*,city_images.*,city_images.Id As RealCityImagesID from city LEFT JOIN city_images ON city_images.CityID = city.Id where city.LanguageValue = '"+Lang+"' AND city.CountryLocationID = '"+Id+"'",callback);
},


SearchCountry: function (Country,callback) {
return db.query("SELECT country.*,country.LocationID AS RealCountryLocationID,country_images.*,country_attraction_images.* FROM country LEFT JOIN country_images ON country.Id = country_images.CountryID LEFT JOIN country_attraction_images ON country.Id = country_attraction_images.CountryID WHERE CountryName LIKE '%"+Country.CountryName+"%' AND country.LanguageValue ='"+Country.Lang+"'",callback);
},


getCountryCount: function (LocationID,Lang,callback) {
    console.log(LocationID,'LocationID');
return db.query("SELECT COUNT(*) AS Count FROM country WHERE country.DestinationLocationID = '"+LocationID+"' AND country.LanguageValue = '"+Lang+"'",callback);
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


getToursByTourPackageID: function (Lang,PackageID,callback) {
if(PackageID == 0){
return db.query("SELECT country.*, destination.*, tour.*,tour_images.*,price_category.* FROM country LEFT JOIN destination ON destination.Id = country.DestinationID LEFT JOIN tour ON tour.CountryID = country.Id LEFT JOIN tour_images ON tour_images.TourID = tour.Id LEFT JOIN price_category ON price_category.TourID = tour.Id WHERE tour.LanguageValue = '"+Lang+"'AND price_category.CategoryID = 1",callback);
} else {
return db.query("SELECT country.*, destination.*, tour.*,tour_images.*,price_category.* FROM country LEFT JOIN destination ON destination.Id = country.DestinationID LEFT JOIN tour ON tour.CountryID = country.Id LEFT JOIN tour_images ON tour_images.TourID = tour.Id LEFT JOIN price_category ON price_category.TourID = tour.Id WHERE  AND tour.TourPackageID ='"+PackageID+"' AND tour.LanguageValue = '"+Lang+"' AND price_category.CategoryID = 1",callback);
} 
},


getAllToursByCountryLocationID: function (Lang,CountryLocationID,PackageID,callback) {
 if(PackageID == 0){
return db.query("SELECT country.*, destination.*, tour.*,tour_images.*,price_category.* FROM country LEFT JOIN destination ON destination.Id = country.DestinationID LEFT JOIN tour ON tour.CountryID = country.Id LEFT JOIN tour_images ON tour_images.TourID = tour.Id LEFT JOIN price_category ON price_category.TourID = tour.Id WHERE tour.LanguageValue = '"+Lang+"' AND tour.CountryLocationID = '"+CountryLocationID+"' AND price_category.CategoryID = 1",callback);
} else {
return db.query("SELECT country.*, destination.*, tour.*,tour_images.*,price_category.* FROM country LEFT JOIN destination ON destination.Id = country.DestinationID LEFT JOIN tour ON tour.CountryID = country.Id LEFT JOIN tour_images ON tour_images.TourID = tour.Id LEFT JOIN price_category ON price_category.TourID = tour.Id WHERE tour.CountryLocationID = '"+CountryLocationID+"' AND  tour.TourPackageID ='"+PackageID+"' AND tour.LanguageValue = '"+Lang+"' AND price_category.CategoryID = 1",callback);
} 
},


getAllTourDetailsInSpecificTours: function (TourLocationID,Lang,callback) {
return db.query("SELECT tour.*,tour_images.*,tour_images.Id AS RealTourImageID,country.*,country.Id AS RealCountryID, program.*,program.Id AS RealProgramID From tour LEFT JOIN tour_images ON tour_images.TourID = tour.ID LEFT JOIN country on country.Id = tour.CountryID LEFT JOIN program ON program.TourID = tour.Id   WHERE tour.LocationID = '"+TourLocationID+"' AND tour.LanguageValue = '"+Lang+"'",callback);
},

getDaysDetailsByProgramID: function (ProgramID,Lang,callback) {
return db.query("SELECT days.* From days WHERE days.ProgramID = '"+ProgramID+"'AND days.LanguageValue = '"+Lang+"' ORDER BY days.Days",callback);
},

getTourServicesInSpecificTour: function (TourLocationID,Lang,callback) {
return db.query("SELECT tour_services.* From tour_services WHERE tour_services.TourLocationID = '"+TourLocationID+"'AND tour_services.LanguageValue = '"+Lang+"'",callback);
},

getTourTermsInSpecificTour: function (TourLocationID,Lang,callback) {
return db.query("SELECT tour_terms.* From tour_terms WHERE tour_terms.TourLocationID = '"+TourLocationID+"'AND tour_terms.LanguageValue = '"+Lang+"'",callback);
},

getPriceCategoryDetailsInSpecificTour: function (TourLocationID,Lang,callback) {
return db.query("SELECT price_category.*,category.*,category.Id AS RealCategoryID From price_category LEFT JOIN category ON category.Id = price_category.CategoryID WHERE price_category.TourLocationID = '"+TourLocationID+"'AND price_category.LanguageValue = '"+Lang+"'",callback);
},

getAllTourPackages: function (Lang,callback) {
return db.query("SELECT * From tour_packages WHERE tour_packages.LanguageValue = '"+Lang+"'",callback);
},


}

module.exports=web;