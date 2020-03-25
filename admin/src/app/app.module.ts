import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { TemplateModule } from './template/template.module';
import { TemplateService } from './shared/services/template.service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

//toasterModule
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

// Layout Component
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';

// Routing Module
import { AppRoutes } from './app.routing';

// App Component
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login.component';
import { HomeComponent } from './website/home.component';
import {FormsModule} from '@angular/forms'
import {HttpClientModule, HttpClient} from '@angular/common/http';

//data table 
import { DataTablesModule } from 'angular-datatables';

//spinner
import { NgxSpinnerModule } from "ngx-spinner";

//file upload
import { ImageUploaderModule } from 'ngx-image-uploader';

// import { GroupByPipe } from '../app/admin/custom-pipe/group-by.pipe';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
  }

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes, { useHash: true }),
        SharedModule,
        TemplateModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ImageUploaderModule,
        DataTablesModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            timeOut: 4000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
          }),
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          })
    ],
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        AuthenticationLayoutComponent,
        LoginComponent,
        HomeComponent,

        // GroupByPipe
        
    ],
    providers: [TemplateService],
    bootstrap: [AppComponent]
})


export class AppModule { }
