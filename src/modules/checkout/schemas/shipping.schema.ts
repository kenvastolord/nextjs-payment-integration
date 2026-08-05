import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const shippingFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must contain at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must contain at least 2 characters.")
    .max(50, "Last name cannot exceed 50 characters."),

  email: z
    .email({
      message: "Invalid email address.",
    })
    .max(254, "Email cannot exceed 254 characters."),

  phone: z
    .string()
    .min(1, "Phone number is required.")
    .refine(isValidPhoneNumber, {
      message: "Invalid phone number.",
    }),

  addressLine1: z
    .string()
    .trim()
    .min(5, "Address must contain at least 5 characters.")
    .max(100, "Address cannot exceed 100 characters."),

  addressLine2: z
    .string()
    .trim()
    .max(100, "Address line 2 cannot exceed 100 characters.")
    .optional(),

  city: z
    .string()
    .trim()
    .min(2, "City must contain at least 2 characters.")
    .max(80, "City cannot exceed 80 characters."),

  state: z
    .string()
    .trim()
    .max(80, "State cannot exceed 80 characters.")
    .optional(),

  postalCode: z
    .string()
    .trim()
    .min(1, "Postal code is required.")
    .max(20, "Postal code cannot exceed 20 characters."),

});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;
