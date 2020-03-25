import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Destination } from '../models/destination.model';


@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  env = environment;
  private url = this.env.apiUrl + 'admin/';
  

  constructor( private http: HttpClient) { }

  saveAllAdminData(data: any, mode: string): Observable<any> {
    console.log(data, 'destination data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }

    //get functions
    getDestinationsAccordingToLanguage(mode: string,Lang): Observable<Destination[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang',Lang);
      return this.http.get<Destination[]>(this.url, { headers, params});
    }
     //get functions
     getAllLanguagesByLanguageValue(LanguageValue,mode: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('LanguageValue', LanguageValue).set('mode', mode);
      return this.http.get<any>(this.url, { headers, params});
    }

      //get functions
      getAllLanguages(mode: string): Observable<any[]> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('mode', mode);
        return this.http.get<any[]>(this.url, { headers, params});
      }

    //delete function
    deleteDestination(Id, mode: string): Observable<any> {
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
