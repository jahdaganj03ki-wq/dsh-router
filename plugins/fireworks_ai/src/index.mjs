import fetch from 'node-fetch';

export class FireworksAi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.fireworks.ai/inference/v1';
  }
  async chat(messages) {
    const resp = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    if (!resp.ok) throw new Error(`FireworksAi error: ${resp.status}`);
    return resp.json();
  }
  async discoverModels() {
    const resp = await fetch(`${this.baseUrl}/models`, { headers: { 'Authorization': `Bearer ${this.apiKey}` } });
    if (!resp.ok) return [];
    const data = await resp.json();
    return Array.isArray(data) ? data : data.models || [];
  }
}
export default FireworksAi;
