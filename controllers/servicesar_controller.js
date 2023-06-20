import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';
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
            if (!req.body.content)
                throw Error(
                    'لا يمكنك اجراء عملية الرفع الرجاء التاكد من ادخال الصورة بلشكل الصحيح'
                );
            readFileJson('/json/servicesar.json', (data) => {
                let generalId = uuidv4();
                data.push({
                    id: generalId,
                    content: req.body.content.trim(),
                });
                writeFileJson('/json/servicesar.json', data, (err, result) => {
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
            readFileJson('/json/servicesar.json', (data) => {
                if (!data.find((content) => content.id === req.params.id)) {
                    return res.status(StatusCodes.BAD_REQUEST).send({
                        success: false,
                        error: 'رقم المطلوب غير موجود',
                    });
                }
                writeFileJson(
                    '/json/servicesar.json',
                    data.filter((content) => content.id != req.params.id),
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
            readFileJson('/json/servicesar.json', (data) => {
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
