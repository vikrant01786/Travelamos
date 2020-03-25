import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { DestinationService } from 'src/app/services/destination.service';
import { CityDetailsService } from 'src/app/services/city-details.service';
import { TourService } from 'src/app/services/tour.service';
import { NgForm } from '@angular/forms';
import { ProgramService } from 'src/app/services/program.service';
import { TourProgramService } from 'src/app/services/tour-program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  languages:any = [];
  term:any;
  ProgramDetails:any = [];
  languagesData:any = [];
  Lang = 'EN';
  ToursData:any = [];
  TourLocationID:any;
  country:any;
  countryData:any = [];
  tourData:any = [];
  ToursNewOption:any = [];
  ProgramData:any = [];
  CountryLocationIdPassedToChangeLabel:any;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  Program = {
    Id: null,
    LocationID: null,
    CountryID: null,
    CountryLocationID: null,
    TourID: null,
    TourLocationID: null,
    ProgramTitle: '',
    ProgramDescription: '',
    LanguageValue: 'EN',
    CreatedOn: null
  };

  ProgramNewOption = {
    Id: null,
    LocationID: null,
    CountryID: null,
    CountryLocationID: null,
    TourID: null,
    TourLocationID: null,
    ProgramTitle: '',
    ProgramDescription: '',
    LanguageValue: '',
    CreatedOn: null
  };


  constructor(private toastr: ToastrService,
              private programService : ProgramService,
               private spinner: NgxSpinnerService,
               private destinationService: DestinationService,
               private cityService: CityDetailsService,
               private tourService: TourService,) { }

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
    this.displayLanguagesOnDataTable();
    this.DisplayCountryOnlyInEnglish();
    this.DisplayTourDetailsOnlyInEnglish();
    this.DisplayProgramAccordingToLang(this.Lang);
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
});
}


FindToursAccordingToCountry(CountryID){
if(CountryID != null){
let CountryLocationID;
CountryLocationID = this.countryData.find(x => x.Id == CountryID).LocationID;
this.Program.CountryLocationID= CountryLocationID;
this.programService.getAllToursByTourID('GetAllToursByTourID',CountryID)
.subscribe(data=>{
this.ToursData = data;
}); 
}
}

FindToursAccordingToCountryInSecondModal(CountryID){
if(CountryID != null){
let CountryLocationIDForProgramNewOption;
CountryLocationIDForProgramNewOption = this.country.find(x => x.Id == CountryID).LocationID;
this.ProgramNewOption.CountryLocationID = CountryLocationIDForProgramNewOption;
this.programService.getToursForProgramNewOptionByCountryID('GetToursForProgramNewOptionByCountryID',CountryID)
.subscribe(data=>{
this.ToursNewOption = data;
});
}

}


FindTourLocationID(TourID){
if(TourID != null){
this.TourLocationID = this.ToursData.find(x => x.Id == TourID).LocationID;
this.Program.TourLocationID = this.TourLocationID;
}
}

FindTourLocationIDForSecondModal(TourID){
if(TourID != null){
let ToursLocationID =  this.ToursNewOption.find(x=> x.Id == TourID).LocationID;
this.ProgramNewOption.TourLocationID = ToursLocationID;
}
}

getProgramDetails(Program){
this.ProgramNewOption.LocationID = Program.LocationID;
this.CountryLocationIdPassedToChangeLabel = Program.RealCountryLocationID;
}

ChangeLabels(Language){
this.ProgramNewOption.CountryLocationID = this.CountryLocationIdPassedToChangeLabel;
this.programService.getCountryByLanguage('GetCountryByLanguageInProgram',Language,this.CountryLocationIdPassedToChangeLabel)
.subscribe(data=>{
this.country =  data;
});
}

displayLanguagesOnDataTable(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languages = data;
});
}


DisplayTourDetailsOnlyInEnglish(){
this.tourService.getAllTours('TourList', 'EN')
.subscribe(data => {
this.tourData = data;
});
}


DisplayProgramAccordingToLang(Lang){
this.programService.getAllProgram('ProgramList',Lang)
.subscribe(data => {
this.ProgramData = data;
console.log(this.ProgramData , 'program');
this.dtTrigger.next();
});
}


resetData(ProgramForm:NgForm){
ProgramForm.reset();
this.Program = {
Id: null,
LocationID: null,
CountryID: null,
CountryLocationID: null,
TourID: null,
TourLocationID: null,
ProgramTitle: '',
ProgramDescription: '',
LanguageValue: 'EN',
CreatedOn: null
};
this.ToursData = [];
}

resetSecondModal(ProgramNewOptionForm){
ProgramNewOptionForm.reset();
this.ToursNewOption = [];
}


saveProgram(tourProgramForm:NgForm){
this.programService.saveAllAdminData(this.Program, 'SaveProgram')
.subscribe(data=> {
if(data.insertId === 0){
this.showSuccess('Program Data Updated', 'Program Data Got Updated');
}else {
this.showSuccess('Program Data Inserted', 'Program Data Got Inserted');
}
tourProgramForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayProgramAccordingToLang(this.Lang);
},
(err) => {
console.log(err);
this.showFailure('Error',err);
});
}


saveProgramNewOption(ProgramNewOptionForm:NgForm){
console.log(this.ProgramNewOption , 'Program New Option Data Submission');
this.programService.saveAllAdminData(this.ProgramNewOption,'SaveProgramNewOption')
.subscribe(data=>{
if(data.insertId == 0){
this.showSuccess('Program New Option Updated', 'Program New Option Data Updated Successfully')
}else {
this.showSuccess('Program New Option Saved', 'Program New Option Data Saved Successfully');
}
ProgramNewOptionForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayProgramAccordingToLang(this.Lang);
},
(err) => {
this.showFailure('Error', err)
});
}

editTourProgram(Program){
console.log(Program, 'Program Details');
this.Program = Object.assign({},Program);
this.programService.getTourByTourID('TourByTourID', Program.TourID)
.subscribe(data =>{
console.log(data, 'Data');
this.ToursData = data;
});
}

editTourProgramNewOption(Program){
console.log(Program, 'Program');
this.ProgramNewOption = Object.assign({},Program);
this.programService.getCountryByCountryIDInProgramNewOption('GetCountryByCountryIDInProgramNewOption',Program.CountryID)
.subscribe(data=>{
this.country =  data;
});
this.programService.getTourByTourID('TourByTourID', Program.TourID)
.subscribe(data=> {
this.ToursNewOption = data;
});
}


sendTourProgramDetailsToModalPopUp(Program){
this.ProgramDetails = Program;
}

deleteProgram(Program){
console.log(Program, 'Program Data');
this.programService.deleteProgram(Program.Id,'DeleteProgram')
.subscribe(data => {
this.displayLanguagesOnDataTable();
this.DisplayProgramAccordingToLang(this.Lang);
this.showSuccess('Deleted Successfully','Program Data Got Deleted Successfully');
});
}

showSuccess(display, Message) {
this.toastr.success(display , Message );
}
  
  
showFailure(display, Message) {
this.toastr.error(display , Message );
}
}
