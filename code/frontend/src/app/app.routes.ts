import { Routes } from '@angular/router';
import { AmbienteComponent } from './ambiente/lista/lista.component';
import { TipoDispositivoComponent } from './tipo-dispositivo/lista/lista.component';
import { DispositivoComponent } from './dispositivo/lista/lista.component';
import { ConsumoComponent } from './consumo/lista/lista.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// export const routes: Routes = [
//     {
//         path: '',
//         redirectTo: 'dispositivos', pathMatch: 'full'
//     },
//     {
//         path: 'dispositivos',
//         component: DispositivoComponent
//     },
//     {
//         path: 'ambientes',
//         component: AmbienteComponent
//     },
//     {
//         path: 'tipos-de-dispositivo',
//         component: TipoDispositivoComponent
//     },    
//     {
//         path: 'consumos',
//         component: ConsumoComponent
//     },
//     {
//         path: 'login',
//         component: LoginComponent
//     },
// ];

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: 'dispositivos', 
                pathMatch: 'full'
            },
            {
                path: 'dispositivos',
                component: DispositivoComponent
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
                path: 'consumos',
                component: ConsumoComponent
            }
        ]
    }    
];