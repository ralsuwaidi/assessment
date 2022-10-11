import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import StatisticsWidget from '../../widgets/StatisticsWidget';

// components

const Results = () => {
    const COURSE_CATALOG = gql`
    query {
        skillAssessmentResults (first: 500) {
          nodes {
            id
            completedOn
            quintileLevel
            measurementType
            skillName
            createdOn
            startedOn
          }
        }
      }
  `;

    const { loading, error, data } = useQuery(COURSE_CATALOG);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Skills', path: '/skills/results' },
                    { label: 'Results', path: '/skills/results', active: true },
                ]}
                title={'Results'}
            />

            {data && 
                                <Row>
                                <Col sm={6} xl={3}>
                                <StatisticsWidget variant="info" title="Skill Assessments" stats={data.skillAssessmentResults.nodes.length} icon="feather" />
                                </Col>
                            </Row>
            }
        </>
    );
};

export default Results;
