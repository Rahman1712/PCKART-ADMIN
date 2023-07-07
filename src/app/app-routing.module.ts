import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './_auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AdminsComponent } from './admins/admins.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { BrandUpdateComponent } from './brands/brand-update/brand-update.component';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { CategoryUpdateComponent } from './categories/category-update/category-update.component';
import { ProductViewComponent } from './products/product-view/product-view.component';
import { ProductResolverService } from './_services/product-resolver-service.service';
//import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent ,  pathMatch: 'full', canActivate: [authGuard], },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent , canActivate: [authGuard], },
  { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard], },
  { path: 'users', component: UsersComponent, canActivate: [authGuard], /*canActivate: [AuthGuard],*/ },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard], },
  { path: 'product-add', component: ProductAddComponent, canActivate: [authGuard], },
  // { path: 'product-update/:productId', component: ProductUpdateComponent, canActivate: [authGuard], },
  { path: 'product-update', component: ProductUpdateComponent, canActivate: [authGuard], resolve: {productDto : ProductResolverService} },
  // { path: 'product-view/:productId', component: ProductViewComponent, canActivate: [authGuard], resolve: {productDto : ProductResolverService}},
  { path: 'product-view', component: ProductViewComponent, canActivate: [authGuard], resolve: {productDto : ProductResolverService}},
  { path: 'orders', component: OrdersComponent , canActivate: [authGuard], },
  { path: 'profile', component: ProfileComponent , canActivate: [authGuard], },
  { path: 'admins', component: AdminsComponent , canActivate: [authGuard], },
  { path: 'brands', component: BrandsComponent , canActivate: [authGuard], },
  { path: 'brand-add', component: BrandAddComponent, canActivate: [authGuard], },
  { path: 'brand-update/:id', component: BrandUpdateComponent, canActivate: [authGuard], },
  { path: 'categories', component: CategoriesComponent , canActivate: [authGuard], },
  { path: 'category-add', component: CategoryAddComponent , canActivate: [authGuard], },
  { path: 'category-update/:id', component: CategoryUpdateComponent , canActivate: [authGuard], },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
