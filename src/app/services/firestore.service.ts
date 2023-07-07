import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  public getTareas(): Observable<Item[]> {
    return this.firestore
      .collection('tareas')
      .valueChanges({ idField: 'id' }) // Add type constraint and specify idField
      .pipe(map(this.treatData));
  }

  /* Método para eliminar todas las tareas de la colección 'tareas' */
  public deleteTareas() {
    this.firestore
      .collection('tareas')
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot?.forEach((doc) => {
          doc.ref.delete();
        });
      });
  }

  /* Método para eliminar una tarea de la colección 'tareas' */
  public deleteTarea(id: number): void {
    this.firestore
      .collection('tareas')
      .doc(id + '')
      .delete();
  }

  public addTarea(task: Item) {
    this.firestore
      .collection('tareas')
      .doc(task.id + '') // Si no encuentra este documento, lo creará.
      .set(task); // Establecemos el contenido del documento.
  }

  public updateTareas(completed: boolean) {
    this.firestore
      .collection('tareas') // Referenciamos la lista de tareas.
      .get() // Obtenemos la version ACTUAL de sus documentos.
      .toPromise() // Tranformamos el observable a un objeto Promise.
      .then((querySnapshot) => {
        // Recorremos la lista de documentos en esta versión actual
        // de la colección, alojada en el objeto querySnapshot.
        querySnapshot?.forEach((doc) => {
          // Actualizamos la propiedad completed de cada tarea.
          doc.ref.update({
            completed: completed,
          });
        });
      });
  }

  public updateTarea(id: number, completed: boolean): void {
    this.firestore.doc(`tareas/${id}`).update({ completed: completed });
  }

  private treatData(data: any[]): Item[] {
    return data.map((item: any) => (
      { id: item.id, text: item.text, completed: item.completed, img: item.img }
    ));
  }
}
