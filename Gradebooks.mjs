import Groups from "./groups.mjs";
import Teachers from "./Teachers.mjs";
import Subjects from "./Subjects.mjs";
import Pupils from "./Pupils.mjs";

export default class Gradebooks {
    #gradebooks;
    #validateId(id) {
        if (typeof id !== "string" || id == '') {
            throw new Error("Invalid data type");
        }
    }
    #validateObject(object, name) {
        if (typeof object !== "object" || object == null || Array.isArray(object)) {
            throw new Error(`${name} must be an object`);
        }
    }
    constructor(groups, teachers, subjects) {
        if (!(groups instanceof Groups) || !(teachers instanceof Teachers) || !(subjects instanceof Subjects)) {
            throw new Error("Invalid data type");
        }
        this.groups = groups;
        this.teachers = teachers;
        this.subjects = subjects;
        this.#gradebooks = new Map();
    }
    add(groupId) {
        if (arguments.length !== 1) {
            throw new Error("Invalid number of arguments");
        }
        this.#validateId(groupId);
        for (let { id, room, pupils } of this.groups.readAll()) {
            if (id === groupId) {
                this.#gradebooks.set(id, { id, room, pupils });
                for (let pupil of pupils) {
                    pupil.records = [];
                }
                return id;
            }
        }
        throw new Error("Group not found");
    }
    clear() {
        // Destroy all data inside the gradebook
        if(arguments.length !== 0) {
            throw new Error("Invalid number of arguments");
        }
        this.#gradebooks.clear();
    }
    addRecord(gradebookId, record) {
        if (arguments.length !== 2) {
            throw new Error("Invalid number of arguments");
        }
        this.#validateId(gradebookId);
        // check if gradebook exists
        if (!this.#gradebooks.has(gradebookId)) {
            throw new Error("Gradebook not found");
        }
        // validate record
        this.#validateObject(record, "Record");
        // check if record has all required properties
        if (!record.hasOwnProperty("pupilId") || !record.hasOwnProperty("teacherId") || !record.hasOwnProperty("subjectId") || !record.hasOwnProperty("lesson") || !record.hasOwnProperty("mark")) {
            throw new Error("Invalid record");
        }
        const { pupilId, teacherId, subjectId, lesson, mark } = record;
        // check every property of record
        this.#validateId(pupilId);
        this.#validateId(teacherId);
        this.#validateId(subjectId);
        if (typeof lesson !== "number" || lesson < 1) {
            throw new Error("Invalid lesson");
        }
        if (typeof mark !== "number" || mark < 1) {
            throw new Error("Invalid mark");
        }
        // check if pupil exists
        for (let pupil of this.groups.read(gradebookId).pupils) {
            if (pupil.id === pupilId) {
                break;
            }
            throw new Error("Pupil not found");
        }

        let finalRecord = {};
        // check if teacher has this subject
        for (let subject of subjects.readAll()) {
            if (subject.id === subjectId) {
                for (let subj of this.teachers.read(teacherId).subjects) {
                    if (subj.subject === subject.title) {
                        finalRecord={
                            // finalRecord gets teacher name, subject if teacher has this subject, lesson and mark
                            teacher: this.teachers.read(teacherId).name.first + ' ' + this.teachers.read(teacherId).name.last,
                            subject: subject.title,
                            lesson: record.lesson,
                            mark: record.mark
                        }
                        break;
                    }
                    throw new Error('Teacher does not have this subject')
                }
                break;
            }
            throw new Error("Subject not found in subjects");
        }
        // add finalRecord as a record in gradebook on pupil name
        // check if pupil record already exists
        let pupilRecords = this.#gradebooks.get(gradebookId).pupils.find(pupil => pupil.id === pupilId).records;
        for (let rec of pupilRecords) {
            if (rec.teacher == finalRecord.teacher && rec.lesson === finalRecord.lesson && rec.subject === finalRecord.subject && rec.mark === finalRecord.mark) {
                throw new Error("Record already exists");
            }
        }
        this.#gradebooks.get(gradebookId).pupils.find(pupil => pupil.id === pupilId).records.push({...finalRecord});
    }
    read(gradebookId, pupilId) {
        if (arguments.length !== 2) {
            throw new Error("Invalid number of arguments");
        }
        this.#validateId(gradebookId);
        this.#validateId(pupilId);
        // check if gradebook exists
        if (!this.#gradebooks.has(gradebookId)) {
            throw new Error("Gradebook not found");
        }
        // check if pupil exists
        for (let pupil of this.#gradebooks.get(gradebookId).pupils) {
            if (pupil.id === pupilId) {
                return {
                    name: pupil.name.first + ' ' + pupil.name.last,
                    records: pupil.records
                };
            }
        }
        throw new Error("Pupil not found");
    }
    readAll(gradebookId) {
        if(arguments.length !== 1) {
            throw new Error("Invalid number of arguments");
        }
        this.#validateId(gradebookId);
        for (let [id, gradebook] of this.#gradebooks) {
            if (id === gradebookId) {
                return gradebook;
            }
        }
        throw new Error("Gradebook not found");
    }
}


