"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPaymentService = void 0;
const database_1 = require("../../../config/database");
const product_payment_entity_1 = require("../entities/product-payment.entity");
const barbershop_product_entity_1 = require("../entities/barbershop-product.entity");
const payment_status_entity_1 = require("../../appointments/entities/payment-status.entity");
const payment_gateway_entity_1 = require("../../appointments/entities/payment-gateway.entity");
const commission_value_product_entity_1 = require("../entities/commission-value-product.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
class ProductPaymentService {
    constructor() {
        this.paymentRepository = database_1.AppDataSource.getRepository(product_payment_entity_1.ProductPayment);
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
        this.barbershopProductRepository = database_1.AppDataSource.getRepository(barbershop_product_entity_1.BarbershopProduct);
        this.paymentStatusRepository = database_1.AppDataSource.getRepository(payment_status_entity_1.PaymentStatus);
        this.paymentGatewayRepository = database_1.AppDataSource.getRepository(payment_gateway_entity_1.PaymentGateway);
        this.commissionRepository = database_1.AppDataSource.getRepository(commission_value_product_entity_1.CommissionValueProduct);
    }
    createPayment(userId, createPaymentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId }
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const barbershopProduct = yield this.barbershopProductRepository.findOne({
                where: { id: createPaymentDto.productId },
                relations: ['product', 'barbershop', 'inventory']
            });
            if (!barbershopProduct) {
                throw new Error('Producto no encontrado');
            }
            if (barbershopProduct.inventory.quantity < createPaymentDto.quantity) {
                throw new Error('No hay suficiente stock disponible');
            }
            const paymentGateway = yield this.paymentGatewayRepository.findOne({
                where: { id: createPaymentDto.paymentGatewayId }
            });
            if (!paymentGateway) {
                throw new Error('Método de pago no encontrado');
            }
            const initialStatus = yield this.paymentStatusRepository.findOne({
                where: { status: 'Pendiente' }
            });
            if (!initialStatus) {
                throw new Error('Estado de pago no encontrado');
            }
            const commission = yield this.commissionRepository.findOne({
                where: { id: 1 }
            });
            if (!commission) {
                throw new Error('Valor de comisión no encontrado');
            }
            const total = barbershopProduct.product.price * createPaymentDto.quantity;
            const commissionAmount = (total * commission.value) / 100;
            const totalReceiveBarbershop = total - commissionAmount;
            const payment = this.paymentRepository.create({
                user,
                barbershop: barbershopProduct.barbershop,
                product: barbershopProduct,
                paymentGateway,
                paymentStatus: initialStatus,
                quantity: createPaymentDto.quantity,
                total,
                totalReceiveBarbershop,
                commission
            });
            const savedPayment = yield this.paymentRepository.save(payment);
            barbershopProduct.inventory.quantity -= createPaymentDto.quantity;
            yield this.barbershopProductRepository.save(barbershopProduct);
            return savedPayment;
        });
    }
    getUserPayments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentRepository.find({
                where: { user: { id: userId } },
                relations: ['product', 'product.product', 'barbershop', 'paymentStatus'],
                order: { createdAt: 'DESC' }
            });
        });
    }
}
exports.ProductPaymentService = ProductPaymentService;
//# sourceMappingURL=product-payment.service.js.map