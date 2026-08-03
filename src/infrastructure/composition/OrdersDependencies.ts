import { CancelOrderUseCase } from "@/modules/orders/application/use-cases/CancelOrderUseCase";
import { ConfirmOrderUseCase } from "@/modules/orders/application/use-cases/ConfirmOrderUseCase";
import { CreateOrderUseCase } from "@/modules/orders/application/use-cases/CreateOrderUseCase";
import { DeliverOrderUseCase } from "@/modules/orders/application/use-cases/DeliverOrderUseCase";
import { GetOrderByIdUseCase } from "@/modules/orders/application/use-cases/GetOrderByIdUseCase";
import { PrepareOrderUseCase } from "@/modules/orders/application/use-cases/PrepareOrderUseCase";
import { ShipOrderUseCase } from "@/modules/orders/application/use-cases/ShipOrderUseCase";

export interface OrdersDependencies {
  createOrderUseCase: CreateOrderUseCase;
  getOrderByIdUseCase: GetOrderByIdUseCase;
  confirmOrderUseCase: ConfirmOrderUseCase;
  cancelOrderUseCase: CancelOrderUseCase;
  prepareOrderUseCase: PrepareOrderUseCase;
  shipOrderUseCase: ShipOrderUseCase;
  deliverOrderUseCase: DeliverOrderUseCase;
}
