// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Tour_Program } from 'src/app/models/tour-program.model';
import { NgForm } from '@angular/forms';
import { TourProgramService } from 'src/app/services/tour-program.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'app-tour-program',
  templateUrl: './tour-program.component.html',
  styleUrls: ['./tour-program.component.css']
})
export class TourProgramComponent implements OnInit {
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  term:any;
  languagesData:any = [];
  languages:any = [];
  Lang = 'EN';
  constructor(private tourProgramService: TourProgramService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private destinationService: DestinationService,) { }

  tourprogram: Tour_Program = {
    Id: null,
    LocationID: null,
    Days: null,
    Title: '',
    PlannedActivities: '',
    LanguageValue: 'EN',
    CreatedOn: null
  };

  tourprogramNewOption: Tour_Program = {
    Id: null,
    LocationID: null,
    Days: null,
    Title: '',
    PlannedActivities: '',
    LanguageValue: '',
    CreatedOn: null
  };

  tourProgramDetails: any = [];
  tourProgramData: any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

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
        this.displayLanguages();
        this.displayLanguagesOnDataTable();
        this.DisplayTourProgramAccordingToLang(this.Lang); 
  }


displayLanguages(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languagesData = data;
});
}


displayLanguagesOnDataTable(){
this.destinationService.getAllLanguages('LanguagesList')
.subscribe(data => {
this.languages = data;
});
}

  
DisplayTourProgramAccordingToLang(Lang){
this.tourProgramService.getAllTourProgram('TourProgramList',Lang)
.subscribe(data => {
this.tourProgramData = data;
this.dtTrigger.next();
});
}


getTourProgramDetails(TourProgram){
console.log(TourProgram, 'Tour Program Details');
this.tourprogramNewOption.LocationID = TourProgram.LocationID;
this.tourprogramNewOption.Days = TourProgram.Days;
}


saveTourProgram(tourProgramForm: NgForm): void{
this.tourProgramService.saveAllAdminData(this.tourprogram, 'SaveTourProgram').subscribe(data => {
this.tourprogram = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour Program Updated', 'Tour Program Data Got Updated');
} else {
this.showSuccess('Tour Program Added', 'Tour Program Data Got Saved');
}
tourProgramForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourProgramAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}


saveTourProgramNewOption(tourProgramFormNewOption:NgForm){
this.tourProgramService.saveAllAdminData(this.tourprogramNewOption, 'SaveTourProgramNewOption').subscribe(data => {
this.tourprogramNewOption = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour Program New Option Updated', 'Tour Program New Option Data Got Updated');
} else {
this.showSuccess('Tour Program New Option Added', 'Tour Program New Option Data Got Saved');
}
tourProgramFormNewOption.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourProgramAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}



editTourProgram(TourProgram) {
this.tourprogram = Object.assign({}, TourProgram);
this.tourprogram.LocationID = TourProgram.LocationID;
}


editTourProgramNewOption(TourProgram){
this.tourprogramNewOption = Object.assign({}, TourProgram);
this.tourprogramNewOption.LocationID = TourProgram.LocationID;
}


resetData(tourProgramForm: NgForm){
tourProgramForm.reset();
this.tourprogram = {
Id: null,
LocationID:null,
Days: null,
Title: '',
PlannedActivities: '',
LanguageValue: 'EN',
CreatedOn: null
};
}


resetTourProgramData(tourProgramFormNewOption:NgForm){
this.LanguageTextBox.nativeElement.value = "";
tourProgramFormNewOption.reset();
}


sendTourProgramDetailsToModalPopUp(TourProgram) {
this.tourProgramDetails= TourProgram; 
}


deleteTourProgram(TourProgram) {
this.tourProgramService.deleteTourProgram(TourProgram.Id , 'DeleteTourProgram').subscribe(data => {
this.displayLanguagesOnDataTable();
this.DisplayTourProgramAccordingToLang(this.Lang);
this.showSuccess('Tour Program Deleted', 'Tour Program Data Got Deleted');
});
}


ngOnDestroy(): void {
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

