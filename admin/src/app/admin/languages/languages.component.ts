import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Languages } from 'src/app/models/languages.model';
import { LanguagesService } from 'src/app/services/languages.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  languagesData: any = [];
  languages: Languages = {
    Id: null,
    LanguageName: '',
    LanguageValue: '',
    CreatedOn: null
  };
  languagesDetails: any = [];
dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();

  constructor( private toastr: ToastrService,
               private spinner: NgxSpinnerService,
               private languagesservice: LanguagesService) { }

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
    this.displayLanguages();
  }


  displayLanguages(){
    this.languagesservice.getAllLanguages('LanguagesList')
    .subscribe(data => {
     this.languagesData = data;
     this.dtTrigger.next();
     console.log(this.languagesData)
         });
}


saveLanguages(languagesForm: NgForm): void{
  this.languagesservice.saveAllAdminData(this.languages, 'SaveLanguages').subscribe(data => {
    this.languages = data;
    if (data.insertId === 0 ) {
      this.showSuccess('Language Updated', 'Language Data Got Updated');

    } else {
      this.showSuccess('Language Added', 'Language Data Got Saved');
    }
    languagesForm.reset();
    this.displayLanguages();
    this.dtTrigger.next();
  }, (err) => {
    console.log(err);
  });
}

editLanguages(Languages) {
  this.languages = Object.assign({}, Languages);
}

resetData(languagesForm: NgForm){
  languagesForm.reset();
  this.languages = {
    Id: null,
    LanguageName: '',
    LanguageValue: '',
    CreatedOn: null
  };
}

sendLanguagesDetailsToModalPopUp(Languages) {
  console.log(Languages, 'modal pop up data');
  this.languagesDetails= Languages 
}

deleteLanguages(Languages) {
  this.languagesservice.deleteLanguages(Languages.Id , 'DeleteLanguages').subscribe(data => {
    this.displayLanguages();
  this.showSuccess('Language Deleted', 'Language Data Got Deleted');
 });
}

showSuccess(display, Message) {
  this.toastr.success(display , Message );
}
}
