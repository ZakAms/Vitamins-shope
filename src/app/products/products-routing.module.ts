import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsCardComponent } from './products-card/products-card.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';

const routes: Routes = [
  { path: '', component: ProductsComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProductsRoutingModule {
  static components = [ ProductsComponent, ProductsCardComponent, ProductsGridComponent ];
}
