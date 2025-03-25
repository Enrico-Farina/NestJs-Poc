"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
const mailersend_1 = require("mailersend");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
    }
    emailTransport() {
        const transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_GMAIL'),
            port: this.configService.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('GMAIL_AUTH_USER'),
                pass: this.configService.get('GMAIL_AUTH_PASS'),
            },
        });
        return transporter;
    }
    async sendEmail() {
        const recipents = ["emailToBeConfirmed@gmail.com"];
        const subject = "Poc-nestJs - Confirmação de Email.";
        const html = "Este é um email para confirmação de conta na Poc-NestJs";
        const transport = this.emailTransport();
        const options = {
            from: this.configService.get('GMAIL_AUTH_USER'),
            to: recipents,
            subject: subject,
            html: html,
        };
        try {
            await transport.sendMail(options);
            console.log('email enviado');
        }
        catch (e) {
            console.log(e);
        }
    }
    async sendEmail_MailerSend(emailTarget, subject, html, emailName) {
        const mailerSend = new mailersend_1.MailerSend({
            apiKey: this.configService.get('MAILERSEND_API_KEY') || 'emptyApiKey'
        });
        const sentFrom = new mailersend_1.Sender(this.configService.get('MAILERSEND_AUTH_USER') || 'emptyEmail', "MailerSend");
        const recipients = [
            new mailersend_1.Recipient(emailTarget, emailName)
        ];
        const emailParams = new mailersend_1.EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject(subject)
            .setHtml(html);
        await mailerSend.email.send(emailParams);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map