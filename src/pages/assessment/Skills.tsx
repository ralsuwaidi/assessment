import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import StatisticsWidget from "../widgets/StatisticsWidget";

const columns = [
    {
        Header: 'Name',
        accessor: 'name',
        sort: true,
    },
    {
        Header: 'Domain',
        accessor: 'domain',
        sort: true,
    },
    {
        Header: 'State',
        accessor: 'state',
        sort: false,
    },
    {
        Header: 'Updated on',
        accessor: 'updatedOn',
        sort: true,
    },
];

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    }
];

const Skills = () => {
    const COURSE_CATALOG = gql`
    query {
      skillAssessmentCatalog(first: 500) {
        nodes {
          id
          name
          imageUrl
          domain
          state
          updatedOn
        }
      }
    }
  `;

    const { loading, error, data } = useQuery(COURSE_CATALOG);


    if (loading) {
        return <div className=""></div>
    }
    else {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: "Pages", path: "/skills/catalogue" },
                        { label: "Skills", path: "/skills/catalogue", active: true },
                    ]}
                    title={"Skills Catalog"}
                />

                <Row>
                    <Col sm={6} xl={3}>
                    <StatisticsWidget variant="info" title="Skill Assessments" stats={data.skillAssessmentCatalog.nodes.length} icon="feather" />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <h4 className="header-title">Skills Catalog</h4>
                                <p className="text-muted fs-14 mb-4">Full skill assessment catalog</p>

                                <Table
                                    columns={columns}
                                    data={data.skillAssessmentCatalog.nodes}
                                    pageSize={10}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    isSearchable={true}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    };
}

export default Skills;
