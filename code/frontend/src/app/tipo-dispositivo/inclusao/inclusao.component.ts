import { Component, inject, OnInit, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { TipoDispositivo } from "../models/tipo-dispositivo";
import { TipoDispositivoService } from "../tipo-dispositivo.service";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-tipo-dispositivo-inclusao',
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass],
    templateUrl: './inclusao.component.html'
})
export class TipoDispositivoInclusaoComponent {
    onSave = output<{ sucesso: boolean, dados: any }>();
    tipoDispositivo = signal<TipoDispositivo>({id: 0, nome: ""});
    submitted = signal(false);
    tipoDispositivoService = inject(TipoDispositivoService);

    gravar() {
        this.submitted.set(true);
        if (!this.tipoDispositivo().nome.trim())
            return;

        this.tipoDispositivoService.incluir(this.tipoDispositivo()).subscribe({
            next: (e) => {this.onSave.emit({sucesso: true, dados: this.tipoDispositivo})},
            error: (e) => {this.onSave.emit({sucesso: false, dados: e})}
        });
    }
}