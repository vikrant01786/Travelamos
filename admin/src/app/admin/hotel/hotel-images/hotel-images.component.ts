// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Hotel_Images } from 'src/app/models/hotel-images.model';
import {HotelImagesService} from 'src/app/services/hotel-images.service';
import { CountryService } from 'src/app/services/country.service';
import {CityDetailsService} from 'src/app/services/city-details.service';
import {HotelDetailsService} from 'src/app/services/hotel-details.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { DestinationService } from 'src/app/services/destination.service';
import { CityImagesService } from 'src/app/services/city-images.service';
import { CountryImagesService } from 'src/app/services/country-images.service';

@Component({
  selector: 'app-hotel-images',
  templateUrl: './hotel-images.component.html',
  styleUrls: ['./hotel-images.component.css']
})
export class HotelImagesComponent implements OnInit {
  @ViewChild('countryId')
  countryId: ElementRef;
  @ViewChild('cityBox')
  cityBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  @ViewChild('hotel')
  Hotel: ElementRef;
  env = environment;
  private url = this.env.apiUrl + 'file';

  options: ImageUploaderOptions = {
    thumbnailHeight: 200,
    thumbnailWidth: 400,
    autoUpload: true,
    uploadUrl: this.env.apiUrl + 'file',
    allowedImageTypes: ['image/png', 'image/jpeg'],
    maxImageSize: 1
};

  hotelimages: Hotel_Images = {
    Id: null,
    LocationID: null,
    CountryID: null,
    CountryLocationID: null,
    CityID: null,
    CityLocationID: null,
    HotelID: null,
    HotelLocationID: null,
    HotelImages: '',
    ImagesDescription: '',
    LanguageValue: 'EN',
    CreatedOn: null
  };

  hotelimagesNewOption: Hotel_Images = {
    Id: null,
    LocationID: null,
    CountryID: null,
    CountryLocationID: null,
    CityID: null,
    CityLocationID: null,
    HotelID: null,
    HotelLocationID: null,
    HotelImages: '',
    ImagesDescription: '',
    LanguageValue: 'EN',
    CreatedOn: null
  };
  CountryLocationIdPassedToChangeLabel:any = [];
  CityListsInNewOption:any = [];
  CountryListsInNewOption:any = [];
  HotelListsInNewOption:any = [];
  languagesData:any = [];
  languages:any = [];
  term:any;
  Lang= 'EN';
  countryData: any = [];
  image: any = [];
  cityData: any = [];
  hotelData: any = [];
  HotelImageEvent: any = [];
  hotelImagesData: any = [];
  hotelImageDetails: any = [];
  hotelimagedata:any = [];
  dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();

  constructor(private hotelImagesService: HotelImagesService,
              private hotelService: HotelDetailsService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private http: HttpClient,
              private cityImagesService: CityImagesService,
              private cityService: CityDetailsService,
              private countryimagesservice: CountryImagesService,
              private destinationService: DestinationService ) { }

  ngOnInit() {

        /** spinner starts on init */
         this.spinner.show();
        setTimeout(() => {
        /** spinner ends after 5 seconds */
         this.spinner.hide();
         }, 1000);
    
       this.dtOptions = {
         pagingType: 'full_numbers',
         retrieve: true,
         processing: true,
         dom: 'Bfrtip',
         colReorder: true,
        buttons: [
         'colvis',
         'copy',
         'print',
         'excel',
         'csv'
       ],
       select: true,
       searching: false,
       };
       this.displayLanguages();
       this.DisplayCountryOnlyInEnglish();
       this.displayLanguagesOnDataTable();
       this.DisplayHotelImagesAccordingToLang(this.Lang);
       this.image = '';   
}



displayLanguages(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languagesData = data;
});
}


DisplayCountryOnlyInEnglish(){
this.cityService.getCountryListOnlyInEnglish('CountryListOnlyInEnglish')
.subscribe(data => {
this.countryData = data;
this.hotelimages.CountryLocationID = this.countryData.LocationID;
});
}


getCityNameByCountryId(Id){
if(Id !=null){
this.cityImagesService.getCountryLocationIDByCountryID('GetCountryLocationIDByCountryID', Id)
.subscribe(data =>{
this.hotelimages.CountryLocationID = data[0].LocationID;
}); 
this.cityImagesService.getAllCityById(Id, 'CityListById')
.subscribe(data => {   
this.cityData = data;
this.hotelimages.CityLocationID = data[0].LocationID;
});
} else {
this.DisplayCountryOnlyInEnglish();
}
} // in use for country text box in First Modal


