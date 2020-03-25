import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { TourService } from 'src/app/services/tour.service';
import { Tour_Services } from 'src/app/models/tour-services.model';
import { NgForm } from '@angular/forms';
import { TourServicesService } from 'src/app/services/tour-services.service';
import { Subject } from 'rxjs';
import { DestinationService } from 'src/app/services/destination.service';
import { TourImagesService } from 'src/app/services/tour-images.service';

@Component({
  selector: 'app-tour-services',
  templateUrl: './tour-services.component.html',
  styleUrls: ['./tour-services.component.css']
})
export class TourServicesComponent implements OnInit {
  @ViewChild('TourTextBox')
  TourTextBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  label ='English';
  Lang = 'En';
  term:any;
  tourservice: Tour_Services = {
    Id: null,
    LocationID:null,
    TourID: null,
    TourLocationID: null,
    ServiceTitle: '',
    ServiceDescription: '',
    LanguageValue: 'EN',
    CreatedOn: null
  };
  tourserviceNewoption: Tour_Services = {
    Id: null,
    LocationID:null,
    TourID: null,
    TourLocationID: null,
    ServiceTitle: '',
    ServiceDescription: '',
    LanguageValue: '',
    CreatedOn: null
  };
  languagesData:any = [];
  TourLocationIDIdPassedToChangeLabel:any = [];
  tourNewOptionData:any = [];
  languages:any = [];
  tourData: any = [];
  tourServiceData: any = [];
  tourServicesDetails:any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private tourService: TourService,
              private tourImagesService: TourImagesService,
              private tourserviceService: TourServicesService,
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
        this.DisplayTourServicesAccordingToLang(this.Lang);
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

getTourImagesDetails(TourService){
this.tourNewOptionData = [];
this.TourLocationIDIdPassedToChangeLabel = TourService.TourLocationID;
this.tourserviceNewoption.LocationID = TourService.LocationID;
}


ChangeLabels(Language){
this.tourImagesService.getAllTourByTourLocationID('GetAllTourByTourLocationID',Language,this.TourLocationIDIdPassedToChangeLabel)
.subscribe(data =>{
this.tourNewOptionData = data;
});
}


DisplayTourServicesAccordingToLang(Lang){
this.tourserviceService.getAllTourServicesByLang('TourServicesListByLanguage' , Lang)
.subscribe(data => {
this.tourServiceData = data;
this.dtTrigger.next();
});
}


findCountryID(Id) {
if(Id != null){
this.tourImagesService.getTourDetailsByTourId('GetTourDetailsByTourID', Id)
.subscribe(data => {
this.tourservice.TourLocationID = data[0].LocationID;
this.tourserviceNewoption.TourLocationID = data[0].LocationID;
});
}
}

saveTourServices(tourServiceForm:NgForm){
console.log(this.tourservice);
this.tourserviceService.saveAllAdminData(this.tourservice, 'SaveTourServices').subscribe(data => {
this.tourservice = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour Service Updated', 'Tour Service Data Got Updated');
} else {
this.showSuccess('Tour Service Added', 'Tour Service Data Got Saved');
}
tourServiceForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourServicesAccordingToLang(this.Lang);
this.dtTrigger.next(); 
}, (err) => {
console.log(err);
});  
}

saveTourServicesNewOption(tourServiceNewOptionForm:NgForm){
this.tourserviceService.saveAllAdminData(this.tourserviceNewoption, 'SaveTourServicesNewOption').subscribe(data => {
this.tourserviceNewoption = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour Service New Option Updated', 'Tour Service New Option Data Got Updated');
} else {
this.showSuccess('Tour Service New Option Added', 'Tour Service New Option Data Got Saved');
}
tourServiceNewOptionForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourServicesAccordingToLang(this.Lang);
this.dtTrigger.next(); 
}, (err) => {
console.log(err);
});  
}
  
 
resetData(tourServiceForm:NgForm){
tourServiceForm.reset();
this.TourTextBox.nativeElement.value = "";  
this.tourservice = {
Id: null,
LocationID: null,
TourID: null,
TourLocationID: null,
ServiceTitle: '',
ServiceDescription: '',
LanguageValue: 'EN',
CreatedOn: null
};
}

resetDataSecondModal(tourServiceNewOptionForm){
tourServiceNewOptionForm.reset();
this.TourTextBox.nativeElement.value = "";
this.LanguageTextBox.nativeElement.value = "";
}

editTourServices(TourServices) {
this.tourservice = Object.assign({}, TourServices);
this.tourserviceService.getAllTourByTourId('TourListInTourServicesByTourId',TourServices.TourID)
.subscribe(data => {
this.tourData = data;
});      
}

editTourServicesNewOption(TourServices){
this.tourserviceNewoption = Object.assign({},TourServices);
this.tourserviceService.getAllTourByTourId('TourListInTourServicesByTourId',TourServices.TourID)
.subscribe(data => {
this.tourNewOptionData = data;
console.log(this.tourServiceData, 'Tour Service Data');
}); 
}

sendTourServicesDetailsToModalPopUp(TourServices) {
console.log(TourServices, 'Tour Services');
this.tourServicesDetails= TourServices;    
}


  deleteTourServices(TourServices) {
    this.tourserviceService.deleteTourServices(TourServices.Id , 'DeleteTourServices').subscribe(data => {
    this.displayLanguagesOnDataTable();
    this.DisplayTourServicesAccordingToLang(this.Lang);
    this.showSuccess('Tour Services Deleted', 'Tour Services Data Got Deleted');
  
   });
  
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
 

  showSuccess(display, Message) {
    this.toastr.success(display , Message );
  }
  showFailure(display, Message) {
    this.toastr.error(display , Message );
  }

}
