import fs from 'fs';
import readline from 'readline';
import path from 'path';
import yaml from 'js-yaml';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const providersPath = path.resolve('implementation/providers.yaml');
const providers = yaml.load(fs.readFileSync(providersPath,'utf8')).providers;
const envPath = path.resolve('.env');

let envLines = [];
if (fs.existsSync(envPath)) envLines = fs.readFileSync(envPath,'utf8').split('\n');

function ask(question) {
  return new Promise(res => rl.question(question, ans => res(ans)));
}

async function run() {
  console.log('dsh-router Key Setup');
  for (const group of Object.values(providers)) {
    for (const p of group.providers) {
      const key = `${p.slug.toUpperCase()}_API_KEY`;
      const existing = envLines.find(l => l.startsWith(key+'='))?.split('=')[1] || '';
      const ans = await ask(`${p.name} (${p.slug}) API Key [${existing ? 'gesetzt' : 'leer'}]: `);
      if (ans) {
        envLines = envLines.filter(l => !l.startsWith(key+'='));
        envLines.push(`${key}=${ans}`);
      }
    }
  }
  fs.writeFileSync(envPath, envLines.join('\n'));
  console.log('Keys gespeichert in .env');
  rl.close();
}
run();
