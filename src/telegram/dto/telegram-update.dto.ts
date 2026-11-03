import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

export class TelegramChatDto {
  @IsInt()
  id!: number;
}

export class TelegramMessageDto {
  @ValidateNested()
  @Type(() => TelegramChatDto)
  chat!: TelegramChatDto;

  @IsOptional()
  @IsString()
  text?: string;
}

export class TelegramUpdateDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TelegramMessageDto)
  message?: TelegramMessageDto;
}
