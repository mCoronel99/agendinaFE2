import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DipendentiComponent } from './pages/dipendenti/dipendenti.component';
import { SettoriComponent } from './pages/settore/settore.component';
import { ProgettoComponent } from './pages/progetto/progetto.component';
import { RuoliComponent } from './pages/ruoli/ruoli.component';
import { ProgettoDipendenteComponent } from './pages/progettoDipendente/progettoDipendente.component';
import { AttivitaComponent } from './pages/attivita/attivita.component';


const routes: Routes = [
  { path: '', redirectTo: '/dipendenti', pathMatch: 'full' },
  {
    path: 'dipendenti',
    component: DipendentiComponent,
  },
  {
    path: 'settore',
    component: SettoriComponent,
  },
  {
    path: 'progetto',
    component: ProgettoComponent
  },
  {
    path:'ruoli',
    component: RuoliComponent
  },
   {
    path: 'progettoDipendente',
    component: ProgettoDipendenteComponent
  },
  {
    path:'attivita',
    component: AttivitaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
