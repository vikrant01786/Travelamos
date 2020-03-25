import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Countryimages } from '../models/countryimages.module';

@Injectable({
  providedIn: 'root'
})
export class CountryImagesService {
  env = environment;
  private url = this.env.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }


  saveAllAdminData(data: any, mode: string): Observable<any> {
    // console.log(data.CountryImage, 'CountryImage data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }

    // getAllCountryImages(mode: string): Observable<Countryimages[]> {
    //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //   const params = new HttpParams().set('mode', mode);
    //   return this.http.get<Countryimages[]>(this.url, { headers, params});
    // }

    getAllCountryListInCountryImages(mode: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode);
      return this.http.get<any>(this.url, { headers, params});
    }

    getAllCountryListInCountryImagesByCountryId(mode: string ,Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    getAllCountryImages(mode: string, Lang): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang',Lang);
      return this.http.get<any>(this.url, { headers, params});
    }

    getCountryByCountryID(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id',Id);
      return this.http.get<any>(this.url, { headers, params});
    }

   

    getCountryByCountryLocationID(mode: string, Lang,Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    getCountryDetailsByCountryId(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

   //delete function
   deleteCountryImages(Id, mode: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('Id', Id).set('mode', mode);
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
