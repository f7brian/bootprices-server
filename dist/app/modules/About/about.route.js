"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutRouters = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const about_controller_1 = require("./about.controller");
const about_validation_1 = require("./about.validation");
const router = express_1.default.Router();
router.put('/', (0, auth_1.default)('SUPERADMIN'), (0, validateRequest_1.default)(about_validation_1.AboutValidations.upsertAbout), about_controller_1.AboutControllers.upsertAbout);
router.get('/', about_controller_1.AboutControllers.getAbout);
exports.AboutRouters = router;
