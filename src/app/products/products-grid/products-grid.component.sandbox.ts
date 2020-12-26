import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../../shared/shared.module';
import { ProductsGridComponent } from './products-grid.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../core/core.module';
import { products } from '../../shared/mocks';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule, RouterTestingModule ],
  label: 'Products Grid Component'
};

export default sandboxOf(ProductsGridComponent, sandboxConfig)
  .add('With Many Products', {
    template: `<cm-products-grid [products]="products"></cm-products-grid>`,
    context: {
      products: products
    }
  })
  .add('With 10 Products', {
    template: `<cm-products-grid [products]="products"></cm-products-grid>`,
    context: {
      products: products.slice(0, 10)
    }
  })
  .add('With 4 Products', {
    template: `<cm-products-grid [products]="products"></cm-products-grid>`,
    context: {
      products: products.slice(0, 4)
    }
  })
  .add('Without Products', {
    template: `<cm-products-grid></cm-products-grid>`
  });

