import { Component ,OnInit} from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../_services/image-processing-service.service';
import { Category } from '../model-dto/category/category';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService
    ){}

  ngOnInit(): void {
    this.getCategories();
  }

  categoriesList: Category[];

  public popoverTitle: string = 'Delete Category';
  public popoverMessage: string = 'Would you like to delete category?'
  public cancelClicked: boolean = false;
  public confirmClicked: boolean = false;

  public getCategories(): void{
    this.productService.getAllCategoriesWithImgs()
    .pipe(
      map((categories: Category[] , i) => 
        categories.map((category: Category) => 
          this.imageProcessingService.createCategoryImage(category)
        )
      )
    )
    .subscribe({
      next: (next: Category[]) =>{
        console.log(next)
        this.categoriesList = next;
      },
      error: (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }

  showCategoryDetails(categoryId: number){
    
  }

  removeCategoryItem(categoryId: number,index: number){
    this.productService.deleteCategoryById(categoryId)
    .subscribe({
      next: (next: any) =>{
        this.categoriesList?.splice(index, 1);
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        alert(error.message)
      }
    });
  }
}
