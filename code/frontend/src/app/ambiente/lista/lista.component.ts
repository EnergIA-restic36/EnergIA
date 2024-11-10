import { Component, inject, signal, viewChild } from '@angular/core';


import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Ambiente } from '../models/ambiente';
import { AmbienteInclusaoComponent } from '../inclusao/inclusao.component';
import { AmbienteAlteracaoComponent } from '../alteracao/alteracao.compomente';
import { AmbienteService } from '../ambiente.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, DialogModule, AmbienteInclusaoComponent, ToastModule, AmbienteAlteracaoComponent, NgxUiLoaderModule],
    providers: [MessageService],
    templateUrl: './lista.component.html',
    styleUrl: './lista.component.scss'
})
export class AmbienteComponent {
    ambienteInclusao = viewChild.required(AmbienteInclusaoComponent);
    ambienteAlteracao = viewChild.required(AmbienteAlteracaoComponent);
    ambienteService = inject(AmbienteService);
    ambientes = signal<Ambiente[]>([]);
    ambiente = signal<Ambiente>({id: 0, nome: ""});
    errorsMessage = signal<string[]>([]);
    dialogVisible = signal(false);
    modalInclusao = signal(false);    
    modalAlteracao = signal(false);
    modalExclusao = signal(false);
    messageService = inject(MessageService);
    ngxService = inject(NgxUiLoaderService);
    
    constructor() {
        this.ngxService.start();
        this.atualizarDados();
    }

    atualizarDados() {
        this.ambienteService.obterTodos()
        .subscribe({
            next: (retorno) => { this.ambientes.set(retorno) },
            complete: () => { this.ngxService.stop() },
            error: (e) => { this.processarFalha(e) }
        });
    }

    hideDialog() {
        this.modalInclusao.set(false);
        this.modalAlteracao.set(false);
    }

    editar(ambiente: Ambiente) {
        this.ambiente.set({ ...ambiente });
        this.modalAlteracao.set(true);
    }

    excluir(ambiente: Ambiente) {
        this.ambiente.set({...ambiente})
        this.modalExclusao.set(true);
    }

    
    processarInclusao(resultado: any) {
        if (resultado.sucesso) {        
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Ambiente incluído com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarDados();
            return;
        }
        this.processarFalha(resultado.dados);
    }

    processarAlteracao(resultado: any) {        
        if (resultado.sucesso) {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Ambiente alterado com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarDados();
            return;
        }
        this.processarFalha(resultado.dados);
    }

    confirmarExclusao() {
        this.modalExclusao.set(false);
        this.ambienteService.excluir(this.ambiente().id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Ambiente excluído com sucesso!', life: 3000 });
                this.atualizarDados()
            },
            error: (e) => {this.processarFalha(e)}
        });
    }

    processarFalha(fail: any) {
        this.errorsMessage.set([...fail]);
        this.dialogVisible.set(true);
    }
}
