import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Table, Button } from 'reactstrap';

import { history } from 'store';
import { actions } from 'modules/app.js';
import * as api from 'utils/api';

import Layout from 'screens/app/Layout';

class RequestTable extends Component {
  componentDidMount() {
    const { requestRequests } = this.props;
    requestRequests(api.url);
  }

  render() {
    const { requests } = this.props;
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
          <td>
            {dateFrom}
            {' - '}
            {dateUntil}
          </td>
          <td>{passengers}</td>
        </tr>
      );
    });

    return (
      <Layout>
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
      </Layout>
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
