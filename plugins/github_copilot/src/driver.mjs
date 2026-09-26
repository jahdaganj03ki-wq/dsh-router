import { GithubCopilot } from './index.mjs';
export function createGithubCopilot(apiKey, options = {}) {
  return new GithubCopilot(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
