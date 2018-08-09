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
                // eval executed in a safe environnement to test user's code
                const func = eval(`${code} ${kata.functionName}(${test.arg})`)

                // Test user's code
                assert[test.assertFunc](JSON.stringify(func), JSON.stringify(test.solution));

                // If succeded return a "passed" object
                result = {
                    success: true,
                    message: `returned : ${JSON.stringify(test.solution)} / Passed`,
                    actual: JSON.stringify(func),
                    expected: JSON.stringify(test.solution),
                    arg: JSON.stringify(test.arg)
                }
            }
            catch (e) {
                // If test fails, return a "failed" object
                const {message, actual, expected} = e;
                result = {
                    success: false,
                    message, actual: `${JSON.stringify(actual)}`,
                    expected: JSON.stringify(expected),
                    arg: JSON.stringify(test.arg)
                };
            }
            results.push(result);
        });
        self.postMessage(results);
    })
}
