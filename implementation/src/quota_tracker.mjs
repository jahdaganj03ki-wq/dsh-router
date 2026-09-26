export class QuotaTracker {
  constructor() {
    this.accounts = new Map();
  }

  addAccount(providerSlug, accountId, limit) {
    if (!this.accounts.has(providerSlug)) {
      this.accounts.set(providerSlug, new Map());
    }
    this.accounts.get(providerSlug).set(accountId, { used: 0, limit, errors: 0 });
  }

  consume(providerSlug, accountId, amount = 1) {
    const provider = this.accounts.get(providerSlug);
    if (!provider) return false;
    const acc = provider.get(accountId);
    if (!acc) return false;
    acc.used += amount;
    return acc.used <= acc.limit;
  }

  recordError(providerSlug, accountId) {
    const provider = this.accounts.get(providerSlug);
    if (!provider) return;
    const acc = provider.get(accountId);
    if (acc) acc.errors += 1;
  }

  getNextAccount(providerSlug) {
    const provider = this.accounts.get(providerSlug);
    if (!provider) return null;
    // simple round robin with least used and errors
    let best = null;
    let bestScore = Infinity;
    for (const [id, acc] of provider.entries()) {
      const score = acc.used + acc.errors * 10;
      if (score < bestScore) {
        bestScore = score;
        best = id;
      }
    }
    return best;
  }

  rotateOnError(providerSlug, accountId) {
    this.recordError(providerSlug, accountId);
    const next = this.getNextAccount(providerSlug);
    return next && next !== accountId ? next : accountId;
  }
}

export default QuotaTracker;
