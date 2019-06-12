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
                s.style.background='url(images/snake_body.png)';
                snake.body[i]['ele']=s;
                map.appendChild(s);
            }
        }
    }
    this.run=function () {
        //蛇出线
        if(snake.body[0].x<0||snake.body[0].x>50||snake.body[0].y<0||snake.body[0].y>50){
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

        for(var i=1;i<snake.body.length;i++){
            if (snake.body[0].x==snake.body[i].x&&snake.body[0].y==snake.body[i].y){
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


        //除第一个蛇外 其余蛇获取前一个蛇的坐标
        for(var i=this.body.length-1;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        var length=this.body.length;
        switch (this.direction) {
            case 'left':
                this.body[0].x-=1;
                this.body[0].ele.style.background='url(images/snake_head_left.png)';
                this.body[length-1].ele.style.background='url(images/snake_tail_left.png)';
                break;
            case 'right':
                this.body[0].x+=1;
                this.body[0].ele.style.background='url(images/snake_head_right.png)';
                this.body[length-1].ele.style.background='url(images/snake_tail_right.png)';
                break;
            case 'up':
                this.body[0].y+=1;
                this.body[0].ele.style.background='url(images/snake_head_bottom.png)';
                this.body[length-1].ele.style.background='url(images/snake_tail_bottom.png)';
                break;
            case 'down':
                this.body[0].y-=1;
                this.body[0].ele.style.background='url(images/snake_head_top.png)';
                this.body[length-1].ele.style.background='url(images/snake_tail_top.png)';
                break;
        }
        this.move();
    }

    this.move=function () {
        if(snake.body[0].x==food.x&&snake.body[0].y==food.y){
            map.removeChild(food.ele);
            food.display();
            var length=this.body.length;
            //吃到之后改变倒数第二个的图标
            snake.body[length-1].ele.style.background='url(images/snake_body.png)';
            var last={x:null,y:null,ele:null};
            if (this.body[length-1].x==this.body[length-2].x){
                if (this.body[length-1].y<this.body[length-2].y){
                    last.x=this.body[length-1].x;
                    last.y=this.body[length-1].y-1;
                    last.pic='url(images/snake_tail_right.png)';
                }else if(this.body[length-1].y>this.body[length-2].y){
                    last.x=this.body[length-1].x;
                    last.y=this.body[length-1].y+1;
                    last.pic='url(images/snake_tail_left.png)';
                }
            }
            if (this.body[length-1].y==this.body[length-2].y){
                if (this.body[length-1].x<this.body[length-2].x) {
                    last.y = this.body[length - 1].y;
                    last.x = this.body[length - 1].x -1;
                    last.pic='url(images/snake_tail_bottom.png)';
                } else if(this.body[length-1].x>this.body[length-2].x){
                    last.y = this.body[length - 1].y;
                    last.x = this.body[length - 1].x +1;
                    last.pic='url(images/snake_tail_top.png)';
                }
            }
            sss=document.createElement("div");
            sss.style.width=this.width+'px';
            sss.style.height=this.height+'px';
            sss.style.position='absolute';
            sss.style.background=last.pic;
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
                snake.body[0].ele.style.background='url(images/snake_head_right.png)';
            }
            break;
        case 40:
            if (snake.direction!='down'){
                snake.direction='up';
                snake.body[0].ele.style.background='url(images/snake_head_top.png)';
            }
            break;
        case 39:
            if (snake.direction!='left'){
                snake.direction='right';
                snake.body[0].ele.style.background='url(images/snake_head_left.png)';
            }
            break;
        case 38:
            if (snake.direction!='up'){
                snake.direction='down';
                snake.body[0].ele.style.background='url(images/snake_head_bottom.png)';
            }
            break;
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
        this.x=Math.floor(Math.random()*50);
        this.y=Math.floor(Math.random()*50);
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
