import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form, Dropdown } from 'semantic-ui-react'
import PageHeader from '../../../_components/pageHeader'
import Search from '../../../_components/map/search'
import RadioButton from '../helper/radio-button'
import RadioButtonGroup from '../helper/radio-group'
import MySelect from '../helper/my-select'

const options = [
    { key: 'Vancouver', value: 'Vancouver', label: 'Vancouver' },
    { key: 'Richmond', value: 'Richmond', label: 'Richmond' },
    { key: 'Surrey', value: 'Surrey', label: 'Surrey' },
    { key: 'Burnaby', value: 'Burnaby', label: 'Burnaby' },
    { key: 'Coquitlam', value: 'Coquitlam', label: 'Coquitlam' },
    { key: 'Port Moody', value: 'Port Moody', label: 'Port Moody' },
    { key: 'New Westminster', value: 'New Westminster', label: 'New Westminster' },
];

class EditHostPersonal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            geoResult: null,
            firstName: "Greg",
            lastName: "Makasoff",
            phoneNumber: "0009991111",
            email: "g@g.g",
            address: "15908 Prospect Crescent",
            city: "White Rock",
            heardAbout: "online"
        }

        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(tar, val) {
        tar = val;
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
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        phoneNumber: this.state.phoneNumber,
                        email: this.state.email,
                        address: this.state.address,
                        city: this.state.city,
                        heardAbout: this.state.heardAbout,
                    }}
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
                                        {/* <input
                                            name="address"
                                            type="text"
                                            placeholder="Enter your address"
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.address && touched.address && "error"}
                                        /> */}
                                        <Search handleOnSelect={(result) => {
                                            console.log('result', result)

                                            this.setState({ geoResult: result })
                                            this.handleChange(values.address, this.state.geoResult);
                                            console.log('statet', result)
                                            console.log('address', values.address)
                                        }} />
                                        {this.state.geoResult &&
                                            <p><small>You selected: </small><br />{this.state.geoResult.place_name}</p>
                                        }
                                        {/* {errors.address && touched.address && (
                                            <Label basic color='red' pointing>
                                                {errors.address}
                                            </Label>
                                        )} */}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="city">City</label>
                                        {/**<MySelect
                                            value={values.city}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            error={errors.city}
                                            touched={touched.city}
                                        />
                                        <Dropdown
                                            placeholder='Select a City'
                                            fluid
                                            selection
                                            options={options}
                                            value={values.city}
                                        />*/}
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

export default EditHostPersonal;