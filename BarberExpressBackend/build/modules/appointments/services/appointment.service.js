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
exports.AppointmentService = void 0;
const database_1 = require("../../../config/database");
const appointment_entity_1 = require("../entities/appointment.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const barbershop_barber_entity_1 = require("../../barbershops/entities/barbershop-barber.entity");
const barbershop_service_entity_1 = require("../../barbershops/entities/barbershop-service.entity");
const typeorm_1 = require("typeorm");
class AppointmentService {
    constructor() {
        this.appointmentRepository = database_1.AppDataSource.getRepository(appointment_entity_1.Appointment);
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
        this.barberRepository = database_1.AppDataSource.getRepository(barbershop_barber_entity_1.BarbershopBarber);
        this.serviceRepository = database_1.AppDataSource.getRepository(barbershop_service_entity_1.BarbershopService);
    }
    create(userId, createAppointmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId }
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const barber = yield this.barberRepository.findOne({
                where: { id: createAppointmentDto.barberId },
                relations: ['barbershop']
            });
            if (!barber) {
                throw new Error('Barbero no encontrado');
            }
            const service = yield this.serviceRepository.findOne({
                where: { id: createAppointmentDto.serviceId }
            });
            if (!service) {
                throw new Error('Servicio no encontrado');
            }
            const existingAppointment = yield this.appointmentRepository.findOne({
                where: {
                    barber: { id: createAppointmentDto.barberId },
                    appointmentDate: createAppointmentDto.appointmentDate,
                    startTime: (0, typeorm_1.Between)(createAppointmentDto.startTime, createAppointmentDto.endTime)
                }
            });
            if (existingAppointment) {
                throw new Error('El barbero no está disponible en ese horario');
            }
            const appointment = this.appointmentRepository.create({
                user,
                barbershop: barber.barbershop,
                barber,
                service,
                appointmentDate: createAppointmentDto.appointmentDate,
                startTime: createAppointmentDto.startTime,
                endTime: createAppointmentDto.endTime,
                status: 'Pendiente'
            });
            return yield this.appointmentRepository.save(appointment);
        });
    }
    update(id, updateAppointmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield this.appointmentRepository.findOne({
                where: { id }
            });
            if (!appointment) {
                throw new Error('Cita no encontrada');
            }
            Object.assign(appointment, updateAppointmentDto);
            return yield this.appointmentRepository.save(appointment);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield this.appointmentRepository.findOne({
                where: { id },
                relations: ['user', 'barbershop', 'barber', 'service']
            });
            if (!appointment) {
                throw new Error('Cita no encontrada');
            }
            return appointment;
        });
    }
    getUserAppointments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.appointmentRepository.find({
                where: { user: { id: userId } },
                relations: ['barbershop', 'barber', 'service'],
                order: { appointmentDate: 'DESC' }
            });
        });
    }
    getBarberAppointments(barberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.appointmentRepository.find({
                where: { barber: { id: barberId } },
                relations: ['user', 'barbershop', 'service'],
                order: { appointmentDate: 'DESC' }
            });
        });
    }
}
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=appointment.service.js.map