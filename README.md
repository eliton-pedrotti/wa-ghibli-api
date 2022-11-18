## Requisitos

- Node.js v14.20

## Como executar localmente?

1. Basta rodar o comando abaixo, e entao as dependencias e o start da API iniciarão

```bash
npm run start
```

2. Para efetuar chamadas aos endpoints, basta importar a collection disponível na raiz do projeto.

3. Fluxo:

- Primeiramente é necessário sincronizar a base de dados com os dados da api Studios Ghibli, entao é preciso chamar o endpoint ``` POST /synchronize ```.
- Finalizado o passo acima, pode ser efetuado a chama ao endpoint ``` GET /films```, passando parametros de limit e offset ou não.
- Software utilizado para efetuar as chamadas [postman](https://www.postman.com/)
OBS: Não foi utilizado nenhuma lib externa, apenas o sqlite3, para fazer conexão com o nosso database.