import * as React from 'react';

export interface IState {
  brandList: Array<IBrand>;
  selectedBrand: IBrand;
  modelList: Array<IModel>;
  selectedModel: IModel;
}

export interface IBrand {
  name: string;
  id: number;
}

export interface IModel {
  name: string;
  id: number;
}

export default class SearchPanel extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      brandList: [],
      selectedBrand: {
        name: '',
        id: 0
      },
      modelList: [],
      selectedModel: {
        name: '',
        id: 0
      },
    };
  }

  componentDidMount = () => {
    this.fetchCarBrandsList();
  };

  fetchCarBrandsList = (): void => {
    fetch('http://fipeapi.appspot.com/api/1/carros/marcas.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ brandList: data });
      })
      .catch(erro => console.log(erro));
  };

  fetchModelsList = (brandId: number): void => {
    if (brandId !== 0) {
      fetch(`http://fipeapi.appspot.com/api/1/carros/veiculos/${brandId}.json`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ modelList: data });
        })
        .catch(erro => console.log(erro));
    }
  };

  fetchVehicleList = (modelId: number): void => {};

  handleBrandsInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const { brandList } = this.state;

    const selectedBrandName: string = event.currentTarget.value;
    const selectedBrandObject: IBrand = brandList.filter(
      brand => brand.name === selectedBrandName
    )[0];

    if (selectedBrandObject) {
      if (selectedBrandName !== this.state.selectedBrand.name) {
        this.fetchModelsList(selectedBrandObject.id);
      }
      this.setState({
        selectedBrand: selectedBrandObject
      });
    }
  };

  handleModelInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { modelList } = this.state;

    const selectedModelName: string = event.currentTarget.value;
    const selectedModelObject: IModel = modelList.filter(
      carModel => carModel.name === selectedModelName
    )[0];

    if (selectedModelObject) {
      if (selectedModelName !== this.state.selectedModel.name) {
        this.fetchVehicleList(selectedModelObject.id);
      }
      this.setState({ selectedModel: selectedModelObject });
    }
  };

  render() {
    const { brandList } = this.state;
    const { modelList } = this.state;

    return (
      <form>
        <fieldset>
          <input list="carBrands" onChange={this.handleBrandsInputChange} />
          <datalist id="carBrands">
            {brandList.map(brand => (
              <option value={brand.name} key={brand.id} />
            ))}
          </datalist>
          <p>Marca selecionada: {this.state.selectedBrand.name}</p>
        </fieldset>
        <fieldset>
          <input list="carModels" onChange={this.handleModelInputChange} />
          <datalist id="carModels">
            {modelList.map(model => (
              <option value={model.name} key={model.id} />
            ))}
          </datalist>
        </fieldset>
      </form>
    );
  }
}
