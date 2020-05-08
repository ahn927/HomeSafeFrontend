import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import classNames from "classnames"

import Select from 'react-select'

//import { RadioButton, RadioButtonGroup, MySelect } from '../_services/form-options';

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

// Radio input
const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
  }) => {
    return (
      <div>
        <input
          name={name}
          id={id}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          className={classNames("radio-button")}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };
  
  // Radio group
  const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children
  }) => {
    const classes = classNames(
      "input-field",
      {
        "is-success": value || (!error && touched), // handle prefilled or user-filled
        "is-error": !!error && touched
      },
      className
    );
  
    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {children}
          {touched && <InputFeedback error={error} />}
        </fieldset>
      </div>
    );
  };

  const options = [
    { value: 'Vancouver', label: 'Vancouver' },
    { value: 'Richmond', label: 'Richmond' },
    { value: 'Surrey', label: 'Surrey' },
    { value: 'Burnaby', label: 'Burnaby' },
    { value: 'Coquitlam', label: 'Coquitlam' },
    { value: 'Port Moody', label: 'Port Moody'},
    { value: 'New Westminster', label: 'New Westminster' },
  ];

  class MySelect extends React.Component {
    handleChange = value => {
      // this is going to call setFieldValue and manually update values.topcis
      this.props.onChange('city', value);
    };
  
    handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      this.props.onBlur('city', true);
    };
  
    render() {
      return (
        <div style={{ margin: '1rem 0' }}>
          <Select
            id="city"
            options={options}
            multi={false}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />
        </div>
      );
    }
  }

class HostPersonalForm extends React.Component {

    render() {
        return (
        <div>
            <h1>Host Personal Information</h1>
            <Formik
                initialValues={{ firstName: "",
                                 lastName: "",
                                 phoneNumber: "",
                                 email: "",
                                 address: "",
                                 city: "",
                                 heardAbout: "",
                                 radioGroup: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    /* // submitting event here.
                    auth.login(values.username, values.password)
                        .then(
                            user => {
                                this.props.history.push("/dashboard")
                            },
                            error => {
                                console.log(error)
                            }
                        ) */
                    console.log(JSON.stringify(values, null, 2));
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required("Required")
                        .matches(/([A-Za-z]*)/, "Name must be only letters."),
                    lastName: Yup.string()
                        .required("Required")
                        .matches(/([A-Za-z]*)/, "Name must be only letters."),
                    phoneNumber: Yup.string()
                        .required("Required")
                        .matches(/(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$)/, "Must be a valid phone number."),
                    email: Yup.string()
                        .required("Required")
                        .email(),
                    address: Yup.string()
                        .required("Required")
                        .matches(/()/, "Must be a valid address."),
                    city: Yup.string()
                        .required("Required"),
                    heardAbout: Yup.string()
                        .required("Must state where you heard about this service."),
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        setFieldTouched
                    } = props;
                    return (
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="Enter your first name"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.firstName && touched.firstName && "error"} />
                                    {errors.firstName && touched.firstName && (
                                        <Label basic color='red' pointing>
                                            {errors.firstName}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.lastName && touched.lastName && "error"}
                                    />
                                    {errors.lastName && touched.lastName && (
                                        <Label basic color='red' pointing>
                                            {errors.lastName}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="Enter your phone number"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.phoneNumber && touched.phoneNumber && "error"}
                                    />
                                    {errors.phoneNumber && touched.phoneNumber && (
                                        <Label basic color='red' pointing>
                                            {errors.phoneNumber}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        name="email"
                                        type="text"
                                        placeholder="Enter your email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.email && touched.email && "error"}
                                    />
                                    {errors.email && touched.email && (
                                        <Label basic color='red' pointing>
                                            {errors.email}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="address">Address</label>
                                    <input
                                        name="address"
                                        type="text"
                                        placeholder="Enter your address"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.address && touched.address && "error"}
                                    />
                                    {errors.address && touched.address && (
                                        <Label basic color='red' pointing>
                                            {errors.address}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="city">City</label>
                                    <MySelect
                                        value={values.city}
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        error={errors.city}
                                        touched={touched.city}
                                    />
                                    {errors.city && touched.city && (
                                        <Label basic color='red' pointing>
                                            {errors.city}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="heardAbout">How Did You Hear Of Us</label>
                                    <RadioButtonGroup
                                        id="heardAbout"
                                        value={values.heardAbout}
                                        touched={touched.heardAbout}
                                    >
                                    <Field
                                        component={RadioButton}
                                        name="heardAbout"
                                        id="online"
                                        label="Online"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="heardAbout"
                                        id="wordOfMouth"
                                        label="Word Of Mouth"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="heardAbout"
                                        id="facebook"
                                        label="Facebook"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="heardAbout"
                                        id="instagram"
                                        label="Instagram"
                                    />
                                    </RadioButtonGroup>
                                    {errors.heardAbout && touched.heardAbout && (
                                    <Label basic color='red' pointing>
                                        {errors.heardAbout}
                                    </Label>
                                    )}
                                </div>
                                <Divider />
                                <Button type="submit" disabled={isSubmitting}>
                                    Next
                                </Button>
                            </Form>
                        </div>
                        )
                    }}

                </Formik>
            </div>
        )
    }
}

export default HostPersonalForm;