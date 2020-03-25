import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Footer_Description } from '../models/footer_description.model';

@Injectable({
  providedIn: 'root'
})
export class FooterDescriptionService {
  env = environment;
  private url = this.env.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }


  saveAllAdminData(data: any, mode: string): Observable<any> {
    console.log(data, 'country data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }


    getAllDescription(mode: string): Observable<Footer_Description[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode);
      return this.http.get<Footer_Description[]>(this.url, { headers, params});
    }

        //delete function
        deleteDescription(Id, mode: string): Observable<any> {
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
