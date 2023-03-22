import { ClassRoom } from "src/models/class-room";
import { HttpService } from "src/service/http-service";

export class StudentDAO extends HttpService {
    constructor() {
        super();
    }

    async deleteStudent(id_user: any, id_student?: any): Promise<any> {
        try {
            this.url = "https://exam2.congdongcode.vn/api/delete-student";
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
            this.url = "https://exam2.congdongcode.vn/api/edit-student";
            let result = await this.sendPost(parrams);
            return this.result            
        } catch (error) {
            console.log(error);
        }
    }
}
