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

``` js
  // GET: http://fipeapi.appspot.com/api/1/carros/veiculos/21.json
  `GET: http://fipeapi.appspot.com/api/1/carros/veiculos/${brandId}.json`
```

Veja o resultado dessa consulta no arquivo ./fiat.json

3. Após escolher o veículo desejado é possível consultar os modelos e os anos disponíveis para uma futura consulta de preços. Através da ação veiculo (no singular) juntamente com o código da marca e o código (id) do veículo.
   Por exemplo Palio 1.0 ECONOMY Fire Flex 8V 4p:

``` js
  // GET: http://fipeapi.appspot.com/api/1/carros/veiculo/21/4828.json
  `http://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${modelId}.json`
```

Veja o resultado dessa consulta no arquivo ./palio.json

4. Por fim adicionando mais um parâmetro a ação veiculo será possível visualizar o preço corrente da Tabela FIPE para este veículo/modelo/ano. Continuando com o exemplo a cima para obter o valor de um veículo do ano 2013 a Gasolina utilizaremos o id 2013-1:

``` js
  // GET: http://fipeapi.appspot.com/api/1/carros/veiculo/21/4828/2013-1.json
  `http://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${modelId}/${vehicleId}.json`
```

Veja o resultado dessa consulta no arquivo ./palio_2013.json

# Sequência do funcionamento do sistema (Descrição da experiência do usuário)

- 1° passo **DESENVOLVIDO**

1. Busca a lista atualizada das marcas. (Fetch) **DESENVOLVIDO**
2. Exibe a lista de marcas para o usuário. **DESENVOLVIDO**

- 2° passo

3. O usuário **SELECIONA UMA MARCA (Brand)** da lista que lhe foi exibida. (ação do usuário) **DESENVOLVIDO**
4. Busca a lista de veículos da marca (Brand) selecionada pelo usuário. (Fetch) **DESENVOLVIDO**
5. Exibe a lista de veículos da marca (Brand) selecionada pelo usuário. **DESENVOLVIDO**

- 3° passo

6. O usuário **SELECIONA UM MODELO** da lista que lhe foi exibida. (ação do usuário) **DESENVOLVIDO**
7. Busca uma lista dos carros (por ano) do modelo selecionado pelo usuário. (Fetch) _DESENVOLVENDO_
8. Exibi as informações sobre os carrros (por ano) do modelo selecionado pelo usuário.

- 4° passo

9. O usuário **SELECIONA UM ANO** do carro. (ação do usuário)
10. Busca informações sobre o modelo e o ano do carra selecionado pelo usuário.
11. Exibe as informações finais do carro para o usuário.

# README gerado pelo create-react-app

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
