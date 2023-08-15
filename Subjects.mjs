export default class Subjects {
    #subjectList;
    #checkIfValid(subj){
        if (typeof subj !== 'object' || Array.isArray(subj) || subj === null || Object.keys(subj) == 0) {
            throw new Error("Invalid Object")
        }
        if(!subj.hasOwnProperty('title')||!subj.hasOwnProperty('lessons')){
            throw new Error('Invalid Object')
        }
        if(typeof subj.title !== 'string'||typeof subj.lessons !== 'number' || isNaN(subj.lessons) || subj.lessons<0){
            throw new Error('Invalid Object')
        }
        if(subj.hasOwnProperty('description')&&typeof subj.description !== 'string'){
            throw new Error('Invalid Object')
        }
    }
    constructor() {
        this.#subjectList = new Map();
    }
    add(subj) {
        if(arguments.length !== 1){
            throw new Error('Invalid arguments');
        }
        this.#checkIfValid(subj);

        // checks subject title and lesson number and throws error if subject already exists
        for(let i of this.#subjectList.values()){
            if(i.title === subj.title&&i.lessons === subj.lessons&&i.description === subj.description){
                throw new Error('Subject already exists');
            }
        }
        let id = Math.random().toString(36).slice(2);
        this.#subjectList.set(id, subj);
        return id;
    }
    remove(id) {
        if (arguments.length !== 1) {
            throw new Error('Invalid arguments');
        }
        if(typeof id !== 'string' || id.length === 0){
            throw new Error('Invalid id')
        }
        if (this.#subjectList.has(id)) {
            this.#subjectList.delete(id);
        } else {
            throw new Error('Invalid id')
        }
    }
    verify(subj) {
        if (arguments.length !== 1) {
            throw new Error('Invalid arguments');
        }
        this.#checkIfValid(subj);
        
        for(let i of this.#subjectList.values()){
            if(subj.title===i.title){
                return true;
            }
        }
        return false;
        
    }
    readAll() {
        if (arguments.length !== 0) {
            throw new Error('Invalid arguments');
        }
        // add id in each subject
        for(let i of this.#subjectList){
            i[1].id=i[0];
        }
        console.log([...this.#subjectList.values()])
        return [...this.#subjectList.values()];
    }

}

// const history = {
//     title: 'History',
//     lessons: 24
// };
// const math = {
//     title: 'Math',
//     lessons: 30,
//     desc:'math is fun'
// };
// const physics = {
//     title: 'Physics',
//     lessons: 15,
//     desc:'physics is dangerous',
// };

// const subjects = new Subjects();

// const id = subjects.add(history); 
// const id2 = subjects.add(math); 
// const id3 = subjects.add(physics); 
// subjects.readAll();
// console.log(subjects.verify(id3));
// subjects.remove(id2);
// subjects.readAll();