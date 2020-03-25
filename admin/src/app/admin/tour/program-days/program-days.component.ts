import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { CountryImagesService } from 'src/app/services/country-images.service';
import { TourService } from 'src/app/services/tour.service';
import { ProgramDaysService } from 'src/app/services/program-days.service';
import { IfStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { DestinationService } from 'src/app/services/destination.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-program-days',
  templateUrl: './program-days.component.html',
  styleUrls: ['./program-days.component.css']
})
export class ProgramDaysComponent implements OnInit {
@ViewChild('LanguageTextBox')
FirstLanguageModalPopUp: ElementRef;
@ViewChild('CountryFirstLanguageModalBox')
CountryFirstLanguageModalBox: ElementRef;
@ViewChild('ProgramLanguageFirstTextBox')
ProgramLanguageFirstTextBox: ElementRef;
@ViewChild('TourLanguageFirstModalPopUPBox')
TourLanguageFirstModalPopUPBox: ElementRef;
@ViewChild('CountryEnglishFirstModalPopUp')
CountryEnglishFirstModalPopUp: ElementRef;
@ViewChild('TourEnglishFirstModalPopUp')
TourEnglishFirstModalPopUp: ElementRef;
@ViewChild('ProgramEnglishFirstModalPopUp')
ProgramEnglishFirstModalPopUp: ElementRef;
@ViewChild('CountrySecondLanguageModalBox')
CountrySecondLanguageModalBox: ElementRef;
@ViewChild('TourLanguageSecondModalPopUPBox')
TourLanguageSecondModalPopUPBox: ElementRef;
@ViewChild('ProgramLanguageSecondModalPopUPBox')
ProgramLanguageSecondModalPopUPBox: ElementRef;
env =environment;
term:any;
tourData:any = [];
ProgramData:any = [];
image = null;
options: ImageUploaderOptions = {
thumbnailHeight: 200,
thumbnailWidth: 400,
autoUpload: true,
uploadUrl: this.env.apiUrl + 'file',
allowedImageTypes: ['image/png', 'image/jpeg'],
maxImageSize: 3
}; 
DaysDataInDays:any = [];
tourDataInSecondModal:any = [];
DaysDetail:any = [];
ProgramDataInSecondModal:any = [];
CountryListData:any = [];
daysData:any = [];
languages:any = [];
Lang = 'EN'

days = {
Id: null,
LocationID: null,
ProgramID:null,
ProgramLocationID: null,
CountryID: null,
CountryLocationID: null,
TourID:null,
TourLocationID: null,
Days: null,
DaysTitle: '',
DaysDescription: '',
DaysImage: '',
LanguageValue: 'EN',
CreatedOn: null
};


daysNewOption = {
Id: null,
LocationID: null,
ProgramID:null,
ProgramLocationID: null,
CountryID: null,
CountryLocationID: null,
TourID:null,
TourLocationID: null,
Days: null,
DaysTitle: '',
DaysDescription: '',
DaysImage: '',
LanguageValue: '',
CreatedOn: null
}


daysInfo = {
Days: null,
DaysTitle: '',
DaysDescription: '',
DaysImage: '',
};

tour:any = [];
program:any = [];
day:any = [];
daynewoption:any = [];
CountryLocationIdPassedToChangeLabel:any;
languagesData:any = [];
LanguagesData:any = [];
countryData:any = [];
DaysImageEvent:any = [];
dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();
constructor(private countryimagesservice: CountryImagesService,
            private tourService: TourService,
            private toastr: ToastrService,
            private programDayService: ProgramDaysService,
            private destinationService: DestinationService,
            private spinner: NgxSpinnerService,) { }

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
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
acc[i].addEventListener("click", function() {
this.classList.toggle("active");
var panel = this.nextElementSibling;
if (panel.style.maxHeight) {
panel.style.maxHeight = null;
} else {
panel.style.maxHeight = panel.scrollHeight + "px";
} 
});
}

var acc = document.getElementsByClassName("MyLanguage");
var i;
for (i = 0; i < acc.length; i++) {
acc[i].addEventListener("click", function() {
this.classList.toggle("active");
var panel = this.nextElementSibling;
if (panel.style.maxHeight) {
panel.style.maxHeight = null;
} else {
panel.style.maxHeight = panel.scrollHeight + "px";
} 
});
}
this.displayLanguages();
this.DisplayCountryDataOnlyInEnglish();
this.displayLanguagesOnDataTable();
this.DisplayProgramDaysAccordingToLang(this.Lang);
}


displayLanguages(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languagesData = data;
});
}


