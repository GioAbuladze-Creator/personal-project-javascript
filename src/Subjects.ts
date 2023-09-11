interface Subject {
    title: string;
    lessons: number;
    description?: string;
}

export default class Subjects {
    private subjectList: Map<string, Subject>;
    private isValidSubject(subject: Subject): void {
        let validFields = ['title', 'lessons', 'description'];
        for (let i in subject) {
            if (!validFields.includes(i)) {
                throw new Error('Invalid subject');
            }
        }
    }

    constructor() {
        this.subjectList = new Map();
    }

    add(subject:Subject):string {
        this.isValidSubject(subject);
        for(let i of this.subjectList.values()){
            if(i.title===subject.title && i.lessons===subject.lessons && i.description===subject.description){
                throw new Error('Subject already exists');
            }
        }

        let id = Math.random().toString(36).slice(2);
        this.subjectList.set(id, subject);
        
        return id;
    }
    remove(id:string):void {
        if(this.subjectList.has(id)){
            this.subjectList.delete(id);
        }else{
            throw new Error('Invalid id');
        }
    }
    verify(subject:Subject):boolean {
        this.isValidSubject(subject);

        for(let i of this.subjectList.values()){
            if(i.title===subject.title){
                return true;
            }
        }
        return false;
    }
    readAll(){
        let arr:Array<{id:string}&Subject> = [];
        for(let i of this.subjectList.entries()){
            arr.push({id:i[0],...i[1]});
        }
        return arr;
    }
}
