import { Test, TestingModule } from '@nestjs/testing';
import { MailgunService } from './mailgun.service';
import { ConfigService } from '@nestjs/config';
import { MAILGUN_CONFIGURATION } from '../../tokens/tokens';
import { ConfigurationMailgun } from '../../../index';

describe('MailgunService', () => {
  let service: MailgunService;
  let configService: ConfigService;

  const config: ConfigurationMailgun = {
    API_KEY: 'api_key',
  } as ConfigurationMailgun;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigService],
      providers: [
        ConfigService,
        {
          provide: MAILGUN_CONFIGURATION,
          useValue: config,
        },
        MailgunService,
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    service = module.get<MailgunService>(MailgunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have send email method', () => {
    expect(service.sendEmail).toBeDefined();
  });
});
