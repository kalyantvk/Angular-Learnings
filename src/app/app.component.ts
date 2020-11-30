import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo APP';
  mystr = 'This is kalyan';
  date = new Date();
  todo:string;
  todoList:string[];

  success:boolean;
  error:boolean;
  warning:boolean;
  msg:string;
  darkMode:boolean;
  color:string;
  

  constructor()
  {
    this.success=true;
    this.error=true;
    this.warning=true;
    console.log("called!");
    this.todoList=["Learn Angular8","This to shall pass"];
    this.todo="";
    this.msg="Unknown";
    this.darkMode=false;
    this.color="red";
  }
  
  enableDarkMode()
  {
    if(!this.darkMode)
    {
        console.log("change mode");
        document.getElementById("mycard").style.backgroundColor = "black";
        this.darkMode=true;
    }
    else
    {
      console.log("change mode");
        document.getElementById("mycard").style.backgroundColor = "white";
        this.darkMode=false;
    }
  }
  addItem()
  {
    if(this.todo.trim()==="")
    {
      this.warning=false;
      this.success=true;
      this.error=true;
      return;
    }
    if(this.todoList.includes(this.todo))
    {
      this.error=false;
      this.warning=true;
      this.success=true;
      return;
    }
    
    this.msg="Added successfully!";
    console.log(this.todo);
    this.todoList.push(this.todo);
    console.log(this.todoList);
    this.todo="";
    this.success=false;
    this.warning=true;
    this.error=true;
    
    //console.log("clicked----------------");    
  }

  closeAlert(val)
  {
    if(val==="success")
      this.success=!this.success;
    else if(val==="error")
      this.error=!this.error;
    else if(val==="warning")
      this.warning=!this.warning;
    
    
  }

  deleteTodo(item)
  {
    this.todoList=this.todoList.filter(val => val!==item);
    this.msg="Deleted successfully!";
    this.success=false;
    this.error=true;
    this.warning=true;
    //this.closeAlert("success");
    


  }
}
