import { INewKata } from "../interfaces/INewKata";

export const NEW_KATA: INewKata = {
    title: { label: "title", value: "", type: "text" },
    descriptionContent: { label: "description", value: "", type: "textarea" },
    example: { label: "example", value: "", type: "textarea" },
    functionName: { label: "function name", value: "", type: "text" },
    parameterName: { label: "parameter name", value: "", type: "text" },
    tests: [
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
