import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Ambiente } from "../models/ambiente";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AmbienteService {
    private urlApi = environment.urlApi;
    private http = inject(HttpClient);

    obter() {
        return this.http.get<Ambiente[]>(`${this.urlApi}ambientes`);
    }
}