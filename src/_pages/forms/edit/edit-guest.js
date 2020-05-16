import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import PageHeader from '../../../_components/pageHeader'
import RadioButton from '../helper/radio-button'
import RadioButtonGroup from '../helper/radio-group'
import MySelect from '../helper/my-select'
import auth from '../../../_services/auth';


class EditGuestForm extends React.Component {

    state = {
        currentUser: auth.currentUserValue,
        data: {},
        id: null
    };

    async componentDidMount() {
        // let { id } = useParams();
        this.state.id = this.state.currentUser.userID;
        const result = await fetch(`https://10kftdb.azurewebsites.net/api/Users/${this.state.id}`);
        const json = await result.json();
        this.setState({
            // userId: id,
            // user: tempData //TODO: Replace this line by fetch call to backend.
            data: json
        });
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Edit A Guest' >
                </PageHeader>
                <Formik
                    initialValues={{
                        "credentialUserName": this.state.data.credentialUserName,
                        "userPassword": this.state.data.userPassword,
                        "userFirstName": this.state.data.userFirstName,
                        "userLastName": this.state.data.userLastName,
                        "userPhoneNumber": this.state.data.userPhoneNumber,
                        "userEmailAddress": this.state.data.userEmailAddress,
                        "userAddressStreetNumber": this.state.userAddressStreetNumber,
                        "userAddressStreet": this.state.userAddressStreet,
                        "userAddressUnitNumber": this.state.userAddressUnitNumber,
                        "userAddressCity": this.state.userAddressCity,
                        "userAddressProvince": this.state.userAddressProvince,
                        "userAddressCountry": this.state.userAddressCountry,
                        "howDidYouHearFromUs": this.state.howDidYouHearFromUs,
                        "tenantDateOfBirth": this.state.tenantDateOfBirth,
                        "tenantGender": this.state.tenantGender,
                        "tenantNationality": this.state.tenantNationality,
                        "tenantReasonForStay": this.state.tenantReasonForStay,
                        "tenantIsAdmin": false,
                        "tenantIsLandlord": false,
                        "tenantIsTenant": true
                    }}
                    onSubmit={(values, { setSubmitting }) => {

                        fetch(`https://10kftdb.azurewebsites.net/api/Users/${this.state.id}`, {
                            method: 'PUT',
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
                        tenantDateOfBirth: Yup.string()
                            .required("Required"),
                        tenantGender: Yup.string()
                            .required("Required")
                            .matches(/([A-Za-z])/, "Must be a valid city"),
                        tenantNationality: Yup.string()
                            .required("Required")
                            .matches(/([A-Za-z])/, "Must be a valid country"),
                        tenantReasonForStay: Yup.string()
                            .required("Required")
                            .matches(/([A-Za-z0-9,.])/, "Invalid character.[A-Za-z0-9,.]"),
                        howDidYouHearFromUs: Yup.string()
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
                                                {errors.puserPhoneNumber}
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
                                        <label htmlFor="tenantDateOfBirth">Date Of Birth</label><br />
                                        <input
                                            name="tenantDateOfBirth"
                                            type="date"
                                            placeholder={(new Date()).toDateString()}
                                            value={values.tenantDateOfBirth}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.tenantDateOfBirth && touched.tenantDateOfBirth && "error"}
                                        />
                                        {errors.tenantDateOfBirth && touched.tenantDateOfBirth && (
                                            <Label basic color='red' pointing>
                                                {errors.tenantDateOfBirth}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="tenantGender">Gender</label>
                                        <RadioButtonGroup
                                            id="tenantGender"
                                            value={values.tenantGender}
                                            touched={touched.tenantGender}
                                        >
                                            <Field
                                                component={RadioButton}
                                                name="tenantGender"
                                                id="male"
                                                content="Male"
                                                label="Male"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="tenantGender"
                                                id="female"
                                                content="Female"
                                                label="Female"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="tenantGender"
                                                id="other"
                                                content="Other"
                                                label="Other"
                                            />
                                        </RadioButtonGroup>
                                        {errors.tenantGender && touched.tenantGender && (
                                            <Label basic color='red' pointing>
                                                {errors.tenantGender}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="tenantNationality">Nationality</label>
                                        <input
                                            name="tenantNationality"
                                            type="text"
                                            placeholder="Choose your country below"
                                            value={values.tenantNationality}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.tenantNationality && touched.tenantNationality && "error"}
                                        />
                                        <MySelect
                                            value={values.tenantNationality}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            error={errors.tenantNationality}
                                            touched={touched.tenantNationality}
                                        />
                                        {errors.tenantNationality && touched.tenantNationality && (
                                            <Label basic color='red' pointing>
                                                {errors.tenantNationality}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="tenantReasonForStay">Reason for Stay</label>
                                        <input
                                            name="tenantReasonForStay"
                                            type="text"
                                            placeholder="Enter the reason for your stay"
                                            value={values.tenantReasonForStay}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.tenantReasonForStay && touched.tenantReasonForStay && "error"}
                                        />
                                        {errors.tenantReasonForStay && touched.tenantReasonForStay && (
                                            <Label basic color='red' pointing>
                                                {errors.tenantReasonForStay}
                                            </Label>
                                        )}
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
                                            <Field
                                                component={RadioButton}
                                                name="howDidYouHearFromUs"
                                                id="school"
                                                content="School"
                                                label="Through my University/College"
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

export default EditGuestForm;