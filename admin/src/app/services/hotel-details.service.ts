import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Hotel_Details } from '../models/hotel-details.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailsService {
  env = environment;
  private url = this.env.apiUrl + 'admin/'
  

  constructor(private http: HttpClient) { }


  
  saveAllAdminData(data: any, mode: string): Observable<any> {
    console.log(data, 'country data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }

    getAllHotel(mode: string, Lang): Observable<Hotel_Details[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang);
      return this.http.get<Hotel_Details[]>(this.url, { headers, params});
    }

    getAllCountryByLanguage(mode: string, Lang): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang);
      return this.http.get<any>(this.url, { headers, params});
    }
    getAllCountryByCountryId(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }
    getAllCountryOnInEnglish(mode: string,Lang): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang);
      return this.http.get<any>(this.url, { headers, params});
    }

    getAllCityById(Id,mode: string): Observable<any> {
      console.log(Id,'City Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('Id',Id).set('mode', mode);
      return this.http.get<any>(this.url, { headers, params});
    }
    
    getAllHotelById(Id,mode: string): Observable<any> {
      console.log(Id,'Hotel Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('Id',Id).set('mode', mode);
      return this.http.get<any>(this.url, { headers, params});
    }

     //delete function
     deleteHotel(Id, mode: string): Observable<any> {
      //  console.log(Id, 'Id from service');
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
