import {Get, Route} from '@zerooneit/expressive-tea/decorators/router';
import {Request, Response} from 'express';

@Route('/')
export default class RootController {
  @Get('/test')
  async index(req: Request, res: Response): Promise<void> {
    res.json({message: 'this is good!!'});
  }

}
