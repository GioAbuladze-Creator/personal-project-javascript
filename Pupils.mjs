import Persons from './Persons.mjs';
export default class Pupils extends Persons {
    // Teachers and Pupils Extend Persons class because Teachers extending Pupils class would be weird 
    #required = ['name', 'dateOfBirth', 'emails', 'phones', 'sex', 'subjects']
    #pupilsValidation(pupil) {
        for (let key of Object.keys(pupil)) {
            if (!this.#required.includes(key) && key != 'description') {
                throw new Error(`Invalid Person`)
            }
        }
    }
    add(pupil) {
        this.#pupilsValidation(pupil)
        return super.add(pupil)
    }
    update(id, pupil) {
        this.#pupilsValidation(pupil)
        return super.update(id, pupil)
    }
}
// for Testing:
// let pupils = new Pupils();
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
// let pupil = pupils.add(data);
// console.log(pupils.read(pupil.id));
// pupils.update(pupil.id, { name: { first: 'Gio', last: 'Carvanjo' }, description: 'Harmonica Player' })
// console.log(pupils.read(pupil.id));
// pupils.remove(pupil.id);
// console.log(pupils.read(pupil.id));

