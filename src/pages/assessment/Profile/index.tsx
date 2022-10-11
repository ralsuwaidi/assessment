import React, { Suspense } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// components
import PageTitle from '../../../components/PageTitle';
import Spinner from '../../../components/Spinner';

import OtherDetails from '../../other/Profile/OtherDetails';

// dummy data
import { userInfo, userPortfolio } from './data';
import UserDetails from './UserDetails';

interface HeaderType {
    username: string;
}

const Profile = () => {
    const { username } = useParams<{ username?: string }>();

    console.log(window.location.pathname.replace('/portfolio/', '').replace('/', ''))

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Pages', path: '/pages/profile' },
                    { label: 'Profile', path: '/pages/profile', active: true },
                ]}
                title={'Profile'}
            />

            <Row>
                <Col lg={4} xl={3}>
                    <UserDetails userPortfolio={userPortfolio} />
                </Col>

                <Col lg={8} xl={9}>
                    <OtherDetails />
                </Col>
            </Row>
        </>
    );
};

export default Profile;
