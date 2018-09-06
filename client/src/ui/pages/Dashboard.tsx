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
const exag = require('../../assets/exag.png');

interface State {

}

export class DashboardComponent extends React.PureComponent<IUserContext, State> {
    state = {}
    
    render() {
        console.log(this.props.user);
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
                        <DashCard>
                            <h1>Stats and done katas</h1>
                        </DashCard>
                        <DashCard>
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


const DashCard = Card.extend`
    flex: 1;
    margin: 1rem;
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
