# Calculadora de IMC

Calculadora responsiva de índice de massa corporal para adultos, em português. Feita com HTML, CSS e JavaScript, sem dependências de produção ou etapa de build.

## Recursos

- Peso em quilogramas e altura em metros ou centímetros.
- Entrada decimal com vírgula ou ponto e conversão da altura ao trocar a unidade.
- Resultado, classificação e destaque da faixa correspondente na tabela.
- Validação dos campos, navegação por teclado e anúncio acessível do resultado.
- Cálculo no navegador, sem envio ou armazenamento das medidas.

## Executar localmente

Na pasta do repositório, com Python 3 instalado:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

No Windows, se o comando `python` não estiver disponível, use `py -m http.server 8000 --bind 127.0.0.1`.

Abra http://localhost:8000. Como o projeto usa módulos JavaScript, execute-o por um servidor HTTP em vez de abrir o HTML diretamente pelo explorador de arquivos.

## Testes

Com Node.js 20 ou superior:

```sh
npm test
```

Os testes cobrem a fórmula, entradas decimais, conversão de unidades, limites de classificação e entradas inválidas. Não é necessário executar `npm install`.

## Publicação

Os arquivos estáticos podem ser servidos pelo GitHub Pages ou por outro servidor web. Para GitHub Pages, em **Settings → Pages**, selecione **Deploy from a branch**, branch **main**, pasta **/(root)** e salve. A habilitação da hospedagem é uma etapa separada da criação do código.

Todos os caminhos dos arquivos são relativos, permitindo servir a calculadora tanto na raiz quanto em um caminho como `/teste/`.

## Fórmula e referência

`IMC = peso (kg) / altura (m)²`

As faixas seguem a [classificação de IMC do CDC para adultos a partir de 20 anos](https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html). A classificação usa o valor sem arredondamento; a interface mostra duas casas decimais. O IMC é um indicador de triagem, não um diagnóstico individual. Estas faixas não se aplicam a crianças e adolescentes e exigem interpretação específica na gestação.
