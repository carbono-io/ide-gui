'use strict';

/**
 * Carbo-inquirer is the component responsible for 
 * asking questions to the user.
 */

/**
FROM: inquirer (node module)

type: (String) Type of the prompt. Defaults: input - Possible values: input, confirm, list, rawlist, password
name: (String) The name to use when storing the answer in the answers hash.
message: (String|Function) The question to print. If defined as a function, the first parameter will be the current inquirer session answers.
default: (String|Number|Array|Function) Default value(s) to use if nothing is entered, or a function that returns the default value(s). If defined as a function, the first parameter will be the current inquirer session answers.
choices: (Array|Function) Choices array or a function returning a choices array. If defined as a function, the first parameter will be the current inquirer session answers.
Array values can be simple strings, or objects containing a name (to display) and a value properties (to save in the answers hash). Values can also be a Separator.
validate: (Function) Receive the user input and should return true if the value is valid, and an error message (String) otherwise. If false is returned, a default error message is provided.
filter: (Function) Receive the user input and return the filtered value to be used inside the program. The value returned will be added to the Answers hash.
when: (Function, Boolean) Receive the current user answers hash and should return true or false depending on whether or not this question should be asked. The value can also be a simple boolean.
 */

// CONSTANTS
var MOCK_QUESTIONS = [];
MOCK_QUESTIONS.push({
    type: 'input',  // input, confirm, list, rawlist, password
    message: 'Qual o seu nome?'
});
MOCK_QUESTIONS.push({
    type: 'list',
    message: 'Qual o seu chocolate preferido?'
});
MOCK_QUESTIONS.push({
    type: 'password',
    message: 'Qual o nome do seu cachorro?'
});

var CanvasIntegrationBehavior = require('./scripts/behaviors/canvas-integration');

Polymer({
    is: 'carbo-inquirer',

    properties: {
        /**
         * Array of questions to be asked.
         * @type {Object}
         */
        questions: {
            type: Array,
            notify: true,
            observer: '_handleQuestionsChange',

            value: MOCK_QUESTIONS,
        },

        /**
         * Index of the current question being asked
         */
        currentQuestionIndex: {
            type: Number,
            notify: true,
            observer: '_handleCurrentQuestionIndexChange',

            value: 0,
        },

        isAtLastQuestion: {
            type: Boolean,
            notify: true,

            value: false,
        },

        isAtFirstQuestion: {
            type: Boolean,
            notify: true,

            value: true,
        }
    },

    behaviors: [
        CanvasIntegrationBehavior,
    ],

    /**
     * Question navigation
     */
    gotoQuestion: function (qIndex) {
        this.set('currentQuestionIndex', qIndex);
    },

    gotoPreviousQuestion: function () {

        if (this.get('isAtFirstQuestion')) {
            alert('you are just starting, c\'mon!');
        } else {
            // not the last, go on!
            this.set('currentQuestionIndex', this.get('currentQuestionIndex') - 1);
        }

    },

    gotoNextQuestion: function () {

        if (this.get('isAtLastQuestion')) {
            alert('you have completed the stuff');
        } else {
            // not the last, go on!
            this.set('currentQuestionIndex', this.get('currentQuestionIndex') + 1);
        }
    },

    // Auxiliary functions
    /**
     * Checks whether a question is of a given type.
     * Used during templating
     */
    isQuestionNotOfType: function (question, type) {
        return question.type !== type;
    },

    // Event handlers
    
    /**
     * Whenever the questions array changes, we must notify the
     * 'currentQuestionIndex', so that the 'iron-pages' component updates itself
     */
    _handleQuestionsChange: function (questions, oldQuestions) {
        console.log('questions changed')
        console.log(questions);
    },

    /**
     * Whenever the currentQuestionIndex changes, we must notify the people.
     */
    _handleCurrentQuestionIndexChange: function (currentQuestionIndex, lastQuestionIndex) {
        var current = this.get('currentQuestionIndex');
        // check if the current question is the first one
        var isFirst = current === 0;
        // check if the current question is the first one
        var isLast  = (current === this.questions.length - 1);

        this.set('isAtFirstQuestion', isFirst);
        this.set('isAtLastQuestion', isLast);
    },
});
