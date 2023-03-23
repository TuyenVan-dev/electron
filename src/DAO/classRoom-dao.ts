import { ClassRoom } from "src/models/class-room";
import { HttpService } from "src/service/http-service";
import { Constant } from "src/utils/Constant";

export class ClassRoomDAO extends HttpService {
  public id_user: string;
  public listClassRoom: Array<ClassRoom> = [];

  constructor() {
    super();
  }

  async getListClass(id_user): Promise<any> {
    try {
      let url =
        Constant.url + "/api/list-class?id_user=" + id_user;

      this.url = url
      let result = await this.sendGet();
      console.log('result', result);

      // let result = await fetch(url)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     return data;
      //   });

      let data = JSON.parse(result.data);
      this.listClassRoom = data.data
    } catch (error) {
      console.log(error);
    }
  }
}
