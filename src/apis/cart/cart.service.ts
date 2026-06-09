import { Inject, Injectable } from '@nestjs/common';
import { CART_REPOSITORY } from './cart.repository';
import { CartModel } from './cart.model';
import { ProductPeristenceModel } from '../product-persistence/product-persistence.model';
import { Store } from '../store/store.model';
import { Customer } from '../customer/customer.model';
import { ProductCategory } from '../product-categories/product-categories.model';

@Injectable()
export class CartService {
  constructor(@Inject(CART_REPOSITORY) private readonly cartRespository: typeof CartModel) { }

  async create(createCartData) {
    return await this.cartRespository.create(createCartData);
  }

  async findAllAddedDetailsbyUserId(customerId: number) {
    return await this.cartRespository.findAll({
      where: { customerId: customerId },
      include: [
        {
          model: ProductPeristenceModel,
          include: [Store,ProductCategory]
        },
        {
          model:Customer
        }
      ],
    });
  }

  async findOne(id: number) {
    return await this.cartRespository.findOne({ where: { id: id } });
  }

  async update(id: number, updateCartDto) {
    const isCartExist = await this.findOne(id);

    if(!isCartExist){
      return {message:'cart with this id not present'}
    }

    const response = await this.cartRespository.update(updateCartDto,{where:{id:id}});
    return response;
  }

  async remove(id: number) {
    const result = await this.cartRespository.destroy({where:{id:id}});
    return result;
  }
}
