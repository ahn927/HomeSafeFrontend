import React from 'react'
import Select from 'react-select'
import countries from "../../../resources/countries.json"

class MySelect extends React.Component {
    handleChange = v => {
      // this is going to call setFieldValue and manually update values.topcis
      this.props.onChange('nationality', v.value);
    };
  
    handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      this.props.onBlur('nationality', true);
    };
  
    render() {
      return (
        <div style={{ margin: '1rem 0' }}>
          <Select
            id="nationality"
            options={countries}
            multi={false}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />
        </div>
      );
    }
  }

export default MySelect;