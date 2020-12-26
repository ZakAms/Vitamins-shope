import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../../shared/shared.module';
import { ProductsCardComponent } from './products-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../core/core.module';
import { products } from '../../shared/mocks';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule, RouterTestingModule ],
  label: 'Products Card Component'
};

export default sandboxOf(ProductsCardComponent, sandboxConfig)
  .add('With Many Products', {
    template: `<cm-productss-card [products]="products"></cm-products-card>`,
    context: {
      products: products
    }
  })
  .add('With 10 Products', {
    template: `<cm-products-card [products]="products"></cm-products-card>`,
    context: {
      customers: products.slice(0, 10)
    }
  })
  .add('With 4 Products', {
    template: `<cm-products-card [customers]="-products"></cm-products-card>`,
    context: {
      customers: products.slice(0, 4)
    }
  })
  .add('Without Products', {
    template: `<cm-products-card></cm-products-card>`
  });

