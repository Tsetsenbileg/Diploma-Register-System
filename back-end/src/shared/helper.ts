export class Helper {
    static async customFileName(req, file, callback) {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        let fileExtension = "";
        if (file.mimetype.indexOf("jpeg") > -1) {
            fileExtension = "jpg"
        } else if (file.mimetype.indexOf("png") > -1) {
            fileExtension = "png";
        } else if (file.mimetype.indexOf('pdf') > -1) {
            fileExtension = 'pdf';
        }
        const originalName = file.originalname.split(".")[0];
        callback(null, originalName + '-' + uniqueSuffix + "." + fileExtension);

    }

    static async destinationPath(req, file, callback) {
        callback(null, './uploads');
    }
}