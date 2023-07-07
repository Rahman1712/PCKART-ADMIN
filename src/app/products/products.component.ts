import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ProductResponse } from '../model-dto/product/productResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model-dto/product/product';
// import * as $ from 'jquery';
import { ProductDTO } from '../model-dto/product/productDTO';
import { MatDialog } from '@angular/material/dialog';
import { ProductViewComponent } from './product-view/product-view.component';
import { ImageProcessingService } from '../_services/image-processing-service.service';
import { map } from 'rxjs';
import { data } from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  /*  any 3 of these
  public products: Product[] | undefined;
  public products!: Product[];
  public products: Product[] = [];
  */
  public products: ProductResponse[] | undefined;
  public productsListImgs: ProductDTO<any,any>[] | undefined;
  public productDtoById : ProductDTO<any,any>;

  public popoverTitle: string = 'Delete Product';
  public popoverMessage: string = 'Would you like to delete product?'
  public cancelClicked: boolean = false;
  public confirmClicked: boolean = false;

  constructor(private productService: ProductService, 
    public dialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
    ){}

  ngOnInit(): void {
    
        /**
   * Sidebar toggle
   */
    // if (select('.toggle-sidebar-btn')) {
    //   on('click', '.toggle-sidebar-btn', function(e) {
    //     select('body').classList.toggle('toggle-sidebar')
    //   })
    //}
    //$(document).ready(function(){});

    // $(function () {
    //   $( "#productsTable" ).on( "click", function() {
    //     alert( "Handler for `click` called." );
    //   });
    // });

    this.getProducts();
    this.getAllProductsWithImages();
  }

  public getProducts(): void{
    this.productService.getProducts().subscribe(
      (response: ProductResponse[]) =>{
        console.log(response)
        this.products = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getAllProductsWithImages(): void{
    this.productService.getAllProductsWithImages()
    .pipe(
      map((x: ProductDTO<any,any>[] , i) => 
        x.map((product: ProductDTO<any,any>) => 
          this.imageProcessingService.createMainImageToProdDto(product)
        )
      )
    )
    .subscribe({
      next: (next: ProductDTO<any,any>[]) =>{
        console.log(next)
        this.productsListImgs = next;
      },
      error: (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }

  public getProductDetailsWithImagesById(productId : number): any{
    this.productService.getProductByIdWithImages(productId)
    .pipe(
      map((product: ProductDTO<any,any>) => 
        this.imageProcessingService.createMainAndSubImagesToProdDto(product)
      )
    )
    .subscribe({
      next: (next: ProductDTO<any,any>) =>{
        console.log(next)
        // this.productDtoById = next
        return next
      },
      error: (error: HttpErrorResponse) =>{
        alert(error.message)
        return null
      }
    });
  }

  showProductDetails(productId: number) {
    this.router.navigate(['/product-view',{productId: productId}]); 
  }
  
  updateProductDetails(productId: number){
    this.router.navigate(['/product-update', {productId: productId}]);
  }
  /*
  async showProductDetails(productId: number) {
    try {
      const prod = await this.getProductDetailsWithImagesById(productId);
  
      this.dialog.open(ProductViewComponent, {
        data: {
          images: prod
        },
        height: '400px',
        width: '600px'
      });
  
      this.dialog.afterAllClosed.subscribe(r => {
        console.log("CLOSED");
      });
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  }
  */

  removeProductItem(productId: number, index: number){
    this.productService.deleteProductById(productId)
    .subscribe({
      next: (next: any) =>{
        this.productsListImgs?.splice(index, 1);
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        alert(error.message)
      }
    });
    
  }
  
  // showProductDetails(productId: number){
  //   const prod = this.getProductDetailsWithImagesById(productId)
  //   this.productShowDialog.open(ProductViewComponent, {
  //     data: {
  //       images: prod
  //     },
  //     height: '400px',
  //     width: '600px'
  //   });

  //   this.productShowDialog.afterAllClosed.subscribe(r=>{
  //     console.log("CLOSED")
  //   })
  // }


  
}
