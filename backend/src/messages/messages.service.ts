import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

@Injectable()
export class MessagesService {
  // 创建消息对话记录
  async create(createMessageDto: CreateMessageDto) {
    return await prisma.messages.create({
      data: createMessageDto,
    });
  }

  // 查找所有
  async findAll(options?: { skip?: number; take?: number }) {
    const data = await prisma.messages.findMany({
      skip: options?.skip,
      take: options?.take,
    });

    const formattedData = data.map((item) => {
      return {
        ...item,
        created_at: dayjs(item.created_at.toISOString()).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
      };
    });

    return {
      list: formattedData,
      total: await this.count(),
    };
  }

  // 统计总数
  async count() {
    return await prisma.messages.count();
  }

  // 查询某一个
  async findOne(id: number) {
    return await prisma.messages.findUnique({
      where: {
        id: id,
      },
    });
  }

  // 修改
  async update(id: number, updateMessageDto: UpdateMessageDto) {
    return await prisma.messages.update({
      where: {
        id: id,
      },
      data: updateMessageDto,
    });
  }

  // 删除remove 这里传入数组id
  async remove(id: number[]) {
    if (id.length === 0) {
      return {
        msg: '请传入用户id',
        data: [],
        code: 400,
      };
    }

    // 这里的where是什么意思？
    return await prisma.messages.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
  }
}
