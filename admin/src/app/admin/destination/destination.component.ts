// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DestinationService } from 'src/app/services/destination.service';
import { Destination } from 'src/app/models/destination.model';
import { ToastrService } from 'ngx-toastr';
import Responsive from 'datatables.net-responsive';
import { NgxSpinnerService } from "ngx-spinner";
import {TranslateService} from '@ngx-translate/core';
import { Destination_Option } from 'src/app/models/destination-option.model';
@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  label = "";
  Lang = "EN";
  term:any;
  showColumn : boolean;
  languages: any = [];
  destination: Destination = {
    Id: null,
    LocationID: null,
    DestinationName: '',
    HomeTitle: '',
    HomeDescription: '',
    Longitude: '',
    Latitude: '',
    LanguageValue: 'EN',
    CreatedOn: null
  };

  DestinationOption: Destination_Option = {
    Id: null,
    LocationID: null,
    DestinationName: '',
    HomeTitle: '',
    HomeDescription: '',
    Longitude: '',
    Latitude: '',
    LanguageValue: '',
    CreatedOn: null
  };

 
  DestinationLabel: any = [];
  destinationDetails: any = [];
  destinationData = [];
  languagesData: any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  
  
  constructor(private destinationService: DestinationService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              public translate: TranslateService) { 
              }

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

 this.DisplayDestinationAccordingToLanguage(this.Lang);
 this.displayLanguagesOnDataTable();
 this.displayLanguages();   
  }


  reset(){
    this.LanguageTextBox.nativeElement.value= "";
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

//Display Drop Down on Pop Up Modal
displayLanguages(){
    this.destinationService.getAllLanguages('LanguagesList')
    .subscribe(data => {
     this.languagesData = data;
    //  console.log(this.languagesData, 'All Languages Data');
         });
}

//drop down of listing of languages on display page
displayLanguagesOnDataTable(){
  this.destinationService.getAllLanguages('LanguagesList')
  .subscribe(data => {
   this.languages = data;
  //  this.dtTrigger.next();
       });
}

  ChangeLabels(Language){
    this.label = this.languagesData.find(x => x.LanguageValue === Language.toString()).LanguageName;
  }


  //Display The ListOf Destination According to Selected Languages
  DisplayDestinationAccordingToLanguage(Lang){
    this.destinationService.getDestinationsAccordingToLanguage('DestinationListAccordingToLanguage',Lang)
    .subscribe(data => {
      let i;
      for(i=0; i< data.length; i++){
        if(data[i].LanguageValue === 'EN'){
          this.showColumn = true;
          console.log(this.showColumn, 'true or false');
        }
      }
     this.destinationData = data;
     this.dtTrigger.next();
         });
  }
  
  saveDestination(destinationForm: NgForm): void {
      this.destinationService.saveAllAdminData(this.destination, 'SaveNewDestination').subscribe(data => {
        this.destination = data;
        if (data.insertId === 0 ) {
          this.showSuccess('Destination Updated', 'Destination Data Got Updated');

        } else {
          this.showSuccess('Destination Added', 'Destination Data Got Saved');
        }
        destinationForm.reset();
        this.DisplayDestinationAccordingToLanguage(this.Lang);
        this.dtTrigger.next();
     
      }, (err) => {
        console.log(err);
      });
  }


  getDestinationDetail(Destination){
    this.DestinationOption.LocationID = Destination.LocationID;
    this.DestinationOption.Latitude = Destination.Latitude;
    this.DestinationOption.Longitude = Destination.Longitude;
    this.DestinationLabel = Destination.DestinationName;
  }

  SaveDestinationOption(destinationOptionForm:NgForm){
    this.destinationService.saveAllAdminData(this.DestinationOption,'SaveNewDestinationOption')
    .subscribe(data => {
      if (data.insertId === 0 ) {
        this.showSuccess('Destination Option Updated', 'Destination Option Data Got Updated');

      } else {
        this.showSuccess('Destination Option Added', 'Destination Option Data Got Saved');
      }
      destinationOptionForm.reset();
      this.DisplayDestinationAccordingToLanguage(this.Lang);
    },
    (err) =>{
      console.log(err);
    });
    
  }

  editDestination(Destination) {
    this.destination = Object.assign({}, Destination);
    // this.label = this.languagesData.find(x => x.LanguageValue === Destination.LanguageValue.toString()).LanguageName; 
  }

  editDestinationOption(Destination){
    this.DestinationOption = Object.assign({}, Destination);
    this.label = this.languagesData.find(x => x.LanguageValue === Destination.LanguageValue.toString()).LanguageName; 
  }

  resetData(destinationForm: NgForm){
    destinationForm.reset();
    // this.LanguageTextBox.nativeElement.value="";
    this.label = "English";
    this.destination = {
      Id: null,
      LocationID:null,
      DestinationName: '',
      HomeTitle: '',
      HomeDescription: '',
      Longitude: '',
      Latitude: '',
      LanguageValue: '',
      CreatedOn: null
    };

  }

  resetDestinationOption(destinationOptionForm){
    destinationOptionForm.reset();
    this.DestinationOption = {
      Id: null,
      LocationID: null,
      DestinationName: '',
      HomeTitle: '',
      HomeDescription: '',
      Longitude: '',
      Latitude: '',
      LanguageValue: '',
      CreatedOn: null
    };
  }
  sendDestinationDetailsToModalPopUp(Destination) {
    console.log(Destination, 'modal pop up data');
    this.destinationDetails= Destination
    
  }

  deleteDestination(Destination) {
    this.destinationService.deleteDestination(Destination.Id , 'DeleteDestination').subscribe(data => {
    this.DisplayDestinationAccordingToLanguage(this.Lang);
    this.showSuccess('Destination Deleted', 'Destination Data Got Deleted');

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
