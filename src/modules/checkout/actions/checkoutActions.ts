"use server";

import { container } from "@/infrastructure/container";
import { CreateOrderRequestDto } from "@/modules/orders/application/dto/CreateOrderRequestDto";
import { PlainOrderDto } from "@/modules/orders/application/dto/PlainOrderDto";
import { CreateOrderDtoMapper } from "@/modules/orders/application/mappers/CreateOrderDtoMapper";
import { OrderResponseMapper } from "@/modules/orders/application/mappers/OrderResponseMapper";

export async function submitCheckoutAction(
  request: CreateOrderRequestDto,
): Promise<PlainOrderDto> {
  const dto = CreateOrderDtoMapper.toDto(request);
  const order = await container.orders.createOrderUseCase.execute(dto);
  return OrderResponseMapper.toPlainOrder(order);
}
