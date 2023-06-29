import { Request } from 'express';

interface RequestWithUser extends Request {
  userId: string
}

export default RequestWithUser;