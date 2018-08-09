import {ITest} from './ITest';

export interface IKata {
    _id:string;
    functionName: string;
    parameterName: string;
    solutions: IKataSolution[],
    description: IKataDescription,
    tests: ITest[];
    created_at: Date;
    updated_at: Date;
  }

export interface IKataSolution {
  authorName: string;
  authorId: string;
  value: string;
}

export interface IKataDescription {
    title: string;
    content: string;
    example?: string;
}
