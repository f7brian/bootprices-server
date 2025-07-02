import config from "../../../config";
import { sendEmail } from "../../utils/sendMail";
import { TContactForm } from "./contact.interface";

const contact = async (data: TContactForm) => {
    const to = config.send_to as string;

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

    const result = await sendEmail(to, body, subject);
    return result
};

export const ContactServices = {
    contact
}
