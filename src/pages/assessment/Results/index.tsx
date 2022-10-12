import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import StatisticsWidget from '../../widgets/StatisticsWidget';

// components
import { ApexNonLinearChartData } from '../../charts/data';
import StatisticsWidget2 from '../../widgets/StatisticsWidget2';

const Results = () => {
    const [results, setResults] = useState([])
    const [noviceNum, setNoviceNum] = useState(0)
    const [emergingNum, setEmergingNum] = useState(0)
    const [averageNum, setAverageNum] = useState(0)
    const [aboveAverageNum, setAboveAverageNum] = useState(0)
    const [expertNum, setExpertNum] = useState(0)

    const multiRadarChartData: ApexNonLinearChartData = {
        data: [0, 0, 0, 0, 0],
    };
    const [chartData, setChartData] = useState(multiRadarChartData)

    const COURSE_CATALOG = gql`
    query {
        skillAssessmentResults (first: 500) {
          nodes {
            quintileLevel
          }
        }
      }
  `;

    const { loading: rLoading, error: rError, data: rData } = useQuery(COURSE_CATALOG);

    useEffect(() => {
        if (!rLoading) {
            if (!rError) {

                // 'novice', 'proficient-emerging', 'proficient-average', 'proficient-above-average', 'expert

                let novice = 0
                let proficientEmerging = 0
                let proficientAverage = 0
                let proficientAboveAverage = 0
                let expert = 0
                const data = rData.skillAssessmentResults.nodes
                setResults(data)
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if (element.quintileLevel == 'novice') novice++;
                    if (element.quintileLevel == 'proficient-emerging') proficientEmerging++;
                    if (element.quintileLevel == 'proficient-average') proficientAverage++;
                    if (element.quintileLevel == 'proficient-above-average') proficientAboveAverage++;
                    if (element.quintileLevel == 'expert') expert++;

                }
                setNoviceNum(novice)
                setEmergingNum(proficientEmerging)
                setAverageNum(proficientAverage)
                setAboveAverageNum(proficientAboveAverage)
                setExpertNum(expert)
                const multiRadarChartData: ApexNonLinearChartData = {
                    data: [novice, proficientEmerging, proficientAverage, proficientAboveAverage, expert],
                };
                setChartData(multiRadarChartData)
            }
        }
    }, [rData]);


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
                    <StatisticsWidget variant="info" title="Total Tests Taken" stats={results.length.toString()} icon="feather" />
                </Col>
            </Row>
                <Row>
                    <Col sm={6} xl={3}>
                        <StatisticsWidget2
                            variant="primary"
                            title="Novice"
                            stats={noviceNum.toString()}
                            progress={(noviceNum / results.length) * 100}
                            description={Math.trunc((noviceNum / results.length) * 100).toString() + "% of total scores"}
                        />
                    </Col>
                    <Col sm={6} xl={3}>
                        <StatisticsWidget2
                            variant="primary"
                            title="Emerging Scores"
                            stats={emergingNum.toString()}
                            progress={(emergingNum / results.length) * 100}
                            description={Math.trunc((emergingNum / results.length) * 100).toString() + "% of total scores"}
                        />
                    </Col>
                    <Col sm={6} xl={3}>
                        <StatisticsWidget2
                            variant="primary"
                            title="Average Scores"
                            stats={averageNum.toString()}
                            progress={(averageNum / results.length) * 100}
                            description={Math.trunc((averageNum / results.length) * 100).toString() + "% of total scores"}
                        />
                    </Col>
                    <Col sm={6} xl={3}>
                        <StatisticsWidget2
                            variant="primary"
                            title="Above Average Scores"
                            stats={aboveAverageNum.toString()}
                            progress={(aboveAverageNum / results.length) * 100}
                            description={Math.trunc((aboveAverageNum / results.length) * 100).toString() + "% of total scores"}
                        />
                    </Col>
                    <Col sm={6} xl={3}>
                        <StatisticsWidget2
                            variant="primary"
                            title="Expert Scores"
                            stats={expertNum.toString()}
                            progress={(expertNum / results.length) * 100}
                            description={Math.trunc((expertNum / results.length) * 100).toString() + "% of total scores"}
                        />
                    </Col>
                </Row>



        </>
    );
};

export default Results;
