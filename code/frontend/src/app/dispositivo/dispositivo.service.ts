import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { catchError, first } from "rxjs";
import { BaseService } from "../services/base.service";
import { Dispositivo } from "./models/dispositivo";
import { DispositivoInclusao } from "./models/dispositivo-inclusao";

@Injectable({
    providedIn: 'root'
})
export class DispositivoService extends BaseService {
    private urlApi = `${environment.urlApi}dispositivos`;
    private http = inject(HttpClient);

    obterTodos() {
        return this.http.get<Dispositivo[]>(this.urlApi)
            .pipe(
                catchError(this.serviceError),
                first());
    }

    incluir(dispositivo: DispositivoInclusao) {
        return this.http.post<Dispositivo>(this.urlApi, dispositivo)
            .pipe(
                catchError(this.serviceError),
                first()
            );
    }

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