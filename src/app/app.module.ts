import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularSlickgridModule } from 'angular-slickgrid';
import { SlickGridComponent } from './slick-grid/slick-grid.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MaterialValidationComponent } from './quantities-module/material-validation/material-validation.component';
import { PropertyMappingComponent } from './property-mapping-module/property-mapping/property-mapping.component'

@NgModule({
  declarations: [
    AppComponent,
    SlickGridComponent,
    SearchComponent,
    MaterialValidationComponent,
    PropertyMappingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSlickgridModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,MatToolbarModule,MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
