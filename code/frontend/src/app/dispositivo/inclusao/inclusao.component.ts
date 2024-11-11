import { Component, inject, OnInit, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { NgClass } from "@angular/common";
import { Dispositivo } from "../models/dispositivo";
import { DispositivoInclusao } from "../models/dispositivo-inclusao";
import { DispositivoService } from "../dispositivo.service";
import { Ambiente } from "../../ambiente/models/ambiente";
import { AmbienteService } from "../../ambiente/ambiente.service";
import { TipoDispositivo } from "../../tipo-dispositivo/models/tipo-dispositivo";
import { TipoDispositivoService } from "../../tipo-dispositivo/tipo-dispositivo.service";
import { DropdownModule } from "primeng/dropdown";

@Component({
    selector: 'app-dispositivo-inclusao',
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass, DropdownModule],
    templateUrl: './inclusao.component.html'
})
export class DispositivoInclusaoComponent {
    onSave = output<{ sucesso: boolean, dados: any }>();
    dispositivo = signal<DispositivoInclusao>({id: "", ambienteId: 0, nome: "", tipoDispositivoId: 0 });
    submitted = signal(false);
    dispositivoService = inject(DispositivoService);
    ambienteService = inject(AmbienteService);
    ambientes: Ambiente[] = [];
    tipoDispositivoService = inject(TipoDispositivoService);
    tiposDispositivos: TipoDispositivo[] = [];

    constructor() {
        this.ambienteService.obterTodos().subscribe({
            next: (response) => this.ambientes = response
        });

        this.ambienteService.obterTodos().subscribe({
            next: (response) => this.tiposDispositivos = response
        });
    }

    gravar() {
        this.submitted.set(true);
        if (!this.dispositivo().nome.trim())
            return;

        this.dispositivoService.incluir(this.dispositivo()).subscribe({
            next: (e) => {this.onSave.emit({sucesso: true, dados: this.dispositivo})},
            error: (e) => {this.onSave.emit({sucesso: false, dados: e})}
        });
    }
}