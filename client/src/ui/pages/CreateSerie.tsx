import * as React from "react";
import { PageContainer, Form, Card, CardTitle } from "../style/StyledComponents";
import { IKata } from "../../interfaces/IKata";
import { SearchInput } from "../components/SearchInput";
import {InputText} from "../components/InputText";
import styled from "styled-components";
import { ColorPalette } from "../style/Palette";
import { URL_API } from "../../utils/config/URL_API";

interface ISerie {
    title: string;
    description: string;
    katas: string[];
}

interface State {
    newSerie: ISerie;
    allKatas: IKata[];
    searchedKata: string;
}


export class CreateSerie extends React.Component<any, State> {
    state = {
        newSerie: {
            title: "",
            description: "",
            katas: [],
        },
        allKatas: [],
        searchedKata: ""
    }

    componentWillMount() {
        fetch(`${URL_API}/katas`)
        .then(res => res.json())
        .then(res => this.setState({allKatas: res.result}, () => console.log(this.state.allKatas)))
        .catch(err => console.error(err))
    }


    render () {
        return (
            <PageContainer>
                <Card style={{flex: 1}}>
                    <div style={{display:"flex", flexDirection:"row", backgroundColor: ColorPalette.secondary, justifyContent: "space-between", alignItems: "center"}}>
                        <CardTitle>Create new serie</CardTitle>
                    </div>
                    <Form>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" onChange={(e) => this.updateSerieValues(e, "title")} value={this.state.newSerie.title}/>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" onChange={(e) => this.updateSerieValues(e, "description")} value={this.state.newSerie.description}/>
                        <div style={{display: "flex", flex: 1}}>
                            <div style={{flex: 1}}>
                                <p>Search katas :</p>
                                <SearchInput
                                    allItems={this.state.allKatas}
                                    renderItem={this.renderSearchedKata}
                                    />
                            </div>
                            <div style={{flex: 1}}>
                                <p>Current katas :</p>
                                {
                                    this.renderSelectedKatas(this.state.newSerie.katas)
                                }
                            </div>

                        </div>

                        <button onClick={(e) => this.submitNewSerie(e, this.state.newSerie)}>Submit new serie</button>
                    </Form>
                </Card>
            </PageContainer>
        )
    }

    renderSearchedKata = (kata:IKata, index:number) => {
        const isSelected = this.state.newSerie.katas.indexOf(kata._id) !== -1;
        
        return (
            <ListItem key={`${index}-${kata._id}`} isSelected={isSelected}>
                <p>{kata.description.title}</p>
                <button onClick={(e) => this.selectKata(e, kata._id)}>select</button>
            </ListItem>
        )
    }

    updateSerieValues = (e, key:string) => {
        const newSerie = this.state.newSerie;
        newSerie[key] = e.target.value;

        this.setState({newSerie})
    }

    submitNewSerie = (e, newSerie:ISerie) => {
        e.preventDefault();

        fetch(`${URL_API}/series`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSerie)
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }

    updateSearchedKata = (e) => {
        this.setState({searchedKata: e.target.value})
    }

    selectKata = (e, kataId:string) => {
        e.preventDefault();
        const newSerie = this.state.newSerie;

        if (newSerie.katas.indexOf(kataId) === -1) {
            newSerie.katas = [...newSerie.katas, kataId]; 
            this.setState({newSerie})
        }
    }

    unselectKata = (e, kataId: string) => {
        e.preventDefault();
        const newSerie = this.state.newSerie;
        const kataIndex = newSerie.katas.indexOf(kataId);
        newSerie.katas = [...newSerie.katas.slice(0, kataIndex), ...newSerie.katas.slice(kataIndex + 1)]
        this.setState({newSerie})
    }

    renderSelectedKatas = (selectedKatasId: string[]) => {
        const selectedKatas = this.state.allKatas.filter((kata: IKata) => selectedKatasId.indexOf(kata._id) !== -1);

        return (
            <ul>
                {
                    selectedKatas.map((kata:IKata, index:number) => (
                        <ListItem>
                            <p>{kata.description.title}</p>
                            <button onClick={(e) => this.unselectKata(e, kata._id)} >unselect</button>
                        </ListItem>
                    ))
                }
            </ul>
        )
    }
}


interface IListItem {
    isSelected?: boolean;
}

const ListItem = styled.li`
    background-color: ${ (p:IListItem) => p.isSelected ? ColorPalette.secondary : ColorPalette.background};
    padding: 1rem;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
`;
