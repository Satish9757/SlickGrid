import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialValidationComponent } from './quantities-module/material-validation/material-validation.component';
import { PropertyMappingComponent } from './property-mapping-module/property-mapping/property-mapping.component';
import { RoleaccessComponent } from './roleaccess/roleaccess.component';
import { EditorComponent } from './editor/editor.component';
import { SupplierBOMComponent } from './quantities-module/supplier-bom/supplier-bom.component';



const routes: Routes = [ 
  { path: 'material', component: MaterialValidationComponent },
  { path: 'property', component: PropertyMappingComponent },
  { path: 'roleaccess', component: RoleaccessComponent },
  { path: 'editor', component: EditorComponent },
  {path:'Supplier',component:SupplierBOMComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
