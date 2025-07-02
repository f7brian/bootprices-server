import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ContactFormValidations } from "./contact.validation";
import { ContactControllers } from "./contact.controller";

const router = Router();
router.post(
    '',
    validateRequest(ContactFormValidations.contactForm),
    ContactControllers.contact
)
const ContactRoutes = router;
export default ContactRoutes;