import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    try {
      const skip = 0;
      const take = 10;
      const data = await this.messagesService.findAll({ skip, take });
      return {
        code: 200,
        data,
        messages: 'success',
      };
    } catch (error) {
      return {
        code: 500,
        data: null,
        messages: 'error',
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      const data = this.messagesService.findOne(+id);
      return {
        code: 200,
        data,
        messages: 'success',
      };
    } catch (error) {
      return {
        code: 500,
        data: null,
        messages: 'error',
      };
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
    try {
      const data = this.messagesService.update(+id, updateMessageDto);
      return {
        code: 200,
        data,
        messages: 'success',
      };
    } catch (error) {
      return {
        code: 500,
        data: null,
        messages: 'error',
      };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number[]) {
    try {
      const data = this.messagesService.remove(id);
      return {
        code: 200,
        data,
        messages: 'success',
      };
    } catch (error) {
      return {
        code: 500,
        data: null,
        messages: 'error',
      };
    }
  }
}
