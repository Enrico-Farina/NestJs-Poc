import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { emailDto } from './email.dto';

import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

@Injectable()
export class EmailService {
    constructor(private readonly configService: ConfigService) {}

    emailTransport() {
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_GMAIL'),
            port: this.configService.get<number>('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('GMAIL_AUTH_USER'),
                pass: this.configService.get<string>('GMAIL_AUTH_PASS'), 
            },
        })
        return transporter;
    }

    async sendEmail(){

        const recipents = ["emailToBeConfirmed@gmail.com"];
        const subject = "Poc-nestJs - Confirmação de Email.";
        const html = "Este é um email para confirmação de conta na Poc-NestJs";


        const transport = this.emailTransport();

        const options: nodemailer.SendMailOptions = {
            from: this.configService.get<string>('GMAIL_AUTH_USER'),
            to: recipents,
            subject: subject,
            html: html,
        };

        try {
            await transport.sendMail(options);
            console.log('email enviado');
        } catch(e) {
            console.log(e);
        }
    }

    async sendEmail_MailerSend(emailTarget: string, subject: string, html: string, emailName?: string) {
        const mailerSend = new MailerSend({
            apiKey: this.configService.get<string>('MAILERSEND_API_KEY') || 'emptyApiKey'
          });
        const sentFrom = new Sender(this.configService.get<string>('MAILERSEND_AUTH_USER') || 'emptyEmail',
        "MailerSend");

        const recipients = [
            new Recipient(emailTarget, emailName)
          ];

        const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(subject)
        .setHtml(html)
        
        await mailerSend.email.send(emailParams);
    }
}
