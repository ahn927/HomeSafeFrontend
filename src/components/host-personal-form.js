import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import classNames from "classnames"

import auth from '../_services/auth'

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
                    // submitting event here.
                    auth.login(values.username, values.password)
                        .then(
                            user => {
                                this.props.history.push("/dashboard")
                            },
                            error => {
                                console.log(error)
                            }
                        )
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
                        .matches(/()/, "Phone number can be only numbers"),
                    email: Yup.string()
                        .required("Required")
                        .email(),
                    address: Yup.string()
                        .required("Required")
                        .matches(/()/, "Must be a valid address."),
                    city: Yup.string()
                        .required("Required")
                        .matches(/([A-Za-z])/,"Must be a valid city"),
                    heardAbout: Yup.string()
                        .required("Must state where you heard about this service."),
                    radioGroup: Yup.string().required("Must choose an option"),
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
                        handleSubmit
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
                                    <input
                                        name="city"
                                        type="text"
                                        placeholder="Enter your city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.city && touched.city && "error"}
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
                                    <input
                                        name="heardAbout"
                                        type="text"
                                        placeholder="Enter how you heard of us"
                                        value={values.heardAbout}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.heardAbout && touched.heardAbout && "error"}
                                    />
                                    {errors.heardAbout && touched.heardAbout && (
                                        <Label basic color='red' pointing>
                                            {errors.heardAbout}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                <label htmlFor="heardAbout">How Did You Hear Of Us</label>
                                <RadioButtonGroup
                                  id="radioGroup"
                                  value={values.radioGroup}
                                  touched={touched.radioGroup}
                                >
                                  <Field
                                    component={RadioButton}
                                    name="radioGroup"
                                    id="online"
                                    label="Online"
                                  />
                                  <Field
                                    component={RadioButton}
                                    name="radioGroup"
                                    id="wordOfMouth"
                                    label="Word Of Mouth"
                                  />
                                  <Field
                                    component={RadioButton}
                                    name="radioGroup"
                                    id="facebook"
                                    label="Facebook"
                                  />
                                  <Field
                                    component={RadioButton}
                                    name="radioGroup"
                                    id="instagram"
                                    label="Instagram"
                                  />
                                  <Field
                                    component={RadioButton}
                                    name="radioGroup"
                                    id="school"
                                    label="Through my University/College"
                                  />
                                </RadioButtonGroup>
                                {errors.radioGroup && touched.radioGroup && (
                                    <Label basic color='red' pointing>
                                        {errors.radioGroup}
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