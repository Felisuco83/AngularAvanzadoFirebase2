import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Item } from './models/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tema14-firebase2';

  itemList: Item[] = [
    { id: 1, text: 'Tarea 1', completed: false },
    { id: 2, text: 'Tarea 2', completed: false },
    { id: 3, text: 'Tarea 3', completed: true }
  ]

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.itemList, event.previousIndex, event.currentIndex);
  }

  completeItem(event: boolean, id: number) {
    this.itemList[id].completed = event;
  }
}
