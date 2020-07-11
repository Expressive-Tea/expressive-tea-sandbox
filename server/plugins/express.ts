import {BOOT_STAGES, Plugin} from '@expressive-tea/plugin';
import {Stage} from '@expressive-tea/plugin/decorators';
import {Express, Request, Response} from 'express';

import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cors from 'cors';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';

export default class ExpressPlugin extends Plugin {
  protected name: string = 'Express Plugin';
  protected priority: number = -1;

  @Stage(BOOT_STAGES.BOOT_DEPENDENCIES, true)
  async initialize(server: Express) {
    server.set('view engine', 'pug');
    server.set('views', 'views/');

    server.use(
      compress({
        filter: (req: Request, res: Response) =>
          /json|text|javascript|css/.test(res.getHeader('Content-Type') as string),
        level: 9
      })
    );

    if (process.env.NODE_ENV === 'development') {
      server.use(morgan('dev'));
      server.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
      server.locals.cache = 'memory';
      server.use(morgan('combined'));
    }

    server.use(session({secret: 'S3Cr3T', resave: false, saveUninitialized: true}));
    server.set('showStackError', false);
    server.use(cors());
    server.use(bodyParser.json({limit: '50mb'}));
    server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    server.use(methodOverride());
    server.enable('jsonp callback');
    server.use(helmet.noCache());
    server.use(helmet.frameguard());
    server.disable('x-powered-by');
  }
}
