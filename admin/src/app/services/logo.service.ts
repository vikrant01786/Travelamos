import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Logo } from '../models/logo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoService {

  env = environment;
  private url = this.env.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }


  saveAllAdminData(data: any, mode: string): Observable<any> {
    // console.log(data.AttractionImage, 'LogoImage data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }
    
    getAllLogoImages(mode: string): Observable<Logo[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode);
      return this.http.get<Logo[]>(this.url, { headers, params});
    }

      //delete function
   deleteLogoImages(Id, mode: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('Id',Id).set('mode', mode);
    return this.http.delete<any>(this.url,{ headers, params}).pipe(catchError(this.handleError));
  }


  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('"Hello"');
  }
}
