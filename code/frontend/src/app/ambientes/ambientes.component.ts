import { Component, inject, signal } from '@angular/core';
import { AmbienteService } from '../services/ambiente.service';
import { Ambiente } from '../models/ambiente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ambientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ambientes.component.html',
  styleUrl: './ambientes.component.scss'
})
export class AmbientesComponent {
    ambienteService = inject(AmbienteService);
    ambientes$ = this.ambienteService.obter();

    constructor(){}    
}
