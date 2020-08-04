import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { KanbanComponent } from './kanban.component';

import { ColumnModule } from './column/column.module';

@NgModule({
  declarations: [KanbanComponent],
  imports: [BrowserModule, ColumnModule],
  exports: [KanbanComponent],
})
export class KanbanModule {}
