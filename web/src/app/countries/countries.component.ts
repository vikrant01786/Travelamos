import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WebService } from '../services/web.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
env= environment;
CountryData:any = [];
HotelData:any = [];
CityData:any = [];
hotel:any= {};
CountryAttractionImages: any = [];
CountryDescription:any;
Country = JSON.parse(sessionStorage.getItem('Country'));
CountryNameTitle:any;
Languages = JSON.parse(sessionStorage.getItem('LanguageValue'));
img : any= [];
show = false;
id:any;
selectedButton = {}
selectedButtonCity = {};



constructor(private webservice: WebService) { }

ngOnInit() {
this.DisplayCardsInScript();
this.DisplayCountryDataFromSessionStorage();   
var div_top = $('.menu-1').offset().top;
$(window).scroll(function() {
var window_top = $(window).scrollTop() - 0;
if (window_top > div_top) {
if (!$('.menu-1').is('.sticky')) {
$('.menu-1').addClass('sticky');
}
} else {
$('.menu-1').removeClass('sticky');
}
});



$(document).ready(function(){
  var zindex = 10;
  
  $("div.card").click(function(e){
    e.preventDefault();
 
    var isShowing = false;
 
    if ($(this).hasClass("d-card-show")) {
      isShowing = true
    }
 
    if ($("div.dashboard-cards").hasClass("showing")) {
      $("div.card.d-card-show")
        .removeClass("d-card-show");
 
      if (isShowing) {
        $("div.dashboard-cards")
          .removeClass("showing");
      } else {
        $(this)
          .css({zIndex: zindex})
          .addClass("d-card-show");
 
      }
 
      zindex++;
 
    } else {
      $("div.dashboard-cards")
        .addClass("showing");
      $(this)
        .css({zIndex:zindex})
        .addClass("d-card-show");
 
      zindex++;
    }
    
  });
});

}




Expand(Hotel){
console.log(Hotel)
this.id = Hotel.Id;
this.show = !this.show;
this.selectedButton[Hotel.Id]= !this.selectedButton[Hotel.Id];
console.log(this.selectedButton[Hotel.Id], 'toggle');

}

ExpandCity(City){
  console.log(City)
  this.id = City.Id;
  this.show = !this.show;
  this.selectedButtonCity[City.Id]= !this.selectedButtonCity[City.Id];
  console.log(this.selectedButtonCity[City.Id], 'toggle');
}




DisplayCardsInScript(){
$(document).ready(function($){    
// Resize Height
function reh(e) {
$(e).css({'height':$(e).attr('height'),'overflow':'hidden'})
}
// Empty Height
function emh(e) {
$(e).css({'height':'250px','overflow':'auto'});
}
// Resize .lead (default height)
reh('.lead');
// Actions
// More: Lead
$('body').on('click', '.more-lead', function(){
emh($(this).siblings('.lead'));
$(this).html('<i class="fa fa-close"></i>').addClass('less-lead').removeClass('more-lead');
});
// Less: Lead
$('body').on('click', '.less-lead', function(){
reh($(this).siblings('.lead'));
$(this).html('<i class="fa fa-plus"></i>').addClass('more-lead').removeClass('less-lead');
});   
});
}



DisplayCountryDataFromSessionStorage(){
if(this.Languages == null){
if(this.Country.RealCountryLocationID){
this.webservice.getCountryByCountryLocationID('CountryByCountryLocationID','EN',this.Country.RealCountryLocationID)
.subscribe(data => {
this.CountryData = data;
this.CountryNameTitle = data[0].CountryName;
this.img = this.env.apiUrl + data[0].CountryImage;
this.CountryDescription = data[0].HomeDescription;
this.webservice.getAllHotelsByCountryLocationID('HotelsByCountryLocationID','EN', this.Country.RealCountryLocationID)
.subscribe(hotels=>{
this.HotelData= hotels;
});
this.webservice.getAllCitiesByCountryLocationID('CitiesByCountryLocationID','EN', this.Country.RealCountryLocationID)
.subscribe(Cities=>{
this.CityData= Cities;
console.log(this.CityData, 'hotel Data');
}); //
});
} else {
this.webservice.getCountryByCountryLocationID('CountryByCountryLocationID','EN',this.Country[0].RealCountryLocationID)
.subscribe(data => {
this.CountryData = data;
this.CountryNameTitle = data[0].CountryName;
this.img = this.env.apiUrl + data[0].CountryImage;
this.CountryDescription = data[0].HomeDescription;
this.webservice.getAllHotelsByCountryLocationID('HotelsByCountryLocationID','EN', this.Country[0].RealCountryLocationID)
.subscribe(hotels=>{
this.HotelData= hotels;
});
this.webservice.getAllCitiesByCountryLocationID('CitiesByCountryLocationID','EN', this.Country[0].RealCountryLocationID)
.subscribe(Cities=>{
this.CityData= Cities;
console.log(this.CityData, 'hotel Data');
}); 
});
}
}else {
if(this.Country.RealCountryLocationID){
this.webservice.getCountryByCountryLocationID('CountryByCountryLocationID',this.Languages,this.Country.RealCountryLocationID)
.subscribe(data => {
this.CountryData = data;
this.CountryNameTitle = data[0].CountryName;
this.img = this.env.apiUrl + data[0].CountryImage;
this.CountryDescription = data[0].HomeDescription;
this.webservice.getAllHotelsByCountryLocationID('HotelsByCountryLocationID', this.Languages, this.Country.RealCountryLocationID)
.subscribe(hotels=>{
this.HotelData= hotels;
console.log(this.HotelData, 'hotel Data');
});
this.webservice.getAllCitiesByCountryLocationID('CitiesByCountryLocationID', this.Languages, this.Country.RealCountryLocationID)
.subscribe(Cities=>{
this.CityData= Cities;
console.log(this.CityData, 'hotel Data');
});
});
} else {
this.webservice.getCountryByCountryLocationID('CountryByCountryLocationID',this.Languages,this.Country[0].RealCountryLocationID)
.subscribe(data => {
this.CountryData = data;
this.CountryNameTitle = data[0].CountryName;
this.img = this.env.apiUrl + data[0].CountryImage;
this.CountryDescription = data[0].HomeDescription;
this.webservice.getAllHotelsByCountryLocationID('HotelsByCountryLocationID', this.Languages, this.Country[0].RealCountryLocationID)
.subscribe(hotels=>{
this.HotelData= hotels;
console.log(this.HotelData, 'hotel Data');
});
this.webservice.getAllCitiesByCountryLocationID('CitiesByCountryLocationID', this.Languages, this.Country[0].RealCountryLocationID)
.subscribe(Cities=>{
this.CityData= Cities;
console.log(this.CityData, 'hotel Data');
});
});
} 
}
}



storeCountryDataFromSessionStorageToLocalStorage(){
localStorage.setItem('CountryLocationID', JSON.stringify(JSON.parse(sessionStorage.getItem('Country'))));
}
}