import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChipComponent } from './Chip.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ChipComponent],
  imports: [BrowserModule, DragDropModule],
  exports: [ChipComponent],
})
export class ChipModule {}
