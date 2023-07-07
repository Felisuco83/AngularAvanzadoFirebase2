import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { FileUpload } from '../models/fileUpload.mode';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  ref?: AngularFireStorageReference;
  task?: AngularFireUploadTask;

  constructor(private storage: AngularFireStorage) { }


  public getImage(): Observable<any> {
    return this.storage.ref('images/X4pro.jpg').getDownloadURL();
  }

  // public updateImage(event: any, metadata: any) {
  //   return this.deleteImage(`/images/${metadata.name}`)
  //     .toPromise()
  //     .then(() => this.upload(event, metadata))
  //     .catch(() => `No se ha podido eliminar el fichero /images/${metadata.name}'`);
  // }

  public deleteImage(path: string) {
    return this.storage.ref(path).delete();
  }

  // upload = (event: any, metadata: any) => {
  //   return this.storage.upload(`/images/${metadata.name}`, event.target.files[0], { customMetadata: metadata });
  // }

  upload = (file: File) => {
    return this.storage.upload(`/images/${file.name}`, file, { customMetadata: { name: file.name, size: file.size.toString() } });
  }
}
