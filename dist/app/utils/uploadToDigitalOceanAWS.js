"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromDigitalOceanAWS = exports.uploadToDigitalOceanAWS = void 0;
/* eslint-disable no-console */
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("../../config"));
const accessKey = config_1.default.do_space.access_key;
const bucket = config_1.default.do_space.bucket;
const endpoints = config_1.default.do_space.endpoints;
const secretKey = config_1.default.do_space.secret_key;
const s3Client = new client_s3_1.S3Client({
    region: 'us-east-1', // Set any valid region
    endpoint: endpoints,
    credentials: {
        accessKeyId: `${accessKey}`,
        secretAccessKey: `${secretKey}`,
    },
});
const uploadToDigitalOceanAWS = (
// eslint-disable-next-line no-undef
file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure the file exists before uploading
        // await fs.promises.access(file.path, fs.constants.F_OK);
        // const fileStream: Readable = fs.createReadStream(file.path);
        // Prepare the upload command
        const command = new client_s3_1.PutObjectCommand({
            Bucket: `${bucket}`,
            Key: `${file.originalname}`,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
        });
        // Execute the upload
        yield s3Client.send(command);
        // Construct the direct URL to the uploaded file
        const Location = `${endpoints}/${bucket}/${file.originalname}`;
        return { Location };
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error uploading file`, error);
        throw error;
    }
});
exports.uploadToDigitalOceanAWS = uploadToDigitalOceanAWS;
const deleteFromDigitalOceanAWS = (fileUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the file key from the URL
        const key = fileUrl.replace(`${endpoints}/${bucket}/`, '');
        // Prepare the delete command
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: `${bucket}`,
            Key: key,
        });
        // Execute the delete command
        yield s3Client.send(command);
        console.log(`Successfully deleted file: ${fileUrl}`);
    }
    catch (error) {
        console.error(`Error deleting file: ${fileUrl}`, error);
        throw new Error(`Failed to delete file: ${error === null || error === void 0 ? void 0 : error.message}`);
    }
});
exports.deleteFromDigitalOceanAWS = deleteFromDigitalOceanAWS;
