import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Chip } from '../../core/models/Chip';

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'mng-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() chips: Chip[];
  @Output() chipsChange: EventEmitter<Chip[]> = new EventEmitter<Chip[]>();

  @Output() onUpdateState: EventEmitter<void> = new EventEmitter<void>();
  @Output() onColumnMove: EventEmitter<[number, number]> = new EventEmitter<
    [number, number]
  >();
  @Output() onColumnDeletion: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  updateColumnName(event): void {
    const {
      target: { textContent: newName },
    } = event;

    if (newName === this.name) {
      return;
    }

    if (newName === '') {
      event.target.textContent = this.name;
      return;
    }

    this.name = newName;

    this.nameChange.emit(this.name);
    this.onUpdateState.emit();
  }

  deleteColumn(): void {
    this.onColumnDeletion.emit(this.id);
  }

  moveColumn(type: string) {
    let typeFactor:number = 0;

    switch(type) {
      case 'left':
        typeFactor = -1;
        break;
      case 'right':
        typeFactor = +1;
        break;
      default:
        break;
    }

    this.onColumnMove.emit([this.id, typeFactor]);
  }

  newChip(): void {
    const newChips = [...this.chips];

    const newChip = {
      id: uuid(),
      name: 'New chip',
      description: 'A brand-new chip!',
    };

    newChips.push(newChip);

    this.chips = newChips;

    this.chipsChange.emit(this.chips);
    this.onUpdateState.emit();
  }

  deleteChip(chipId: number): void {
    const newChips: Chip[] = [...this.chips];

    const chipIndex = newChips.findIndex(function matchId(column) {
      return column.id === chipId;
    });

    newChips.splice(chipIndex, 1);

    this.chips = newChips;

    this.chipsChange.emit(this.chips);
    this.onUpdateState.emit();
  }

  updateState() {
    this.onUpdateState.emit();
  }
}
