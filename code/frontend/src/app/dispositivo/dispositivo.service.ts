import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { catchError, first } from "rxjs";
import { BaseService } from "../services/base.service";
import { Dispositivo } from "./models/dispositivo";

@Injectable({
    providedIn: 'root'
})
export class DispositivoService extends BaseService {
    private urlApi = environment.urlApi;
    private http = inject(HttpClient);

    obterTodos() {
        return this.http.get<Dispositivo[]>(`${this.urlApi}dispositivos`)
            .pipe(
                catchError(this.serviceError),
                first());
    }

    // incluir(ambiente: Ambiente) {
    //     return this.http.post<Ambiente>(`${this.urlApi}ambientes`, ambiente)
    //         .pipe(
    //             catchError(this.serviceError),
    //             first()
    //         );
    // }

    // alterar(ambiente: Ambiente) {
    //     return this.http.put<Ambiente>(`${this.urlApi}ambientes/${ambiente.id}`, ambiente)
    //     .pipe(
    //         catchError(this.serviceError),
    //         first()
    //     );
    // }

    // excluir(id: number) {
    //     return this.http.delete<Ambiente>(`${this.urlApi}ambientes/${id}`)
    //     .pipe(
    //         catchError(this.serviceError),
    //         first()
    //     );
    // }
}