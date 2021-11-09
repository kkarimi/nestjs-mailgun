<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS Mailgun</h3>
<a href="https://www.npmjs.com/package/@kkarimi/nestjs-mailgun"><img src="https://img.shields.io/npm/v/@kkarimi/nestjs-mailgun.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/@kkarimi/nestjs-mailgun"><img src="https://img.shields.io/npm/l/@kkarimi/nestjs-mailgun.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/@kkarimi/nestjs-mailgun"><img src="https://img.shields.io/npm/dm/@kkarimi/nestjs-mailgun.svg" alt="NPM Downloads" /></a>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Introduction

This is a simple wrapper of [mailgun-js](https://www.npmjs.com/package/mailgun-js).
It only supports sending and verifying emails, but later more will be added. Just ping me or open pull request and contribute :)

### Installation

```bash
npm install @kkarimi/nestjs-mailgun
```

### Usage

#### Importing module

```typescript
import { MailgunModule } from '@kkarimi/nestjs-mailgun';
@Module({
  imports: [
    MailgunModule.forRoot({
      DOMAIN: '<Your Domain>',
      API_KEY: '<Your API_KEY>',
      HOST: '<Your Host>', // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
    }),
  ],
  providers: [],
  exports: [],
})
export class YourModule {}
```

#### Importing module Async

```typescript
import { MailgunModule } from '@kkarimi/nestjs-mailgun';
@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {
          DOMAIN: '<Your Domain>',
          API_KEY: '<Your API_KEY>',
          HOST: '<Your Host>', // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
        };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class YourModule {}
```

#### Interfaces

```typescript
interface EmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  attachment?;
  'h:X-Mailgun-Variables'?: string;
}
```

#### Calling Send Method

```typescript
import { MailgunService } from '@kkarimi/nestjs-mailgun';
import { EmailOptions } from '@kkarimi/nestjs-mailgun'

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    const options: EmailOptions = {
      from: '',
      to: '',
      subject: '',
      text: '',
      html: '',
      attachment:''
      'h:X-Mailgun-Variables': '{"key":"value"}'
    };

    await this.mailgunService.sendEmail(options);


    // OR can use the class

    const email = new MailgunEmailModel('from', 'to', 'subject', 'text', 'html', 'template','attachment', { key: 'value' });

    await this.mailgunService.sendEmail(email);
  }
```

#### Calling Verify Method

To check if an email is real or not.

```typescript
import { MailgunService } from '@kkarimi/nestjs-mailgun';
import { EmailOptions } from '@kkarimi/nestjs-mailgun'

@Injectable()
export class YourService {
  constructor(private mailgunService: MailgunService) {
    await this.mailgunService.verifyEmail('next@examle.com');
  }
}
```

<!-- ## Change Log

See [Changelog](CHANGELOG.md) for more information. -->

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Notes

This project is not endorsed by or affiliated with [Mailgun](http://www.mailgun.com).

## Author

**Nuno Carvalhão [Site](https://nunocarvalhao.com)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
