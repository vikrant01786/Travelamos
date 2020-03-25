// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________|  
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Price_Category } from 'src/app/models/price-category.model';
import {PriceCategoryService} from 'src/app/services/price-category.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { CategoryDetailsService } from 'src/app/services/category-details.service';
import {TourService} from 'src/app/services/tour.service';
import { DestinationService } from 'src/app/services/destination.service';
import { TourServicesService } from 'src/app/services/tour-services.service';
import { TourImagesService } from 'src/app/services/tour-images.service';

@Component({
  selector: 'app-price-category',
  templateUrl: './price-category.component.html',
  styleUrls: ['./price-category.component.css']
})
export class PriceCategoryComponent implements OnInit {
  @ViewChild('CategoryTextBox')
  CategoryTextBox: ElementRef;
  @ViewChild('TourTextBox')
  TourTextBox: ElementRef;
  @ViewChild('LanguageTextBox')
  LanguageTextBox: ElementRef;
  price: Price_Category = {
    Id: null,
    LocationID:null,
    TourID: null,
    TourLocationID:null,
    CategoryID: null,
    StartDate: '',
    EndDate: '',
    PriceIndividual: null,
    GuestPrice: null,
    LanguageValue: 'EN',
    CreatedOn: null,
  };
  priceNewOption: Price_Category= {
    Id: null,
    LocationID:null,
    TourID: null,
    TourLocationID:null,
    CategoryID: null,
    StartDate: '',
    EndDate: '',
    PriceIndividual: null,
    GuestPrice: null,
    LanguageValue: '',
    CreatedOn: null,
  };

  Lang = 'EN';
  term:any;
  priceDetails:any = [];
  TourLocationIDIdPassedToChangeLabel:any = [];
  tourDataNewOption:any = [];
  tourData: any = [];
  categoryData: any = [];
  languages:any = [];
  languagesData:any = [];
  priceCategoryData: any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private priceCategoryService: PriceCategoryService,
              private spinner: NgxSpinnerService,
              private tourImagesService: TourImagesService,
              private toastr: ToastrService,
              private categoryDetailsService: CategoryDetailsService,
              private tourService: TourService,
              private destinationService: DestinationService,
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
        this.DisplayTourDetailsOnlyInEnglish();
        this.displayCategoryData();
        this.displayLanguagesOnDataTable();
        this.DisplayPriceCategoryAccordingToLang(this.Lang);
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
this.dtTrigger.next();
});
}



GetPriceCategoryDetails(Price){
this.tourDataNewOption = [];
this.priceNewOption.LocationID = Price.LocationID;
this.priceNewOption.CategoryID = Price.CategoryID;
this.priceNewOption.StartDate = Price.StartDate;
this.priceNewOption.EndDate = Price.EndDate;
this.priceNewOption.PriceIndividual = Price.PriceIndividual;
this.priceNewOption.GuestPrice = Price.GuestPrice;
this.TourLocationIDIdPassedToChangeLabel = Price.TourLocationID;
}



ChangeLabels(Language){
this.tourImagesService.getAllTourByTourLocationID('GetAllTourByTourLocationID',Language,this.TourLocationIDIdPassedToChangeLabel)
.subscribe(data =>{
this.tourDataNewOption = data;
});
}



displayCategoryData(){
this.categoryDetailsService.getAllCategory('CategoryList')
.subscribe(data => {
this.categoryData = data;
});
}



DisplayPriceCategoryAccordingToLang(Lang){
this.priceCategoryService.getAllPriceCategory('PriceCategoryListByLanguage' , Lang)
.subscribe(data => {
this.priceCategoryData = data;
this.dtTrigger.next();
});
}



FindTourLocationIDByTourID(Id){
if(Id != null){
this.tourImagesService.getTourDetailsByTourId('GetTourDetailsByTourID', Id)
.subscribe(data => {
this.price.TourLocationID = data[0].LocationID;
this.priceNewOption.TourLocationID = data[0].LocationID;
});
}
}



savePriceCategory(priceCategoryForm: NgForm): void{
console.log(this.price, 'Price data After Form Submission');
this.priceCategoryService.saveAllAdminData(this.price, 'SavePriceCategory').subscribe(data => {
this.price = data;
if (data.insertId === 0 ) {
this.showSuccess('Price Category Updated', 'Price Category Data Got Updated');
} else {
this.showSuccess('Price Category Added', 'Price Category Data Got Saved');
}
priceCategoryForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayPriceCategoryAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}



savePriceCategoryNewOption(priceCategoryNewOptionForm:NgForm){
console.log(this.priceNewOption, 'Price New Option Form Submission');
this.priceCategoryService.saveAllAdminData(this.priceNewOption, 'SavePriceCategoryNewOption').subscribe(data => {
this.priceNewOption = data;
if (data.insertId === 0 ) {
this.showSuccess('Price Category New Option Updated', 'Price Category New Option Data Got Updated');
} else {
this.showSuccess('Price Category New Option Added', 'Price Category New Option Data Got Saved');
}
priceCategoryNewOptionForm.reset();
this.displayLanguagesOnDataTable();
this.DisplayPriceCategoryAccordingToLang(this.Lang);
this.dtTrigger.next();
}, (err) => {
console.log(err);
});
}



editPriceCategory(Price) {
this.price = Object.assign({}, Price);
this.categoryDetailsService.getAllCategory('CategoryList')
.subscribe(data => {
this.categoryData = data; 
});
this.tourserviceService.getAllTourByTourId('TourListInTourServicesByTourId',Price.TourID)
.subscribe(data => {
this.tourData = data;
});
}



editPriceCategoryNewOption(Price){
console.log(Price, 'Price Category');
this.priceNewOption = Object.assign({}, Price);
this.tourserviceService.getAllTourByTourId('TourListInTourServicesByTourId',Price.TourID)
.subscribe(data => {
this.tourDataNewOption = data;
});
}



resetData(priceCategoryForm: NgForm){
priceCategoryForm.reset();
this.CategoryTextBox.nativeElement.value= "";
this.TourTextBox.nativeElement.value = "";
this.price= {
Id: null,
LocationID: null,
TourID: null,
TourLocationID: null,
CategoryID: null,
StartDate: '',
EndDate: '',
PriceIndividual: null,
GuestPrice: null,
LanguageValue: 'EN',
CreatedOn: null,
};
}



resetDataSecondModal(priceCategoryNewOptionForm:NgForm){
priceCategoryNewOptionForm.reset();
this.CategoryTextBox.nativeElement.value= "";
this.TourTextBox.nativeElement.value = "";
this.LanguageTextBox.nativeElement.value = "";
}

 

sendPriceCategoryDetailsToModalPopUp(Price) {
this.priceDetails= Price    
}



deletePriceCategory(Price) {
this.priceCategoryService.deletePriceCategory(Price.Id , 'DeletePriceCategory').subscribe(data => {
this.displayLanguagesOnDataTable();
this.DisplayPriceCategoryAccordingToLang(this.Lang);
this.showSuccess('Price Category Deleted', 'Price Category Data Got Deleted');
});
}



ngOnDestroy(): void {
this.dtTrigger.unsubscribe();
}



showSuccess(display, Message) {
this.toastr.success(display , Message );
} 

}
