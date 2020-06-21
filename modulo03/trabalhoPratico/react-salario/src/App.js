import React, { Component } from 'react';
import Bar from './components/Bar';
import InputText from './components/InputText';
import { calculateSalaryFrom } from './helpers/salary';
import { formatNumber, currencyFormat } from './helpers/formatHelpers';

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
      bar1: 0,
      bar2: 0,
      bar3: 0,
      porc1: 0,
      porc2: 0,
      porc3: 0,
    };
  }

  calcSalary = (value) => {
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(value);
    this.setState({
      salary: value,
      inssBase: baseINSS,
      inssDesc: discountINSS,
      irpfBase: baseIRPF,
      irpfDesc: discountIRPF,
      salaryFull: netSalary,
    });
  };

  updateBars = () => {
    const { salary, inssDesc, irpfDesc } = this.state;
    let b1 = (inssDesc * 100) / salary;
    let b2 = (irpfDesc * 100) / salary;
    let b3 = 100 - (b1 + b2);
    this.setState({
      bar1: b1,
      bar2: b2,
      bar3: b3,
      porc1: b1,
      porc2: b2,
      porc3: b3,
    });
    if (salary === '') {
      this.setState({
        bar1: 0,
        bar2: 0,
        bar3: 100,
        inssBase: 0,
      });
    }
  };

  async componentDidMount() {
    await this.calcSalary(1000);
    this.updateBars();
  }

  handleSalaryInputHandle = async (salary) => {
    await this.calcSalary(salary);
    this.updateBars();
  };

  render() {
    const {
      salary,
      inssBase,
      inssDesc,
      irpfBase,
      irpfDesc,
      salaryFull,
      bar1,
      bar2,
      bar3,
      porc1,
      porc2,
      porc3,
    } = this.state;

    const { joinBars, orangeColor, redColor, greenColor, bold } = styles;

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
              value={salary}
              onChange={this.handleSalaryInputHandle}
            />
          </div>

          <div className="col s12 m3">
            <InputText
              labelFor="inssBase"
              label="Base INSS:"
              editable={true}
              value={currencyFormat(inssBase)}
              style={bold}
            />
          </div>

          <div className="col s12 m3">
            <InputText
              labelFor="inssDesc"
              label="Desconto INSS:"
              editable={true}
              value={currencyFormat(inssDesc) + ` (${formatNumber(porc1)}%)`}
              style={{ ...orangeColor, ...bold }}
            />
          </div>

          <div className="col s12 m3">
            <InputText
              labelFor="irpfBase"
              label="Base IRPF:"
              editable={true}
              value={currencyFormat(irpfBase)}
              style={bold}
            />
          </div>

          <div className="col s12 m3">
            <InputText
              labelFor="irpfDesc"
              label="Desconto IRPF:"
              editable={true}
              value={currencyFormat(irpfDesc) + ` (${formatNumber(porc2)}%)`}
              style={{ ...redColor, ...bold }}
            />
          </div>

          <div className="col s12">
            <InputText
              labelFor="salaryFull"
              label="Salário Líquido:"
              editable={true}
              value={currencyFormat(salaryFull) + ` (${formatNumber(porc3)}%)`}
              style={{ ...greenColor, ...bold }}
            />
          </div>
          <div className="col s12">
            <div style={joinBars}>
              <Bar value={bar1} color={'#e67e22'} />
              <Bar value={bar2} color={'#c0392b'} />
              <Bar value={bar3} color={'#16a085'} />
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
  orangeColor: {
    color: '#e67e22',
  },
  redColor: {
    color: '#c0392b',
  },
  greenColor: {
    color: '#16a085',
  },
  bold: {
    fontWeight: 'bold',
  },
};
