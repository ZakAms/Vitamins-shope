import { RouterTestingModule } from '@angular/router/testing';
import { sandboxOf } from 'angular-playground';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsCardComponent } from './products-card/products-card.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { CoreModule } from '../core/core.module';
import { products, MockDataService } from '../shared/mocks';
import { DataService } from '../core/services/data.service';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule, RouterTestingModule ],
  declarations: [ ProductsCardComponent, ProductsGridComponent ],
  providers: [
    { provide: DataService, useClass: MockDataService }
],
  label: 'Products Component'
};

export default sandboxOf(ProductsComponent, sandboxConfig)
  .add('With Products', {
    template: `<cm-products></cm-products>`
  });
