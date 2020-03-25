import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Slider } from '../models/sliderimages.module';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  env = environment;
  private url = this.env.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }


  saveAllAdminData(data: any, mode: string): Observable<any> {
    console.log(data.AttractionImage, 'AttractionImage data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }
    
    getAllSliderImages(mode: string): Observable<Slider[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode);
      return this.http.get<Slider[]>(this.url, { headers, params});
    }

      //delete function
   deleteSliderImages(Id, mode: string): Observable<any> {
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
