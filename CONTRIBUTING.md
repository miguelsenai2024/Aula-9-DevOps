# Política de contribuição Carparts

## Branches e commits (E2)

Usar trunk-based: main sempre integrável; branches pequenas por tarefa, sincronização diária e vida máxima de dois dias úteis. Dividir trabalhos maiores e usar feature flags quando necessário. Nomes: `feat/descricao`, `fix/descricao`, `docs/descricao` e `chore/descricao`.

Usar Conventional Commits: `feat(portal): adicionar busca`, `fix(api): corrigir cálculo`, `docs(devops): registrar evidências`. Mudanças incompatíveis usam `!` e explicação no corpo. O histórico padronizado permite gerar changelog por release; este laboratório não publica releases automaticamente.

1. `git switch main` e `git pull --ff-only`.
2. `git switch -c feat/minha-tarefa`.
3. Editar; executar `git status`, `git diff` e `npm run check`.
4. `git add <arquivos>` e `git commit -m "feat(escopo): descricao"`.
5. Antes de publicar, `git fetch origin` e `git rebase origin/main` na branch pessoal ainda não compartilhada; resolver conflitos, testar e `git rebase --continue`.
6. `git push -u origin feat/minha-tarefa` e abrir PR.
7. CI verde, revisão humana e aprovação de code owner; integração pela merge queue onde disponível.

Depois de publicada, uma branch compartilhada não deve sofrer rebase/amend: atualizar por merge para preservar seus commits. Nunca usar force push ou reset --hard em histórico compartilhado. Desfazer mudanças da main somente com revert por branch e PR, mantendo checks e revisão.

## PRs de agentes

Declarar uso de IA, intenção, critérios de aceitação, testes executados e limitações. Limitar escopo; separar mudanças independentes. O agente não aprova o próprio trabalho. Mudanças em prompts, API e workflows exigem inspeção do proprietário responsável. CODEOWNERS organiza revisão por caminho; não equivale à revisão semântica do Antique.

## Proteção (E3)

Exigir PR, pelo menos uma aprovação humana, aprovação de code owners, descarte de aprovações após novos commits, resolução de conversas, check `CI / gate` e branch atualizada. Aplicar também aos administradores; bloquear exclusão e force push. Não criar exceções para agentes. O primeiro README é o bootstrap gerado pelo GitHub, anterior à política; toda implementação segue por PR.

A merge queue requer repositório de organização. Este repositório pessoal prepara `merge_group`, mas não apresenta a fila como ativa. Não migrar propriedade nem contratar plano sem decisão do usuário.

## Segurança

Não versionar `.env`, chaves ou tokens, nem mesmo temporariamente. Gitleaks examina histórico no CI. Permissões de Actions limitadas à leitura e credenciais de checkout não persistidas. Nunca executar código de PR não confiável com secrets via pull_request_target.

## Medição em duas semanas

Dias 1–2: baseline e causas de conflitos. Dias 3–5: política, proteção e CI. Dias 6–10: revisão diária das branches. Dias 11–14: comparar checkout, duração de jobs, frequência de conflitos e lead time real dos PRs. Os 11 dias e a meta de 2 dias são dados do cenário didático, não medições deste repositório.
