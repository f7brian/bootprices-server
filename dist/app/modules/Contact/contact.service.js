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
exports.ContactServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const sendMail_1 = require("../../utils/sendMail");
const contact = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const to = config_1.default.send_to;
    const subject = `New Inquiry from ${data.fullName}`;
    const body = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2>📩 New Customer Inquiry</h2>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone Number:</strong> ${data.phone}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Order Number (URL):</strong> <a href="${data.orderNumber}" target="_blank">${data.orderNumber}</a></p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line; background: #f9f9f9; padding: 10px; border-radius: 5px;">${data.message}</p>
    </div>
  `;
    const result = yield (0, sendMail_1.sendEmail)(to, body, subject);
    return result;
});
exports.ContactServices = {
    contact
};
