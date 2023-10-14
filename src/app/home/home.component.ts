import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
  }
}
