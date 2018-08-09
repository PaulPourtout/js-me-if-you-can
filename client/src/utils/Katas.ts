export default [
  /**
   * Every katas of the platform are here.
   * - functionName : a string that'll be called to test the function
   * - Description :
   *
   *
   * In tests :
   * String arguments require double quotes + simple quotes because of the eval
   *
   * */

  {
    _id: 0,
    functionName: "sayHello",
    parameterName: "name",
    solutions: [],
    description: {
      title: "SayHello",
      content: `Return the string "Hello, " plus the string in argument.\nEx: sayHello('World') => "Hello, World"`
    },
    tests: [
      { arg: "'World'", solution: "Hello, World", assertFunc: "equal" },
      { arg: "'Neo'", solution: "Hello, Neo", assertFunc: "equal" },
      { arg: "'42'", solution: "Hello, 42", assertFunc: "equal" },
      { arg: "''", solution: "Hello, ", assertFunc: "equal" },
      { arg: "'Nicolas'", solution: "Hello, Nicolas", assertFunc: "equal" }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 0,
    functionName: "getFirstGreaterThanSecond",
    parameterName: "arg1, arg2",
    solutions: [],
    description: {
      title: "getFirstGreaterThanSecond",
      content: `Given two arguments arg1 and arg2, you must return true if first argument is greater or false if it is not.`
    },
    tests: [
      { arg: "1, 2", solution: false, assertFunc: "equal" },
      { arg: "234, 5", solution: true, assertFunc: "equal" },
      { arg: "2001, 2001", solution: false, assertFunc: "equal" },
      { arg: "43243423, 897978", solution: true, assertFunc: "equal" },
      { arg: "0, 01", solution: false, assertFunc: "equal" }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 0,
    functionName: "getArgumentsSum",
    parameterName: "a, b",
    solutions: [],
    description: {
      title: "getArgumentsSum",
      content: `Return the sum of both arguments`
    },
    tests: [
      { arg: "2, 2", solution: 4, assertFunc: "equal" },
      { arg: "0, 0", solution: 0, assertFunc: "equal" },
      { arg: "123, 456", solution: 579, assertFunc: "equal" }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 0,
    functionName: "getSquare",
    parameterName: "x",
    solutions: [],
    description: {
      title: "Get square of a number",
      content: `Given a number x, return its square.`
    },
    tests: [
      { arg: "2", solution: 4, assertFunc: "equal" },
      { arg: "56", solution: 3136, assertFunc: "equal" },
      { arg: "42", solution: 1764, assertFunc: "equal" },
      { arg: "0", solution: 0, assertFunc: "equal" },
      { arg: "540", solution: 291600, assertFunc: "equal" }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 0,
    functionName: "revertString",
    parameterName: "str",
    solutions: [],
    description: {
      title: "revertString",
      content: `Return the string with letters in inverted order. Ex: revertString('Hello') => "olleH"`
    },
    tests: [
      { arg: "'Hello'", solution: "olleH", assertFunc: "equal" },
      { arg: "''", solution: "", assertFunc: "equal" },
      { arg: "'Twelves Monkeys'", solution: "syeknoM sevlewT", assertFunc: "equal" },
      { arg: "'There is no spoon'", solution: "noops on si erehT", assertFunc: "equal" },
      { arg: "'123456'", solution: "654321", assertFunc: "equal" }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 0,
    functionName: "isPalindrome",
    parameterName: "str",
    solutions: [],
    description: {
      title: "Find the palindrome",
      content: `Given a string. Check if it is a palindrome. Make the function case insensitive`
    },
    tests: [
      { arg: "'doggod'", solution: true, assertFunc: "equal" },
      { arg: "'Kayak'", solution: true, assertFunc: "equal" },
      { arg: "'canoe'", solution: false, assertFunc: "equal" },
      { arg: "'zrjfel:,zklefnzakd'", solution: false, assertFunc: "equal" },
      { arg: "'hlbeeykqqqqkyeeblh'", solution: true, assertFunc: "equal" },
      { arg: "'abcd'", solution: false, assertFunc: "equal" },
      { arg: "'z'", solution: false, assertFunc: "equal" }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 0,
    functionName: "remove",
    parameterName: "str",
    solutions: [],
    description: {
      title: "removeQuestionMarks",
      content: `Remove all question marks from the end of sentence. Ex: remove("?How are you????") === "?How are you"`
    },
    tests: [
      { arg: "'?You talkin’ to me????'", solution: "?You talkin’ to me", assertFunc: "equal" },
      {
        arg: "'Aren’t you a little short for a stormtrooper??'",
        solution: "Aren’t you a little short for a stormtrooper",
        assertFunc: "equal"
      },
      { arg: "'What’s in the box????'", solution: "What’s in the box", assertFunc: "equal" },
      {
        arg: "'Shall we play a game???!?'",
        solution: "Shall we play a game???!",
        assertFunc: "equal"
      },
      { arg: "'Who ?ya gonna call??'", solution: "Who ?ya gonna call", assertFunc: "equal" },
      { arg: "''", solution: "", assertFunc: "equal" }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 0,
    functionName: "greatestNumber",
    parameterName: "arr",
    solutions: [],
    description: {
      title: "Find the greatest number",
      content: `Given an array of numbers, find the greatest number and return it.`
    },
    tests: [
      { arg: "[1, 5, -3, 7, -6, 3]", solution: 7, assertFunc: "equal" },
      { arg: "[1, 5]", solution: 5, assertFunc: "equal" },
      { arg: "[1, 2, 3.23, 0]", solution: 3.23, assertFunc: "equal" },
      { arg: "[1, 0, 1, 0, 1000]", solution: 1000, assertFunc: "equal" },
      { arg: "[-23, 4.34, -3.43, 8, -12]", solution: 8, assertFunc: "equal" },
      { arg: "[0, -23.5, -3, -8, -12]", solution: 0, assertFunc: "equal" }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 0,
    functionName: "greatestProduct",
    parameterName: "arr",
    solutions: [],
    description: {
      title: "Find the greatest product",
      content: `Given an array of integers, find the pair of adjacent elements that has the largest product and return that product.\nEx: [1, 5, -3, -6, 3, 7] returns 21 (3 * 7)`
    },
    tests: [
      { arg: "[1, 5, -3, -6, 3, 7]", solution: 21, assertFunc: "equal" },
      { arg: "[1, 5]", solution: 5, assertFunc: "equal" },
      { arg: "[1, 2, 3, 0]", solution: 6, assertFunc: "equal" },
      { arg: "[1, 0, 1, 0, 1000]", solution: 0, assertFunc: "equal" },
      { arg: "[-23, 4, -3, 8, -12]", solution: -12, assertFunc: "equal" }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
  //   {
  //     _id: 0,
  //     functionName: "everyPossiblePair",
  //     parameterName: "arr",
  //     solutions: [],
  //     description: {
  //       title: "everyPossiblePair",
  //       content: `Given an array of students names find every possible pair you can make with those students.
  //       Each pair is sorted by alphabetical order and and the array containing all the pairs is sorted the same way.`
  //     },
  //     tests: [
  //       {
  //         arg: "['Jon', 'Tyrion', 'Daenerys']",
  //         solution: [['Daenerys', 'Jon'],['Daenerys', 'Tyrion'],['Jon', 'Tyrion']],
  //         assertFunc: "equal"
  //       },
  //       {
  //         arg: "['John', 'Paul', 'George', 'Ringo']",
  //         solution: [
  //           ['George', 'John'],
  //           ['George', 'Paul'],
  //           ['George', 'Ringo'],
  //           ['John', 'Paul'],
  //           ['John', 'Ringo'],
  //           ['Paul', 'Ringo']
  //         ],
  //         assertFunc: "equal"
  //       },
  //       {
  //         arg: "['Jeff', 'Britta', 'Abed', 'Pierce', 'Shirley', 'Troy', 'Annie']",
  //         solution: [
  //           ['Abed', 'Annie'],
  //           ['Abed', 'Britta'],
  //           ['Abed', 'Jeff'],
  //           ['Abed', 'Pierce'],
  //           ['Abed', 'Shirley'],
  //           ['Abed', 'Troy'],
  //           ['Annie', 'Britta'],
  //           ['Annie', 'Jeff'],
  //           ['Annie', 'Pierce'],
  //           ['Annie', 'Shirley'],
  //           ['Annie', 'Troy'],
  //           ['Britta', 'Jeff'],
  //           ['Britta', 'Pierce'],
  //           ['Britta', 'Shirley'],
  //           ['Britta', 'Troy'],
  //           ['Jeff', 'Pierce'],
  //           ['Jeff', 'Shirley'],
  //           ['Jeff', 'Troy'],
  //           ['Pierce', 'Shirley'],
  //           ['Pierce', 'Troy'],
  //           ['Shirley', 'Troy']
  //         ],
  //         assertFunc: "equal"
  //       },
  //     ]
  //   },
];
