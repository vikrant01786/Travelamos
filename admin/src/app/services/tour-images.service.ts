import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tour_Images } from '../models/tour-images.model';


@Injectable({
  providedIn: 'root'
})
export class TourImagesService {

  env = environment;
  private url = this.env.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }


  saveAllAdminData(data: any, mode: string): Observable<any> {
    // console.log(data, 'Tours Images data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }
    getAllToursByTourId(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }
    getTourDetailsByTourId(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }


    getAllTourImagesByLanguage(mode: string, Lang): Observable<Tour_Images[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang);
      return this.http.get<Tour_Images[]>(this.url, { headers, params});
    }

    getAllTourByTourLocationID(mode: string,Lang,Id): Observable<Tour_Images[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('Id', Id);
      return this.http.get<Tour_Images[]>(this.url, { headers, params});
    }


  


     //delete function
     deleteTourImages(Id, mode: string): Observable<any> {
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
