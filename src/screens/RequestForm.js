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
  InputGroupAddon,
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
        priceValue: 10,
        isPriceValid: true,
        currency: 'USD',
        isCurrencyListOpen: false
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
    const { priceValue, currency } = price;
    const { passengerCount } = passengers;
    const { startDate, endDate } = dates;

    const newRequest = {
      dateFrom: startDate,
      dateUntil: endDate,
      passengers: passengerCount,
      price: priceValue,
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
    const { priceValue, isPriceValid, currency, isCurrencyListOpen } = price;
    const { passengerCount, isPassengersValid } = passengers;
    const { startDate, endDate, isDatesValid } = dates;

    return (
      <>
        <h3 style={{ marginBottom: '2rem' }}>Create request</h3>
        <Form>
          <FormGroup row style={{ marginBottom: '5.5rem' }}>
            <Label for="price" sm={2} style={{ marginLeft: '2rem' }}>
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
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
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
          <FormGroup row>
            <Label for="passengers" sm={2} style={{ marginLeft: '2rem' }}>
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
