import {IInput} from "../interfaces/IInput";
import {ITest} from "../interfaces/ITest";

export interface INewKata {
    title: IInput;
    descriptionContent: IInput;
    example: IInput;
    functionName: IInput;
    parameterName: IInput;
    tests: ITest[]
}
