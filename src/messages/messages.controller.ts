// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseIntPipe,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { MessagesUseCase } from './usecases/messages.usecase';
// import { CreateMessageDto } from './models/dto/createMessage.dto';
// import { UpdateMessageDto } from './models/dto/updateMessage.dto';
// @Controller('messages')
// export class MessagesController {
//   constructor(private readonly useCase: MessagesUseCase) {}
//   @Post() create(@Body() dto: CreateMessageDto) {
//     return this.useCase.create(dto);
//   }
//   @Get() listAll() {
//     return this.useCase.listAll();
//   }
//   @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) {
//     return this.useCase.findOne(id);
//   }
//   @Patch(':id') update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() dto: UpdateMessageDto,
//   ) {
//     return this.useCase.update(id, dto);
//   }
//   @Delete(':id') delete(@Param('id', ParseIntPipe) id: number) {
//     return this.useCase.delete(id);
//   }
// }
