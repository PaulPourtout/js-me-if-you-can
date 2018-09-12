import * as React from "react";
import styled from "styled-components";
import { ColorPalette } from "../style/Palette";
import { LinkButton } from "../components/LinkButton";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { UserListener } from "../../context/UserProvider";
import {IUser} from "../../interfaces/IUser";
import { PageContainer, Nav } from "../style/StyledComponents";
import {GlobalStyle} from "../style/GlobalStyle";
const exag = require("../../assets/exag.png");

interface Props {
    user: IUser;
}

interface State {
    exagTop: number;
    exagLeft: number;
}

export class HomeComponent extends React.Component<Props, State> {
    private ExagContainer;
    private serieId:string = "5b8fe68da40f800fe2376cd5";
    
    constructor(props) {
        super(props);
        this.state = {
            exagTop: -10.22,
            exagLeft: -10.22
        }
    }

    componentDidMount() {
        this.ExagContainer && this.ExagContainer.addEventListener('mousemove', this.moveExag);
    }

    componentWillUnmount() {
        this.ExagContainer && this.ExagContainer.removeEventListener('mousemove', this.moveExag);
    }

    moveExag = ({clientX, clientY}) => {
        this.setState({exagLeft: (-clientX / 1000) - 10, exagTop: (-clientY / 1000) - 10})
    }


    render () {
        if (this.props.user.authenticated) return <Redirect to="/dashboard" />
        return (
            <div style={{backgroundColor: ColorPalette.underBackground, minHeight: "100vh"}}>
                <HomeHeader>
                    <div style={{padding: '1rem'}}>
                        <Nav>
                            <Link style={GlobalStyle.NavLinkStyle} to="/login">
                                Login
                            </Link>
                            <p style={GlobalStyle.NavLinkStyle}>|</p>
                            <Link style={GlobalStyle.NavLinkStyle} to="/signup">
                                Sign-up
                            </Link>
                        </Nav>
                    </div>
                    <TitleContainer>
                        <Title size={4} color={ColorPalette.tertiary}>
                            JSme
                        </Title>
                        <Title size={1.2} color={ColorPalette.tertiary}>
                            JS me if you can !
                        </Title>
                    </TitleContainer>
                    <ExaContainer
                        innerRef={ref => this.ExagContainer = ref}
                        top={this.state.exagTop}
                        left={this.state.exagLeft}
                        />
                </HomeHeader>
                <PageContainer>
                    <CardsContainer>
                        <Card>
                            <Link to={`/editor/series/${this.serieId}`} style={{ textDecoration: "none" }}>
                                <CardTitle>Train now !</CardTitle>
                                <CardContent>
                                <h3>Train your Javascript skills with some series of katas</h3>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card>
                            <Link to="/signup" style={{ textDecoration: "none" }}>
                                <CardTitle>Sign up</CardTitle>
                                <CardContent>
                                <h3>Keep track of your scores by signing up !</h3>
                                </CardContent>
                            </Link>
                        </Card>
                    </CardsContainer>
                </PageContainer>
            </div>
        );
    }
};

export const Home = UserListener(HomeComponent);

const CardsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const Card = styled.section`
    background-color: ${ColorPalette.background};
    text-align: center;
    margin: 1rem;
    border-radius: 2px;
    box-shadow: 2px 2px 4px solid rgba(0, 0, 0, 0.3);
    overflow: hidden;
    width: 300px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        transform: translateY(-0.5rem);
    }

    @media (max-width: 600px) {
        margin: 1rem 0;
    }
`;

const CardTitle = styled.h3`
    text-transform: uppercase;
    background-color: ${ColorPalette.primary};
    padding: 1rem;
    color: ${ColorPalette.tertiary};
`;

const CardContent = styled.div`
    background-color: ${ColorPalette.background};
    padding: 1rem;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${ColorPalette.activeText};
`;

const TitleContainer = styled.div`
    text-align: center;
    padding-top: 10rem;
    padding-bottom: 3rem;
    z-index: 100;
`;

interface IExaContainer {
    top: number;
    left: number;
}

const ExaContainer = styled.div.attrs<IExaContainer>({
    style: ({top, left}) => ({
        top: `${top}%`,
        left: `${left}%`
    })
})`
    background-image: url(${exag});
    background-repeat: repeat;
    position: absolute;
    opacity: 0.35;
    z-index: 1;
    width: 120%;
    height: 120%;
`;

const HomeHeader = styled.div`
    overflow: hidden;
    background: url(${exag}),
    linear-gradient(
        45deg,
        ${ColorPalette.primary} 0%,
        ${ColorPalette.primary} 20%,
        rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
        -45deg,
        ${ColorPalette.fourthiary} 0%,
        ${ColorPalette.fourthiary} 20%,
        rgba(0, 0, 0, 0) 50%
    ),
    linear-gradient(
        130deg,
        ${ColorPalette.secondary} 0%,
        ${ColorPalette.secondary} 1%,
        rgba(0, 0, 0, 0) 80%
    );
    background-color: ${ColorPalette.primary};
    height: 50vh;
    position: relative;

    @media (max-width: 600px) {
        height: 100vh;
    }
`;

interface ITitle {
    size?: number;
    color?: string;
}

const Title = styled.h1`
    z-index: 100;
    font-size: ${(p: ITitle) => (p.size ? p.size : 2)}rem;
    color: ${(p: ITitle) => (p.color ? p.color : ColorPalette.activeText)};
    font-weight: bold;
`;