getHotelNameByCityId(Id){
if(Id != null){
this. hotelImagesService.getCityLocationIDByCityId('CityLocationIDByCityID', Id)
.subscribe(data => {
this.hotelimages.CityLocationID = data[0].LocationID;
});
this.hotelService.getAllHotelById(Id, 'HotelListById')
.subscribe(data => {
this.hotelData = data;
});
}
} // in use for City text box in First Modal


getHotelLocationIDByHotelID(HotelID){
if(HotelID != null){
this.hotelImagesService.getHotelLocationIDByHotelID('HotelLocationIDByHotelID', HotelID)
.subscribe(data=> {
this.hotelimages.HotelLocationID = data[0].LocationID;
});
}
} //in use for hotel text box in FirstModal



onUpload(file: FileQueueObject) {
const s = Object.assign({} , file.response);
this.HotelImageEvent = JSON.parse(JSON.stringify(s)).body.filename;
this.hotelimages.HotelImages = this.HotelImageEvent;
this.hotelimagesNewOption.HotelImages = this.HotelImageEvent; 
}


getHotelImagesDetail(HotelImages){
this.LanguageTextBox.nativeElement.value = "";
this.countryId.nativeElement.value = "";
this.CountryListsInNewOption = [];
this.CityListsInNewOption = [];
this.HotelListsInNewOption = [];
this.hotelimagesNewOption.LocationID = HotelImages.LocationID;
this.CountryLocationIdPassedToChangeLabel = HotelImages.CountryLocationID;
this.image = this.env.apiUrl + HotelImages.HotelImages;
this.hotelimagesNewOption.HotelImages = HotelImages.HotelImages;
}


getCityByCountry(CountryID){
if(CountryID !=null){
this.cityImagesService.getCityByCountryIDInCityImagesList('CoutryIDInCityImagesList',CountryID)
.subscribe(data =>{
this.CityListsInNewOption = data;
console.log(this.CityListsInNewOption, 'city data');
this.hotelimagesNewOption.CountryLocationID = data[0].CountryLocationID;
});
}
} //for country text box in Second Modal


getCityLocationIDInCityImages(CityID){
if(CityID != null){
this.cityImagesService.getCityLocationIDByCityIDInCityImages('CityLocationIDByCityIDInCityImagesList', CityID)
.subscribe(data => {
this.hotelimagesNewOption.CityLocationID = data [0].LocationID;
});
this.hotelImagesService.getHotelListByCityID('HotelListByCityIDInHotelImages', CityID)
.subscribe(data =>{
this.HotelListsInNewOption =  data;
});
}
} // in use for City Box In Second Modal


getHotelLocationIDByHotelIDInHotemImages(HotelID){
if (HotelID != null){
this.hotelImagesService.getHotelLocationIDByHotelIDInHotelImages('HotelLocationIDByHotelIDInHotelImages', HotelID)
.subscribe(data=> {
this.hotelimagesNewOption.HotelLocationID = data[0].LocationID;
console.log(this.hotelimagesNewOption.HotelLocationID, 'hotel Location Id')
})
}
}


resetAddMoreLangModal(hotelImagesNewOptionForm:NgForm){
  hotelImagesNewOptionForm.reset();  
}


displayLanguagesOnDataTable(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languages = data;
});
}

ChangeLabels(Language){
this.countryimagesservice.getCountryByCountryLocationID('CountryListByCountryLocationID',Language,this.CountryLocationIdPassedToChangeLabel)
.subscribe(data => {
this.CountryListsInNewOption =data;
});
}





DisplayHotelImagesAccordingToLang(Lang){
this.hotelImagesService.getAllHotelImages('HotelImagesList' , Lang)
.subscribe(data => {
this.hotelImagesData = data;
console.log(this.hotelImagesData, '= Hotel Images Data');
this.dtTrigger.next();
});
}




