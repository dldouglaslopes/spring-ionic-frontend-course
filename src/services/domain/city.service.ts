import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { CityDTO } from "../../models/city.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CityService {

    constructor (public http: HttpClient){}

    findAll(state_id : string) : Observable<CityDTO[]> {
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/states/${state_id}/cities`);
    }
}