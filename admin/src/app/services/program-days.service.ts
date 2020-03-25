import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramDaysService {
env = environment;
private url = this.env.apiUrl + 'admin/'
constructor(private http:HttpClient) { }

saveAllAdminData(data: any, mode: string): Observable<any> {
console.log(data, 'country data from service');
const headers = new HttpHeaders().set('Content-Type', 'application/json');
const params = new HttpParams().set('mode', mode);
return this.http.post<any>(this.url, data, { headers, params}).pipe(catchError(this.handleError));
}

getToursByCountryIDInProgramDays(mode: string, Id): Observable<any> {
const headers = new HttpHeaders().set('Content-Type', 'application/json');
const params = new HttpParams().set('mode', mode).set('Id', Id);
return this.http.get<any>(this.url, { headers, params});
}


getProgramTitleByTourID(mode: string, Id): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const params = new HttpParams().set('mode', mode).set('Id', Id);
  return this.http.get<any>(this.url, { headers, params});
  }

  getAllDays(mode: string, Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang);
    return this.http.get<any>(this.url, { headers, params});
    }
getAllToursByTourID(mode: string, Id): Observable<any> {
const headers = new HttpHeaders().set('Content-Type', 'application/json');
const params = new HttpParams().set('mode', mode).set('Id', Id);
return this.http.get<any>(this.url, { headers, params});
}

getTourNameByCountryID(mode: string, Id): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const params = new HttpParams().set('mode', mode).set('Id', Id);
  return this.http.get<any>(this.url, { headers, params});
  }

getTourProgramByProgramID(mode: string, Id): Observable<any> {
const headers = new HttpHeaders().set('Content-Type', 'application/json');
const params = new HttpParams().set('mode', mode).set('Id', Id);
return this.http.get<any>(this.url, { headers, params});
}

getCountryByIDInDaysModule(mode: string, Id): Observable<any> {
const headers = new HttpHeaders().set('Content-Type', 'application/json');
const params = new HttpParams().set('mode', mode).set('Id', Id);
return this.http.get<any>(this.url, { headers, params});
}

//delete function
deleteDays(Id, mode: string): Observable<any> {
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
