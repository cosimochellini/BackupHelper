const fs = require('fs');
const fse = require('fs-extra');
const zipdir = require('zip-dir');
const dateFormat = require('dateformat');

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


folderController.zipFolder = (folder) => {
    zipdir(folder, { saveTo: folder + '.zip' }, function (err, buffer) {
        // `buffer` is the buffer of the zipped file
        // And the buffer was saved to `~/myzip.zip`
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