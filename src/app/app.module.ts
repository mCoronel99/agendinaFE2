import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { attivitaReducer } from './store/attivita/attivita.reducer';
import { AttivitaEffects } from './store/attivita/attivita.effects';
import { dipendenteReducer } from './store/dipendente/dipendente.reducer';
import { progettoReducer } from './store/progetto/progetto.reducer';
import { progettoDipendenteReducer } from './store/progettoDipendente/progettoDipendente.reducer';
import { ruoloReducer } from './store/ruolo/ruolo.reducer';
import { settoreReducer } from './store/settore/settore.reducer';
import { DipendenteEffects } from './store/dipendente/dipendente.effects';
import { ProgettoEffects } from './store/progetto/progetto.effects';
import { ProgettoDipendenteEffects } from './store/progettoDipendente/progettoDipendente.effects';
import { RuoloEffects } from './store/ruolo/ruolo.effects';
import { SettoreEffects } from './store/settore/settore.effects';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    MaterialModule,

    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('attivita', attivitaReducer),
    StoreModule.forFeature('dipendente', dipendenteReducer),
    StoreModule.forFeature('progetto', progettoReducer),
    StoreModule.forFeature('progettoDipendente', progettoDipendenteReducer),
    StoreModule.forFeature('ruolo', ruoloReducer),
    StoreModule.forFeature('settore', settoreReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AttivitaEffects]),
    EffectsModule.forFeature([DipendenteEffects]),
    EffectsModule.forFeature([ProgettoEffects]),
    EffectsModule.forFeature([ProgettoDipendenteEffects]),
    EffectsModule.forFeature([RuoloEffects]),
    EffectsModule.forFeature([SettoreEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
