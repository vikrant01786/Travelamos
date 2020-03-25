import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  env = environment;
  private url = this.env.apiUrl + 'authentication';
  localStorage: any;

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService) { }

  get isLoggedIn() {
  return JSON.parse(localStorage.getItem('isLoggedIn'));
  }
  
  validateUser(loginUser: any): Observable<Admin> {
    return this.http.post<any>(this.url, loginUser,{headers: new HttpHeaders({'Content-type': 'application/json'})});
  }

  logout() {
    localStorage.clear();
    this.showSuccess( 'You Have Been Succesfully' , 'Logged Out');
    this.router.navigate(['/']);     
   }

   showSuccess(display, Message) {
    this.toastr.success(display , Message );
  }
  showFailure(display, Message) {
    this.toastr.error(display , Message );
  }
}
