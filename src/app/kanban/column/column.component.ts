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
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() chips: Chip[];
  @Output() chipsChange: EventEmitter<Chip[]> = new EventEmitter<Chip[]>();

  @Output() onUpdateState: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteColumn: EventEmitter<Number> = new EventEmitter<Number>();

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
    this.onDeleteColumn.emit(this.id);
  }

  newChip(): void {
    const newChips = [...this.chips];
    const newChip = {
      id:
        !newChips[newChips.length - 1] ||
        (newChips[newChips.length - 1] &&
          newChips[newChips.length - 1].id === 0)
          ? ++newChips[newChips.length - 1].id
          : 0,
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
