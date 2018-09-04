import * as React from 'react';
import { UserListener } from '../../context/UserProvider';
import {
    Form,
    PageContainer,
    Card,
    CardContent,
    CardTitle,
    Button
} from "../style/StyledComponents";
import {ColorPalette} from "../style/Palette"
import styled from "styled-components";
import {INewKata} from "../../interfaces/INewKata";
import {ITest} from "../../interfaces/ITest";
import {IInput} from "../../interfaces/IInput";


interface Props {
    kata: INewKata;
    updateKataValue : (e, key, itemIndex) => void;
    createOrUpdateKata: (e, kata: INewKata, mode: "create" | "update") => void;
    mode: "create" | "update";
}

interface State {
    newKata?: INewKata;
}


class EditKataComponent extends React.PureComponent<Props, State> {
    private IS_NEW_KATA: boolean = this.props.mode === "create";
    state = {}

    render () { 
        return (
            <PageContainer>
                <Card>
                    <CardTitle>{this.IS_NEW_KATA ? "Create New" : "Update"} Kata</CardTitle>
                    <CardContent>
                        <Form onSubmit={(e) => this.props.createOrUpdateKata(e, this.props.kata, this.props.mode)}>
                            {
                                this.renderForm(this.props.kata)
                            }
                            <button onClick={(e) => this.addTest(e, this.props.kata)}>Add new test</button>
                        </Form>
                    </CardContent>
                    <Button
                    style={{marginTop: "auto"}}
                        active
                        background={{
                            main: ColorPalette.secondary,
                            hover: ColorPalette.secondaryLight
                        }}
                        onClick={(e) => this.props.createOrUpdateKata(e, this.props.kata, this.props.mode)}>
                        {this.IS_NEW_KATA ? "Submit new" : "Update"} Kata
                    </Button>
                </Card>
            </PageContainer>
        )
    }

    renderForm = (managedObject, inputIndex?: number) => Object.keys(managedObject).map((key, index) => (
            <React.Fragment key={index}>
                <label htmlFor={key}>{managedObject[key].label}</label>
                {
                    managedObject[key].type === "textarea"
                    ? <TextArea
                        name={key}
                        onChange={(e) => this.props.updateKataValue(e, key, inputIndex)}
                        value={managedObject[key].value}
                    />
                    
                    : key !== "tests"
                        ? <TextInput type={managedObject[key].type}
                                name={key}
                                onChange={(e) => this.props.updateKataValue(e, key, inputIndex)}
                                value={managedObject[key].value}
                        />
                        : this.renderTests(managedObject)
                }
            </React.Fragment>
        )
    )

    renderTests = (currentObject) => (
        <React.Fragment>
            {
                currentObject.tests.map((test, index) => (
                    this.renderForm(test, index)
                ))
            }
        </React.Fragment>
    )

    addTest = (e, currentObject) => {
        e.preventDefault();

        const newObject = {...currentObject};
        const index = newObject.tests.length + 1;
        const newTest = {
            arg: {
                label: `test-${index} arguments`,
                value: "",
                type: "text"
            },
            solution: {
                label: `test-${index} solution`,
                value: "",
                type: "text"
            }
        }
        newObject.tests = [...newObject.tests, newTest]

        this.setState({newKata: newObject})
    }
}

export const EditKata = UserListener(EditKataComponent);

const TextInput = styled.input`
    border: none;
    font-size: 1rem;
    border-bottom: 2px solid ${ColorPalette.primary};
    padding: 0.5rem;
    color: ${ColorPalette.activeText}
`;

const TextArea = styled.textarea`
    resize: none;
    border: none;
    font-size: 1rem;
    border-bottom: 2px solid ${ColorPalette.primary};
    padding: 0.5rem;
    color: ${ColorPalette.activeText}
`;


