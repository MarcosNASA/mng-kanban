import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mng-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
})
export class ChipComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;

  constructor() {}

  ngOnInit(): void {}

  deleteChip(): void {}
}
