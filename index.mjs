import Subjects from './Subjects.mjs';
import Pupils from './Pupils.mjs';
import Teachers from './Teachers.mjs';

const history = {
    title: 'History',
    lessons: 24
};
const math = {
    title: 'Math',
    lessons: 30,
    desc:'math is fun'
};
const physics = {
    title: 'Physics',
    lessons: 15,
    desc:'physics is dangerous',
};

const subjects = new Subjects();

const id = subjects.add(history); 
const id2 = subjects.add(math); 
const id3 = subjects.add(physics); 
subjects.readAll();
console.log(subjects.verify(history));
subjects.remove(id2);
subjects.readAll();


// -------Teachers-------
let teachers = new Teachers();
teachers.print()
let teacher1={
    name: {
        first: "Gio",
        last: "Carvanjo"
    },
    dateOfBirth: "14-8-2023", 
    emails: [
        {
            email: "maths@gmail.com",
            primary: false
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
            subject: "Maths" 
        }
    ],
    description: "Have Fun!",
}
const teacherId = teachers.add(teacher1)
console.log(teacherId)
teachers.print()
console.log(teachers.read(teacherId))
let updatedProfile = {
    name: {
        first: "Sacha",
        last: "Baron"
    },
    dateOfBirth: "22-01-1973", 
    emails: [
        {
            email: "yeah@gmail.com", // any@any.any
            primary: true
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
            subject: "Music" 
        }
    ],
    description: "MUsic is Fun!",
}

teachers.update(teacherId, updatedProfile)
console.log(teachers.read(teacherId))
teachers.remove(teacherId)
teachers.print()


// ------ Pupils ------
// Create new Pupil from Pupil's data
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
            primary: false
        }
    ],
    sex: "male", // male OR female
    description: "Basketball player"
}
// Create a new pupil
const pupil = pupils.add(data);

console.log(pupil.id) // should return pupil ID

// will return Pupils data including pupil's id
console.log(pupils.read(pupil.id))
pupils.print()

let updatedPupil= {
    name: {
        first: "Mike",
        last: "Tyson"
    },
    dateOfBirth: "05-02-1970", // dd-mm-yyyy
    phones: [
        {
            phone: "+995 (522) 72-73-73",
            primary: true
        }
    ],
    sex: "male", // male OR female
    description: "Legend"
}

// will update Pupil. This method should use the same validation as a add method
pupils.update(pupil.id, updatedPupil)
// pupils.remove(pupil.id)

// will remove pupil
pupils.print()