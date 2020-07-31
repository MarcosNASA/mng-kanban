import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { KanbanComponent } from './kanban.component';

import { ColumnModule } from './column/column.module';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [KanbanComponent],
  imports: [BrowserModule, ColumnModule, DragDropModule],
  exports: [KanbanComponent],
})
export class KanbanModule {}
