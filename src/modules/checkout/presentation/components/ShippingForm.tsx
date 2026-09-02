"use client";

import { forwardRef } from "react";

import "./phone-input.css";
import "react-phone-number-input/style.css";

import {
  ShippingFormInputs,
  shippingFormSchema,
} from "@/modules/checkout/schemas/shipping.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input";

type ShippingFormProps = {
  shippingForm?: ShippingFormInputs;
  onSubmit: (data: ShippingFormInputs) => void;
};

const ShippingForm = forwardRef<HTMLFormElement, ShippingFormProps>(
  function ShippingForm(
    {
      shippingForm,
      onSubmit,
    },
    ref,
  ) {
    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<ShippingFormInputs>({
      resolver: zodResolver(shippingFormSchema),
      defaultValues: shippingForm,
    });

    const handleShippingForm: SubmitHandler<ShippingFormInputs> = (
      data,
    ) => {
      onSubmit(data);
    };

    return (
      <form
        id="shipping-form"
        ref={ref}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        onSubmit={handleSubmit(handleShippingForm)}
      >
        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="firstName"
            className="text-xs font-medium text-gray-500"
          >
            First Name
          </label>

          <input
            id="firstName"
            type="text"
            placeholder="John"
            autoComplete="given-name"
            maxLength={50}
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("firstName")}
          />

          {errors.firstName && (
            <p className="text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="lastName"
            className="text-xs font-medium text-gray-500"
          >
            Last Name
          </label>

          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            autoComplete="family-name"
            maxLength={50}
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("lastName")}
          />

          {errors.lastName && (
            <p className="text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label
            htmlFor="email"
            className="text-xs font-medium text-gray-500"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            maxLength={254}
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-xs font-medium text-gray-500">
            Phone
          </label>

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                international
                defaultCountry="ES"
                placeholder="Enter phone number"
                value={field.value}
                onChange={(value) =>
                  field.onChange(value ?? "")
                }
              />
            )}
          />

          {errors.phone && (
            <p className="text-xs text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Street Address */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label
            htmlFor="addressLine1"
            className="text-xs font-medium text-gray-500"
          >
            Street Address
          </label>

          <input
            id="addressLine1"
            type="text"
            placeholder="123 Main Street"
            autoComplete="address-line1"
            maxLength={100}
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("addressLine1")}
          />

          {errors.addressLine1 && (
            <p className="text-xs text-red-500">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        {/* Apartment */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label
            htmlFor="addressLine2"
            className="text-xs font-medium text-gray-500"
          >
            Apartment, suite, etc. (Optional)
          </label>

          <input
            id="addressLine2"
            type="text"
            placeholder="Apartment 2B"
            autoComplete="address-line2"
            maxLength={100}
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("addressLine2")}
          />

          {errors.addressLine2 && (
            <p className="text-xs text-red-500">
              {errors.addressLine2.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="city"
            className="text-xs font-medium text-gray-500"
          >
            City
          </label>

          <input
            id="city"
            type="text"
            placeholder="Madrid"
            autoComplete="address-level2"
            maxLength={80}
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("city")}
          />

          {errors.city && (
            <p className="text-xs text-red-500">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* State */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="state"
            className="text-xs font-medium text-gray-500"
          >
            State / Province
          </label>

          <input
            id="state"
            type="text"
            placeholder="Madrid"
            autoComplete="address-level1"
            maxLength={80}
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("state")}
          />

          {errors.state && (
            <p className="text-xs text-red-500">
              {errors.state.message}
            </p>
          )}
        </div>

        {/* Postal Code */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="postalCode"
            className="text-xs font-medium text-gray-500"
          >
            Postal Code
          </label>

          <input
            id="postalCode"
            type="text"
            placeholder="30001"
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={20}
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("postalCode")}
          />

          {errors.postalCode && (
            <p className="text-xs text-red-500">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </form>
    );
  },
);

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
