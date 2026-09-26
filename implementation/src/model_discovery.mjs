import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const CACHE_DIR = path.resolve('implementation/cache');
const CACHE_FILE = path.join(CACHE_DIR, 'models.json');

function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {}
  return {};
}

function saveCache(cache) {
  try {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch {}
}

export async function discoverModels(providerSlug, baseUrl, apiKey) {
  const cache = loadCache();
  const now = Date.now();
  const ttl = 24 * 60 * 60 * 1000; // 24h
  if (cache[providerSlug] && now - cache[providerSlug].timestamp < ttl) {
    return cache[providerSlug].models;
  }
  try {
    const resp = await fetch(`${baseUrl}/models`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    if (!resp.ok) throw new Error(`models fetch ${resp.status}`);
    const data = await resp.json();
    const models = Array.isArray(data) ? data : data.models || [];
    cache[providerSlug] = { timestamp: now, models };
    saveCache(cache);
    return models;
  } catch (e) {
    console.warn(`Model discovery failed for ${providerSlug}`, e.message);
    return cache[providerSlug]?.models || [];
  }
}
