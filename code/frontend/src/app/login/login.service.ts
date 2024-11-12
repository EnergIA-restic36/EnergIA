import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { catchError, first, Observable } from "rxjs";
import { BaseService } from "../services/base.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseService {
    private urlApi = `${environment.urlApi}auth`;
    private http = inject(HttpClient);

    efetuarLogin(login: string, password: string) : Observable<any>  {
        return this.http.post(`${this.urlApi}/entrar`, {login, password}, {responseType: "text"})
            .pipe(
                catchError(this.serviceError),
                first());
    }
}