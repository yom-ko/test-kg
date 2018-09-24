import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

import { history } from 'store';
import { actions } from 'modules/app';
import DatePicker from 'components/DatePicker';

export class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.checkDates = this.checkDates.bind(this);
    this.state = {
      dates: {
        startDate: '',
        endDate: '',
        isValid: false
      }
    };
  }

  checkDates(ev, picker) {
    const { startDate, endDate } = picker;
    const allowedDurations = [2, 5, 21];

    function IsLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    const months = {
      1: { name: 'Jan', dayCount: 31 },
      2: { name: 'Feb', dayCount: IsLeapYear(Number(startDate.format('YYYY'))) ? 29 : 28 },
      3: { name: 'Mar', dayCount: 31 },
      4: { name: 'Apr', dayCount: 30 },
      5: { name: 'May', dayCount: 31 },
      6: { name: 'Jun', dayCount: 30 },
      7: { name: 'Jul', dayCount: 31 },
      8: { name: 'Aug', dayCount: 31 },
      9: { name: 'Sep', dayCount: 30 },
      10: { name: 'Oct', dayCount: 31 },
      11: { name: 'Nov', dayCount: 30 },
      12: { name: 'Dec', dayCount: 31 }
    };

    const startMonthDayCount = months[Number(startDate.format('MM'))].dayCount;

    if (Number(endDate.format('MM')) === Number(startDate.format('MM'))) {
      if (
        !allowedDurations.includes(
          Number(endDate.format('DD')) - Number(startDate.format('DD')) + 1
        )
      ) {
        this.setState(state => ({
          ...state,
          dates: {
            ...state.dates,
            isValid: false
          }
        }));
      } else {
        this.setState(state => ({
          ...state,
          dates: {
            ...state.dates,
            isValid: true
          }
        }));
      }
    } else if (
      !allowedDurations.includes(
        Number(endDate.format('DD')) - Number(startDate.format('DD')) + startMonthDayCount + 1
      )
    ) {
      this.setState(state => ({
        ...state,
        dates: {
          ...state.dates,
          isValid: false
        }
      }));
    } else {
      this.setState(state => ({
        ...state,
        dates: {
          ...state.dates,
          isValid: true
        }
      }));
    }

    this.setState(state => ({
      ...state,
      dates: {
        ...state.dates,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD')
      }
    }));
  }

  render() {
    const { dates } = this.state;
    const { startDate, endDate, isValid } = dates;

    return (
      <>
        <h3 style={{ marginBottom: '2rem' }}>Create request</h3>
        <Form>
          <FormGroup row>
            <Label for="price" sm={2} style={{ marginLeft: '2rem' }}>
              Price
            </Label>
            <Col sm={5}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input type="number" step="1" id="price" />
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="passengers" sm={2} style={{ marginLeft: '2rem' }}>
              Passengers
            </Label>
            <Col sm={5}>
              <Input type="number" min="1" step="1" id="passengers" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <DatePicker
              checkDates={this.checkDates}
              startDate={startDate}
              endDate={endDate}
              isValid={isValid}
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
          onClick={() => history.push('/')}
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
