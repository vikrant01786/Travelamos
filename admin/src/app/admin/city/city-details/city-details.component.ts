// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________|  
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { NgForm } from '@angular/forms';
import { City_Details } from 'src/app/models/city-details.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import {CityDetailsService} from 'src/app/services/city-details.service';
import { DestinationService } from 'src/app/services/destination.service';
import { CountryImagesService } from 'src/app/services/country-images.service';


@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit {
@ViewChild('CountryTextBox')
CountryTextBox: ElementRef;
@ViewChild('LanguageTextBox')
LanguageTextBox: ElementRef;
label='English';
Lang= 'EN';
languages:any = [];
term:any;
city: City_Details = {
  Id: null,
  LocationID:null,
  CountryLocationID: null,
  CountryID: null,
  CityName: '',
  HomeTitle: '',
  HomeDescription: '',
  LanguageValue: 'EN',
  CreatedOn: null
};
cityOption = {
  Id: null,
  LocationID:null,
  CountryLocationID: null,
  CountryID: null,
  CityName: '',
  HomeTitle: '',
  HomeDescription: '',
  LanguageValue: 'EN',
  CreatedOn: null
}
CountryLocationIdPassedToChangeLabel:any = [];
CountryLocationIDData:any = [];
CountryListsInNewOption:any = [];
Locationid:any;
languagesData:any = [];
countryData:any = [];
cityData: any = [];
cityDetails: any = [];
dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();

constructor(private countryservice: CountryService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private countryimagesservice: CountryImagesService,
              private cityService: CityDetailsService,
              private destinationService: DestinationService) { }

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
       this.DisplayCountryListInEnglishOnly();
       this.displayLanguagesOnDataTable();
       this.DisplayCityAccordingToLang(this.Lang);
  }

  displayLanguages(){
    this.destinationService.getAllLanguages('LanguagesList')
    .subscribe(data => {
     this.languagesData = data;
         });
}


DisplayCountryListInEnglishOnly(){
  this.cityService.getCountryListOnlyInEnglish('CountryListOnlyInEnglish')
  .subscribe(data => {
    this.countryData = data;
    // console.log(this.countryData, 'Country Data');
  });
}



// displayCountry(){
//     this.cityService.getAllCountry('CountryListInCityDetails')
//     .subscribe(data => {
//      this.countryData = data;
//          });
// }

displayLanguagesOnDataTable(){
  this.cityService.getAllLanguagesInCityDetails('LanguagesListInCityDetails')
  .subscribe(data => {
   this.languages = data;
  //  console.log(this.languages, 'Lang');
       });
}

onChange(CountryId){
  // console.log(CountryId ,'country ID')
  if(CountryId != null){;
    this.countryimagesservice.getCountryDetailsByCountryId('CountryDetailsByCountryID',CountryId)
    .subscribe(data =>{
    this.CountryLocationIDData = data;
    this.Locationid= JSON.stringify(this.CountryLocationIDData[0].LocationID);
    // console.log(this.Locationid, 'location id Of Country')
    this.city.CountryLocationID = this.Locationid;
    });
    }
}

getCityDetail(City){
  console.log(City, 'City Details')
  this.CountryTextBox.nativeElement.value= "";
  this.CountryListsInNewOption = [];
  this.LanguageTextBox.nativeElement.value= "";
  this.cityOption.LocationID = City.LocationID;
  this.CountryLocationIdPassedToChangeLabel = City.CountryLocationID;
  this.cityOption.CountryLocationID = City.CountryLocationID;
;
}

ChangeLabels(Language){
this.cityOption.CountryLocationID = this.CountryLocationIdPassedToChangeLabel;
this.countryimagesservice.getCountryByCountryLocationID('CountryListByCountryLocationID',Language,this.CountryLocationIdPassedToChangeLabel)
.subscribe(data => {
this.CountryListsInNewOption =data;
console.log(this.CountryListsInNewOption, 'Country option');
});
}


DisplayCityAccordingToLang(Lang){
  this.cityService.getAllCity('CityList', Lang)
  .subscribe(data => {
   this.cityData = data;
   this.dtTrigger.next();
       });
}

saveCity(cityForm: NgForm): void{
  console.log(this.city, '=City Form Submission')
  this.cityService.saveAllAdminData(this.city, 'SaveCity').subscribe(data => {
    this.city = data;
    if (data.insertId === 0 ) {
      this.showSuccess('City Updated', 'City Data Got Updated');

    } else {
      this.showSuccess('City Added', 'City Data Got Saved');
    }
    cityForm.reset();
    this.displayLanguagesOnDataTable();
    this.DisplayCityAccordingToLang(this.Lang);
    this.dtTrigger.next();
  }, (err) => {
    console.log(err);
  });

}

saveCityNewOption(cityNewOptionForm:NgForm){
  console.log(this.cityOption, 'new City Data');
  this.cityService.saveAllAdminData(this.cityOption, 'SaveCityNewOption').subscribe(data => {
    // this.cityOption = data;
    if (data.insertId === 0 ) {
      this.showSuccess('City New Option Updated', 'City New Option Data Got Updated');

    } else {
      this.showSuccess('City New Option Added', 'City New Option Data Got Saved');
    }
    cityNewOptionForm.reset();
    this.displayLanguagesOnDataTable();
    this.DisplayCityAccordingToLang(this.Lang);
    this.dtTrigger.next();
  }, (err) => {
    console.log(err);
  });
}


editCity(City) {
  this.city = Object.assign({}, City);
  this.city.LanguageValue = City.LanguageValue;
  // this.label = this.languagesData.find(x => x.LanguageValue === City.LanguageValue.toString()).LanguageName; 
  // this.cityService.getAllCountryById('CountryListInCityDetailsByCountryId',City.CountryId)
  // .subscribe(data => {
  //  this.countryData = data;
  //      });
}


editCityNewOption(City){
  // console.log(City, 'CityData');
  this.CountryLocationIdPassedToChangeLabel = City.CountryLocationID;
  this.cityOption = Object.assign({},City);
   this.cityService.getCountryByCountryLocationIDAndLanguage('CountryListByCountryLocationIDAndLanguage',City.LanguageValue,this.CountryLocationIdPassedToChangeLabel)
  .subscribe(data => {
   this.CountryListsInNewOption = data;
   console.log(this.CountryListsInNewOption, 'Country');
       });

}

resetData(cityForm: NgForm){
  cityForm.reset();
  this.CountryTextBox.nativeElement.value= "";
  this.LanguageTextBox.nativeElement.value = "";
  // this.countryData = [];
  this.city = {
    Id: null,
    LocationID:null,
    CountryLocationID: null,
    CountryID: null,
    CityName: '',
    HomeTitle: '',
    HomeDescription: '',
    LanguageValue: 'EN',
    CreatedOn: null
  }; 
}

resetNewOption(cityNewOptionForm:NgForm){
  cityNewOptionForm.reset();
  this.CountryTextBox.nativeElement.value= "";
  this.LanguageTextBox.nativeElement.value = "";
}

sendCityDetailsToModalPopUp(City) {
  console.log(City, 'modal pop up data');
  this.cityDetails= City 
}

deleteCity(City) {
  this.cityService.deleteCity(City.Id , 'DeleteCity').subscribe(data => {
  this.displayLanguagesOnDataTable();
  this.DisplayCityAccordingToLang(this.Lang);
  this.showSuccess('City Deleted', 'City Data Got Deleted');
 });
}


showSuccess(display, Message) {
  this.toastr.success(display , Message );
}
}

// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
