import axios from 'axios';
import { profile } from 'console';
import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { APICore } from '../../../helpers/api/apiCore';
import { getPortfolio } from '../../../redux/actions';
import { AppDispatch, RootState } from '../../../redux/store';

// types
import { UserPortfolioTypes } from './data'
import HeadingWithText from './HeadingWithText';

interface PersonalDetailsProps {
    userPortfolio: UserPortfolioTypes;
}



const UserDetails = ({ userPortfolio }: PersonalDetailsProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const { user, portfolio } = useSelector((state: RootState) => ({
        user: state.Auth.user,
        portfolio: state.Auth.portfolio,
    }));

    useEffect(() => {
        dispatch(getPortfolio(user.user.username))
    }, [dispatch])

    //     // Similar to componentDidMount and componentDidUpdate:
    //   useEffect(() => {
    //     const baseUrl: string = `/api/user/${user.user.username}/`;
    //     const response = api.get(`${baseUrl}`,{}).then(resp => {
    //         console.log(resp.data.data[0].fields)
    //     })
    //   });

    // console.log(axios.defaults.headers)

    if (portfolio === null) {
        return <p>loading</p>
    }

    console.log(portfolio.data[0].fields)


    return (
        <Card>
            <Card.Body>
                <div className="text-center mt-2">
                    <img src={userPortfolio.profile_image} alt="" className="avatar-lg rounded-circle" />
                    <h4 className="mt-2 mb-0">{
                        portfolio.data[0].fields.first_name} {portfolio.data[0].fields.last_name}</h4>
                    <h6 className="text-muted fw-normal mt-2 mb-0">{portfolio.data[0].fields.last_name}</h6>
                    <h6 className="text-muted fw-normal mt-1 mb-3">{userPortfolio.country_residence}</h6>



                    <div className="tags">
                        <div className="text-uppercase">
                            <Link to="#" className="badge badge-soft-primary me-2">
                                Twitter
                            </Link>
                            <Link to="#" className="badge badge-soft-primary me-2">
                                linkedin
                            </Link>
                            <Link to="#" className="badge badge-soft-primary me-2">
                                github
                            </Link>
                        </div>
                    </div>
                </div>

                {/* profile */}
                <HeadingWithText heading='About' text={portfolio.data[0].fields.about} />
                <div className="mt-3 pt-2 border-top">
                    <h4 className="mb-2 fs-15">Contact Information</h4>
                    <div className="table-responsive">
                        <table className="table table-borderless mb-0 text-muted">
                            <tbody>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>{user.user.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Phone</th>
                                    <td>{portfolio.data[0].fields.mobile_number}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>{portfolio.data[0].fields.country_residence}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default UserDetails;
