import { Component, inject, input, output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { AmbienteService } from '../../ambiente/ambiente.service';
import { Ambiente } from '../../ambiente/models/ambiente';
import { TipoDispositivo } from '../../tipo-dispositivo/models/tipo-dispositivo';
import { TipoDispositivoService } from '../../tipo-dispositivo/tipo-dispositivo.service';
import { DispositivoService } from '../dispositivo.service';

@Component({
    selector: 'app-dispositivo-inclusao',
    standalone: true,
    imports: [FormsModule, InputTextModule, DropdownModule, ReactiveFormsModule],
    templateUrl: './inclusao.component.html',
    styleUrl: './inclusao.component.css'
})
export class DispositivoInclusaoComponent {
    onSave = output<{ sucesso: boolean, dados: any }>();    
    dispositivoId = input("");
    submitted = signal(false);
    dispositivoService = inject(DispositivoService);
    ambienteService = inject(AmbienteService);
    ambientes: Ambiente[] = [];
    tipoDispositivoService = inject(TipoDispositivoService);
    tiposDispositivos: TipoDispositivo[] = [];

    dispositivoForm: FormGroup;

    constructor(private fb: FormBuilder) {

        this.dispositivoForm = this.fb.group({
            id: [this.dispositivoId(), Validators.required],
            nome: ['', Validators.required],
            ambienteId: [, [Validators.required, Validators.min(1)]],
            tipoDispositivoId: [, [Validators.required, Validators.min(1)]],
        });
        this.ambienteService.obterTodos().subscribe({
            next: (response) => this.ambientes = response
        });

        this.tipoDispositivoService.obterTodos().subscribe({
            next: (response) => this.tiposDispositivos = response
        });
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes['dispositivoId']) {
          this.dispositivoForm.patchValue({ id: this.dispositivoId() }); // Atualiza o campo `id` quando o valor muda
        }
      }
      
    gravar() {
        this.submitted.set(true);
        if (!this.dispositivoForm.valid) {
            return;            
        }
        
        const dispositivo = this.dispositivoForm.value;
        
        this.dispositivoService.incluir(dispositivo).subscribe({
            next: (e) => {this.onSave.emit({sucesso: true, dados: dispositivo})},
            error: (e) => {this.onSave.emit({sucesso: false, dados: e})}
        });        
    }
}