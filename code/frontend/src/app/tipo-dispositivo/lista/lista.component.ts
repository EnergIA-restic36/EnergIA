import { Component, inject, signal, viewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TipoDispositivo } from '../models/tipo-dispositivo';
import { TipoDispositivoService } from '../tipo-dispositivo.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { TipoDispositivoInclusaoComponent } from '../inclusao/inclusao.component';
import { TipoDispositivoAlteracaoComponent } from '../alteracao/alteracao.compomente';

@Component({    
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, DialogModule, ToastModule, NgxUiLoaderModule, TipoDispositivoInclusaoComponent, TipoDispositivoAlteracaoComponent],
    providers: [MessageService],
    templateUrl: './lista.component.html',
    styleUrl: './lista.component.scss'
})
export class TipoDispositivoComponent {    
    tipoDispositivoInclusao = viewChild.required(TipoDispositivoInclusaoComponent);
    tipoDispositivoAlteracao = viewChild.required(TipoDispositivoAlteracaoComponent);
    tipoDispositivoService = inject(TipoDispositivoService);
    tiposDispositivo = signal<TipoDispositivo[]>([]);
    tipoDispositivo = signal<TipoDispositivo>({id: 0, nome: ""});
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
        this.tipoDispositivoService.obterTodos()
        .subscribe({
            next: (retorno) => { this.tiposDispositivo.set(retorno) },
            complete: () => { this.ngxService.stop() },
            error: (e) => { this.processarFalha(e) }
        });
    }

    hideDialog() {
        this.modalInclusao.set(false);
        this.modalAlteracao.set(false);
    }

    editar(tipoDipositivo: TipoDispositivo) {
        this.tipoDispositivo.set({ ...tipoDipositivo });
        this.modalAlteracao.set(true);
    }

    excluir(tipoDipositivo: TipoDispositivo) {
        this.tipoDispositivo.set({...tipoDipositivo})
        this.modalExclusao.set(true);
    }
    
    processarInclusao(resultado: any) {
        if (resultado.sucesso) {        
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tipo de dispositivo incluído com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarDados();
            return;
        }
        this.processarFalha(resultado.dados);
    }

    processarAlteracao(resultado: any) {        
        if (resultado.sucesso) {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tipo de dispositivo alterado com sucesso!', life: 3000 });
            this.hideDialog();
            this.atualizarDados();
            return;
        }
        this.processarFalha(resultado.dados);
    }

    confirmarExclusao() {
        this.modalExclusao.set(false);
        this.tipoDispositivoService.excluir(this.tipoDispositivo().id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tipo de dispositivo excluído com sucesso!', life: 3000 });
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
