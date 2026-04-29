import { Inject, Injectable } from '@nestjs/common';
import { STORE_REPOSITORY } from './store.repository';
import { Store } from './store.model';
import { Users } from '../users/users.model';
import { Roles } from '../roles/roles.model';
import { ProductService } from '../product/product.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class StoreService {

  constructor(
    @Inject(STORE_REPOSITORY)private readonly storeRespository:typeof Store,
    private productService:ProductService,private userService:UsersService){}

  async findAllProductUnderProductCate(productCategory:string) {
    return this.productService.findAllProductUnderProductCategory(productCategory);
  }

  async findOne(id: number) {
    return await this.storeRespository.findOne({where:{id}});
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

  async deleteStore( id: number){
    const isStoreExit= await this.storeRespository.findOne({where:{id:id}});
    
    if(!isStoreExit){
      return "no store register under this id";
    }

    const store = await this.userService.deleteUser(isStoreExit.userId);
    console.log("store: "+JSON.stringify(store));
    if(store){
      return "store deleted";
    } 
    return null;
  }
}
