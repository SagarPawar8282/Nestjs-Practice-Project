import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  create() {
    return 'This action adds a new store';
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update() {
    return `This action updates a # store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
