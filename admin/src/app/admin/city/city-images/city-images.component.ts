// |________________________________________________
// | © 2020 Navient Pvt.Ltd All Rights Reserved    |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________|  
import { Component, OnInit, ElementRef } from '@angular/core';
import { City_Images } from 'src/app/models/city-images.model';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { CityImagesService } from 'src/app/services/city-images.service';
import { CountryService } from 'src/app/services/country.service';
import {CityDetailsService} from 'src/app/services/city-details.service';
import { ViewChild } from '@angular/core';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { DestinationService } from 'src/app/services/destination.service';
import { CountryImagesService } from 'src/app/services/country-images.service';

@Component({
  selector: 'app-city-images',
  templateUrl: './city-images.component.html',
  styleUrls: ['./city-images.component.css']
})
export class CityImagesComponent implements OnInit {
@ViewChild('countryTextBox')
countryTextBox: ElementRef;
@ViewChild('citytextbox')
citytextbox: ElementRef;
@ViewChild('LanguageTextBox')
LanguageTextBox: ElementRef;
  env = environment;
  private url = this.env.apiUrl + 'file';
  label = 'English';
  Lang = 'EN';
  term:any;
  options: ImageUploaderOptions = {
  thumbnailHeight: 200,
  thumbnailWidth: 400,
  thumbnailResizeMode: 'fill',
  resizeOnLoad: true,
  autoUpload: true,
  uploadUrl: this.env.apiUrl + 'file',
  allowedImageTypes: ['image/png', 'image/jpeg'],
  maxImageSize: 3
};

cityimages: City_Images= {
  Id: null,
  LocationID:null,
  CountryID: null,
  CountryLocationID: null,
  CityID:null,
  CityLocationID: null,
  CityImages: '',
  ImagesDescription: '',
  LanguageValue: 'EN',
  CreatedOn: null
};

cityimagesOption: City_Images= {
  Id: null,
  LocationID:null,
  CountryID: null,
  CountryLocationID: null,
  CityID:null,
  CityLocationID: null,
  CityImages: '',
  ImagesDescription: '',
  LanguageValue: '',
  CreatedOn: null
};
CityListsInNewOption:any = [];
Locationid:any;
CountryLocationIdPassedToChangeLabel:any;
CountryLocationIDFromCountry:any;
CountryListsInNewOption:any;
languagesData:any = [];
languages:any = [];
CityImageEvent: any = [];
cityData: any = [];
cityImagesData: any [];
image: any = [];
countryData: any = [];
cityImageDetails: any = [];
dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();
constructor(private http: HttpClient,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private cityImagesService: CityImagesService,
              private countryservice: CountryService,
              private countryimagesservice: CountryImagesService,
              private cityService: CityDetailsService,
              private destinationService: DestinationService ) { }

ngOnInit() {
             this.spinner.show();
             setTimeout(() => {
               this.spinner.hide();
             }, 1000);    
             this.dtOptions = {
              pagingType: 'full_numbers',
              retrieve: true,
              processing: true,
              dom: 'Bfrtip',
              colReorder: true,
              searching: false,
             buttons: [
              'colvis',
              'copy',
              'print',
              'excel',
              'csv'
            ],
            select: true, 
            };
            this.displayLanguages();
            this.DisplayCountryOnlyInEnglish();
            this.displayLanguagesOnDataTable();
            this.DisplayCityImagesAccordingToLang(this.Lang);
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
this.cityimages.CountryLocationID = this.countryData.LocationID;
});
}


getCityNameByCountryId(Id){ 
if(Id !=null){
this.cityImagesService.getCountryLocationIDByCountryID('GetCountryLocationIDByCountryID', Id)
.subscribe(data =>{
this.cityimages.CountryLocationID = data[0].LocationID;
}); 
this.cityImagesService.getAllCityById(Id, 'CityListById')
.subscribe(data => {   
this.cityData = data;
this.cityimages.CityLocationID = data[0].LocationID
});
} else {
this.DisplayCountryOnlyInEnglish();
}
}


getCityLocationIDByCityID(CityID){
if(CityID !=null){
this.cityImagesService.getCityLocationIDByCityID('CityLocationIDByCityID',CityID)
.subscribe(data => {
this.cityimages.CityLocationID = data[0].LocationID;
});
}
}

displayLanguagesOnDataTable(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languages = data;
});
}


DisplayCityImagesAccordingToLang(Lang){
this.cityImagesService.getAllCityImages('CityImagesList' , Lang)
.subscribe(data => {
this.cityImagesData = data;
this.cityimages.CountryLocationID = data[0].LocationID;
this.dtTrigger.next();
});
}


getCityImagesDetail(CityImages){
this.countryTextBox.nativeElement.value = "";
this.citytextbox.nativeElement.value = "";
this.LanguageTextBox.nativeElement.value = "";
this.CountryListsInNewOption = [];
this.CityListsInNewOption = [];
this.cityimagesOption.CityImages = CityImages.CityImages
this.cityimagesOption.LocationID = CityImages.LocationID;
this.CountryLocationIdPassedToChangeLabel = CityImages.CountryLocationID;
this.image = this.env.apiUrl + CityImages.CityImages;
this.cityimagesOption.CountryLocationID = CityImages.CountryLocationID;
this.cityimagesOption.CityLocationID =CityImages.CityLocationID;
}


