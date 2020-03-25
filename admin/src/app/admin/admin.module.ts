// |________________________________________________
// | © 2019 Navient Pvt.Ltd All Rights Reserved    |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeConstants } from '../shared/config/theme-constant';

import { AdminRoutes } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoComponent } from './logo/logo.component';
import { SliderComponent } from './slider/slider.component';

import {FormsModule} from '@angular/forms'
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { DestinationComponent } from './destination/destination.component';
import { DestinationImagesComponent } from './destination-images/destination-images.component';
import { CountryComponent } from './country/country.component';
import { CountryImagesComponent } from './country-images/country-images.component';

import {CommonModule} from '@angular/common'
//data table 
import { DataTablesModule } from 'angular-datatables';
//translator
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

//spinner
import { NgxSpinnerModule } from "ngx-spinner";
import { CountryAttractionComponent } from './country-attraction/country-attraction.component';
import { ProfileComponent } from './profile/profile.component';

//header component
import { HeaderComponent } from './header/header.component';

// footer component
import { FooterContactInfoComponent } from './footer/footer-contact-info/footer-contact-info.component';
import { FooterBlogPostsComponent } from './footer/footer-blog-posts/footer-blog-posts.component';
import { FooterDescriptionComponent } from './footer/footer-description/footer-description.component';
import { FooterTagsComponent } from './footer/footer-tags/footer-tags.component';
import { CityDetailsComponent } from './city/city-details/city-details.component';
import { CityImagesComponent } from './city/city-images/city-images.component';
import { HotelDetailsComponent } from './hotel/hotel-details/hotel-details.component';
import { HotelImagesComponent } from './hotel/hotel-images/hotel-images.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { PriceCategoryComponent } from './categories/price-category/price-category.component';
import { TourPackagesComponent } from './tour/tour-packages/tour-packages.component';
import { TourProgramComponent } from './tour/tour-program/tour-program.component';
import { TourImagesComponent } from './tour/tour-images/tour-images.component';
import { TourComponent } from './tour/tour/tour.component';
import { ImageUploaderModule } from 'ngx-image-uploader';
import { TourServicesComponent } from './tour/tour-services/tour-services.component';
import { LanguagesComponent } from './languages/languages.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TourTermsComponent } from './tour/tour-terms/tour-terms.component';
import { ProgramComponent } from './tour/program/program.component';
import { ProgramDaysComponent } from './tour/program-days/program-days.component';
import { GroupByPipe } from './custom-pipes/group-by.pipe';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
  }

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes),
        FormsModule,
        HttpClientModule,
        DataTablesModule,
        CommonModule,
        NgxSpinnerModule,
        Ng2SearchPipeModule,
        ImageUploaderModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          })
    ],
    declarations: [
        DashboardComponent,
        LogoComponent,
        SliderComponent,
        DestinationComponent,
        DestinationImagesComponent,
        CountryComponent,
        CountryImagesComponent,
        CountryAttractionComponent,
        ProfileComponent,
        HeaderComponent,
        FooterContactInfoComponent,
        FooterBlogPostsComponent,
        FooterDescriptionComponent,
        FooterTagsComponent,
        CityDetailsComponent,
        CityImagesComponent,
        HotelDetailsComponent,
        HotelImagesComponent,
        CategoryDetailsComponent,
        PriceCategoryComponent,
        TourPackagesComponent,
        TourProgramComponent,
        TourImagesComponent,
        TourComponent,
        TourServicesComponent,
        LanguagesComponent,
        TourTermsComponent,
        ProgramComponent,
        ProgramDaysComponent,
        GroupByPipe,

        ],
    providers: [
        ThemeConstants
    ]
})
export class AdminModule { }
// |________________________________________________
// | © 2019 Navient Pvt.Ltd All Rights Reserved    |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
