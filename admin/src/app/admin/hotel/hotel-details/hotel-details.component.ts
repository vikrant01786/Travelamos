// |________________________________________________
// | © 2020 Navient Pvt.Ltd All Rights Reserved    |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hotel_Details } from 'src/app/models/hotel-details.model';
import {HotelDetailsService} from 'src/app/services/hotel-details.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { CountryService } from 'src/app/services/country.service';
import { CityDetailsService } from 'src/app/services/city-details.service';
import { Subject } from 'rxjs';
import { DestinationService } from 'src/app/services/destination.service';
import { CityImagesService } from 'src/app/services/city-images.service';
import { CountryImagesService } from 'src/app/services/country-images.service';


@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  @ViewChild('countryId')
  countryId: ElementRef;
  @ViewChild('CityTextBox')
  CityTextBox: ElementRef;
  label = 'English';
  Lang = 'En';
  languagesData:any = [];
  languages:any = [];
  term:any;
hotel: Hotel_Details = {
  Id: null,
  LocationID: null,
  CountryID: null,
  CountryLocationID: null,
  CityID: null,
  CityLocationID: null,
  HotelName: '',
  HomeTitle: '',
  HomeDescription: '',
  Address: '',
  TelephoneNumber: '',
  WebsiteUrl: '',
  LanguageValue: 'EN',
  CreatedOn: null
};

hotelNewOption: Hotel_Details = {
  Id: null,
  LocationID: null,
  CountryID: null,
  CountryLocationID: null,
  CityID: null,
  CityLocationID: null,
  HotelName: '',
  HomeTitle: '',
  HomeDescription: '',
  Address: '',
  TelephoneNumber: '',
  WebsiteUrl: '',
  LanguageValue: '',
  CreatedOn: null
};
CountryLocationIdPassedToChangeLabel:any = [];
CountryListsInNewOption:any = [];
CityListsInNewOption:any = [];
countryData: any = [];
cityData: any = [];
hotelData: any = [];
hotelDetails: any = [];
dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();


  constructor(private hotelService: HotelDetailsService,
             private spinner: NgxSpinnerService,
             private cityImagesService: CityImagesService,
             private toastr: ToastrService,
             private countryservice: CountryService,
             private countryimagesservice: CountryImagesService,
             private cityService: CityDetailsService,
             private destinationService: DestinationService
             

             ) { }

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
  this.DisplayLanguages();
  this. DisplayCountryOnlyInEnglish();
  this.displayLanguagesOnDataTable();
  this.DisplayHotelDetailsAccordingToLang(this.Lang);
  }



DisplayLanguages(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languagesData = data;
});
}



DisplayCountryOnlyInEnglish(){
this.cityService.getCountryListOnlyInEnglish('CountryListOnlyInEnglish')
.subscribe(data => {
this.countryData = data;
this.hotel.CountryLocationID = this.countryData.LocationID;
});
}


displayLanguagesOnDataTable(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languages = data;
});
}


getCityNameByCountryId(Id){
if(Id !=null){
this.cityImagesService.getCountryLocationIDByCountryID('GetCountryLocationIDByCountryID', Id)
.subscribe(data =>{
this.hotel.CountryLocationID = data[0].LocationID;
}); 
this.cityImagesService.getAllCityById(Id, 'CityListById')
.subscribe(data => {   
this.cityData = data;
this.hotel.CityLocationID = data[0].LocationID
});
} else {
this.DisplayCountryOnlyInEnglish();
}
}

getCityByCountry(CountryID){
if(CountryID !=null){
this.cityImagesService.getCityByCountryIDInCityImagesList('CoutryIDInCityImagesList',CountryID)
.subscribe(data =>{
this.CityListsInNewOption = data;
this.hotelNewOption.CountryLocationID = data[0].CountryLocationID;
});
}
}

getCityLocationIDInCityImages(CityID){
if(CityID != null){
this.cityImagesService.getCityLocationIDByCityIDInCityImages('CityLocationIDByCityIDInCityImagesList', CityID)
.subscribe(data => {
this.hotelNewOption.CityLocationID = data [0].LocationID;
});
}
}

