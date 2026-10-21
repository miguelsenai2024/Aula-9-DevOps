# E3 — estado verificado da proteção

Em 21/10/2026 a API e a interface do GitHub confirmaram a regra aplicada à main:

- PR obrigatório com uma aprovação e revisão de code owner quando houver mapeamento na branch base.
- Aprovações antigas descartadas após novos commits; aprovação do push mais recente por outra pessoa.
- Check `gate` obrigatório, branch atualizada e conversas resolvidas.
- Regra aplicada também aos administradores; force push e exclusão bloqueados.

O [JSON coletado](../evidencias/E3-protecao-main.json) e o [print real](../evidencias/E3-protecao-main.png) documentam a configuração. A captura não representa uma aprovação de PR.

O CODEOWNERS por pasta está no PR #1 e só passará a governar os PRs contra main quando esse arquivo for integrado à main. A conta do proprietário é um responsável real com escrita. Não foram inventados times de uma organização nem adicionados usuários sem autorização.

O proprietário indicou `oliveiramiguel1003-stack` para revisar, mas escolheu manter essa conta apenas com leitura. A tentativa de solicitação formal retornou HTTP 422: o GitHub aceita solicitações de revisão somente para colaboradores. Uma revisão pública de uma conta sem escrita não satisfaz a aprovação exigida pela proteção. Não foi enviado convite de colaboração nem feita alteração de permissões.

Não há merge queue ativa. A documentação oficial restringe o recurso a repositórios de organizações. Criar uma organização ou transferir este repositório seria uma decisão adicional do proprietário. O CI aceita merge_group para uso futuro; isso não ativa a fila por si só.

Por essas razões, E3 está parcialmente implementado. Não remover proteções nem forjar uma revisão para concluir a entrega.
