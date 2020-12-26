import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { DataService } from '../../core/services/data.service';
import { ProductDetailsComponent } from './product-details.component';
import { MockDataService, MockActivatedRoute, getActivatedRouteWithParent } from '../../shared/mocks';
import { ActivatedRoute } from '@angular/router';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule ],
  providers: [
      { provide: DataService, useClass: MockDataService },
      { provide: ActivatedRoute, useFactory: () => {
        const route = getActivatedRouteWithParent([{ id: '1' }]);
        return route;
      }}
  ],
  label: 'Product Details Component'
};

export default sandboxOf(ProductDetailsComponent, sandboxConfig)
  .add('With a Product', {
    template: `<cm-product-details></cm-product-details>`
  })
  .add('Without a Product', {
    template: `<cm-product-details></cm-product-details>`,
    providers: [
      { provide: ActivatedRoute, useFactory: () => {
        const route = getActivatedRouteWithParent([{ id: null }]);
        return route;
      }}
    ]
  });
