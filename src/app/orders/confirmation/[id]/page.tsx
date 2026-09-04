import { getOrderByIdAction } from "@/modules/orders/actions/orderActions";
import { formatPrice } from "@/shared/utils/formatPrice";
import Link from "next/link";
import { CheckCircle, Package, MapPin } from "lucide-react";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const orderId = (await params).id;
  const order = await getOrderByIdAction(orderId);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-semibold text-red-500">Order Not Found</h1>
        <p className="text-gray-500">
          We couldn&apos;t retrieve the details for order{" "}
          <span className="font-mono">{orderId}</span>.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 md:p-8 bg-white border border-gray-100 shadow-xl rounded-2xl flex flex-col gap-8">
      <div className="flex flex-col items-center text-center gap-2 border-b border-gray-100 pb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Thank you for your order!
        </h1>
        <p className="text-gray-500 text-sm">
          Your order has been placed successfully and is now being processed.
        </p>
        <span className="mt-4 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider">
          Order Status: {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="flex flex-col gap-4 p-5 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200/50 pb-2">
            <Package className="w-4 h-4 text-gray-500" /> Order Information
          </h3>
          <div className="flex flex-col gap-1.5 text-gray-600">
            <p>
              <strong>Order ID:</strong>{" "}
              <span className="font-mono text-xs">{order.id}</span>
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Customer:</strong> {order.customerSnapshot.firstName}{" "}
              {order.customerSnapshot.lastName}
            </p>
            <p>
              <strong>Email:</strong> {order.customerSnapshot.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200/50 pb-2">
            <MapPin className="w-4 h-4 text-gray-500" /> Shipping Address
          </h3>
          <div className="flex flex-col gap-1.5 text-gray-600">
            <p className="font-semibold text-gray-800">
              {order.shippingAddress.recipientName}
            </p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && (
              <p>{order.shippingAddress.addressLine2}</p>
            )}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">
          Items Purchased
        </h3>
        <div className="flex flex-col gap-3">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-0"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-800">{item.name}</span>
                <span className="text-xs text-gray-400 font-mono">
                  SKU: {item.sku}
                </span>
              </div>
              <div className="text-right">
                <span className="text-gray-600">
                  {item.quantity} x {order.totals.currency}{" "}
                  {formatPrice(item.finalUnitPrice)}
                </span>
                <p className="font-semibold text-gray-800 mt-0.5">
                  {order.totals.currency} {formatPrice(item.lineTotal)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>
            {order.totals.currency} {formatPrice(order.totals.subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping Fee</span>
          <span>
            {order.totals.currency} {formatPrice(order.totals.shipping)}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Taxes</span>
          <span>
            {order.totals.currency} {formatPrice(order.totals.taxes)}
          </span>
        </div>
        {order.totals.discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>
              -{order.totals.currency} {formatPrice(order.totals.discount)}
            </span>
          </div>
        )}
        <hr className="border-gray-100" />
        <div className="flex justify-between text-base font-bold text-gray-900">
          <span>Total Paid</span>
          <span>
            {order.totals.currency} {formatPrice(order.totals.total)}
          </span>
        </div>
      </div>

      <div className="flex justify-center border-t border-gray-100 pt-6">
        <Link
          href="/"
          className="px-6 py-2.5 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
