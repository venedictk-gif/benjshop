import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://qauser:qapass@localhost:5672';

export async function sendMessage(queue: string, message: object): Promise<void> {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  await channel.close();
  await connection.close();
}

export async function receiveMessage(queue: string): Promise<any> {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  const msg = await channel.get(queue);
  await channel.close();
  await connection.close();
  if (!msg) return null;
  return JSON.parse(msg.content.toString());
}