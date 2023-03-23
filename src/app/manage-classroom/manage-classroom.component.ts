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
  public infoStudentTop: Student;
  public listStudent: Array<Student> = []
  public classRoomDao: ClassRoomDAO = new ClassRoomDAO();
  public studentDao: StudentDAO = new StudentDAO();
  public studentName: string = '';
  public date_of_birth: string = '';
  public average_score: number = 0;
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

  public filterStudentTopOne(listStudent) {
    listStudent.sort((a, b) => { return b.average_score - a.average_score })
    let studentTop1 = `${listStudent[0].name} (TB: ${listStudent[0].average_score == null ? 0 : listStudent[0].average_score})`
    return studentTop1
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
    this.infoStudent = student
    this.studentName = student.name
    this.date_of_birth = student.date_of_birth
    this.gender = student.gender
    this.average_score = student.average_score
  }

  public async createStudent() {
    try {

      if (!this.studentName || !this.gender || !this.date_of_birth) {
        ToastService.showErrorToast('Vui lòng nhập đủ thông');
        return;
      }

      let parrams = {
        'id_class': this.infoClass.id,
        'id_user': this.infoClass.user.id,
        'name': this.studentName,
        'gender': this.gender,
        'dob': this.date_of_birth,
        'average_score': this.average_score,
      }
      let result = await this.studentDao.createStudent(parrams);
      let jsonResult = JSON.parse(result);
      if (jsonResult.status === 'success') {
        ToastService.showSuccessToast('Thành công');
        $('#modalCreate').modal('hide');
        let newStudent = jsonResult.data;
        newStudent.day_of_birth = jsonResult.data.dob
        delete newStudent.dob
        newStudent.class = { id: this.infoClass.id, name: this.infoClass.name }
        this.listStudent.push(newStudent);
        this.studentName = ''
        this.date_of_birth = ''
        this.gender = ''
        this.average_score = 0
        console.log(this.listStudent);
        
        this.filterStudentTopOne(this.listStudent)
      } else {
        ToastService.showErrorToast('Thất bại ' + jsonResult.message);
      }

    } catch (error) {

    }
  }



  public async updateStudent() {
    try {
      if (!this.studentName || !this.gender || !this.date_of_birth) {
        ToastService.showErrorToast('Vui lòng nhập đủ thông');
        return;
      }
      let parrams = {
        'id_student': this.infoStudent.id,
        'id_user': this.infoClass.user.id,
        'name': this.studentName,
        'gender': this.gender,
        'dob': this.date_of_birth,
        'average_score': this.average_score,
      }
      let result = await this.studentDao.updateStudent(parrams);
      let jsonResult = JSON.parse(result);
      if (jsonResult.status === 'success') {
        ToastService.showSuccessToast('Thành công');
        $('#editModal').modal('hide');
        let studentUpd = this.listStudent.find(student => student.id === this.infoStudent.id)
        studentUpd.name = this.studentName
        studentUpd.day_of_birth = this.date_of_birth
        studentUpd.gender = this.gender
        studentUpd.average_score = this.average_score
        this.filterStudentTopOne(this.listStudent)
      } else {
        ToastService.showErrorToast('Thất bại ' + jsonResult.message);
      }
    } catch (error) {
      alert(error);
    }

  }
}
