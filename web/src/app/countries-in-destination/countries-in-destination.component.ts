import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries-in-destination',
  templateUrl: './countries-in-destination.component.html',
  styleUrls: ['./countries-in-destination.component.css']
})
export class CountriesInDestinationComponent implements OnInit {
env = environment;
previous;
Destination = JSON.parse(sessionStorage.getItem('Destinations'));
Languages = JSON.parse(sessionStorage.getItem('LanguageValue'));
CountryData:any = [];
countryLocation:any;
AllCountryData:any = [];
DestinationImage:any;
DestinationTitle: any;
DestinationDescription:any;
// google maps zoom level
zoom: number = 2;
  
// initial center position for the map
lat: number = 51.673858;
lng: number = 7.815982;
markers: marker[] = [];
constructor(private webservice: WebService,private router: Router,) { }

ngOnInit() {
this.DisplayAllCountriesByDestinationId();
this.DisplayDestinationTitle();
}


onMouseOver(infoWindow, $event: MouseEvent) {
infoWindow.open();
if (this.previous) {
this.previous.close();
}
this.previous = infoWindow;
}


ShowCountries(Country){
sessionStorage.setItem('Country', JSON.stringify(Country));
this.router.navigate(['/countries']);
}


DisplayDestinationTitle(){
if(this.Languages == null){
this.webservice.getDestinationTitle('getDestinationTitle', 'EN',this.Destination.DestinationLocationID)
.subscribe(data =>{ 
this.DestinationTitle = data[0].DestinationName;
this.DestinationDescription = data[0].HomeDescription;
this.DestinationImage = data[0].DestinationImage;
});
}else {
this.webservice.getDestinationTitle('getDestinationTitle', this.Languages,this.Destination.DestinationLocationID)
.subscribe(data =>{
this.DestinationTitle = data[0].DestinationName;
this.DestinationDescription = data[0].HomeDescription;
this.DestinationImage = data[0].DestinationImage;

});
}
}


 
DisplayAllCountriesByDestinationId(){
if(this.Languages == null){
this.webservice.getAllCountriesInDestinationPageByDestinationLocationIDAndLanguage('GetCountriesByDestinationLocationAndLanguage','EN',this.Destination.DestinationLocationID)
.subscribe(data => {
this.CountryData = data;
for(var i =0 ; i< data.length; i++){
const CountryDetails ={
Id: data[i].Id,
RealCountryLocationID: data[i].RealCountryLocationID,
lat:data[i].Latitude,
lng:data[i].Longitude,
draggable: true,
img: this.env.apiUrl + data[i].CountryImage,
CountryImage: data[i].CountryImage,
CountryName: data[i].CountryName,
HomeDescription: data[i].HomeDescription,
HomeTitle: data[i].HomeTitle,
ImageDescription: data[i].ImageDescription
};
this.markers.push(CountryDetails);
}
}); 
}else {
this.webservice.getAllCountriesInDestinationPageByDestinationLocationIDAndLanguage('GetCountriesByDestinationLocationAndLanguage',this.Languages,this.Destination.DestinationLocationID)
.subscribe(data => {
this.CountryData = data;
for(var i =0 ; i< data.length; i++){
const CountryDetails ={
Id: data[i].Id,
RealCountryLocationID: data[i].RealCountryLocationID,
lat:data[i].Latitude,
lng:data[i].Longitude,
draggable: true,
img: this.env.apiUrl + data[i].CountryImage,
CountryName: data[i].CountryName,
HomeDescription: data[i].HomeDescription,
HomeTitle: data[i].HomeTitle,
ImageDescription: data[i].ImageDescription
};
this.markers.push(CountryDetails);
}
});
}
}


StoreCountryDetailsInLocalStorage(Country){
sessionStorage.setItem('Country',JSON.stringify(Country));
}


clickedMarker(label: string, index: number) {
console.log(`clicked the marker: ${label || index}`)
}


markerDragEnd(m: marker, $event: MouseEvent) {
  console.log('dragEnd', m, $event);
}
}

interface marker {
lat: number;
lng: number;
label?: string;
draggable: boolean;
}
