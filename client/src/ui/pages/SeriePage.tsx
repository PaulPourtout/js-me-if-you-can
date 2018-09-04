import * as React from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../utils/config/URL_API';
import {
    PageContainer,
    Card,
    Button,
    CardTitle,
    KataTitle,
    CardContent,
    IconContainer
} from '../style/StyledComponents';
import { ColorPalette } from "../style/Palette";
import { UserListener } from '../../context/UserProvider';
import Settings from "react-icons/lib/md/settings";
import Delete from "react-icons/lib/md/delete";
import {GlobalStyle} from "../style/GlobalStyle";
import { history } from "../../Router";

interface State {
    loading: boolean;
    serie: any;
}

class SeriePageComponent extends React.Component<any, State> {
    state = {
        loading: true,
        serie: null
    }

    componentDidMount() {
        const serieId = this.props.match.params.serieId;
        
        fetch(`${URL_API}/series/${serieId}`)
        .then(res=>res.json())
        .then(serie=> {
            if (serie.success) {
                this.setState({
                    serie: serie.result,
                    loading: false});
            }
        })
        .catch(err => console.error(err))
    }

    handleDeleteSerie = (serieId: string) => {
        fetch(`${URL_API}/series/${serieId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            history.push('/serieslist')
            
        })
        .catch(err => console.error(err))
    }

    render () {
        if (this.state.loading) return <div>...Loading</div>
        return (
            <PageContainer>
                <Card>
                    <CardTitle>
                        <KataTitle>{this.state.serie.title}</KataTitle>
                        {
                            this.props.user.admin &&
                                <div style={style.IconsContainer}>    
                                <Link
                                to={`/admin/serie/${this.state.serie._id}`}
                                style={GlobalStyle.iconButton}    
                                >
                                    <IconContainer
                                        color={ColorPalette.tertiary}
                                        hoverColor={ColorPalette.lightSeparator}
                                    >
                                        <Settings style={ GlobalStyle.iconButton } />
                                    </IconContainer>
                                </Link>
                                <IconContainer
                                    color={ColorPalette.tertiary}
                                    hoverColor={ColorPalette.lightSeparator}
                                    onClick={ () => this.handleDeleteSerie(this.props.match.params.serieId)}
                                >
                                    <Delete style={ GlobalStyle.iconButton }/>
                                </IconContainer>
                            </div>
                        }
                    </CardTitle>
                    <CardContent>
                        <p>{this.state.serie.description}</p>
                        <h3 style={style.listTitle}>Katas in the serie :</h3>
                        <ul>
                            {
                                this.state.serie.katas.map((kata, i) => (
                                    <li
                                        key={`${i}-${kata.description.title}`}
                                        style={style.listItem}
                                    >
                                        <h3>{i+1} / {kata.description.title}</h3>
                                    </li>
                                ))
                            }
                        </ul>
                    </CardContent>
                    <Link to={`/editor/series/${this.state.serie._id}`}>
                        <Button
                            fullWidth
                            active
                            background={{
                                main: ColorPalette.secondary,
                                hover: ColorPalette.secondaryLight
                            }}>
                            Start the serie !
                        </Button>
                    </Link>
                </Card>
            </PageContainer>
        )
    }
}

export const SeriePage = UserListener(SeriePageComponent);

const style:React.CSSProperties = {
    listTitle: {
        padding: "0.5rem 0",
        fontWeight: "bold",
        color: ColorPalette.lightText
    },
    listItem: {
        padding: "0.5rem 0"
    },
    IconsContainer: {
        display: "flex",
        alignItems: "center"
    }
}
