import * as React from "react";
import { 
    Button,
    PageContainer,
    Form,
    Card,
    CardTitle,
    CardContent
} from "../style/StyledComponents";
import { IKata } from "../../interfaces/IKata";
import { SearchInput } from "../components/SearchInput";
import {InputText} from "../components/InputText";
import styled from "styled-components";
import { ColorPalette } from "../style/Palette";
import { URL_API } from "../../utils/config/URL_API";
import { IInput } from "../../interfaces/IInput";
import { UserListener } from "../../context/UserProvider";
import { history } from "../../Router";

interface ISerie {
    title: string;
    description: string;
    katas: string[];
}

interface INewSerie {
    title: IInput;
    description: IInput;
    katas: string[];
}

interface State {
    newSerie: INewSerie;
    allKatas: IKata[];
    searchedKata: string;
}


class CreateSerieComponent extends React.Component<any, State> {
    private IS_NEW_SERIE: boolean = this.props.match.params.id === "new";
    private newSerie: INewSerie = {
        title: { label: "title", value: "", type: "text" },
        description: { label: "description", value: "", type: "textarea" },
        katas: []
    }

    state = {
        newSerie: this.newSerie,
        allKatas: [],
        searchedKata: ""
    }

    componentWillMount() {
        if (!this.IS_NEW_SERIE) {
            fetch(`${URL_API}/series/${this.props.match.params.id}`, {
                headers: {
                    "x-access-token": this.props.getToken()
                }
            })
            .then(res => res.json())
            .then(res => {
                if (res.result) {
                    this.setState({newSerie: this.prepareSerieForEditing(res.result)})
                }
            })
            .catch(err => console.error(err))
        }

        fetch(`${URL_API}/katas`, {
            headers: {
                "x-access-token": this.props.getToken()
            }
        })
        .then(res => res.json())
        .then(res => this.setState({
            allKatas: res.result
        }))
        .catch(err => console.error(err))
    }


    prepareSerieForEditing = (serie):INewSerie => {
        const katas: string[] = serie.katas.map((kata) => kata._id); 
        
        const kataToEdit: INewSerie = {
            title: { label: "title", value: serie.title, type: "text" },
            description: { label: "description", value: serie.description, type: "textarea" },
            katas: katas
        }

        return kataToEdit;
    }


    render () {
        return (
            <PageContainer>
                <Card style={{flex: 1}}>
                    <CardTitle>Create new serie</CardTitle>
                    <CardContent>
                        <Form onSubmit={(e) => this.handleSubmitSerie(e, this.state.newSerie, this.IS_NEW_SERIE)}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                onChange={(e) => this.updateSerieValues(e, "title")}
                                value={this.state.newSerie.title.value}
                            />
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                name="description"
                                onChange={(e) => this.updateSerieValues(e, "description")}
                                value={this.state.newSerie.description.value}
                            />
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
                                        this.state.newSerie && this.state.allKatas &&
                                        this.renderSelectedKatas(this.state.newSerie.katas, this.state.allKatas)
                                    }
                                </div>

                            </div>
                        </Form>
                    </CardContent>
                    <Button
                    style={{marginTop: "auto"}}
                        active
                        background={{
                            main: ColorPalette.secondary,
                            hover: ColorPalette.secondaryLight
                        }}
                        onClick={(e) => this.handleSubmitSerie(e, this.state.newSerie, this.IS_NEW_SERIE)}>
                        Submit new serie
                    </Button>
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
        newSerie[key].value = e.target.value;

        this.setState({newSerie})
    }

    handleSubmitSerie = (e, newSerie:INewSerie, isNew:boolean) => {
        e.preventDefault();

        const serie:ISerie = {
            title: newSerie.title.value,
            description: newSerie.description.value,
            katas: newSerie.katas
        }

        const URL = isNew
            ? `${URL_API}/series`
            : `${URL_API}/series/${this.props.match.params.id}`;
        
        const METHOD = isNew ? "POST" : "PUT";

        fetch(URL, {
            method: METHOD,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.props.getToken()
            },
            body: JSON.stringify(serie)
        })
        .then(res => {
            res.json()
            history.push("/serieslist")
        })
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

    renderSelectedKatas = (selectedKatasId: string[], allKatas: IKata[]) => {
        const selectedKatas = allKatas
            .filter((kata: IKata) => {
                return selectedKatasId.indexOf(kata._id) !== -1
            }
        );

        return (
            <ul>
                {
                    selectedKatas.map((kata:IKata, index:number) => (
                        <ListItem key={`${kata.description.title}-${index}`}>
                            <p>{kata.description.title}</p>
                            <button onClick={(e) => this.unselectKata(e, kata._id)} >unselect</button>
                        </ListItem>
                    ))
                }
            </ul>
        )
    }
}

export const CreateSerie = UserListener(CreateSerieComponent);



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
