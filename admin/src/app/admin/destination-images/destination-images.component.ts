// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Destinationimages } from 'src/app/models/destinationimages.module';
import { DestinationService } from 'src/app/services/destination.service';
import {DestinationImagesService} from 'src/app/services/destination-images.service'
import {DomSanitizer} from '@angular/platform-browser';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';

@Component({
  selector: 'app-destination-images',
  templateUrl: './destination-images.component.html',
  styleUrls: ['./destination-images.component.css']
})
export class DestinationImagesComponent implements OnInit {
  @ViewChild('DestinationTextBox')
  DestinationTextBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  label = 'English';
  Lang = 'EN';
  env= environment;
  private url= this.env.apiUrl + 'file'
  options: ImageUploaderOptions = {
    thumbnailHeight: 200,
    thumbnailWidth: 400,
    autoUpload: true,
    uploadUrl: this.env.apiUrl + 'file',
    allowedImageTypes: ['image/png', 'image/jpeg'],
    maxImageSize: 3
};

  destination: Destinationimages = {
    Id: null,
    LocationID: null,
    DestinationId: null,
    DestinationLocationID: null,
    DestinationImage: '',
    ImageDescription: '',
    LanguageValue: 'EN',
    CreatedOn: null   
  };
  destinationImageOption = {
    Id: null,
    LocationID: null,
    DestinationId: null,
    DestinationLocationID: null,
    DestinationImage: '',
    ImageDescription: '',
    LanguageValue: '',
    CreatedOn: null 
  };
  term:any;
  Locationid: any;
  DestinationLocationIdPassedToChangeLabel: any ;
  DestinationLocationIDData: any = [];
  destinationDataFromDestination: any = [];
  stringUrl: any;
  destinationImagesData: any = [];
  destinationImageDetails: any = [];
  imagesurl: any = [];
  image: any = [];
  destinationListsInNewOption: any =[];
  languages: any = [];
  languagesData:any = [];
  destinationImageEvent: any = [];
  destinationIDPassedToChangeLabel:any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private http: HttpClient,
              private destinationService: DestinationService,
              private destinationImageService: DestinationImagesService,
              private sanitizer: DomSanitizer ) { }

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
        this.DisplayOnlyEnglishDestination();
        this.displayLanguagesOnDataTable();
        this.DisplayDestinationsImagesAccordingToLang(this.Lang);

  }

  displayLanguages(){
    this.destinationService.getAllLanguages('LanguagesList')
    .subscribe(data => {
     this.languagesData = data;
         });
}

displayLanguagesOnDataTable(){
  this.destinationImageService.getAllLanguagesOnDataTablePage('LanguagesList')
  .subscribe(data => {
   this.languages = data;
       });
}

DisplayOnlyEnglishDestination(){
  this.destinationImageService.getOnlyEnglishDestinationList('DestinationListInEnglish', 'EN')
  .subscribe(data => {
  this.destinationDataFromDestination =data;
  });
}


DisplayDestinationsImagesAccordingToLang(Lang){
  this.destinationImageService.getAllDestinationImagesAccordingToLang('DestinationListAccordingToLang' ,Lang)
  .subscribe(data => {
   this.destinationImagesData = data;
   this.dtTrigger.next();
       });
}

onChange(Destination){
  if(Destination !== null){
    this.destinationImageService.getDestinationLocationId('GetDestinationLocationID', Destination)
    .subscribe(data =>{
    this.DestinationLocationIDData = data;
    this.Locationid= JSON.stringify(this.DestinationLocationIDData[0].LocationID);
    this.destination.DestinationLocationID = this.Locationid;
    });  
  }
}


ChangeLabels(Language){
  this.destinationImageOption.DestinationLocationID = this.DestinationLocationIdPassedToChangeLabel;
  this.label = this.languagesData.find(x => x.LanguageValue === Language.toString()).LanguageName;
  this.destinationImageService.getAllDestinationLists('DestinationListInDestinationImages',Language, this.DestinationLocationIdPassedToChangeLabel)
  .subscribe(data => {
   this.destinationListsInNewOption =data;
  });
}


getDestinationImageDetail(Destination){
this.destinationListsInNewOption = [];
this.destinationIDPassedToChangeLabel = Destination.LocationID
this.DestinationLocationIdPassedToChangeLabel = Destination.DestinationLocationID;
this.destinationImageOption.LocationID = Destination.LocationID;
this.image = this.env.apiUrl + Destination.DestinationImage;
this.destinationImageOption.DestinationImage = Destination.DestinationImage;
}


