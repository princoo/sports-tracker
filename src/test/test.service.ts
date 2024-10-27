import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}
  create(createTestDto: CreateTestDto) {
    return this.prisma.test.create({ data: createTestDto });
  }

  findAll() {
    return this.prisma.test.findMany();
  }

  findOne(id: string) {
    return this.prisma.test.findUnique({ where: { id } });
  }
  findByName(testName: string) {
    return this.prisma.test.findUnique({ where: { name: testName } });
  }

  update(id: string, updateTestDto: UpdateTestDto) {
    return this.prisma.test.update({ where: { id }, data: updateTestDto });
  }

  remove(id: string) {
    return this.prisma.test.delete({ where: { id } });
  }
}
