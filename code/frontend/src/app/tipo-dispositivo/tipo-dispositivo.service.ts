import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { catchError, first } from "rxjs";
import { BaseService } from "../services/base.service";
import { TipoDispositivo } from "./models/tipo-dispositivo";

@Injectable({
    providedIn: 'root'
})
export class TipoDispositivoService extends BaseService {
    private urlApi = environment.urlApi;
    private http = inject(HttpClient);

    obterTodos() {
        return this.http.get<TipoDispositivo[]>(`${this.urlApi}tiposdispositivo`)
            .pipe(
                catchError(this.serviceError),
                first());
    }

    incluir(tipoDipositivo: TipoDispositivo) {
        return this.http.post<TipoDispositivo>(`${this.urlApi}tiposdispositivo`, tipoDipositivo)
            .pipe(
                catchError(this.serviceError),
                first()
            );
    }

    alterar(tipoDipositivo: TipoDispositivo) {
        return this.http.put<TipoDispositivo>(`${this.urlApi}tiposdispositivo/${tipoDipositivo.id}`, tipoDipositivo)
        .pipe(
            catchError(this.serviceError),
            first()
        );
    }

    excluir(id: number) {
        return this.http.delete<TipoDispositivo>(`${this.urlApi}tiposdispositivo/${id}`)
        .pipe(
            catchError(this.serviceError),
            first()
        );
    }
}