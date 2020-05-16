import React from 'react'
import Select from 'react-select'

class MySelect extends React.Component {
    handleChange = v => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange(this.props.fieldName, v.value);
        console.log(v)
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur(this.props.fieldName, true);
    };

    render() {
        return (
            <div style={{ margin: '0rem 0' }}>
                <Select
                    id={this.props.fieldName}
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