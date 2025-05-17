import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from './types';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }

  async findOne(id: number): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  async create(data: { message: string }): Promise<Message> {
    return this.prisma.message.create({
      data,
    });
  }

  async update(id: number, data: { message: string }): Promise<Message> {
    return this.prisma.message.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Message> {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
