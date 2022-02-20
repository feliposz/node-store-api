const azure = require('azure-storage');
const config = require('../config');
const debug = require('debug')('store:storage-service');

exports.storeImageBase64 = async (filename, container, rawdata) => {
    if (config.azureContainerConnectString) {
        const matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const type = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');

        try {
            const blobSvc = azure.createBlobService(config.azureContainerConnectString);
            await blobSvc.createBlockBlobFromText(container, filename, buffer, {
                contentType: type
            }, function (error, result, response) {
                debug('Failed to upload image.');
                return false;
            });
        } catch (e) {
            debug('Failed to connect to storage service.');
            return false;
        }
        return true;
    }

    return false;
};