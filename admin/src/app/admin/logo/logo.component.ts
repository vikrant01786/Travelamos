// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Logo } from 'src/app/models/logo.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import {LogoService} from 'src/app/services/logo.service';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  env = environment;
  private url= this.env.apiUrl + 'file';
  options: ImageUploaderOptions = {
    thumbnailHeight: 200,
    thumbnailWidth: 400,
    autoUpload: true,
    uploadUrl: this.env.apiUrl + 'file',
    allowedImageTypes: ['image/png', 'image/jpeg'],
    maxImageSize: 3
};

  logo: Logo = {
    Id: null,
    LogoImages: '',
    CreatedOn: null
  };

  LogoImageEvent: any= [];
  LogoImageDetails: any = [];
  LogoImagesData: any = [];
  image: any = [];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private http: HttpClient,
              private logoService: LogoService) { }

  ngOnInit() {

      /** spinner starts on init */
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
 
 
      this.dtOptions = {
       pagingType: 'full_numbers',
       retrieve: true,
       processing: true,
       dom: 'Bfrtip',
       colReorder: true,
      buttons: [
       'colvis',
       'copy',
       'print',
       'excel',
       'csv'
     ],
     select: true, 
     };

     this.image = null;
     this.displayLogoImages();
  }

  displayLogoImages(){
    this.logoService.getAllLogoImages('LogoImagesList')
        .subscribe(data => {
         this.LogoImagesData = data; 
        //  console.log(this.LogoImagesData, '= Logo images data')
         this.dtTrigger.next();
             });
  }

  onUpload(file: FileQueueObject) {
      this.LogoImageEvent = file.file; 
  }

  update(LogoImagesForm: NgForm){
    if(this.LogoImageEvent.length == 0){
      this.logoService.saveAllAdminData(this.logo, 'SaveLogo').subscribe(data => {
        this.logo = data;
        if (data.insertId === 0 ) {
          this.showSuccess('Logo Image Uploaded', 'Logo Data Got Updated');
         

        } else {
          this.showSuccess('Logo Image Uploaded', 'Logo Data Got Saved');
        }
        LogoImagesForm.reset();
        this.displayLogoImages();
        this.dtTrigger.next();
     
      }, (err) => {
        console.log(err);
      });
    }else {

      const formData = new FormData();
      formData.append('file', this.LogoImageEvent);
      this.http.post<any>(this.url, formData).subscribe(
        (res) => {
          console.log(res , 'res');
           // mapped path to destination object   'uploads' + '/' + data.DestinationImage;
          this.logo.LogoImages= res.filename;
          // if path of image returned after upload  has a value then below if condition works
          if (this.logo.LogoImages != null) {
            this.logoService.saveAllAdminData(this.logo, 'SaveLogo').subscribe(data => {
              this.logo = data;
              if (data.insertId === 0 ) {
                this.showSuccess('Logo Image Uploaded', 'Logo Data Got Updated');
               

              } else {
                this.showSuccess('Logo Image Uploaded', 'Logo Data Got Saved');
              }
              LogoImagesForm.reset();
              this.displayLogoImages();
              this.dtTrigger.next();
           
            }, (err) => {
              console.log(err);
            });
          } 
          
        },
        (err) =>{
          console.log(err);
          this.showFailure('Image Uploading failed', 'Please Check or Reinsert Image Again');
        } 
      );     
    }
  }


  onsubmit(LogoImagesForm: NgForm) {
    if(this.LogoImageEvent.length == 0){
      this.logoService.saveAllAdminData(this.logo, 'SaveLogo').subscribe(data => {
        this.logo = data;
        if (data.insertId === 0 ) {
          this.showSuccess('Logo Image Uploaded', 'Logo Data Got Updated');
         

        } else {
          this.showSuccess('Logo Image Uploaded', 'Logo Data Got Saved');
        }
        LogoImagesForm.reset();
        this.displayLogoImages();
        this.dtTrigger.next();
     
      }, (err) => {
        console.log(err);
      });
    }else {
      const formData = new FormData();
      formData.append('file', this.LogoImageEvent);
      this.http.post<any>(this.url, formData).subscribe(
        (res) => {
          console.log(res , 'res');
           // mapped path to destination object   'uploads' + '/' + data.DestinationImage;
          this.logo.LogoImages= res.filename;
          // if path of image returned after upload  has a value then below if condition works
          if (this.logo.LogoImages != null) {
            this.logoService.saveAllAdminData(this.logo, 'SaveLogo').subscribe(data => {
              this.logo = data;
              if (data.insertId === 0 ) {
                this.showSuccess('Logo Image Uploaded', 'Logo Data Got Updated');
               

              } else {
                this.showSuccess('Logo Image Uploaded', 'Logo Data Got Saved');
              }
              LogoImagesForm.reset();
              this.displayLogoImages();
              this.dtTrigger.next();
           
            }, (err) => {
              console.log(err);
            });
          } 
          
        },
        (err) =>{
          console.log(err);
          this.showFailure('Image Uploading failed', 'Please Check or Reinsert Image Again');
        } 
      );     
      
    }
   
  }

  sendLogoImagesDetailsToModalPopUp(Logo){
    // console.log(Destination, 'modal pop up data');
    this.LogoImageDetails= Logo;
  }



  resetData(LogoImagesForm: NgForm){
    LogoImagesForm.reset();
    this.logo = {
      Id: null,
      LogoImages: '',
      CreatedOn: null
    };

  }


  editLogoImages(Logo) {
    this.logo = Object.assign({}, Logo);
    this.image = this.env.apiUrl + this.logo.LogoImages;
  }

  deleteLogoImages(Logo){
    this.logoService.deleteLogoImages(Logo.Id , 'DeleteLogoImage').subscribe(data => {
      this.displayLogoImages();
       this.showSuccess('Logo Image Deleted', 'Logo Image Data Got Deleted');
      });
   }

  
  showSuccess(display, Message) {
    this.toastr.success(display , Message );
  }
  showFailure(display, Message) {
    this.toastr.error(display , Message );
  }

}
// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

