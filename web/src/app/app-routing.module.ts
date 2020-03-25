import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { CountriesInDestinationComponent } from './countries-in-destination/countries-in-destination.component';
import { CountriesComponent } from './countries/countries.component';
import { ToursComponent } from './tours/tours.component';
import { SpecificTourComponent } from './specific-tour/specific-tour.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


const routes: Routes = [
{
  path: '',
  component: HomeComponent,
},

{
  path: 'destinations',
  component: DestinationsComponent,
},

{
  path: 'countries-in-destinations',
  component: CountriesInDestinationComponent
},

{
  path: 'countries',
  component: CountriesComponent
}, 

{ 
  path: 'tours',
  component: ToursComponent,
  
},

{ 
  path: 'specific-tour/:TourLocationID',
  component: SpecificTourComponent
},

{ 
  path: 'contact-us',
  component: ContactUsComponent
}
];

@NgModule({
imports: [ RouterModule.forRoot(routes, {useHash: true,
scrollPositionRestoration: 'enabled', // Add options right here
})],
exports: [RouterModule]
})

export class AppRoutingModule { }
