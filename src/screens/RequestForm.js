import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { history } from 'store';
import { actions } from 'modules/app.js';

const RequestForm = () => (
  <>
    <h3>Create request</h3>
    <Form>
      <FormGroup>
        <Label for="price">Price</Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <Input type="number" step="1" id="price" />
          <InputGroupAddon addonType="append">.00</InputGroupAddon>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label for="passengers">Passengers</Label>
        <Input type="number" step="1" id="passengers" />
      </FormGroup>
      <FormGroup>
        <Label for="from_until">From / Until</Label>
        <InputGroup>
          <Input type="datetime-local" id="from_until" />
          <InputGroupAddon addonType="append">
            {/* <FontAwesomeIcon icon="calendar-alt" size="2x" /> */}
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Form>
    <Button
      style={{
        backgroundColor: '#58B957',
        borderColor: '#58B957',
        padding: '0.450rem 1.8rem'
      }}
      onClick={() => history.push('/')}
    >
      Create
    </Button>
  </>
);

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
