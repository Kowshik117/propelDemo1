import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class studentInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  const authReq = req.clone({
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  });

  // console.log('Intercepted HTTP call', authReq);

  return next.handle(authReq);
}
}
