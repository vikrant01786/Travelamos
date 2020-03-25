import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/services/web.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit {
env =environment;
Languages = JSON.parse(sessionStorage.getItem('LanguageValue'));
TourCarouselImagesData: any = [];
ShowImage:any=[];
image: any;
event_list = [];
upcoming_events =  this.event_list.filter( event => event.eventStartDate > new Date());
past_events = this.event_list.filter(event => event.eventEndingDate < new Date());
current_events =  this.event_list.filter( event => (event.eventStartDate >= new Date() && (event.eventEndingDate <= new Date())));

constructor(private webservice: WebService,private spinner: NgxSpinnerService) {
this.spinner.show();
setTimeout(() => {
this.spinner.hide();
}, 3000);  
}


ngOnInit() {  
this.displayTourImagesDataForCarousel();
}

 

displayTourImagesDataForCarousel(){
if(this.Languages == null){
this.webservice.getAllTourCarouselImagesByDefault('TourCarouselImageslistByDefault' ,'EN')
.subscribe(data => {
let i = 0;
for(i = 0; i< data.length; i++) {
const TourDetails = {
event: data[i].TourTitle,
eventLocation: data[i].TourLocation,
eventDescription:data[i].TourTitle,
img: this.env.apiUrl + data[i].TourImages,
eventStartDate: new Date('2018/05/20'),
eventEndingDate: new Date('2018/05/24'),
FrontPage: data[i].FrontPage,
DurationInDays: data[i].DurationInDays,
DurationInNights: data[i].DurationInNights
};
this.event_list.push(TourDetails);
}
});
}else {
this.webservice.getAllTourCarouselImages('TourCarouselImageslistByLanguage',this.Languages)
.subscribe(data => {
let i = 0;
for(i = 0; i< data.length; i++) {
const TourDetails = {
event: data[i].TourTitle,
eventLocation: data[i].TourLocation,
eventDescription:data[i].TourTitle,
img: this.env.apiUrl + data[i].TourImages,
eventStartDate: new Date('2018/05/20'),
eventEndingDate: new Date('2018/05/24'),
FrontPage: data[i].FrontPage,
DurationInDays: data[i].DurationInDays,
DurationInNights: data[i].DurationInNights
};
this.event_list.push(TourDetails);
}
});
}
}
}
