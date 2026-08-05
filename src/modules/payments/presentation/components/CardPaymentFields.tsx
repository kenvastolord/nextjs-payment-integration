import { UseFormRegister, FieldErrors } from "react-hook-form";

import {
  PaymentFormInputs,
} from "@/modules/payments/schemas/payment.schema";

type CardPaymentFieldsProps = {
  register: UseFormRegister<PaymentFormInputs>;
  errors: FieldErrors<PaymentFormInputs>;
};

function CardPaymentFields({
  register,
  errors,
}: CardPaymentFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardHolder"
          className="text-xs font-medium text-gray-500"
        >
          Name on card
        </label>

        <input
          id="cardHolder"
          type="text"
          placeholder="John Doe"
          className="border-b border-gray-200 py-2 text-sm outline-none"
          {...register("cardHolder")}
        />

        {errors.cardHolder && (
          <p className="text-xs text-red-500">
            {errors.cardHolder.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardNumber"
          className="text-xs font-medium text-gray-500"
        >
          Card Number
        </label>

        <input
          id="cardNumber"
          type="text"
          placeholder="1234567891234567"
          className="border-b border-gray-200 py-2 text-sm outline-none"
          {...register("cardNumber")}
        />

        {errors.cardNumber && (
          <p className="text-xs text-red-500">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="expirationDate"
            className="text-xs font-medium text-gray-500"
          >
            Expiration Date
          </label>

          <input
            id="expirationDate"
            type="text"
            placeholder="MM/YY"
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("expirationDate")}
          />

          {errors.expirationDate && (
            <p className="text-xs text-red-500">
              {errors.expirationDate.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="cvv"
            className="text-xs font-medium text-gray-500"
          >
            CVV
          </label>

          <input
            id="cvv"
            type="text"
            placeholder="123"
            className="border-b border-gray-200 py-2 text-sm outline-none"
            {...register("cvv")}
          />

          {errors.cvv && (
            <p className="text-xs text-red-500">
              {errors.cvv.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default CardPaymentFields;
