const config = require('../config');
const debug = require('debug')('store:email-service');
const sendgrid = require('@sendgrid/mail');

if (config.sendgridKey) {
    sendgrid.setApiKey(config.sendgridKey);
}

exports.send = async (to, subject, body) => {
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