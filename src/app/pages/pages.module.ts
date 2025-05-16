import { NgModule } from '@angular/core';
import { DipendentiComponent } from './dipendenti/dipendenti.component';
import { CommonModule } from '@angular/common';
import { SettoriComponent } from './settore/settore.component';
import { ProgettoComponent } from './progetto/progetto.component';
import { RuoliComponent } from './ruoli/ruoli.component';
import { ProgettoDipendenteComponent } from './progettoDipendente/progettoDipendente.component';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/components.module';
import { AttivitaComponent } from './attivita/attivita.component';


@NgModule({
  declarations: [
    DipendentiComponent,
    SettoriComponent,
    ProgettoComponent,
    RuoliComponent ,
    ProgettoDipendenteComponent,
    AttivitaComponent ],
  exports: [
    DipendentiComponent,
    SettoriComponent,
    ProgettoComponent,
    RuoliComponent ,
    ProgettoDipendenteComponent,
    AttivitaComponent],
  imports: [
    CommonModule,
   MaterialModule,
   ComponentsModule,
  ]
})
export class PagesModule {}
