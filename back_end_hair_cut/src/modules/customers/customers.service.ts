import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor (
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) {}

  async create(phoneNumber) {
    let id;
    const existCustomer = await this.customerRepository.findOneBy({
      phoneNumber: phoneNumber
    });

    if (existCustomer) {
      existCustomer.bookingCount += 1;
      await this.customerRepository.save(existCustomer);
      id = existCustomer.id;
    } else {
      const customer = new Customer();
      customer.phoneNumber = phoneNumber;
      id = (await this.customerRepository.save(customer)).id;
    }

    return id;
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
