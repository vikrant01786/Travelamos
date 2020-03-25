// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from '@angular/forms';
import { Countryimages } from 'src/app/models/countryimages.module';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';
import {CountryImagesService} from 'src/app/services/country-images.service'
import { ViewChild } from '@angular/core';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { DestinationService } from 'src/app/services/destination.service';



@Component({
  selector: 'app-country-images',
  templateUrl: './country-images.component.html',
  styleUrls: ['./country-images.component.css']
})
export class CountryImagesComponent implements OnInit {

  @ViewChild('CountryTextBox')
  CountryTextBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  term:any;
  label = 'English';
  Lang = 'EN';
  languages:any = [];
  env = environment;
  private url= this.env.apiUrl + 'file';
  options: ImageUploaderOptions = {
    thumbnailHeight: 200,
    thumbnailWidth: 400,
    autoUpload: true,
    uploadUrl: this.env.apiUrl + 'file',
    allowedImageTypes: ['image/png', 'image/jpeg'],
    maxImageSize: 3
};
  countryData:any = [];
  countryDataFromDestination: any =[];
  CountryLocationIdPassedToChangeLabel:any = [];
  SetValueOfFile: any = [];
  country: Countryimages = {
    Id: null,
    LocationID: null,
    CountryLocationID: null,
    CountryID: null,
    CountryImage: '',
    ImageDescription: '',
    LanguageValue: 'EN',
    CreatedOn: null   
  };
  countryOption: Countryimages = {
    Id: null,
    LocationID: null,
    CountryLocationID: null,
    CountryID: null,
    CountryImage: '',
    ImageDescription: '',
    LanguageValue: '',
    CreatedOn: null   
  };
  Locationid:any;
  CountryLocationIDData:any = [];
  CountryListsInNewOption: any = [];
  languagesData: any = [];
  CountryImageEvent: any= [];
  countryImagesData: any = [];
  countryImageDetails: any =[];
  image: any = [];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private http: HttpClient,
              private countryservice: CountryService,
              private countryimagesservice: CountryImagesService,
              private destinationService: DestinationService,
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
        this.image = null;
        this.DisplayCountryDataOnlyInEnglish();
        this.displayLanguages();
        this.displayLanguagesOnDataTable();
        this.DisplayCountryImagesAccordingToLang(this.Lang);      
  }

  DisplayCountryDataOnlyInEnglish(){
  this.countryimagesservice.getAllCountryListInCountryImages('CountryListInCountryImages')
  .subscribe(data => {
   this.countryData = data;
   console.log(this.countryData)
  });
  }


  displayLanguagesOnDataTable(){
  this.destinationService.getAllLanguages('LanguagesList')
  .subscribe(data => {
  this.languages = data;
  this.dtTrigger.next();
  });
  }
  

  displayLanguages(){
  this.destinationService.getAllLanguages('LanguagesList')
  .subscribe(data => {
  this.languagesData = data;
  });
  }


onChange(CountryId){
  if(CountryId != null){;
  this.countryimagesservice.getCountryDetailsByCountryId('CountryDetailsByCountryID',CountryId)
  .subscribe(data =>{
  this.CountryLocationIDData = data;
  this.Locationid= JSON.stringify(this.CountryLocationIDData[0].LocationID);
  this.country.CountryLocationID = this.Locationid;
  });
  }
}

getCountryImageDetail(CountryImage){
this.CountryTextBox.nativeElement.value= "";
this.CountryListsInNewOption = [];
this.LanguageTextBox.nativeElement.value= "";
this.countryOption.LocationID = CountryImage.LocationID;
this.CountryLocationIdPassedToChangeLabel = CountryImage.CountryLocationID;
this.countryOption.CountryLocationID = CountryImage.CountryLocationID;
this.image = this.env.apiUrl + CountryImage.CountryImage;
this.countryOption.CountryImage = CountryImage.CountryImage;
}


ChangeLabels(Language){
console.log(Language);
this.countryOption.CountryLocationID = this.CountryLocationIdPassedToChangeLabel;
// this.label = this.languagesData.find(x => x.LanguageValue === Language.toString()).LanguageName;
this.countryimagesservice.getCountryByCountryLocationID('CountryListByCountryLocationID',Language,this.CountryLocationIdPassedToChangeLabel)
.subscribe(data => {
this.CountryListsInNewOption =data;
});
}


