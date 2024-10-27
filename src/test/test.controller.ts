import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { JwtGuard } from 'src/core/guards/jwt_guard.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRoleEnum } from 'src/core/enums/roles.enum';

@UseGuards(JwtGuard)
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @UseGuards(new RolesGuard([UserRoleEnum.HSO, UserRoleEnum.ADMIN]))
  async create(@Body() createTestDto: CreateTestDto) {
    const data = await this.testService.create(createTestDto);
    return { message: 'test created successfully', data };
  }

  @Get()
  async findAll() {
    const data = await this.testService.findAll();
    return { message: 'tests retrieved successfully', data };
  }

  @Get(':testId')
  async findOne(@Param('testId') testId: string) {
    const data = await this.testService.findOne(testId);
    return { message: 'test retrieved successfully', data };
  }

  @Patch(':testId')
  @UseGuards(new RolesGuard([UserRoleEnum.HSO, UserRoleEnum.ADMIN]))
  async update(
    @Param('testId') id: string,
    @Body() updateTestDto: UpdateTestDto,
  ) {
    const data = await this.testService.update(id, updateTestDto);
    return { message: 'test updated successfully', data };
  }

  @Delete(':testId')
  @UseGuards(new RolesGuard([UserRoleEnum.HSO, UserRoleEnum.ADMIN]))
  async remove(@Param('testId') testId: string) {
    const data = await this.testService.remove(testId);
    return { message: 'test deleted successfully', data };
  }
}
