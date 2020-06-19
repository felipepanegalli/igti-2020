import React, { Component } from 'react';
import Bar from './components/Bar';
import InputText from './components/InputText';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      salary: 0,
      inssBase: 0,
      inssDesc: 0,
      irpfBase: 0,
      irpfDesc: 0,
      salaryFull: 0,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div>
          <h3 className="center">React Salário</h3>
        </div>

        <div className="row">
          <div className="col s12">
            <InputText
              labelFor="salary"
              label="Salário bruto:"
              editable={false}
              value={this.salary}
            />
          </div>

          <div className="col s12 m3">
            <InputText
              labelFor="inssBase"
              label="Base INSS:"
              editable={true}
              value={this.inssBase}
            />
          </div>

          <div className="col s12 m3">
            <InputText
              labelFor="inssDesc"
              label="Desconto INSS:"
              editable={true}
              value={this.inssDesc}
            />
          </div>

          <div className="col s12 m3">
            <InputText
              labelFor="irpfBase"
              label="Base IRPF:"
              editable={true}
              value={this.irpfBase}
            />
          </div>

          <div className="col s12 m3">
            <InputText
              labelFor="irpfDesc"
              label="Desconto IRPF:"
              editable={true}
              value={this.irpfDesc}
            />
          </div>

          <div className="col s12">
            <InputText
              labelFor="salaryFull"
              label="Salário Líquido:"
              editable={true}
              value={this.salaryFull}
            />
          </div>
          <div className="col s12">
            <div style={styles.joinBars}>
              <Bar value={10} color={'#e67e22'} />
              <Bar value={20} color={'#c0392b'} />
              <Bar value={70} color={'#16a085'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  joinBars: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
