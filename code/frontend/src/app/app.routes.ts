import { Routes } from '@angular/router';
import { AmbientesComponent } from './ambientes/ambientes.component';

export const routes: Routes = [
    {
        path: '',
        component: AmbientesComponent
    },
    {
        path: 'ambientes',
        component: AmbientesComponent
    }
];
