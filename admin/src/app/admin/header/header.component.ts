// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit } from '@angular/core';
import { Header } from 'src/app/models/header.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import {HeaderService} from 'src/app/services/header.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  header: Header = {
    Id: null,
    ContactNumber: '',
    FacebookLink: '',
    TwitterLink: '',
    LinkedInLink: '',
    CreatedOn: null
  }

  headerData:any = []; 
  headerDetails:any = []; 
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private headerservice: HeaderService) { }

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

            this.displayHeaderData();
  }


  displayHeaderData() {
        //display Country Lists 
        this.headerservice.getAllHeader('HeaderList')
        .subscribe(data => {
         this.headerData = data;
         console.log(this.headerData, 'all header data')
         this.dtTrigger.next();
      
             });
  }

 
  saveHeader(headerForm: NgForm): void{
    this.headerservice.saveAllAdminData(this.header, 'SaveHeader').subscribe(data => {
      this.header = data;
      if (data.insertId === 0 ) {
        this.showSuccess('Header Details Updated', 'Header Details Data Got Updated');

      } else {
        this.showSuccess('Header Details Added', 'Header Details Data Got Saved');
      }
      headerForm.reset();
      this.displayHeaderData();
      this.dtTrigger.next();
   
    }, (err) => {
      console.log(err);
    });
  }

  editHeader(Header) {
    this.header = Object.assign({}, Header);
  }

  resetData(headerForm: NgForm){
    headerForm.reset();
    this.header= {
      Id: null,
      ContactNumber: '',
      FacebookLink: '',
      TwitterLink: '',
      LinkedInLink: '',
      CreatedOn: null
    }

  }
  sendHeaderDetailsToModalPopUp(Header) {
    console.log(Header, 'modal pop up data');
    this.headerDetails= Header
    
  }
  deleteHeader(Header) {
    this.headerservice.deleteHeader(Header.Id , 'DeleteHeader').subscribe(data => {
    this.displayHeaderData();
  
    this.showSuccess('Header Deleted', 'Header Data Got Deleted');

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
