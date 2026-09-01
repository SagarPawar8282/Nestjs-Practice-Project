import { Transform, Type } from 'class-transformer';
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChatMessageDto {
  @IsDefined()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  receiverId: number;

  @IsDefined()
  @IsString()
  text: string;
}

export class SaveChatMessage {
  @IsDefined()
  @IsNumber()
  senderId: number;

  @IsDefined()
  @IsNumber()
  receiverId: number;

  @IsDefined()
  @IsString()
  message: string;

  @IsDefined()
  @IsString()
  status:string;
}

export class JoinChatDto {
  @IsDefined()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  receiverId: number;
}

export class UpdateChatDto {

  @IsDefined()
  @IsString()
  status: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  sentAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deliveredAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readAt?: Date;
}