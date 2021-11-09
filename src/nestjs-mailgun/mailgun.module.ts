import { Module, Provider } from '@nestjs/common';
import {
  ConfigurationMailgun,
  ConfigurationMailgunAsync,
} from './configuration';
import { MailgunService } from './services/relay/mailgun.service';
import { MAILGUN_CONFIGURATION } from './tokens/tokens';

@Module({})
export class MailgunModule {
  public static forRoot(config: ConfigurationMailgun) {
    return {
      module: MailgunModule,
      providers: [
        { provide: MAILGUN_CONFIGURATION, useValue: config },
        MailgunService,
      ],
      exports: [MailgunService],
    };
  }
  public static forAsyncRoot(config: ConfigurationMailgunAsync) {
    return {
      module: MailgunModule,
      imports: config.imports || [],
      providers: [this.createAsyncProviders(config), MailgunService],
      exports: [MailgunService],
    };
  }
  private static createAsyncProviders(
    options: ConfigurationMailgunAsync,
  ): Provider {
    return {
      provide: MAILGUN_CONFIGURATION,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
