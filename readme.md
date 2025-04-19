
<h1 style='color: #4da3ff; text-align: center; font-size: 3.5rem'>LogiSeq</h1>



Este projeto é uma aplicação web que calcula o próximo número em uma sequência numérica, utilizando um algoritmo de diferenças.

## Funcionalidades

- Insira uma sequência de números separados por vírgula
- O algoritmo calcula automaticamente o próximo número na sequência
- Suporte para tema claro e escuro (detecta automaticamente a preferência do sistema)
- Interface responsiva e amigável

## Como funciona

O algoritmo utiliza o método das diferenças sucessivas para identificar padrões na sequência numérica:

1. Calcula as diferenças entre números consecutivos
2. Continua calculando diferenças entre as diferenças até encontrar uma sequência constante
3. Usa essas diferenças para extrapolar o próximo valor na sequência original

## Tecnologias utilizadas

- Next.js
- React
- TypeScript
- CSS Modules

## Demonstração

![Demonstração da aplicação](.github/cap.png) 


## Acesse a aplicação

[![Clique aqui para acessar a aplicação](https://img.shields.io/badge/Acesse%20a%20aplicação-LogiSeq-4da3ff?style=for-the-badge&logo=vercel&logoColor=white)](https://logiseq.vercel.app)
## Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)