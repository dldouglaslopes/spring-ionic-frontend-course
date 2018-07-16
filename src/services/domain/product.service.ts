import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ProductDTO } from "../../models/product.dto";

@Injectable()
export class ProductService {
    constructor(public http: HttpClient) {   
    }

    findById(product_id : string) {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`);
    }

    findByCategory(category_id : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${category_id}`);
    }
}