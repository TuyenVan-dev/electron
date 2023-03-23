import {FacebookInitData} from "./facebook-init-data";

export class Student {
    private _id: number;
    private _name: string;
    private _day_of_birth: string;
    private _gender: string;
    private _average_score: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get day_of_birth(): string {
        return this._day_of_birth;
    }

    set day_of_birth(value: string) {
        this._day_of_birth = value;
    }

    get gender(): string {
        return this._gender;
    }

    set gender(value: string) {
        this._gender = value;
    }    

    get average_score(): number {
        return this._average_score;
    }

    set average_score(value: number) {
        this._average_score = value;
    }    

}
