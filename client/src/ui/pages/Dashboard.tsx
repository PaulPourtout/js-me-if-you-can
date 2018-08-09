import * as React from 'react';
import {Link} from 'react-router-dom';
import {PageContainer} from '../style/StyledComponents';
import {GlobalStyle} from '../style/GlobalStyle';
import styled from 'styled-components';
import {UserListener} from '../../context/UserProvider';
import { IUserContext } from '../../interfaces/IUser';
import {IKata} from '../../interfaces/IKata';
import { ColorPalette } from '../style/Palette';
const exag = require('../../assets/exag.png');

interface State {
    katasDone: IKata[]
}

export class DashboardComponent extends React.PureComponent<IUserContext, State> {
    state = {
        katasDone: []
    }

    componentDidMount() {
        // this.props.user.authenticated && this.getKatasDoneByUser(this.props.user.id)
    }
    
    // getKatasDoneByUser = (userId) => {
    //     fetch(`http://localhost:8080/api/katas/user/${userId}`)
    //     .then(res => res.json())
    //     .then(res => {
    //         console.log(res)
    //         if (res.success) {
    //             this.setState({katasDone: res.result})
    //         } else {
    //             console.log(res)
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }

    render() {
        console.log(this.state.katasDone)
        return (
            <PageContainer>
                <Main>
                    <Row>
                        <Link style={{textDecoration: "none", display: "flex", flex: 1}} to="/kataslist">
                            <KatasCard>
                                <h2>Katas</h2>
                            </KatasCard>
                        </Link>
                        <Link style={{textDecoration: "none", display: "flex", flex: 1}} to="/serieslist">
                            <SeriesCard>
                                <h2>Kata series</h2>
                            </SeriesCard>
                        </Link>
                    </Row>
                
                    <Row>
                        <Card>
                            <h1>Stats and done katas</h1>
                        </Card>
                        <Card>
                            <h2>Leaderboard</h2>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>#</Th>
                                        <Th>User</Th>
                                        <Th>Katas</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Tr>
                                        <Td>01</Td>
                                        <Td>Polo</Td>
                                        <Td>2345</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>01</Td>
                                        <Td>Polo</Td>
                                        <Td>2345</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>01</Td>
                                        <Td>Polo</Td>
                                        <Td>2345</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>01</Td>
                                        <Td>Polo</Td>
                                        <Td>2345</Td>
                                    </Tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Row>

                    {
                        this.props.user.admin &&
                        <Row>
                            <Link style={{textDecoration: "none", display: "flex", flex: 1}} to="/admin">
                                <Card>
                                    <h2>ADMIN</h2>
                                </Card>
                            </Link>
                        </Row>
                    }

                    {/* <h2>Katas done by {this.props.user && this.props.user.username}</h2>
                    <ul>
                        {
                            this.state.katasDone.map((kata, index) => (
                                <li>
                                    <Link to={`/kata/${kata._id}`}>{index + 1}/ {kata.description.title}</Link>
                                </li>
                            ))
                        }
                    </ul> */}
                </Main>
            </PageContainer>
        )
    }
}

export const Dashboard = UserListener(DashboardComponent);

const Table = styled.table`
    width: 100%;
    border-radius: 2px;
    overflow: hidden;
`;

const Th = styled.th`
    background: url(${exag});
    background-color: ${ColorPalette.primary};
    color: ${ColorPalette.tertiary};
    padding: 1rem;
    text-align: center;
`;

const Td = styled.td`
    text-align: center;
    padding: 0.5rem;
`;

const Tr = styled.tr`
    background-color: ${ColorPalette.underBackground};
    border-bottom: 1px solid ${ColorPalette.secondary};
`;


const Main = styled.main`
    
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Card = styled.section`
    background-color: ${ColorPalette.background};
    padding: 4rem 1rem;
    flex: 1;
    margin: 1rem;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
    border-radius: 2px;
    transition: 0.3s;
    
    &:hover {
        transform: translateY(-0.3rem);
    }

    h2 {
        font-size: 1.4rem;
        text-align: center;
        font-weight: bold;
        color: ${ColorPalette.activeText}
    }

    ul {
        text-align: center;
    }
`;


const KatasCard = Card.extend`
    h2 {
        color: ${ColorPalette.tertiary}
    }
    background: url(${exag}),
		linear-gradient(
			45deg,
			${ColorPalette.secondary} 0%,
			${ColorPalette.secondary} 50%,
			rgba(0, 0, 0, 0) 100%
		),
		linear-gradient(130deg, ${ColorPalette.fourthiary} 0%, rgba(0, 0, 0, 0) 30%),
		linear-gradient(-45deg, ${ColorPalette.secondary} 0%, rgba(0, 0, 0, 0) 50%);
`

const SeriesCard = Card.extend`
    h2 {
        color: ${ColorPalette.tertiary}
    }
    background: url(${exag}),
		linear-gradient(
			45deg,
			${ColorPalette.primary} 0%,
			${ColorPalette.primary} 50%,
			rgba(0, 0, 0, 0) 100%
		),
		linear-gradient(130deg, ${ColorPalette.fourthiary} 0%, rgba(0, 0, 0, 0) 30%),
		linear-gradient(-45deg, ${ColorPalette.primary} 0%, rgba(0, 0, 0, 0) 50%);
`