ChangeLabels(Language){
this.countryimagesservice.getCountryByCountryLocationID('CountryListByCountryLocationID',Language,this.CountryLocationIdPassedToChangeLabel)
.subscribe(data => {
this.CountryListsInNewOption =data;
});
}


getCityByCountry(CountryID){
if(CountryID !=null){
this.cityImagesService.getCityByCountryIDInCityImagesList('CoutryIDInCityImagesList',CountryID)
.subscribe(data =>{
this.CityListsInNewOption = data;
this.cityimagesOption.CountryLocationID = data[0].CountryLocationID;
});
}
}


getCityLocationIDInCityImages(CityID){
if(CityID != null){
this.cityImagesService.getCityLocationIDByCityIDInCityImages('CityLocationIDByCityIDInCityImagesList', CityID)
.subscribe(data => {
this.cityimagesOption.CityLocationID = data [0].LocationID;
});
}
}



resetAddmoreLanguageForm(cityImageNewOption:NgForm){
cityImageNewOption.reset();
this.countryTextBox.nativeElement.value = "";
this.citytextbox.nativeElement.value = "";
this.LanguageTextBox.nativeElement.value = "";
}


resetTheData(cityImageNewOption:NgForm){
cityImageNewOption.reset();
}



onUpload(file: FileQueueObject) {
const s = Object.assign({} , file.response)
this.CityImageEvent = JSON.parse(JSON.stringify(s)).body.filename;
this.cityimages.CityImages = this.CityImageEvent;
this.cityimagesOption.CityImages = this.CityImageEvent; 
}


onsubmit(cityImagesForm:NgForm){
console.log(this.cityimages, 'City Images Data');
this.cityImagesService.saveAllAdminData(this.cityimages, 'SaveCityImages').subscribe(data => {
this.cityimages = data;
if (data.insertId === 0 ) {
this.showSuccess('City  Image Uploaded', 'City Data Got Updated'); 
} else {
this.showSuccess('City Image Uploaded', 'City Data Got Saved');
}
cityImagesForm.reset();
this.image = null;
this.displayLanguagesOnDataTable();
this.DisplayCityImagesAccordingToLang(this.Lang);
this.dtTrigger.next();
},
(err) => {
console.log(err);
});
}


SaveCityImagesNewOption(cityImageNewOption:NgForm){
console.log(this.cityimagesOption, 'save City New Option Images List');
this.cityImagesService.saveAllAdminData(this.cityimagesOption, 'SaveCityImages').subscribe(data => {
this.cityimagesOption = data;
if (data.insertId === 0 ) {
this.showSuccess('City  Image Uploaded', 'City Data Got Updated'); 
} else {
this.showSuccess('City Image Uploaded', 'City Data Got Saved');
}
cityImageNewOption.reset();
this.image = null;
this.displayLanguagesOnDataTable();
this.DisplayCityImagesAccordingToLang(this.Lang);
this.dtTrigger.next();
},
(err) => {
console.log(err);
});
}


editCityImages(City) { 
this.cityimages = Object.assign({}, City);
this.cityImagesService.getAllCountryInCityImagesByCountryId('CountryListInCityImagesByCountryId', City.CountryID)
.subscribe(data => {
this.countryData = data;
console.log(this.countryData, 'Country Data');
this.cityimages.CountryLocationID= data[0].LocationID;
console.log(this.cityimages.CountryLocationID , 'country LocationID');
});
this.image = this.env.apiUrl + this.cityimages.CityImages;
this.cityimages.CityImages = City.CityImages;
this.cityImagesService.getAllCityById(this.cityimages.CountryID, 'CityListById')
.subscribe(data => {
this.cityData = data;
this.cityimages.CityLocationID = data[0].LocationID;
});
}


editCityImagesNewOption(City){
console.log(City, 'City Data');
this.cityimagesOption = Object.assign({}, City);
this.cityImagesService.getAllCountryInCityImagesByCountryId('CountryListInCityImagesByCountryId', City.CountryID)
.subscribe(data => {
this.CountryListsInNewOption = data;
this.cityimagesOption.CountryLocationID = data[0].LocationID;
});
this.image = this.env.apiUrl + this.cityimagesOption.CityImages;
this.cityimagesOption.CityImages = City.CityImages;
this.cityImagesService.getAllCityById(this.cityimagesOption.CountryID, 'CityListById')
.subscribe(data => {
this.CityListsInNewOption = data;
this.cityimagesOption.CityLocationID = data[0].LocationID;
});
}


resetData(cityImagesForm: NgForm){
cityImagesForm.reset();
this.countryTextBox.nativeElement.value = "";
this.citytextbox.nativeElement.value = "";
this.cityimages= {
Id: null,
LocationID:null,
CountryID: null,
CountryLocationID: null,
CityID:null,
CityLocationID: null,
CityImages: '',
ImagesDescription: '',
LanguageValue: 'EN',
CreatedOn: null
}
this.countryData = [];
this.cityData = [];
}


sendCityImagesDetailsToModalPopUp(City){
this.cityImageDetails= City
}


deleteCityImages(City){
this.cityImagesService.deleteCityImages(City.Id , 'DeleteCityImages').subscribe(data => {
this.displayLanguagesOnDataTable();
this.DisplayCityImagesAccordingToLang(this.Lang);
this.showSuccess('City Image Deleted', 'City Image Data Got Deleted');
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
// | © 2019 Navient Pvt.Ltd All Rights Reserved    |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________|  
