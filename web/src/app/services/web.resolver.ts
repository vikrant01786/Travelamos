import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WebService } from './web.service';



@Injectable()
export class UserResolver implements Resolve<Observable<any>> {
    CountryLocationID = JSON.parse(localStorage.getItem('CountryLocationID'));
Country = JSON.parse(sessionStorage.getItem('Country'));
Languages = JSON.parse(sessionStorage.getItem('LanguageValue'));
  constructor(private webservice: WebService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    let mode:any = route.params['mode'];
    let Lang:any = route.params['Lang'];
    let CountryLocationID:any = route.params['CountryLocationID'];
    let PackageID:any = route.params['PackageID'];
    return this.webservice.GetAllToursByCountryLocationID(mode,Lang,CountryLocationID,PackageID); // my option is a string
  }

}