import { Component, inject, signal, Signal, viewChild } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { CardModule } from "primeng/card";
import { DispositivoService } from "../dispositivo.service";
import { Dispositivo } from "../models/dispositivo";
import { map } from "rxjs";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlug } from '@fortawesome/free-solid-svg-icons';
import { TooltipModule } from "primeng/tooltip";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { NgxUiLoaderModule, NgxUiLoaderService } from "ngx-ui-loader";
import { DispositivoInclusaoComponent } from "../inclusao/inclusao.component";
import { DialogModule } from "primeng/dialog";
import { MessageService } from "primeng/api";
@Component({
    standalone: true,
    imports: [CardModule, FontAwesomeModule, TooltipModule, ButtonModule, ToastModule, NgxUiLoaderModule, DialogModule, DispositivoInclusaoComponent],
    providers: [MessageService],
    templateUrl: './lista.component.html',
    styleUrl: './lista.component.scss'
})
export class DispositivoComponent {
    dispositivoInclusao = viewChild.required(DispositivoInclusaoComponent);
    dispositivos = signal<Dispositivo[]>([]);
    dispositivoService = inject(DispositivoService);
    faPlug = faPlug;
    modalInclusao = signal(false);   
    messageService = inject(MessageService);
    ngxService = inject(NgxUiLoaderService);
    errorsMessage = signal<string[]>([]);
    dialogVisible = signal(false);

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
                next: (retorno) => { this.dispositivos.set(retorno);}
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

    hideDialog() {
        this.modalInclusao.set(false);
    }

    processarInclusao(resultado: any) {
        if (resultado.sucesso) {        
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Dispositivo incluído com sucesso!', life: 3000 });
            this.hideDialog();
            return;
        }
        this.processarFalha(resultado.dados);
    }

    processarFalha(fail: any) {
        this.errorsMessage.set([...fail]);
        this.dialogVisible.set(true);
        this.ngxService.stop();
    }
}