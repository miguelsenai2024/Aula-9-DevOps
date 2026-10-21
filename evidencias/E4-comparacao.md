# E4 — comparação real do checkout

Coleta em 2026-10-21T21:24:09.820Z. [Execução completa](https://github.com/miguelsenai2024/Aula-9-DevOps/actions/runs/39678058336). Seis jobs em ubuntu-latest, três por modo, no mesmo commit de teste de merge.

| Modo | Amostra | Checkout (ms) | Job (s) | Evidência |
|---|---:|---:|---:|---|
| baseline | 1 | 768 | 7 | [job](https://github.com/miguelsenai2024/Aula-9-DevOps/actions/runs/39678058336/job/119492991001) |
| baseline | 2 | 673 | 6 | [job](https://github.com/miguelsenai2024/Aula-9-DevOps/actions/runs/39678058336/job/119492991005) |
| baseline | 3 | 1731 | 7 | [job](https://github.com/miguelsenai2024/Aula-9-DevOps/actions/runs/39678058336/job/119492991030) |
| otimizado | 1 | 780 | 7 | [job](https://github.com/miguelsenai2024/Aula-9-DevOps/actions/runs/39678058336/job/119492991101) |
| otimizado | 2 | 809 | 6 | [job](https://github.com/miguelsenai2024/Aula-9-DevOps/actions/runs/39678058336/job/119492990669) |
| otimizado | 3 | 1256 | 8 | [job](https://github.com/miguelsenai2024/Aula-9-DevOps/actions/runs/39678058336/job/119492991016) |

Média do checkout: baseline **1057.33 ms**, otimizado **948.33 ms**. Redução da média: **10.31%**. Medianas: baseline **768 ms**, otimizado **809 ms**; a mediana otimizada foi mais lenta. Média da duração completa do job: baseline **6.67 s**, otimizado **7.00 s**.

A janela de checkout usa relógio do runner antes das etapas condicionais e depois da action; inclui overhead de transição entre etapas e não representa só transferência de rede. Duração de job usa started_at/completed_at da API, com resolução de segundos, incluindo preparação e pós-etapas. A carga útil interna também foi preservada nos artefatos. Não misturar essas métricas.

O repositório é pequeno, recém-criado e não representa o volume do cenário industrial. A dispersão das amostras e a divergência entre média e mediana não sustentam promessa de aceleração. O objetivo é demonstrar medição reproduzível de configuração completa (fetch-depth 0) contra rasa e esparsa (fetch-depth 1). São três execuções de job por configuração em uma execução de workflow, não três dias de operação.

O CI principal usa matriz por área, filtros internos de paths e gate sempre conclusivo, sem filtro global que deixe um check obrigatório pendente. A biblioteca compartilhada e os arquivos de build permanecem disponíveis. Não há cache de dependências porque não há dependências externas; a decisão está documentada em E6.
