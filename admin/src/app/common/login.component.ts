// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from '../services/auth.service'
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: any = {
    UserName: '',
    Password: ''
  };
  
  constructor(private toastr: ToastrService,
              public authservice: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
      /** spinner starts on init */
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);

     
  }

  validateUser() {
    console.log(this.loginData,'data');
    this.authservice.validateUser(this.loginData).subscribe((data) => {
     console.log(JSON.stringify(data[0]));
     if (data[0]) {
      localStorage.setItem('userLoggedIn', JSON.stringify(data[0]));
      window.localStorage.setItem('isLoggedIn', 'true' );
      this.router.navigate(['/admin/dashboard']);
      this.showSuccess('Successfully Logged In','Please Wait..!');
    } else {
      this.showFailure( 'Username or Password mismatch.' , 'Login failed');
    }
    },
      (err) => {
        console.log(err);
        this.showFailure(err, 'Login failed. Please contact Administrator');
        this.router.navigate(['/']);
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

