import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve('implementation/data/quota_state.json');

function loadState() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Quota state load failed', e);
  }
  return {};
}

function saveState(state) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2));
  } catch (e) {
    console.warn('Quota state save failed', e);
  }
}

export class PersistentQuotaTracker {
  constructor() {
    this.state = loadState();
  }

  _ensureProvider(providerSlug) {
    if (!this.state[providerSlug]) this.state[providerSlug] = {};
  }

  addAccount(providerSlug, accountId, limit) {
    this._ensureProvider(providerSlug);
    if (!this.state[providerSlug][accountId]) {
      this.state[providerSlug][accountId] = { used: 0, limit, errors: 0 };
    }
    saveState(this.state);
  }

  consume(providerSlug, accountId, amount = 1) {
    this._ensureProvider(providerSlug);
    const acc = this.state[providerSlug][accountId];
    if (!acc) return false;
    acc.used += amount;
    saveState(this.state);
    return acc.used <= acc.limit;
  }

  recordError(providerSlug, accountId) {
    this._ensureProvider(providerSlug);
    const acc = this.state[providerSlug][accountId];
    if (acc) {
      acc.errors += 1;
      saveState(this.state);
    }
  }

  getNextAccount(providerSlug) {
    this._ensureProvider(providerSlug);
    const accounts = this.state[providerSlug];
    let bestId = null;
    let bestScore = Infinity;
    for (const [id, acc] of Object.entries(accounts)) {
      const score = acc.used + acc.errors * 10;
      if (score < bestScore) {
        bestScore = score;
        bestId = id;
      }
    }
    return bestId;
  }

  rotateOnError(providerSlug, accountId) {
    this.recordError(providerSlug, accountId);
    const next = this.getNextAccount(providerSlug);
    return next && next !== accountId ? next : accountId;
  }
}

export default PersistentQuotaTracker;
