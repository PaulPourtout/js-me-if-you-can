import * as React from 'react';
import {IKata} from '../../interfaces/IKata';
// import styled from 'styled-components';
// import Katas from '../../utils/Katas';
import {Link} from 'react-router-dom';
import { PageContainer, Card } from '../style/StyledComponents';
import { GlobalStyle } from '../style/GlobalStyle';
import {LinksList} from "../components/LinksList";
import { URL_API } from '../../utils/config/URL_API';
import { UserListener } from '../../context/UserProvider';

interface State {
    loading: boolean;
    katas: IKata[];
}

class KatasListComponent extends React.Component<any, State> {
    state = {
        katas: [],
        loading: true
    }


    componentWillMount() {
        fetch(`${URL_API}/katas`, {
            headers: {
                "x-access-token": this.props.getToken()
            }
        })
            .then(res => res.json())
            .then(katas => this.setState({katas: katas.result, loading: false}))
            .catch(err => console.log(err))
    }

    render () {
        return (
            <PageContainer>
                {
                    !this.state.loading && this.state.katas &&
                    <LinksList title="katas" type="kata" datas={this.state.katas as IKata[]} />
                }
            </PageContainer>
        );
    }
}

export const KatasList = UserListener(KatasListComponent)
