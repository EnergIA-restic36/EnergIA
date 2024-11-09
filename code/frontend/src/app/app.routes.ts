import { Routes } from '@angular/router';
import { AmbienteComponent } from './ambiente/lista/lista.component';

export const routes: Routes = [
    {
        path: '',
        component: AmbienteComponent
    },
    {
        path: 'ambientes',
        component: AmbienteComponent
    }
];
