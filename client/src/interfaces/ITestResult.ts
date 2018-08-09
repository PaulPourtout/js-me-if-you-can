export interface ITestResult {
    success: boolean;
    message: string;
    actual: any;
    expected: any;
    arg: any;
  }