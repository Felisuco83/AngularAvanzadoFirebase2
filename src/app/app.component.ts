import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Item } from './models/item.model';
import { FirestoreService } from './services/firestore.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'listado-reordenable';

  file: any;
  msg: string = '';

  // itemList: Item[] = [
  //   { id: 1, text: 'Tarea 1', completed: false },
  //   { id: 2, text: 'Tarea 2', completed: false },
  //   { id: 3, text: 'Tarea 3', completed: true }
  // ]

  itemList: Item[] = [];
  constructor(private firestore: FirestoreService, private storage: StorageService) { }

  ngOnInit() {
    this.firestore.getTareas()
      .subscribe((tareas: Item[]) => (this.itemList = tareas));
    console.log(this.storage.getImage());
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.itemList, event.previousIndex, event.currentIndex);
  }

  // completeItem(event: boolean, id: number) {
  //   this.itemList[id].completed = event;
  // }
  completeItem(event: boolean, id: number) {
    this.firestore.updateTarea(id, event);
  }

  updateTareas() {
    this.firestore.updateTareas(true);
  }

  deleteItems() {
    this.firestore.deleteTareas();
  }

  // createItem() {
  //   let newID = this.itemList.length;
  //   this.firestore.addTarea({
  //     id: newID,
  //     text: `Tarea ${newID}`,
  //     completed: false,
  //   });
  // }

  // public fileBrowseHandler(event: any) {
  //   if (event.target && event.target.files) {
  //     for (const file of event.target.files) {
  //       let metadata = { name: file.name, size: file.size };

  //       this.storage.upload(event, metadata);
  //     }
  //   }
  // }

  public fileBrowseHandler(event: any) {
    this.file = event.target.files[0];
  }

  createItem() {
    let newID = this.itemList.length;
    // let metadata = { name: this.file.name, size: this.file.size };

    this.storage
      .upload(this.file)
      .then((data: any) => {
        return data.ref
          .getDownloadURL()
          .then((url: string) => {
            this.firestore.addTarea({
              id: newID,
              text: this.msg,
              completed: false,
              img: url,
            });
          })
          .catch((error: any) => {
            console.log('¡Error al publicar la imagen! ', error);
          });
      });
  }
}
