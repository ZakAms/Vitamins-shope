import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SorterService } from '../../core/services/sorter.service';
import { TrackByService } from '../../core/services/trackby.service';
import { IProduct } from '../../shared/interfaces';

@Component({
  selector: 'cm-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css'],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsGridComponent implements OnInit {

  @Input() products: IProduct[] = [];

  constructor(private sorterService: SorterService, public trackbyService: TrackByService) { }

  ngOnInit() {

  }

  sort(prop: string) {
    this.products = this.sorterService.sort(this.products, prop);
  }

}
