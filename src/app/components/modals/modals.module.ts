import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationModal } from './confirmation-modal/confirmation.modal';
import { DipendenteModal } from './dipendente-modal/dipendente.modal';
import { SettoreModal } from './settore-modal/settore.modal';
import { ProgettoModal } from './progetto-modal/progetto.modal';
import { RuoliModal } from './ruoli-modal/ruoli.modal';
import { ProgettoDipendenteModal } from './progettoDipendente-modal/progettoDipendente.modal';
import { MaterialModule } from 'src/app/material.module';
import { AttivitaModal } from './attivita-modal/attivita-modal';

@NgModule({
  declarations: [
    DipendenteModal,
    ConfirmationModal,
    SettoreModal,
    ProgettoModal,
    RuoliModal,
    ProgettoDipendenteModal,
    AttivitaModal],
  exports: [
    DipendenteModal,
    ConfirmationModal,
    SettoreModal,
    ProgettoModal,
    RuoliModal,
    ProgettoDipendenteModal,
    AttivitaModal],
  imports: [
    CommonModule,
    ReactiveFormsModule,
   MaterialModule
  ],
})
export class ModalsModule {}
