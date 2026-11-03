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

export class TelegramCallbackMessageDto {
  @IsInt()
  message_id!: number;

  @ValidateNested()
  @Type(() => TelegramChatDto)
  chat!: TelegramChatDto;
}

export class TelegramCallbackQueryDto {
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  data?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TelegramCallbackMessageDto)
  message?: TelegramCallbackMessageDto;
}

export class TelegramUpdateDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TelegramCallbackQueryDto)
  callback_query?: TelegramCallbackQueryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TelegramMessageDto)
  message?: TelegramMessageDto;
}
