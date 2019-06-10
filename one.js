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
        for (var i=0;i<snake.body.length;i++){
            if (snake.body[i].x!=null){
                s=document.createElement("div");
                s.style.width=this.width+'px';
                s.style.height=this.height+'px';
                s.style.position='absolute';
                s.style.top=this.height*this.body[i].y+'px';
                s.style.left=this.width*this.body[i].x+'px';
                s.style.background='rgb(123,123,123)';
                this.body[i]['ele']=s;
                map.appendChild(s);
            }
        }
    }
    this.run=function () {
        //蛇出线
        if(snake.body[0].x<0||snake.body[0].x>500||snake.body[0].y<0||snake.body[0].y>500){
            map.removeChild(food.ele);
            food.display();
            for(var i=0;i<this.body.length;i++){
                map.removeChild(snake.body[i]['ele']);
            }
            snake.direction='right';
            snake.body=[
                {x:2,y:0,ele:null},
                {x:1,y:0,ele:null},
                {x:0,y:0,ele:null}
            ]
            snake.display();
        }
        //蛇咬到自己
        if (snake.body.length>4){
            for(var i=4;i<snake.body.length;i++){
                if (snake.body[0].x==snake.body[i].x&&snake.body[0].y==snake.body[i].y){
                    alert(重新开始);
                    map.removeChild(food.ele);
                    food.display();
                    for(var i=0;i<this.body.length;i++){
                        map.removeChild(snake.body[i]['ele']);
                    }
                    snake.direction='right';
                    snake.body=[
                        {x:2,y:0,ele:null},
                        {x:1,y:0,ele:null},
                        {x:0,y:0,ele:null}
                    ]
                    snake.display();
                }
            }
        }

        //除第一个蛇外 其余蛇获取前一个蛇的坐标
        for(var i=this.body.length-1;i>0;i--){
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
    }

    this.move=function () {
        if(snake.body[0].x==food.x&&snake.body[0].y==food.y){
            map.removeChild(food.ele);
            food.display();
            var length=this.body.length;
            var last={x:null,y:null,ele:null};
            if (this.body[length-1].x==this.body[length-2].x){
                if (this.body[length-1].y<this.body[length-2].y){
                    last.x=this.body[length-1].x;
                    last.y=this.body[length-1].y-1;
                }else if(this.body[length-1].y>this.body[length-2].y){
                    last.x=this.body[length-1].x;
                    last.y=this.body[length-1].y+1;
                }
            }
            if (this.body[length-1].y==this.body[length-2].y){
                if (this.body[length-1].x<this.body[length-2].x) {
                    last.y = this.body[length - 1].y;
                    last.x = this.body[length - 1].x -1;
                } else if(this.body[length-1].x>this.body[length-2].x){
                    last.y = this.body[length - 1].y;
                    last.x = this.body[length - 1].x +1;
                }
            }
            sss=document.createElement("div");
            sss.style.width=this.width+'px';
            sss.style.height=this.height+'px';
            sss.style.position='absolute';
            sss.style.background='rgb(123,123,123)';
            sss.style.top=last.y*sss.height+'px';
            sss.style.left=last.x*sss.width+'px';
            last['ele']=sss;
            map.appendChild(sss);
            snake.body.push(last);
            console.log(last.x);
        }
        for (i=0;i<this.body.length;i++){
            var array=this.body[i];
            array.ele.style.top=this.height*this.body[i].y+'px';
            array.ele.style.left=this.width*this.body[i].x+'px';
        }

    }
}
//上下左右
document.onkeydown=function (e) {
    var e=window.event||e;
    switch (e.keyCode) {
        case 37:
            if (snake.direction!='right'){
                snake.direction='left';
                break;
            }
        case 40:
            if (snake.direction!='down'){
                snake.direction='up';
                break;
            }
        case 39:
            if (snake.direction!='left'){
                snake.direction='right';
                break;
            }
        case 38:
            if (snake.direction!='up'){
                snake.direction='down';
                break;
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
        ss.style.position='absolute';
        this.x=Math.floor(Math.random()*10);
        this.y=Math.floor(Math.random()*10);
        ss.style.left=this.x*this.width+'px';
        ss.style.top=this.y*this.height+'px';
        ss.style.background='rgb(1,1,1)';
        this.ele=ss;
        map.appendChild(ss);
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
