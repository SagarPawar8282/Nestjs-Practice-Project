import { Module } from "@nestjs/common";
import { productPersistenceRepositoryProvider } from "./product-persistence.repository";
import { ProductCategoriesModule } from "../product-categories/product-categories.module";

@Module({
    imports:[],
    providers:[productPersistenceRepositoryProvider],
    exports:[productPersistenceRepositoryProvider]
})export class ProductPersistenceModule{}