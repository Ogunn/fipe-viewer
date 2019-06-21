# Instruções de utilização da API de Consulta Tabela FIPE

URL base:

```
  http://fipeapi.appspot.com/api/1/[tipo]/[acao]/[parametros].json
```

O parametro `[tipo]` aceita três possíveis valores: carros, motos ou caminhoes.

O parametro `[acao]`está relacionado ao tipo de dados que você deseja obter.

1. Primeiro liste as marcas do tipo de veiculo que você deseja, através da ação marcas e sem nenhum parâmetro:

```
  GET: http://fipeapi.appspot.com/api/1/carros/marcas.json
```

Veja o resultado dessa consulta no arquivo ./marcas.json

2. Na sequencia você poderá obter a listagem de veículos de uma determinada marca, através da ação veiculos juntamente com o código (id) da marca desejada.
   Por exemplo a marca Fiat (21):

```js
// GET: http://fipeapi.appspot.com/api/1/carros/veiculos/21.json
`GET: http://fipeapi.appspot.com/api/1/carros/veiculos/${brandId}.json`;
```

Veja o resultado dessa consulta no arquivo ./fiat.json

3. Após escolher o veículo desejado é possível consultar os modelos e os anos disponíveis para uma futura consulta de preços. Através da ação veiculo (no singular) juntamente com o código da marca e o código (id) do veículo.
   Por exemplo Palio 1.0 ECONOMY Fire Flex 8V 4p:

```js
// GET: http://fipeapi.appspot.com/api/1/carros/veiculo/21/4828.json
`http://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${modelId}.json`;
```

Veja o resultado dessa consulta no arquivo ./palio.json

4. Por fim adicionando mais um parâmetro a ação veiculo será possível visualizar o preço corrente da Tabela FIPE para este veículo/modelo/ano. Continuando com o exemplo a cima para obter o valor de um veículo do ano 2013 a Gasolina utilizaremos o id 2013-1:

```js
// GET: http://fipeapi.appspot.com/api/1/carros/veiculo/21/4828/2013-1.json
`http://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${modelId}/${vehicleId}.json`;
```
