// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________|                                              |
import { Component, OnInit } from '@angular/core';
import { Category_Details } from 'src/app/models/category-details.model';
import {CategoryDetailsService} from 'src/app/services/category-details.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
category: Category_Details = {
  Id: null,
  CategoryName: '',
  CreatedOn: null
}
categoryDetails: any = [];
categoryData: any = [];
dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();
  constructor(private categoryDetailsService: CategoryDetailsService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,) { }

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

       this.displayCategoryData();
  }

  displayCategoryData(){
    //display Category Lists 
    this.categoryDetailsService.getAllCategory('CategoryList')
    .subscribe(data => {
     this.categoryData = data;
     console.log(this.categoryData, '= all Category data')
     this.dtTrigger.next();
  
         });
}

  saveCategoryDetails(categoryDetailsForm: NgForm): void{
    // console.log(this.countryData, 'this is country form data');
    this.categoryDetailsService.saveAllAdminData(this.category, 'SaveCategory').subscribe(data => {
      this.category = data;
      if (data.insertId === 0 ) {
        this.showSuccess('Category Updated', 'Category Data Got Updated');

      } else {
        this.showSuccess('Category Added', 'Category Data Got Saved');
      }
      categoryDetailsForm.reset();
      this.displayCategoryData();
      this.dtTrigger.next();
   
    }, (err) => {
      console.log(err);
    });

  }


  editCategoryDetails(Category) {
    this.category = Object.assign({}, Category);
  }

  resetData(categoryDetailsForm: NgForm){
    categoryDetailsForm.reset();
    this.category = {
      Id: null,
      CategoryName: '',
      CreatedOn: null
    }

  }
  
  sendCategoryDetailsToModalPopUp(Category) {
    console.log(Category, 'modal pop up data');
    this.categoryDetails= Category
    
  }

  deleteCategoryDetails(Category) {
    this.categoryDetailsService.deleteCategory(Category.Id , 'DeleteCategory').subscribe(data => {
    this.displayCategoryData();
    this.showSuccess('Category Deleted', 'Category Data Got Deleted');

   });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  showSuccess(display, Message) {
    this.toastr.success(display , Message );
  } 

}
