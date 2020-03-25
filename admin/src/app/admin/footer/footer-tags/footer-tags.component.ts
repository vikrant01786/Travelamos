// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit } from '@angular/core';
import { Footer_Tags } from 'src/app/models/footer_tag.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import {FooterTagsService} from 'src/app/services/footer-tags.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-footer-tags',
  templateUrl: './footer-tags.component.html',
  styleUrls: ['./footer-tags.component.css']
})
export class FooterTagsComponent implements OnInit {
  tag: Footer_Tags = {
    Id: null,
    TagNameInEnglish: '',
    TagNameInSpanish: '',
    TagLink: '',
    CreatedOn: null
  };
  tagData: any = [];
  TagDetails: any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private tagservice: FooterTagsService) { }

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
       this.displayTags();
  }


  displayTags(){
    //display Country Lists 
    this.tagservice.getAllTags('TagsList')
    .subscribe(data => {
     this.tagData = data;
     console.log(this.tagData, 'all tags data')
     this.dtTrigger.next();
  
         });
}

  saveTag(tagForm: NgForm): void{

    this.tagservice.saveAllAdminData(this.tag, 'SaveTags').subscribe(data => {
      this.tag = data;
      if (data.insertId === 0 ) {
        this.showSuccess('Tag Updated', 'Tag Data Got Updated');

      } else {
        this.showSuccess('Tag Added', 'Tag Data Got Saved');
      }
      tagForm.reset();
      this.displayTags();
      this.dtTrigger.next();
   
    }, (err) => {
      console.log(err);
    });

  }
  editTags(Tags) {
    this.tag = Object.assign({}, Tags);
  }


  resetData(tagForm: NgForm){
    tagForm.reset();
    this.tag = {
      Id: null,
      TagNameInEnglish: '',
      TagNameInSpanish: '',
      TagLink: '',
      CreatedOn: null
    };

  }
  
  sendTagsDetailsToModalPopUp(Tags) {
    // console.log(Tags, 'modal pop up data');
    this.TagDetails= Tags;
    
  }

  deleteTags(Tags) {
    this.tagservice.deleteTags(Tags.Id , 'DeleteTags').subscribe(data => {
      this.displayTags();
    this.showSuccess('Tags Deleted', 'Tags Data Got Deleted');

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
