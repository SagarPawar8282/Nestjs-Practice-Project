import { Module } from "@nestjs/common";
import { productPersistenceRepositoryProvider } from "./product-persistence.repository";

@Module({
    imports:[],
    providers:[productPersistenceRepositoryProvider],
    exports:[productPersistenceRepositoryProvider]
})export class ProductPersistenceModule{}