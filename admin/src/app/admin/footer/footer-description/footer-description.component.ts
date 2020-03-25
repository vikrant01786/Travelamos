// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Footer_Description } from 'src/app/models/footer_description.model';
import {FooterDescriptionService} from 'src/app/services/footer-description.service';

@Component({
  selector: 'app-footer-description',
  templateUrl: './footer-description.component.html',
  styleUrls: ['./footer-description.component.css']
})
export class FooterDescriptionComponent implements OnInit {

description: Footer_Description = {
  Id: null,
  DescriptionInEnglish: '',
  DescriptionInSpanish: '',
  FacebookLink: '',
  TwitterLink: '',
  CreatedOn: null
}
descriptionData: any= [];
descriptionDetails: any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private descriptionservice: FooterDescriptionService) { }

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

            this.displayDescription();
  }
  

  displayDescription(){
    //display Country Lists 
    this.descriptionservice.getAllDescription('DescriptionList')
    .subscribe(data => {
     this.descriptionData = data;
     console.log(this.descriptionData, 'all description data')
     this.dtTrigger.next();
  
         });
}


  
  saveDescription(descriptionForm: NgForm): void{
    this.descriptionservice.saveAllAdminData(this.description, 'SaveDescription').subscribe(data => {
      this.description = data;
      if (data.insertId === 0 ) {
        this.showSuccess('Description Updated', 'Description Data Got Updated');

      } else {
        this.showSuccess('Description Added', 'Description Data Got Saved');
      }
      this.displayDescription();
      descriptionForm.reset();
     
      this.dtTrigger.next();
   
    }, (err) => {
      console.log(err);
    });

  }

  resetData(descriptionForm: NgForm){
    descriptionForm.reset();
    this.description = {
      Id: null,
      DescriptionInEnglish: '',
      DescriptionInSpanish: '',
      FacebookLink: '',
      TwitterLink: '',
      CreatedOn: null
    }

  }
  
  editDescription(Description) {
    this.description = Object.assign({}, Description);
  }


  sendDescriptionDetailsToModalPopUp(Description) {
    // console.log(Description, 'modal pop up data');
    this.descriptionDetails= Description
    
  }
  deleteDescription(Description) {
    this.descriptionservice.deleteDescription(Description.Id , 'DeleteDescription').subscribe(data => {
      this.displayDescription();
    this.showSuccess('Description Deleted', 'Description Data Got Deleted');

   });

  }



  showSuccess(display, Message) {
    this.toastr.success(display , Message );
  } 
}

// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
