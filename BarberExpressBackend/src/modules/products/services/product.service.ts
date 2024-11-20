// src/modules/products/services/product.service.ts
import { AppDataSource } from '../../../config/database';
import { BarbershopProduct } from '../entities/barbershop-product.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { BankProduct } from '../entities/bank-product.entity';
import { Inventory } from '../entities/inventory.entity';
import { CreateBarbershopProductDto } from '../dtos/create-product.dto';

export class ProductService {
    private barbershopProductRepository = AppDataSource.getRepository(BarbershopProduct);
    private barbershopRepository = AppDataSource.getRepository(Barbershop);
    private bankProductRepository = AppDataSource.getRepository(BankProduct);
    private inventoryRepository = AppDataSource.getRepository(Inventory);

    async addProductToBarbershop(createProductDto: CreateBarbershopProductDto): Promise<BarbershopProduct> {
        const barbershop = await this.barbershopRepository.findOne({
            where: { id: createProductDto.barbershopId }
        });

        if (!barbershop) {
            throw new Error('Barbería no encontrada');
        }

        const bankProduct = await this.bankProductRepository.findOne({
            where: { id: createProductDto.bankProductId }
        });

        if (!bankProduct) {
            throw new Error('Producto no encontrado');
        }

        // Verificar si el producto ya existe en la barbería
        const existingProduct = await this.barbershopProductRepository.findOne({
            where: {
                barbershop: { id: createProductDto.barbershopId },
                product: { id: createProductDto.bankProductId }
            }
        });

        if (existingProduct) {
            throw new Error('Este producto ya está registrado en la barbería');
        }

        // Crear el producto en la barbería
        const barbershopProduct = this.barbershopProductRepository.create({
            barbershop,
            product: bankProduct
        });

        const savedProduct = await this.barbershopProductRepository.save(barbershopProduct);

        // Crear el registro de inventario inicial
        const inventory = this.inventoryRepository.create({
            barbershopProduct: savedProduct,
            quantity: createProductDto.initialQuantity
        });

        await this.inventoryRepository.save(inventory);

        return savedProduct;
    }

    async getBarbershopProducts(barbershopId: number): Promise<BarbershopProduct[]> {
        return await this.barbershopProductRepository.find({
            where: { barbershop: { id: barbershopId } },
            relations: ['product', 'product.classification', 'inventory']
        });
    }

    async removeProductFromBarbershop(barbershopId: number, productId: number): Promise<void> {
        const result = await this.barbershopProductRepository.delete({
            barbershop: { id: barbershopId },
            product: { id: productId }
        });

        if (result.affected === 0) {
            throw new Error('Producto no encontrado en la barbería');
        }
    }
}