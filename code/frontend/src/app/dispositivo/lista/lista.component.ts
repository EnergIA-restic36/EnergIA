import { Component, inject, signal, Signal } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { CardModule } from "primeng/card";
import { DispositivoConsumo } from "../models/dispositivoConsumo";
import { DispositivoService } from "../dispositivo.service";
import { Dispositivo } from "../models/dispositivo";
import { map } from "rxjs";

@Component({
    standalone: true,
    imports: [CardModule],
    templateUrl: './lista.component.html',
    styleUrl: './lista.component.scss'
})
export class DispositivoComponent {
    dispositivos = signal<Dispositivo[]>([]);
    dispostivosConectados = signal<DispositivoConsumo[]>([]);
    dispositivoService = inject(DispositivoService);

    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7158/energiaHub")
        .build();

    constructor() {
        this.dispositivoService.obterTodos()
            .pipe(
                map((response) => {
                    return response.map(r => {
                        return { ...r, consumo: 0, online: false }
                    })
                })
            ).subscribe({
                next: (retorno) => {
                    this.dispositivos.set(retorno);
                }
            });

        this.connection.on("DispositivosConectados", (dispositivosConectados: string[]) => {
            const dispositivosAtualizados = this.dispositivos().map(dispositivo => {
                const dispositivoAtualizado = dispositivosConectados.find(id => id === dispositivo.id);
                return dispositivoAtualizado ? {...dispositivo, online: true} : {...dispositivo, online: false, consumo: 0};
            }).sort((a,b) => Number(b.online) - Number(a.online));

            this.dispositivos.set(dispositivosAtualizados);
            console.log(this.dispositivos());
        });

        this.connection.on("Consumo", (dispositivoId: string, consumo: number) => {
            let atualizarConsumos = this.dispositivos();
            const index = atualizarConsumos.findIndex(d => d.id === dispositivoId);
            if (index !== -1) {
                atualizarConsumos[index].consumo = consumo;
            } 
            this.dispositivos.set(atualizarConsumos);
        });

        this.connection.start()
            .then(() => this.connection.send("ObterDispositivosConectados", this.connection.connectionId));
    }
}