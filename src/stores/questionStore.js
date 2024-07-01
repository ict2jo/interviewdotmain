import { makeAutoObservable } from 'mobx';

class QuestionStore {
    q_idx = "";
    questions = [];
    selectedQuestions = [];
    currentPage = 1;
    itemsPerPage = 8;

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
            if (this.selectedQuestions.length < 3) {
                this.selectedQuestions.push(question);
            } else {
                alert("3개 이상 선택할 수 없습니다.");
            }
        }
    }


    get selectedCount() {
        return this.selectedQuestions.length;
    }

    setPage(page) {
        this.currentPage = page;
    }

    getPage() {
        return this.currentPage;
    }
}

const questionStore = new QuestionStore();
export default questionStore;
