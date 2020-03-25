// |________________________________________________
// | © 2019 Navient Pvt.Ltd All Rights Reserved    |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {TourImagesService} from 'src/app/services/tour-images.service';
import { Tour_Images } from 'src/app/models/tour-images.model';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TourService } from 'src/app/services/tour.service';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { DestinationService } from 'src/app/services/destination.service';


@Component({
  selector: 'app-tour-images',
  templateUrl: './tour-images.component.html',
  styleUrls: ['./tour-images.component.css']
})
export class TourImagesComponent implements OnInit {
  @ViewChild('tourTextBox')
  tourTextBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
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
 tourImages: Tour_Images = {
  Id: null,
  LocationID: null,
  TourID: null,
  TourLocationID: null,
  TourImages: '',
  Description: '',
  LanguageValue: 'EN',
  CreatedOn: null
 };

 tourImagesNewOption: Tour_Images = {
  Id: null,
  LocationID: null,
  TourID: null,
  TourLocationID: null,
  TourImages: '',
  Description: '',
  LanguageValue: '',
  CreatedOn: null
 };
 term:any;
 Lang = 'EN';
 TourLocationIDIdPassedToChangeLabel:any = [];
 TourTitleData:any = [];
 languagesData:any = [];
 languages:any = [];
 TourImageEvent:any = [];
 tourImageDetails:any = [];
 tourImagesData:any = [];
 tourData:any = [];
 image: any =[];

 dtOptions: any = {};
 dtTrigger: Subject<any> = new Subject();

  constructor(private tourImagesService: TourImagesService,
             private toastr: ToastrService,
             private spinner: NgxSpinnerService,
             private http: HttpClient,
             private tourService: TourService,
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
           this.image = null;
           this.displayLanguages();
           this.DisplayTourDetailsOnlyInEnglish();
           this.displayLanguagesOnDataTable();
           this.DisplayTourImagesAccordingToLang(this.Lang);
  }

displayLanguages(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languagesData = data;
});
}


DisplayTourDetailsOnlyInEnglish(){
this.tourService.getAllTours('TourList', 'EN')
.subscribe(data => {
this.tourData = data;
});
}


displayLanguagesOnDataTable(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languages = data;
});
}


DisplayTourImagesAccordingToLang(Lang){
this.tourImagesService.getAllTourImagesByLanguage('TourImagesListByLanguage' , Lang)
.subscribe(data => {
this.tourImagesData = data;
this.dtTrigger.next();
});
}


onUpload(file: FileQueueObject) {
const FileResponse = Object.assign({}, file.response)
this.TourImageEvent = JSON.parse(JSON.stringify(FileResponse)).body.filename;
this.tourImages.TourImages = this.TourImageEvent;
this.tourImagesNewOption.TourImages = this.TourImageEvent;
}


findCountryID(Id) {
if(Id != null){
this.tourImagesService.getTourDetailsByTourId('GetTourDetailsByTourID', Id)
.subscribe(data => {
this.tourImages.TourLocationID = data[0].LocationID;
this.tourImagesNewOption.TourLocationID = data[0].LocationID;
})
}
}



getTourImagesDetails(TourImages){
this.TourTitleData=  [];
this.image= this.env.apiUrl + TourImages.TourImages;
this.TourLocationIDIdPassedToChangeLabel = TourImages.TourLocationID;
this.tourImagesNewOption.LocationID = TourImages.LocationID;
this.tourImagesNewOption.TourImages = TourImages.TourImages;
}

ChangeLabels(Language){
 this.tourImagesService.getAllTourByTourLocationID('GetAllTourByTourLocationID',Language,this.TourLocationIDIdPassedToChangeLabel)
 .subscribe(data =>{
  this.TourTitleData = data;
 });
}


onsubmit(tourImagesForm:NgForm){
this.tourImagesService.saveAllAdminData(this.tourImages, 'SaveTourImages').subscribe(data => {
this.tourImages = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour Image Uploaded', 'Tour Image Data Got Updated'); 
} else {
this.showSuccess('Tour Image Uploaded', 'Tour Image Data Got Saved');
}
tourImagesForm.reset();
this.image = null;
this.displayLanguagesOnDataTable();
this.DisplayTourImagesAccordingToLang(this.Lang);
this.dtTrigger.next();
},
(err) => {
console.log(err);
});
}



saveTourImageNewOption(tourImagesNewoptionForm:NgForm){
this.tourImagesService.saveAllAdminData(this.tourImagesNewOption, 'SaveTourImagesNewOption').subscribe(data => {
this.tourImagesNewOption = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour Image New Option Uploaded', 'Tour Image New Option Data Got Updated'); 
} else {
this.showSuccess('Tour Image New Option Uploaded', 'Tour Image New Option Data Got Saved');
}
tourImagesNewoptionForm.reset();
this.image = null;
this.displayLanguagesOnDataTable();
this.DisplayTourImagesAccordingToLang(this.Lang);
this.dtTrigger.next();
},
(err) => {
console.log(err);
});
}


resetFirsModalForm(tourImagesForm:NgForm){
tourImagesForm.reset();
this.tourTextBox.nativeElement.value = "";
this.tourImages = {
Id: null,
LocationID: null,
TourID: null,
TourLocationID: null,
TourImages: '',
Description: '',
LanguageValue: 'EN',
CreatedOn: null
};
}


resetSecondModalForm(tourImagesNewoptionForm:NgForm){
tourImagesNewoptionForm.reset();
this.tourTextBox.nativeElement.value = "";
this.LanguageTextBox.nativeElement.value = "";
this.TourTitleData = [];
}


editTourImages(Tour) {
this.tourImages = Object.assign({}, Tour);
this.image = this.env.apiUrl + this.tourImages.TourImages;
this.tourImagesService.getAllToursByTourId('TourListInTourImagesByTourId',Tour.TourID)
.subscribe(data => {
this.tourData = data;
});  
}


editTourImagesNewOption(Tour) {
this.tourImagesNewOption = Object.assign({}, Tour);
this.image = this.env.apiUrl + this.tourImagesNewOption.TourImages;
this.tourImagesService.getAllToursByTourId('TourListInTourImagesByTourId',Tour.TourID)
.subscribe(data => {
this.TourTitleData = data;
}); 
}


sendTourImagesDetailsToModalPopUp(Tour){
this.tourImageDetails= Tour;
}

deleteTourImages(Tour){
this.tourImagesService.deleteTourImages(Tour.Id , 'DeleteTourImages').subscribe(data => {
this.displayLanguagesOnDataTable();
this.DisplayTourImagesAccordingToLang(this.Lang);
this.showSuccess('Tour Image Deleted', 'Tour Image Data Got Deleted');
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

