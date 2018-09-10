import { ITestResult } from "../../interfaces/ITestResult";

var assert = require('chai').assert;
const ITestResult = require('../../interfaces/ITestResult');


module.exports = function (self) {
    self.addEventListener("message", (e) => {
        const {code, kata} = e.data;
        const results: ITestResult[] = [];

        kata.tests.map((test) => {
            let result: ITestResult;

            try {
                // console.log(test);
                // eval executed in a safe environnement to test user's code
                const func = eval(`${code} ${kata.functionName}(${test.arg.value})`)

                // Test user's code
                assert[test.assertFunc](JSON.stringify(func), JSON.stringify(test.solution.value));

                // If succeded return a "passed" object
                result = {
                    success: true,
                    message: `returned : ${JSON.stringify(test.solution.value)} / Passed`,
                    actual: JSON.stringify(func),
                    expected: JSON.stringify(test.solution.value),
                    arg: JSON.stringify(test.arg.value)
                }
            }
            catch (e) {
                // If test fails, return a "failed" object
                const {message, actual, expected} = e;
                result = {
                    success: false,
                    message,
                    actual: `${JSON.stringify(actual)}`,
                    expected: JSON.stringify(expected),
                    arg: JSON.stringify(test.arg.value)
                };
            }
            results.push(result);
        });
        self.postMessage(results);
    })
}
