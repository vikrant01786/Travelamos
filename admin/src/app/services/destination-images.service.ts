import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Destinationimages } from '../models/destinationimages.module';

@Injectable({
  providedIn: 'root'
})
export class DestinationImagesService {
      env = environment;
      private url = this.env.apiUrl + 'admin/';

constructor(private http: HttpClient) { }

      saveAllAdminData(data: any, mode: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('mode', mode);
        return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
      }

      getAllDestinationImagesAccordingToLang(mode: string ,Lang): Observable<Destinationimages[]> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('mode', mode).set('Lang',Lang);
        return this.http.get<Destinationimages[]>(this.url, { headers, params});
      }

      getAllDestinationLists(mode: string, Lang,Id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('Id',Id);
        return this.http.get<any>(this.url, { headers, params});
      }

      getDestinationLocationId(mode: string,Id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('mode', mode).set('Id',Id);
        return this.http.get<any>(this.url, { headers, params});
      }

      getOnlyEnglishDestinationList(mode: string,Lang): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('mode', mode).set('Lang', Lang);
        return this.http.get<any>(this.url, { headers, params});
      }

      getAllLanguagesOnDataTablePage(mode: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('mode', mode);
        return this.http.get<any>(this.url, { headers, params});
      }

      getDestinationByDestinationID(mode: string,Id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('mode', mode).set('Id',Id);
        return this.http.get<any>(this.url, { headers, params});
      }

      deleteDestinationImages(Id, mode: string): Observable<any> {
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
