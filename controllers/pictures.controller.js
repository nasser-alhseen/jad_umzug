import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';
import { removePic } from '../utils/helper.js';
import fs from 'fs';
import path from 'path';
let readFileJson = (myPath, callback) => {
    fs.readFile(path.join(path.resolve(), myPath), 'utf8', (err, data) => {
        if (data.length === 0) return callback(null);
        const jsonData = JSON.parse(data);
        callback(jsonData);
    });
};
let writeFileJson = (myPath, data, callback) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile(path.join(path.resolve(), myPath), jsonData, (err) => {
        if (err) {
            console.error(err);

            return callback(err, null); // إرجاع الخطأ إلى الcallback والقيمة الثانية هي null
        } else {
            return callback(null, 'Data written to file successfully'); // إرجاع النجاح إلى الcallback والقيمة الأولى هي null
        }
    });
};

export default {
    upload: (req, res) => {
        try {
            if (!req.file)
                throw Error(
                    'لا يمكنك اجراء عملية الرفع الرجاء التاكد من ادخال الصورة بلشكل الصحيح'
                );
            readFileJson('/json/pictures.json', (data) => {
                let generalId = uuidv4();
                data.push({
                    id: generalId,
                    path: process.env.LINK + `/upload/${req.file.filename}`,
                });
                writeFileJson('/json/pictures.json', data, (err, result) => {
                    if (err) console.error(err);
                });
                res.status(StatusCodes.OK).send({
                    success: true,
                    data,
                });
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: error.message,
            });
        }
    },
    delete: async (req, res) => {
        try {
            readFileJson('/json/pictures.json', (data) => {
                let imageRecent = data.find(
                    (image) => image.id === req.params.id
                );
                if (!imageRecent) {
                    return res.status(StatusCodes.BAD_REQUEST).send({
                        success: false,
                        error: 'رقم المطلوب غير موجود',
                    });
                }
                writeFileJson(
                    '/json/pictures.json',
                    data.filter((image) => image.id != req.params.id),
                    (err, result) => {
                        if (err) {
                            console.error(err);

                            return res
                                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                                .send({
                                    success: false,
                                    error: 'حدث خطأ أثناء حذف الصورة',
                                });
                        }

                        const imagePath = new URL(imageRecent.path).pathname;
                        const localPath = path.join(path.resolve(), imagePath);

                        if (fs.existsSync(localPath)) {
                            fs.unlink(localPath, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                        res.status(StatusCodes.OK).send({
                            success: true,
                            msg: 'تمت عملية الحذف بنجاح',
                        });
                    }
                );
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: error.message,
            });
        }
    },
    all: async (req, res) => {
        try {
            readFileJson('/json/pictures.json', (data) => {
                res.status(StatusCodes.OK).send({
                    success: true,
                    data,
                });
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({
                success: false,
                error: error.message,
            });
        }
    },
};
