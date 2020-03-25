import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Tour_Terms } from 'src/app/models/tour-terms.model';
import { NgForm } from '@angular/forms';
import { DestinationService } from 'src/app/services/destination.service';
import { TourService } from 'src/app/services/tour.service';
import { TourTermsService } from 'src/app/services/tour-terms.service';
import { TourServicesService } from 'src/app/services/tour-services.service';
import { TourImagesService } from 'src/app/services/tour-images.service';

@Component({
  selector: 'app-tour-terms',
  templateUrl: './tour-terms.component.html',
  styleUrls: ['./tour-terms.component.css']
})
export class TourTermsComponent implements OnInit {
  @ViewChild('TourTextBox')
  TourTextBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  label = "English";
  Lang = 'EN';
  tourterm:Tour_Terms = {
    Id: null,
    LocationID: null,
    TourID:null,
    TourLocationID: null,
    TermTitle: '',
    TermDescription: '',
    LanguageValue: 'EN',
    CreatedOn: null
  };

  tourtermNewOption:Tour_Terms = {
    Id: null,
    LocationID: null,
    TourID:null,
    TourLocationID: null,
    TermTitle: '',
    TermDescription: '',
    LanguageValue: '',
    CreatedOn: null
  };
  term:any;
  TourLocationIDIdPassedToChangeLabel: any = [];
  tourtermNewOptionData:any = [];
  tourTermData:any = [];
  tourData: any = [];
  tourTermDetails:any = [];
  languages:any = [];
  languagesData:any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private toastr: ToastrService,
              private tourImagesService: TourImagesService,
              private spinner: NgxSpinnerService,
              private destinationService: DestinationService,
              private tourService: TourService,
              private tourTermService: TourTermsService,
              private tourserviceService: TourServicesService) { }

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
         this.DisplayTourDetailsOnlyInEnglish();
         this.displayLanguagesOnDataTable();
         this.DisplayTourTermAccordingToLang(this.Lang);
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


FindTourLocationIDByTourID(Id){
if(Id != null){
this.tourImagesService.getTourDetailsByTourId('GetTourDetailsByTourID', Id)
.subscribe(data => {
this.tourterm.TourLocationID = data[0].LocationID;
this.tourtermNewOption.TourLocationID = data[0].LocationID;
});
}
}

GetTourTermsDetails(TourTerm){
this.tourtermNewOptionData = [];
console.log(TourTerm, 'Tour Term Data')
this.tourtermNewOption.LocationID = TourTerm.LocationID;
this.TourLocationIDIdPassedToChangeLabel = TourTerm.TourLocationID;
}
 

displayLanguagesOnDataTable(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languages = data;
});
}


DisplayTourTermAccordingToLang(Lang){
this.tourTermService.getAllTourTermByLang('TourTermListByLanguage' ,Lang)
.subscribe(data => {
this.tourTermData = data;
this.dtTrigger.next();
});
}


ChangeLabels(Language){
this.tourImagesService.getAllTourByTourLocationID('GetAllTourByTourLocationID',Language,this.TourLocationIDIdPassedToChangeLabel)
.subscribe(data =>{
this.tourtermNewOptionData = data;
});
}


editTourTerm(TourTerm) {
this.tourterm = Object.assign({}, TourTerm);
this.tourserviceService.getAllTourByTourId('TourListInTourServicesByTourId',TourTerm.TourID)
.subscribe(data => {
this.tourData = data;
});      
}


editTourTermNewOption(TourTerm){
this.tourtermNewOption = Object.assign({}, TourTerm);
}


sendTourTermDetailsToModalPopUp(TourTerm) {
this.tourTermDetails= TourTerm;    
}


resetData(tourTermForm:NgForm){
tourTermForm.reset();
this.TourTextBox.nativeElement.value = "";
this.tourterm = {
Id: null,
LocationID: null,
TourID:null,
TourLocationID: null,
TermTitle: '',
TermDescription: '',
LanguageValue: 'EN',
CreatedOn: null
};
}


resetDataSecondModal(tourTermNewOptionForm:NgForm){
tourTermNewOptionForm.reset();
this.LanguageTextBox.nativeElement.value = "";
this.TourTextBox.nativeElement.value = "";
}


saveTourTerm(tourtermForm:NgForm){
console.log(this.tourterm , 'Tour Term Form Submission Data');
this.tourTermService.saveAllAdminData(this.tourterm, 'SaveTourTerm')
.subscribe(data => {
this.tourterm = data;  
if (data.insertId === 0 ) {  
this.showSuccess('Tour Term Updated', 'Tour Term Data Got Updated');
} else {
this.showSuccess('Tour Term Added', 'Tour Term Data Got Saved');
}
tourtermForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourTermAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}


saveTourTermNewOption(tourTermNewOptionForm:NgForm){
console.log(this.tourtermNewOption, 'Tour New Language Data Submission');
this.tourTermService.saveAllAdminData(this.tourtermNewOption, 'SaveTourTermNewOption')
.subscribe(data => {
this.tourtermNewOption = data;  
if (data.insertId === 0 ) {  
this.showSuccess('Tour Term New Option Updated', 'Tour Term New Option Data Got Updated');
} else {
this.showSuccess('Tour Term New Option Added', 'Tour Term New Option Data Got Saved');
}
tourTermNewOptionForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourTermAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}


deleteTourTerm(TourTerm) {
this.tourTermService.deleteTourTerms(TourTerm.Id , 'DeleteTourTerm').subscribe(data => {
this.displayLanguagesOnDataTable();
this.DisplayTourTermAccordingToLang(this.Lang);
this.showSuccess('Tour Term Deleted', 'Tour Term Data Got Deleted');
});
}


showSuccess(display, Message) {
this.toastr.success(display , Message );
}


showFailure(display, Message) {
this.toastr.error(display , Message );
}
}
