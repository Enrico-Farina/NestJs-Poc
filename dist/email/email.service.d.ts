import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    constructor(configService: ConfigService);
    emailTransport(): any;
    sendEmail(): Promise<void>;
    sendEmail_MailerSend(emailTarget: string, subject: string, html: string, emailName?: string): Promise<void>;
}
