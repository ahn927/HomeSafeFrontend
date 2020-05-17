import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import Base64Converter from '../../../_components/imageconvert/base64-converter'
import PageHeader from '../../../_components/pageHeader'
import RadioButton from '../helper/radio-button'
import RadioButtonGroup from '../helper/radio-group'
import auth from '../../../_services/auth';
import Search from '../../../_components/map/search'

class EditHostListing extends React.Component {

    state = {
        files: [],
        geoResult: {
            place_name: ""
        },
        currentUser: auth.currentUserValue,
        data: {},
        id: null,
        startDate: null,
        endDate: null
    }

    async componentDidMount() {
        console.log('props: ', this.props)
        this.state.id = this.props.match.params.userID;
        console.log('id: ', this.state.id)
        const result = await fetch(`https://10kftdb.azurewebsites.net/api/properties/search/${this.state.id}`);
        const json = await result.json();
        this.getFiles.bind(this.state.images);
        this.state.geoResult.place_name = this.state.address;
        this.setState({
            data: json
        });
        console.log('data: ', this.state.data)
        this.state.geoResult.place_name = this.state.data.street;
        if (this.state.data.pets)
            this.state.data.pets = "yes";
        else
            this.state.data.pets = "no";
        if (this.state.data.wifiAndUtilitiesIncuded)
            this.state.data.wifiAndUtilitiesIncuded = "yes";
        
        this.setState({ startDate: this.state.data.availableStartDate.substring(0,10)})
        this.setState({ endDate: this.state.data.availableEndDate.substring(0,10)})
        this.getFiles(this.state.data.propertyImageData)
        
    }

    getFiles(files) {
        this.setState({ files: files })
    }

    render() {
        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Edit A Room' >
                </PageHeader>
                <Formik
                    enableReinitialize
                    initialValues={{
                        userID: this.state.currentUser.userID,
                        isAvailable: this.state.data.isAvailable,
                        latitude: this.state.data.latitude,
                        longitude: this.state.data.longitude,
                        availableStartDate: this.state.startDate,
                        availableEndDate: this.state.endDate,
                        hostDescription: this.state.data.hostDescription,
                        propertyDescription: this.state.data.propertyDescription,
                        neighbourhoodDescription: this.state.data.neighbourhoodDescription,
                        roomType: this.state.data.roomType,
                        washroomType: this.state.data.washroomType,
                        genderPreference: this.state.data.genderPreference,
                        pets: this.state.data.pets,
                        wifiAndUtilitiesIncuded: this.state.data.wifiAndUtilitiesIncuded,
                        closestSchool: this.state.data.closestSchool,
                        unitNumber: this.state.data.unitNumber,
                        streetNumber: this.state.data.streetNumber,
                        street: this.state.data.street,
                        city: this.state.data.city,
                        province: this.state.data.province,
                        country: this.state.data.country,
                        propertyImageData: this.state.data.propertyImageData
                    }}
                    onSubmit={(values, { setSubmitting }) => {

                        if (this.state.geoResult.text !== null) {
                            values.street = this.state.geoResult.place_name;
                            values.city = this.state.geoResult.context[2].text;
                            values.province = this.state.geoResult.context[3].text;
                            values.country = this.state.geoResult.context[4].text;
                        }
                        if (values.pets === "yes") {
                            values.pets = true;
                        }
                        else {
                            values.pets = false;
                        }
                        if (values.wifiAndUtilitiesIncuded === "yes") {
                            values.wifiAndUtilitiesIncuded = true;
                        }
                        fetch(`https://10kftdb.azurewebsites.net/api/properties/edit/${this.state.id}`, {
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
                                        <label htmlFor="hostDescription">Describe Yourself(The Host)</label>
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
                                        {errors.neighbourhoodDescription && touched.neighbourhoodDescription && (
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
                                                content="Single Room"
                                                label="Single Room"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="roomType"
                                                id="double"
                                                content="Double Room"
                                                label="Double Room"
                                            />
                                            <Field
                                                component={RadioButton}
                                                name="roomType"
                                                id="enSuite"
                                                content="En Suite"
                                                label="En Suite"
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
                                            value={values.washroomType}
                                            touched={touched.washroomType}
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
                                                id="enSuite"
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
                                                id="Any"
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
                                        <label htmlFor="availableStartDate">Date Room Is Available</label><br />
                                        <input
                                            name="availableStartDate"
                                            type="date"
                                            placeholder={(new Date()).toDateString()}
                                            value={values.availableStartDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.availableStartDate && touched.availableStartDate && "error"}
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
                                        <label htmlFor="images">Attach Images Of The Room (Hold Ctrl while you choose all your images)</label>
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
                                        {errors.images && touched.images && (
                                            <Label basic color='red' pointing>
                                                {errors.images}
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

export default EditHostListing;