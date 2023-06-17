import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

//if want to store the image in folder and store in db then should use this

//***************  Create folders ****************** */
//? create the folder if not already exist
// ! create upload folder if not exists
if (!fs.existsSync(path.join(path.resolve("__dirname"), "..", "upload"))) {
    fs.mkdir(path.join(path.resolve("__dirname"), "..", "upload"), (err) => {
        if (err) {
            return console.error(err);
        }
    });
}
//filter image
const fileFilterImage = (req, file, cb) => {
    //should type image like .jpg,.png, .jpeg
    // if (!file.originalname.match(/\.(jpg|png|jpeg)$/))
    //  just image accepted

    if (!file.mimetype.startsWith("image")) {
        return cb(new Error("Please upload an image type only."), false);
    }
    //otherwise return success
    //mean first args is undefined error ,second args mean
    cb(null, true);
};

//filter image
const fileFilterEvery = (req, file, cb) => {
    if (
        !file.originalname.match(
            /\.(jpg|png|jpeg|txt|pdf|docx|xlsx|pptx|gif|mp3|mp4|doc|xls|ppt|mov|avi)$/
        )
    )
        return cb(
            new Error(`
      Please upload from the following types only
      .jpg,.png,.jpeg,.txt,.pdf,.docx,.xlsx,.pptx,.gif,.mp3,.mp4,.doc,.xls,.ppt,.mov,.avi`),
            false
        );
    //otherwise return success
    //mean first args is undefined error ,second args mean
    cb(null, true);
};

// config storage
export let configStorage = (pathStorage) =>
    multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, pathStorage);
        },
        //config filename
        filename: function (req, file, cb) {
            // console.log(file);
            let generalId = uuidv4();
            //name-date-extension
            cb(null, `${generalId}${path.extname(file.originalname)}`);
        },
    });

// crete multer with special storage path
export let createMulter = (storage) =>
    multer({
        storage,
        //to validate the picture
        limits: {
            //set the limited size ,measure bytes 1M byte=1e6
            fileSize: 4 * 1024 * 1024, // 4MB
            //this mean the min is 3 Mega
        },
        //filter file with specific details
        fileFilter: fileFilterImage,
    });

export let createMulterEveryType = (storage) =>
    multer({
        storage,
        // limits: {
        //   fileSize: 30 * 1024 * 1024, // 30MB
        // },
        fileFilter: fileFilterEvery,
    });