DisplayCountryDataOnlyInEnglish(){
this.countryimagesservice.getAllCountryListInCountryImages('CountryListInCountryImages')
.subscribe(data => {
this.countryData = data;
});
}

displayLanguagesOnDataTable(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languages = data;
});
}


DisplayProgramDaysAccordingToLang(Lang){
this.programDayService.getAllDays('DaysList',Lang)
.subscribe(data => {
this.DaysDataInDays = data;
this.dtTrigger.next();
});
}


FindTourByCountryID(CountryID){
if(CountryID != null){
let CountryLocationID;
CountryLocationID = this.countryData.find(x => x.Id == CountryID).LocationID;
this.days.CountryLocationID = CountryLocationID;
this.programDayService.getToursByCountryIDInProgramDays('ToursByCountryIDInProgramDays',CountryID)
.subscribe(data=> {
this.tourData = data;
});
}
}

FindTourByCountryIDInSecondModal(CountryID){
if(CountryID != null){
const CountryLocationID = this.CountryListData.find(x => x.Id == CountryID).LocationID;
this.daysNewOption.CountryLocationID = CountryLocationID;
this.programDayService.getToursByCountryIDInProgramDays('ToursByCountryIDInProgramDays',CountryID)
.subscribe(Tours=> {
this.tourDataInSecondModal = Tours;
});  
}
}

ChangeLabels(Language){
this.tourService.getAllCountryInTourByLanguage('CountryListInTourByLanguage', Language , this.CountryLocationIdPassedToChangeLabel)
.subscribe(data =>{
this.CountryListData = data;
});
}

FindProgramByTourID(TourID){
if(TourID != null){
let TourLocationID;
TourLocationID = this.tourData.find(x=> x.Id == TourID).LocationID;
this.days.TourLocationID = TourLocationID;
this.programDayService.getProgramTitleByTourID('GetProgramTitleByTourID', TourID)
.subscribe(data=> {
this.ProgramData = data;
});
}
}


FindProgramByTourIDInSecondModal(TourID){
if(TourID != null){
const TourLocationID = this.tourDataInSecondModal.find(x=> x.Id == TourID).LocationID;
this.daysNewOption.TourLocationID = TourLocationID;
this.programDayService.getProgramTitleByTourID('GetProgramTitleByTourID', TourID)
.subscribe(Program=> {
this.ProgramDataInSecondModal = Program;
});
}
}


FindProgramLocationID(ProgramID){
let ProgramLocationID;
ProgramLocationID =  this.ProgramData.find(x => x.Id == ProgramID).LocationID;
this.days.ProgramLocationID = ProgramLocationID;
}


FindProgramLocationIDInSecondModal(ProgramID){
const ProgramLocationID =  this.ProgramDataInSecondModal.find(x => x.Id == ProgramID).LocationID;
this.daysNewOption.ProgramLocationID = ProgramLocationID;
}


getDetailsOfDays(Days){
this.day = [];
this.daysData = [];
this.daysNewOption.LocationID = Days.LocationID;
this.daysNewOption.DaysImage = Days.DaysImage;
this.CountryLocationIdPassedToChangeLabel = Days.CountryLocationID;
}


StoreDaysInArray(DaysForm:NgForm){
const daysArray = {
Days: this.daysInfo.Days,
DaysTitle: this.daysInfo.DaysTitle,
DaysDescription: this.daysInfo.DaysDescription,
DaysImage: '',
};
daysArray.DaysImage = this.DaysImageEvent;
this.day.push(daysArray);
DaysForm.reset();
}


StoreDaysNewOptionInArray(DaysnewOptionForm:NgForm){
const daysNewOptionArray = {
Days: this.daysInfo.Days,
DaysTitle: this.daysInfo.DaysTitle,
DaysDescription: this.daysInfo.DaysDescription,
DaysImage: '',
};
daysNewOptionArray.DaysImage = this.DaysImageEvent;
this.day.push(daysNewOptionArray);
DaysnewOptionForm.reset();
}


onUpload(file: FileQueueObject) {
const FileResponse = Object.assign({}, file.response)
this.DaysImageEvent = JSON.parse(JSON.stringify(FileResponse)).body.filename;
this.days.DaysImage = this.DaysImageEvent;
this.daysNewOption.DaysImage = this.DaysImageEvent;
}


deleteDaysInArray(Days){
this.day.splice(this.day.indexOf(Days), 1);
}


