import { makeAutoObservable } from 'mobx';

class QuestionStore {
    questions = [];
    selectedQuestions = [];

    constructor() {
        makeAutoObservable(this);
    }

    setQuestions(questions) {
        this.questions = questions;
    }

    toggleQuestion(question) {
        if (this.selectedQuestions.includes(question)) {
            this.selectedQuestions = this.selectedQuestions.filter(q => q !== question);
        } else {
            if (this.selectedQuestions.length < 10) {
                this.selectedQuestions.push(question);
            } else {
                alert("10개 이상 선택할 수 없습니다.");
            }
        }
    }

    get selectedCount() {
        return this.selectedQuestions.length;
    }
}

const questionStore = new QuestionStore();
export default questionStore;
