import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Chip } from '../../core/models/Chip';

@Component({
  selector: 'mng-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() chips: Chip[];

  @Output() nameChange: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  updateColumnTitle({ target: { textContent: newName } }): void {
    this.name = newName;

    this.nameChange.emit();
  }

  deleteColumn(): void {}

  newChip(): void {}
}
