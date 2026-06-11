import { Inject, Injectable } from '@nestjs/common';
// import { PRODUCT_REPOSITORY } from './product.repository';
// import { Product } from './product.model';
import { QueueProcessorService } from 'src/core/queue-processor/queue-processor.service';
import { ProductPeristenceModel } from '../product-persistence/product-persistence.model';
import { PRODUCT_PERSISTENCE_REPOSITORY } from '../product-persistence/product-persistence.repository';
import { logger } from 'src/common/logger/logger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { QueryService } from 'src/core/query/query.service';
import { Query } from 'src/common/services/query/query';
import { Store } from '../store/store.model';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { error } from 'console';
import { ProductCategory } from '../product-categories/product-categories.model';
import { ProductDimensionsService } from '../product-dimensions/product-dimensions.service';
import { ProductDimension } from '../product-dimensions/product-dimensions.model';

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_PERSISTENCE_REPOSITORY) private readonly productRepository: typeof ProductPeristenceModel,
        private queueService: QueueProcessorService, private queryService: QueryService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache, private productCategoryService: ProductCategoriesService,
        private productDimensionService: ProductDimensionsService,
    ) { }

    async addSingleProduct(productDetails) {
        const productCategory = await this.productCategoryService.create({ productCategory: productDetails.productCategory })
        if (!productCategory) {
            throw error('error during product category registeration')
        }

        const productDimension = await this.productDimensionService.create(
            {
                height: productDetails?.height,
                width: productDetails?.width,
                length: productDetails?.length,
                shape: productDetails?.shape,
                quantity: productDetails?.quantity,
                weight: productDetails?.weight,
                color: productDetails?.color
            }
        )
        if (!productDimension) {
            throw error('error during product dimension creation');
        }

        const product = await this.productRepository.create({
            name: productDetails.name,
            description: productDetails.description,
            price: productDetails.price,
            stock: productDetails.stock,
            storeId: productDetails.storeId,
            productCategoryId: productCategory.id,
            proudctDimensionId: productDimension?.id
        });

        return product;
    }

    async findOne(id: number) {
        try {

            const cache_key = `Cache:product:${id}`;

            try {
                const cached = await this.cacheManager.get(cache_key);

                if (cached) {
                    console.log("from cache");
                    return cached;
                }
            } catch (err) {
                logger.warn('Cache unavailable');
            }
            const product = await this.productRepository.findOne({
                where: { id: id },
                include: [
                    { model: Store },
                    { model: ProductCategory },
                    { model: ProductDimension }
                ]
            });

            await this.cacheManager.set(cache_key, product);
            // console.log("cache response: "+response.dataValues.name);
            console.log("from db");
            return product;
        } catch (err) {
            logger.error(`Logger :- Error: ${err.message}`);
            throw err;
        }
    }

    async getJobStatus(id: number) {
        return await this.queueService.getJobstatus(id);
    }

    async findAllProductUnderProductCategory(productCategory: string) {
        try {
            const name = productCategory;
            const record = await this.productRepository.findAll({ where: { name: productCategory.trim() } });
            return record;
        } catch (err) {
            logger.error(`Logger :- Error: ${err.message} | action: find all production under product category`);
            throw err;
        }
    }

    async updateProductData(storeIdid, productData) {
        const cache_key = `product:${productData.id}`;

        const productRow = await this.productRepository.update(
            {
                name: productData?.name,
                productCategory: productData?.productCategory,
                description: productData?.description,
                price: productData?.price,
                stock: productData?.stock,
            },
            { where: { storeId: storeIdid, id: productData.id } });
        const cached = await this.cacheManager.get(cache_key);  //sequelize return number of product updated not product data 

        if (productRow) {
            const product = await this.productRepository.findOne({ where: { id: productData.id } });
            await this.cacheManager.set(cache_key, product);
            return product;
        }
        return null
    }

    async getAllProductUnderStore(storeId: number) {
        return await this.productRepository.findAll({
            where: { storeId: storeId },
            include: [
                {
                    model:ProductCategory
                },
                {
                    model:ProductDimension
                }
            ]
        })
    }

    async getAllProductUnderProductCategory(productCategory: string, userId?: string) {

        let where: any = {}
        if (userId) {
            where.userId = Number(userId)
        }
        return await this.productRepository.findAll({
            include: [
                {
                    model: Store,
                    where
                },
                {
                    model: ProductCategory,
                    where: { productCategory }
                },
                {
                    model:ProductDimension
                }
            ]
        });
    }

    async getAllProductCategory() {
        const categories = await this.productCategoryService.findAll();

        let categoryArray = [];
        if (Array.isArray(categories)) {
            categories.map((r) => categoryArray.push(r.product_category));
        }

        return categoryArray;
    }

    async findStoreProductComboPresent(storeId, productId): Promise<ProductPeristenceModel | null> {
        const available = await this.productRepository.findOne({ where: { storeId: storeId, id: productId } });
        return available && available != undefined ? available : null;
    }

    async reduceStockForBooking(productId, updatedStock): Promise<boolean> {

        const updateStock = await this.productRepository.update({ stock: updatedStock }, { where: { id: productId } })
        return updateStock?.[0] === 1;
    }
    async findAllProduct(productName: string, storeId?: string) {
        let where = storeId ? { name: productName, storeId: storeId } : { name: productName }
        const result = await this.productRepository.findAll({
            where,
            include: [
                { model: Store }, 
                { model: ProductCategory },
                { model: ProductDimension}
            ]
        });
        return result;
    }

    async findAllProductCategoryUnderStore(storeId: number) {
        const productCategories = await this.queryService.executeQuery(Query.findAllProductCategoryUnderStore(storeId), null);
        let categoryArray = [];
        if (Array.isArray(productCategories)) {
            productCategories.map(p => categoryArray.push(p.product_category));
        }

        return categoryArray;
    }

    async findProductIdByProductNameAndStoreId(productName, storeId) {
        const id = await this.productRepository.findOne({
            attributes: ['id'],
            where: {
                name: productName,
                storeId: storeId
            }
        })
        return id ? id : null;
    }
}
