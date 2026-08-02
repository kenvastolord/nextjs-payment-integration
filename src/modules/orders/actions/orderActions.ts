"use server";

import { CreateOrderRequestDto } from "../application/dto/CreateOrderRequestDto";
import { PlainOrderDto } from "../application/dto/PlainOrderDto";
import { CreateOrderDtoMapper } from "../application/mappers/CreateOrderDtoMapper";
import { OrderResponseMapper } from "../application/mappers/OrderResponseMapper";
import {
  createOrderUseCase,
  getOrderByIdUseCase,
} from "../infrastructure/container";

export async function createOrderAction(
  request: CreateOrderRequestDto,
): Promise<PlainOrderDto> {
  const dto = CreateOrderDtoMapper.toDto(request);

  const order = await createOrderUseCase.execute(dto);

  return OrderResponseMapper.toPlainOrder(order);
}

export async function getOrderByIdAction(
  id: string,
): Promise<PlainOrderDto | null> {
  const order = await getOrderByIdUseCase.execute(id);

  if (!order) {
    return null;
  }

  return OrderResponseMapper.toPlainOrder(order);
}
