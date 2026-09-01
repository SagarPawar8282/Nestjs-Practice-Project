import { Injectable } from "@nestjs/common";
import { RedisService } from "src/common/redis/redis.service";
import { logger } from "src/common/logger/logger";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class RedisCleanUpService{
    
    constructor(private readonly redisService:RedisService){}

    @Cron('*/5 * * * *',{name:'redis-clean-up', timeZone:'Asia/Kolkata'})
    async cleanDataFromRedis(){
        try{

            logger.info('file:RedisCleanUpService | method:cleanDataFromRedis | Redis cleanup job started');
           
            const keys = await this.redisService.findKeys('demo:data:*');
            let deleteCount=0;
            let deleteKeysArr=[];

            for(const key of keys){
                const record =  JSON.parse(await this.redisService.get(key));
          
                if(!record){
                    continue;
                }
                
                const createdAt=new Date(record.createdAt).getTime();
                const age = Date.now()-createdAt;
               
                if(age>=2*60*1000){
                   deleteKeysArr.push(key);
                   deleteCount++
                }  
            }
        
            if(deleteKeysArr.length>0){
                const deletedResult = await this.redisService.delete(deleteKeysArr);
                console.log("deleteResult: "+deletedResult);
            }

            logger.info('file:RedisCleanUpService | method:cleanDataFromRedis | Redis cleanup job completed');

        }catch(error){
            logger.error(logger.info(`file:RedisCleanUpService | method:cleanDataFromRedis | error : ${error.message}`));
        }
    }
}
