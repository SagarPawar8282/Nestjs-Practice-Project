import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  create(createRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update() {
    return `This action updates a #$role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
