import React, { Component } from 'react';
import { Label, InputGroup, InputGroupAddon, InputGroupText, Input, Tooltip } from 'reactstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Octicon, { Calendar } from '@githubprimer/octicons-react';

export class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      startDate: '',
      endDate: '',
      status: '',
      tooltipOpen: false
    };
  }

  handleApply(ev, picker) {
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
        this.setState({
          status: 'is-invalid',
          tooltipOpen: true
        });
      } else {
        this.setState({
          status: '',
          tooltipOpen: false
        });
      }
    } else if (
      !allowedDurations.includes(
        Number(endDate.format('DD')) - Number(startDate.format('DD')) + startMonthDayCount + 1
      )
    ) {
      this.setState({
        status: 'is-invalid',
        tooltipOpen: true
      });
    } else {
      this.setState({
        status: '',
        tooltipOpen: false
      });
    }

    this.setState({
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    });
  }

  render() {
    const { startDate, endDate, status, tooltipOpen } = this.state;

    return (
      <>
        <Label for="from_until">From / Until</Label>
        <DateRangePicker
          containerStyles={{
            width: '100%'
          }}
          onApply={this.handleApply}
        >
          <InputGroup>
            <Input
              type="text"
              className={status}
              value={endDate && `${startDate} - ${endDate}`}
              onChange={() => {}}
              id="datepicker_input"
            />
            <InputGroupAddon addonType="prepend">
              <InputGroupText
                style={{
                  borderLeft: 'none',
                  borderTopRightRadius: '4px',
                  borderBottomRightRadius: '4px'
                }}
              >
                <Octicon icon={Calendar} size="small" />
              </InputGroupText>
            </InputGroupAddon>
            <Tooltip
              target="datepicker_input"
              placement="left"
              hideArrow
              style={{ color: '#000', backgroundColor: '#e9ecef' }}
              isOpen={tooltipOpen}
            >
              Select a range of 2, 5, or 21 days (start/end inclusive)!
            </Tooltip>
          </InputGroup>
        </DateRangePicker>
      </>
    );
  }
}

export default DatePicker;
