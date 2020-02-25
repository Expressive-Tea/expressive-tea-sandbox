import {Module} from '@zerooneit/expressive-tea/decorators/module';
import RootController from '@app/root/controllers/RootController';

@Module({
  controllers: [RootController],
  providers: [],
  mountpoint: '/'
})
export default class RootModule {
}
