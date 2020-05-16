import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form, Dropdown } from 'semantic-ui-react'
import PageHeader from '../../_components/pageHeader'
import Search from '../../_components/map/search'
import RadioButton from './helper/radio-button'
import RadioButtonGroup from './helper/radio-group'
import auth from '../../_services/auth';

class HostPersonalForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            geoResult: null,
            currentUser: auth.currentUserValue,
            userName: "",
            password: "",
            first: "",
            last: "",
            phone: "",
            email: "",
        }
    }

    render() {
        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Become A Host' >
                </PageHeader>
                <Formik
                    initialValues={{
                        "credentialUserName": this.state.userName,
                        "userPassword": this.state.password,
                        "userFirstName": this.state.first, 
                        "userLastName": this.state.last,
                        "userPhoneNumber": this.state.phone,
                        "userEmailAddress": this.state.email,
                        "userAddressStreetNumber" : "",	
                        "userAddressStreet" : "",
                        "userAddressUnitNumber" : "",
                        "userAddressCity" : "",
                        "userAddressProvince" : "",
                        "userAddressCountry" : "",
                        "howDidYouHearFromUs": "",
                        "tenantDateOfBirth": new Date(),
                        "tenantGender": "",
                        "tenantNationality": "",
                        "tenantReasonForStay": "",
                        "tenantIsAdmin": false,
                        "tenantIsLandlord": true,
                        "tenantIsTenant": false
                    }}
                    onSubmit={(values, { setSubmitting }) => {

                        values.userAddressStreet = this.state.geoResult.place_name;
                        values.userAddressCity = this.state.geoResult.context[2].text;
                        values.userAddressProvince = this.state.geoResult.context[3].text;
                        values.userAddressCountry = this.state.geoResult.context[4].text;
                        fetch('https://10kftdb.azurewebsites.net/api/Users/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values, null, 2),
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                        console.log(JSON.stringify(values, null, 2));
                    }}
                    validationSchema={Yup.object().shape({
                        credentialUserName: Yup.string()
                            .required("Required")
                            .min(4, "Minimum of 4 characters.")
                            .max(20, "Maximum of 20 characters."),
                        userPassword: Yup.string()
                            .required("Required")
                            .min(4, "Minimum of 4 characters.")
                            .max(20, "Maximum of 20 characters.")
                            .matches(/(?=.*[0-9])/, "Password must contain a number."),
                        userFirstName: Yup.string()
                            .required("Required")
                            .matches(/([A-Za-z]*)/, "Name must be only letters."),
                        userLastName: Yup.string()
                            .required("Required")
                            .matches(/([A-Za-z]*)/, "Name must be only letters."),
                        userPhoneNumber: Yup.string()
                            .required("Required")
                            .matches(/(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$)/, "Must be a valid phone number."),
                        userEmailAddress: Yup.string()
                            .required("Required")
                            .email(),
                        howDidYouHearFromUs: Yup.string()
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
                                        <label htmlFor="credentialUserName">User Name</label>
                                        <input
                                            name="credentialUserName"
                                            type="text"
                                            placeholder="Enter your first name"
                                            value={values.credentialUserName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.credentialUserName && touched.credentialUserName && "error"} />
                                        {errors.credentialUserName && touched.credentialUserName && (
                                            <Label basic color='red' pointing>
                                                {errors.credentialUserName}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="userPassword">Password</label>
                                        <input
                                            name="userPassword"
                                            type="text"
                                            placeholder="Enter your first name"
                                            value={values.userPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.userPassword && touched.userPassword && "error"} />
                                        {errors.userPassword && touched.userPassword && (
                                            <Label basic color='red' pointing>
                                                {errors.userPassword}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="userFirstName">First Name</label>
                                        <input
                                            name="userFirstName"
                                            type="text"
                                            placeholder="Enter your first name"
                                            value={values.userFirstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.userFirstName && touched.userFirstName && "error"} />
                                        {errors.userFirstName && touched.userFirstName && (
                                            <Label basic color='red' pointing>
                                                {errors.userFirstName}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="userLastName">Last Name</label>
                                        <input
                                            name="userLastName"
                                            type="text"
                                            placeholder="Enter your last name"
                                            value={values.userLastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.userLastName && touched.userLastName && "error"}
                                        />
                                        {errors.userLastName && touched.userLastName && (
                                            <Label basic color='red' pointing>
                                                {errors.userLastName}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="userPhoneNumber">Phone Number</label>
                                        <input
                                            name="userPhoneNumber"
                                            type="text"
                                            placeholder="Enter your phone number"
                                            value={values.userPhoneNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.userPhoneNumber && touched.userPhoneNumber && "error"}
                                        />
                                        {errors.userPhoneNumber && touched.userPhoneNumber && (
                                            <Label basic color='red' pointing>
                                                {errors.userPhoneNumber}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="userEmailAddress">Email</label>
                                        <input
                                            name="userEmailAddress"
                                            type="text"
                                            placeholder="Enter your email"
                                            value={values.userEmailAddress}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.userEmailAddress && touched.userEmailAddress && "error"}
                                        />
                                        {errors.userEmailAddress && touched.userEmailAddress && (
                                            <Label basic color='red' pointing>
                                                {errors.userEmailAddress}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <Search handleOnSelect={(result) => {
                                            console.log('result', result)
                                            this.setState({ geoResult: result })
                                        }} />
                                        {this.state.geoResult &&
                                            <p><small>You selected: </small><br />{this.state.geoResult.place_name}</p>
                                        }
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="howDidYouHearFromUs">How Did You Hear Of Us</label>
                                        <RadioButtonGroup
                                            id="howDidYouHearFromUs"
                                            value={values.howDidYouHearFromUs}
                                            touched={touched.howDidYouHearFromUs}
                                        >
                                            <Field
                                                component={RadioButton}
                                                name="howDidYouHearFromUs"
                                                id="Online"
                                                label="Online"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="howDidYouHearFromUs"
                                                id="Word Of Mouth"
                                                label="Word Of Mouth"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="howDidYouHearFromUs"
                                                id="Facebook"
                                                label="Facebook"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="howDidYouHearFromUs"
                                                id="Instagram"
                                                label="Instagram"
                                            />
                                        </RadioButtonGroup>
                                        {errors.howDidYouHearFromUs && touched.howDidYouHearFromUs && (
                                            <Label basic color='red' pointing>
                                                {errors.howDidYouHearFromUs}
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