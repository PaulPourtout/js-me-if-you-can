import * as React from 'react';
import {IKata} from '../../interfaces/IKata';
import {Link} from 'react-router-dom';
import { PageContainer, Card } from '../style/StyledComponents';
import {LinksList} from "../components/LinksList";
import { ISerie } from '../../interfaces/ISerie';
import { URL_API } from '../../utils/config/URL_API';
import { UserListener } from '../../context/UserProvider';

interface State {
    loading: boolean;
    series: ISerie[];
}

class SeriesListComponent extends React.Component<any, State> {
    state = {
        series: [],
        loading: true
    }


    componentWillMount() {
        fetch(`${URL_API}/series`, {
            headers: {
                "x-access-token": this.props.getToken()
            }
        })
            .then(res => res.json())
            .then(series => this.setState({series: series.result, loading: false}))
            .catch(err => console.log(err))
    }

    render () {
        return (
            <PageContainer>
                {
                    !this.state.loading && this.state.series &&
                    <LinksList title="series" type="serie" datas={this.state.series as ISerie[]} />
                }
            </PageContainer>
        );
    }
} 

export const SeriesList = UserListener(SeriesListComponent)
