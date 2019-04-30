import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificateDownloadService {
  marksData = {};
  constructor(private http:HttpClient) { }

  public downloadAsPdf(title:string, userName:string, userId, courseId, courseName, marks) {
    this.marksData= {
      'scoredMarks' : localStorage.getItem('totalScore'),
      'maxMarks': localStorage.getItem('maxScore')       
  }

    return this.http.post('/certificate/v1/course/download',{
      "request":{
        "title":' ',
      "name":userName,
      "courseName":courseName,
      "userId": userId,
      "courseId": courseId,
       "marks": this.marksData
      } 
    })
  }
}
