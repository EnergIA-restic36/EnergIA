import { Component, inject, OnInit, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { Ambiente } from "../models/ambiente";
import { AmbienteService } from "../ambiente.service";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-ambiente-inclusao',
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass],
    templateUrl: './inclusao.component.html'
})
export class AmbienteInclusaoComponent {
    onSave = output<{ sucesso: boolean, dados: any }>();
    ambiente = signal<Ambiente>({id: 0, nome: ""});
    submitted = signal(false);
    ambienteService = inject(AmbienteService);

    gravar() {
        this.submitted.set(true);
        if (!this.ambiente().nome.trim())
            return;

        this.ambienteService.incluir(this.ambiente()).subscribe({
            next: (e) => {this.onSave.emit({sucesso: true, dados: this.ambiente})},
            error: (e) => {this.onSave.emit({sucesso: false, dados: e})}
        });
    }
}