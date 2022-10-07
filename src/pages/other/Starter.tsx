import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MembersList from '../../components/MembersList';

// components
import PageTitle from '../../components/PageTitle';
import { pluralSkills } from '../apps/PluralSight/data';
import { topPerformers } from '../dashboard/Ecommerce/data';

const Starter = () => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Pages', path: '/pages/starter' },
                    { label: 'Starter', path: '/pages/starter', active: true },
                ]}
                title={'Skills Catalog'}
            />

            <Row>
                <Col lg={12}>
                    <MembersList title={'Skill List'} members={pluralSkills} />                
                </Col>
            </Row>
        </>
    );
};

export default Starter;
