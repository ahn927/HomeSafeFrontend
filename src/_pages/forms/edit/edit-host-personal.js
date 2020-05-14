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
            address: "15908 Prospect Crescent, White Rock, British Columbia V4B 2A2, Canada",
            city: "White Rock",
            heardAbout: "Online"
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