DisplayCountryImagesAccordingToLang(Lang){
this.countryimagesservice.getAllCountryImages('CountryImagesList' , Lang)
.subscribe(data => {
this.countryImagesData = data;
this.dtTrigger.next();
});
}


onUpload(file: FileQueueObject) {
const FileResponse = Object.assign({}, file.response)
this.CountryImageEvent = JSON.parse(JSON.stringify(FileResponse)).body.filename;
this.country.CountryImage = this.CountryImageEvent;
this.countryOption.CountryImage = this.CountryImageEvent;
  }


onsubmit(countryImagesForm:NgForm){
  this.countryimagesservice.saveAllAdminData(this.country, 'SaveCountryImages').subscribe(data => {
  this.country = data;
  if (data.insertId === 0 ) {
  this.showSuccess('Country Image Uploaded', 'Country Image Data Got Updated'); 
  } else {
  this.showSuccess('Country Image Uploaded', 'Country Image Data Got Saved');
  }
  countryImagesForm.reset();
  this.image = null;
  this.displayLanguagesOnDataTable();
  this.DisplayCountryImagesAccordingToLang(this.Lang);
  this.dtTrigger.next();
  },
  (err) => {
  console.log(err);
  });
  }




 SaveCountryOption(countryImagesNewOptionForm:NgForm){
   console.log(this.countryOption, 'Country Form Submission')
   this.countryimagesservice.saveAllAdminData(this.countryOption, 'SaveNewCountryImageOption').subscribe(data => {
   this.countryOption = data;
   console.log(data, 'insert id');
   if (data.insertId === 0 ) {
   this.showSuccess('Country New Option Image Uploaded', 'Country New Option Image Data Got Updated'); 
   } else {
   this.showSuccess('Country New Option Image Uploaded', 'Country New Option Image Data Got Saved');
   }
   countryImagesNewOptionForm.reset();
   this.image = null;
   this.CountryTextBox.nativeElement.value = "";
   this.displayLanguagesOnDataTable();
   this.DisplayCountryImagesAccordingToLang(this.Lang);
   this.dtTrigger.next();
   },
  (err) => {
  console.log(err);
  });
  }


editCountryImagesNewOption(Country){
console.log(Country, 'COuntry Data');
this.countryOption = Object.assign({}, Country);
this.image = this.env.apiUrl + Country.CountryImage;
this.countryimagesservice.getCountryByCountryID('CountryListByCountryID', Country.CountryID)
.subscribe(data => {
this.CountryListsInNewOption =data;
console.log(this.CountryListsInNewOption, '= Country  data');
 });
}


  resetData(countryImagesForm: NgForm){
  countryImagesForm.reset();
  this.CountryTextBox.nativeElement.value= "";
  this.countryDataFromDestination = [];
  this.country ={
  Id: null,
  LocationID: null,
  CountryLocationID: null,
  CountryID: null,
  CountryImage: '',
  ImageDescription: '',
  LanguageValue: 'EN',
  CreatedOn: null   
  };   
  }


  editCountryImages(Country) {
  this.country = Object.assign({}, Country);
  // this.label = this.languagesData.find(x => x.LanguageValue === Country.LanguageValue.toString()).LanguageName; 
  this.image = this.env.apiUrl + this.country.CountryImage;
  this.countryimagesservice.getAllCountryListInCountryImagesByCountryId('CountryListInCountryImagesByCountryId',Country.CountryId)
  .subscribe(data => {
  this.countryDataFromDestination = data;
  });     
  }


  sendCountryImagesDetailsToModalPopUp(Country){
  this.countryImageDetails= Country
  }


  deleteCountryImages(Country){
  this.countryimagesservice.deleteCountryImages(Country.Id , 'DeleteCountryImage').subscribe(data => {
  this.displayLanguagesOnDataTable();
  this.DisplayCountryImagesAccordingToLang(this.Lang);
  this.showSuccess('Country Image Deleted', 'Country Image Data Got Deleted');
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
