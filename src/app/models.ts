export interface QuestionData {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
}

export interface APIResponse {
    response_code: number,
    results: QuestionData[]
}

export interface AnswerStatus {
    clicked: boolean;
    checked: boolean;
}

export enum ANSWER_CLASS {
    ANSWER = "answer",
    ANSWER_CLICKED = "answer clicked",
    ANSWER_WRONG = "answer wrong",
    ANSWER_RIGHT = "answer right"
}

export enum BUTTON_CLASS {
    OK = "ok-button",
    ACTIVE = "ok-button active",
}

export enum BUTTON_TEXT {
    OK = "OK",
    CONTINUE = "CONTINUE",
    LOAD_MORE = "MORE QUESTIONS"
}