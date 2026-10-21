# Aula 9 DevOps — Carparts

Laboratório didático de Git e GitHub, com implementação produzida com apoio de IA e evidências reais coletadas em 21/10/2026. O cenário industrial do enunciado não é apresentado como um sistema real operado por esta conta.

**[PR de entrega #1](https://github.com/miguelsenai2024/Aula-9-DevOps/pull/1)** — aguarda revisão humana. Os arquivos completos estão na branch `feat/entrega-carparts` até a aprovação e integração.

| Entregável | Implementação e evidências | Situação |
|---|---|---|
| E1 — Diagnóstico | [Coleta real](evidencias/E1-diagnostico.txt) | tamanho, branches e inatividade; histórico de equipe ainda inexistente |
| E2 — Estratégia | [CONTRIBUTING.md](CONTRIBUTING.md) | trunk-based, commits e regras de agentes |
| E3 — Proteção | [CODEOWNERS](.github/CODEOWNERS), [JSON da proteção](evidencias/E3-protecao-main.json), [print](evidencias/E3-protecao-main.png), [limitações](docs/E3-status.md) | main protegida; CODEOWNERS depende do merge; fila indisponível em conta pessoal |
| E4 — CI | [Workflow](.github/workflows/ci.yml), [benchmark](.github/workflows/benchmark.yml), [comparação](evidencias/E4-comparacao.md), [CSV](evidencias/E4-medicoes.csv) | CI aprovado e seis jobs medidos |
| E5 — Laboratório | [Log comentado real](evidencias/E5-laboratorio.txt), [reprodução](scripts/lab.mjs) | conflito/rebase, revert e bisect executados localmente |
| E6 — Parecer | [Análise com fontes primárias](docs/E6-parecer.md) | concluído |

## Verificação

Requer Node.js 22 ou mais recente e Git. Não há dependências externas a instalar.

```sh
npm run check
node scripts/lab.mjs
```

O laboratório cria um repositório novo em `work/git-lab`, ignorado pelo Git. Para repetir, passe outro diretório vazio. Não apaga laboratórios anteriores e não usa remotos.

**[CI aprovado](https://github.com/miguelsenai2024/Aula-9-DevOps/actions/runs/39678058227)** · **[Benchmark aprovado](https://github.com/miguelsenai2024/Aula-9-DevOps/actions/runs/39678058336)**

O benchmark compara três amostras de cada configuração no mesmo commit: média de 1.057,33 ms no baseline e 948,33 ms no checkout otimizado. A mediana otimizada piorou e o job completo não ficou mais rápido; os dados não sustentam ganho consistente neste repositório pequeno. Consulte o relatório para método e limites.

## Pendências que exigem ação humana

1. Aprovação do PR por outra conta com permissão apropriada. `oliveiramiguel1003-stack` permanece sem acesso de escrita por decisão do proprietário; o GitHub não aceitou solicitá-la formalmente como revisora por não ser colaboradora. Nenhuma aprovação foi simulada.
2. Merge queue: disponível em repositório de organização, não neste repositório pessoal. O gatilho `merge_group` está preparado, mas a fila não está ativa. Não houve transferência de propriedade.
3. Acompanhamento de duas semanas e evidências do monorepo real: branches antigas, conflitos entre pessoas e lead time antes/depois não podem ser medidos em um repositório criado hoje.

Nenhum push de implementação foi feito diretamente na main. O único commit inicial da main é o README criado pelo próprio GitHub no bootstrap. O histórico compartilhado foi preservado.