saveDays(DaysEnglishFirstModalPopUp:NgForm){
for(var i= 0; i< this.day.length; i ++){
const day = {
Id: this.days.Id,
LocationID: this.days.LocationID,
ProgramID:this.days.ProgramID,
ProgramLocationID: this.days.ProgramLocationID,
CountryID: this.days.CountryID,
CountryLocationID: this.days.CountryLocationID,
TourID: this.days.TourID,
TourLocationID: this.days.TourLocationID,
Days: this.day[i].Days,
DaysTitle: this.day[i].DaysTitle,
DaysDescription: this.day[i].DaysDescription,
DaysImage: this.day[i].DaysImage,
LanguageValue: this.days.LanguageValue,
CreatedOn: this.days.CreatedOn
};
this.daysData.push(day);
}
this.programDayService.saveAllAdminData(this.daysData, 'SaveProgramDays')
.subscribe(data => {
if(data.insertId == 0){
this.showSuccess('Program Days Data Got Updated','Program Days Successfully Updated');
}else {
this.showSuccess('Program Days Data Got saved','Program Days Successfully Saved');
}
DaysEnglishFirstModalPopUp.reset();
this.displayLanguagesOnDataTable();
this.DisplayProgramDaysAccordingToLang(this.Lang);
});
}


saveDaysNewoption(AddMoreLanguageFirstModalPopUPForm:NgForm){
for(var i= 0; i< this.day.length; i ++){
const day = {
Id: this.daysNewOption.Id,
LocationID: this.daysNewOption.LocationID,
ProgramID:this.daysNewOption.ProgramID,
ProgramLocationID: this.daysNewOption.ProgramLocationID,
CountryID: this.daysNewOption.CountryID,
CountryLocationID: this.daysNewOption.CountryLocationID,
TourID: this.daysNewOption.TourID,
TourLocationID: this.daysNewOption.TourLocationID,
Days: this.day[i].Days,
DaysTitle: this.day[i].DaysTitle,
DaysDescription: this.day[i].DaysDescription,
DaysImage: this.day[i].DaysImage,
LanguageValue: this.daysNewOption.LanguageValue,
CreatedOn: this.daysNewOption.CreatedOn
};
this.daysData.push(day);
}
this.programDayService.saveAllAdminData(this.daysData, 'SaveProgramDaysNewOption')
.subscribe(data => {
if(data.insertId == 0){
this.showSuccess('Program Days New Option Data Got Updated','Program Days New Option Successfully Updated');
}else {
this.showSuccess('Program Days New Option Data Got Saved','Program Days New Option Successfully Saved');
}
AddMoreLanguageFirstModalPopUPForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayProgramDaysAccordingToLang(this.Lang);
});
}


editProgramDays(Days){
console.log(Days, 'Days Data')
this.days = Object.assign({}, Days);
this.days.DaysImage = Days.DaysImage
this.image = this.env.apiUrl + Days.DaysImage;
this.programDayService.getTourNameByCountryID('GetTourNameByCountryID', Days.TourID)
.subscribe(data =>{
this.tourData = data;
const tourdata = this.tourData.find(x => x.Id == Days.TourID).LocationID;
this.days.TourLocationID = tourdata;
});
this.programDayService.getTourProgramByProgramID('GetTourProgramByProgramID', Days.ProgramID)
.subscribe(result => {
this.ProgramData = result;
const ProgramLocationID = this.ProgramData.find(x => x.Id == Days.ProgramID).LocationID;
this.days.ProgramLocationID = ProgramLocationID;
});
}


editProgramNewOption(Days){
this.daysNewOption = Object.assign({}, Days);
this.daysNewOption.DaysImage = Days.DaysImage
this.image = this.env.apiUrl + Days.DaysImage;
this.programDayService.getCountryByIDInDaysModule('GetCountryByIDInDaysModule', Days.CountryRealID)
.subscribe( result => {
 this.CountryListData = result;
 const CountryLocationID = this.CountryListData.find(x => x.Id == Days.CountryRealID).LocationID;
this.daysNewOption.CountryLocationID = CountryLocationID;
})
this.programDayService.getTourNameByCountryID('GetTourNameByCountryID', Days.TourRealID)
.subscribe(data =>{
this.tourDataInSecondModal = data;
const tourdata = this.tourDataInSecondModal.find(x => x.Id == Days.TourRealID).LocationID;
this.daysNewOption.TourLocationID = tourdata;
});
this.programDayService.getTourProgramByProgramID('GetTourProgramByProgramID', Days.ProgramRealID)
.subscribe(result => {
this.ProgramDataInSecondModal = result;
const ProgramLocationID = this.ProgramDataInSecondModal.find(x => x.Id == Days.ProgramRealID).LocationID;
this.daysNewOption.ProgramLocationID = ProgramLocationID;
});
}


