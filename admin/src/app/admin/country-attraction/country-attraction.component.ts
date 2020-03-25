// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit, ElementRef } from '@angular/core';
import { Countryattractionimages } from 'src/app/models/countryattractionimages.module';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import {CountryAttractionImagesService} from 'src/app/services/country-attraction-images.service'
import { CountryService } from 'src/app/services/country.service';
import { ViewChild } from '@angular/core';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { DestinationService } from 'src/app/services/destination.service';
import { CountryImagesService } from 'src/app/services/country-images.service';

@Component({
  selector: 'app-country-attraction',
  templateUrl: './country-attraction.component.html',
  styleUrls: ['./country-attraction.component.css']
})
export class CountryAttractionComponent implements OnInit {

  @ViewChild('CountryTextBox')
  CountryTextBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  env = environment;
  private url= this.env.apiUrl + 'file';
  label = 'English';
  Lang = 'EN';
  term:any;
  languages: any = [];
  options: ImageUploaderOptions = {
  thumbnailHeight: 200,
  thumbnailWidth: 400,
  autoUpload: true,
  uploadUrl: this.env.apiUrl + 'file',
  allowedImageTypes: ['image/png', 'image/jpeg'],
  maxImageSize: 3
}; 


country: Countryattractionimages= {
AttractionId: null,
LocationID: null,
CountryID: null,
CountryLocationID: null,
AttractionImage: '',
AttractionDescription: '',
AttractionTitle: '',
LanguageValue: 'EN',
CreatedOn: null,
};


countryAttractionNewOption: Countryattractionimages= {
  AttractionId: null,
  LocationID: null,
  CountryID: null,
  CountryLocationID: null,
  AttractionImage: '',
  AttractionDescription: '',
  AttractionTitle: '',
  LanguageValue: '',
  CreatedOn: null,
  };


languagesData: any = [];
CountryAttractionImageEvent:any = [];
CountryLocationIdPassedToChangeLabel: any = [];
CountryLocationIDData:any = [];
CountryAttractionListsInNewOption:any = [];
Locationid:any;
AttractionImageEvent: any = [];
AttractionImagesData: any = [];
AttractionImageDetails: any = [];
countryData: any = [];
image: any = [];
dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();
constructor(private http: HttpClient,
            private toastr: ToastrService,
            private spinner: NgxSpinnerService,
            private AttractionService: CountryAttractionImagesService,
            private countryservice: CountryService,
            private countryimagesservice: CountryImagesService,
            private destinationService: DestinationService,) { }

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

          this.image = null;
          this.displayLanguages();
          this.displayCountryData();
          this.displayLanguagesOnDataTable();
          this.DisplayAttractionImagesAccordingToLang(this.Lang);
  }



displayLanguages(){
 this.destinationService.getAllLanguages('LanguagesList')
 .subscribe(data => {
 this.languagesData = data;
 });
 }


displayCountryData(){
this.AttractionService.getAllCountry('CountryListInAttractionImages')
.subscribe(data => {
this.countryData = data;
});
}


displayLanguagesOnDataTable(){
  this.AttractionService.getAllLanguagesOnDataTablePage('LanguagesList')
  .subscribe(data => {
  this.languages = data;
  });
  }


DisplayAttractionImagesAccordingToLang(Lang){
  this.AttractionService.getAllAttractionImagesAccordingToLang('AttractionImagesList' , Lang)
  .subscribe(data => {
  this.AttractionImagesData = data;
  this.dtTrigger.next();
  });
  }


ChangeLabels(Language){
  this.countryAttractionNewOption.CountryLocationID = this.CountryLocationIdPassedToChangeLabel
  //this.label = this.languagesData.find(x => x.LanguageValue === Language.toString()).LanguageName;
  this.AttractionService.getAllCountryByCountryLocationID('CountryListInAttractionImagesByCountryLocationID' ,Language,this.CountryLocationIdPassedToChangeLabel)
  .subscribe(data => {
  this.CountryAttractionListsInNewOption = data;
  });
  }


onUpload(file: FileQueueObject) {
  const FileResponse = Object.assign({}, file.response)
  this.CountryAttractionImageEvent = JSON.parse(JSON.stringify(FileResponse)).body.filename;
  this.country.AttractionImage = this.CountryAttractionImageEvent;
  this.countryAttractionNewOption.AttractionImage = this.CountryAttractionImageEvent; 
  }


