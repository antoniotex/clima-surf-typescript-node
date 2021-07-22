import { Controller, Post } from '@overnightjs/core';
import { Response, Request } from 'express';
import { User } from '@src/models/user';
// import AuthService from '@src/services/auth';
// import { BaseController } from './index';
// import { authMiddleware } from '@src/middlewares/auth';

@Controller('users')
export class UsersController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).send(newUser);
    } catch (error) {
      // this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}