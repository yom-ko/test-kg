import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {
  Col,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Tooltip
} from 'reactstrap';
import Octicon, { Calendar } from '@githubprimer/octicons-react';

const DatePicker = ({ startDate, endDate, status, tooltipOpen, handleApply }) => (
  <>
    <Label for="from_until" sm={2} style={{ marginLeft: '2rem' }}>
      From / Until
    </Label>
    <Col sm={5}>
      <DateRangePicker
        containerStyles={{
          width: '100%'
        }}
        onApply={handleApply}
      >
        <InputGroup id="datepicker_group">
          <Input
            type="text"
            className={status}
            value={endDate && `${startDate} - ${endDate}`}
            onChange={() => {}}
          />
          <InputGroupAddon addonType="prepend">
            <InputGroupText
              style={{
                borderLeft: 'none',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px'
              }}
            >
              <Octicon icon={Calendar} size="small" />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </DateRangePicker>
      <Tooltip
        target="datepicker_group"
        placement="right-end"
        hideArrow
        style={{ color: '#000', backgroundColor: '#e9ecef' }}
        isOpen={tooltipOpen}
      >
        Select a range of 2, 5, or 21 days (start/end inclusive)!
      </Tooltip>
    </Col>
  </>
);

export default DatePicker;
