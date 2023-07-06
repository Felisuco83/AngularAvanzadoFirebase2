import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item = { id: 0, text: 'prueba', completed: true };
  @Output() complete: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  completeItem() {
    this.complete.emit(!this.item.completed);
  }

}
