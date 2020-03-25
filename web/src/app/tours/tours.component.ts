import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
  
})
export class ToursComponent implements OnInit {
env = environment;
toursData:any= [];
Destn:any = [];
PackageID = 0;
event = 'Low';
Message:any;
SortedData:any = [];
PackageData:any = [];
DestinationData:any = [];
CountryLocationID = JSON.parse(localStorage.getItem('CountryLocationID'));
Country = JSON.parse(sessionStorage.getItem('Country'));
Languages = JSON.parse(sessionStorage.getItem('LanguageValue'));
constructor(private webservice: WebService,private router: Router) { }

ngOnInit() {
this.DisplayAllPackagesInDropDownList();
this.DisplayToursByPackages(this.PackageID);
this.SecondDisplayToursByPackageFunction(this.PackageID);
}


DisplayAllPackagesInDropDownList(){
if(this.Languages == null ){
this.webservice.getAllTourPackages('GetAllTourPackages','EN')
.subscribe(data=>{
this.PackageData = data;
});
}else {
this.webservice.getAllTourPackages('GetAllTourPackages',this.Languages)
.subscribe(data=>{
this.PackageData = data;
});
}
}



DisplayToursByPackages(PackageID){
this.PackageID = PackageID;
if(this.Languages == null){
if(this.CountryLocationID == null){
this.webservice.DisplayToursAccordingToPackages('GetToursByTourPackageID', 'EN',this.PackageID)
.subscribe(data=> { 
this.SortedData = data;
if(this.SortedData == ''){
this.Message = "No Tours Found Related To This Package,Please Choose a Different Package...!"
}
});
}else {
// bring all tours related to country locationID By English Language
if(this.Country.RealCountryLocationID){
this.webservice.GetAllToursByCountryLocationID('GetAllToursByCountryLocationID', 'EN',this.CountryLocationID.RealCountryLocationID ,this.PackageID)
.subscribe(data=> {
this.SortedData = data;
if(this.SortedData == ''){
this.Message = "No Tours Found Related To This Package,Please Choose a Different Package...!"
}
});
}else {
// if locationid comes in the form of array then  put [0]
this.webservice.GetAllToursByCountryLocationID('GetAllToursByCountryLocationID', 'EN',this.CountryLocationID[0].RealCountryLocationID ,this.PackageID)
.subscribe(data=> {
this.SortedData = data;
if(this.SortedData == ''){
this.Message = "No Tours Found Related To This Package,Please Choose a Different Package...!"
}
});
}
}
}else { 
if(this.CountryLocationID == null){
this.webservice.DisplayToursAccordingToPackages('GetToursByTourPackageID', this.Languages, this.PackageID)
.subscribe(data=> {
this.SortedData = data;
if(this.SortedData == ''){
this.Message = "No Tours Found Related To This Package,Please Choose a Different Package...!"
}
});
}else {
if(this.CountryLocationID.RealCountryLocationID){
this.webservice.GetAllToursByCountryLocationID('GetAllToursByCountryLocationID', this.Languages,this.CountryLocationID.RealCountryLocationID, this.PackageID)
.subscribe(data=> {
this.SortedData = data;
if(this.SortedData == ''){
this.Message = "No Tours Found Related To This Package,Please Choose a Different Package...!"
}
});
}else {
// if locationid comes in the form of array then  put [0]
this.webservice.GetAllToursByCountryLocationID('GetAllToursByCountryLocationID', this.Languages,this.CountryLocationID[0].RealCountryLocationID, this.PackageID)
.subscribe(data=> {
this.SortedData = data;
if(this.SortedData == ''){
this.Message = "No Tours Found Related To This Package,Please Choose a Different Package...!"
}
});
}
}
}
}



SecondDisplayToursByPackageFunction(PackageID){
this.PackageID = PackageID;
if(this.Languages == null){
if(this.CountryLocationID == null){
this.webservice.DisplayToursAccordingToPackages('GetToursByTourPackageID', 'EN',this.PackageID)
.subscribe(data=> { 
this.DestinationData = data;
this.DestinationData = this.DestinationData.sort((low, high) => low.PriceIndividual - high.PriceIndividual);
});
}else {
// bring country related specific data
if(this.Country.RealCountryLocationID){
this.webservice.GetAllToursByCountryLocationID('GetAllToursByCountryLocationID', 'EN',this.CountryLocationID.RealCountryLocationID ,this.PackageID)
.subscribe(data=> {
this.DestinationData = data;
this.DestinationData = this.DestinationData.sort((low, high) => low.PriceIndividual - high.PriceIndividual);
});
}else {
this.webservice.GetAllToursByCountryLocationID('GetAllToursByCountryLocationID', 'EN',this.CountryLocationID[0].RealCountryLocationID ,this.PackageID)
.subscribe(data=> {
this.DestinationData = data;
this.DestinationData = this.DestinationData.sort((low, high) => low.PriceIndividual - high.PriceIndividual);
});
}
} 
}else {
if(this.CountryLocationID == null){
this.webservice.DisplayToursAccordingToPackages('GetToursByTourPackageID', this.Languages, this.PackageID)
.subscribe(data=> {
this.DestinationData = data;
this.DestinationData = this.DestinationData.sort((low, high) => low.PriceIndividual - high.PriceIndividual);
});
}else {
//bring country related specific data
if(this.CountryLocationID.RealCountryLocationID){
this.webservice.GetAllToursByCountryLocationID('GetAllToursByCountryLocationID', this.Languages,this.CountryLocationID.RealCountryLocationID, this.PackageID)
.subscribe(data=> {
this.DestinationData = data;
this.DestinationData = this.DestinationData.sort((low, high) => low.PriceIndividual - high.PriceIndividual);
});
}else {
this.webservice.GetAllToursByCountryLocationID('GetAllToursByCountryLocationID', this.Languages,this.CountryLocationID[0].RealCountryLocationID, this.PackageID)
.subscribe(data=> {
this.DestinationData = data;
this.DestinationData = this.DestinationData.sort((low, high) => low.PriceIndividual - high.PriceIndividual);
});
}
} 
}
}



Sort(event: any) {
switch (event.target.value) {
case "Low":
{
this.SecondDisplayToursByPackageFunction(this.PackageID);
this.SortedData = this.DestinationData
this.SortedData = this.SortedData.sort((low, high) => low.PriceIndividual - high.PriceIndividual);
break;
}
case "High":
{
this.SecondDisplayToursByPackageFunction(this.PackageID);
this.SortedData = this.DestinationData
this.SortedData= this.SortedData.sort((low, high) => high.PriceIndividual - low.PriceIndividual);
break;
}
case "Short":
{
this.SecondDisplayToursByPackageFunction(this.PackageID);
this.SortedData = this.DestinationData
this.SortedData= this.SortedData.sort((low, high) => low.DurationInDays - high.DurationInDays);
break;
}
case "Long":
{
this.SecondDisplayToursByPackageFunction(this.PackageID);
this.SortedData = this.DestinationData
this.SortedData= this.SortedData.sort((low, high) => high.DurationInDays - low.DurationInDays);
break;
}
default: {
this.DisplayToursByPackages(this.PackageID);
this.SortedData = this.DestinationData
this.SortedData = this.SortedData.sort((low, high) => low.PriceIndividual - high.PriceIndividual);
break;
}
}
return this.SortedData;
}


f(Destination){
console.log(Destination, 'Destination Data');
}

}
