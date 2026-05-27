export function getAuthHeader(): string {
  const key = process.env.WOOCOMMERCE_KEY;
  const secret = process.env.WOOCOMMERCE_SECRET;
  const credentials = Buffer.from(`${key}:${secret}`).toString('base64');
  return `Basic ${credentials}`;
}