const groups = new Groups();
const teachers = new Teachers();
const subjects = new Subjects();


let groupId = groups.add(100);
let groupId2 = groups.add(777);


const pupils = new Pupils();
const data = {
    name: {
        first: "Michael",
        last: "Jordan"
    },
    dateOfBirth: "05-02-1970", // dd-mm-yyyy
    phones: [
        {
            phone: "+995 (551) 12-13-73", // +995 (XXX) XX-XX-XX
            primary: true,
        }
    ],
    sex: "male", // male OR female
    description: "Basketball player"
}
const data2 = {
    name: {
        first: "Cristiano",
        last: "Ronaldo"
    },
    dateOfBirth: "11-04-1988", // dd-mm-yyyy
    phones: [
        {
            phone: "+995 (566) 23-13-77", // +995 (XXX) XX-XX-XX
            primary: true,
        }
    ],
    sex: "male", // male OR female
    description: "Football player"
}
// Create a new pupil
const pupil = pupils.add(data);
const pupil2 = pupils.add(data2);
groups.addPupil(groupId, pupil);
groups.addPupil(groupId, pupil2);
// groups.removePupil(groupId, pupil.id)
groups.update(groupId, { room: 299 })

const gradebooks = new Gradebooks(groups, teachers, subjects);
let gradebookId = gradebooks.add(groupId);
let gradebookId2 = gradebooks.add(groupId2);
// console.log(gradebooks.readAll(gradebookId));


let teacher1 = {
    name: {
        first: "Gio",
        last: "Carvanjo",
    },
    dateOfBirth: "14-8-2023",
    emails: [
        {
            email: "maths@gmail.com",
            primary: true,
        }
    ],
    phones: [
        {
            phone: "+995 (557) 07-88-87", // +995 (XXX) XX-XX-XX
            primary: true,
        }
    ],
    sex: "MALE",
    subjects: [
        {
            subject: "History",
        }
    ],
    description: "Have Fun!",
}
const teacherId = teachers.add(teacher1);
const history = {
    title: 'History',
    lessons: 24
};
const math = {
    title: 'Math',
    lessons: 30,
    description: 'math is fun'
};
const physics = {
    title: 'Physics',
    lessons: 15,
    description: 'physics is dangerous',
};

const subjectId = subjects.add(history);
const subjectId2 = subjects.add(math);
const subjectId3 = subjects.add(physics);
const record = {
    pupilId: pupil.id,
    teacherId: teacherId,
    subjectId: subjectId,
    lesson: 1,
    mark: 9
};
const record2 = {
    pupilId: pupil.id,
    teacherId: teacherId,
    subjectId: subjectId,
    lesson: 7,
    mark: 8
};

gradebooks.addRecord(gradebookId, record);
gradebooks.addRecord(gradebookId, record2);

// console.log(gradebooks.read(gradebookId, pupil.id));
console.log(gradebooks.readAll(gradebookId));

// gradebooks.clear(2);