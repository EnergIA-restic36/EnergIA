import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TabMenuModule],
    styleUrl: './app.component.scss',
    template: `
        <p-tabMenu [model]="items"></p-tabMenu>
        <div style="padding: 20px 20px 0 20px;">
            <router-outlet></router-outlet>   
        </div>
  `
})
export class AppComponent implements OnInit {
    title = 'frontend';
    items: MenuItem[] = [
        { label: 'Ambientes', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/ambientes'] },
        { label: 'Tipos de Dispositivos', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/tipos-dispositivos'] },
        { label: 'Dispositivos', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/dispositivos'] },
        { label: 'Consumos', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/consumos'] }
    ]

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.primengConfig.zIndex = {
            modal: 1100,    // dialog, sidebar
            overlay: 1000,  // dropdown, overlaypanel
            menu: 1000,     // overlay menus
            tooltip: 1100   // tooltip
        };
        this.primengConfig.setTranslation({
            "apply": "Aplicar",
            "accept": "Sim",
            "reject": "Não",
            "cancel": "Cancelar",
            "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            "dayNamesMin": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            "dateFormat": "dd/mm/yy",
            "today": "Hoje",
            "passwordPrompt": "Digite uma senha",
            "emptyMessage": "Nenhum registro encontrado",
            "emptyFilterMessage": "Nenhum registro encontrado"
        });
    }
}
