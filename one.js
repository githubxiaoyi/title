function snake() {
    this.width=10;
    this.height=10;
    this.body=[
        {x:2,y:0,ele:null},
        {x:1,y:0,ele:null},
        {x:0,y:0,ele:null}
    ];
    this.direction='right';
    this.display=function () {
        s=document.createElement("div");
        for (i=0;i<snake.body.length;i++){
            if (snake.body[i].x!=null){
                s.style.width=this.width+'px';
                s.style.height=this.height+'px';
                s.position='absolute';
                s.style.top=this.height*this.body[i].y+'px';
                s.style.left=this.width*this.body[i].x+'px';
                s.style.background='rgb(123,123,123)';
                this.body[i]['ele']=s;
                map.appendChild(s);
                console.log(123);
            }
        }
    }
    this.run=function () {
        for(i=this.body.length-1;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        switch (this.direction) {
            case 'left':
                this.body[0].x-=1;
                break;
            case 'right':
                this.body[0].x+=1;
                break;
            case 'up':
                this.body[0].y+=1;
                break;
            case 'down':
                this.body[0].y-=1;
                break;
        }
        this.move();
        console.log(456);
    }

    this.move=function () {
        for (i=0;i<this.body.length;i++){
            var array=this.body[i];
            array.ele.style.top=this.height*this.body[i].y+'px';
            array.ele.style.left=this.width*this.body[i].x+'px';
        }
    }
}

function food() {
    this.width=10;
    this.height=10;
    var ss;
    this.display=function(){
        ss=document.createElement("div");
        ss.style.width=this.width+'px';
        ss.style.height=this.height+'px';
        ss.position='absolute';
        ss.style.left=Math.floor(Math.random()*50)*this.width+'px';
        ss.style.top=Math.floor(Math.random()*50)*this.height+'px';
        ss.style.background='rgb(1,1,1)';
        this.ele=ss;
        map.appendChild(ss);
        console.log(ss.style.left);
    }
}
var snake=new snake();
var food=new food();
snake.display();
food.display();

var timer;
window.onload=function(){
    clearInterval(timer);
    timer=setInterval('snake.run()',300)
}
