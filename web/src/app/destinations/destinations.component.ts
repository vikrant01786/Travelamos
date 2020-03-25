import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  env = environment;
  previous;
  countryCount:any=[];
  // google maps zoom level
  Languages = JSON.parse(sessionStorage.getItem('LanguageValue'));
  DestinationData:any = [];
  markers: marker[] = [];
  zoom: number = 2;
  
  // initial center position for the map
  lat: number = 55.5815245;
  lng: number = 36.8251383;
  constructor(private webservice: WebService,
              private router: Router,) { }

ngOnInit() {
this.DisplayDestinationsAccordingToLanguages();
}



onMouseOver(infoWindow, $event: MouseEvent) {
infoWindow.open();
if (this.previous) {
this.previous.close();
}
this.previous = infoWindow;
}

clickedMarker(label: string, index: number) {
console.log(`clicked the marker: ${label || index}`)
}


ShowCountriesWhenClickedOnMarker(Destination){
sessionStorage.setItem('Destinations', JSON.stringify(Destination));
this.router.navigate(['/countries-in-destinations']);
}

ShowCountriesWhenClickedOnImage(Destination){
const DestinationDetails = {
Id: Destination.Id,
LocationID: Destination.LocationID,
DestinationId:Destination.DestinationId,
DestinationLocationID:Destination.DestinationLocationID,
img:this.env.apiUrl + Destination.DestinationImage,
ImageDescription:Destination.ImageDescription,
LanguageValue: Destination.LanguageValue,
CreatedOn: Destination.CreatedOn,
DestinationName: Destination.DestinationName,
HomeTitle:Destination.HomeTitle,
HomeDescription:Destination.HomeDescription,
Longitude: Destination.Longitude,
Latitude:Destination.Latitude
};
sessionStorage.setItem('Destinations', JSON.stringify(DestinationDetails));
this.router.navigate(['/countries-in-destinations']);
}



StoreCountryDetailsInLocalStorage(Country){
sessionStorage.setItem('Country',JSON.stringify(Country));
}

DisplayDestinationsAccordingToLanguages(){
if(this.Languages == null){
this.webservice.GetAllDestinationsAccordingToLanguage('GetAllDestinationsAccordingToLanguage','EN')
.subscribe(data => {
this.DestinationData = data;
for(var i=0; i<data.length; i++){
const DestinationDetails = {
Id: data[i].Id,
DestinationLocationID: data[i].LocationID,
lat:data[i].Latitude,
lng:data[i].Longitude,
draggable: true,
img: this.env.apiUrl + data[i].DestinationImage,
DestinationName: data[i].DestinationName
};
this.markers.push(DestinationDetails);
this.webservice.getCountryCount('GetCountryCount', data[i].LocationID,this.Languages)
.subscribe(data=> {
this.countryCount = data;
});
}   
});
} else {
this.webservice.GetAllDestinationsAccordingToLanguage('GetAllDestinationsAccordingToLanguage',this.Languages)
.subscribe(data => {
this.DestinationData = data; 
for(var i=0; i<data.length; i++){
const DestinationDetails = {
Id: data[i].Id,
DestinationLocationID: data[i].LocationID,
lat:data[i].Latitude,
lng:data[i].Longitude,
draggable: true,
img: this.env.apiUrl + data[i].DestinationImage,
DestinationName: data[i].DestinationName
};
this.markers.push(DestinationDetails);
this.webservice.getCountryCount('GetCountryCount', data[i].LocationID,this.Languages)
.subscribe(data=> {
Array.prototype.push.apply(this.countryCount,data); 
console.log(this.countryCount);
});
}
});  
}
}
}




interface marker {
lat: number;
lng: number;
label?: string;
draggable: boolean;
}
