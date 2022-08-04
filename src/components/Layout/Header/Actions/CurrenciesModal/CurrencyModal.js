import { Component } from "react";
import Modal from "../../../../Helpers/Modal/Modal";
import { fetchCurrencies } from "../../../../../services/products-service";
import { setSelectedCurrency } from "../../../../../redux/actions";
import { connect } from 'react-redux';
import caretIcon from '../../../../../icons/caret.svg';


class CurrenciesModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showCurrencyModal: false,
      currencies: null
    }

    this.toggleCurrencyModal = this.toggleCurrencyModal.bind(this);
  }

  async componentDidMount() {
    const currencies = await fetchCurrencies();
    this.setState({ ...this.state, currencies });
  }

  toggleCurrencyModal() {
    this.setState({ ...this.state, showCurrencyModal: !this.state.showCurrencyModal });
  }

  renderCurrencies() {
    return (<table className="currencies-list">
      <tbody>
        {this.state.currencies.map((c, index) =>
        (
          <tr key={index} onClick={() => {
            this.toggleCurrencyModal();
            this.props.setSelectedCurrency(index)
          }}>
            <td>{c.symbol}</td>
            <td>{c.label}</td>
          </tr>
        )
        )}
      </tbody>
    </table>)
  }

  render() {
    if (this.state.currencies === null) {
      return null;
    }

    const currencyModalBtn = (
      <div className="flex">
        <p className="currency-selector-symbol">{this.state.currencies !== null ? this.state.currencies[this.props.selectedCurrency].symbol : ''}</p>
        <img src={caretIcon} className={this.state.showCurrencyModal ? "currency-selector-caret-up" : "currency-selector-caret-down"} alt="Shopping cart"></img>
      </div>
    )

    return (
      <Modal button={currencyModalBtn} show={this.state.showCurrencyModal} toggle={this.toggleCurrencyModal}>
        {this.renderCurrencies()}
      </Modal>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    selectedCurrency: state.selectedCurrency
  };
}

const mapDispatchToProps = {
  setSelectedCurrency: setSelectedCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesModal);