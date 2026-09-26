import { AzureOpenai } from './index.mjs';
export function createAzureOpenai(apiKey, options = {}) {
  return new AzureOpenai(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
