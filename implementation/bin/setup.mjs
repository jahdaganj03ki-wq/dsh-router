import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const [, , groupArg] = process.argv;
const group = groupArg || 'FREE_Forever';

const providersPath = path.resolve('implementation/providers.yaml');
const providers = yaml.load(fs.readFileSync(providersPath, 'utf8')).providers;

if (!providers[group]) {
  console.error('Group not found:', group);
  console.error('Available groups:', Object.keys(providers).join(', '));
  process.exit(1);
}

const envPath = path.resolve('.env.example');
let envContent = '# dsh-router API Keys\n';
for (const p of providers[group].providers) {
  envContent += `${p.slug.toUpperCase()}_API_KEY=\n`;
}
fs.writeFileSync(envPath, envContent);
console.log(`Created ${envPath} for group ${group}`);
console.log('Providers:');
providers[group].providers.forEach(p => console.log(`- ${p.name} (${p.slug})`));
