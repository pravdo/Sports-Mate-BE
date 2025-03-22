export interface ActivityLogData {
  method: string;
  url: string;
  userId?: string;
  userEmail?: string;
  requestBody?: any;
  response?: any;
  error?: string;
  responseTime: number;
}

export interface RequestUser {
  id: string;
  email: string;
}

export interface RequestWithUser extends Request {
  user?: RequestUser;
  method: string;
  url: string;
  body: any;
}
