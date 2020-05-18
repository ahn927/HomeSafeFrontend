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
        geoResult: {
            place_name: ""
        },
        id: this.props.match.params.propertyID
    }

    async componentDidMount() {
        console.log('id: ', this.state.id)
        const result = await fetch(`https://10kftdb.azurewebsites.net/api/users/${this.state.id}`);
        const json = await result.json();
        this.setState({
            data: json
        });
        console.log('data: ', this.props)
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
                    enableReinitialize
                    initialValues={{
                        "credentialUserName": this.state.data.credentialUserName,
                        "userPassword": this.state.data.userPassword,
                        "userFirstName": this.state.data.userFirstName,
                        "userLastName": this.state.data.userLastName,
                        "userPhoneNumber": this.state.data.userPhoneNumber,
                        "userEmailAddress": this.state.data.userEmailAddress,
                        "userAddressStreetNumber": this.state.data.userAddressStreetNumber,
                        "userAddressStreet": this.state.data.userAddressStreet,
                        "userAddressUnitNumber": this.state.data.userAddressUnitNumber,
                        "userAddressCity": this.state.data.userAddressCity,
                        "userAddressProvince": this.state.data.userAddressProvince,
                        "userAddressCountry": this.state.data.userAddressCountry,
                        "howDidYouHearFromUs": this.state.data.howDidYouHearFromUs,
                        "tenantDateOfBirth": this.state.data.tenantDateOfBirth,
                        "tenantGender": this.state.data.tenantGender,
                        "tenantNationality": this.state.data.tenantNationality,
                        "tenantReasonForStay": this.state.data.tenantReasonForStay,
                        "tenantIsAdmin": false,
                        "tenantIsLandlord": true,
                        "tenantIsTenant": false,
                        "isVerifiedByStaff": this.state.data.isVerifiedByStaff
                    }}
                    onSubmit={(values, { setSubmitting }) => {

                        if (this.state.geoResult.text !== null) {
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
                        userAddressStreet: Yup.string()
                            .required("Required")
                            .matches(/()/, "Must be a valid address."),
                        userAddressCity: Yup.string()
                            .required("Required"),
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
                                        <label htmlFor="userAddressStreet">Address</label>
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
                                                id="online"
                                                content="Online"
                                                label="Online"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="howDidYouHearFromUs"
                                                id="wordOfMouth"
                                                content="Word Of Mouth"
                                                label="Word Of Mouth"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="howDidYouHearFromUs"
                                                id="facebook"
                                                content="Facebook"
                                                label="Facebook"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="howDidYouHearFromUs"
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
                                    {auth.isAdmin &&
                                        <div>
                                            <label htmlFor="isVerifiedByStaff">Verified</label>
                                            <RadioButtonGroup
                                                id="isVerifiedByStaff"
                                                value={values.isVerifiedByStaff}
                                                touched={touched.isVerifiedByStaff}
                                            >
                                                <Field
                                                    component={RadioButton}
                                                    name="isVerifiedByStaff"
                                                    id="true"
                                                    content="true"
                                                    label="Verified"
                                                />
                                                <Field
                                                    component={RadioButton}
                                                    name="isVerifiedByStaff"
                                                    id="false"
                                                    content="false"
                                                    label="Not Verified"
                                                />
                                            </RadioButtonGroup>
                                            {errors.isVerifiedByStaff && touched.isVerifiedByStaff && (
                                                <Label basic color='red' pointing>
                                                    {errors.isVerifiedByStaff}
                                                </Label>
                                            )}
                                        </div>
                                    }
                                    <Divider />
                                    <Button type="submit" disabled={isSubmitting}>
                                        Submit
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