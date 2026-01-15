export class CreateMessageDto {
  id: number;
  interview_id: number;
  role: string;
  content: string;
  created_at: Date;
}
