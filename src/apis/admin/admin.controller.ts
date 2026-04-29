import { Controller, Delete, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @UseGuards(RoleGuard)
  @Roles('Admin')
  @Get('/:id')
  async findOne(@Param('id',ParseIntPipe)id:number){
    return this.adminService.findOne(id);
  }

}
