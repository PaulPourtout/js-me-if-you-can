import * as React from 'react';
import { UserListener } from '../../context/UserProvider';
import {PageContainer} from "../style/StyledComponents";
import styled from "styled-components";
import { IKata } from '../../interfaces/IKata';
import { EditKata } from '../components/EditKata';
import {URL_API} from '../../utils/config/URL_API';

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
    kata: INewKata
}

interface State {
    newKata: INewKata;
    existingKata?: INewKata;
}


class CreateKataPageComponent extends React.Component<any, State> {
    private newKata: INewKata = {
        title: { label: "title", value: "", type: "text" },
        descriptionContent: { label: "description", value: "", type: "textarea" },
        example: { label: "example", value: "", type: "textarea" },
        functionName: { label: "function name", value: "", type: "text" },
        parameterName: { label: "parameter name", value: "", type: "text" },
        tests :[
            {
                arg: { label: "test-1 arguments", value: "", type: "text"},
                solution: { label: "test-1 solution", value: "", type: "text"}
            },
            {
                arg: { label: "test-2 arguments", value: "", type: "text"},
                solution: { label: "test-2 solution", value: "", type: "text"}
            }
        ]
    }


    state = {
        newKata: this.newKata
    }

    componentWillMount() {
        if (this.props.match.params.id !== "new") {
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
                arg: { label: `test-${index + 1} arguments`, value: test.arg, type: "text" as "text"},
                solution: { label: `test-${index + 1} solution`, value: test.solution, type: "text"}
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
        const {title, descriptionContent, example, functionName, parameterName, tests} = kata
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
        }))

        if (mode === "create") {
            fetch(`${URL_API}/katas/`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(kataSchema)
            })
            .then(res => res.json())
            .then(res => console.log("result",res))
            .catch(err => console.error(err))
        } else {
            fetch(`${URL_API}/katas/${this.props.match.params.id}`, {
                method: "PUT",
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
    }

    deleteKata = (e) => {
        e.preventDefault();

        fetch(`${URL_API}/katas/${this.props.match.params.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => console.log("result", res))
        .catch(err => console.error(err))
    }

    render () {
        console.log(this.state);
        return (
            <EditKata kata={this.state.newKata}
                    updateKataValue={this.updateValue}
                    mode={this.props.match.params.id === "new" ? "create" : "update"}
                    createOrUpdateKata={this.createNewKata}
                    deleteKata={this.deleteKata}
            />
        )
    }
}

export const CreateKata = UserListener(CreateKataPageComponent);
