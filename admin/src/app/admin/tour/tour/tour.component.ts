// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Tour } from 'src/app/models/tour.model';
import { CountryService } from 'src/app/services/country.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { TourPackagesService } from 'src/app/services/tour-packages.service';
import { PriceCategoryService } from 'src/app/services/price-category.service';
import { CityDetailsService } from 'src/app/services/city-details.service';
import { TourProgramService } from 'src/app/services/tour-program.service';
import { NgForm } from '@angular/forms';
import {TourService} from 'src/app/services/tour.service';
import { DestinationService } from 'src/app/services/destination.service';


@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  @ViewChild('CountryTextBox')
  CountryTextBox: ElementRef;
  @ViewChild('CityTextBox')
  CityTextBox: ElementRef;
  @ViewChild('TourPackageBox')
  TourPackageBox: ElementRef;
  @ViewChild('PriceCategoryTextBox')
  PriceCategoryTextBox: ElementRef;
  @ViewChild('TourProgramTextBox')
  TourProgramTextBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  Lang = 'EN';
  term:any;
  tour: Tour = {
    Id: null,
    LocationID: null,
    CountryID: null,
    CountryLocationID: null,
    TourProgramID: null,
    TourProgramLocationID: null,
    TourPackageID: null,
    TourPackageLocationID: null,
    CityID: null,
    CityLocationID: null,
    TourTitle: '',
    TourLocation: '',
    TourDescription: '',
    SeasonStartDate: '',
    SeasonEndDate: '',
    DurationInDays: null,
    DurationInNights: null, 
    FrontPage: false,
    FlightIncluded: false,
    LanguageValue: 'EN',
    CreatedOn: null
  };
  tourNewOption: Tour = {
    Id: null,
    LocationID: null,
    CountryID: null,
    CountryLocationID: null,
    TourProgramID: null,
    TourProgramLocationID: null,
    TourPackageID: null,
    TourPackageLocationID: null,
    CityID: null,
    CityLocationID: null,
    TourTitle: '',
    TourLocation: '',
    TourDescription: '',
    SeasonStartDate: '',
    SeasonEndDate: '',
    DurationInDays: null,
    DurationInNights: null, 
    FrontPage: false,
    FlightIncluded: false,
    LanguageValue: '',
    CreatedOn: null
  };
  CountryListData:any = [];
  LanguagePassed:any;
  CountryLocationIdPassedToChangeLabel:any = [];
  CountryLocationIDData:any = [];
  Locationid:any;
  cityLocationid:any;
  tourpackagelocationid:any;
  tourprogramlocationid:any;
  languagesData: any = [];
  languages:any = [];
  countryData:any = [];
  CityLocationIDData: any = [];
  tourPackagesData: any = [];
  priceCategoryData: any = [];
  cityData: any = [];
  tourProgramData: any = [];
  tourDetails: any = [];
  CheckBoxValue: any;
  tourData: any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private countryservice: CountryService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private tourPackagesService: TourPackagesService,
              private priceCategoryService: PriceCategoryService,
              private cityService: CityDetailsService,
              private tourProgramService: TourProgramService,
              private tourService: TourService,
              private destinationService: DestinationService) { }

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
        searching:false,
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
       this.DisplayTourPackagesOnlyInEnglish();
       this.DisplayTourProgramOnlyInEnglish();
       this.displayLanguagesOnDataTable();
       this.DisplayTourAccordingToLang(this.Lang);
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
});
}


GetCountryLocationIDInFirstModal(CountryID){
if(CountryID != null){
this.tourService.getCountryDetailsByCountryId('CountryDetailsByCountryID',CountryID)
.subscribe(data =>{
this.CountryLocationIDData = data;
this.Locationid= JSON.stringify(this.CountryLocationIDData[0].LocationID);
this.tour.CountryLocationID = this.Locationid;
this.tourNewOption.CountryLocationID =this.Locationid;
});
this.tourService.getCityByCountryID('GetCityByCountryID', CountryID)
.subscribe(data => {
this.cityData = data;
});
}
}


