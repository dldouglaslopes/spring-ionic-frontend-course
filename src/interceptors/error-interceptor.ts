import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
       
        return next.handle(request)
                .catch((error, caught) => {

                    let errorObj = error;

                    if(errorObj.error){
                        errorObj = errorObj.error;
                    }
                    if (!errorObj.error) {
                        errorObj = JSON.parse(errorObj);
                    }
                    
                    console.log("Error detected by interceptor:");
                    console.log(errorObj);

                    return Observable.throw(errorObj);
        }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true
};
