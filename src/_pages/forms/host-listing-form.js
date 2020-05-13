import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import Base64Converter from '../../_components/imageconvert/base64-converter'
import PageHeader from '../../_components/pageHeader'
import RadioButton from './helper/radio-button'
import RadioButtonGroup from './helper/radio-group'
import MySelect from './helper/my-select'

const options = [
    { value: 'ubc', label: 'UBC' },
    { value: 'sfu', label: 'SFU' },
    { value: 'bcit', label: 'BCIT' },
    { value: 'douglas', label: 'Douglas' },
    { value: 'kwantlen', label: 'Kwantlen' },
];

class HostListingForm extends React.Component {

    constructor() {
        super()
        this.state = {
          files: []
        }
      }

    getFiles(files){
        this.setState({ files: files })
        this.values.images.push(files.base64)
    }

    render() {
        return (
        <div>
            <PageHeader
                icon={null}
                text='List A Room' >
            </PageHeader>
            <Formik
                initialValues={{ host: "",
                                 neighbourhood: "",
                                 house: "",
                                 roomType: "",
                                 washroomAvail: "",
                                 gendersAccepted: "",
                                 pets: false,
                                 startDate: "",
                                 endDate: "",
                                 nearestSchool: "",
                                 images: [] }}
                onSubmit={(values, { setSubmitting }) => {
/*                     // submitting event here.
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
                    host: Yup.string()
                        .matches(/([A-Za-z0-9.,]*)/, "Invalid character.[A-Za-z0-9,.]"),
                    neighbourhood: Yup.string()
                        .matches(/([A-Za-z0-9.,]*)/, "Invalid character.[A-Za-z0-9,.]"),
                    house: Yup.string()
                        .matches(/([A-Za-z0-9.,]*)/, "Invalid character.[A-Za-z0-9,.]"),
                    roomType: Yup.string()
                        .required("Required"),
                    washroomAvail: Yup.string()
                        .required("Required"),
                    gendersAccepted: Yup.string()
                        .required("Required"),
                    pets: Yup.string()
                        .required("Required."),
                    startDate: Yup.string()
                        .required("Required"),
                    endDate: Yup.string()
                        .required("Required"),
                    nearestSchool: Yup.string()
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
                                    <label htmlFor="host">Describe Yourself(The Host)</label>
                                    <input
                                        name="host"
                                        type="text"
                                        placeholder="Enter a description about yourself"
                                        value={values.host}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.host && touched.host && "error"} />
                                    {errors.host && touched.host && (
                                        <Label basic color='red' pointing>
                                            {errors.host}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="neighbourhood">Describe the Neighbourhood</label>
                                    <input
                                        name="neighbourhood"
                                        type="text"
                                        placeholder="Enter a description of the neighbourhood"
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
                                    <label htmlFor="house">Describe the House</label>
                                    <input
                                        name="house"
                                        type="text"
                                        placeholder="Enter a description of your house"
                                        value={values.house}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.house && touched.house && "error"}
                                    />
                                    {errors.house && touched.house && (
                                        <Label basic color='red' pointing>
                                            {errors.house}
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
                                        id="enSuite"
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
                                    <label htmlFor="washroomAvail">Type of Washroom Offered</label>
                                    <RadioButtonGroup
                                        id="washroomAvail"
                                        value={values.washroomAvail}
                                        touched={touched.washroomAvail}
                                    >
                                    <Field
                                        component={RadioButton}
                                        name="washroomAvail"
                                        id="shared"
                                        label="Shared"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="washroomAvail"
                                        id="private"
                                        label="Private"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="washroomAvail"
                                        id="enSuite"
                                        label="En Suite"
                                    />
                                    </RadioButtonGroup>
                                    {errors.washroomAvail && touched.washroomAvail && (
                                        <Label basic color='red' pointing>
                                            {errors.washroomAvail}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="gendersAccepted">Which Genders Are Accepted</label>
                                    <RadioButtonGroup
                                        id="gendersAccepted"
                                        value={values.gendersAccepted}
                                        touched={touched.gendersAccepted}
                                    >
                                    <Field
                                        component={RadioButton}
                                        name="gendersAccepted"
                                        id="male"
                                        label="Male"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="gendersAccepted"
                                        id="female"
                                        label="Female"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="gendersAccepted"
                                        id="Any"
                                        label="Any"
                                    />
                                    </RadioButtonGroup>
                                    {errors.gendersAccepted && touched.gendersAccepted && (
                                        <Label basic color='red' pointing>
                                            {errors.gendersAccepted}
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
                                        label="Yes"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="pets"
                                        id="no"
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
                                    <label htmlFor="startDate">Date Room Is Available</label><br />
                                    <input
                                        name="startDate"
                                        type="date"
                                        placeholder={(new Date()).toDateString()}
                                        value={values.startDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.startDate && touched.startDate && "error"}
                                    />
                                    {errors.startDate && touched.startDate && (
                                        <Label basic color='red' pointing>
                                            {errors.startDate}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="endDate">Date When Stay Ends</label><br />
                                    <input
                                        name="endDate"
                                        type="date"
                                        placeholder={(new Date()).toDateString()}
                                        value={values.endDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.endDate && touched.endDate && "error"}
                                    />
                                    {errors.endDate && touched.endDate && (
                                        <Label basic color='red' pointing>
                                            {errors.endDate}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="nearestSchool">What is the Nearest School</label>
                                    <input
                                        name="nearestSchool"
                                        type="text"
                                        placeholder="Enter the closest school and the ETA"
                                        value={values.nearestSchool}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.nearestSchool && touched.nearestSchool && "error"} />
                                    {errors.nearestSchool && touched.nearestSchool && (
                                        <Label basic color='red' pointing>
                                            {errors.nearestSchool}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="images">Attach Images Of The Room (Hold select while you choose all your images)</label>
                                    <Base64Converter
                                        multiple={ true }
                                        onDone={ this.getFiles.bind(this) }
                                        value={values.images} />
                                    <div id="imageContainer">
                                        { this.state.files.map((file,i) => {
                                        values.images.push(file.base64)
                                        return <img key={i} src={file.base64} style={{maxWidth: 250}}/>
                                    }) }
                                    <img src="" />
                                    </div>
                                    {errors.nearestSchool && touched.nearestSchool && (
                                        <Label basic color='red' pointing>
                                            {errors.nearestSchool}
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

export default HostListingForm;