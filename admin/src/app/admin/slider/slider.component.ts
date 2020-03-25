// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Slider } from 'src/app/models/sliderimages.module';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {SliderService} from 'src/app/services/slider.service';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
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
  slider: Slider = {
    Id: null,
    SliderImages: '',
    SliderImagesLink: '',
    SliderCaptionInEnglish1: '',
    SliderCaptionInEnglish2: '',
    SliderCaptionInSpanish1: '',
    SliderCaptionInSpanish2: '',
    CreatedOn: null
  }

  SliderImageEvent: any = [];
  SliderImagesData: any = [];
  SliderImageDetails:any = [];
  image: any = [];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private http: HttpClient,
              private sliderService: SliderService) { }

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
      this.displaySliderImages();
  }


  displaySliderImages(){
    this.sliderService.getAllSliderImages('SliderImagesList')
        .subscribe(data => {
         this.SliderImagesData = data; 
         console.log(this.SliderImagesData, '= Slider images data')
         this.dtTrigger.next();
             });
  }


  onUpload(file: FileQueueObject) {
      this.SliderImageEvent = file.file;    
  }
  update(SliderImagesForm: NgForm){
    if(this.SliderImageEvent.length == 0){
      this.sliderService.saveAllAdminData(this.slider, 'SaveSliderImages').subscribe(data => {
        this.slider = data;
        if (data.insertId === 0 ) {
          this.showSuccess('Slider Image Uploaded', 'Slider Data Got Updated');
         

        } else {
          this.showSuccess('Slider Image Uploaded', 'Slider Data Got Saved');
        }
        SliderImagesForm.reset();
        this.displaySliderImages();
        this.dtTrigger.next();
     
      }, (err) => {
        console.log(err);
      });
    }else {
      const formData = new FormData();
      formData.append('file', this.SliderImageEvent);
      this.http.post<any>(this.url, formData).subscribe(
        (res) => {
          console.log(res , 'res');
           // mapped path to destination object   'uploads' + '/' + data.DestinationImage;
          this.slider.SliderImages= res.filename;
          // if path of image returned after upload  has a value then below if condition works
          if (this.slider.SliderImages != null) {
            this.sliderService.saveAllAdminData(this.slider, 'SaveSliderImages').subscribe(data => {
              this.slider = data;
              if (data.insertId === 0 ) {
                this.showSuccess('Slider Image Uploaded', 'Slider Data Got Updated');
               

              } else {
                this.showSuccess('Slider Image Uploaded', 'Slider Data Got Saved');
              }
              SliderImagesForm.reset();
              this.displaySliderImages();
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

  onsubmit(SliderImagesForm: NgForm) {
    if(this.SliderImageEvent.length == 0){
      this.sliderService.saveAllAdminData(this.slider, 'SaveSliderImages').subscribe(data => {
        this.slider = data;
        if (data.insertId === 0 ) {
          this.showSuccess('Slider Image Uploaded', 'Slider Data Got Updated');
         

        } else {
          this.showSuccess('Slider Image Uploaded', 'Slider Data Got Saved');
        }
        SliderImagesForm.reset();
        this.displaySliderImages();
        this.dtTrigger.next();
     
      }, (err) => {
        console.log(err);
      });
    }else {
      const formData = new FormData();
      formData.append('file', this.SliderImageEvent);
      this.http.post<any>(this.url, formData).subscribe(
        (res) => {
          console.log(res , 'res');
           // mapped path to destination object   'uploads' + '/' + data.DestinationImage;
          this.slider.SliderImages= res.filename;
          // if path of image returned after upload  has a value then below if condition works
          if (this.slider.SliderImages != null) {
            this.sliderService.saveAllAdminData(this.slider, 'SaveSliderImages').subscribe(data => {
              this.slider = data;
              if (data.insertId === 0 ) {
                this.showSuccess('Slider Image Uploaded', 'Slider Data Got Updated');
               

              } else {
                this.showSuccess('Slider Image Uploaded', 'Slider Data Got Saved');
              }
              SliderImagesForm.reset();
              this.displaySliderImages();
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

  sendSliderImagesDetailsToModalPopUp(Slider){
    // console.log(Destination, 'modal pop up data');
    this.SliderImageDetails= Slider;
  }



  resetData(SliderImagesForm: NgForm){
    SliderImagesForm.reset();
    this.slider = {
      Id: null,
      SliderImages: '',
      SliderImagesLink: '',
      SliderCaptionInEnglish1: '',
      SliderCaptionInEnglish2: '',
      SliderCaptionInSpanish1: '',
      SliderCaptionInSpanish2: '',
      CreatedOn: null
    }

  }

  editSliderImages(Slider) {
    this.slider = Object.assign({}, Slider);
    this.image = this.env.apiUrl + this.slider.SliderImages;
  }


  deleteSliderImages(Slider){
    this.sliderService.deleteSliderImages(Slider.Id , 'DeleteSliderImage').subscribe(data => {
      this.displaySliderImages();
       this.showSuccess('Slider Image Deleted', 'Slider Image Data Got Deleted');
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

