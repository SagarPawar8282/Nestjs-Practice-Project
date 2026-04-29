import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE_DATABASE_PROVIDER } from "../constants/app.constants";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class QueryService {
    constructor(@Inject(SEQUELIZE_DATABASE_PROVIDER) private sequelize: Sequelize) { }

    async executeQuery(query: string, options) {
        if (!query) {
            return null;
        }
        if (!options) {
            options = { type: 'SELECT' }
        }

        const response: any = await this.sequelize.query(query, options);

        if (options && options.type === 'SELECT') {
            return response;
        } else {
            return response.length ? response[0] : response;
        }
    }
}