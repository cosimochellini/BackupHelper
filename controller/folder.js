const fs = require('fs');
require('isomorphic-fetch'); // or another library of choice.
const fse = require('fs-extra');
const zipdir = require('zip-dir');
const dateFormat = require('dateformat');
const Dropbox = require('dropbox').Dropbox;

const folderController = {};

folderController.copyFolder = (folderFrom, folderTo) => {
    let folderName = _getLastElement(folderFrom.split('\\'));

    let destination = `${folderTo.Desktop}\\${_getCurrentBackupName()}`;

    _checkFoder(destination);

    destination = `${destination}\\${folderName}`;

    _checkFoder(destination);

    try {
        fse.copySync(folderFrom, destination);
        console.log('success!')
    } catch (err) {
        console.error(err)
    }

    return `${folderTo.Desktop}\\${_getCurrentBackupName()}`;
}


folderController.zipFolder = (folder, settings) => {
    zipdir(folder, { saveTo: folder + '.zip' }, function (err, buffer) {

        const dbx = new Dropbox({ clientId: settings.dropbox.key, accessToken: 'odoutsvecp31wru' });

        const file = {
            contents: buffer,
            mute: false,
            path: settings.dropbox.outputDirectory + _getCurrentBackupName() + '.zip',
            mode: {
                add: () => { }
            },
            autorename: false
        };

        dbx.filesUpload(file).then((result, error) => {
            console.log(result, error);
        })



    });

}

_getLastElement = (array) => {
    return array[array.length - 1];
}

_getCurrentBackupName = () => {
    let now = new Date();
    return dateFormat(now, "dd-mm-yyyy");
}

_checkFoder = (folderName) => {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
}
module.exports = folderController;