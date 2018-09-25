import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Button
} from 'reactstrap';

import { history } from 'store';
import { actions } from 'modules/app';
import { getDuration } from 'utils/helpers';
import DatePicker from 'components/DatePicker';

export class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.checkAndSubmit = this.checkAndSubmit.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.checkPrice = this.checkPrice.bind(this);
    this.toggleCurrencyList = this.toggleCurrencyList.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.toggleDecimalList = this.toggleDecimalList.bind(this);
    this.changeDecimal = this.changeDecimal.bind(this);
    this.changePassengers = this.changePassengers.bind(this);
    this.checkPassengers = this.checkPassengers.bind(this);
    this.checkDates = this.checkDates.bind(this);

    // Prepare sensible defaults for the form's dates field
    this.today = new Date();
    this.tomorrow = new Date(this.today.getTime() + 24 * 60 * 60 * 1000);
    this.defaultStartDate = `${this.today.getFullYear()}-${`0${this.today.getMonth() + 1}`.slice(
      -2
    )}-${this.today.getDate()}`;
    this.defaultEndDate = `${this.tomorrow.getFullYear()}-${`0${this.tomorrow.getMonth()
      + 1}`.slice(-2)}-${this.tomorrow.getDate()}`;

    this.state = {
      price: {
        currency: 'USD',
        isCurrencyListOpen: false,
        priceValue: 10,
        isPriceValid: true,
        priceDecimal: '.00',
        isDecimalListOpen: false
      },
      passengers: {
        passengerCount: 1,
        isPassengersValid: true
      },
      dates: {
        startDate: this.defaultStartDate,
        endDate: this.defaultEndDate,
        isDatesValid: true
      }
    };
  }

  checkAndSubmit() {
    const { price, passengers, dates } = this.state;
    const { isPriceValid } = price;
    const { isPassengersValid } = passengers;
    const { isDatesValid } = dates;

    if (!isPriceValid || !isPassengersValid || !isDatesValid) {
      return;
    }

    const { addRequest } = this.props;
    const { priceValue, currency, priceDecimal } = price;
    const { passengerCount } = passengers;
    const { startDate, endDate } = dates;

    const totalPrice = priceValue + Number.parseFloat(priceDecimal);

    const newRequest = {
      dateFrom: startDate,
      dateUntil: endDate,
      passengers: passengerCount,
      price: totalPrice,
      currency
    };

    addRequest(newRequest);

    history.push('/');
  }

  changePrice(e) {
    const currentPrice = Number(e.target.value);

    this.setState(state => ({
      ...state,
      price: {
        ...state.price,
        priceValue: currentPrice
      }
    }));
  }

  checkPrice() {
    const { price } = this.state;
    const { priceValue } = price;

    if (typeof priceValue !== 'number' || priceValue < 10 || priceValue > 250) {
      this.setState(state => ({
        ...state,
        price: {
          ...state.price,
          isPriceValid: false
        }
      }));
    } else {
      this.setState(state => ({
        ...state,
        price: {
          ...state.price,
          isPriceValid: true
        }
      }));
    }
  }

  toggleCurrencyList() {
    this.setState(state => ({
      ...state,
      price: {
        ...state.price,
        isCurrencyListOpen: !state.price.isCurrencyListOpen
      }
    }));
  }

  changeCurrency(e) {
    const currentCurrency = String(e.target.value);

    this.setState(state => ({
      ...state,
      price: {
        ...state.price,
        currency: currentCurrency
      }
    }));
  }

  toggleDecimalList() {
    this.setState(state => ({
      ...state,
      price: {
        ...state.price,
        isDecimalListOpen: !state.price.isDecimalListOpen
      }
    }));
  }

  changeDecimal(e) {
    if (!e.target.className === 'dropdown-item') {
      return;
    }

    const currentDecimal = String(e.target.value);

    this.setState(state => ({
      ...state,
      price: {
        ...state.price,
        priceDecimal: currentDecimal
      }
    }));
  }

  changePassengers(e) {
    const currentCount = Number(e.target.value);

    this.setState(state => ({
      ...state,
      passengers: {
        ...state.passengers,
        passengerCount: currentCount
      }
    }));
  }

  checkPassengers() {
    const { passengers } = this.state;
    const { passengerCount } = passengers;

    if (typeof passengerCount !== 'number' || passengerCount < 1 || passengerCount > 9) {
      this.setState(state => ({
        ...state,
        passengers: {
          ...state.passengers,
          isPassengersValid: false
        }
      }));
    } else {
      this.setState(state => ({
        ...state,
        passengers: {
          ...state.passengers,
          isPassengersValid: true
        }
      }));
    }
  }

  checkDates(ev, picker) {
    const { startDate, endDate } = picker;
    const allowedDurations = [2, 5, 21];

    const startDateString = startDate.format('YYYY-MM-DD');
    const endDateString = endDate.format('YYYY-MM-DD');

    const duration = getDuration(startDateString, endDateString);

    if (allowedDurations.includes(duration)) {
      this.setState(state => ({
        ...state,
        dates: {
          ...state.dates,
          isDatesValid: true
        }
      }));
    } else {
      this.setState(state => ({
        ...state,
        dates: {
          ...state.dates,
          isDatesValid: false
        }
      }));
    }

    this.setState(state => ({
      ...state,
      dates: {
        ...state.dates,
        startDate: startDateString,
        endDate: endDateString
      }
    }));
  }

  render() {
    const { price, passengers, dates } = this.state;
    const {
      priceValue,
      isPriceValid,
      currency,
      isCurrencyListOpen,
      priceDecimal,
      isDecimalListOpen
    } = price;
    const { passengerCount, isPassengersValid } = passengers;
    const { startDate, endDate, isDatesValid } = dates;

    return (
      <>
        <h3 style={{ marginBottom: '2.5rem' }}>Create request</h3>
        <Form>
          <FormGroup row style={{ marginBottom: '2rem' }}>
            <Label for="price" sm={2} style={{ marginLeft: '2.5rem' }}>
              Price
            </Label>
            <Col sm={5}>
              <InputGroup id="price_group">
                <InputGroupButtonDropdown
                  addonType="prepend"
                  isOpen={isCurrencyListOpen}
                  toggle={this.toggleCurrencyList}
                >
                  <DropdownToggle
                    style={{ color: '#495057', backgroundColor: '#e9ecef', borderColor: '#ced4da' }}
                    caret
                  >
                    {currency === 'USD' ? '$' : '€'}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem value="USD" onClick={this.changeCurrency}>
                      $
                    </DropdownItem>
                    <DropdownItem value="EUR" onClick={this.changeCurrency}>
                      €
                    </DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
                {/* eslint-disable-next-line max-len */}
                {/* It would make sense to set hard limits on the min/max values with corresponding input attributes, but I omit them in favour of manual checks as per the spec. */}
                <Input
                  type="number"
                  step="1"
                  id="price"
                  className={isPriceValid ? '' : 'is-invalid'}
                  value={priceValue}
                  onChange={this.changePrice}
                  onMouseLeave={this.checkPrice}
                />
                <InputGroupButtonDropdown
                  addonType="append"
                  isOpen={isDecimalListOpen}
                  toggle={this.toggleDecimalList}
                >
                  <DropdownToggle
                    style={{ color: '#495057', backgroundColor: '#e9ecef', borderColor: '#ced4da' }}
                    caret
                  >
                    {priceDecimal}
                  </DropdownToggle>
                  <DropdownMenu style={{ minWidth: '1.5rem' }} onClick={this.changeDecimal}>
                    <DropdownItem value=".00">.00</DropdownItem>
                    <DropdownItem value=".10">.10</DropdownItem>
                    <DropdownItem value=".20">.20</DropdownItem>
                    <DropdownItem value=".30">.30</DropdownItem>
                    <DropdownItem value=".40">.40</DropdownItem>
                    <DropdownItem value=".50">.50</DropdownItem>
                    <DropdownItem value=".60">.60</DropdownItem>
                    <DropdownItem value=".70">.70</DropdownItem>
                    <DropdownItem value=".80">.80</DropdownItem>
                    <DropdownItem value=".90">.90</DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
              </InputGroup>
              <Tooltip
                target="price_group"
                placement="right"
                hideArrow
                style={{ color: '#000', backgroundColor: '#f7dbbf' }}
                isOpen={!isPriceValid}
              >
                Enter a number in the range from 10 to 250 !
              </Tooltip>
            </Col>
          </FormGroup>
          <FormGroup row style={{ marginBottom: '2rem' }}>
            <Label for="passengers" sm={2} style={{ marginLeft: '2.5rem' }}>
              Passengers
            </Label>
            <Col sm={5}>
              {/* eslint-disable-next-line max-len */}
              {/* It would make sense to set hard limits on the min/max values with corresponding input attributes, but I omit them in favour of manual checks as per the spec. */}
              <Input
                type="number"
                step="1"
                id="passengers"
                className={isPassengersValid ? '' : 'is-invalid'}
                value={passengerCount}
                onChange={this.changePassengers}
                onMouseLeave={this.checkPassengers}
              />
              <Tooltip
                target="passengers"
                placement="right"
                hideArrow
                style={{ color: '#000', backgroundColor: '#f7dbbf' }}
                isOpen={!isPassengersValid}
              >
                Enter a number in the range from 1 to 9 !
              </Tooltip>
            </Col>
          </FormGroup>
          <FormGroup row>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              isDatesValid={isDatesValid}
              checkDates={this.checkDates}
            />
          </FormGroup>
        </Form>
        <Button
          style={{
            backgroundColor: '#58B957',
            borderColor: '#58B957',
            padding: '0.450rem 1.8rem',
            margin: '2rem 0 0 auto',
            float: 'right'
          }}
          onClick={this.checkAndSubmit}
          disabled={!isPriceValid || !isPassengersValid || !isDatesValid}
        >
          Create
        </Button>
      </>
    );
  }
}

// Map state and dispatch() to the component props
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addRequest: actions.addRequest
  },
  dispatch
);

// Connect the container component to Redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestForm);
