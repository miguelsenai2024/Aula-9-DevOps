import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : /\.(m?js)$/.test(path) ? [path] : [];
  });
}
for (const file of ['apps', 'libs', 'scripts', 'tests'].flatMap(walk)) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log('Sintaxe JavaScript verificada.');
