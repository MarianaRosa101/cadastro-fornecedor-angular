import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';

const routes: Routes = [
  { path: '', component: SupplierFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

