// Trae CN Provider Driver mit VPN Workaround
export class TraeCNDriver {
  constructor(options = {}) {
    this.baseUrl = 'https://trae-api-cn.mchost.guru';
    this.proxy = options.vpnProxy || null; // http(s) proxy für China-Only
    this.freeTier = true;
  }
  async fetchWithProxy(url, opts) {
    if (this.proxy) {
      // Nutze VPN Proxy
      opts.proxy = this.proxy;
    }
    return fetch(url, opts);
  }
  // Device Code Flow nicht offiziell, nutze Community Web-Login
  async authorize() {
    // Öffne https://www.trae.cn/authorization mit VPN
    // Lokal Callback 127.0.0.1:8000/authorize
    return { requiresVpn: true };
  }
}
