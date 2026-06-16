import { test, expect } from '@playwright/test';
import { sendMessage, receiveMessage } from '../../utils/rabbitmq';

test('Отправка и получение сообщения через RabbitMQ', async () => {
  const testMessage = { orderId: 123, status: 'pending' };
  await sendMessage('orders', testMessage);
  const received = await receiveMessage('orders');
  expect(received).not.toBeNull();
  expect(received.orderId).toBe(123);
  expect(received.status).toBe('pending');
});