import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_CATEGORY_REPOSITORY } from './product-categories.repository';
import { ProductCategory } from './product-categories.model';
import { Query } from 'src/common/services/query/query';
import { QueryService } from 'src/core/query/query.service';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @Inject(PRODUCT_CATEGORY_REPOSITORY)private readonly productCategoryRepository:typeof ProductCategory,
    private queryService:QueryService
  ){}

  async create(createProductCategoryDto) {
    const isExits = await this.findProductCategoryByCategoryName(createProductCategoryDto.productCategory)
    if(isExits){
      return isExits;
    }
    return await this.productCategoryRepository.create(createProductCategoryDto);
  }

  async findAll() {
    const categories =await this.queryService.executeQuery(Query.getAllProductCategory(), null)    
    return categories;
  }

  async findProductCategoryByCategoryName(category:string){
    return await this.productCategoryRepository.findOne({where:{productCategory:category}})
  }

  async findOne(id: number) {
    return await this.productCategoryRepository.findOne({where:{id:id}});
  }

  async update(id: number, updateProductCategoryDto) {
    return await `This action updates a #${id} productCategory`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} productCategory`;
  }
}
