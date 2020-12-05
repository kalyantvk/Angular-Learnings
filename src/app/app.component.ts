import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MineSweeper';
  gameOver:boolean=false;

  numberOfBombs=10;

  bombs=[];

  position={
    x:0,
    y:0
  }

  constructor(){
    this.fill_bombs();

  }


  mines=[
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]

  ]

  list=[1,2,3,4,5,6,7,8,9]

  ls=[];
  ly=[];

  visited=[];

  checkMine(x,y)
  {

    if(this.mines[x][y]==0)
    {
      this.blastAdjacentEmptyMines(x,y);
      this.visited=[];
    }
    else if(this.mines[x][y]==-1)
    {
        console.log("Game over");
        this.gameOver=true;
        this.displayAllMines();
        
    }
    else
    {
      document.getElementById(x+""+y).style.background='#fff';
      document.getElementById(x+""+y).textContent=this.mines[x][y]+"";
    }
    
    
  }

  displayAllMines()
  {
    for(var row=0;row<=8;row++)
    {
      for(var col=0;col<=8;col++)
      {
        document.getElementById(row+""+col).style.background='#fff';
        if(this.mines[row][col]!=-1 && this.mines[row][col]!=0)
          document.getElementById(row+""+col).textContent=this.mines[row][col]+"";
        else if( this.mines[row][col] == -1 )
        {
          document.getElementById(row+""+col).style.width="45px";
          document.getElementById(row+""+col).style.backgroundImage="url('minesmall.png')";
        }
      }
    }
  }

  blastAdjacentEmptyMines(x,y)
  {
    if((x>=0 && x<=8) && (y>=0 && y<=8) && this.mines[x][y]==0 && (!this.alreadyExists(x,y,this.visited)))
    {
        document.getElementById(x+""+y).style.background='#fff';
        this.visited.push({x:x,y:y});
        this.blastAdjacentEmptyMines( x+1, y );
        this.blastAdjacentEmptyMines( x-1, y );
        this.blastAdjacentEmptyMines( x, y-1 );
        this.blastAdjacentEmptyMines( x, y+1 );
    }
  }

  setNeighbours(pos)
  {
    
    //left
    if(pos.y-1>=0 && this.mines[pos.x][pos.y-1]!=-1 )
      this.mines[pos.x][pos.y-1]+=1;

    //right
    if(pos.y+1<=8 && (this.mines[pos.x][pos.y+1]!=-1))
      this.mines[pos.x][pos.y+1]+=1;

    //top
    if(pos.x-1>=0 && (this.mines[pos.x-1][pos.y]!=-1))
      this.mines[pos.x-1][pos.y]+=1;

    //bottom
    if(pos.x+1<=8 && (this.mines[pos.x+1][pos.y]!=-1))
      this.mines[pos.x+1][pos.y]+=1;


    //topleft
    if(pos.x-1>=0 && pos.y-1>=0 && (this.mines[pos.x-1][pos.y-1]!=-1))
    {
      this.mines[pos.x-1][pos.y-1]+=1;
    }

    //topright
    if(pos.x-1>=0 && pos.y+1<=8 && (this.mines[pos.x-1][pos.y+1]!=-1))
    {
      this.mines[pos.x-1][pos.y+1]+=1;
    }

    //bottom left
    if(pos.x+1<=8 && pos.y-1>=0 && (this.mines[pos.x+1][pos.y-1]!=-1))
    {
      this.mines[pos.x+1][pos.y-1]+=1;
    }
    
    //bottom right
    if(pos.x+1<=8 && pos.y+1<=8 && (this.mines[pos.x+1][pos.y+1]!=-1))
    {
      this.mines[pos.x+1][pos.y+1]+=1;
    }
  }

  fill_bombs()
  {
    for(var i=0;i<this.numberOfBombs;i++)
    {
      while(true)
      {
        this.position.x=Math.floor(Math.random() * 8);
        this.position.y=Math.floor(Math.random()*8);
        console.log(this.position.x+"--"+this.position.y);
        
        if(!this.alreadyExists(this.position.x,this.position.y,this.bombs))
        {
          this.bombs.push({"x":this.position.x,"y":this.position.y});
          this.mines[this.position.x][this.position.y]=-1; 
          this.setNeighbours(this.position);   
          console.log(this.mines);      
          break;
        }

      }
      
    }
    console.log(this.bombs);
    
    
  }

  alreadyExists(x,y, mybombs) {
    console.log(mybombs.length);
    var i;
    for (i = 0; i < mybombs.length; i++) {
        if (mybombs[i].x == x && mybombs[i].y == y) {            
            return true;
        }
    }

    return false;
}
}
