import React from 'react'
import { Formik } from 'formik'
import { Field, Divider, Button, Label, Form, Grid, Card, Message, Icon } from 'semantic-ui-react'
import MySelect from './my.select'
import Search from './map/search'
import * as Yup from "yup"


const cityOptions = [
    { value: 'Vancouver', label: 'Vancouver' },
    { value: 'Richmond', label: 'Richmond' },
    { value: 'Surrey', label: 'Surrey' },
    { value: 'Burnaby', label: 'Burnaby' },
    { value: 'Coquitlam', label: 'Coquitlam' },
    { value: 'Port Moody', label: 'Port Moody' },
    { value: 'New Westminster', label: 'New Westminster' },
];

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'any', label: 'Any' }
];

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            geoResult: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(tar, val) {
        tar = val;
    }
    render() {
        return (
            <div className="Search">
                <Formik
                    initialValues={{
                        checkinDate: "",
                        checkoutDate: "",
                        city: "",
                        maxRent: "",
                        minRent: "",
                        gender: ""
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        this.props.onClickSearch(values, this.state.geoResult);
                        console.log(values)
                    }}
                    validationSchema={Yup.object().shape({
                        checkinDate: Yup.date()
                            .required("Required"),
                        checkoutDate: Yup.date()
                            .required("Required")
                            .when(
                                'checkinDate',
                                (checkinDate, schema) => (checkinDate && schema.min(checkinDate, 'Check-out date before Check-in date.'))),
                        city: Yup.string()
                            .required("Required"),
                        minRent: Yup.number()
                            .positive()
                            .required("Required"),
                        maxRent: Yup.number()
                            .required("Required")
                            .moreThan(Yup.ref('minRent'), 'Max Rent should be greater than min rent.'),
                        gender: Yup.string()
                            .required("Required")
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
                            <div className="d-flex justify-content-center">

                                <Form onSubmit={handleSubmit}>
                                    <Card className=" fluid segment px-3">

                                        <Card.Content>
                                            <Form.Group widths='equal'>
                                                <div className="checkinDate mx-2" style={{ minWidth: '170px' }}>
                                                    <label htmlFor="checkinDate">Checkin Date</label>
                                                    <Form.Input
                                                        name="checkinDate"
                                                        type="date"
                                                        placeholder="Checkin Date"
                                                        value={values.checkinDate}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.checkinDate && touched.checkinDate && (
                                                        <Label basic color='red' pointing>
                                                            {errors.checkinDate}
                                                        </Label>
                                                    )}
                                                </div>

                                                <div className="checkoutDate mx-2" style={{ minWidth: '170px' }}>
                                                    <label htmlFor="checkoutDate">Checkout Date</label>
                                                    <Form.Input
                                                        name="checkoutDate"
                                                        type="date"
                                                        placeholder="Checkout Date"
                                                        value={values.checkoutDate}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.checkoutDate && touched.checkoutDate && (
                                                        <Label basic color='red' pointing>
                                                            {errors.checkoutDate}
                                                        </Label>
                                                    )}
                                                </div>

                                                <div className="address mx-2">
                                                    <label htmlFor="address">Near</label>
                                                    <Search
                                                        handleOnSelect={(result) => {
                                                            console.log('result', result)
                                                            this.setState({ geoResult: result })
                                                            this.handleChange(values.address, this.state.geoResult);
                                                        }} />

                                                </div>


                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <div className="city mx-2" style={{ minWidth: '150px' }}>
                                                    <label htmlFor="city">City</label>
                                                    <MySelect
                                                        value={values.value}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                        error={errors.city}
                                                        touched={touched.city}
                                                        placeholder='Search City'
                                                        options={cityOptions}
                                                    />
                                                    {errors.city && touched.city && (
                                                        <Label basic color='red' pointing>
                                                            {errors.city}
                                                        </Label>
                                                    )}
                                                </div>

                                                <div className="minRent mx-2">
                                                    <label htmlFor="minRent">Min Rent</label>
                                                    <Form.Input
                                                        name="minRent"
                                                        type="text"
                                                        placeholder="Min Rent"
                                                        value={values.minRent}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.minRent && touched.minRent && (
                                                        <Label basic color='red' pointing>
                                                            {errors.minRent}
                                                        </Label>
                                                    )}
                                                </div>

                                                <div className="maxRent mx-2">
                                                    <label htmlFor="maxRent">Max Rent</label>
                                                    <Form.Input
                                                        name="maxRent"
                                                        type="text"
                                                        placeholder="Max Rent"
                                                        value={values.maxRent}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.maxRent && touched.maxRent && (
                                                        <Label basic color='red' pointing>
                                                            {errors.maxRent}
                                                        </Label>
                                                    )}
                                                </div>

                                                <div className="gender mx-2" style={{ minWidth: '150px' }}>
                                                    <label htmlFor="gender">Gender</label>
                                                    <MySelect
                                                        value={values.value}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                        error={errors.gender}
                                                        touched={touched.gender}
                                                        placeholder='Any'
                                                        options={genderOptions}
                                                    />
                                                    {errors.gender && touched.gender && (
                                                        <Label basic color='red' pointing>
                                                            {errors.gender}
                                                        </Label>
                                                    )}

                                                </div>
                                            </Form.Group>
                                        </Card.Content>
                                        <Card.Content extra>

                                            <Button type="submit" size='large' color='black' style={{ width: '100%' }}>
                                                <Icon name='search' />Search
                                            </Button>

                                            {/* <Button animated='vertical' type="submit" size='large' color='black' style={{ width: '100%' }}>
                                                <Button.Content hidden>Search</Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='search' />
                                                </Button.Content>
                                            </Button> */}
                                        </Card.Content>

                                    </Card>
                                </Form>

                            </div>
                        );
                    }}
                </Formik>
            </div >
        )
    }
}

export default SearchBar;