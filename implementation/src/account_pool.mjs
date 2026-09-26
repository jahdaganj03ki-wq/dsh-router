import { PersistentQuotaTracker } from './quota_tracker_persistent.mjs';

export class AccountPool {
  constructor() {
    this.tracker = new PersistentQuotaTracker();
  }

  register(providerSlug, accounts) {
    // accounts = [{id, apiKey, limit}]
    accounts.forEach(acc => {
      this.tracker.addAccount(providerSlug, acc.id, acc.limit ?? Infinity);
    });
  }

  async call(providerSlug, fn) {
    const accountId = this.tracker.getNextAccount(providerSlug);
    if (!accountId) throw new Error('No accounts available for provider ' + providerSlug);
    try {
      const result = await fn(accountId);
      this.tracker.consume(providerSlug, accountId);
      return result;
    } catch (err) {
      const status = err?.status || err?.response?.status || 0;
      if (status === 429 || status === 402) {
        const next = this.tracker.rotateOnError(providerSlug, accountId);
        if (next !== accountId) {
          return this.call(providerSlug, fn);
        }
      }
      throw err;
    }
  }
}

export default AccountPool;
