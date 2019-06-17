import * as React from 'react';

export interface IState {
  brandList: Array<IBrand>;
  selectedBrand: IBrand;
}

export interface IBrand {
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

  fetchModelsList = (brandId: number): void => {}; // TODO

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

  render() {
    const { brandList } = this.state;

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
      </form>
    );
  }
}
