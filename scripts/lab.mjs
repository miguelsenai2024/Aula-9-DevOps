// Laboratório local isolado. Nunca usa remoto ou modifica a main publicada.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const dir = resolve(process.argv[2] || 'work/git-lab');
if (existsSync(dir)) throw new Error('Escolha diretório novo para preservar a evidência anterior');
mkdirSync(dir, { recursive: true });
const log = [`Laboratório real executado em ${new Date().toISOString()}`, 'Repositório local isolado, sem remoto; main abaixo é somente a main do laboratório.'];
function git(args, expected = 0) {
  log.push(`\n$ git ${args.join(' ')}`);
  const result = spawnSync('git', args, { cwd: dir, encoding: 'utf8', env: { ...process.env, GIT_EDITOR: 'true', GIT_SEQUENCE_EDITOR: 'true' } });
  log.push((result.stdout || '').trim(), (result.stderr || '').trim(), `exit=${result.status}`);
  if (result.status !== expected) throw new Error(log.join('\n'));
  return (result.stdout || '').trim();
}
const write = (path, text) => writeFileSync(resolve(dir, path), text);
git(['init', '-b', 'main']);
git(['config', 'user.name', 'Carparts Laboratorio']);
git(['config', 'user.email', 'lab@example.invalid']);
git(['config', 'core.autocrlf', 'false']);
write('politica.txt', 'prazo=5\n');
git(['add', '.']); git(['commit', '-m', 'chore(lab): criar base']);
git(['switch', '-c', 'feat/prazo']);
write('politica.txt', 'prazo=2\n'); git(['commit', '-am', 'feat(lab): reduzir prazo']);
git(['switch', 'main']);
write('politica.txt', 'prazo=3\n'); git(['commit', '-am', 'fix(lab): ajustar prazo no tronco']);
git(['switch', 'feat/prazo']);
log.push('\nCENÁRIO 1: alterações concorrentes na mesma linha; o conflito é esperado.');
git(['rebase', 'main'], 1);
write('politica.txt', 'prazo=2\n'); git(['add', 'politica.txt']); git(['rebase', '--continue']);
git(['diff', 'main', '--', 'politica.txt']);
git(['switch', 'main']);
git(['merge', '--ff-only', 'feat/prazo']);
log.push('\nCENÁRIO 2: revert cria novo commit e preserva o commit revertido. Nenhum push é executado.');
const reverted = git(['rev-parse', 'HEAD']);
git(['revert', '--no-edit', reverted]);
git(['log', '-3', '--oneline']);
git(['show', 'HEAD:politica.txt']);
log.push('\nCENÁRIO 3: teste automático encontra uma regressão inserida de propósito.');
git(['switch', '-c', 'lab/bisect']);
write('calc.cjs', 'module.exports = (preco, quantidade) => preco * quantidade;\n');
write('test.cjs', "const assert = require('node:assert/strict');\nassert.equal(require('./calc.cjs')(10, 3), 30);\n");
git(['add', '.']); git(['commit', '-m', 'test(lab): estabelecer revisão boa']);
const good = git(['rev-parse', 'HEAD']);
let bug;
for (let i = 1; i <= 5; i++) {
  write('notas.txt', `etapa=${i}\n`);
  if (i === 3) write('calc.cjs', 'module.exports = (preco, quantidade) => preco + quantidade;\n');
  git(['add', '.']); git(['commit', '-m', i === 3 ? 'fix(lab): inserir regressão didática proposital' : `docs(lab): etapa ${i}`]);
  if (i === 3) bug = git(['rev-parse', 'HEAD']);
}
git(['bisect', 'start', 'HEAD', good]);
git(['bisect', 'run', 'node', 'test.cjs']);
const found = git(['rev-parse', 'refs/bisect/bad']);
if (found !== bug) throw new Error('Bisect encontrou commit diferente do bug inserido');
log.push(`VALIDADO: primeiro commit ruim ${found}; igual ao bug inserido ${bug}.`);
git(['bisect', 'reset']);
git(['log', '--all', '--graph', '--oneline']);
mkdirSync('evidencias', { recursive: true });
writeFileSync('evidencias/E5-laboratorio.txt', log.filter(Boolean).join('\n') + '\n');
console.log(`Laboratório concluído; conflito resolvido, revert preservado, bisect validado (${found}).`);
