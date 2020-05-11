import React from 'react'
import { Formik } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'

import auth from '../_services/auth'

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

class GuestForm extends React.Component {

    render() {
        return (
        <div>
            <h1>Host Personal Information</h1>
            <Formik
                initialValues={{ firstName: "",
                                 lastName: "",
                                 email: "",
                                 phoneNumber: "",  
                                 dateOfBirth: "",                               
                                 gender: "",
                                 nationality: "",
                                 reasonForStay: "",
                                 heardAbout: "" }}
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
                    email: Yup.string()
                        .required("Required")
                        .email(),
                    phoneNumber: Yup.string()
                        .required("Required")
                        .matches(/()/, "Phone number can be only numbers"),
                    dateOfBirth: Yup.string()
                        .required("Required")
                        .matches(/()/, "Must be a valid address."),
                    gender: Yup.string()
                        .required("Required")
                        .matches(/([A-Za-z])/,"Must be a valid city"),
                    nationality: Yup.string()
                        .required("Required")
                        .matches(/([A-Za-z])/,"Must be a valid country"),
                    reasonForStay: Yup.string()
                        .required("Required")
                        .matches(/([A-Za-z])/,"Must be a valid city"),
                    heardAbout: Yup.string()
                        .required("Must state where you heard about this service.")
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
                                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                                    <input
                                        name="dateOfBirth"
                                        type="text"
                                        placeholder="Enter your date of birth"
                                        value={values.dateOfBirth}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.dateOfBirth && touched.dateOfBirth && "error"}
                                    />
                                    {errors.dateOfBirth && touched.dateOfBirth && (
                                        <Label basic color='red' pointing>
                                            {errors.dateOfBirth}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="gender">Gender</label>
                                    <input
                                        name="gender"
                                        type="text"
                                        placeholder="Enter your gender"
                                        value={values.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.gender && touched.gender && "error"}
                                    />
                                    {errors.gender && touched.gender && (
                                        <Label basic color='red' pointing>
                                            {errors.gender}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="nationality">Nationality</label>
                                    <input
                                        name="nationality"
                                        type="text"
                                        placeholder="Enter your nationality"
                                        value={values.nationality}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.nationality && touched.nationality && "error"}
                                    />
                                    {errors.nationality && touched.nationality && (
                                        <Label basic color='red' pointing>
                                            {errors.nationality}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="reasonForStay">Reason for Stay</label>
                                    <input
                                        name="reasonForStay"
                                        type="text"
                                        placeholder="Enter the reason for your stay"
                                        value={values.reasonForStay}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.reasonForStay && touched.reasonForStay && "error"}
                                    />
                                    {errors.reasonForStay && touched.reasonForStay && (
                                        <Label basic color='red' pointing>
                                            {errors.reasonForStay}
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

export default GuestForm;