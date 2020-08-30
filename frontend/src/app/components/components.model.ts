import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { QuestCreatorComponent } from './quest-creator/quest-creator.component';
import { PointEditorComponent } from './point-editor/point-editor.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  imports: [
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    MatCheckboxModule
  ],
  declarations: [MapComponent, LoginComponent, HeaderComponent, QuestCreatorComponent, PointEditorComponent],
  exports: [MapComponent, LoginComponent, HeaderComponent, QuestCreatorComponent,PointEditorComponent]
})
export class ComponentsModule { }
