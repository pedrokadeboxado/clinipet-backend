// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { MessageEntity } from './infra/entities/message.entity';
// import { MessageTypeOrmRepository } from './infra/repositories/messageTypeOrm.repository';
// @Module({
//   imports: [TypeOrmModule.forFeature([MessageEntity])],
//   controllers: [],
//   providers: [
//     MessageTypeOrmRepository,
//     {
//       provide: 'MessageRepositoryInterface',
//       useExisting: MessageTypeOrmRepository,
//     },
//   ],
//   exports: [MessageTypeOrmRepository],
// })
// export class MessagesModule {}
