import Groups from "./Groups";
import Teachers from "./Teachers";
import Subjects from "./Subjects";
import Pupils from "./Pupils";
import { Person } from "./Persons";
interface Record {
    pupilId: string,
    teacherId: string,
    subjectId: string,
    lesson: number,
    mark: number
}
type RecordType = {
    name: string,
    records: Array<{ teacher: string, subject: string, lesson: number, mark: number }>
}
class Gradebooks {
    private gradebooks: Map<string, { id: string, room: number, pupils: Array<Person & { id: string }>, records: Array<RecordType> }>;
    private groups: Groups;
    private teachers: Teachers;
    private subjects: Subjects;
    private recordValidation(record: { pupilId: string, teacherId: string, subjectId: string, lesson: number, mark: number }): void {
        if (!this.groups.readAll().find((i) => i.pupils.find((j) => j.id === record.pupilId))) {
            throw new Error("Pupil not found");
        }
        if (!this.teachers.read(record.teacherId)) {
            throw new Error("Teacher not found");
        }
        if (!this.subjects.readAll().find((i) => i.id === record.subjectId)) {
            throw new Error("Subject not found");
        }
        if (isNaN(record.lesson)) {
            throw new Error("Lesson must be a number");
        }
        if (record.lesson < 0) {
            throw new Error("Lesson must be a positive number");
        }
        if (isNaN(record.mark)) {
            throw new Error("Mark must be a number");
        }
        if (record.mark < 0) {
            throw new Error("Mark must be a positive number");
        }
        let required = ['pupilId', 'teacherId', 'subjectId', 'lesson', 'mark'];
        for (let key in record) {
            if (!required.includes(key)) {
                throw new Error("Invalid Record");
            }
        }
    }
    constructor(groups: Groups, teachers: Teachers, subjects: Subjects) {
        this.groups = groups;
        this.teachers = teachers;
        this.subjects = subjects;
        this.gradebooks = new Map();
    }
    add(groupId: string) {
        for (let { id, room, pupils } of this.groups.readAll()) {
            if (id === groupId) {
                if (this.gradebooks.has(id)) {
                    throw new Error("Gradebook already exists");
                }
                this.gradebooks.set(id, { id, room, pupils, records: [] });
                return id
            }
        }
        throw new Error("Group not found");
    }
    clear() {
        this.gradebooks.clear();
    }
    addRecord(gradebookId: string, record: Record): void {
        let gradebook = this.gradebooks.get(gradebookId);
        if (!gradebook) {
            throw new Error("Gradebook not found");
        }
        this.recordValidation(record);
        let { pupilId, teacherId, subjectId, lesson, mark } = record;
        let pupil = gradebook.pupils.find((i) => i.id === pupilId);
        let teacher = this.teachers.read(teacherId);
        let subject = this.subjects.readAll().find((i) => i.id === subjectId);
        let pupilName = pupil?.name.first + ' ' + pupil?.name.last;
        let teacherName = teacher?.name.first + ' ' + teacher?.name.last;


        let subjectFound = false;
        for (let subj of teacher.subjects) {
            // maybe undefined
            if (subject) {
                if (subj.subject === subject.title) {
                    subjectFound = true;
                    break;
                }
            }
        }
        if (!subjectFound) {
            throw new Error("Teacher doesn't teach this subject");
        }

        if (!pupil || !teacher || !subject || !lesson || !mark) {
            throw new Error("Invalid Record");
        }
        if (gradebook.records.length > 0) {
            let pupilFound = false;
            for (let rec of gradebook.records) {
                if (rec.name === pupilName) {
                    for (let record of rec.records) {
                        if (record.lesson === lesson && record.subject === subject.title && record.teacher === teacherName) {
                            throw new Error("Record already exists");
                        }
                    }
                    let recordObj = { teacher: teacher.name.first + ' ' + teacher.name.last, subject: subject.title, lesson, mark };
                    rec.records.push(recordObj);
                    pupilFound = true;
                    break;
                }
            }
            if (!pupilFound) {
                let recordObj = { name: pupilName, records: [{ teacher: teacher.name.first + ' ' + teacher.name.last, subject: subject.title, lesson, mark }] }
                gradebook.records.push(recordObj);
            }
        } else {
            let recordObj = { name: pupilName, records: [{ teacher: teacher.name.first + ' ' + teacher.name.last, subject: subject.title, lesson, mark }] }
            gradebook.records.push(recordObj)
        }

    }
    read(gradebookId: string, pupilId: string): { name: string, records: { teacher: string, subject: string, lesson: number, mark: number }[] } {
        let gradebook = this.gradebooks.get(gradebookId);
        if (!gradebook) {
            throw new Error("Gradebook not found");
        }
        let pupil = gradebook.pupils.find((i) => i.id === pupilId);
        if (!pupil) {
            throw new Error("Pupil not found");
        }
        let pupilName = pupil.name.first + ' ' + pupil.name.last;
        let filteredrecord: Array<{ teacher: string, subject: string, lesson: number, mark: number }> = [];
        for (let record of gradebook.records) {
            if (record.name === pupilName) {

                filteredrecord = record.records;
            }
        }
        return { name: pupilName, records: filteredrecord };
    }
    readAll(gradebookId: string): {
        id: string;
        room: number;
        pupils: (Person & {
            id: string;
        })[];
        records: RecordType[];
    } {
        for (let [id, gradebook] of this.gradebooks) {
            if (id === gradebookId) {
                return gradebook;
            }
        }
        throw new Error("Gradebook not found");
    }


}

