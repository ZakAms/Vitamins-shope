import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IProduct } from '../../shared/interfaces';
import { TrackByService } from '../../core/services/trackby.service';

@Component({
  selector: 'cm-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: [ './products-card.component.css' ],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsCardComponent implements OnInit {

  @Input() products: IProduct[] = [];

  constructor(public trackbyService: TrackByService) { }

  ngOnInit() { }

}

