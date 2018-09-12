import * as React from "react";
import {ITestResult} from "../../interfaces/ITestResult";

interface Props {
  code: string;
  exercise: any;
  handlePassedKata: () => void;
  testResults: ITestResult[];
  handleDisplayTestResult: (testResults: any) => void;
  style?: any;
}

export default class CodeTest extends React.Component<Props, {}> {
  componentDidMount() {}

  render() {
    return (
      <div style={{ flex: 1, backgroundColor: "#000", padding: "5px 20px", textAlign: "left" }}>
        {this.props.testResults.map((result: ITestResult, index: number) => {
          const color: string = result.success ? "green" : "red";
          console.log("result", result)
          return (
            <div key={index}>
              <p style={{ color: "#FFF" }}> =========== </p>
              <p style={{ color }}> $ arguments : {result.arg}</p>
              <p style={{ color }}> $ {result.message}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
