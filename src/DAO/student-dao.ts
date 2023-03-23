import { ClassRoom } from "src/models/class-room";
import { HttpService } from "src/service/http-service";
import { Constant } from "src/utils/Constant";

export class StudentDAO extends HttpService {
    constructor() {
        super();
    }

    async deleteStudent(id_user: any, id_student?: any): Promise<any> {
        try {
            this.url = Constant.url + "/api/delete-student";
            let params = {
                'id_student': id_student,
                'id_user': id_user
            }
            let result = await this.sendPost(params);
            return this.result            
        } catch (error) {
            console.log(error);
        }
    }
    async updateStudent(parrams): Promise<any> {
        try {
            this.url = Constant.url +  "/api/edit-student";
            let result = await this.sendPost(parrams);
            return this.result            
        } catch (error) {
            console.log(error);
        }
    }
    async createStudent(parrams): Promise<any> {
        try {
            this.url = Constant.url +  "/api/create-student";
            let result = await this.sendPost(parrams);
            return this.result            
        } catch (error) {
            console.log(error);
        }
    }
}
