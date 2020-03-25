// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// Dashboard Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoComponent } from './logo/logo.component';
import { SliderComponent } from './slider/slider.component';


import { DestinationComponent } from './destination/destination.component';
import { DestinationImagesComponent } from './destination-images/destination-images.component';
import { CountryComponent } from './country/country.component';
import { CountryImagesComponent } from './country-images/country-images.component';
import { CountryAttractionComponent } from './country-attraction/country-attraction.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
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
import { TourServicesComponent } from './tour/tour-services/tour-services.component';
import { LanguagesComponent } from './languages/languages.component';
import { TourTermsComponent } from './tour/tour-terms/tour-terms.component';
import { ProgramComponent } from './tour/program/program.component';
import { ProgramDaysComponent } from './tour/program-days/program-days.component';



export const AdminRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
           title: 'Dashboard'
        }
    },
    {
        path: 'languages',
        component: LanguagesComponent,
        data: {
            title: 'Languages'
         }
    },
    {
        path: 'destination',
        component: DestinationComponent,
        data: {
            title: 'Destination'
         }
    },
    {
        path: 'destination-image',
        component: DestinationImagesComponent,
        data: {
            title: 'Destination-Image'
         }
    },
    {
        path: 'country',
        component: CountryComponent,
        data: {
            title: 'Country'
         }
    },
    {
        path: 'country-image',
        component: CountryImagesComponent,
        data: {
            title: 'Country-Image'
         }
    },
    {
        path: 'country-attraction',
        component: CountryAttractionComponent,
        data: {
            title: 'Country-Attraction'
         }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            title: 'Profile'
         }
    },
    {
        path: 'header',
        component: HeaderComponent,
        data: {
            title: 'Header'
         }
    },
 

    {
        path: 'slider',
        component: SliderComponent,
        data: {
           title: 'slider'
        },
        
    },
    {
        path: 'logo',
        component: LogoComponent,
        data: {
           title: 'logo'
        }
        
    },
    {
        path: 'city-details',
        component: CityDetailsComponent,
        data: {
           title: 'logo'
        }
        
    },
    {
        path: 'city-images',
        component: CityImagesComponent,
        data: {
           title: 'logo'
        }
        
    },
    {
        path: 'hotel-details',
        component: HotelDetailsComponent,
        data: {
           title: 'logo'
        }
        
    },
    {
        path: 'hotel-images',
        component: HotelImagesComponent,
        data: {
           title: 'Hotel Images'
        }
        
    },
    {
        path: 'category-details',
        component: CategoryDetailsComponent,
        data: {
           title: 'Category-Details'
        }
        
    },
    {
        path: 'price-category',
        component: PriceCategoryComponent,
        data: {
           title: 'Price Category'
        }
        
    },
    {
        path: 'tour-packages',
        component: TourPackagesComponent,
        data: {
           title: 'Tour Packages'
        }
        
    },
    {
        path: 'tour-program',
        component: TourProgramComponent,
        data: {
           title: 'Tour Program'
        }
        
    },
    {
        path: 'tour-images',
        component: TourImagesComponent,
        data: {
           title: 'Tour Images'
        }
        
    },
    {
        path: 'tour',
        component: TourComponent,
        data: {
           title: 'Tour'
        }
        
    },
    {
        path: 'tour-services',
        component: TourServicesComponent,
        data: {
           title: 'Tour-Services'
        }

    },
    {
        path: 'tour-terms',
        component: TourTermsComponent,
        data: {
           title: 'Tour-Terms'
        }

    },
    {
        path: 'footer-contact-info',
        component: FooterContactInfoComponent,
        data: {
           title: 'Footer_Contact-Info'
        }
        
    },
    {
        path: 'footer-blog-posts',
        component: FooterBlogPostsComponent,
        data: {
           title: 'Footer_Blog_Posts'
        }
        
    },
    {
        path: 'footer-description',
        component: FooterDescriptionComponent,
        data: {
           title: 'Footer_Description'
        }
        
    },
    {
        path: 'footer-tags',
        component: FooterTagsComponent,
        data: {
           title: 'Footer_Tags'
        }
        
    },

    {
        path: 'programs',
        component: ProgramComponent,
        data: {
           title: 'Programs'
        }
        
    },

    {
        path: 'program-days',
        component: ProgramDaysComponent,
        data: {
           title: 'Programs - Days'
        }
        
    },
 
 
   
];

// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 


