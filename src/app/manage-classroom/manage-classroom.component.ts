import { AfterViewInit, Component, OnInit } from "@angular/core";
import { async } from "@angular/core/testing";
import { ClassRoomDAO } from "src/DAO/classRoom-dao";
import { StudentDAO } from "src/DAO/student-dao";
import { ClassRoom } from "src/models/class-room";
import { Student } from "src/models/student";
import { ToastService } from "src/service/toast-service";
declare var $

@Component({
  selector: "app-manage-classroom",
  templateUrl: "./manage-classroom.component.html",
  styleUrls: ["./manage-classroom.component.css"],
})
export class ManageClassroomComponent implements AfterViewInit {
  public listClassRoom: Array<ClassRoom> = [];
  public infoClass: any = {};
  public infoStudent: any = {};
  public listStudent: Array<Student> = []
  public classRoomDao: ClassRoomDAO = new ClassRoomDAO();
  public studentDao: StudentDAO = new StudentDAO();
  public studentName: string = '';
  public birth_day: string = '';
  public gender: string = '';
  public infoUser;
  constructor() { }

  async ngAfterViewInit() {

    await this.classRoomDao.getListClass(1);
    this.listClassRoom = this.classRoomDao.listClassRoom;
    console.log("hihi", this.listClassRoom);
  }

  public showModalStudent(infoClass) {
    this.infoClass = infoClass
    this.listStudent = infoClass.students
  }

  public async deleteStudent(infoClass, id_student) {
    try {
      if (confirm('chắc chưa !!')) {
        let result = await this.studentDao.deleteStudent(infoClass.user.id, id_student);
        let jsonResult = JSON.parse(result);
        if (jsonResult.status === 'success') {
          ToastService.showSuccessToast('Thàng công');
          let indexOf = this.listStudent.map(student => {
            return student.id;
          }).indexOf(id_student);
          this.listStudent.splice(indexOf, 1);
        } else {
          ToastService.showErrorToast('Thất bại ' + jsonResult.message);
        }
      }


    } catch (error) {
      alert(error)
    }

  }

  public editStudent(student) {
    console.log('student', student);
    this.infoStudent = student
    this.studentName = student.name
    this.birth_day = student.birth_day
    this.gender = student.gender

  }

  public async updateStudent() {
    try {
      if (!this.studentName || !this.gender || !this.birth_day) {
        ToastService.showErrorToast('Vui lòng nhập đủ thông');
        return;
      }
      let parrams = {
        'id_student': this.infoStudent.id,
        'id_user': this.infoClass.user.id,
        'name': this.studentName,
        'gender': this.gender,
        'birth_day': this.birth_day
      }
      let result = await this.studentDao.updateStudent(parrams);
      let jsonResult = JSON.parse(result);
      if (jsonResult.status === 'success') {
        ToastService.showSuccessToast('Thành công');
        $('#editModal').modal('hide');
        let studentUpd = this.listStudent.find(student => student.id === this.infoStudent.id)
        studentUpd.name = this.studentName
        studentUpd.birthday = this.birth_day
        studentUpd.gender = this.gender
      } else {
        ToastService.showErrorToast('Thất bại ' + jsonResult.message);
      }
    } catch (error) {
      alert(error);
    }

  }
}
