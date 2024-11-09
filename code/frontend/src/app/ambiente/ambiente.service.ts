import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Ambiente } from "./models/ambiente";
import { environment } from "../../environments/environment";
import { catchError, first } from "rxjs";
import { BaseService } from "../services/base.service";

@Injectable({
    providedIn: 'root'
})
export class AmbienteService extends BaseService {
    private urlApi = environment.urlApi;
    private http = inject(HttpClient);

    obterTodos() {
        return this.http.get<Ambiente[]>(`${this.urlApi}ambientes`)
            .pipe(
                catchError(this.serviceError),
                first());
    }

    incluir(ambiente: Ambiente) {
        return this.http.post<Ambiente>(`${this.urlApi}ambientes`, ambiente)
            .pipe(
                catchError(this.serviceError),
                first()
            );
    }

    alterar(ambiente: Ambiente) {
        return this.http.put<Ambiente>(`${this.urlApi}ambientes/${ambiente.id}`, ambiente)
        .pipe(
            catchError(this.serviceError),
            first()
        );
    }

    excluir(id: number) {
        return this.http.delete<Ambiente>(`${this.urlApi}ambientes/${id}`)
        .pipe(
            catchError(this.serviceError),
            first()
        );
    }
}