import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){    
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
       
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;
        let requestToApi = request.url.substring(0, N) == API_CONFIG.baseUrl;

        if (localUser && requestToApi) {
            const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);        
        }
        else{
            return next.handle(request);
        }        
    }
}

export const AuthInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true,
};
