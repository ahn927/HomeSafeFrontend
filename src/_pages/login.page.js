import React from 'react'
import { Formik } from 'formik'
import * as Yup from "yup"
import { Divider, Button, Label, Form } from 'semantic-ui-react'
import * as routes from '../_constants/routes'
import auth from '../_services/auth'

class LoginPage extends React.Component {

    render() {
        return (
            <div className="LoginPage">
                <h1>Login page</h1>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        // submitting event here.
                        auth.login(values.username, values.password)
                            .then(
                                user => {
                                    console.log(this.props.history)
                                    this.props.history.goBack().goBack()
                                    window.location.reload();
                                },
                                error => {
                                    console.log(error)
                                }
                            )
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string()
                            .required("Required"),
                        password: Yup.string()
                            .required("No password provided.")
                            .min(4, "Password is too short - should be 4 chars minimum.")
                            .matches(/(?=.*[0-9])/, "Password must contain a number.")
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
                                        <label htmlFor="username">User Name</label>
                                        <input
                                            name="username"
                                            type="text"
                                            placeholder="Enter your user name"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.username && touched.username && "error"} />
                                        {errors.username && touched.username && (
                                            <Label basic color='red' pointing>
                                                {errors.username}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <div>

                                        <label htmlFor="email">Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.password && touched.password && "error"}
                                        />
                                        {errors.password && touched.password && (
                                            <Label basic color='red' pointing>
                                                {errors.password}
                                            </Label>
                                        )}
                                    </div>
                                    <Divider />
                                    <Button type="submit" >
                                        Login
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

export default LoginPage;