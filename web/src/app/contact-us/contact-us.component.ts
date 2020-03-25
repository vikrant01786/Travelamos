import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
declare var $:any;


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})


export class ContactUsComponent implements OnInit {
env = environment;
private url1 = this.env.apiUrl + 'email/';
contactUS = {
FirstName: '',
LastName: '',
Email: '',
Subject: '',
Message: ''
}

  constructor(private http: HttpClient,private toastr: ToastrService) { }

ngOnInit() {
$('input').blur(function(){
var inputContent = $(this).val();
if (inputContent != '') {
$(this).addClass('complete');
} else {
$(this).removeClass('complete');
}
});
}


SendEmail(contactForm:NgForm){
this.http.post<any>(this.url1,this.contactUS).subscribe(data=>{
if(data.messageId){
this.showSuccess('Email Sent','Email Is Been Sent Successfully');
}
contactForm.reset();
});
}


showSuccess(display, Message) {
this.toastr.success(display, Message);
}


showFailure(error, Message) {
this.toastr.error(error, Message);
}

}
