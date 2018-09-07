import * as React from 'react';
import {Link} from 'react-router-dom';
import {
    PageContainer,
    Card,
    CardHoverable
} from '../style/StyledComponents';
import {GlobalStyle} from '../style/GlobalStyle';
import styled from 'styled-components';
import {UserListener} from '../../context/UserProvider';
import { IUserContext } from '../../interfaces/IUser';
import {IKata} from '../../interfaces/IKata';
import { ColorPalette } from '../style/Palette';
import { URL_API } from '../../utils/config/URL_API';
const exag = require('../../assets/exag.png');

interface State {
    numberOfKatasDoneByUser: number;
    bestUsers: any[];
}

export class DashboardComponent extends React.PureComponent<IUserContext, State> {
    state = {
        numberOfKatasDoneByUser: 0,
        bestUsers: []
    }

    private LEADERBOARD_NUMBER_LIMIT = 5; 
    
    componentDidMount() {
        fetch(`${URL_API}/users/katas/number/${this.props.user.id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': `${this.props.getToken()}`
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({numberOfKatasDoneByUser: res.message.katasDoneByUser})
        })
        .catch(err => console.error(err));
        
        fetch(`${URL_API}/users/best/${this.LEADERBOARD_NUMBER_LIMIT}`)
        .then(res => res.json())
        .then(res => {
            this.setState({bestUsers: res})
        })
        .catch(err => console.error(err));
    }
    
    render() {
        return (
            <PageContainer>
                <Main>
                    <Row>
                        <Link style={ style.buttonCards } to="/kataslist">
                            <KatasCard>
                                <h2>Katas</h2>
                            </KatasCard>
                        </Link>
                        <Link style={ style.buttonCards } to="/serieslist">
                            <SeriesCard>
                                <h2>Kata series</h2>
                            </SeriesCard>
                        </Link>
                    </Row>
                
                    <Row>
                        <StatCard>
                            <div style={{color: ColorPalette.tertiary, textAlign: "center", display: "flex", flexDirection: "column", flex: 1, justifyContent: "center"}}>
                                <p>You finished</p>
                                <p style={{fontSize: "3rem", margin: "1rem 0"}}>{this.state.numberOfKatasDoneByUser}</p>
                                <p>katas</p>
                            </div>
                        </StatCard>
                        <DashCard style={{ background: gradientBackground }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>#</Th>
                                        <Th>User</Th>
                                        <Th>Katas</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.bestUsers.map(({username, numberOfKatasDone}, index) => (
                                            <Tr key={`${index}-${username}`}>
                                                <Td>{index + 1}</Td>
                                                <Td>{username}</Td>
                                                <Td>{numberOfKatasDone}</Td>
                                            </Tr>
                                        ))
                                    }
                                    {
                                        (this.state.bestUsers.length < this.LEADERBOARD_NUMBER_LIMIT) &&
                                        this.getEmptyLeaderboardUser(this.LEADERBOARD_NUMBER_LIMIT, this.state.bestUsers.length)
                                    }
                                </tbody>
                            </Table>
                        </DashCard>
                    </Row>

                    {
                        this.props.user.admin &&
                        <Row>
                            <Link style={{textDecoration: "none", display: "flex", flex: 1}} to="/admin">
                                <CardHoverable>
                                    <h2>ADMIN</h2>
                                </CardHoverable>
                            </Link>
                        </Row>
                    }

                </Main>
            </PageContainer>
        )
    }

    getEmptyLeaderboardUser = (limit:number, usersNumber: number) => {
        const numberToRender = limit - usersNumber;
        const emptyArr = Array.apply(null, Array(numberToRender))

        return (
            <React.Fragment>
                {
                    emptyArr.map((emptyUser, index) => (
                        <Tr key={index}>
                            <Td>--</Td>
                            <Td>--</Td>
                            <Td>--</Td>
                        </Tr>
                    ))   
                }
            </React.Fragment>
        )
    }
}

export const Dashboard = UserListener(DashboardComponent);

const style: React.CSSProperties = {
    buttonCards: {
        textDecoration: "none",
        display: "flex",
        margin: "1rem",
        flex: 1
    }
}

const Table = styled.table`
    width: 100%;
    border-radius: 2px;
    overflow: hidden;
`;

const Th = styled.th`
    /* background-color: ${ColorPalette.primary}; */
    color: ${ColorPalette.tertiary};
    padding: 1rem;
    text-align: center;
`;

const Td = styled.td`
    text-align: center;
    padding: 0.5rem;
`;

const Tr = styled.tr`
    background-color: rgba(255,255,255, 0.7);
    border-bottom: 1px solid ${ColorPalette.secondary};
`;


const Main = styled.main`
    
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;


const DashCard = Card.extend`
    flex: 1;
    margin: 1rem;
    background-color: rgba(0,0,0,1);
`;

const StatCard = DashCard.extend`
    padding: 1rem 0;
    background: url(${exag}),
    linear-gradient(
        -70deg,
        ${ColorPalette.fourthiary} 0%,
        ${ColorPalette.primary} 50%,
        rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(60deg, ${ColorPalette.primary} 0%, rgba(0, 0, 0, 0) 70%),
    linear-gradient(-45deg, ${ColorPalette.primary} 0%, rgba(0, 0, 0, 0) 50%);
`;

const KatasCard = CardHoverable.extend`
    margin: 0;
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


const SeriesCard = CardHoverable.extend`
    margin: 0;
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

const gradientBackground = `
    url(${exag}),
    linear-gradient(
        45deg,
        ${ColorPalette.primary} 0%,
        ${ColorPalette.primary} 50%,
        rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(130deg, ${ColorPalette.fourthiary} 0%, rgba(0, 0, 0, 0) 30%),
    linear-gradient(-45deg, ${ColorPalette.primary} 0%, rgba(0, 0, 0, 0) 50%)
`;
