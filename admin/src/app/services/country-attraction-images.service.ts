import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Countryattractionimages } from '../models/countryattractionimages.module';

@Injectable({
  providedIn: 'root'
})
export class CountryAttractionImagesService {

  env = environment;
  private url = this.env.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }


  saveAllAdminData(data: any, mode: string): Observable<any> {
    // console.log(data.AttractionImage, 'AttractionImage data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }

    getAllCountry(mode: string): Observable<Countryattractionimages[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode);
      return this.http.get<Countryattractionimages[]>(this.url, { headers, params});
    }

    getAllCountryByCountryLocationID(mode: string, Lang,Id): Observable<Countryattractionimages[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang).set('Id',Id);
      return this.http.get<Countryattractionimages[]>(this.url, { headers, params});
    }
    getAllCountryById(mode: string, Id): Observable<Countryattractionimages[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<Countryattractionimages[]>(this.url, { headers, params});
    }


    //In Use
    getCountryDetailsByCountryId(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }



    getAllLanguagesOnDataTablePage(mode: string): Observable<Countryattractionimages[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode);
      return this.http.get<Countryattractionimages[]>(this.url, { headers, params});
    }

    getAllAttractionImagesAccordingToLang(mode: string, Lang): Observable<Countryattractionimages[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang',Lang);
      return this.http.get<Countryattractionimages[]>(this.url, { headers, params});
    }
  //delete function
   deleteAttractionImages(AttractionId, mode: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('AttractionId',AttractionId).set('mode', mode);
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
