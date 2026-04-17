import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  create() {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update() {
    return `This action updates a # customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
