import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HwpViewerComponent } from './hwp-viewer/hwp-viewer.component';
import { ModelTreeComponent } from './model-tree/model-tree.component';
import { ModelTreeItemComponent } from './model-tree-item/model-tree-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HwpViewerComponent,
    ModelTreeComponent,
    ModelTreeItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
