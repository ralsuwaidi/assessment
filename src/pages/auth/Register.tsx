import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FeatherIcons from 'feather-icons-react';

//actions
import { resetAuth, signupUser } from '../../redux/actions';

import { RootState, AppDispatch } from '../../redux/store';

// components
import { VerticalForm, FormInput } from '../../components/';

import AuthLayout from './AuthLayout';

// images
import logoDark from '../../assets/images/logo-dark.png';
import logoLight from '../../assets/images/logo-light.png';

interface UserData {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                <p className="text-muted">
                    {t('Already have account?')}{' '}
                    <Link to={'/auth/login'} className="text-primary fw-bold ms-1">
                        {t('Login')}
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Register = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, userSignUp, error } = useSelector((state: RootState) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required('Please enter Username'),
            email: yup.string().required('Please enter Email address'),
            password1: yup.string().required('Please enter Password'),
            password2: yup
                .string()
                .oneOf([yup.ref('password1'), null], "Passwords don't match")
                .required('This value is required.'),
            checkbox: yup.bool().oneOf([true]),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        dispatch(signupUser(formData['username'], formData['email'], formData['password1'], formData['password2']));
    };

    return (
        <>
            {userSignUp ? <Redirect to={'/auth/confirm'}></Redirect> : null}

            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="auth-logo mx-auto">
                    <Link to="/" className="logo logo-dark text-center">
                        <span className="logo-lg">
                            <img src={logoDark} alt="" height="24" />
                        </span>
                    </Link>

                    <Link to="/" className="logo logo-light text-center">
                        <span className="logo-lg">
                            <img src={logoLight} alt="" height="24" />
                        </span>
                    </Link>
                </div>

                <h6 className="h5 mb-0 mt-3">{t('Create your account')}</h6>
                <p className="text-muted mt-1 mb-4">{t('Create a free account and start using Shreyu')}</p>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm<UserData>
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{}}
                    formClass="authentication-form">
                    <FormInput
                        label={t('Username')}
                        type="text"
                        name="username"
                        startIcon={<FeatherIcons icon={'user'} className="icon-dual" />}
                        placeholder={t('Your Username')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Email Address')}
                        type="email"
                        name="email"
                        startIcon={<FeatherIcons icon={'mail'} className="icon-dual" />}
                        placeholder={t('hello@coderthemes.com')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password1"
                        startIcon={<FeatherIcons icon={'lock'} className="icon-dual" />}
                        placeholder={t('Enter your Password')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password2"
                        startIcon={<FeatherIcons icon={'lock'} className="icon-dual" />}
                        placeholder={t('Confirm Password')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('I accept Terms and Conditions')}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-3'}
                        defaultChecked
                    />


                    <div className="mb-3 text-center d-grid">
                        <Button type="submit" disabled={loading}>
                            {t('Sign Up')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Register;
