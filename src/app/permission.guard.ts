import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router:Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  }

  private isAuthorized(route:ActivatedRouteSnapshot):boolean{

    const features = JSON.parse(localStorage.getItem("feature_permission") || '{}');
    const expectedFeatures = route.data.expectedFeatures;
    const featureMatches = features.findIndex((feature:any) => expectedFeatures.indexOf(feature) !== -1);
    // return featureMatches < 0 ? false:true;

    if(featureMatches<0){
      this.router.navigate(['/forbidden']);
      return false;
    }
    else{
      return true;
    }
  }
  
}
