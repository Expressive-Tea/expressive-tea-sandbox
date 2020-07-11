import {Get, Route, Post, View } from '@zerooneit/expressive-tea/decorators/router';
import { query, body, param, request } from '@zerooneit/expressive-tea/decorators/annotations';
import { Request, Response } from 'express';

@Route('/')
export default class RootController {
  @Get('/test')
  async index(@query('test') test: unknown, @request req: Request ): Promise<unknown> {
    return `<h1> Data Test ${test}</h1>`;
  }

  @Get('/with-params/:userId')
  async withParams(@param('userId') userId: unknown ): Promise<unknown> {
    return `<h1> Data Test ${userId}</h1>`;
  }

  @View('user', '/view')
  async user(@query('username') username: string): Promise<{username: unknown}> {
    return {username};
  }

  @Get('/no-annotation')
  async withoutAnnotation(req: Request, res: Response) {
    res.send('Hello World');
  }

  @Post('/test')
  async bodyTest(
    @body('test') test: any,
    @body(['a', 'b']) body: any,
    @body() all: any
    ) {
    return { test, body, all };
  }
}
