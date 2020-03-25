import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  env = environment;
  private url = this.env.apiUrl + 'web';

  constructor(private http: HttpClient) { }
  getAllHeader(mode: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.get<any>(this.url, { headers, params});
  }
  getAllLanguages(mode: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.get<any>(this.url, { headers, params});
  }

  getAllLogo(mode: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode);
    return this.http.get<any>(this.url, { headers, params});
  }

  getAllTourCarouselImages(mode: string,Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang);
    return this.http.get<any>(this.url, { headers, params});
  }
  getAllTourCarouselImagesByDefault(mode: string,Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang);
    return this.http.get<any>(this.url, { headers, params});
  }
  getAllDestinationImagesByDefaultLanguage(mode: string ,Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang);
    return this.http.get<any>(this.url, { headers, params});
  }

  getAllCountriesInDestinationPage(mode: string ,Id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Id', Id);
    return this.http.get<any>(this.url, { headers, params});
  }
  
  getAllDestinationImagesLanguages(mode: string, Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang);
    return this.http.get<any>(this.url, { headers, params});
  }

  getAllCountriesInDestinationPageByDestinationLocationIDAndLanguage(mode: string, Lang,Id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang).set('Id', Id);
    return this.http.get<any>(this.url, { headers, params});
  }


  getDestinationTitle(mode: string, Lang,Id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang).set('Id', Id);
    return this.http.get<any>(this.url, { headers, params});
  }
  GetAllDestinationsAccordingToLanguage(mode: string, Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang);
    return this.http.get<any>(this.url, { headers, params});
  }

  getAllCountryImages(mode: string, Lang,Id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang).set('Id', Id);
    return this.http.get<any>(this.url, { headers, params});
  }

  getCountryByCountryLocationID(mode: string, Lang,Id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang).set('Id', Id);
    return this.http.get<any>(this.url, { headers, params});
  }

  getAllHotelsByCountryLocationID(mode: string, Lang,Id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang).set('Id', Id);
    return this.http.get<any>(this.url, { headers, params});
  }

  getAllCitiesByCountryLocationID(mode: string, Lang,Id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang', Lang).set('Id', Id);
    return this.http.get<any>(this.url, { headers, params});
  }

  SearchCountry(CountryName:string,mode: string, Lang): Observable<any> {
    console.log(CountryName, 'From Services');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('CountryName', CountryName).set('mode', mode).set('Lang',Lang);
    return this.http.get<any>(this.url, { headers, params});
  }

  getCountryCount(mode: string, LocationID,Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('LocationID',LocationID).set('Lang',Lang);
    return this.http.get<any>(this.url, { headers, params});
  }
  getAllTours(mode: string,Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang);
    return this.http.get<any>(this.url, { headers, params});
  }



  getCountryByDestinationLocationID(mode: string,Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang);
    return this.http.get<any>(this.url, { headers, params});
  }

  getToursByDestinationLocationID(mode: string,Lang,Id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('Id',Id);
    return this.http.get<any>(this.url, { headers, params});
  }

  
  getAllTourPackages(mode: string,Lang): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang);
    return this.http.get<any>(this.url, { headers, params});
  }


  DisplayToursAccordingToPackages(mode: string,Lang,PackageID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('PackageID', PackageID);
    return this.http.get<any>(this.url, { headers, params});
  }

  GetAllToursByCountryLocationID(mode: string,Lang,CountryLocationID,PackageID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('CountryLocationID', CountryLocationID).set('PackageID', PackageID);
    return this.http.get<any>(this.url, { headers, params});
  }

  GetAllTourDetailsInSpecificTours(mode: string,Lang,TourLocationID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('TourLocationID', TourLocationID);
    return this.http.get<any>(this.url, { headers, params});
  }

  getDaysDetailsByProgramID(mode: string,Lang,ProgramID): Observable<any> {
    console.log(ProgramID, 'from services')
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('ProgramID', ProgramID);
    return this.http.get<any>(this.url, { headers, params});
  }

  getTourServicesInSpecificTour(mode: string,Lang,TourLocationID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('TourLocationID', TourLocationID);
    return this.http.get<any>(this.url, { headers, params});
  }

  getTourTermsInSpecificTour(mode: string,Lang,TourLocationID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('TourLocationID', TourLocationID);
    return this.http.get<any>(this.url, { headers, params});
  }

  getPriceCategoryDetailsInSpecificTour(mode: string,Lang,TourLocationID): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('mode', mode).set('Lang',Lang).set('TourLocationID', TourLocationID);
    return this.http.get<any>(this.url, { headers, params});
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
