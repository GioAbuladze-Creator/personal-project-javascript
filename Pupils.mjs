import Persons from './Persons.mjs';
export default class Pupils extends Persons {
    // Teachers and Pupils Extend Persons class because Teachers extending Pupils class would be weird 
    #required=['name', 'dateOfBirth', 'emails', 'phones', 'sex', 'subjects']
    #pupilsValidation(pupil){
        for(let key of Object.keys(pupil)){
            if(!this.#required.includes(key)&&key!='description'){
                throw new Error(`Invalid Person`)
            }
        }
    }
    add(pupil){
        this.#pupilsValidation(pupil)
        return super.add(pupil)
    }
    update(id,pupil){
        this.#pupilsValidation(pupil)
        return super.update(id,pupil)
    }
}
