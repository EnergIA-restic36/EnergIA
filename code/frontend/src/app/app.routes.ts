import { Routes } from '@angular/router';
import { AmbienteComponent } from './ambiente/lista/lista.component';
import { TipoDispositivoComponent } from './tipo-dispositivo/lista/lista.component';
import { DispositivoComponent } from './dispositivo/lista/lista.component';
import { ConsumoComponent } from './consumo/lista/lista.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'ambientes', pathMatch: 'full'
    },
    {
        path: 'ambientes',
        component: AmbienteComponent
    },
    {
        path: 'tipos-de-dispositivo',
        component: TipoDispositivoComponent
    },
    {
        path: 'dispositivos',
        component: DispositivoComponent
    },
    {
        path: 'consumos',
        component: ConsumoComponent
    }
];