onUpload(file: FileQueueObject) {
  const s = Object.assign({} , file.response)
  this.destinationImageEvent = JSON.parse(JSON.stringify(s)).body.filename;
  console.log(this.destinationImageEvent, 'filename');
  this.destination.DestinationImage = this.destinationImageEvent;
  this.destinationImageOption.DestinationImage = this.destinationImageEvent; 
  }


  resetData(destinationImageForm: NgForm){
    destinationImageForm.reset();
    this.image = null;
    this.destinationListsInNewOption = [];
    this.DestinationTextBox.nativeElement.value = "";
    this.LanguageTextBox.nativeElement.value = "";
    this.label = "English";
    this.destination = {
      Id: null,
      LocationID: null,
      DestinationId: null,
      DestinationLocationID: null,
      DestinationImage: '',
      ImageDescription: '',
      LanguageValue: 'EN',
      CreatedOn: null   
    };
  }


  resetFormData(destinationImageForm:NgForm){
    destinationImageForm.reset();
    this.destinationImageEvent = [];
    this.DestinationTextBox.nativeElement.value = "";
    this.image = null;
  }
  

onsubmit(destinationForm:NgForm){
  this.destinationImageService.saveAllAdminData(this.destination, 'SaveDestinationImages').subscribe(data => {
          this.destination = data;
          console.log(data, 'insert id');
          if (data.insertId === 0 ) {
          this.showSuccess('Destination Image Uploaded', 'Destination Data Got Updated'); 
          } else {
          this.showSuccess('Destination Image Uploaded', 'Destination Data Got Saved');
          }
          destinationForm.reset();
          this.image = null;
          this.displayLanguagesOnDataTable();
          this.DisplayDestinationsImagesAccordingToLang(this.Lang);
          this.dtTrigger.next();
           },
        (err) => {
      console.log(err);
      });
      }


  SaveDestinationOption(destinationImageNewOptionForm:NgForm){
  this.destinationImageService.saveAllAdminData(this.destinationImageOption, 'SaveNewDestinationImageOption').subscribe(data => {
        this.destinationImageOption = data;
        console.log(data, 'insert id');
        if (data.insertId === 0 ) {
        this.showSuccess('Destination New Option Image Uploaded', 'Destination New Option Image Data Got Updated'); 
        } else {
        this.showSuccess('Destination New Option Image Uploaded', 'Destination New Option Image Data Got Saved');
        }
        destinationImageNewOptionForm.reset();
        this.image = null;
        this.DestinationTextBox.nativeElement.value = "";
        this.displayLanguagesOnDataTable();
        this.DisplayDestinationsImagesAccordingToLang(this.Lang);
        this.dtTrigger.next();
         },
        (err) => {
        console.log(err);
        });
        }



  sanitize(imgName:string) {
    if(imgName !== null || imgName !== ''){
      let j;
      for(j = 0; j< imgName.length; j++){
        this.stringUrl= this.env.apiUrl + imgName;
        return this.sanitizer.bypassSecurityTrustUrl(this.stringUrl);
      }  
    }else {
      return null;
    }
  }


  editDestinationImages(Destination) {
    console.log(Destination, 'Destination From Edit Function');
    this.destination = Object.assign({}, Destination);
    this.destination.LanguageValue = Destination.LanguageValue; 
    this.image = this.env.apiUrl + this.destination.DestinationImage;
    // this.label = this.languagesData.find(x => x.LanguageValue === Destination.LanguageValue.toString()).LanguageName;     
  }


  editDestinationNewOptionImages(Destination){
    console.log(Destination, 'Destination From Edit Function');
    this.destinationImageOption = Object.assign({}, Destination);
    this.image = this.env.apiUrl + this.destinationImageOption.DestinationImage;
    this.destinationImageOption.LanguageValue = Destination.LanguageValue;
     this.destinationImageService.getDestinationByDestinationID('DestinationListByDestinationID', Destination.DestinationId)
      .subscribe(data => {
       this.destinationListsInNewOption =data;
       console.log(this.destinationListsInNewOption, 'destination g data');
      });
  }

  sendDestinationImageDetailsToModalPopUp(Destination){
    this.destinationImageDetails= Destination
  }


  deleteDestinationImages(Destination){
   this.destinationImageService.deleteDestinationImages(Destination.Id , 'DeleteDestinationImage').subscribe(data => {
    this.displayLanguagesOnDataTable();
    this.DisplayDestinationsImagesAccordingToLang(this.Lang);
      this.showSuccess('Destination Image Deleted', 'Destination Image Data Got Deleted');
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
