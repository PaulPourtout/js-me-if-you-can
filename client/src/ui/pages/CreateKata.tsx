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
import styled from "styled-components";
import { IKata } from '../../interfaces/IKata';
import { EditKata } from '../components/EditKata';
import { URL_API } from '../../utils/config/URL_API';
import { IInput } from '../../interfaces/IInput';
import { NEW_KATA } from "../../utils/NewKataTemplate";
import { INewKata } from "../../interfaces/INewKata";
import { ITest } from "../../interfaces/ITest";
import {ColorPalette} from "../style/Palette";

interface Props {
    kata: INewKata
}

interface State {
    newKata: INewKata;
    existingKata?: INewKata;
}

class CreateKataPageComponent extends React.Component<any, State> {
    private IS_NEW_KATA = this.props.match.params.id === "new";
    state = {
        newKata: NEW_KATA
    }

    componentWillMount() {
        if (!this.IS_NEW_KATA) {
            fetch(`${URL_API}/katas/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(res => {
                if (res.result) {
                    this.setState({newKata: this.prepareKataForEditing(res.result)})
                }
            })
            .catch(err => console.error(err))
        }
    }

    prepareKataForEditing = (kata:IKata) => {
        const kataToEdit: INewKata = {
            title: { label: "title", value: kata.description.title, type: "text" },
            descriptionContent: { label: "description", value: kata.description.content, type: "textarea" },
            example: { label: "example", value: kata.description.example, type: "textarea" },
            functionName: { label: "function name", value: kata.functionName, type: "text" },
            parameterName: { label: "parameter name", value: kata.parameterName, type: "text" },
            tests: []
        }

        kataToEdit.tests = kata.tests.map((test, index) => (
            {
                arg: {
                    label: `test-${index + 1} arguments`,
                    value: test.arg, type: "text" as "text"
                },
                solution: {
                    label: `test-${index + 1} solution`,
                    value: test.solution, type: "text"
                }
            }
        ))

        return kataToEdit;
    }

    updateValue = (e, key, itemIndex ?: number) => {
        const newObject = {...this.state.newKata};

        if (key in newObject && (newObject[key].value || newObject[key].value === "")) {
            newObject[key].value = e.target.value;
        }
        else {
            newObject.tests[itemIndex][key].value = e.target.value;
        }
        this.setState({newKata: newObject})
    }

    createNewKata = (e, kata: INewKata, mode: "create" | "update") => {
        e.preventDefault();
        const {
            title,
            descriptionContent,
            example,
            functionName,
            parameterName,
            tests 
        } = kata

        const URL = this.IS_NEW_KATA
            ? `${URL_API}/katas/`
            : `${URL_API}/katas/${this.props.match.params.id}`;
        const REQUETE_TYPE = this.IS_NEW_KATA ? "POST" : "PUT";

        const kataSchema = {
            functionName: functionName.value,
            parameterName: parameterName.value,
            solution: [],
            description: {
                title: title.value,
                content: descriptionContent.value,
                example: example.value
            },
            tests: []
        }
        kataSchema.tests = tests.map((test:ITest) => ({
                arg: test.arg.value,
                solution: JSON.parse(test.solution.value),
                assertFunc: "equal"
        }));

        fetch(URL, {
            method: REQUETE_TYPE,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(kataSchema)
        })
        .then(res => res.json())
        .then(res => console.log("result",res))
        .catch(err => console.error(err))
    }

    render () {
        return (
            <PageContainer>
            <Card>
                <CardTitle>{this.IS_NEW_KATA ? "Create New" : "Update"} Kata</CardTitle>
                <CardContent>
                    <Form onSubmit={(e) => this.createNewKata(e, this.props.kata, this.props.mode)}>
                        {
                            this.renderForm(this.state.newKata)
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
                    onClick={(e) => this.createNewKata(e, this.props.kata, this.props.mode)}>
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
                    onChange={(e) => this.updateValue(e, key, inputIndex)}
                    value={managedObject[key].value}
                />
                
                : key !== "tests"
                    ? <TextInput type={managedObject[key].type}
                            name={key}
                            onChange={(e) => this.updateValue(e, key, inputIndex)}
                            value={managedObject[key].value}
                    />
                    : this.renderTests(managedObject)
            }
        </React.Fragment>
    ))

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

export const CreateKata = UserListener(CreateKataPageComponent);

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

