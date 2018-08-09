import * as React from 'react';
import styled from "styled-components";
import { IKata } from '../../interfaces/IKata';

interface State {
    searchedValue: string;
    isFocused: boolean;
}

interface Props {
    allItems: IKata[];
    renderItem: (item: IKata, index: number) => void;
}

export class SearchInput extends React.Component<Props, State> {
    private inputSearch;
    
    state = {
        searchedValue: "",
        isFocused: false
    }


    render () {
        return (
            <InputContainer>
                <input ref={ref => this.inputSearch = ref}
                    type="text"
                    onFocus={() => this.setState({isFocused: true})}
                    onBlur={() => window.setTimeout(() => this.setState({isFocused: false}), 300)}
                    onChange={this.updateSearchedValue}
                    value={this.state.searchedValue}
                />
                {
                    this.state.isFocused &&
                    <ListContainer style={{background: "purple"}}>
                        {
                            this.renderSearchResult(this.state.searchedValue, this.props.allItems)
                        }
                    </ListContainer>
                }
            </InputContainer>
        )
    }

    renderSearchResult = (search, allItems: IKata[]) => {
        const searchRegex = new RegExp(search);
        const foundItems = allItems.filter((item: IKata) => searchRegex.test(item.description.title.toLowerCase()))

        return (
            <React.Fragment>
                {
                    foundItems.map((item, index) => this.props.renderItem(item, index))
                }
            </React.Fragment>
        )
    }

    updateSearchedValue = (e) => {
        this.setState({searchedValue: e.target.value})
    }
}

const ListContainer = styled.ul`
    display: block;
    position: absolute;
    left: 0;
    top: 1.3rem;
    border-radius: 2px;
    width: auto;
    max-height: 15rem;
    min-width: 10rem;
    box-shadow: 3px -3px 20px rgba(0,0,0,0.2);
`;

const InputContainer = styled.div`
    position: relative;
`;
