import {Get, Route} from '@zerooneit/expressive-tea/decorators/router';
import {Request, Response} from 'express';

@Route('/')
export default class RootController {
  @Get('/')
  async index(req: Request, res: Response): Promise<void> {
    res.json({message: 'good!!'});
  }

}
