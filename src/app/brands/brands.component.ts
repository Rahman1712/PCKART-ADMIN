import { Component, OnInit } from '@angular/core';
import { Brand } from '../model-dto/brand/brand';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ImageProcessingService } from '../_services/image-processing-service.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService
    ){}

  ngOnInit(): void {
    this.getBrands();
  }

  brandsList: Brand[];

  public popoverTitle: string = 'Delete Brand';
  public popoverMessage: string = 'Would you like to delete brand?'
  public cancelClicked: boolean = false;
  public confirmClicked: boolean = false;

  public getBrands(): void{
    this.productService.getAllBrandsWithImgs()
    .pipe(
      map((brands: Brand[] , i) => 
        brands.map((brand: Brand) => 
          this.imageProcessingService.createBrandImage(brand)
        )
      )
    )
    .subscribe({
      next: (next: Brand[]) =>{
        console.log(next)
        this.brandsList = next;
      },
      error: (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }
  

  showBrandDetails(brandId: number){
    
  }

  removeBrandItem(brandId: number,index: number){
    this.productService.deleteBrandById(brandId)
    .subscribe({
      next: (next: any) =>{
        this.brandsList?.splice(index, 1);
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        alert(error.message)
      }
    });
  }
}
