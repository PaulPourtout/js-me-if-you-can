import * as React from 'react';
import styled from 'styled-components';
import { UserListener } from '../../context/UserProvider';
import { IKata } from '../../interfaces/IKata';
import {Link} from 'react-router-dom';
import { IUserContext } from '../../interfaces/IUser';
import {
    PageContainer,
    Card,
    Button,
    CardContent,
    KataTitle,
    CardTitle,
    IconContainer
} from '../style/StyledComponents';
import { ColorPalette } from '../style/Palette';
import {GlobalStyle} from '../style/GlobalStyle';
import { URL_API } from '../../utils/config/URL_API';
import Settings from 'react-icons/lib/md/settings';
import Delete from 'react-icons/lib/md/delete';
import { history } from "../../Router";

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

    handleDeleteKata = (e, kataId) => {
        e.preventDefault();
        fetch(`${URL_API}/katas/${kataId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.props.getToken()
            }
        })
        .then(res => res.json())
        .then(res => {
            history.push("/kataslist")
        })
        .catch(err => console.error(err))
    }

    render () {
        if (this.state.loading) return <PageContainer></PageContainer>
        return(
            <PageContainer>
                <Card>
                    <CardTitle>
                        <KataTitle>{this.state.kata.description.title}</KataTitle>
                        {
                            this.props.user.admin &&
                            <div style={ style.IconsContainer } >
                                <Link
                                    to={`/admin/kata/${this.state.kata._id}`}
                                    style={GlobalStyle.iconButton} 
                                >
                                    <IconContainer
                                        color={ColorPalette.tertiary}
                                        hoverColor={ColorPalette.lightSeparator}
                                    >
                                        <Settings style={ GlobalStyle.iconButton } />
                                    </IconContainer>
                                    <IconContainer
                                        color={ColorPalette.tertiary}
                                        hoverColor={ColorPalette.lightSeparator}
                                        onClick={ (e) => this.handleDeleteKata(e, this.props.match.params.kataId)}
                                    >
                                        <Delete style={ GlobalStyle.iconButton }/>
                                    </IconContainer>
                                </Link>

                            </div>
                        }
                    </CardTitle>
                    <CardContent>
                        <p>Description :</p>
                        <p>{this.state.kata.description.content}</p>
                    </CardContent>
                        <Link to={`/editor/katas/${this.state.kata._id}`} style={{marginTop: '3rem'}}>
                            <Button
                                fullWidth
                                active
                                background={{
                                    main: ColorPalette.secondary,
                                    hover: ColorPalette.secondaryLight
                                }}
                            >Train</Button>
                        </Link>
                </Card>
            </PageContainer>
        )
    }
}

const style:React.CSSProperties = {
    IconsContainer: {
        display: "flex",
        alignItems: "center"
    }
}

export const KataPage = UserListener(KataPageComponent);
