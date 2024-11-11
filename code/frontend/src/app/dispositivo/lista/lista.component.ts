import { Component, inject, signal, Signal } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { CardModule } from "primeng/card";
import { DispositivoService } from "../dispositivo.service";
import { Dispositivo } from "../models/dispositivo";
import { map } from "rxjs";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlug } from '@fortawesome/free-solid-svg-icons';
import { TooltipModule } from "primeng/tooltip";
@Component({
    standalone: true,
    imports: [CardModule, FontAwesomeModule, TooltipModule],
    templateUrl: './lista.component.html',
    styleUrl: './lista.component.scss'
})
export class DispositivoComponent {
    dispositivos = signal<Dispositivo[]>([]);
    dispositivoService = inject(DispositivoService);
    faPlug = faPlug;

    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7158/energiaHub")
        .build();

    constructor() {
        this.dispositivoService.obterTodos()
            .pipe(
                map((response) => {
                    return response.map(r => {
                        return { ...r, consumo: 0, online: false, cadastrado: true }
                    })
                })
            ).subscribe({
                next: (retorno) => {
                    this.dispositivos.set(retorno);
                }
            });

        this.connection.on("DispositivosConectados", (dispositivosConectados: string[]) => {
            let dispositivosAtualizados = this.dispositivos();
            dispositivosConectados.forEach(id => {
                let dispositivo = dispositivosAtualizados.find(d => d.id === id);
                if (dispositivo) {
                    dispositivo.online = true;
                } else {
                    dispositivosAtualizados.push(
                        {
                            id: id,
                            nome: "Desconhecido",
                            ambiente: {
                                id: 0,
                                nome: ""
                            },
                            tipoDispositivo: {
                                id: 0,
                                nome: ""
                            },
                            consumo: 0,
                            online: true,
                            cadastrado: false
                        }
                    );
                }
            });
            this.dispositivos.set(dispositivosAtualizados.sort((a, b) => Number(b.online) - Number(a.online)));

            // const dispositivosAtualizados = this.dispositivos().map(dispositivo => {
            //     const dispositivoAtualizado = dispositivosConectados.find(id => id === dispositivo.id);
            //     return dispositivoAtualizado ? { ...dispositivo, online: true } : { ...dispositivo, online: false, consumo: 0 };
            // }).sort((a, b) => Number(b.online) - Number(a.online));
            
            // this.dispositivos.set(dispositivosAtualizados);
        });

        
        this.connection.on("DispositivoConectado", (dispositivoId: string) => {            
            let dispositivosAtualizados = this.dispositivos();
            const index = dispositivosAtualizados.findIndex(d => d.id === dispositivoId);
            if (index !== -1) {
                dispositivosAtualizados[index].online = true;
            } else {
                dispositivosAtualizados.push(
                    {
                        id: dispositivoId,
                        nome: "desconhecido",
                        ambiente: {
                            id: 0,
                            nome: ""
                        },
                        tipoDispositivo: {
                            id: 0,
                            nome: ""
                        },
                        consumo: 0,
                        online: true,
                        cadastrado: false
                    }
                );
            }           

            this.dispositivos.set(dispositivosAtualizados.sort((a, b) => Number(b.online) - Number(a.online)));
        });

        this.connection.on("DispositivoDesconectado", (dispositivoId: string) => {
            let dispositivosAtualizados = this.dispositivos();
            const index = dispositivosAtualizados.findIndex(d => d.id === dispositivoId);
            if (index != -1) {
                if (!dispositivosAtualizados[index].cadastrado) {
                    dispositivosAtualizados.splice(index, 1);
                } else {
                    dispositivosAtualizados[index].online = false;
                }
                
            }

            this.dispositivos.set(dispositivosAtualizados.sort((a, b) => Number(b.online) - Number(a.online)));
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