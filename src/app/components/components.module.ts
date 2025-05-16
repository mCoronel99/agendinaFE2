import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ModalsModule } from './modals/modals.module';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SidebarComponent, TableComponent],
  exports: [SidebarComponent, TableComponent],
  imports: [CommonModule,
     ModalsModule,
     MaterialModule,
    RouterModule],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