GetCityLocationIDByCityIDInFirstModal(CityID){
if(CityID != null){
this.tourService.getCityDetailsByCityID('GetCityDetailsByByCityID',CityID)
.subscribe(data=>{
this.CityLocationIDData = data;
this.cityLocationid= JSON.stringify(this.CityLocationIDData[0].LocationID);
this.tour.CityLocationID = this.cityLocationid;
this.tourNewOption.CityLocationID = this.cityLocationid;
});
}
}


DisplayTourPackagesOnlyInEnglish(){
this.tourService.getAllTourPackagesOnlyInEnglishInTours('TourPackagesListOnlyInEnglishInTours', 'EN')
.subscribe(data => {
this.tourPackagesData = data;
});
}


DisplayTourProgramOnlyInEnglish(){
this.tourService.getAllTourProgramOnlyInEnglish('TourProgramListInEnglishInTour', 'EN')
.subscribe(data => {
this.tourProgramData = data;
});
}


GetTourPackagesLocationIDByTourPackageID(TourPackageID){
if(TourPackageID != null){
this.tourService.FindTourPackageLocationIDByPackageID('FindTourPackageLocationIDByPackageID', TourPackageID)
.subscribe(data => {
this.tourpackagelocationid = JSON.stringify(data[0].LocationID);
this.tour.TourPackageLocationID = this.tourpackagelocationid;
this.tourNewOption.TourPackageLocationID = this.tourpackagelocationid;
});
}
}



GetTourProgramLocationIDByTourProgramID(TourProgramID){
if(TourProgramID != null){
this.tourService.FindTourProgramLocationIDByTourProgramID('FindTourProgramLocationIDByTourProgramID', TourProgramID)
.subscribe(data => {
this.tourprogramlocationid = JSON.stringify(data[0].LocationID);
this.tour.TourProgramLocationID = this.tourprogramlocationid;
this.tourNewOption.TourProgramLocationID = this.tourprogramlocationid;
});
}
}



displayLanguagesOnDataTable(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languages = data;
});
}



DisplayTourAccordingToLang(Lang){
this.tourService.getAllTours('TourList' , Lang)
.subscribe(data => {
this.tourData = data;
this.dtTrigger.next();
});
}


GetDetailsOfTour(Tour){
this.CountryTextBox.nativeElement.value= "";
this.LanguageTextBox.nativeElement.value= "";
this.CityTextBox.nativeElement.value = "";
this.CountryListData = [];
this.cityData = [];
this.tourNewOption.LocationID = Tour.LocationID;
this.tourNewOption.TourProgramID =Tour.TourProgramID;
this.tourNewOption.TourProgramLocationID = Tour.TourProgramLocationID;
this.tourNewOption.TourPackageID = Tour.TourPackageID;
this.tourNewOption.TourPackageLocationID = Tour.TourPackageLocationID;
this.tourNewOption.SeasonStartDate = Tour.SeasonStartDate;
this.tourNewOption.SeasonEndDate = Tour.SeasonEndDate;
this.tourNewOption.DurationInDays = Tour.DurationInDays;
this.tourNewOption.DurationInNights = Tour.DurationInNights;
this.tourNewOption.FrontPage = Tour.FrontPage;
this.tourNewOption.FlightIncluded =Tour.FlightIncluded;
this.CountryLocationIdPassedToChangeLabel = Tour.CountryLocationID;
}

ChangeLabels(Language){
this.LanguagePassed = Language
this.tourNewOption.CountryLocationID = this.CountryLocationIdPassedToChangeLabel;
this.tourService.getAllCountryInTourByLanguage('CountryListInTourByLanguage', Language , this.CountryLocationIdPassedToChangeLabel)
.subscribe(data =>{
this.CountryListData = data;
console.log(this.CountryListData, 'Country') ;
});
}


getCityNameByCountryId(Id){    
this.tourService.getAllCityById(Id, 'CityListById')
.subscribe(data => {   
this.cityData = data;
});
}



