import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Octicon, { Calendar } from '@githubprimer/octicons-react';
import {
  Col,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Tooltip
} from 'reactstrap';

const DatePicker = ({ startDate, endDate, isDatesValid, checkDates }) => (
  <>
    <Label for="from_until" sm={2} style={{ marginLeft: '2rem' }}>
      From / Until
    </Label>
    <Col sm={5}>
      <DateRangePicker
        containerStyles={{
          width: '100%'
        }}
        onApply={checkDates}
      >
        <InputGroup id="datepicker_group">
          <Input
            type="text"
            className={isDatesValid ? '' : 'is-invalid'}
            value={`${startDate} - ${endDate}`}
            onChange={() => {}}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <Octicon icon={Calendar} size="small" />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </DateRangePicker>
      <Tooltip
        target="datepicker_group"
        placement="right"
        hideArrow
        style={{ color: '#000', backgroundColor: '#f7dbbf' }}
        isOpen={!isDatesValid}
      >
        Select a range of 2, 5, or 21 days (start/end inclusive)!
      </Tooltip>
    </Col>
  </>
);

export default DatePicker;
