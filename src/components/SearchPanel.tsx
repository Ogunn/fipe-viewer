import * as React from 'react';

export interface IState {
  brandList: Array<IBrand>;
  selectedBrand: IBrand;
  modelList: Array<IModel>;
  selectedModel: IModel;
  vehicleList: Array<IVehicle>;
  selectedVehicle: IVehicle;
  selectedVehiclePerYear: IVehicle;
}

export interface IBrand {
  name: string;
  id: number;
}

export interface IModel {
  name: string;
  id: number;
}

export interface IVehicle {
  name: string;
  id: number;
  preco?: string;
  combustivel?: string;
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
      vehicleList: [],
      selectedVehicle: {
        name: '',
        id: 0
      },
      selectedVehiclePerYear: {
        name: '',
        id: 0
      }
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

  fetchVehicleList = (modelId: number): void => {
    const brandId = this.state.selectedBrand.id;

    if (brandId !== 0 && modelId !== 0) {
      fetch(
        `http://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${modelId}.json`
      )
        .then(response => response.json())
        .then(data => this.setState({ vehicleList: data }))
        .catch(erro => console.log(erro));
    }
  };

  fetchVehicle = (vehicleId: number): void => {
    const brandId = this.state.selectedBrand.id;
    const modelId = this.state.selectedModel.id;

    fetch(
      `http://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${modelId}/${vehicleId}.json`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ selectedVehiclePerYear: data });
        console.log(data);
      })
      .catch(erro => console.log(erro));
  };

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

  handleVehicleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const { vehicleList } = this.state;

    const selectedVehicleName: string = event.currentTarget.value;
    const selectedVehicleObject: IVehicle = vehicleList.filter(
      vehicle => vehicle.name === selectedVehicleName
    )[0];

    if (selectedVehicleObject) {
      if (selectedVehicleName !== this.state.selectedVehicle.name) {
        this.fetchVehicle(selectedVehicleObject.id);
      }
    }
  };

  render() {
    const {
      brandList,
      modelList,
      vehicleList,
      selectedVehiclePerYear
    } = this.state;

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
        <fieldset>
          <input list="vehicles" onChange={this.handleVehicleInputChange} />
          <datalist id="vehicles">
            {vehicleList.map(vehicle => (
              <option value={vehicle.name} key={vehicle.id} />
            ))}
          </datalist>
        </fieldset>

        <p>Ano do Veículo: {selectedVehiclePerYear.id}</p>
        <p>Nome do veículo: {selectedVehiclePerYear.name}</p>
        <p>Preço do veículo: {selectedVehiclePerYear.preco}</p>
        <p>Preço do veículo: {selectedVehiclePerYear.combustivel}</p>
      </form>
    );
  }
}
