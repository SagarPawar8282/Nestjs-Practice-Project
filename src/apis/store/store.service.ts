import { Inject, Injectable } from '@nestjs/common';
import { STORE_REPOSITORY } from './store.repository';
import { Store } from './store.model';
import { Users } from '../users/users.model';
import { Roles } from '../roles/roles.model';
import { ProductService } from '../product/product.service';

@Injectable()
export class StoreService {

  constructor(
    @Inject(STORE_REPOSITORY)private readonly storeRespository:typeof Store,
    private productService:ProductService){}

  async create() {
    return 'This action adds a new store';
  }

  async findAllProductUnderProductCate(productCategory:string) {
    return this.productService.findAllProductUnderProductCategory(productCategory);
  }

  async findOne(id: number) {
    return await this.storeRespository.findOne({where:{id}});
  }

  async update() {
    return `This action updates a # store`;
  }

  async remove(id: number) {
    return `This action removes a #${id} store`;
  }

  async storeRegistration(storeInfo){
    const store = await this.storeRespository.create(storeInfo);
    return store;
  }

  async getStoreDetailsByStoreId(id:number){
    const store= await this.storeRespository.findOne({
      where:{id:id},
      include:[{
        model:Users,
        include:[Roles]
      }]
    });
    return store;
  }

  async getStoreDetailsByUserId(id){
    const store = await this.storeRespository.findOne({
      where:{userId:id},
      include:[{
        model:Users,
        include:[Roles]
      }]
    }); 
    return store;
  }

  async getJobstatus(id:number){
    return await this.productService.getJobStatus(id);
  }
}
