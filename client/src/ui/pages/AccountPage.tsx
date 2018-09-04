import * as React from 'react';
import {UserListener} from '../../context/UserProvider';
import {IUser} from '../../interfaces/IUser';
import { URL_API } from '../../utils/config/URL_API';
import { PageContainer, Card, CardTitle, CardContent } from '../style/StyledComponents';


interface IProps {
    user: IUser;
}

interface IState {
    loading: boolean;
    userInfos?:any;
}

export class Account extends React.Component<IProps, IState> {
    state = {
        loading: true,
        userInfos: null
    }

    componentDidMount() {
        fetch(`${URL_API}/users/${this.props.user.id}`)
        .then(res => res.json())
        .then(userInfos => this.setState({userInfos, loading: false}))
        .catch(err => console.log('error', err))
    }

    render() {
        if (this.state.loading) return <div></div>

        const createdDate = new Date(this.state.userInfos.created_at);
        return (
            <PageContainer>
                <Card>
                    <CardTitle>
                        <h1>My account</h1>
                    </CardTitle>
                    <CardContent>
                        <form>
                            <label htmlFor="">Username :</label>
                            <input type="text" value={this.state.userInfos.username}/>
                            <label htmlFor="">Email :</label>
                            <input type="text" value={this.state.userInfos.email}/>
                            <p>{createdDate.toDateString()}</p>
                        </form>
                    </CardContent>
                </Card>
            </PageContainer>
        )
    }
}

export const AccountPage = UserListener(Account);
