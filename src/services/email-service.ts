import config from '../config';
import sendgrid from '@sendgrid/mail';
import Debug from 'debug';
const debug = Debug('store:email-service');

if (config.sendgridKey) {
    sendgrid.setApiKey(config.sendgridKey);
}

export async function send(to: string, subject: string, body: string): Promise<void> {
    const from = config.sendgridSender;
    if (config.sendgridKey) {
        try {
            await sendgrid.send({
                to: to,
                from: from,
                subject: subject,
                html: body
            });
            debug(`E-mail sent from '${from}' to '${to}.'`);
        } catch (e) {
            debug(`Failed to send e-mail from '${from}' to '${to}'.`);
        }
    }
};