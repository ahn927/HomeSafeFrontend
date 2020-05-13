import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import Base64Converter from '../../../_components/imageconvert/base64-converter'
import PageHeader from '../../../_components/pageHeader'
import RadioButton from '../helper/radio-button'
import RadioButtonGroup from '../helper/radio-group'
import MySelect from '../helper/my-select'
import * as images from '../../../_constants/images'
import Search from '../../../_components/map/search'

class EditHostListing extends React.Component {

    state = {
        host: "This is a description of the host.",
        neighbourhood: "This is a description of the neighbourhood.",
        house: "This is a description of the house.",
        address: "15908 Prospect Crescent, White Rock, British Columbia V4B 2A2, Canada",
        roomType: "En Suite",
        washroomAvail: "En Suite",
        gendersAccepted: "Any",
        pets: false,
        startDate: "2020-03-14",
        endDate: "2020-04-26",
        nearestSchool: "The nearest school is BCIT. It is 8 mins walking distance.",
        images: [
            images.TEMPLATE_HOUSE1,
            images.TEMPLATE_HOUSE2,
            images.TEMPLATE_HOUSE3,
        ],
        files: []
    }

    componentDidMount() {
        // let { id } = useParams();
        this.getFiles.bind(this.state.images);

        this.setState({
            // userId: id,
            // user: tempData //TODO: Replace this line by fetch call to backend.
        });
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
                text='Edit A Room' >
            </PageHeader>
            <Formik
                initialValues={{ host: this.state.host,
                                 neighbourhood: this.state.neighbourhood,
                                 house: this.state.house,
                                 address: this.state.address,
                                 roomType: this.state.roomType,
                                 washroomAvail: this.state.washroomAvail,
                                 gendersAccepted: this.state.gendersAccepted,
                                 pets: this.state.pets,
                                 startDate: this.state.startDate,
                                 endDate: this.state.endDate,
                                 nearestSchool: this.state.nearestSchool,
                                 images: this.state.images }}
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
                                        content="Shared"
                                        label="Shared"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="washroomAvail"
                                        id="private"
                                        content="Private"
                                        label="Private"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="washroomAvail"
                                        id="enSuite"
                                        content="En Suite"
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
                                        content="Male"
                                        label="Male"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="gendersAccepted"
                                        id="female"
                                        content="Female"
                                        label="Female"
                                    />
                                    <Field
                                        component={RadioButton}
                                        name="gendersAccepted"
                                        id="Any"
                                        content="Any"
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

export default EditHostListing;