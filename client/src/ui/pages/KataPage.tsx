import * as React from 'react';
import styled from 'styled-components';
import { UserListener } from '../../context/UserProvider';
import { IKata } from '../../interfaces/IKata';
import {Link} from 'react-router-dom';
import { IUserContext } from '../../interfaces/IUser';
import { PageContainer, Card, Button } from '../style/StyledComponents';
import { ColorPalette } from '../style/Palette';
import {GlobalStyle} from '../style/GlobalStyle';
import { URL_API } from '../../utils/config/URL_API';

interface State {
    loading: boolean;
    kata?: IKata;
}


export class KataPageComponent extends React.Component<any, State> {
    state = {loading: true, kata: null};

    componentDidMount() {
        this.getKata(this.props.match.params.kataId)
    }

    getKata = (kataId) => {
        fetch(`${URL_API}/katas/${kataId}`)
        .then(res => res.json())
        .then(res => {
            if (res.success) this.setState({loading: false, kata: res.result})
            else console.error('Problem with kata fetching :', res.result)
        })
        .catch(err => console.log('problem with fetching', err))
    }

    render () {
        if (this.state.loading) return <PageContainer></PageContainer>
        return(
            <PageContainer>
                <Card>
                    <CardTitle>
                        <KataTitle>{this.state.kata.description.title}</KataTitle>
                    </CardTitle>
                    <CardContent>
                        <p>Description :</p>
                        <p>{this.state.kata.description.content}</p>
                        <Link to={`/editor/katas/${this.state.kata._id}`} style={{marginTop: '3rem'}}>
                            <Button active background={{main: ColorPalette.secondary, hover: ColorPalette.secondaryLight}}>Train</Button>
                        </Link>
                        {
                            this.props.user.admin &&
                            <Link to={`/admin/kata/${this.state.kata._id}`} style={{marginTop: '3rem'}}>
                                <Button active background={{main: ColorPalette.secondary, hover: ColorPalette.secondaryLight}}>Edit kata</Button>
                            </Link>
                        }
                    </CardContent>
                </Card>
            </PageContainer>
        )
    }
}

const CardTitle = styled.div`
    background-color: ${ColorPalette.primary};
    padding: 1rem;
`;

const KataTitle = styled.h1`
    font-size: 1.3rem;
    color: ${ColorPalette.tertiary};
    text-transform: uppercase;
    font-weight: bold;
`
const CardContent = styled.div`
    padding: 2rem 10%;
    display: flex;
    flex-direction: column;
`;

export const KataPage = UserListener(KataPageComponent);
