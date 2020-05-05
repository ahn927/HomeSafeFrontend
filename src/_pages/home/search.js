import React from 'react'
import { Formik } from 'formik'
import { Divider, Button, Label, Form } from 'semantic-ui-react'


class Search extends React.Component {
    render() {
        return (
            <div className="Search">
                <Formik
                    initialValues={{
                        checkinDate: "",
                        checkoutDate: "",
                        school: "",
                        city: "",
                        maxRent: "",
                        minRent: "",
                        gender: ""
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        this.props.onClickSearch(values);
                        console.log(values)
                    }}
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
                                    <Form.Group widths='equal'>
                                        <div className="checkinDate">
                                            <label htmlFor="checkinDate">Checkin Date</label>
                                            <input
                                                name="checkinDate"
                                                type="text"
                                                placeholder="Checkin Date"
                                                value={values.checkinDate}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="checkoutDate">
                                            <label htmlFor="checkoutDate">Checkout Date</label>
                                            <input
                                                name="checkoutDate"
                                                type="text"
                                                placeholder="Checkout Date"
                                                value={values.checkoutDate}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="school">
                                            <label htmlFor="school">School</label>
                                            <input
                                                name="school"
                                                type="text"
                                                placeholder="School"
                                                value={values.school}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="city">
                                            <label htmlFor="city">City</label>
                                            <input
                                                name="city"
                                                type="text"
                                                placeholder="City"
                                                value={values.city}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group widths='equal'>


                                        <div className="maxRent">
                                            <label htmlFor="maxRent">Max Rent</label>
                                            <input
                                                name="maxRent"
                                                type="text"
                                                placeholder="Max Rent"
                                                value={values.maxRent}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="minRent">
                                            <label htmlFor="minRent">Min Rent</label>
                                            <input
                                                name="minRent"
                                                type="text"
                                                placeholder="Min Rent"
                                                value={values.minRent}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="gender">
                                            <label htmlFor="gender">Gender</label>
                                            <input
                                                name="gender"
                                                type="text"
                                                placeholder="Gender"
                                                value={values.gender}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Button type="submit">
                                        Search
                                    </Button>
                                </Form>
                            </div>
                        );
                    }}
                </Formik>
            </div>
        )
    }
}

export default Search;