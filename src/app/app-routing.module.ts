import { AuthGuard } from "./auth.guard";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { CartComponent } from "./cart/cart.component";
import { CategoriesComponent } from "./categories/categories.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { BrandsComponent } from "./brands/brands.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { ProductdetailsComponent } from "./productdetails/productdetails.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", canActivate: [AuthGuard], component: HomeComponent },
  {
    path: "categories",
    canActivate: [AuthGuard],
    component: CategoriesComponent,
  },
  { path: "brands", canActivate: [AuthGuard], component: BrandsComponent },
  { path: "cart", canActivate: [AuthGuard], component: CartComponent },
  { path: "products", canActivate: [AuthGuard], component: ProductsComponent },
  {
    path: "productdetails/:id",
    canActivate: [AuthGuard],
    component: ProductdetailsComponent,
  },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
