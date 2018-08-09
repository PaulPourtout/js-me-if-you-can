import * as React from 'react';
import AceEditor from 'react-ace';
import 'brace/theme/twilight';
import 'brace/mode/javascript';
import {IKata, IKataSolution} from '../../interfaces/IKata';
import { ACE } from '../components/ACE';
import {UserListener} from '../../context/UserProvider';
import { URL_API } from '../../utils/config/URL_API';

interface State {
    loading: boolean;
    kata: IKata;
    userSolution: IKataSolution[];
}

export class KataSolutionsComponent extends React.Component<any, State> {
    state = {
        loading: true,
        kata: null,
        userSolution: null
    }


    componentDidMount() {
        this.getKata(this.props.match.params.kataId);
    }

    getKata = (kataId:string) => {
        fetch(`${URL_API}/katas/${kataId}`)
        .then(res => res.json())
        .then(res => this.setState({kata: res.result, loading: false}))
        .catch(err => console.log(err));
    }
    
    getUsersSolution = (userId:string) => {
        const solutions = this.state.kata.solutions;

        const userSolution = solutions.filter(solution => solution.authorId === userId)
        console.log(userSolution)
        this.setState({userSolution})
    }

    render () {
        if (this.state.loading) return <div></div>

        return (
            <div>
                <h1>{this.state.kata.description.title}</h1>

                <h3>Solutions:</h3>

                <ul>
                    {
                        this.state.kata.solutions.map((solution, index) =>
                        solution
                            ? (<li style={{margin: "1rem 0", display: "flex"}}>
                                    <ACE
                                        readOnly
                                        width="50%"
                                        value={solution.value}
                                        height="100px"
                                    />
                                    <div>
                                        <p>Done by {solution.authorName}</p>
                                        <p>Time-score : {solution.timeScore / 1000}s</p> {/*// TODO: Add utils to handle time*/}
                                    </div>
                                </li>)
                            : null
                        )
                    }
                </ul>
            </div>
        )
    }
}

export const KataSolutions = UserListener(KataSolutionsComponent);
