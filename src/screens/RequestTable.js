import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Table, UncontrolledTooltip, Button } from 'reactstrap';

import { actions } from 'modules/app';
import { getDuration } from 'utils/helpers';
import * as api from 'utils/api';

class RequestTable extends Component {
  constructor(props) {
    super(props);
    this.setDuration = this.setDuration.bind(this);
    this.removeDuration = this.removeDuration.bind(this);

    this.state = {
      currentDuration: ''
    };
  }

  // If there is no data in Redux Store to display so far,
  // fetch data from API to populate the Store.
  componentDidMount() {
    const { requests, requestRequests } = this.props;
    const isRequestsEmpty = Object.keys(requests).length === 0 && requests.constructor === Object;

    if (isRequestsEmpty) requestRequests(api.url);
  }

  // Calculate and capture the duration of the hovered date range
  setDuration(id) {
    const { requests } = this.props;

    const hoveredRequest = requests[id];
    const startDate = hoveredRequest.date_from;
    const endDate = hoveredRequest.date_until;

    this.setState({
      currentDuration: getDuration(startDate, endDate)
    });
  }

  // Clear the previously captured duration
  removeDuration() {
    this.setState({
      currentDuration: ''
    });
  }

  // Render view
  render() {
    const { history, requests } = this.props;
    const { currentDuration } = this.state;

    // Turn the object into an array
    const requestsAr = Object.entries(requests);

    // Prepare data rows for the table
    const requestRows = requestsAr.map(request => {
      // Get required data from the single request object
      const {
        id,
        date_from: dateFrom,
        date_until: dateUntil,
        passengers,
        price,
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
            onMouseOver={() => this.setDuration(id)}
            onFocus={() => this.setDuration(id)}
            onMouseOut={this.removeDuration}
            onBlur={this.removeDuration}
          >
            <span id={`span_${id}`}>
              {dateFrom}
              {' - '}
              {dateUntil}
            </span>
          </td>
          <UncontrolledTooltip
            target={`span_${id}`}
            placement="right"
            hideArrow
            style={{ color: '#000', backgroundColor: '#fff2b5' }}
          >
            {/* Dynamic tooltip text */}
            {currentDuration && `Duration: ${currentDuration} days`}
          </UncontrolledTooltip>
          <td>{passengers}</td>
        </tr>
      );
    });

    return (
      <>
        <h3>Requests</h3>
        <Button
          style={{
            backgroundColor: '#58b957',
            borderColor: '#58b957',
            marginTop: '2.8rem',
            marginBottom: '2.8rem',
            padding: '0.450rem 1.8rem'
          }}
          onClick={() => history.push('/form')}
        >
          Add new
        </Button>
        <Table borderless>
          <thead
            style={{
              backgroundColor: '#ccc',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: '1.2'
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
