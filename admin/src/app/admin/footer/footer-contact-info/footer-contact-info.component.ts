// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Footer_Contact_Info } from 'src/app/models/footer_contact_info.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import {FooterContactInfoService} from 'src/app/services/footer-contact-info.service';

@Component({
  selector: 'app-footer-contact-info',
  templateUrl: './footer-contact-info.component.html',
  styleUrls: ['./footer-contact-info.component.css']
})
export class FooterContactInfoComponent implements OnInit {

  contactinfo: Footer_Contact_Info = {
    Id: null,
    CompanyAddressInEnglish: '',
    CompanyAddressInSpanish: '',
    CompanyContactNumber: '',
    CompanyEmail: '',
    CompanyWebsite: '',
    CreatedOn: null

  };
  contactInfoData: any = [];
  contactInfoDetails: any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private toastr: ToastrService,
              private spinner: NgxSpinnerService,
            private contactinfoservice: FooterContactInfoService
                ) { }

  ngOnInit() {
         this.spinner.show();
         setTimeout(() => {
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
        this.displayContactInfoData();
  }




  displayContactInfoData(){
    this.contactinfoservice.getAllContactInfo('ContactInfoList')
    .subscribe(data => {
     this.contactInfoData = data;
     this.dtTrigger.next();
         });
}

  saveContactInfo(contactInfoForm: NgForm): void{
    this.contactinfoservice.saveAllAdminData(this.contactinfo, 'SaveContactInfo').subscribe(data => {
      this.contactinfo = data;
      if (data.insertId === 0 ) {
        this.showSuccess('Contact Info Updated', 'Contact Info Data Got Updated');
      } else {
        this.showSuccess('Contact Info Added', 'Contact Info Data Got Saved');
      }
      contactInfoForm.reset();
      this.displayContactInfoData();
      this.dtTrigger.next();
    }, (err) => {
      console.log(err);
    });

  }


  editContactInfo(Contactinfo) {
    this.contactinfo = Object.assign({}, Contactinfo);
  }


  resetData(contactInfoForm: NgForm){
    contactInfoForm.reset();
  }


  sendContactInfoDetailsToModalPopUp(ContactInfo) {
    this.contactInfoDetails= ContactInfo   
  }


  deleteContactInfo(ContactInfo) {
    this.contactinfoservice.deleteContactInfo(ContactInfo.Id , 'DeleteContactInfo').subscribe(data => {
      this.displayContactInfoData();
    this.showSuccess('Contact Info Deleted', 'Country Data Got Deleted');
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
