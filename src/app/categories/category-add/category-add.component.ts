import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Category } from 'src/app/model-dto/category/category';
import { FileHandle } from 'src/app/model-dto/file-handle.model';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private router: Router){}

  category: Category = new Category();
  categoryImageFile: FileHandle | undefined;
  categoryParentsList: Category[] = [];

  ngOnInit(): void {
    this.getCategoryParents();
  }
  
  getCategoryParents(){
    this.productService.getAllParentCategories()
    .subscribe({
      next: (next: Category[]) =>{
        this.categoryParentsList = next;
      },
      error: (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    });
  }

  addCategory(categoryForm: NgForm){   
    const formData =  this.prepareFormData(this.category);

    this.productService.addCategory(formData).subscribe({
      next: (next : Category) => {
        categoryForm.reset();
        this.categoryImageFile = undefined;
        this.getCategoryParents();
      },
      error : (error: HttpErrorResponse) =>{
        console.log(error)
      }
    });
  }


  prepareFormData(category: Category): FormData{
    const formData = new FormData();

    formData.append(
      'category', 
      new Blob([JSON.stringify(category)], {
        type: 'application/json'
      })
    );

    formData.append(
      'file', 
      this.categoryImageFile!.file,
      this.categoryImageFile!.file.name,
    );
    
    return formData;
  }


  onFileSelected(event: any){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
          )
      }

      this.categoryImageFile = fileHandle;
    }
  }

  clearForm(brandForm: NgForm){
    brandForm.reset();
    this.categoryImageFile = undefined;
  }

  fileDropped(fileHandle: FileHandle){
    this.categoryImageFile = fileHandle;
  }
}
