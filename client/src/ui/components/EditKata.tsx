import * as React from 'react';
import { UserListener } from '../../context/UserProvider';
import { PageContainer, Form } from "../style/StyledComponents";
import styled from "styled-components";
import { IKata } from '../../interfaces/IKata';


interface IInput {
    label: string;
    value: string;
    type: "text" | "textarea";
}

interface ITest {
    arg: IInput;
    solution: any;
}

interface INewKata<> {
    title: IInput;
    descriptionContent: IInput;
    example: IInput;
    functionName: IInput;
    parameterName: IInput;
    tests: ITest[];
}



interface Props {
    kata: INewKata;
    updateKataValue : (e, key, itemIndex) => void;
    createOrUpdateKata: (e, kata: INewKata, mode: "create" | "update") => void;
    deleteKata: (e) => void;
    mode: "create" | "update";
}

interface State {
    newKata?: INewKata;
}


class EditKataComponent extends React.PureComponent<Props, State> {

    render () {
        console.log("edit kata state", this.props.kata);
        return (
            <PageContainer>
                <Form>
                    {
                        this.renderForm(this.props.kata)
                    }
                    <button onClick={(e) => this.addTest(e, this.props.kata)}>Add new test</button>
                    <button onClick={(e) => this.props.createOrUpdateKata(e, this.props.kata, this.props.mode)}>{this.props.mode} kata</button>
                    <button onClick={(e) => this.props.deleteKata(e)}>Delete kata</button>
                </Form>
            </PageContainer>
        )
    }

    renderForm = (managedObject, inputIndex?: number) => Object.keys(managedObject).map((key, index) => (
            <React.Fragment key={index}>
                <label htmlFor={key}>{managedObject[key].label}</label>
                {
                    managedObject[key].type === "textarea"
                    ? <textarea
                        name={key}
                        onChange={(e) => this.props.updateKataValue(e, key, inputIndex)}
                        value={managedObject[key].value}
                    />
                    
                    : key !== "tests"
                        ? <input type={managedObject[key].type}
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