getHotelDetail(Hotel){
this.countryId.nativeElement.value = "";
this.CityTextBox.nativeElement.value = "";
this.LanguageTextBox.nativeElement.value = "";
this.CountryListsInNewOption = [];
this.CityListsInNewOption = [];
this.hotelNewOption.LocationID = Hotel.LocationID;
this.hotelNewOption.TelephoneNumber = Hotel.TelephoneNumber;
this.hotelNewOption.WebsiteUrl = Hotel.WebsiteUrl;
this.CountryLocationIdPassedToChangeLabel = Hotel.CountryLocationID;
}

ChangeLabels(Language){
// this.label = this.languagesData.find(x => x.LanguageValue === Language.toString()).LanguageName;
this.countryimagesservice.getCountryByCountryLocationID('CountryListByCountryLocationID',Language,this.CountryLocationIdPassedToChangeLabel)
.subscribe(data => {
this.CountryListsInNewOption =data;
});
}


DisplayHotelDetailsAccordingToLang(Lang){
this.hotelService.getAllHotel('HotelList' , Lang)
.subscribe(data => {
this.hotelData = data;
this.dtTrigger.next();
});
}




saveHotel(hotelForm: NgForm): void{
this.hotelService.saveAllAdminData(this.hotel, 'SaveHotel').subscribe(data => {
this.hotel = data;
if (data.insertId === 0 ) {
this.showSuccess('Hotel Updated', 'Hotel Data Got Updated');
} else {
this.showSuccess('Hotel Added', 'Hotel Data Got Saved');
}
hotelForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayHotelDetailsAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}


saveHotelNewOption(hotelNewoptionForm:NgForm){
this.hotelService.saveAllAdminData(this.hotelNewOption, 'SaveHotelNewoption')
.subscribe(data=>{
if(data.insertId ===0){
  this.showSuccess('Hotel New Option Updated', 'Hotel New Option Data Got Updated');
}else {
  this.showSuccess('Hotel New Option Added', 'Hotel New Option Data Got Saved');
}
hotelNewoptionForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayHotelDetailsAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err)=>{
  console.log(err);
});
}


editHotel(Hotel) {
this.hotel = Object.assign({}, Hotel);
this.hotelService.getAllCountryByCountryId('CountryListInHotelDetailsByCountryId', Hotel.CountryID)
.subscribe(data => {
this.countryData = data;
this.hotel.CountryLocationID= data[0].LocationID;
});
this.hotelService.getAllCityById(this.hotel.CountryID, 'CityListById')
.subscribe(data => {
this.cityData = data;
this.hotel.CityLocationID = data[0].LocationID;
});
}

editHotelNewOption(Hotel){
this.hotelNewOption= Object.assign({}, Hotel);
this.cityImagesService.getAllCountryInCityImagesByCountryId('CountryListInCityImagesByCountryId', Hotel.CountryID)
.subscribe(data => {
this.CountryListsInNewOption = data;
this.hotelNewOption.CountryLocationID = data[0].LocationID;
});
this.cityImagesService.getAllCityById(this.hotelNewOption.CountryID, 'CityListById')
.subscribe(data => {
this.CityListsInNewOption = data;
this.hotelNewOption.CityLocationID = data[0].LocationID;
});
}
 

resetData(hotelForm: NgForm){
hotelForm.reset();
this.countryId.nativeElement.value = "";
this.CityTextBox.nativeElement.value = "";
this.hotel = {
Id: null,
LocationID: null,
CountryID: null,
CountryLocationID: null,
CityID: null,
CityLocationID: null,
HotelName: '',
HomeTitle: '',
HomeDescription: '',
Address: '',
TelephoneNumber: '',
WebsiteUrl: '',
LanguageValue: 'EN',
CreatedOn: null
};
}

resetAddLanguage(hotelNewoptionForm:NgForm){
this.LanguageTextBox.nativeElement.value = "";
this.countryId.nativeElement.value = "";
this.CityTextBox.nativeElement.value = "";
}

  
sendHotelDetailsToModalPopUp(Hotel) {
this.hotelDetails= Hotel;  
}


deleteHotel(Hotel) {
this.hotelService.deleteHotel(Hotel.Id , 'DeleteHotel').subscribe(data => {
this.displayLanguagesOnDataTable();
this.DisplayHotelDetailsAccordingToLang(this.Lang);
this.showSuccess('Hotel Deleted', 'Hotel Data Got Deleted');
});
}


showSuccess(display, Message) {
this.toastr.success(display , Message );
}
}
// |________________________________________________
// | © 2020 Navient Pvt.Ltd All Rights Reserved    |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
