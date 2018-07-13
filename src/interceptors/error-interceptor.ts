import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { FieldMessage } from "../models/fieldmessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService, public alertCtrl: AlertController){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
       
        return next.handle(request)
                .catch((error, caught) => {

                    let errorObj = error;

                    if(errorObj.error){
                        errorObj = errorObj.error;
                    }
                    if (!errorObj.status) {
                        errorObj = JSON.parse(errorObj);
                    }
                    
                    console.log("Error detected by interceptor:");
                    console.log(errorObj);

                    switch (errorObj.status) {
                        case 401:
                            this.handle401();                    
                            break;
                
                        case 403:
                            this.handle403();                    
                            break;

                        case 422:
                            this.handle422(errorObj);
                            break;
                    
                        default:
                            this.handleDefaultError(errorObj);
                            break;
                    }

                    return Observable.throw(errorObj);
        }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: '401 error: authentication failed',
            message: 'Email or password are wrong',
            enableBackdropDismiss: false,  
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: '422 Error: Validation',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,  
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Error ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,  
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }

    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';

        for(var i = 0; i < messages.length; i++){
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }

        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true,
};