onsubmit(hotelImagesForm:NgForm){
this.hotelImagesService.saveAllAdminData(this.hotelimages, 'SaveHotelImages').subscribe(data => {
this.hotelimages = data;
if (data.insertId === 0 ) {
this.showSuccess('Hotel  Image Uploaded', 'Hotel Data Got Updated'); 
} else {
this.showSuccess('Hotel Image Uploaded', 'Hotel Data Got Saved');
}
hotelImagesForm.reset();
this.image = null;
this.displayLanguagesOnDataTable();
this.DisplayHotelImagesAccordingToLang(this.Lang);
this.dtTrigger.next();
},
(err) => {
console.log(err);
});
}


saveHotelImagesNewOption(hotelImagesNewOptionForm:NgForm){
console.log(this.hotelimagesNewOption , 'Hotel Data;');
this.hotelImagesService.saveAllAdminData(this.hotelimagesNewOption, 'SaveHotelImagesNewOption').subscribe(data => {
this.hotelimagesNewOption = data;
if (data.insertId === 0 ) {
this.showSuccess('Hotel  Image New Option Uploaded', 'Hotel New Option Data Got Updated'); 
} else {
this.showSuccess('Hotel Image New Option Uploaded', 'Hotel New Option Data Got Saved');
}
hotelImagesNewOptionForm.reset();
this.image = null;
this.displayLanguagesOnDataTable();
this.DisplayHotelImagesAccordingToLang(this.Lang);
this.dtTrigger.next();
},
(err) => {
console.log(err);
});
}



editHotelImages(Hotel) {
this.hotelimages = Object.assign({}, Hotel);
this.image = this.env.apiUrl + this.hotelimages.HotelImages;
this.hotelService.getAllCountryByCountryId('CountryListInHotelDetailsByCountryId', Hotel.CountryID)
.subscribe(data => {
this.countryData = data;
this.hotelimages.CountryLocationID = data[0].LocationID
});
this.hotelService.getAllCityById(this.hotelimages.CountryID, 'CityListById')
.subscribe(data => {
this.cityData = data;
this.hotelimages.CityLocationID = data[0].LocationID
});
this.hotelService.getAllHotelById(this.hotelimages.CityID, 'HotelListById')
.subscribe(data => {
this.hotelData = data;
this.hotelimages.HotelLocationID = data[0].LocationID;
}); 
}

editHotelImagesNewOption(Hotel){
console.log(Hotel,'Hotel New Data Option');
this.hotelimagesNewOption = Object.assign({}, Hotel);
this.hotelimagesNewOption.LocationID = Hotel.LocationID;
this.image = this.env.apiUrl + this.hotelimagesNewOption.HotelImages;
this.hotelService.getAllCountryByCountryId('CountryListInHotelDetailsByCountryId', Hotel.CountryID)
.subscribe(data => {
this.CountryListsInNewOption = data;
this.hotelimagesNewOption.CountryLocationID = data[0].LocationID
});
this.hotelService.getAllCityById(this.hotelimagesNewOption.CountryID, 'CityListById')
.subscribe(data => {
this.CityListsInNewOption = data;
this.hotelimagesNewOption.CityLocationID = data[0].LocationID
});
this.hotelService.getAllHotelById(this.hotelimagesNewOption.CityID, 'HotelListById')
.subscribe(data => {
this.HotelListsInNewOption = data;
this.hotelimagesNewOption.HotelLocationID = data[0].LocationID;
}); 
}


resetData(hotelImagesForm: NgForm){
hotelImagesForm.reset();
this.hotelimages = {
Id: null,
LocationID: null,
CountryID: null,
CountryLocationID: null,
CityID: null,
CityLocationID: null,
HotelID: null,
HotelLocationID:null,
HotelImages: '',
ImagesDescription: '',
LanguageValue: 'EN',
CreatedOn: null
};  
}

sendHotelImagesDetailsToModalPopUp(Hotel){
  this.hotelImageDetails= Hotel;
}

deleteHotelImages(Hotel){
  this.hotelImagesService.deleteHotelImages(Hotel.Id , 'DeleteHotelImages').subscribe(data => {
    this.displayLanguagesOnDataTable();
    this.DisplayHotelImagesAccordingToLang(this.Lang);
     this.showSuccess('Hotel Image Deleted', 'Hotel Image Data Got Deleted');
    });
 }




showSuccess(display, Message) {
  this.toastr.success(display , Message );
}
showFailure(display, Message) {
  this.toastr.error(display , Message );
}
}
// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
