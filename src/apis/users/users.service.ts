import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user.repository';
import { Users } from './users.model';
@Injectable()
export class UsersService {

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof Users) { }

  async isEmailAlreadyInUse(email: string): Promise<Boolean> {
    const emailExits = await this.userRepository.findOne({ where: { email: email } });
    return emailExits != null ? true : false;
  }

  async isEmailExits(email: string) {
    const exit = await this.userRepository.findOne({ where: { email: email } });
    return exit != null ? exit : false;
  }

  async createUser(userInfo, roleId:number) {
    const user = await this.userRepository.create({
      email: userInfo.email,
      password: userInfo.password,
      roleId: roleId
    });

    return user;
  }

  async registerCustomer(registrationInfo) {
    try {
      const roleId = 2;
      const userInfo = { email: registrationInfo.email, password: registrationInfo.password };
      const userRegister = await this.createUser(userInfo, roleId)
      

      if (!userRegister) {
        return null;
      }
      return userRegister;

    } catch (err) {
      return err.message;
    }
  }

  

  async registerStore(registrationInfo) {
    try {
      const roleId = 3;
      const userInfo = {email:registrationInfo.email, password:registrationInfo.password}
      const userRegister = await this.createUser(userInfo,roleId) ;

      if(!userRegister){
        return 'unknown error '
      }

      return userRegister;
     
    } catch (error) {
      return error.message
    }
  }

  async deleteUser(storeId){
    return await this.userRepository.destroy({where:{id:storeId}});
  }
}
