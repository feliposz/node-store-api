global.SALT_KEY = '<YOUR_SALT_KEY>';
global.EMAIL_TMPL = 'Hello, <strong>{0}</strong>. Welcome to Node Store!';

module.exports = {
    connectionString: 'mongodb://localhost:27017/node-balta-store',
    sendgridKey: '<SENDGRID_API_KEY>',
    sendgridSender: '<SENDGRID_SENDER_ADDR>',
    azureContainerConnectString: '<YOUR_CONTAINER_CONN_STRING>'
};