// const groups = new Groups();
// const teachers = new Teachers();
// const subjects = new Subjects();


// let groupId = groups.add(100);
// let groupId2 = groups.add(777);


// const pupils = new Pupils();
// const data = {
//     name: {
//         first: "Michael",
//         last: "Jordan"
//     },
//     dateOfBirth: "05-02-1970", // dd-mm-yyyy
//     phones: [
//         {
//             phone: "+995 (551) 12-13-73", // +995 (XXX) XX-XX-XX
//             primary: true,
//         }
//     ],
//     sex: "male", // male OR female
//     description: "Basketball player"
// }
// const data2 = {
//     name: {
//         first: "Cristiano",
//         last: "Ronaldo"
//     },
//     dateOfBirth: "11-04-1988", // dd-mm-yyyy
//     phones: [
//         {
//             phone: "+995 (566) 23-13-77", // +995 (XXX) XX-XX-XX
//             primary: true,
//         }
//     ],
//     sex: "male", // male OR female
//     description: "Football player"
// }
// // Create a new pupil
// const pupil = pupils.add(data);
// const pupil2 = pupils.add(data2);
// groups.addPupil(groupId, pupil);
// groups.addPupil(groupId, pupil2);
// // groups.removePupil(groupId, pupil.id)
// groups.update(groupId, { room: 299 })

// const gradebooks = new Gradebooks(groups, teachers, subjects);
// let gradebookId = gradebooks.add(groupId);
// let gradebookId2 = gradebooks.add(groupId2);
// // console.log(gradebooks.readAll(gradebookId));


// let teacher1 = {
//     name: {
//         first: "Gio",
//         last: "Carvanjo",
//     },
//     dateOfBirth: "14-8-2023",
//     emails: [
//         {
//             email: "maths@gmail.com",
//             primary: true,
//         }
//     ],
//     phones: [
//         {
//             phone: "+995 (557) 07-88-87", // +995 (XXX) XX-XX-XX
//             primary: true,
//         }
//     ],
//     sex: "MALE",
//     subjects: [
//         {
//             subject: "XIMIA",
//         },
//         {
//             subject: "History",
//         }
//     ],
//     description: "Have Fun!",
// }
// const teacherId = teachers.add(teacher1);
// const history = {
//     title: 'History',
//     lessons: 24
// };
// const math = {
//     title: 'Math',
//     lessons: 30,
//     description: 'math is fun'
// };
// const physics = {
//     title: 'Physics',
//     lessons: 15,
//     description: 'physics is dangerous',
// };

// const subjectId = subjects.add(history);
// const subjectId2 = subjects.add(math);
// const subjectId3 = subjects.add(physics);
// const record = {
//     pupilId: pupil.id,
//     teacherId: teacherId,
//     subjectId: subjectId,
//     lesson: 1,
//     mark: 9
// };
// const record2 = {
//     pupilId: pupil2.id,
//     teacherId: teacherId,
//     subjectId: subjectId,
//     lesson: 7,
//     mark: 8
// };
// const record3 = {
//     pupilId: pupil.id,
//     teacherId: teacherId,
//     subjectId: subjectId,
//     lesson: 7,
//     mark: 8
// };

// gradebooks.addRecord(gradebookId, record);
// gradebooks.addRecord(gradebookId, record2);
// gradebooks.addRecord(gradebookId, record3);

// console.log(gradebooks.read(gradebookId, pupil.id));
// console.log(gradebooks.read(gradebookId, pupil2.id));
// console.log(gradebooks.readAll(gradebookId));

// gradebooks.clear(2);
// console.log(gradebooks.readAll(gradebookId));