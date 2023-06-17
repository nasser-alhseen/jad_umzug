import fs from 'fs';
import { configStorage, createMulter } from '../config/multer.js';
import path from 'path';

export let moveFile = (file, dir2) => {
    var f = path.basename(file);
    var dest = path.resolve(dir2, f);

    fs.rename(file, dest, (err) => {
        if (err) throw Error(err);
    });
    return dest;
};
export let removeFolder = (id) => {
    try {
        let folder = path.join(
            path.resolve('__dirname'),
            `../upload/images/${id}`
        );
        if (fs.existsSync(folder)) {
            fs.rmSync(folder, { recursive: true, force: true });
        }
    } catch (error) {
        return { err: error.message };
    }
};

export let removePic = (myPath) => {
    if (fs.existsSync(myPath)) {
        fs.unlink(myPath, (err) => {
            return err;
        });
    }
};

export let removeAvatars = (req) => {
    let showError = (err) => {
        if (err) {
            return err;
        }
    };
    if (req.files) {
        req.files.forEach((element) => {
            if (fs.existsSync(element.path)) fs.unlink(element.path, showError);
        });
    }
};

export let checkAvatars = (req) => {
    //? check images
    if (
        //if any avatar not found
        !req.files.StoreStory ||
        !req.files.avatar ||
        !req.files.avatar1 ||
        !req.files.avatar2 ||
        !req.files.StoreStory ||
        (req.files.StoreStory && req.files.StoreStory.length < 3)
    ) {
        return false;
    }
    return true;
};
export let configFolder = (id) => {
    // ! create folder with id
    try {
        let myPath = path.join(
            path.resolve('__dirname'),
            `../upload/images`,
            id.toString()
        );
        let myError = {};
        if (!fs.existsSync(myPath)) {
            fs.mkdir(myPath, (err) => {
                if (err) myError.error = err;
            });
            if (myError.error) return myError.error;
        }
        return myPath;
    } catch (error) {
        return { err: error.message };
    }
};
export let configUpload = async (field, type) => {
    try {
        let myPath = path.join(path.resolve('__dirname'), `../upload`);
        let upload = createMulter(configStorage(myPath));

        upload = upload.single(field);
        return upload;
    } catch (error) {
        return { error };
    }
};
