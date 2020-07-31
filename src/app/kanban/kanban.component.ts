import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

import { Column } from '../core/models/Column';

@Component({
  selector: 'mng-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() columns: Column[];
  @Output() onUpdateState: EventEmitter<Column[]> = new EventEmitter<
    Column[]
  >();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log('onChanges', this.columns);
  }

  updateState(columns?: Column[]): void {
    console.log(columns);
    console.log(this.columns);
    this.onUpdateState.emit(columns || this.columns);
  }

  newColumn(): void {
    const newColumns: Column[] = [...this.columns];

    const newColumn = {
      id: newColumns.length,
      name: 'New column',
      chips: [],
    };
    newColumns.push(newColumn);

    this.columns = newColumns;

    this.updateState(this.columns);
  }
}
