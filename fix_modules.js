const fs = require('fs');
const path = require('path');
const base = 'C:\\Coding\\dsh-oauthproextended\\implementation\\modules';
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base,d)).isDirectory());
dirs.forEach(slug => {
  const modPath = path.join(base, slug);
  const moduleJsonPath = path.join(modPath, 'module.json');
  if (!fs.existsSync(moduleJsonPath)) return;
  const mod = JSON.parse(fs.readFileSync(moduleJsonPath,'utf8'));
  const baseUrl = mod.baseUrl || '';
  const className = slug.split('_').map(p => p.charAt(0).toUpperCase()+p.slice(1)).join('');
  const srcDir = path.join(modPath,'src');
  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir);
  const indexPath = path.join(srcDir,'index.mjs');
  const indexContent = `import fetch from 'node-fetch';

export class ${className} {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = '${baseUrl}';
  }
  async chat(messages) {
    const resp = await fetch(\`\${this.baseUrl}/chat\`, {
      method: 'POST',
      headers: { 'Authorization': \`Bearer \${this.apiKey}\`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    if (!resp.ok) throw new Error(\`${className} error: \${resp.status}\`);
    return resp.json();
  }
  async discoverModels() {
    const resp = await fetch(\`\${this.baseUrl}/models\`, { headers: { 'Authorization': \`Bearer \${this.apiKey}\` } });
    if (!resp.ok) return [];
    const data = await resp.json();
    return Array.isArray(data) ? data : data.models || [];
  }
}
export default ${className};
`;
  fs.writeFileSync(indexPath, indexContent);
  const driverPath = path.join(srcDir,'driver.mjs');
  const driverContent = `import { ${className} } from './index.mjs';
export function create${className}(apiKey, options = {}) {
  return new ${className}(apiKey);
}
export async function startDeviceCodeFlow() { return null; }
`;
  fs.writeFileSync(driverPath, driverContent);
});
console.log('Modules repaired');
