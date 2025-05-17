import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './types';

@Controller('messages')
export class MessagesController {
  private readonly logger = new Logger(MessagesController.name);
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Message> {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  @Post()
  async create(@Body() data: { message: string }): Promise<Message> {
    return this.messagesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { message: string },
  ): Promise<Message> {
    try {
      return await this.messagesService.update(id, data);
    } catch (error) {
      this.logger.error(`Failed to update message with ID ${id}:`, error);
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Message> {
    try {
      return await this.messagesService.remove(id);
    } catch (error) {
      this.logger.error(`Failed to delete message with ID ${id}:`, error);
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
  }
}
