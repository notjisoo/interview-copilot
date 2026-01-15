import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient(); // v5 不需要传参数，它会自动读 .env

async function main() {
  console.log('🌱 开始生成...');

  // 先清理旧数据，防止重复报错

  // 解释一下这三个await是什么意思?
  // await 关键字用于等待 Promise 解决（resolve）或拒绝（reject）。
  // 在这个上下文中，prisma.messages.deleteMany()、prisma.interviews.deleteMany() 和 prisma.users.deleteMany() 都是异步操作，它们返回 Promise。
  // await 关键字会暂停 main 函数的执行，直到这些异步操作完成。一旦操作完成，await 会返回 Promise 的结果（对于 deleteMany，它返回被删除的记录数量），然后 main 函数会继续执行。
  // 这三个操作是按顺序执行的，即只有当 deleteMany() 操作完成后，才会执行下一个 deleteMany() 操作。

  await prisma.messages.deleteMany();
  await prisma.interviews.deleteMany();
  await prisma.users.deleteMany();

  const user = await prisma.users.create({
    data: {
      username: 'dev_user',
      nickname: '全栈练习生',
      password: '123',
    },
  });

  const interview = await prisma.interviews.create({
    data: {
      user_id: user.id,
      jd_text: '前端开发...',
      status: 'ongoing',
      total_score: 0,
    },
  });

  await prisma.messages.createMany({
    data: [
      { interview_id: interview.id, role: 'assistant', content: '你好！' },
      { interview_id: interview.id, role: 'user', content: '面试官好！' },
    ],
  });

  console.log('🚀 成功！');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
