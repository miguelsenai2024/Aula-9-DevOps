# E6 — Parecer técnico: Scion e Carparts

**Decisão:** manter Git e GitHub e reduzir os gargalos medidos antes de considerar uma mudança de plataforma. A Carparts tem quatro desenvolvedores e cerca de quarenta PRs semanais no cenário da atividade. Construir e operar um controle de versão próprio não se justifica diante desse contexto, das restrições da diretoria e do prazo de duas semanas.

O Scion responde a uma carga excepcional de agentes e automações sempre conectados. Na arquitetura descrita pela Anthropic, o servidor cria changesets incrementais, oferece consultas de histórico por API e entrega conteúdo imutável por caches em camadas. O cliente busca somente o necessário. O artigo é um relato técnico da própria empresa, não uma comparação independente aplicável automaticamente a outros projetos. Aqui, os detalhes arquiteturais explicam a motivação; não são uma promessa de ganho para a Carparts.

Adotaremos três ideias no Git existente. **Primeiro, materializar menos dados:** checkout raso e esparso por área. A evidência E4 compara baseline e configuração otimizada no mesmo commit, mantendo três amostras por modo. **Segundo, integrar incrementos pequenos:** trunk-based, branch de até dois dias úteis e revisão diária. E1 acompanhará inatividade de branches, conflitos e lead time real. **Terceiro, revisar conforme responsabilidade:** CODEOWNERS, proteção da main, testes e revisão humana de PRs de agentes, com atenção a prompts e workflows. O mapeamento por caminho é uma aproximação operacional; não reproduz a revisão semântica do Antique.

O protótipo deste repositório permite verificar a técnica, mas é pequeno e recente. Portanto, não demonstra a redução do lead time de onze para dois dias nem reproduz o monorepo industrial. Diferenças curtas de checkout podem ser dominadas por inicialização, rede e variabilidade dos runners. Cache de dependências não foi ativado porque o projeto não usa dependências externas; adicionar cache sem conteúdo reutilizável só acrescentaria custo.

A fila de merge fica pendente: segundo a documentação oficial do GitHub, ela depende de repositório pertencente a organização. O workflow já aceita `merge_group`. Enquanto o repositório for pessoal, aprovação humana, branch atualizada e CI continuam necessários; não se deve declarar que uma fila inexistente foi ativada. O PR de implementação permanece aberto até revisão humana de outra conta habilitada. A política não será burlada para produzir uma aparência de entrega completa.

**Fontes primárias consultadas em 21/10/2026:**

- Anthropic, [Redesigning source control at Anthropic](https://www.anthropic.com/research/redesigning-source-control), publicado em 13/10/2026, atualizado em 15/10/2026.
- GitHub Docs, [Managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue).
- GitHub Docs, [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).
- [actions/checkout](https://github.com/actions/checkout), opções de profundidade e sparse-checkout.
