import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-orders', // not clear
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {

    }

}


