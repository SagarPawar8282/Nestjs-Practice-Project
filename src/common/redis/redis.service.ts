import { Injectable, OnModuleInit } from "@nestjs/common";
import Redis from "ioredis";
import { logger } from "../logger/logger";
import { MetricsService } from "../metrics/metrics.service";

@Injectable()
export class RedisService implements OnModuleInit {
    private redisClient: Redis

    constructor(private readonly metricsService:MetricsService) {
        this.createRedisClient();
    }

    async createRedisClient() {
        try {
            this.redisClient = new Redis({
                host: 'localhost',
                port: 6379,
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    async onModuleInit() {
        this.redisClient.on("connect", () => {
            logger.info('redis connected');
        });
        this.redisClient.on("reconnecting", () => {
            logger.info('redis reconnected');
        });
        this.redisClient.on("error", (err) => {
            logger.error(`redis error: ${err.message}`);
        });
    }

    async set(key: string, value: any, ttl?: number) {
        try {
            const data = JSON.stringify(value);

            if (ttl) {
                await this.redisClient.set(key, data, 'EX', ttl);
                return true;
            }

            await this.redisClient.set(key, data);
            return true;
        } catch (error) {
            this.metricsService.redisProducerError.labels('set').inc();
            logger.error(error.message);
        }
    }

    async get(key: string) {
        try {
            const data = await this.redisClient.get(key);
            if (!data) {
                return null;
            }
            return await JSON.parse(data);
        } catch (error) {
            this.metricsService.redisProducerError.labels('get').inc();
            logger.error(error.message);
        }
    }

    async findKeys(pattern:string){
        try{
            const keys = await this.redisClient.keys(pattern);
            return keys;
        }catch(error){
            logger.error(error.message);
        }
    }

    async delete(keys:string[]){
        try{
            const result = await this.redisClient.del(keys);
            return result; 
        }catch(error){

            logger.error(error.message);
        }
    }

    async clearRedis(){
        try{
            const clearRedis = await this.redisClient.flushall();
            return clearRedis;
        }catch(error){
            logger.error(error.message);
        }
    }
}