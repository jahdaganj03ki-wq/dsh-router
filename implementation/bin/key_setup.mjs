import fs from 'fs';
import readline from 'readline';
import path from 'path';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const envPath = path.resolve('.env');
let envLines = [];
if (fs.existsSync(envPath)) envLines = fs.readFileSync(envPath,'utf8').split('\n');

// Hardcoded provider slugs from providers.yaml for simplicity
const providers = [
  'kiro_ai','iflow','qwen','opencode_free','openrouter','nvidia_nim','gemini_free','cloudflare_ai',
  'claude_code','codex','github_copilot','cursor_ide','kilo_code','cline',
  'glm_coding','kimi','minimax','openai','anthropic','deepseek','groq','xai_grok','mistral','azure_openai'
];

async function ask(question) {
  return new Promise(res => rl.question(question, ans => res(ans)));
}

async function run() {
  console.log('dsh-router Key Setup - Placeholder Only');
  for (const slug of providers) {
    const key = `${slug.toUpperCase()}_API_KEY`;
    const existing = envLines.find(l => l.startsWith(key+'='))?.split('=')[1] || '';
    const ans = await ask(`${slug} API Key [${existing ? 'gesetzt' : 'leer'}]: `);
    if (ans) {
      envLines = envLines.filter(l => !l.startsWith(key+'='));
      envLines.push(`${key}=${ans}`);
    }
  }
  fs.writeFileSync(envPath, envLines.join('\n'));
  console.log('Keys gespeichert in .env');
  rl.close();
}
run();
