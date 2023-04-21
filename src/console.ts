import { BootstrapConsole } from 'nestjs-console/dist/bootstrap/console';

import { AppModule } from './app.module';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});
bootstrap.init().then(async app => {
  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
