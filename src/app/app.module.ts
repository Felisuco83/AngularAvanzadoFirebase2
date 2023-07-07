import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { FirestoreModule } from '@angular/fire/firestore';
import { FirestoreService } from './services/firestore.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirestoreModule,
    FormsModule
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
