import React from 'react'
import Select from 'react-select'

class MySelect extends React.Component {
    handleChange = v => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange('city', v.value);
        console.log(v)
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur('city', true);
    };

    render() {
        return (
            <div style={{ margin: '0rem 0' }}>
                <Select
                    id="city"
                    options={this.props.options}
                    multi={false}
                    onChange={this.handleChange}
                    value={this.props.value}
                    onBlur={this.handleBlur}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}

export default MySelect