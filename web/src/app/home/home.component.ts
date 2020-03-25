import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MouseEvent } from '@agm/core';
import { WebService } from '../services/web.service';
import { environment } from 'src/environments/environment';
import {Router, NavigationExtras} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  env = environment;
  Country:any = [];
  countryError:any;
  Languages = JSON.parse(sessionStorage.getItem('LanguageValue'));
  previous;
  markers: marker[] = [];
    // google maps zoom level
    zoom: number = 2;
  
    // initial center position for the map
    lat: number = 55.5815245;
    lng: number = 36.8251383;

  constructor(private spinner: NgxSpinnerService,
              private router: Router,
             private webservice: WebService) {      
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
    }, 3000);
  }

  ngOnInit() {
    this.DisplayDestinationImages();
     
  }

  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`)
  // }

  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
    if (this.previous) {
      this.previous.close();
  }
  this.previous = infoWindow;
}

// onMouseOut(infoWindow, $event: MouseEvent) {
//     infoWindow.close();
// }
ShowCountries(Destination){
  // console.log(Destination, '=all destination');
  sessionStorage.setItem('Destinations', JSON.stringify(Destination));
  this.router.navigate(['/countries-in-destinations']);
}

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });

  // }  
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  

  FindCountry(searchCountry){
    if(this.Languages == null){
      this.webservice.SearchCountry(searchCountry,'SearchCountry', 'EN')
      .subscribe(data => {
       this.Country = data;
       if(this.Country == ''){
        this.countryError = "Sorry, We Did not Find Your Destination...";
       }else {
        sessionStorage.setItem('Country',JSON.stringify(this.Country));
        this.router.navigate(['/countries']);
       }  
      });
    } else {
      this.webservice.SearchCountry(searchCountry,'SearchCountry', this.Languages)
      .subscribe(data => {
       this.Country = data;
       if(this.Country== ''){
        this.countryError = "Sorry, We Did not Find Your Destination...";
       }else {
        sessionStorage.setItem('Country',JSON.stringify(this.Country));
        this.router.navigate(['/countries']);
       }
       
      });
    }
 
  }


DisplayDestinationImages(){
if(this.Languages == null){
this.webservice.getAllDestinationImagesByDefaultLanguage('DestinationImageslistByDefaultLanguage', 'EN')
.subscribe(data => {
for(var i = 0; i< data.length; i++) {
const DestinationDetails = {
Id: data[i].DestinationId,
LocationID: data[i].LocationID,
DestinationLocationID: data[i].DestinationLocationID,
lat: data[i].Latitude,
lng: data[i].Longitude,
draggable: true,
img: this.env.apiUrl + data[i].DestinationImage,
DestinationName: data[i].DestinationName,
};
this.markers.push(DestinationDetails);
}
});
} else {
this.webservice.getAllDestinationImagesLanguages('DestinationImageslistByLanguage', this.Languages)
.subscribe(data => {
let i = 0;
for(i = 0; i< data.length; i++) {
const DestinationDetails = {
Id: data[i].DestinationId,
LocationID: data[i].LocationID,
DestinationLocationID: data[i].DestinationLocationID,
lat: data[i].Latitude,
lng: data[i].Longitude,
draggable: true,
img: this.env.apiUrl + data[i].DestinationImage,
DestinationName: data[i].DestinationName,
};
this.markers.push(DestinationDetails);
}
});
}
   
  }
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

