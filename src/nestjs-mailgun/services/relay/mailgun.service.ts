import { Injectable, Inject } from '@nestjs/common';
import { MAILGUN_CONFIGURATION } from '../../tokens/tokens';
import Mailgun from 'mailgun.js';
import { ConfigurationMailgun } from '../../../nestjs-mailgun/configuration';
import { MailgunEmailModel } from '../../../nestjs-mailgun/classes/mailgun-email-model';
import formData from 'form-data';

export interface EmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  attachment?;
  'h:X-Mailgun-Variables'?: string;
}
@Injectable()
export class MailgunService {
  private readonly mailgun;
  constructor(
    @Inject(MAILGUN_CONFIGURATION)
    private readonly configuration: ConfigurationMailgun,
  ) {
    const mg = new Mailgun(formData);
    this.mailgun = mg.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
      public_key: configuration.PUBLIC_API_KEY,
      // domain: configuration.DOMAIN,
      url: configuration.HOST,
    });
  }

  public sendEmail(emailOptions: EmailOptions | MailgunEmailModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mailgun.messages().send(emailOptions, (error, body) => {
        if (error) {
          return reject(error);
        }
        return resolve(body);
      });
    });
  }

  public validateEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.mailgun.validate(email, (err, body) => {
        if (body && body.is_valid) {
          resolve(true);
        } else {
          resolve(false);
        }
        if (err) {
          console.log('ERR', err);
          reject(err);
        }
      });
    });
  }
}
