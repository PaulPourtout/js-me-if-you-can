import * as React from 'react';
import {Link} from 'react-router-dom';
import { URL_API } from '../../utils/config/URL_API';

interface State {
    loading: boolean;
    serie: any;
}

export class SeriePage extends React.Component<any, State> {
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

    render () {
        if (this.state.loading) return <div>...Loading</div>
        return (
            <div>
                <h1>{this.state.serie.title}</h1>
                <p>{this.state.serie.description}</p>
                <h3>Katas in the serie :</h3>
                <ul>
                    {
                        this.state.serie.katas.map((kata, i) => (
                            <li>
                                <h3>{i+1} / {kata.description.title}</h3>
                            </li>
                        ))
                    }
                </ul>
                <Link to={`/editor/series/${this.state.serie._id}`}>Train</Link>
            </div>
        )
    }
}
