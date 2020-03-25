import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../services/web.service';
import { environment } from 'src/environments/environment';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-specific-tour',
  templateUrl: './specific-tour.component.html',
  styleUrls: ['./specific-tour.component.css']
})
export class SpecificTourComponent implements OnInit {
  env =environment;
  TourData:any = [];
  DaysData:any = [];
  TourTitle:any = [];
  message:any;
  CountryName:any = [];
  ProgramID:any = [];
  ProgramTitle:any = [];
  img:any = [];
  TourServices:any = [];
  TourTerms:any = [];
  Price:any = [];
  public TourLocationID = parseInt(this.route.snapshot.paramMap.get('TourLocationID'), 10);
  Languages = JSON.parse(sessionStorage.getItem('LanguageValue'));
  constructor(private route: ActivatedRoute,private webservice: WebService) { }

ngOnInit() {
this.DisplayTourDetails();
}

DisplayTourDetails(){
if(this.Languages == null){
this.webservice.GetAllTourDetailsInSpecificTours('GetAllTourDetailsInSpecificTours','EN',this.TourLocationID)
.subscribe(result => {
this.TourData =  result;
this.img = this.env.apiUrl + result[0].TourImages;
this.TourTitle = result[0].TourTitle;
this.CountryName = result[0].CountryName;
this.ProgramTitle = result[0].ProgramTitle;
this.ProgramID = result[0].RealProgramID;
this.webservice.getDaysDetailsByProgramID ('GetDaysDetailsByProgramID' ,'EN',this.ProgramID)
.subscribe(result => {
if(result != ''){
this.DaysData= result; 
}else {
this.message = 'Sorry No Data Found'
}
});
this.webservice.getTourServicesInSpecificTour('GetTourServicesInSpecificTour','EN',this.TourLocationID)
.subscribe(data=>{
this.TourServices = data;
});
this.webservice.getTourTermsInSpecificTour('GetTourTermsInSpecificTour','EN',this.TourLocationID)
.subscribe(data=>{
this.TourTerms = data;
});
this.webservice.getPriceCategoryDetailsInSpecificTour('GetPriceCategoryDetailsInSpecificTour', 'EN', this.TourLocationID)
.subscribe(Price =>{
this.Price = Price;
console.log(this.Price, 'Price');
});
});
}else {
this.webservice.GetAllTourDetailsInSpecificTours('GetAllTourDetailsInSpecificTours',this.Languages,this.TourLocationID)
.subscribe(result => {
this.TourData =  result;
this.img = this.env.apiUrl + result[0].TourImages;
this.TourTitle = result[0].TourTitle;
this.CountryName =  result[0].CountryName;
this.ProgramTitle = result[0].ProgramTitle;
this.ProgramID = result[0].RealProgramID;
this.webservice.getDaysDetailsByProgramID ('GetDaysDetailsByProgramID' , this.Languages, this.ProgramID)
.subscribe(result => {
if(result != ''){
this.DaysData= result;
}else {
this.message = 'Sorry No Data Found'
}
});
this.webservice.getTourServicesInSpecificTour('GetTourServicesInSpecificTour',this.Languages,this.TourLocationID)
.subscribe(data=>{
this.TourServices = data;
});
this.webservice.getTourTermsInSpecificTour('GetTourTermsInSpecificTour',this.Languages,this.TourLocationID)
.subscribe(data=>{
this.TourServices = data;
console.log(this.TourServices, 'Tour Services');
});
this.webservice.getTourTermsInSpecificTour('GetTourTermsInSpecificTour',this.Languages,this.TourLocationID)
.subscribe(data=>{
this.TourTerms = data;
console.log(this.TourTerms, 'Tour Services');
});
this.webservice.getPriceCategoryDetailsInSpecificTour('GetPriceCategoryDetailsInSpecificTour', this.Languages, this.TourLocationID)
.subscribe(Price =>{
this.Price = Price;
console.log(this.Price, 'Price');
});
});  
}
}
}