saveTour(tourForm: NgForm): void{
this.tourService.saveAllAdminData(this.tour, 'SaveTour').subscribe(data => {
this.tour = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour Updated', 'Tour Data Got Updated');
} else {
this.showSuccess('Tour Added', 'Tour Data Got Saved');
}
tourForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}


saveTourNewOption(tourFormNewOption:NgForm){
console.log(this.tourNewOption, '= Tour New Option Data Submission');
this.tourService.saveAllAdminData(this.tourNewOption, 'SaveTourNewOption').subscribe(data => {
this.tourNewOption = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour New Option Updated', 'Tour New Option Data Got Updated');
} else {
this.showSuccess('Tour New Option Added', 'Tour New Option Data Got Saved');
}
tourFormNewOption.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}



editTour(Tour) {
this.tour = Object.assign({}, Tour);
this.tour.LocationID = Tour.LocationID;
this.tour.FlightIncluded = Boolean(Tour.FlightIncluded);
this.tour.FrontPage = Boolean(Tour.FrontPage);
// this.label = this.languagesData.find(x => x.LanguageValue === Tour.LanguageValue.toString()).LanguageName; 
this.tourService.getAllCountryInTourByCountryId('CountryListInTourByCountryId', Tour.CountryID)
.subscribe(data =>{
this.CountryListData = data;
});
this.tourService.getAllTourPackagesInTourByTourPackageId('TourPackagesListInTourByTourPackageId' , Tour.TourPackageID)
.subscribe(data => {
this.tourPackagesData = data;
this.DisplayTourPackagesOnlyInEnglish();
});
this.tourService.getAllTourProgramInTourByTourProgramId('TourProgramListInTourByTourProgramId' ,Tour.TourProgramID)
.subscribe(data => {
this.tourProgramData = data;
this.DisplayTourProgramOnlyInEnglish();
});
this.tourService.getAllCityById( this.tour.CountryID, 'CityListById')
.subscribe(data => {   
this.cityData = data;
});
}


editTourNewOption(Tour){
console.log(Tour, 'Tour New Option');
this.tourNewOption = Object.assign({},Tour);
this.tourNewOption.FlightIncluded = Boolean(Tour.FlightIncluded);
this.tourNewOption.FrontPage = Boolean(Tour.FrontPage);
this.tourNewOption.LocationID = Tour.LocationID;
this.tourService.getAllCountryInTourByCountryId('CountryListInTourByCountryId', Tour.CountryID)
.subscribe(data =>{
this.CountryListData = data;
});
this.tourService.getAllTourPackagesInTourByTourPackageId('TourPackagesListInTourByTourPackageId' , Tour.TourPackageID)
.subscribe(data => {
this.tourPackagesData = data;
this.DisplayTourPackagesOnlyInEnglish();
});
this.tourService.getAllTourProgramInTourByTourProgramId('TourProgramListInTourByTourProgramId' ,Tour.TourProgramID)
.subscribe(data => {
this.tourProgramData = data;
this.DisplayTourProgramOnlyInEnglish();
});
this.tourService.getAllCityById( Tour.CountryID, 'CityListById')
.subscribe(data => {   
this.cityData = data;
console.log(this.cityData, 'City Data after Edit');
});
}


resetData(tourForm: NgForm){
tourForm.reset();
this.tour = {
Id: null,
LocationID: null,
CountryID: null,
CountryLocationID: null,
TourProgramID: null,
TourProgramLocationID: null,
TourPackageID: null,
TourPackageLocationID: null,
CityID: null,
CityLocationID: null,
TourTitle: '',
TourLocation: '',
TourDescription: '',
SeasonStartDate: '',
SeasonEndDate: '',
DurationInDays: null,
DurationInNights: null, 
FrontPage: false,
FlightIncluded: false,
LanguageValue: 'EN',
CreatedOn: null
};
}


resetTourNewOptionForm(tourFormNewOption:NgForm){
tourFormNewOption.reset();
this.CountryTextBox.nativeElement.value= "";
this.LanguageTextBox.nativeElement.value= "";
this.CityTextBox.nativeElement.value = "";
}


sendTourDetailsToModalPopUp(Tour) {
this.tourDetails= Tour 
}


deleteTour(Tour) {
this.tourService.deleteTours(Tour.Id , 'DeleteTour').subscribe(data => {
this.displayLanguagesOnDataTable();
this.DisplayTourAccordingToLang(this.Lang);
this.dtTrigger.next();
this.showSuccess('Tour Deleted', 'Tour Data Got Deleted');
});
}

ngOnDestroy(): void {
this.dtTrigger.unsubscribe();
}

showSuccess(display, Message) {
this.toastr.success(display , Message );
} 

}

// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

