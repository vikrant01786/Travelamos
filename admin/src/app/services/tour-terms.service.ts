import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Tour_Terms } from '../models/tour-terms.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourTermsService {
  env= environment;
  private url = this.env.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }

  
  saveAllAdminData(data: any, mode: string): Observable<any> {
    console.log(data, 'Tours Term data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }

    getAllTourTermByLang(mode: string ,Lang): Observable<Tour_Terms[]> {
      console.log(Lang, 'Lang From Services');
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang);
      return this.http.get<Tour_Terms[]>(this.url, { headers, params});
    }
    getAllTourByTourId(mode: string ,Id): Observable<Tour_Terms[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<Tour_Terms[]>(this.url, { headers, params});
    }
 


     //delete function
     deleteTourTerms(Id, mode: string): Observable<any> {
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
