import { NgModule } from "@angular/core";
import { SignupPage } from "./signup";
import { IonicPageModule } from "ionic-angular";
import { CityService } from "../../services/domain/city.service";
import { StateService } from "../../services/domain/state.service";

@NgModule({
    declarations: [
        SignupPage,
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
    ],
    providers : [
        CityService,
        StateService
    ]
})

export class SignupPageModule {}