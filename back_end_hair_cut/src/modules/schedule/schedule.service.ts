import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { scheduled } from "rxjs";
import { Repository } from "typeorm";
import { Order } from "../order/entities/order.entity";
import { OrderService } from "../order/order.service";
import { Schedule } from "./entities/schedule.entity";

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private scheduleRepository: Repository<Schedule>,
        // private readonly ordersService: OrderService
    ) {}

    async create(storeId, schedules) {
        let returnData = [];
        
        schedules.map(async (schedule) => {
            if (schedule.id == 0) {
                const newSchedule = this.scheduleRepository.create({
                    store_id: {id : storeId},
                    type: schedule.type,
                    date: schedule.date,
                    time: schedule.time,
                    shift: schedule.shift
                });

                returnData.push(await this.scheduleRepository.save(newSchedule));
            } else {
                let existSchedule = await this.scheduleRepository.findOne({
                    where: {
                        id: schedule.id
                    }
                });
                existSchedule.type = schedule.type;
                existSchedule.date = schedule.date;
                existSchedule.time = schedule.time;
                existSchedule.shift = schedule.shift;
                returnData.push(await this.scheduleRepository.save(existSchedule));
            }
        });

        return returnData;
    }

    async delete(scheduleId) {
        const schedule = await this.scheduleRepository.findOne({
            where: {
                id: scheduleId
            }
        });

        if (schedule) {
            // return this.scheduleRepository.delete(schedule.id);
            schedule.status = 0;
            return await this.scheduleRepository.save(schedule);
        } else {
            throw new HttpException('Schedule not found', 401);
        }
    }

    findAll () {
        return this.scheduleRepository.find();
    }

    async find(storeId) {
        const schedules =  await this.scheduleRepository.find({
            where: {
                store_id: {id: storeId},
                status: 1
            }
        });
        return schedules;
    }

    async getScheduleByStore (storeId) {
        const schedules = await this.scheduleRepository.find({
            where: {
                store_id: {id: storeId}
            }
        });

        return this.formatScheduleForWeek(schedules);
    }

    formatScheduleForWeek(schedules) {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let currentDate = new Date();
        let today = currentDate.getDate();
        let scheduleOfWeek = [];
        [...Array(7).keys()].map((index) => {
            currentDate.setDate(today + index);

            let type = weekday[currentDate.getDay()];
            let scheduleData = {
                type: type,
                date: currentDate.toLocaleDateString('en-CA'),
                time: 0,
                status: 0,
                shift: []
            }

            let holidays = schedules.filter(s => s.type == 'Holiday').map(hol => hol.date);

            schedules.map((schedule) => {
                if (schedule.type == type) {
                    scheduleData.time = schedule.time;
                    scheduleData.shift = schedule.shift;
                    if (!holidays.includes(scheduleData.date)) {
                        scheduleData.status = 1;
                    }
                }
            });
            
            scheduleOfWeek.push(scheduleData);
        });

        return scheduleOfWeek;
    }
}