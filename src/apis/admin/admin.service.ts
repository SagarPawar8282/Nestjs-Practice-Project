import { Inject, Injectable } from '@nestjs/common';
import { ADMIN_REPOSITORY } from './admin.repository';
import { Admin } from './admin.model';
import { Users } from '../users/users.model';
import { Roles } from '../roles/roles.model';

@Injectable()
export class AdminService {
   constructor(
    @Inject(ADMIN_REPOSITORY)private readonly adminRepository:typeof Admin,   
    ){}
 

   async findOne(id:number){
    return await this.adminRepository.findOne({where:{id:id}});
   }

   async getAdminDetailsByUserId(userId){
    const admin = await this.adminRepository.findOne({
        where:{userId:userId},
        include:[{
            model:Users,
            include:[Roles]
        }]
    });
    return admin;
   }
}
