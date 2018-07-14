import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProductService {
    constructor(public http: HttpClient) {   
    }

    findByCategory(category_id : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${category_id}`);
    }
}