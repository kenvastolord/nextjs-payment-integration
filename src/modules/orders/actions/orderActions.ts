"use server";

import { container } from "@/infrastructure/container";

import { CreateOrderRequestDto } from "../application/dto/CreateOrderRequestDto";
import { PlainOrderDto } from "../application/dto/PlainOrderDto";
import { CreateOrderDtoMapper } from "../application/mappers/CreateOrderDtoMapper";
import { OrderResponseMapper } from "../application/mappers/OrderResponseMapper";

export async function createOrderAction(
  request: CreateOrderRequestDto,
): Promise<PlainOrderDto> {
  const dto = CreateOrderDtoMapper.toDto(request);

  const order = await container.orders.createOrderUseCase.execute(dto);

  return OrderResponseMapper.toPlainOrder(order);
}

export async function getOrderByIdAction(
  id: string,
): Promise<PlainOrderDto | null> {
  const order = await container.orders.getOrderByIdUseCase.execute(id);

  if (!order) {
    return null;
  }

  return OrderResponseMapper.toPlainOrder(order);
}
