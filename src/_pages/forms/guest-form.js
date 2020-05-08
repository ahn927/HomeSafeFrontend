import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import classNames from "classnames"
import DatePicker from "react-datepicker"
import Select from 'react-select'
 
import "react-datepicker/dist/react-datepicker.css"
import countries from "../../resources/countries.json"

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

class GuestForm extends React.Component {

    state = {
        startDate: new Date()
    };

    handleChange = date => {
        this.setState({
          startDate: date
        });
      };

    render() {
        return (
        <div>
            <h1>Guest Information</h1>
            <Formik
                initialValues={{ firstName: "",
                                 lastName: "",
                                 email: "",
                                 phoneNumber: "",  
                                 dateOfBirth: new Date(),                               
                                 gender: "",
                                 nationality: "",
                                 reasonForStay: "",
                                 heardAbout: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    // submitting event here.
/*                     auth.login(values.username, values.password)
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
                    email: Yup.string()
                        .required("Required")
                        .email(),
                    phoneNumber: Yup.string()
                        .required("Required")
                        .matches(/(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$)/, "Must be a valid phone number."),
                    gender: Yup.string()
                        .required("Required")
                        .matches(/([A-Za-z])/,"Must be a valid city"),
                    nationality: Yup.string()
                        .required("Required")
                        .matches(/([A-Za-z])/,"Must be a valid country"),
                    reasonForStay: Yup.string()
                        .required("Required")
                        .matches(/([A-Za-z0-9,.])/,"Invalid character.[A-Za-z0-9,.]"),
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
                                    <label htmlFor="dateOfBirth">Date Of Birth</label><br />
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        className={errors.dateOfBirth && touched.dateOfBirth && "error"}
                                    /><br />
                                    {errors.dateOfBirth && touched.dateOfBirth && (
                                        <Label basic color='red' pointing>
                                            {errors.dateOfBirth}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="gender">Gender</label>
                                    <RadioButtonGroup
                                        id="gender"
                                        value={values.gender}
                                        touched={touched.gender}
                                    >
                                    <Field
                                        component={RadioButton}
                                        name="gender"
                                        id="male"
                                        label="Male"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="gender"
                                        id="female"
                                        label="Female"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="gender"
                                        id="other"
                                        label="Other"
                                    />
                                    </RadioButtonGroup>
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
                                    <MySelect
                                        value={values.nationality}
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        error={errors.nationality}
                                        touched={touched.nationality}
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
                                    <Field
                                        component={RadioButton}
                                        name="heardAbout"
                                        id="school"
                                        label="Through my University/College"
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

export default GuestForm;