import { BrowserModule,Title  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SliderComponent } from './common/slider/slider.component';
import { HomeComponent } from './home/home.component';
import { OwlModule } from 'ngx-owl-carousel';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DestinationsComponent } from './destinations/destinations.component';
import { CountriesInDestinationComponent } from './countries-in-destination/countries-in-destination.component';
import { CountriesComponent } from './countries/countries.component';
import { ToursComponent } from './tours/tours.component';
import { SpecificTourComponent } from './specific-tour/specific-tour.component';
import {GroupByPipe} from './custom-pipes/group-by.pipe';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ToastrModule } from 'ngx-toastr';


export function HttpLoaderFactory(http: HttpClient) {
return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
declarations: [
AppComponent,
HeaderComponent,
FooterComponent,
SliderComponent,
HomeComponent,
DestinationsComponent,
CountriesInDestinationComponent,
CountriesComponent,
ToursComponent,
SpecificTourComponent,
GroupByPipe,
ContactUsComponent,
],


imports: [
BrowserModule,
AppRoutingModule,
OwlModule,
NgbModule,
CommonModule,
HttpClientModule,
NgxSpinnerModule,
FormsModule,
BrowserAnimationsModule,
TranslateModule.forRoot({
loader: {
provide: TranslateLoader,
useFactory: HttpLoaderFactory,
deps: [HttpClient]
}
}),
AgmCoreModule.forRoot({
// please get your own API key here:
// https://developers.google.com/maps/documentation/javascript/AIzaSyAbNVCXJcQGLuMdqkzN9XNU4cAbYUo3Ygc?hl=en
apiKey: 'AIzaSyAbNVCXJcQGLuMdqkzN9XNU4cAbYUo3Ygc'
}),
ToastrModule.forRoot({
timeOut: 4000,
positionClass: 'toast-top-right',
preventDuplicates: true,
})
],

providers: [Title],
bootstrap: [AppComponent]
})
export class AppModule { }