onChange(CountryId){
  if(CountryId != null){
  this.AttractionService.getCountryDetailsByCountryId('CountryDetailsByCountryID',CountryId)
  .subscribe(data =>{
  this.CountryLocationIDData = data;
  this.Locationid= JSON.stringify(this.CountryLocationIDData[0].LocationID);
  this.country.CountryLocationID = this.Locationid;
  });
  }
  }


getCountryAttractionImageDetail(CountryAttraction){
  this.CountryTextBox.nativeElement.value= "";
  this.LanguageTextBox.nativeElement.value= "";
  this.CountryAttractionListsInNewOption = [];
  this.countryAttractionNewOption.LocationID = CountryAttraction.LocationID;
  this.CountryLocationIdPassedToChangeLabel = CountryAttraction.CountryLocationID;
  this.countryAttractionNewOption.CountryLocationID = CountryAttraction.CountryLocationID;
  this.image = this.env.apiUrl + CountryAttraction.AttractionImage;
  this.countryAttractionNewOption.AttractionImage = CountryAttraction.AttractionImage;
  }


onsubmit(AttractionImagesForm:NgForm){
  this.AttractionService.saveAllAdminData(this.country, 'SaveCountryAttractionImages').subscribe(data => {
  this.country = data;
  if (data.insertId === 0 ) {
  this.showSuccess('Country Attraction Image Uploaded', 'Country Image Data Got Updated'); 
  } else {
  this.showSuccess('Country Attraction Image Uploaded', 'Country Image Data Got Saved');
  }
  AttractionImagesForm.reset();
  this.image = null;
  this.displayLanguagesOnDataTable();
  this.DisplayAttractionImagesAccordingToLang(this.Lang);
  this.dtTrigger.next();
  },
  (err) => {
  console.log(err);
  });
  }


SaveAttractionImageNewOption(AttractionImagesForm:NgForm){
  console.log(this.countryAttractionNewOption, 'Country Form Submission')
  this.AttractionService.saveAllAdminData(this.countryAttractionNewOption, 'SaveNewAttractionImageOption').subscribe(data => {
  this.countryAttractionNewOption = data;
  if (data.insertId === 0 ) {
  this.showSuccess('Country Attraction New Option Image Uploaded', 'Country Attraction New Option Image Data Got Updated'); 
  } else {
  this.showSuccess('Country Attraction New Option Image Uploaded', 'Country Attraction New Option Image Data Got Saved');
  }
  AttractionImagesForm.reset();
  this.image = null;
  this.CountryTextBox.nativeElement.value = "";
  this.displayLanguagesOnDataTable();
  this.DisplayAttractionImagesAccordingToLang(this.Lang);
  this.dtTrigger.next();
  },
  (err) => {
  console.log(err);
  });
  }


sendCountryAttractionImagesDetailsToModalPopUp(Attraction){
  this.AttractionImageDetails= Attraction;
  }


editAttractionImages(Attraction) {  
  this.country = Object.assign({}, Attraction);
  this.image = this.env.apiUrl + this.country.AttractionImage;
  }


editAttractionImagesNewOption(Attraction){
  this.countryAttractionNewOption = Object.assign({}, Attraction);
  this.image = this.env.apiUrl + this.countryAttractionNewOption.AttractionImage;
  this.countryimagesservice.getCountryByCountryID('CountryListByCountryID', Attraction.CountryID)
  .subscribe(data => {
  this.CountryAttractionListsInNewOption =data;
  });
  }

  
resetData(AttractionImagesForm: NgForm){
  AttractionImagesForm.reset();
  this.CountryTextBox.nativeElement.value = "";
  }


deleteAttractionImages(Attraction){
  this.AttractionService.deleteAttractionImages(Attraction.AttractionId , 'DeleteAttractionImage').subscribe(data => {
  this.displayLanguagesOnDataTable();
  this.DisplayAttractionImagesAccordingToLang(this.Lang);
  this.showSuccess('Attraction Image Deleted', 'Attraction Image Data Got Deleted');
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
