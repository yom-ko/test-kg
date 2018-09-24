import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Table, UncontrolledTooltip, Button } from 'reactstrap';

import { history } from 'store';
import { actions } from 'modules/app';
import * as api from 'utils/api';
import { getDuration } from 'utils/helpers';

class RequestTable extends Component {
  constructor(props) {
    super(props);
    this.updateDuration = this.updateDuration.bind(this);
    this.removeDuration = this.removeDuration.bind(this);

    this.state = {
      currentDuration: ''
    };
  }

  componentDidMount() {
    const { requests, requestRequests } = this.props;
    const isRequestsEmpty = Object.keys(requests).length === 0 && requests.constructor === Object;

    if (isRequestsEmpty) requestRequests(api.url);
  }

  updateDuration(id) {
    const { requests } = this.props;

    const requestUnderMouse = requests[id];
    const startDate = requestUnderMouse.date_from;
    const endDate = requestUnderMouse.date_until;

    const currentDuration = getDuration(startDate, endDate);

    this.setState({
      currentDuration
    });
  }

  removeDuration() {
    this.setState({
      currentDuration: ''
    });
  }

  render() {
    const { requests } = this.props;
    const { currentDuration } = this.state;
    const requestsAr = Object.entries(requests);

    const requestRows = requestsAr.map(request => {
      const {
        price,
        id,
        date_from: dateFrom,
        date_until: dateUntil,
        passengers,
        currency
      } = request[1];

      return (
        <tr key={id} style={{ textAlign: 'center' }}>
          <td>
            {price}
            {' '}
            {currency === 'USD' ? '$' : '€'}
          </td>
          <td>{id}</td>
          <td
            onMouseOver={() => this.updateDuration(id)}
            onFocus={() => this.updateDuration(id)}
            onMouseOut={this.removeDuration}
            onBlur={this.removeDuration}
          >
            <span id={`cell_${id}`}>
              {dateFrom}
              {' - '}
              {dateUntil}
            </span>
            <UncontrolledTooltip
              target={`cell_${id}`}
              placement="right"
              hideArrow
              style={{ color: '#000', backgroundColor: '#f7dbbf' }}
            >
              {!!currentDuration && `Duration: ${currentDuration} days` }
            </UncontrolledTooltip>
          </td>
          <td>{passengers}</td>
        </tr>
      );
    });

    return (
      <>
        <h3>Requests</h3>
        <Button
          style={{
            backgroundColor: '#58B957',
            borderColor: '#58B957',
            marginTop: '2.8rem',
            padding: '0.450rem 1.8rem'
          }}
          onClick={() => history.push('/form')}
        >
          Add new
        </Button>
        <Table borderless style={{ marginTop: '2.4rem' }}>
          <thead
            style={{
              backgroundColor: '#ccc',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            <tr>
              <th
                style={{
                  borderTopLeftRadius: '6px',
                  borderBottomLeftRadius: '6px'
                }}
              >
                Price
              </th>
              <th>Id</th>
              <th>From / Until</th>
              <th
                style={{
                  borderTopRightRadius: '6px',
                  borderBottomRightRadius: '6px'
                }}
              >
                Passengers
              </th>
            </tr>
          </thead>
          <tbody>{requestRows}</tbody>
        </Table>
      </>
    );
  }
}

// Map state and dispatch() to the component props
const mapStateToProps = ({ app }) => ({
  requests: app.requestsById
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestRequests: actions.requestRequests
  },
  dispatch
);

// Connect the container component to Redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestTable);