saveUpdatedDays(EnglishSecondModalPopUp:NgForm){
// this.days.DaysImage = this.DaysImageEvent;
console.log(this.days, 'submission')
this.programDayService.saveAllAdminData(this.days,'SaveUpdatedDay' )
.subscribe(result=> {
this.showSuccess('Program Days  Data Got Updated','Program Days Successfully Updated');
EnglishSecondModalPopUp.reset();
this.displayLanguagesOnDataTable();
this.DisplayProgramDaysAccordingToLang(this.Lang);
});
}


saveUpdatedNewOptionDays(AddMoreLanguageSecondModalPopUp:NgForm){
// this.daysNewOption.DaysImage = this.DaysImageEvent;
this.programDayService.saveAllAdminData(this.daysNewOption,'SaveUpdatedDay' )
.subscribe(result=> {
this.showSuccess('Program Days New Option  Data Got Updated','Program Days New Option Successfully Updated');
AddMoreLanguageSecondModalPopUp.reset();
this.displayLanguagesOnDataTable();
this.DisplayProgramDaysAccordingToLang(this.Lang);
});
}


sendDaysDetailsToModalPopUp(Days){
this.DaysDetail = Days;
}


deleteDays(Days){
this.programDayService.deleteDays(Days.DayRealID , 'DeleteDays')
.subscribe(result =>{
this.showSuccess('Day Data Deleted',' Days Data Got Deleted Successfully');
this.displayLanguagesOnDataTable();
this.DisplayProgramDaysAccordingToLang(this.Lang);
});
}


resetData(DaysEnglishFirstModalPopUp:NgForm){
DaysEnglishFirstModalPopUp.reset();
this.TourEnglishFirstModalPopUp.nativeElement.value="";
this.ProgramEnglishFirstModalPopUp.nativeElement.value ="";
this.daysData = [];
this.tourData = [];
this.ProgramData = [];
this.day = [];
this.days = {
  Id: null,
  LocationID: null,
  ProgramID:null,
  ProgramLocationID: null,
  CountryID: null,
  CountryLocationID: null,
  TourID:null,
  TourLocationID: null,
  Days: null,
  DaysTitle: '',
  DaysDescription: '',
  DaysImage: '',
  LanguageValue: 'EN',
  CreatedOn: null
  };
}


resetDataFirstLanguageModalPopUp(AddMoreLanguageFirstModalPopUPForm:NgForm){
AddMoreLanguageFirstModalPopUPForm.reset();
this.FirstLanguageModalPopUp.nativeElement.value="";
this.CountryFirstLanguageModalBox.nativeElement.value = "";
this.ProgramLanguageFirstTextBox.nativeElement.value="";
this.TourLanguageFirstModalPopUPBox.nativeElement.value = "";
this.CountryListData = [];
this.tourDataInSecondModal = [];
this.ProgramDataInSecondModal = [];
this.day = [];
this.daysNewOption = {
  Id: null,
  LocationID: null,
  ProgramID:null,
  ProgramLocationID: null,
  CountryID: null,
  CountryLocationID: null,
  TourID:null,
  TourLocationID: null,
  Days: null,
  DaysTitle: '',
  DaysDescription: '',
  DaysImage: '',
  LanguageValue: '',
  CreatedOn: null
  };
}

resetDataFirstEnglishModalPopUp(DaysEnglishFirstModalPopUp:NgForm){
DaysEnglishFirstModalPopUp.reset();
this.CountryEnglishFirstModalPopUp.nativeElement.value = "";
this.TourEnglishFirstModalPopUp.nativeElement.value= "";
this.ProgramEnglishFirstModalPopUp.nativeElement.value = "";
this.tourData = [];
this.ProgramData = [];
this.day = [];
}


resetOtherLanguageEditModalPopUp(AddMoreLanguageSecondModalPopUp:NgForm){
AddMoreLanguageSecondModalPopUp.reset();
this.CountryFirstLanguageModalBox.nativeElement.value = "";
this.TourEnglishFirstModalPopUp.nativeElement.value= "";
this.ProgramEnglishFirstModalPopUp.nativeElement.value = "";
this.CountryListData = [];
this.tourDataInSecondModal = [];
this.ProgramDataInSecondModal = [];
}


showSuccess(display, Message) {
this.toastr.success(display , Message );
}
    
    
showFailure(display, Message) {
this.toastr.error(display , Message );
}
}
