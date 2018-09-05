module.exports = [
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
      functionName: "sayHello",
      parameterName: "name",
      solutions: [],
      description: {
        title: "SayHello",
        content: `Return the string "Hello, " plus the string in argument.\nEx: sayHello('World') => "Hello, World"`
      },
      tests: [
        { 
          arg: { value: "'World'", isString: true },
          solution: { value: "Hello, World", isString: true },
          assertFunc: "equal"
        },
        {
          arg: {value: "'Neo'", isString: true},
          solution: {value: "Hello, Neo", isString: true},
          assertFunc: "equal" },
        {
          arg: {value: "'42'", isString: true},
          solution: {value: "Hello, 42", isString: true},
          assertFunc: "equal"
        },
        { 
          arg: {value: "''", isString: true},
          solution: {value: "Hello, ", isString: true},
          assertFunc: "equal"
        },
        {
          arg: {value: "'Nicolas'", isString: true},
          solution: {value: "Hello, Nicolas", isString: true},
          assertFunc: "equal"
        }
      ],
    },
    {
      functionName: "getFirstGreaterThanSecond",
      parameterName: "arg1, arg2",
      solutions: [],
      description: {
        title: "getFirstGreaterThanSecond",
        content: `Given two arguments arg1 and arg2, you must return true if first argument is greater or false if it is not.`
      },
      tests: [
        {
          arg: {value: "1, 2", isString: false},
          solution: {value: false, isString: false},
          assertFunc: "equal"
        },
        {
          arg: {value: "234, 5", isString: false},
          solution: {value: true, isString: false},
          assertFunc: "equal"
        },
        {
          arg: {value: "2001, 2001", isString: false},
          solution: {value: false, isString: false},
          assertFunc: "equal"
        },
        {
          arg: {value: "43243423, 897978", isString: false},
          solution: {value: true, isString: false},
          assertFunc: "equal"
        },
        {
          arg: {value: "0, 01", isString: false},
          solution: {value: false, isString: false},
          assertFunc: "equal"
        }
      ],
    },
    {
      functionName: "getArgumentsSum",
      parameterName: "a, b",
      solutions: [],
      description: {
        title: "getArgumentsSum",
        content: `Return the sum of both arguments`
      },
      tests: [
        {
          arg: {value: "2, 2", isString: false},
          solution: {value: 4, isString: false},
          assertFunc: "equal"
        },
        {
          arg: {value: "0, 0", isString: false},
          solution: {value: 0, isString: false},
          assertFunc: "equal"
        },
        {
          arg: {value: "123, 456", isString: false},
          solution: {value: 579, isString: false},
          assertFunc: "equal"
        }
      ],
    },
    {
      functionName: "getSquare",
      parameterName: "x",
      solutions: [],
      description: {
        title: "Get square of a number",
        content: `Given a number x, return its square.`
      },
      tests: [
        {
          arg: {value: "2", isString: false},
          solution: {value: 4, isString: false},
          assertFunc: "equal"
        },
        { 
          arg: {value: "56"}, 
          solution: {value: 3136, isString: false},
          assertFunc: "equal" 
        },
        { 
          arg: {value: "42"}, 
          solution: {value: 1764, isString: false},
          assertFunc: "equal" 
        },
        { 
          arg: {value: "0"}, 
          solution: {value: 0, isString: false},
          assertFunc: "equal" 
        },
        { 
          arg: {value: "540"}, 
          solution: {value: 291600, isString: false},
          assertFunc: "equal" 
        }
      ],
    },
    {
      functionName: "revertString",
      parameterName: "str",
      solutions: [],
      description: {
        title: "revertString",
        content: `Return the string with letters in inverted order. Ex: revertString('Hello') => "olleH"`
      },
      tests: [
        {
          arg: {value: "'Hello'", isString: true},
          solution: "olleH",
          assertFunc: "equal"
        },
        {
          arg: {value: "''", isString: true},
          solution: "",
          assertFunc: "equal"
        },
        {
          arg: {value: "'Twelves Monkeys'", isString: true},
          solution: "syeknoM sevlewT",
          assertFunc: "equal"
        },
        {
          arg: {value: "'There is no spoon'", isString: true},
          solution: "noops on si erehT",
          assertFunc: "equal"
        },
        {
          arg: {value: "'123456'", isString: true},
          solution: "654321",
          assertFunc: "equal"
        }
      ],
    },
    {
      functionName: "isPalindrome",
      parameterName: "str",
      solutions: [],
      description: {
        title: "Find the palindrome",
        content: `Given a string. Check if it is a palindrome. Make the function case insensitive`
      },
      tests: [
        {
          arg: {value: "'doggod'", isString: true}, 
          solution: {value: true, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "'Kayak'", isString: true}, 
          solution: {value: true, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "'canoe'", isString: true}, 
          solution: {value: false, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "'zrjfel:,zklefnzakd'", isString: true}, 
          solution: {value: false, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "'hlbeeykqqqqkyeeblh'", isString: true}, 
          solution: {value: true, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "'abcd'", isString: true}, 
          solution: {value: false, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "'z'", isString: true}, 
          solution: {value: false, isString: false},
          assertFunc: "equal"
        }
      ],
    },
    {
      functionName: "remove",
      parameterName: "str",
      solutions: [],
      description: {
        title: "removeQuestionMarks",
        content: `Remove all question marks from the end of sentence. Ex: remove("?How are you????") === "?How are you"`
      },
      tests: [
        {
          arg: {value: "'?You talkin’ to me????'", isString: true},
          solution: {value: "?You talkin’ to me", isString: true},
          assertFunc: "equal"
        },
        {
          arg: {value: "'Aren’t you a little short for a stormtrooper??'", isString: true},
          solution: {value: "Aren’t you a little short for a stormtrooper", isString: true},
          assertFunc: "equal"
        },
        {
          arg: {value: "'What’s in the box????'", isString: true},
          solution: {value: "What’s in the box", isString: true},
          assertFunc: "equal"
        },
        {
          arg: {value: "'Shall we play a game???!?'", isString: true},
          solution: {value: "Shall we play a game???!", isString: true},
          assertFunc: "equal"
        },
        {
          arg: {value: "'Who ?ya gonna call??'", isString: true},
          solution: {value: "Who ?ya gonna call", isString: true},
          assertFunc: "equal" 
        },
        {
          arg: {value: "''", isString: true},
          solution: {value: "", isString: true},
          assertFunc: "equal"
        }
      ],
    },
    {
      functionName: "greatestNumber",
      parameterName: "arr",
      solutions: [],
      description: {
        title: "Find the greatest number",
        content: `Given an array of numbers, find the greatest number and return it.`
      },
      tests: [
        { 
          arg: {value: "[1, 5, -3, 7, -6, 3]", isString: false},
          solution: {value: 7, isString: false},
          assertFunc: "equal" 
        },
        { 
          arg: {value: "[1, 5]", isString: false},
          solution: {value: 5, isString: false},
          assertFunc: "equal" 
        },
        { 
          arg: {value: "[1, 2, 3.23, 0]", isString: false},
          solution: {value: 3.23, isString: false},
          assertFunc: "equal" 
        },
        { 
          arg: {value: "[1, 0, 1, 0, 1000]", isString: false},
          solution: {value: 1000, isString: false},
          assertFunc: "equal" 
        },
        { 
          arg: {value: "[-23, 4.34, -3.43, 8, -12]", isString: false},
          solution: {value: 8, isString: false},
          assertFunc: "equal" 
        },
        { 
          arg: {value: "[0, -23.5, -3, -8, -12]", isString: false},
          solution: {value: 0, isString: false},
          assertFunc: "equal"
        }
      ],
    },
    {
      functionName: "greatestProduct",
      parameterName: "arr",
      solutions: [],
      description: {
        title: "Find the greatest product",
        content: `Given an array of integers, find the pair of adjacent elements that has the largest product and return that product.\nEx: [1, 5, -3, -6, 3, 7] returns 21 (3 * 7)`
      },
      tests: [
        {
          arg: {value: "[1, 5, -3, -6, 3, 7]", isString: false},
          solution: {value: 21, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "[1, 5]", isString: false},
          solution: {value: 5, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "[1, 2, 3, 0]", isString: false},
          solution: {value: 6, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "[1, 0, 1, 0, 1000]", isString: false},
          solution: {value: 0, isString: false},
          assertFunc: "equal" 
        },
        {
          arg: {value: "[-23, 4, -3, 8, -12]", isString: false},
          solution: {value: -12, isString: false},
          assertFunc: "equal"
        }
      ],
    }
    //   {
  
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
  