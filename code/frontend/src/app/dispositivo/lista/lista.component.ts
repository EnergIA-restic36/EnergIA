import { Component, signal, Signal } from "@angular/core";
import * as signalR from '@microsoft/signalr';

@Component({
    standalone: true,
    template: `
        <h1>Dispositivos Online<h1>
        <div>{{dispostivosConectados()}}</div>
    `
})
export class DispositivoComponent {
    dispostivosConectados = signal<string[]>([]);
    //connection: signalR.HubConnection;

    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7158/energiaHub")
        .build();

    constructor() {
        this.connection.on("DispositivosConectados", (dispositivos: string[]) => {
            console.log(dispositivos);
            this.dispostivosConectados.set(dispositivos);
        });

        this.connection.start()
            .then(() => this.connection.send("ObterDispositivosConectados", this.connection.connectionId));
    }
}