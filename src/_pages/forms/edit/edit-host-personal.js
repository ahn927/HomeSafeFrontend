import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form, Dropdown } from 'semantic-ui-react'
import PageHeader from '../../../_components/pageHeader'
import Search from '../../../_components/map/search'
import RadioButton from '../helper/radio-button'
import RadioButtonGroup from '../helper/radio-group'
import auth from '../../../_services/auth';

class EditHostPersonal extends React.Component {

    state = {
        currentUser: auth.currentUserValue,
        data: {},
        geoResult: null,
        id: null
    };

    async componentDidMount() {
        this.state.id = this.state.currentUser.userID;
        const result = await fetch(`https://10kftdb.azurewebsites.net/api/Users/${this.state.id}`);
        const json = await result.json();
        this.setState({
            data: json
        });
        this.state.geoResult.place_name = this.state.data.userAddressStreet;
    }

    render() {
        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Edit A Host' >
                </PageHeader>
                <Formik
                    initialValues={{
                                     "credentialUserName": this.state.data.credentialUserName,
                                     "userPassword": this.state.data.userPassword,
                                     "userFirstName": this.state.data.userFirstName, 
                                     "userLastName": this.state.data.userLastName,
                                     "userPhoneNumber": this.state.data.userPhoneNumber,
                                     "userEmailAddress": this.state.data.userEmailAddress,
                                     "userAddressStreetNumber" : this.state.userAddressStreetNumber,	
                                     "userAddressStreet" : this.state.userAddressStreet,
                                     "userAddressUnitNumber" : this.state.userAddressUnitNumber,
                                     "userAddressCity" : this.state.userAddressCity,
                                     "userAddressProvince" : this.state.userAddressProvince,
                                     "userAddressCountry" : this.state.userAddressCountry,
                                     "howDidYouHearFromUs": this.state.howDidYouHearFromUs,
                                     "tenantDateOfBirth": this.state.tenantDateOfBirth,
                                     "tenantGender": this.state.tenantGender,
                                     "tenantNationality": this.state.tenantNationality,
                                     "tenantReasonForStay": this.state.tenantReasonForStay,
                                     "tenantIsAdmin": false,
                                     "tenantIsLandlord": true,
                                     "tenantIsTenant": false }}
                    onSubmit={(values, { setSubmitting }) => {

                        if(this.state.geoResult.text !== null) {
                            values.userAddressStreet = this.state.geoResult.place_name;
                            values.userAddressCity = this.state.geoResult.context[2].text;
                            values.userAddressProvince = this.state.geoResult.context[3].text;
                            values.userAddressCountry = this.state.geoResult.context[4].text;
                        }
                        fetch(`https://10kftdb.azurewebsites.net/api/Users/edit/${this.state.id}`, {
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
                                                content="Online"
                                                label="Online"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="heardAbout"
                                                id="wordOfMouth"
                                                content="Word Of Mouth"
                                                label="Word Of Mouth"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="heardAbout"
                                                id="facebook"
                                                content="Facebook"
                                                label="Facebook"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="heardAbout"
                                                id="instagram"
                                                content="Instagram"
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

export default EditHostPersonal;