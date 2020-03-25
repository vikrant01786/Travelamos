import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tour } from '../models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  env = environment;
  private url = this.env.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }


  saveAllAdminData(data: any, mode: string): Observable<any> {
    // console.log(data, 'Tours data from service');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
    }

    getAllTours(mode: string,Lang): Observable<Tour[]> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang',Lang);
      return this.http.get<Tour[]>(this.url, { headers, params});
    }

   
    getAllCityById(Id,mode: string): Observable<any> {
      console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('Id',Id).set('mode', mode);
      return this.http.get<any>(this.url, { headers, params});
    }
    getAllCountryInTourByLanguage(mode: string, Lang,Id): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    getAllCountryInTourByCountryId(mode: string, Id): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    getCountryDetailsByCountryId(mode: string, Id): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    getCityByCountryID(mode: string, Id): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    
    getCityDetailsByCityID(mode: string, Id): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    getAllTourPackagesOnlyInEnglishInTours(mode: string,Lang): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang',Lang);
      return this.http.get<any>(this.url, { headers, params});
    }
    getAllTourPackagesInTourByTourPackageId(mode: string,Id): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    FindTourPackageLocationIDByPackageID(mode: string,Id): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }

    FindTourProgramLocationIDByTourProgramID(mode: string,Id): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }
    getAllTourProgramOnlyInEnglish(mode: string,Lang): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Lang', Lang);
      return this.http.get<any>(this.url, { headers, params});
    }

    getAllTourProgramInTourByTourProgramId(mode: string,Id): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode).set('Id', Id);
      return this.http.get<any>(this.url, { headers, params});
    }
    getAllPriceCategoryInTour(mode: string): Observable<any> {
      // console.log(Id,'Country Id From Services')
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('mode', mode);
      return this.http.get<any>(this.url, { headers, params});
    }





     //delete function
     deleteTours(Id, mode: string): Observable<any> {
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
