import * as config from '../config';
import * as sendgrid from '@sendgrid/mail';
const debug = require('debug')('store:email-service');

if (config.sendgridKey) {
    sendgrid.setApiKey(config.sendgridKey);
}

export async function send (to, subject, body) {
    const from = config.sendgridSender;
    if (config.sendgridKey) {
        sendgrid.send({
                to: to,
                from: from,
                subject: subject,
                html: body
            })
            .then(() => {
                debug(`E-mail sent from '${from}' to '${to}.'`);
            })
            .catch(e => {
                debug(`Failed to send e-mail from '${from}' to '${to}'.`);
            });
    }
};