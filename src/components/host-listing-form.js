import React from 'react'
import { Formik } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'

import auth from '../_services/auth'

class HostListingForm extends React.Component {

    render() {
        return (
        <div>
            <h1>Listing Information</h1>
            <Formik
                initialValues={{ host: "",
                                 neighbourhood: "",
                                 house: "",
                                 roomType: "",
                                 washroomAvail: "",
                                 gendersAccepted: "",
                                 pets: "",
                                 nearestSchool: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    // submitting event here.
                    auth.login(values.username, values.password)
                        .then(
                            user => {
                                this.props.history.push("/dashboard")
                            },
                            error => {
                                console.log(error)
                            }
                        )
                }}
                validationSchema={Yup.object().shape({
                    host: Yup.string()
                        .matches(/([A-Za-z0-9.,]*)/, "Invalid character."),
                    neighbourhood: Yup.string()
                        .matches(/([A-Za-z0-9.,]*)/, "Invalid character."),
                    house: Yup.string()
                        .matches(/([A-Za-z0-9.,]*)/, "Invalid character."),
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
                        handleSubmit
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
                                    <input
                                        name="roomType"
                                        type="text"
                                        placeholder="Enter the room type you are offering"
                                        value={values.roomType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.roomType && touched.roomType && "error"}
                                    />
                                    {errors.roomType && touched.roomType && (
                                        <Label basic color='red' pointing>
                                            {errors.roomType}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="washroomAvail">Type of Washroom Offered</label>
                                    <input
                                        name="washroomAvail"
                                        type="text"
                                        placeholder="Enter your availabe washroom"
                                        value={values.washroomAvail}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.washroomAvail && touched.washroomAvail && "error"}
                                    />
                                    {errors.washroomAvail && touched.washroomAvail && (
                                        <Label basic color='red' pointing>
                                            {errors.washroomAvail}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="gendersAccepted">Which Genders Are Accepted</label>
                                    <input
                                        name="gendersAccepted"
                                        type="text"
                                        placeholder="Enter the genders that are allowed"
                                        value={values.gendersAccepted}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.gendersAccepted && touched.gendersAccepted && "error"}
                                    />
                                    {errors.gendersAccepted && touched.gendersAccepted && (
                                        <Label basic color='red' pointing>
                                            {errors.gendersAccepted}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="pets">Do You Have Any Pets</label>
                                    <input
                                        name="pets"
                                        type="text"
                                        placeholder="Enter what pets you have, if any"
                                        value={values.pets}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.pets && touched.pets && "error"}
                                    />
                                    {errors.pets && touched.pets && (
                                        <Label basic color='red' pointing>
                                            {errors.pets}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>
                                    <label htmlFor="nearestSchool">What is the Nearest School</label>
                                    <input
                                        name="nearestSchool"
                                        type="text"
                                        placeholder="Enter the nearest school"
                                        value={values.nearestSchool}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.nearestSchool && touched.nearestSchool && "error"}
                                    />
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