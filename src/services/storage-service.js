import * as azure from 'azure-storage';
import * as config from '../config';
const debug = require('debug')('store:storage-service');

export async function storeImageBase64 (filename, container, rawdata) {
    if (config.azureContainerConnectString) {

        const matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (matches.length > 2) {
            const type = matches[1];
            const buffer = Buffer.from(matches[2], 'base64');

            try {
                const blobSvc = azure.createBlobService(config.azureContainerConnectString);
                await blobSvc.createBlockBlobFromText(container, filename, buffer, {
                    contentSettings: {
                        contentType: type
                    }
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

    }

    return false;
};