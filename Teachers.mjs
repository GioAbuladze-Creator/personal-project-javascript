import Persons from './Persons.mjs';
export default class Teachers extends Persons{
    #teacherValidation(teacher){
        // check emails
        if(!teacher.hasOwnProperty('emails')||!Array.isArray(teacher.emails)||teacher.emails.length===0){
            throw new Error('Invalid Emails')
        }
        for(let email of teacher.emails){
            let regex= /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
            if(!email.hasOwnProperty('email')||typeof email.email!=='string'||email.email.length===0 || !regex.test(email.email)){
                throw new Error('Invalid Email')
            }
            if(!email.hasOwnProperty('primary')||typeof email.primary!=='boolean'){
                throw new Error('Invalid Email')
            }
        }
        // check subjects
        if(!teacher.hasOwnProperty('subjects')||!Array.isArray(teacher.subjects)||teacher.subjects.length===0){
            throw new Error('Invalid Subjects')
        }
        for(let subject of teacher.subjects){
            if(!subject.hasOwnProperty('subject')||typeof subject.subject!=='string'||subject.subject.length===0){
                throw new Error('Invalid Subject')
            }
        }
    }
    add(teacher){
        // custom validation
        this.#teacherValidation(teacher);

        // Person returns Object instead of id so...
        return super.add(teacher).id;
    }
    update(id, teacher){
        // custom validation
        this.#teacherValidation(teacher);

        super.update(id, teacher);
    }
    
}
