import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private inject : Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //
    let authservice = this.inject.get(AuthService);
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huIiwiaWF0IjoxNjgzMDUxMzA5LCJleHAiOjE2ODMwNTQ5MDl9.oyDgM_QFuVUXmNtV_SV9kHLCSDBHHonx69OiaHvcWuw';
    let authReq = req;
    authReq = this.AddTokenHeader(req,authservice.GetToken());
    return next.handle(authReq).pipe(
      catchError(errorData =>{
        if(errorData.status === 401){
          // need to implement logout
          //authservice.LogOut();
          //refresh token logic
          return this.handleRefreshToken(req,next);
        }
        return throwError(errorData);
      })
    )
  }

  handleRefreshToken(req: HttpRequest<any>, next: HttpHandler){
    let authservice = this.inject.get(AuthService);
    return authservice.GenerateRefreshToke().pipe(
      switchMap((data:any)=>{
        authservice.SaveTokens(data);
        console.log('refresh --> ' + data)
        return next.handle(this.AddTokenHeader(req,data.refreshToken))
        
      }),
      catchError(errorData=>{
        authservice.LogOut();
        return throwError(errorData)
      })
    )
  }
  AddTokenHeader(req : HttpRequest<any>,token:any ){
    return req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)})
  }
}
