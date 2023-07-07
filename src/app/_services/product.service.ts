import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductResponse } from '../model-dto/product/productResponse';
import { Product } from '../model-dto/product/product';
import { ProductDetails } from '../model-dto/product/productDetails';
import { BrandResponse } from '../model-dto/brand/brandResponse';
import { Category } from '../model-dto/category/category';
import { ProductDTO } from '../model-dto/product/productDTO';
import { CategoryResponse } from '../model-dto/category/categoryResponse';
import { Brand } from '../model-dto/brand/brand';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProductUrl = environment.apiProductUrl;
  private apiBrandUrl = environment.apiBrandUrl;
  private apiCategoryUrl = environment.apiCategoryUrl;
  private apiAdminProductUrl = environment.apiAdminProductUrl;
  private apiAdminBrandUrl = environment.apiAdminBrandUrl;
  private apiAdminCategoryUrl = environment.apiAdminCategoryUrl;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>(`${this.apiProductUrl}/get/all-products`);
  }

  public addProduct(formData: FormData): Observable<ProductDetails>{
    return this.http.post<ProductDetails>(`${this.apiAdminProductUrl}/save`, formData);
  }

  public updateProductById(formData: FormData, productId: number): Observable<ProductDetails>{
    return this.http.put<ProductDetails>(`${this.apiAdminProductUrl}/update/${productId}`, formData);
  }

  public deleteProductById(productId: number): Observable<string> {
    return this.http.delete(`${this.apiAdminProductUrl}/delete/${productId}`, { responseType: 'text' });
  }


  public getAllBrandsWithOutImgs(): Observable<BrandResponse[]>{
    return this.http.get<BrandResponse[]>(`${this.apiBrandUrl}/get/all-brands-noimage`);
  }

  public getAllCategoriesWithOutImgs(): Observable<CategoryResponse[]>{
    return this.http.get<CategoryResponse[]>(`${this.apiCategoryUrl}/get/all-categories-noimage`);
  }

  public getAllProductsWithImages(): Observable<ProductDTO<any,any>[]>{
    return this.http.get<ProductDTO<any,any>[]>(`${this.apiProductUrl}/get/all-product-imgs`);
  }

  public getProductByIdWithImages(productId: number): Observable<ProductDTO<any,any>>{
    return this.http.get<ProductDTO<any,any>>(`${this.apiProductUrl}/get/product-imgs/${productId}`);
  }

  public getAllBrandsWithImgs(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.apiBrandUrl}/get/all-brands`);
  }

  public addBrand(formData: FormData): Observable<Brand>{
    return this.http.post<Brand>(`${this.apiAdminBrandUrl}/save`, formData);
  }

  public updateBrandById(formData: FormData, brandId: number): Observable<string>{
    return this.http.put(`${this.apiAdminBrandUrl}/update/${brandId}`, formData, { responseType: 'text' });
  }

  public deleteBrandById(brandId: number): Observable<string> {
    return this.http.delete(`${this.apiAdminBrandUrl}/delete/${brandId}`, { responseType: 'text' });
  }

  public getAllCategoriesWithImgs(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiCategoryUrl}/get/all-categories`);
  }
  
  public getAllParentCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiCategoryUrl}/get/all-parent-categories`);
  }

  public addCategory(formData: FormData): Observable<Category>{
    return this.http.post<Category>(`${this.apiAdminCategoryUrl}/save`, formData);
  }

  public updateCategoryById(formData: FormData, categoryId: number): Observable<string>{
    return this.http.put(`${this.apiAdminCategoryUrl}/update/${categoryId}`, formData, { responseType: 'text' });
  }

  public deleteCategoryById(categoryId: number): Observable<string> {
    return this.http.delete(`${this.apiAdminCategoryUrl}/delete/${categoryId}`, { responseType: 'text' });
  }

}
