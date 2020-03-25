// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________|  
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DestinationService } from 'src/app/services/destination.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from '@angular/forms';
import { Country } from 'src/app/models/country.model';
import {CountryService} from 'src/app/services/country.service';
import { ToastrService } from 'ngx-toastr';
import { DestinationImagesService } from 'src/app/services/destination-images.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  @ViewChild('DestinationTextBox')
  DestinationTextBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  term:any;
  label = 'English';
  Lang = 'EN';
  country: Country = {
    Id: null,
    LocationID: null,
    DestinationID:null,
    DestinationLocationID: null,
    CountryName: '',
    HomeTitle: '',
    HomeDescription: '',
    Longitude: '',
    Latitude: '',
    LanguageValue: 'EN',
    CreatedOn: null
  };
  countryOption = {
    Id: null,
    LocationID: null,
    DestinationID:null,
    DestinationLocationID: null,
    CountryName: '',
    HomeTitle: '',
    HomeDescription: '',
    Longitude: '',
    Latitude: '',
    LanguageValue: '',
    CreatedOn: null
  }
  DestinationLocationIDToPassOnChangeLabel:any;
  DestinationLocationIDData:any;
  DestnLocationID:any = [];
  Locationid:any;
  countryDetails: any = [];
  languagesData:any = [];
  languages:any = [];
  countryData = [];
  destinationDataFromDestination = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private destinationService: DestinationService,
              private destinationImageService: DestinationImagesService,
              private spinner: NgxSpinnerService,
              private countryservice: CountryService,
              private toastr: ToastrService,) { }

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
    this.DisplayDestinationOnlyInEnglish();
    this.DisplayCountryAccordingToLang(this.Lang);
    this.displayLanguagesOnDataTable();
    this.displayLanguages();
  }



  displayLanguagesOnDataTable(){
    this.destinationService.getAllLanguages('LanguagesList')
    .subscribe(data => {
     this.languages = data;
     this.dtTrigger.next();
         });
  }
  displayLanguages(){
    this.countryservice.getAllLanguages('LanguagesList')
    .subscribe(data => {
     this.languagesData = data;
    //  console.log(this.languagesData, '=languages Data');
         });
}

DisplayDestinationOnlyInEnglish(){
  this.countryservice.getAllDestination('DestinationListOnlyInEnglish', 'EN')
  .subscribe(data => {
  this.destinationDataFromDestination = data;
  // console.log(this.destinationDataFromDestination, 'destination Data');
  });
}

ChangeLabels(Language){
  console.log(this.DestinationLocationIDToPassOnChangeLabel,'DestinationLocationID');
  // this.label = this.languagesData.find(x => x.LanguageValue === Language.toString()).LanguageName;
  this.countryservice.getDestinationByDestinationLocationID('DestinationListByDestinationLocationID',Language,this.DestinationLocationIDToPassOnChangeLabel)
  .subscribe(data => {
    this.DestnLocationID = data;
    // console.log(this.DestnLocationID, 'DestinationLocationID');
  });
 
}

getCountryDetail(Country){
  this.LanguageTextBox.nativeElement.value="";
  this.DestnLocationID = [];
  this.countryOption.LocationID = Country.LocationID;
  this.countryOption.Latitude = Country.Latitude;
  this.countryOption.Longitude = Country.Longitude;
  this.countryOption.DestinationLocationID = Country.DestinationLocationID;
  this.DestinationLocationIDToPassOnChangeLabel = Country.DestinationLocationID;

  }


DisplayCountryAccordingToLang(Lang){
  this.countryservice.getAllCountry('CountryList' , Lang)
  .subscribe(data => {
   this.countryData = data;
   this.dtTrigger.next();
  });
  }

   saveCountry(countryForm: NgForm): void{
    this.countryservice.saveAllAdminData(this.country, 'SaveCountry').subscribe(data => {
      this.country = data;
      if (data.insertId === 0 ) {
        this.showSuccess('Country Updated', 'Country Data Got Updated');

      } else {
        this.showSuccess('Country Added', 'Country Data Got Saved');
      }
      countryForm.reset();
      this.displayLanguagesOnDataTable();
      this. DisplayCountryAccordingToLang(this.Lang);
      this.dtTrigger.next();
   
    }, (err) => {
      console.log(err);
    });

  }

  saveNewCountryOption(countryNewOptionForm:NgForm){
    console.log(this.countryOption, 'Country New Option Data');
    this.countryservice.saveAllAdminData(this.countryOption, 'SaveNewCountryOption').subscribe(data => {
    this.countryOption = data;
    if (data.insertId === 0 ) {
    this.showSuccess('Country New Option With Language Updated', 'Country New Option With Language Data Got Updated');
    } else {
    this.showSuccess('Country New Option With Language Added', 'Country New Option With Language Data Got Saved');
    }
      countryNewOptionForm.reset();
      this.displayLanguagesOnDataTable();
      this. DisplayCountryAccordingToLang(this.Lang);
      this.dtTrigger.next();  
    }, (err) => {
      console.log(err);
    });
  }



  editCountry(Country) {
  this.country = Object.assign({}, Country);
  this.country.LanguageValue = Country.LanguageValue;
  }

  editCountryNewOption(Country){
  console.log(Country, 'CountryData');
  this.countryOption = Object.assign({}, Country);
  this.DestinationLocationIDToPassOnChangeLabel = Country.DestinationLocationID;
  this.countryservice.getDestinationByDestinationLocationID('DestinationListByDestinationLocationID',Country.LanguageValue,this.DestinationLocationIDToPassOnChangeLabel)
  .subscribe(data => {
    this.DestnLocationID = data;
  });
  }


  onChange(Destination){
    if(Destination !== null){
      this.destinationImageService.getDestinationLocationId('GetDestinationLocationID', Destination)
      .subscribe(data =>{
      this.DestinationLocationIDData = data;
      this.Locationid= JSON.stringify(this.DestinationLocationIDData[0].LocationID);
      console.log(this.Locationid, 'Destination Location ID');
      this.country.DestinationLocationID = this.Locationid;
      });  
    }
  }

  resetDataNew(countryForm: NgForm){
    countryForm.reset();
    this.DestinationTextBox.nativeElement.value = "";
    this.LanguageTextBox.nativeElement.value="";
    this.country= {
      Id: null,
      LocationID: null,
      DestinationID:null,
      DestinationLocationID: null,
      CountryName: '',
      HomeTitle: '',
      HomeDescription: '',
      Longitude: '',
      Latitude: '',
      LanguageValue: 'EN',
      CreatedOn: null
    };

  }

  resetData(countryNewOptionForm:NgForm){
    this.LanguageTextBox.nativeElement.value = "";
    this.DestinationTextBox.nativeElement.value = '';
    countryNewOptionForm.reset();
  }
  
  sendCountryDetailsToModalPopUp(Country) {
    console.log(Country, 'modal pop up data');
    this.countryDetails= Country
    
  }

  deleteCountry(Country) {
    this.countryservice.deleteCountry(Country.Id , 'DeleteCountry').subscribe(data => {
    this.displayLanguagesOnDataTable();
    this. DisplayCountryAccordingToLang(this.Lang);  
    this.showSuccess('Country Deleted', 'Country Data Got Deleted');

   });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
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
