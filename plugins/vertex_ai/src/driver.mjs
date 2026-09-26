import { VertexAi } from './index.mjs';
export function createVertexAi(apiKey, options = {}) {
  return new VertexAi(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
