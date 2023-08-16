import Persons from './Persons.mjs';
export default class Teachers extends Persons {
    #required = ['name', 'dateOfBirth', 'emails', 'phones', 'sex', 'subjects'];
    #validateId(id) {
        if (typeof id !== "string") {
            throw new Error("read method accepts id as a string");
        }
    }
    #validateObject(object, name) {
        if (typeof object !== "object" || object == null || Array.isArray(object)) {
            throw new Error(`${name} must be an object`);
        }
    }
    #teacherValidation(teacher, allRequired = true) {
        this.#validateObject(teacher, 'Teacher');
        for (let key of Object.keys(teacher)) {
            if (!this.#required.includes(key) && key !== 'description') {
                throw new Error(`Invalid property: ${key}`)
            }
        }

        if (allRequired) {
            for (let key of this.#required) {
                if (!teacher.hasOwnProperty(key)) {
                    throw new Error(`Invalid ${key}`)
                }
            }
        }
        // check emails
        if (teacher.emails && (!Array.isArray(teacher.emails) || teacher.emails.length === 0)) {
            throw new Error('Invalid Emails')
        }
        if (teacher.emails) {
            for (let email of teacher.emails) {
                let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
                this.#validateObject(email, 'Email');
                if (Object.keys(email).length != 2) {
                    throw new Error('Invalid Email')
                }
                if (!email.hasOwnProperty('email') || typeof email.email !== 'string' || email.email.length === 0 || !regex.test(email.email)) {
                    throw new Error('Invalid Email')
                }
                if (!email.hasOwnProperty('primary') || typeof email.primary !== 'boolean') {
                    throw new Error('Invalid Email')
                }
            }
        }
        // check subjects
        if (teacher.subjects && (!Array.isArray(teacher.subjects) || teacher.subjects.length === 0)) {
            throw new Error('Invalid Subjects')
        }
        if (teacher.subjects) {
            for (let subject of teacher.subjects) {
                this.#validateObject(subject, 'Subject');
                if (Object.keys(subject).length != 1) {
                    throw new Error('Invalid Subject')
                }
                if (!subject.hasOwnProperty('subject') || typeof subject.subject !== 'string' || subject.subject.length === 0) {
                    throw new Error('Invalid Subject')
                }
            }
        }
    }
    add(teacher) {
        // custom validation
        this.#teacherValidation(teacher);

        // Person returns Object instead of id so...
        return super.add(teacher).id;
    }
    update(id, teacher) {
        // custom validation
        this.#teacherValidation(teacher, false);

        return super.update(id, teacher);
    }

}

let teacher1 = {
    name: {
        first: "Gio",
        last: "Carvanjo",
    },
    dateOfBirth: "14-8-2023",
    emails: [
        {
            email: "maths@gmail.com",
            primary: false,
        }
    ],
    phones: [
        {
            phone: "+995 (557) 07-88-87", // +995 (XXX) XX-XX-XX
            primary: true,
        }
    ],
    sex: "Female",
    subjects: [
        {
            subject: "History",
        },
        {
            subject: "s",
            subject: "s",
        }
    ],
    description: "Have Fun!",
}
let teachers = new Teachers();
let teacherId= teachers.add(teacher1);
console.log(teacherId)
console.log(teachers.read(teacherId))
teachers.update(teacherId, {name: {first: "zuzu", last: "zuzuzuzu"}})
console.log(teachers.read(teacherId))
teachers.remove(teacherId)
console.log(teachers.read(teacherId))
