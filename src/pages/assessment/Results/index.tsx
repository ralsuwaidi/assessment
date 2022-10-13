import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import StatisticsWidget from '../../widgets/StatisticsWidget';

// components
import { ApexNonLinearChartData } from '../../charts/data';
import StatisticsWidget2 from '../../widgets/StatisticsWidget2';
import RadialBarChart from './GenderChart';

interface AnalyticsTypes {
    total_skill: number;
    total_profiles: number;
    quintile_levels: number[];
    repeat_num: number;
    local_num: number;
    total_males: number;
    total_local_males: number;
    total_female: number;
    total_local_female: number;
    total_lfj: number;
    local_lfj: number;
}



const Results = () => {
    const [results, setResults] = useState([])

    const [retakes, setRetakes] = useState(0)
    const [totalProfiles, setTotalProfiles] = useState(0)
    const [quintileLevels, setQuintileLevels] = useState([0, 0, 0, 0, 0])
    const [totalSkills, setTotalSkills] = useState(0)
    const [totalMale, setTotalMale] = useState(0)
    const [totalLocalMale, setTotalLocalMale] = useState(0)
    const [totalLocal, setTotalLocal] = useState(0)
    const [lfJobs, setlfJobs] = useState(0)
    const [llfj, setllfJobs] = useState(0)

    const maleRatio: ApexNonLinearChartData = {
        data: [totalMale],
    };

    const localMaleRatio: ApexNonLinearChartData = {
        data: [totalLocalMale],
    };


    React.useEffect(() => {
        const loadAsyncStuff = async () => {
            const response = await fetch("https://codershq.ae/api/assessment/analytics/")
            console.log(response.json().then(
                data => {
                    const analytics: AnalyticsTypes = data.data
                    setRetakes(analytics.repeat_num)
                    setQuintileLevels(analytics.quintile_levels)
                    setTotalProfiles(analytics.total_profiles)
                    setTotalSkills(analytics.total_skill)
                    setTotalLocal(analytics.total_local_males+analytics.total_local_female)
                    setlfJobs(analytics.total_lfj)
                    setllfJobs(analytics.local_lfj)


                    const all_users = analytics.total_profiles
                    setTotalMale(Math.trunc((analytics.total_males/all_users)*100))
                    const all_local = analytics.total_local_female + analytics.total_local_female
                    setTotalLocalMale(Math.trunc((analytics.total_local_males/all_local)*100))
                }
            ))
        }
        loadAsyncStuff()
    }, []);




    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Skills', path: '/skills/results' },
                    { label: 'Results', path: '/skills/results', active: true },
                ]}
                title={'Results'}
            />

            <Row>
                <Col sm={6} xl={3}>
                    <StatisticsWidget variant="info" title="Total Users" stats={totalProfiles.toString()} icon="users" />
                </Col>
                <Col sm={6} xl={3}>
                    <StatisticsWidget variant="info" title="Emirati Testers" stats={totalLocal.toString()} icon="user-plus" />
                </Col>
                <Col sm={6} xl={3}>
                    <StatisticsWidget variant="info" title="Total Tests Taken" stats={totalSkills.toString()} icon="feather" />
                </Col>
                <Col sm={6} xl={3}>
                    <StatisticsWidget variant="info" title="Retakes" stats={retakes.toString()} icon="repeat" />
                </Col>
                <Col sm={6} xl={3}>
                    <StatisticsWidget variant="primary" title="Total Looking For Jobs" stats={lfJobs.toString()} icon="clipboard" />
                </Col>
                <Col sm={6} xl={3}>
                    <StatisticsWidget variant="primary" title="Locals Looking For Jobs" stats={llfj.toString()} icon="clipboard" />
                </Col>
            </Row>


            <Row>
                <Col sm={6} xl={3}>
                    <StatisticsWidget2
                        variant="primary"
                        title="Novice"
                        stats={quintileLevels[0].toString()}
                        progress={(quintileLevels[0] / totalSkills) * 100}
                        description={Math.trunc((quintileLevels[0] / totalSkills) * 100).toString() + "% of total scores"}
                    />
                </Col>
                <Col sm={6} xl={3}>
                    <StatisticsWidget2
                        variant="primary"
                        title="Emerging Scores"
                        stats={quintileLevels[1].toString()}
                        progress={(quintileLevels[1] / totalSkills) * 100}
                        description={Math.trunc((quintileLevels[1] / totalSkills) * 100).toString() + "% of total scores"}
                    />
                </Col>
                <Col sm={6} xl={3}>
                    <StatisticsWidget2
                        variant="primary"
                        title="Average Scores"
                        stats={quintileLevels[2].toString()}
                        progress={(quintileLevels[2] / totalSkills) * 100}
                        description={Math.trunc((quintileLevels[2] / totalSkills) * 100).toString() + "% of total scores"}
                    />
                </Col>
                <Col sm={6} xl={3}>
                    <StatisticsWidget2
                        variant="primary"
                        title="Above Average Scores"
                        stats={quintileLevels[3].toString()}
                        progress={(quintileLevels[3] / totalSkills) * 100}
                        description={Math.trunc((quintileLevels[3] / totalSkills) * 100).toString() + "% of total scores"}
                    />
                </Col>
                <Col sm={6} xl={3}>
                    <StatisticsWidget2
                        variant="primary"
                        title="Expert Scores"
                        stats={quintileLevels[4].toString()}
                        progress={(quintileLevels[4] / totalSkills) * 100}
                        description={Math.trunc((quintileLevels[4] / totalSkills) * 100).toString() + "% of total scores"}
                    />
                </Col>
            </Row>

            <Row>
                <Col xxl={4} md={6}>
                    <RadialBarChart radarChartData={maleRatio} title="Male / Female Ratio" />
                </Col>
                <Col xxl={4} md={6}>
                    <RadialBarChart radarChartData={localMaleRatio} title="Local Male / Local Female Ratio"  />
                </Col>
            </Row>

        </>
    );
};

export default Results;
