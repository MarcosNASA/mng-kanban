import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ColumnComponent } from './column.component';

import { ChipModule } from './chip/chip.module';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ColumnComponent],
  imports: [BrowserModule, ChipModule, DragDropModule],
  exports: [ColumnComponent],
})
export class ColumnModule {}
