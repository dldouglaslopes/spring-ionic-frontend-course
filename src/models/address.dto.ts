import { CityDTO } from "./city.dto";

export interface AddressDTO {
    id : string;
    patio : string;
    number : string;
    additional : string;
    zipCode : string;
    city : CityDTO;
}