import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import Base64Converter from '../../_components/imageconvert/base64-converter'
import PageHeader from '../../_components/pageHeader'
import RadioButton from './helper/radio-button'
import RadioButtonGroup from './helper/radio-group'
import MySelect from './helper/my-select'
import Search from '../../_components/map/search'
import auth from '../../_services/auth';
import * as routes from '../../_constants/routes';
import history from '../../history'

class HostListingForm extends React.Component {

    constructor() {
        super()
        this.state = {
            files: [],
            geoResult: null,
            currentUser: auth.currentUserValue,
        }
    }

    getFiles(files) {
        this.setState({ files: files })
    }

    render() {
        return (
            <div>
                <PageHeader
                    icon={null}
                    text='List A Room' >
                </PageHeader>
                <Formik
                    initialValues={{
                        userID: this.state.currentUser.userID,
                        isAvailable: true,
                        latitude: null,
                        longitude: null,
                        availableStartDate: "",
                        availableEndDate: "",
                        hostDescription: "",
                        propertyDescription: "",
                        neighbourhoodDescription: "",
                        roomType: "",
                        washroomType: "",
                        genderPreference: "",
                        pets: "",
                        wifiAndUtilitiesIncuded: "",
                        closestSchool: "",
                        unitNumber: "",
                        streetNumber: "",
                        street: "",
                        city: "",
                        province: "",
                        country: "",
                        propertyImageData: []
                    }}
                    onSubmit={(values, { setSubmitting }) => {

                        values.street = this.state.geoResult.place_name;
                        values.city = this.state.geoResult.context[2].text;
                        values.province = this.state.geoResult.context[3].text;
                        values.country = this.state.geoResult.context[4].text;
                        values.longitude = this.state.geoResult.center[0];
                        values.latitude = this.state.geoResult.center[1];
                        if (values.pets === "yes") {
                            values.pets = true;
                        }
                        else {
                            values.pets = false;
                        }
                        values.wifiAndUtilitiesIncuded = true;

                        fetch('https://10kftdb.azurewebsites.net/api/properties/create/', {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Success:', data);
                                history.push(routes.DASHBOARD)
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                        console.log(JSON.stringify(values));
                    }}
                    validationSchema={Yup.object().shape({
                        hostDescription: Yup.string()
                            .matches(/([A-Za-z0-9.,]*)/, "Invalid character.[A-Za-z0-9,.]"),
                        neighbourhoodDescription: Yup.string()
                            .matches(/([A-Za-z0-9.,]*)/, "Invalid character.[A-Za-z0-9,.]"),
                        propertyDescription: Yup.string()
                            .matches(/([A-Za-z0-9.,]*)/, "Invalid character.[A-Za-z0-9,.]"),
                        roomType: Yup.string()
                            .required("Required"),
                        washroomType: Yup.string()
                            .required("Required"),
                        genderPreference: Yup.string()
                            .required("Required"),
                        pets: Yup.string()
                            .required("Required."),
                        wifiAndUtilitiesIncuded: Yup.string()
                            .required("Required"),
                        availableStartDate: Yup.string()
                            .required("Required"),
                        availableEndDate: Yup.string()
                            .required("Required"),
                        closestSchool: Yup.string()
                            .required("Required.")
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
                                        <label htmlFor="hostDescription">Describe Yourself(The host)</label>
                                        <input
                                            name="hostDescription"
                                            type="text"
                                            placeholder="Enter a description about yourself"
                                            value={values.hostDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.hostDescription && touched.hostDescription && "error"} />
                                        {errors.hostDescription && touched.hostDescription && (
                                            <Label basic color='red' pointing>
                                                {errors.hostDescription}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="neighbourhoodDescription">Describe the Neighbourhood</label>
                                        <input
                                            name="neighbourhoodDescription"
                                            type="text"
                                            placeholder="Enter a description of the neighbourhood"
                                            value={values.neighbourhoodDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.neighbourhoodDescription && touched.neighbourhoodDescription && "error"}
                                        />
                                        {errors.lastName && touched.lastName && (
                                            <Label basic color='red' pointing>
                                                {errors.neighbourhoodDescription}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="propertyDescription">Describe the House</label>
                                        <input
                                            name="propertyDescription"
                                            type="text"
                                            placeholder="Enter a description of your house"
                                            value={values.propertyDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.propertyDescription && touched.propertyDescription && "error"}
                                        />
                                        {errors.propertyDescription && touched.propertyDescription && (
                                            <Label basic color='red' pointing>
                                                {errors.propertyDescription}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="street">Address</label>
                                        <Search handleOnSelect={(result) => {
                                            console.log('result', result)
                                            this.setState({ geoResult: result })
                                        }} />
                                        {this.state.geoResult &&
                                            <p><small>You selected: </small><br />{this.state.geoResult.place_name}</p>
                                        }
                                        {errors.street && touched.street && (
                                            <Label basic color='red' pointing>
                                                {errors.street}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="roomType">Choose a Room Type</label>
                                        <RadioButtonGroup
                                            id="roomType"
                                            value={values.roomType}
                                            touched={touched.roomType}
                                        >
                                            <Field
                                                component={RadioButton}
                                                name="roomType"
                                                id="single"
                                                label="Single Room"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="roomType"
                                                id="double"
                                                label="Double Room"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="roomType"
                                                id="studio"
                                                label="Suite"
                                            />
                                        </RadioButtonGroup>
                                        {errors.roomType && touched.roomType && (
                                            <Label basic color='red' pointing>
                                                {errors.roomType}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="washroomType">Type of Washroom Offered</label>
                                        <RadioButtonGroup
                                            id="washroomType"
                                            value={values.washroomAvail}
                                            touched={touched.washroomAvail}
                                        >
                                            <Field
                                                component={RadioButton}
                                                name="washroomType"
                                                id="shared"
                                                content="Shared"
                                                label="Shared"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="washroomType"
                                                id="private"
                                                content="Private"
                                                label="Private"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="washroomType"
                                                id="private ensuite"
                                                content="En Suite"
                                                label="En Suite"
                                            />
                                        </RadioButtonGroup>
                                        {errors.washroomType && touched.washroomType && (
                                            <Label basic color='red' pointing>
                                                {errors.washroomType}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="genderPreference">Which Genders Are Accepted</label>
                                        <RadioButtonGroup
                                            id="genderPreference"
                                            value={values.genderPreference}
                                            touched={touched.genderPreference}
                                        >
                                            <Field
                                                component={RadioButton}
                                                name="genderPreference"
                                                id="male"
                                                content="Male"
                                                label="Male"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="genderPreference"
                                                id="female"
                                                content="Female"
                                                label="Female"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="genderPreference"
                                                id="any"
                                                content="Any"
                                                label="Any"
                                            />
                                        </RadioButtonGroup>
                                        {errors.genderPreference && touched.genderPreference && (
                                            <Label basic color='red' pointing>
                                                {errors.genderPreference}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="pets">Do You Have Any Pets</label>
                                        <RadioButtonGroup
                                            id="pets"
                                            value={values.pets}
                                            touched={touched.pets}
                                        >
                                            <Field
                                                component={RadioButton}
                                                name="pets"
                                                id="yes"
                                                content={true}
                                                label="Yes"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="pets"
                                                id="no"
                                                content={false}
                                                label="No"
                                            />
                                        </RadioButtonGroup>
                                        {errors.pets && touched.pets && (
                                            <Label basic color='red' pointing>
                                                {errors.pets}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="wifiAndUtilitiesIncuded">Confirm Wifi and Utilities are Included (Mandatory)</label>
                                        <RadioButtonGroup
                                            id="wifiAndUtilitiesIncuded"
                                            value={values.wifiAndUtilitiesIncuded}
                                            touched={touched.wifiAndUtilitiesIncuded}
                                        >
                                            <Field
                                                component={RadioButton}
                                                name="wifiAndUtilitiesIncuded"
                                                id="yes"
                                                content={true}
                                                label="Yes"
                                            />{/* 
                                    <Field
                                        component={RadioButton}
                                        name="wifiAndUtilitiesIncuded"
                                        id="no"
                                        content={false}
                                        label="No"
                                    /> */}
                                        </RadioButtonGroup>
                                        {errors.pets && touched.pets && (
                                            <Label basic color='red' pointing>
                                                {errors.pets}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="availableStartDate">Date Room Is Available</label><br />
                                        <input
                                            name="availableStartDate"
                                            type="date"
                                            placeholder={(new Date()).toDateString()}
                                            value={values.availableStartDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.availabelStartDate && touched.availableStartDate && "error"}
                                        />
                                        {errors.availableStartDate && touched.availableStartDate && (
                                            <Label basic color='red' pointing>
                                                {errors.availableStartDate}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="availableEndDate">Date When Stay Ends</label><br />
                                        <input
                                            name="availableEndDate"
                                            type="date"
                                            placeholder={(new Date()).toDateString()}
                                            value={values.availableEndDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.availableEndDate && touched.availableEndDate && "error"}
                                        />
                                        {errors.availableEndDate && touched.availableEndDate && (
                                            <Label basic color='red' pointing>
                                                {errors.availableEndDate}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="closestSchool">What is the Nearest School</label>
                                        <input
                                            name="closestSchool"
                                            type="text"
                                            placeholder="Enter the closest school and the ETA"
                                            value={values.closestSchool}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.closestSchool && touched.closestSchool && "error"} />
                                        {errors.closestSchool && touched.closestSchool && (
                                            <Label basic color='red' pointing>
                                                {errors.closestSchool}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="propertyImageData">Attach Images Of The Room (Hold Ctrl while you choose all your images)</label>
                                        <Base64Converter
                                            multiple={true}
                                            onDone={this.getFiles.bind(this)}
                                            value={values.propertyImageData} />
                                        <div id="imageContainer">
                                            {this.state.files.map((file, i) => {
                                                values.propertyImageData.push(file.base64)
                                                return <img key={i} src={file.base64} style={{ maxWidth: 250 }} />
                                            })}
                                            <img src="" />
                                        </div>
                                        {errors.propertyImageData && touched.propertyImageData && (
                                            <Label basic color='red' pointing>
                                                {errors.propertyImageData}
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

export default HostListingForm;