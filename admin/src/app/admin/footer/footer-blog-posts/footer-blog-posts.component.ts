// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FooterBlogPostsService} from 'src/app/services/footer-blog-posts.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { Footer_Blog_Posts } from 'src/app/models/footer_blog_posts.model';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';

@Component({
  selector: 'app-footer-blog-posts',
  templateUrl: './footer-blog-posts.component.html',
  styleUrls: ['./footer-blog-posts.component.css']
})
export class FooterBlogPostsComponent implements OnInit {
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
blogposts: Footer_Blog_Posts = {
Id: null,
BlogImage: '',
BlogNameInEnglish: '',
BlogNameInSpanish: '',
BlogDate: '',
CreatedOn: null
 };
BlogPostsImageEvent: any = [];
BlogPostsData: any = [];
BlogPostsDetails: any = [];
image: any = [];
dtOptions: any = {};
dtTrigger: Subject<any> = new Subject();


constructor(private blogpostservice: FooterBlogPostsService,
            private toastr: ToastrService,
            private spinner: NgxSpinnerService,
            private http: HttpClient) { }



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

          this.image = null;
          this.displayBlogPosts();
  }


  displayBlogPosts(){
    this.blogpostservice.getAllBlogPosts('BlogPostsList')
        .subscribe(data => {
         this.BlogPostsData = data; 
         console.log(this.BlogPostsData, '= blogposts images data')
         this.dtTrigger.next();
             });
  }

  onUpload(file: FileQueueObject) {
      this.BlogPostsImageEvent = file.file;  
  }
  update(blogPostsForm: NgForm){
    if(this.BlogPostsImageEvent.length == 0){
      this.blogpostservice.saveAllAdminData(this.blogposts, 'SaveBlogPosts').subscribe(data => {
        this.blogposts = data;
        if (data.insertId === 0 ) {
          this.showSuccess('Blog Image Uploaded', 'Blog Posts Data Got Updated');
         

        } else {
          this.showSuccess('Blog Image Uploaded', 'Blog Posts Data Got Saved');
        }
  
        blogPostsForm.reset();
        this.displayBlogPosts();
        this.dtTrigger.next();
     
      }, (err) => {
        console.log(err);
      });
    }else {
      const formData = new FormData();
      formData.append('file', this.BlogPostsImageEvent);
      this.http.post<any>(this.url, formData).subscribe(
        (res) => {
          console.log(res , 'res');
           // mapped path to destination object   'uploads' + '/' + data.DestinationImage;
          this.blogposts.BlogImage= res.filename;
          // if path of image returned after upload  has a value then below if condition works
          if (this.blogposts.BlogImage != null) {
            this.blogpostservice.saveAllAdminData(this.blogposts, 'SaveBlogPosts').subscribe(data => {
              this.blogposts = data;
              if (data.insertId === 0 ) {
                this.showSuccess('Blog Image Uploaded', 'Blog Posts Data Got Updated');
              } else {
                this.showSuccess('Blog Image Uploaded', 'Blog Posts Data Got Saved');
              }
              blogPostsForm.reset();
              this.displayBlogPosts();
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


  onsubmit(blogPostsForm: NgForm) {
    if(this.BlogPostsImageEvent.length == 0){
      this.blogpostservice.saveAllAdminData(this.blogposts, 'SaveBlogPosts').subscribe(data => {
        this.blogposts = data;
        if (data.insertId === 0 ) {
          this.showSuccess('Blog Image Uploaded', 'Blog Posts Data Got Updated');
        } else {
          this.showSuccess('Blog Image Uploaded', 'Blog Posts Data Got Saved');
        }
        blogPostsForm.reset();
        this.displayBlogPosts();
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
      });
    }else {
      const formData = new FormData();
      formData.append('file', this.BlogPostsImageEvent);
      this.http.post<any>(this.url, formData).subscribe(
        (res) => {
          console.log(res , 'res');
           // mapped path to destination object   'uploads' + '/' + data.DestinationImage;
          this.blogposts.BlogImage= res.filename;
          // if path of image returned after upload  has a value then below if condition works
          if (this.blogposts.BlogImage != null) {
            this.blogpostservice.saveAllAdminData(this.blogposts, 'SaveBlogPosts').subscribe(data => {
              this.blogposts = data;
              if (data.insertId === 0 ) {
                this.showSuccess('Blog Image Uploaded', 'Blog Posts Data Got Updated');
              } else {
                this.showSuccess('Blog Image Uploaded', 'Blog Posts Data Got Saved');
              }
              blogPostsForm.reset();
              this.displayBlogPosts();
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



  resetData(blogPostsForm: NgForm){
  blogPostsForm.reset();
  this.blogposts = {
  Id: null,
  BlogImage: '',
  BlogNameInEnglish: '',
  BlogNameInSpanish: '',
  BlogDate: '',
  CreatedOn: null
  };
  }



  editBlogPosts(BlogPosts) {
  this.blogposts = Object.assign({}, BlogPosts);
  this.image = this.env.apiUrl + this.blogposts.BlogImage;
  }


  sendBlogPostsDetailsToModalPopUp(BlogPosts){
  this.BlogPostsDetails= BlogPosts;
  }

deleteBlogPosts(BlogPosts){
this.blogpostservice.deleteBlogPosts(BlogPosts.Id , 'DeleteBlogPosts').subscribe(data => {
this.displayBlogPosts();
this.showSuccess('Blog Posts Image Deleted', 'Blog Posts Data Got Deleted');
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
