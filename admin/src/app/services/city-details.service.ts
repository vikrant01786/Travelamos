import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { City_Details } from '../models/city-details.model';

@Injectable({
  providedIn: 'root'
})
export class CityDetailsService {
  env =environment
  private url = this.env.apiUrl + 'admin/'

  constructor(private http: HttpClient) { }


  saveAllAdminData(data: any, mode: string): Observable<any> {
    console.log(data, 'country data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }

    getAllCity(mode: string, Lang): Observable<City_Details[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang);
      return this.http.get<City_Details[]>(this.url, { headers, params});
    }

    getAllLanguagesInCityDetails(mode: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode);
      return this.http.get<any>(this.url, { headers, params});
    }
    getCountryListOnlyInEnglish(mode: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode);
      return this.http.get<any>(this.url, { headers, params});
    }

    getCountryByCountryLocationIDAndLanguage(mode: string,Lang,Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('Id',Id);
      return this.http.get<any>(this.url, { headers, params});
    }


     //delete function
     deleteCity(Id, mode: string): Observable<any> {
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
