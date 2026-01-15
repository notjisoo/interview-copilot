import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class InterviewsService {
  // Create创建
  async create(createInterviewDto: CreateInterviewDto) {
    return await prisma.interviews.create({
      data: createInterviewDto,
    });
  }

  async findAll() {
    // 解释一下这个include 和orderBy
    // include: true 表示在查询 interviews 时，同时获取关联的 messages 和 user 数据。
    // orderBy: { created_at: 'desc' } 表示按照 created_at 字段降序排序，这样最新的 interview 会排在前面。
    return await prisma.interviews.findMany({
      include: {
        messages: true,
        user: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // 查询某一个
  async findOne(id: number) {
    // 这里的where是？
    // where: { id: id } 表示查询 id 等于 id 的 interview。
    return await prisma.interviews.findUnique({
      where: {
        id: id,
      },
    });
  }

  // Update修改
  async update(id: number, updateInterviewDto: UpdateInterviewDto) {
    return await prisma.interviews.update({
      where: {
        id: id,
      },
      data: updateInterviewDto,
    });
  }

  // Delete删除
  async remove(id: number[]) {
    if (id.length === 0) {
      return {
        msg: '请传入用户id',
        data: [],
        code: 400,
      };
    }
    return await prisma.interviews.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
  }
}
