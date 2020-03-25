import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { City_Images } from '../models/city-images.model';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityImagesService {
  env = environment;
  private url = this.env.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }


  saveAllAdminData(data: any, mode: string): Observable<any> {
    console.log(data, 'CountryImage data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }

    getAllCityImages(mode: string, Lang): Observable<City_Images[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang);
      return this.http.get<City_Images[]>(this.url, { headers, params});
    }

    getAllCountryInCityImagesByLanguage(mode: string, Lang): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang',Lang);
      return this.http.get<any>(this.url, { headers, params});
    }

    getCityByCountryIDInCityImagesList(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id',Id);
      return this.http.get<any>(this.url, { headers, params});
    }
    getCityLocationIDByCityIDInCityImages(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id',Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    getCountryLocationIDByCountryID(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id',Id);
      return this.http.get<any>(this.url, { headers, params});
    }
    getCityLocationIDByCityID(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id',Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    getAllCountryInCityImagesByCountryId(mode: string, Id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id',Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    getAllCityById(Id,mode: string): Observable<any> {
      console.log(Id,'City Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('Id',Id).set('mode', mode);
      return this.http.get<any>(this.url, { headers, params});
    }


   //delete function
   deleteCityImages(Id, mode: string): Observable<any> {
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
