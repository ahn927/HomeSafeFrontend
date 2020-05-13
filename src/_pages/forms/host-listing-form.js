import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import Select from 'react-select'
import Base64Converter from '../../_components/imageconvert/base64-converter'
import PageHeader from '../../_components/pageHeader'

import classNames from "classnames"

const InputFeedback = ({ error }) =>
    error ? <div className={classNames("input-feedback")}>{error}</div> : null;

// Radio input
const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div>
            <input
                name={name}
                id={id}
                type="radio"
                value={id} // could be something else for output?
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                className={classNames("radio-button")}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

// Radio group
const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children
}) => {
    const classes = classNames(
        "input-field",
        {
            "is-success": value || (!error && touched), // handle prefilled or user-filled
            "is-error": !!error && touched
        },
        className
    );

    return (
        <div className={classes}>
            <fieldset>
                <legend>{label}</legend>
                {children}
                {touched && <InputFeedback error={error} />}
            </fieldset>
        </div>
    );
};

const options = [
    { value: 'ubc', label: 'UBC' },
    { value: 'sfu', label: 'SFU' },
    { value: 'bcit', label: 'BCIT' },
    { value: 'douglas', label: 'Douglas' },
    { value: 'kwantlen', label: 'Kwantlen' },
];

class MySelect extends React.Component {
    handleChange = v => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange('nearestSchool', v.value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur('nearestSchool', true);
    };

    render() {
        return (
            <div style={{ margin: '1rem 0' }}>
                <Select
                    id="nearestSchool"
                    options={options}
                    multi={false}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                />
            </div>
        );
    }
}

class HostListingForm extends React.Component {

    constructor() {
        super()
        this.state = {
            files: []
        }
    }

    getFiles(files) {
        this.setState({ files: files })
        this.values.images.push(files.base64)
    }

    render() {
        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Add A Property' >
                </PageHeader>
                <Formik
                    initialValues={{
                        host: "",
                        neighbourhood: "",
                        house: "",
                        roomType: "",
                        washroomAvail: "",
                        gendersAccepted: "",
                        pets: false,
                        nearestSchool: "",
                        images: []
                    }}
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
                                                                                            component={RadioButton}
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
                                        <label htmlFor="nearestSchool">What is the Nearest School</label>
                                        <MySelect
                                            value={values.nearestSchool}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            error={errors.nearestSchool}
                                            touched={touched.nearestSchool}
                                        />
                                        {errors.nearestSchool && touched.nearestSchool && (
                                            <Label basic color='red' pointing>
                                                {errors.nearestSchool}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>
                                        <label htmlFor="images">Attach Images Of The Room</label>
                                        <Base64Converter
                                            multiple={true}
                                            onDone={this.getFiles.bind(this)}
                                            value={values.images} />
                                        <div id="imageContainer">
                                            {this.state.files.map((file, i) => {
                                                values.images.push(file.base64)
                                                return <img key={i} src={file.base64} style={{ maxWidth: 250 }} />
                                            })}
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