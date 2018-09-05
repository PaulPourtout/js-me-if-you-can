import { IInput } from "./IInput";

export interface ITest {
    arg: IInput | any;
    solution: IInput | any;
    assertFunc?: string;
}

