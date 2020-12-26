import { Component, OnInit, ViewChild,
  ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IProduct, IPagedResults } from '../shared/interfaces';
import { FilterService } from '../core/services/filter.service';
import { LoggerService } from '../core/services/logger.service';


@Component({
  selector: 'cm-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  title: string;
  filterText: string;
  products: IProduct[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords = 0;
  pageSize = 2;
  _filteredProducts: IProduct[] = [];

  get filteredProducts() {
    return this._filteredProducts;
  }

  set filteredProducts(value: IProduct[]) {
    this._filteredProducts = value;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private dataService: DataService,
    private filterService: FilterService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.title = 'Products';
    this.filterText = 'Filter Products:';
    this.displayMode = DisplayModeEnum.Card;

    this.getProductsPage(1);
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.getProductsPage(page);
  }

  getProductsPage(page: number) {
    this.dataService.getProductsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IProduct[]>) => {
          this.products = this.filteredProducts = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getProductsPage() retrieved products for page: ' + page));
  }

  filterChanged(data: string) {
    if (data && this.products) {
        data = data.toUpperCase();
        const props = ['productName', 'description'];
        this.filteredProducts = this.filterService.filter<IProduct>(this.products, data, props);
    } else {
      this.filteredProducts = this.products;
    }
  }

}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
}
