// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TourPackagesService} from 'src/app/services/tour-packages.service';
import { Tour_Packages } from 'src/app/models/tour-packages.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'app-tour-packages',
  templateUrl: './tour-packages.component.html',
  styleUrls: ['./tour-packages.component.css']
})
export class TourPackagesComponent implements OnInit {
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  languagesData:any = [];
  Lang = 'EN';
  term:any;
  languages:any = [];
  tourpackages: Tour_Packages = {
  Id: null,
  LocationID: null,
  PackageName: '',
  LanguageValue: 'EN',
  CreatedOn: null
  };

  tourpackagesNewOption: Tour_Packages = {
  Id: null,
  LocationID: null,
  PackageName: '',
  LanguageValue: '',
  CreatedOn: null
  };


tourPackagesDetails: any = [];
tourPackagesData: any = [];
dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();
  constructor(private tourPackagesService: TourPackagesService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
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
        this.displayLanguages();
        this.displayLanguagesOnDataTable();
        this.DisplayTourPackagesAccordingToLang(this.Lang);
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



GetTourPackageDetails(TourPackages){
this.tourpackagesNewOption.LocationID = TourPackages.LocationID;
this.LanguageTextBox.nativeElement.value= "";
}



DisplayTourPackagesAccordingToLang(Lang){
this.tourPackagesService.getAllTourPackages('TourPackagesList' , Lang)
.subscribe(data => {
this.tourPackagesData = data;
this.dtTrigger.next();
});
}


saveTourPackages(tourPackagesForm: NgForm): void{
this.tourPackagesService.saveAllAdminData(this.tourpackages, 'SaveTourPackages').subscribe(data => {
this.tourpackages = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour Packages Updated', 'Tour Packages Data Got Updated');
} else {
this.showSuccess('Tour Packages Added', 'Tour Packages Data Got Saved');
}
tourPackagesForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourPackagesAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}



saveTourPackagesNewOption(tourPackagesNewOptionForm:NgForm): void{
this.tourPackagesService.saveAllAdminData(this.tourpackagesNewOption, 'SaveTourPackagesNewOption').subscribe(data => {
this.tourpackagesNewOption = data;
if (data.insertId === 0 ) {
this.showSuccess('Tour Packages New option Updated', 'Tour Packages New Option Data Got Updated');
} else {
this.showSuccess('Tour Packages New Option Added', 'Tour Packages New Option Data Got Saved');
}
tourPackagesNewOptionForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayTourPackagesAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}



editTourPackages(TourPackages) {
this.tourpackages = Object.assign({}, TourPackages);
this.tourpackages.LocationID = TourPackages.LocationID;
}

editTourPackagesNewOption(TourPackages){
this.tourpackagesNewOption =Object.assign({},TourPackages);
this.tourpackagesNewOption.LocationID = TourPackages.LocationID;
}


resetData(tourPackagesForm: NgForm){
tourPackagesForm.reset();
this.tourpackages = {
Id: null,
LocationID: null,
PackageName: '',
LanguageValue: 'EN',
CreatedOn: null
}; 
}


resetTourPackageNewoption(tourPackagesNewOptionForm:NgForm){
tourPackagesNewOptionForm.reset();
this.LanguageTextBox.nativeElement.value= "";
}
  
sendTourPackagesDetailsToModalPopUp(TourPackages) {
this.tourPackagesDetails= TourPackages;   
}



deleteTourPackages(TourPackages) {
this.tourPackagesService.deleteTourPackages(TourPackages.Id , 'DeleteTourPackages').subscribe(data => {
this.displayLanguagesOnDataTable();
this.DisplayTourPackagesAccordingToLang(this.Lang);
this.showSuccess('Tour Package Deleted', 'Tour Package Data Got Deleted');
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

