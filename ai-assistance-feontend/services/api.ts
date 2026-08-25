export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export async function mockDelay<T>(value: T, delay = 300): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return value;
}
