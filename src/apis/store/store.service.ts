import { Inject, Injectable } from '@nestjs/common';
import { STORE_REPOSITORY } from './store.repository';
import { Store } from './store.model';
import { Users } from '../users/users.model';
import { Roles } from '../roles/roles.model';
import { ProductService } from '../product/product.service';
import { UsersService } from '../users/users.service';
import { QueryService } from 'src/core/query/query.service';
import { Query } from 'src/common/services/query/query';

@Injectable()
export class StoreService {

  constructor(
    @Inject(STORE_REPOSITORY)private readonly storeRespository:typeof Store,
    private userService:UsersService,private queryService:QueryService){}

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

  async getAllStoreDetailsByStore(storeCategory:string){
    const store =await this.storeRespository.findAll({
      where:{storeCategory:storeCategory},
      include:[Users]
    });
    return store;
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

  async fetchAllStoreCategories(){
    const categories = await this.queryService.executeQuery(Query.fetchAllStoreCategories(),null);
    let storeCategories = [];

    if(Array.isArray(categories)){
      categories.map((c)=>storeCategories.push(c.store_category));
    }
    return storeCategories;
  }

  async findSimilarStoreFromStoreCategory(storeCategory:string){
    return await this.storeRespository.findAll({where:{storeCategory:storeCategory}});
  }

  async fetchUserDetaisByUserId(userId){
    return await this.storeRespository.findOne({where:{userId:userId}});
  }
}
