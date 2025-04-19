// request.interface.ts
import { Request } from 'express';
import { User } from './user.interface';

export interface CustomRequest extends Request {
  user?: User;
  sessionId: string;
  requiredMetrics: string[];
}
