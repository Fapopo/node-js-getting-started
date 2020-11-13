
// Setup basic express server

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

//app.use(express.cookieParser());


server.listen(port);
app.use(express.static('public'));


//Cookieパーサミドルウェアを読み込む
//app.use(express.cookieParser());
//app.use(express.methodOverride());
//app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
//

var fs = require('fs');//readwrite

var data=[];
var rec=[];

function flr(a){
	return Math.floor(a);
}
function rnd(a){
	return Math.floor(Math.random()*a);
}
function abs(a){
	return Math.abs(a);
}
///

//var wx=800;
//var wy=640;

//var wx=400;
//var wy=320;
var ky=[];
var debug=0;
var hash={};
var mx=0;
var my=0;
var zoom=1;
var lx=-8;
var ly=-8;
var fps=15;
var canvasin=0;
var date=Date.now();
var stage;
var chr;
var dat=[];
var datA={};
var box=[];
var vox={};
var voxE={};
var craft=0;
var canx=360;
var cany=640;
var info=[];




var dat=[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,1,1,0,0,0,0,0,0,0,1,0,0,1],
[1,0,1,0,1,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
[1,0,0,0,1,0,0,0,0,1,1,1,1,0,1],
[1,0,0,0,1,0,0,0,0,1,1,0,0,0,1],
[1,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

var wx=16*10;
var wy=16*20;

wx=16*20;
wy=16*20;

for(var j=0;j<wy/16;j++){
	dat.push([]);
  for(var i=0;i<wx/16;i++){
		dat[j].push([]);
    dat[j][i]=0;
 }
}
var wx=16*dat[0].length;
var wy=16*dat.length;

var datR=[];

var datX=[];
var datY=[];
var datD=[];

for(var j=0;j<wy/16;j++){
	datX.push([]);
	datY.push([]);
	datD.push([]);
  for(var i=0;i<wx/16;i++){
		datX[j].push([]);
    datX[j][i]=0;
		datY[j].push([]);
    datY[j][i]=0;
		datD[j].push([]);
    datD[j][i]=0;
 }
}
function info_add(a){
   info.push(a); 
  // if(info.length>=21)info.shift();
   if(info.length>=7)info.shift();
}
function make(){
  //map_creat
  for(;;){
    for(var i=0;i<wx/16;i++){
      for(var j=0;j<wy/16;j++){
        if(i==0||j==0||i==wx/16-1||j==wy/16-1){
          dat[j][i]=1;
        }else{
          dat[j][i]=0;
          if(rnd(100)<30)dat[j][i]=1;
        }
      }
    }
    //Dead or Alive
    var p=0;
    for(var k=0;k<100;k++){
      p=0;
      for(var i=0;i<wx/16;i++){
        for(var j=0;j<wy/16;j++){
          if(dat[j][i]==1){datD[j][i]=-1;continue;}
          var a=0;
          if(dat[j][i-1]==1||datD[j][i-1]>0)a++;
          if(dat[j-1][i]==1||datD[j-1][i]>0)a++;
          if(dat[j][i+1]==1||datD[j][i+1]>0)a++;
          if(dat[j+1][i]==1||datD[j+1][i]>0)a++;
          if(a>=3){datD[j][i]=0;p++;}
        }
      }
      if(p==0)break;
    }
    dat[1][1]=0;
    datR=[];
    for(var i=0;i<wx/16;i++){
      datR.push([]);
      for(var j=0;j<wy/16;j++){
        datR[i].push([]);
        for(var a=0;a<wx/16;a++){
          datR[i][j].push([]);
          for(var b=0;b<wy/16;b++){
            datR[i][j][a].push([]);
            datR[i][j][a][b]=-11;

          }
        }
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //rt_creat
    for(var i=0;i<wx/16;i++){
      for(var j=0;j<wy/16;j++){
        var p=0;
        var q=wx/16*wy/16;
        var r=0;
        for(;p!=q;){
          if(p!=0)if(p==r){
            for(var a=0;a<wx/16;a++){
              for(var b=0;b<wy/16;b++){
                if(datR[i][j][a][b]==-11)datR[i][j][a][b]=-1;
              }
            }
            break;
          }
          r=p;
          for(var a=0;a<wx/16;a++){
            for(var b=0;b<wy/16;b++){
              if(datR[i][j][a][b]!=-11)continue;
              if(dat[j][i]==1){datR[i][j][a][b]=-1;p++;continue;}
              if(dat[b][a]==1){datR[i][j][a][b]=-1;p++;continue;}
              if(i==a)if(j==b){datR[i][j][a][b]=0;p++;continue;}
              if(datR[i][j][a-1][b]!=-11)if(datR[i][j][a-1][b]!=-1){datR[i][j][a][b]=datR[i][j][a-1][b]+1;p++;continue;}
              if(datR[i][j][a][b-1]!=-11)if(datR[i][j][a][b-1]!=-1){datR[i][j][a][b]=datR[i][j][a][b-1]+1;p++;continue;}
              if(datR[i][j][a+1][b]!=-11)if(datR[i][j][a+1][b]!=-1){datR[i][j][a][b]=datR[i][j][a+1][b]+1;p++;continue;}
              if(datR[i][j][a][b+1]!=-11)if(datR[i][j][a][b+1]!=-1){datR[i][j][a][b]=datR[i][j][a][b+1]+1;p++;continue;}

            }
          }
        }
      }
    }
    var a=0;
    for(var j=wy/16-2;j>=wy/16/2;j--){
      for(var i=wx/16-2;i>=1;i--){
        if(datR[1][1][i][j]!=-1){
          a=1;
          break;
        }
      }
      if(a==1)break;
    }
    if(a==1)break;
  }
}

make();
///////////////////////////////////////////////////////////////////////////////////////////////////////////



var none=new Spr();
var imgBase={};
//var sw=img("https://cdn.glitch.com/4679d61f-4eb5-40f6-9323-8bc67bc4e544%2Fchr.png?1528546370510");
var sw=img("https://cdn.glitch.com/9a499b5a-1eb9-429d-bfd7-8178bc6724bd%2Fimg.png?1538057858840");
//global func
/*
function flr(a){
	return Math.floor(a);
}
function rnd(a){
	return Math.floor(Math.random()*a);
}
function abs(a){
	return Math.abs(a);
}*/
function mes(a,b,c){
  data.push([3,a,b,c]);
}
function log(a){
	//var wx3=wx*2;
  data.push([7,a]);
}
function mesB(a,b,c,d,e){
  //str,x,y,col,bcol
	var wx3=wx*2;
  data.push([11,a,b,c,d,e]);
}
      
      
function img(a){
}
/*
function log(a){
// logtext.value+=a;
 //logtext.scrollTop = logtext.scrollHeight;

}*/
function draw1(b,c,d,e,f,g){
//  if(a!=0)if(d!=0)if(e!=0)ctx.drawImage(a,b,c,d,e,f,g,d*zoom,e*zoom);
  if(d!=0)if(e!=0)data.push([2,b,c,d,e,f,g]);
}
function draw0(a,b,c,d,e,f,g){
//  if(a!=0)if(d!=0)if(e!=0)ctx.drawImage(a,b,c,d,e,f,g,d*zoom,e*zoom);
  if(a!=0)if(d!=0)if(e!=0)data.push([2,b,c,d,e,f,g]);
}
function drawofs(a,b,c,d,e,f,g){
  //if(a!=0)if(d!=0)if(e!=0)ctx.drawImage(a,b,c,d,e,f+lx,g+ly,d*zoom,e*zoom);
}
  	
//class Spr
function del(a){
  spr.splice(spr.indexOf(a),1);

}


var num=[37,38,39,40,73,75,81,97,98,99,100];
var id=0;
function Spr(){
	this.mode="muteki";
	this.lay=0;
	this.dr=0;
	this.x=0;
	this.y=0;
  this.mac=0;
  this.name="";
  this.com="";
  this.id=id++;
  this.socket=0;
	this.mx=0;
	this.my=0;
  this.ai=0;
	this.hp=0;
  this.ky=[];
  this.time=0;
  this.deadtime=0;
  this.nexttime=0;
  this.craft=0;
  this.en=0;
  this.col=this.id%6;
  this.bufftime=0;
  this.walltime=0;
  this.money=0;
  this.rate=5;
  this.r=0;
	this.j=0;
  this.lv=0;
  this.password="";
  this.winword="";
  this.lastword="";
  this.playtime=0;
  //this.rt=[];
  //this.rtno=0;
  //this.rtloop=2;
  //this.joint=[];
  //this.auto=0;
  this.tg=0;
  this.tgmx=-1;
  this.tgmy=-1;
  //this.step=1;
  //this.norma=1;
  this.iq=rnd(100);
  this.envy=0;
  this.envymax=fps*3+rnd(10);
  this.scoretime=0;
  //this.parent=none;
  this.type="Spr";
	this.task=function(){
    this.time++;
    this.playtime++;
    if(this.bufftime>0)this.bufftime--;
    if(this.walltime>0)this.walltime--;
    if(this.mode=="muteki")if(this.time>fps*3)this.mode="";
    if(this.mode=="dead")this.deadtime++;
    this.envy++;
  };
	this.act=function(){};
	this.draw=function(){};
  this.ky[37]=this.ky[38]=this.ky[39]=this.ky[40]=this.ky[75]=this.ky[81]=this.ky[97]=this.ky[98]=this.ky[99]=0;
	this.del=function(){
    spr.splice(spr.indexOf(this),1);
  };
	this.hit=function(a,b){
    return this.hit1(this.mx+a,this.my+b);
  }
	this.hit1=function(a,b){
    var dx=a;
    var dy=b;
    if(dx<0)return ["kabe",1];
    if(dy<0)return ["kabe",1];
    if(dx>=wx/16)return ["kabe",1];
    if(dy>=wy/16)return ["kabe",1];  
    if(vox.hasOwnProperty(""+dx+","+dy)){
        var v=vox[""+dx+","+dy];
    ///   if(this.type==v.type)return ["landok",v];
       
       if(this.type!=v.type){
         if(this.type=="Enm")if(v.type=="Chr")if(v.mode=="dead")return ["landok",dat[dy][dx]];
         return ["obj",v];
      }
    }
   // if(dat[dx][dy]==0)["landok",dat[dx][dy]];
   //else return ["landx",dat[dx][dy]];
    if(dat[dy][dx]==1)return ["landx",dat[dy][dx]];
    else return ["landok",dat[dy][dx]];
  }
}	
var chrnum=30;
function Stage(){
	Spr.apply(this);
  this.lay=-2;
  //dat[wx/16/2][wy/16/2]+=32;
  
  for(var i=0;i<chrnum;i++){
    var c=new Chr();
    spr.push(c);
  }
  for(var i=0;i<3;i++){
    var e=new Enm();
    spr.push(e);
  }
  this.act=function(){
    if(this.time%(fps*15)==0){
      var a=rnd(wx/16);
      var b=rnd(wy/16);
      if(dat[b][a]!=1){
        var i=new Item();
        i.x=a*16;
        i.y=b*16;
        spr.push(i);
      }
    }
  }
	this.draw=function(){
    draw0(sw,384,0,wx,wy,0,0);   
    
    for(var i=0;i<wx/16;i++)
    for(var j=0;j<wy/16;j++){
      draw0(sw,416,208,16,16,i*16,j*16);
      if(dat[j][i]==1)draw0(sw,464,352,16,16,i*16,j*16);
    }
    
    for(var i=0;i<info.length;i++){
        log(info[i]);
    }
    //if(info.length>0)mesC(info[info.length-1],32,32);
    var a=0;
    var s1=0;
    for(var i=0;i<spr.length;i++){
       var s=spr[i];
       if(s.type=="Chr")if(s.mode!="dead"){
         a++;
         s1=s; 
       }
    }
    if(this.nexttime==0){
      //mesA("あと"+a+"人",100,64);
      if(a<=1)this.nexttime++;
    }
    if(this.nexttime>0){
      if(s1!=0){
        if(this.nexttime==1)info_add(s1.name+": "+s1.winword);
        s1.mode="clear";
      }else{
        if(this.nexttime==1)info_add("全滅した");
      }
      this.nexttime++;
    }
    if(this.nexttime==fps*10){
      make();
      this.nexttime=0;
      spr=[];
      for(var key in hash)if(hash.hasOwnProperty(key)){
        var p=hash[key];
        var h=hash[key]=new Chr();
        h.socket=p.socket;
        h.name=p.name;
        h.lastword=p.lastword;
        spr.push(h);
      }
      spr.push(stage=new Stage());
    }
  
  } 
}
var names=["ゆな","まり","れな","みか","りか","さち","らら","ちか","えな","えま","あい","うみ","かな","りこ","めめ","ようこ","ころ","わみ","ぽぽ","エル","レイ","りんご","ナナ","ケイナ"];
var names3=["れつ","じん","こう","さん","ぴり"];
function Chr(){
 	Spr.apply(this);
  this.sp=4;
  this.name="ゆな";
  this.name=names[rnd(names.length)];
  if(this.col==4)this.name=names3[rnd(names3.length)];
  this.type="Chr";
  this.hp=100;
  this.en=100;
  this.x=16*1;
  this.y=16*1;
  var r=id%3;
  var r=2;
  if(r==2){
    this.rtloop=2;
    this.rt=[];
  }
  if(this.rt.length!=0){
  }
  this.x=1*16;
  this.y=1*16;
  this.mx=this.x/16;
  this.my=this.y/16;
  this.winword=["勝利！","助かった","え、もうひとり・・・？","よし","フフフ・・・"][rnd(5)];
  this.lastword=["うぎゃあああ","きゃあああああ","きょえええええ！","まだ、まだだぁぁぁ・・・","無念"][rnd(5)];
  this.act=function(){
    if(this.mode=="dead"){
      if(this.deadtime==1){
         info_add(this.name+": "+this.lastword); 
      }else if(this.deadtime<100){
        //mes(this.lastword,this.x,this.y-50);
      }else if(this.deadtime==100){
        var e=new Enm();
        e.dr=this.dr;
        e.x=this.x;
        e.y=this.y;
        e.iq=this.iq;
        e.name=this.name;
        e.winword=this.winword;
        e.lastword=this.lastword;
        e.socket=this.socket;
        hash[e.socket]=e;
        spr.push(e);
        del(this);
        /*
        this.mode="muteki";
        this.time=0;
        this.deadtime=0;
        this.craft=flr(this.craft/2);
        this.x=wx/2;
        this.y=wy/2;
        this.x=16*10;
        this.y=16*10;
        
        this.mx=this.x/16;
        this.my=this.y/16;
        vox[""+this.mx+","+this.my]=this;
        */
       }
       return;
    }
    if(this.socket==0){
      if(this.money>=500){
        if(this.bufftime==0)if(rnd(100)<3){
          this.ky[75]=1;
        }
        if(rnd(100)<3){
          this.ky[73]=1;
        }
      }
    }else{
      
    }
    if(this.ky[75]==1){
      this.ky[75]=0;
      if(this.money>=500){
        this.money-=500;
        if(this.col>=0){
          this.bufftime=fps*5;
        }
      }
    }
    if(this.ky[73]==1){
      this.ky[73]=0;
      if(this.money>=500){
        this.money-=500;
        if(this.col>=0){
          var w=new Wall();
          w.x=this.mx*16;
          w.y=this.my*16;
          spr.push(w);
        }
      }
    }
    if((this.x+this.y)%4==0){
      if(this.bufftime<=0){
        this.sp=4;
        this.bufftime=0;
      }
    }
    if((this.x+this.y)%8==0){
      if(this.bufftime>0){
        this.sp=8;
      }
    }
    if((this.x+this.y)%16==0){
      if(this.socket==0){
        this.ky[37]=0;
        this.ky[38]=0;
        this.ky[39]=0;
        this.ky[40]=0;
        this.ky[73]=0;
        this.ky[75]=0;
        this.ky[81]=0;

        if(this.tg==0||this.tg.mode=="dead"||this.envy>this.envymax){
          this.envy=0;
          var s=0;
          var l=[];
          for(var i=0;i<spr.length;i++){
            s=spr[i];
            if(s.type=="Enm")if(s.mode!="dead"){
              l.push(s);
              //this.tg=s;
              //break;
            }
          }
          if(l.length>0){
           this.tg=l[rnd(l.length)];
           //this.tgmx=this.tg.mx;
           //this.tgmy=this.tg.my;
          }
          
        }
        if(this.tg!=0){
          var r=-1;
          if(this.tgmx==-1||this.tgmy==-1||rnd(100)<this.iq){
             //this.tgmx=this.tg.mx;
             //this.tgmy=this.tg.my;
            
              var dx=-1;
              var dy=-1;
              var d=datR[this.tg.mx][this.tg.my][this.mx][this.my];
              var rn=rnd(1);
              var nx=flr(wx/16/2*rnd(2));
              var ny=flr(wy/16/2*rnd(2));
              if(rn==0){
                for(var i=nx;i<flr(nx+wx/16/2);i++)
                for(var j=ny;j<flr(ny+wy/16/2);j++){
//                for(var i=0;i<wx/16;i++)
  //              for(var j=0;j<wy/16;j++){
                  var w=datR[this.tg.mx][this.tg.my][i][j];
                  if(d<w){
                    d=w;
                    dx=i;
                    dy=j;
                  }
                }
              }else if(rn==1){
                for(var i=wx/16-1;i>=0;i--)
                for(var j=wy/16-1;j>=0;j--){
                  var w=datR[this.tg.mx][this.tg.my][i][j];
                  if(d<w){
                    d=w;
                    dx=i;
                    dy=j;
                  }
                }
              }else if(rn==2){
                for(var i=0;i<wx/16;i++)
                for(var j=wy/16-1;j>=0;j--){
                  var w=datR[this.tg.mx][this.tg.my][i][j];
                  if(d<w){
                    d=w;
                    dx=i;
                    dy=j;
                  }
                }
              }else if(rn==3){
                for(var i=wx/16-1;i>=0;i--)
                for(var j=0;j<wy/16;j++){
                  var w=datR[this.tg.mx][this.tg.my][i][j];
                  if(d<w){
                    d=w;
                    dx=i;
                    dy=j;
                  }
                }
              }
              if(dx!=-1){
                this.tgmx=dx;
                this.tgmy=dy;
              }
          }
          
          var d=datR[this.tgmx][this.tgmy][this.mx][this.my];
          var d0=datR[this.tgmx][this.tgmy][this.mx-1][this.my];
          var d1=datR[this.tgmx][this.tgmy][this.mx][this.my-1];
          var d2=datR[this.tgmx][this.tgmy][this.mx+1][this.my];
          var d3=datR[this.tgmx][this.tgmy][this.mx][this.my+1];
/*
          var m=datR[this.mx][this.my][this.tg.mx][this.tg.my]*2;
          var m0=datR[this.mx-1][this.my][this.tg.mx][this.tg.my]*2;
          var m1=datR[this.mx][this.my-1][this.tg.mx][this.tg.my]*2;
          var m2=datR[this.mx+1][this.my][this.tg.mx][this.tg.my]*2;
          var m3=datR[this.mx][this.my+1][this.tg.mx][this.tg.my]*2;
          */
          var m=datX[this.my][this.mx];
          var m0=datX[this.my][this.mx-1];
          var m1=datX[this.my-1][this.mx];
          var m2=datX[this.my][this.mx+1];
          var m3=datX[this.my+1][this.mx];
          
          if(d!=-1)d+=m;
          if(d0!=-1)d0+=m0;
          if(d1!=-1)d1+=m1;
          if(d2!=-1)d2+=m2;
          if(d3!=-1)d3+=m3;
          
          var n=datD[this.my][this.mx];
          var n0=datD[this.my][this.mx-1];
          var n1=datD[this.my-1][this.mx];
          var n2=datD[this.my][this.mx+1];
          var n3=datD[this.my+1][this.mx];
          
          if(d!=-1)d+=n;
          if(d0!=-1)d0+=n0;
          if(d1!=-1)d1+=n1;
          if(d2!=-1)d2+=n2;
          if(d3!=-1)d3+=n3;
          
      /*    var d=get(this.tgmx,this.tgmy,this.mx,this.my);
          var d0=get(this.tgmx,this.tgmy,this.mx-1,this.my);
          var d1=get(this.tgmx,this.tgmy,this.mx,this.my-1);
          var d2=get(this.tgmx,this.tgmy,this.mx+1,this.my);
          var d3=get(this.tgmx,this.tgmy,this.mx,this.my+1);
          */
          var p=rnd(4);
          for(var q=0;q<4;q++){
            if((p+q)%4==0)if(d0!=-1)if(d0<=d){r=0;d=d0;}
            if((p+q)%4==1)if(d1!=-1)if(d1<=d){r=1;d=d1;}
            if((p+q)%4==2)if(d2!=-1)if(d2<=d){r=2;d=d2;}
            if((p+q)%4==3)if(d3!=-1)if(d3<=d){r=3;d=d3;}
          }

          /*if(d0!=-1)if(d0<=d){r=0;d=d0;}
          if(d1!=-1)if(d1<=d){r=1;d=d1;}
          if(d2!=-1)if(d2<=d){r=2;d=d2;}
          if(d3!=-1)if(d3<=d){r=3;d=d3;}*/
          if(r!=-1)this.ky[37+r]=1;
        }
        //this.ky[37+rnd(4)]=1;
      }else{
      }
      //if(this.col==1)this.sp=8;
      this.mx=this.x/16;
      this.my=this.y/16;
      var h=this.hit(0,0);
      //console.log([1]);
      //this.money+=10;
      
      if(this.ky[37]>0){
        var h=this.hit(-1,0);
        if(h[1]==0){this.dr=0;this.mx-=1;this.x-=this.sp;}
      }else if(this.ky[38]>0){
        var h=this.hit(0,-1);
        if(h[1]==0){this.dr=1;this.my-=1;this.y-=this.sp;}
      }else if(this.ky[39]>0){
        var h=this.hit(1,0);
        if(h[1]==0){this.dr=2;this.mx+=1;this.x+=this.sp;}
      }else if(this.ky[40]>0){
        var h=this.hit(0,1);
        if(h[1]==0){this.dr=3;this.my+=1;this.y+=this.sp;}
      }
    }else{
      if(this.dr==0)this.x-=this.sp;
      if(this.dr==1)this.y-=this.sp;
      if(this.dr==2)this.x+=this.sp;
      if(this.dr==3)this.y+=this.sp;
    }
    //if(this.mode!="dead")vox[""+this.mx+","+this.my]=this;
  }
	this.draw=function(){
    if(this.mode==""||this.mode=="muteki"||this.mode=="clear"){
      var dx=this.col%5*16*5+flr((this.x+this.y)/16)%4*16;
      var dy=flr(this.col/5)*(32*4+16)+32*[2,1,3,0][this.dr];
      var s=1;
      if(this.mode=="muteki")s=this.time%5;
      if(this.mode=="clear")s=this.time%3;
      if(this.mode=="clear")mesB(this.winword,18+this.x,this.y-16,"#ffffff","#000");
      if(s)draw0(sw,dx,dy,16,32,this.x,this.y-16-4);
    }else if(this.mode=="dead"){
      var dx=0;
      var dy=448;
      draw0(sw,dx,dy,16,32,this.x,this.y-16-4);
      var s="";
     /* for(var i=0;i<10;i++){
        if(i*10<this.deadtime)s+="■";
        else s+="□";
      }
      mes("reborn time:"+s,this.x,this.y-10);*/
    }
   // mes(this.name+" lv."+this.lv,this.x,this.y-20);
    if(this.deadtime>0)if(this.deadtime<100)
    mesB(this.lastword,18+this.x,this.y-16,"#ffffff","#000");
    if(this.money>0)mes(this.money+"円",this.x,this.y-30-12);
    mes(this.name+"",this.x,this.y-20-12);
  
  }  
}

function get(a,b,c,d){
  var g=datR[a][b][c][d];
  if(g!=-1)g+=datX[d][c];
  return g;
}
function set(a,b,c,d,e){
//	datR[a][b][c][d]=e;
}
function Enm(){
 	Spr.apply(this);
  this.sp=4;
  this.name="先生";
  this.type="Enm";
  this.hp=100;
  this.en=100;
  this.rtno=0;
  this.rt=[3,2,10,2,10,1];
  this.x=16*1;
  this.y=16*1;
  this.iq=50+rnd(50);
  this.mx=this.x/16;
  this.my=this.y/16;
  this.col=10;
  if(this.id%5==0){
    this.col=11;
    this.envymax=fps*60;
  }
//  this.as=[];
  this.act=function(){
    
    if(this.time<fps*3)return;
    if((this.x+this.y)%4==0){
      if(this.walltime<=0){
        this.sp=4;
        this.walltime=0;
      }
    }
    if((this.x+this.y)%16==0){
      this.mx=this.x/16;
      this.my=this.y/16;
      if(this.socket==0){
        this.ky[37]=0;
        this.ky[38]=0;
        this.ky[39]=0;
        this.ky[40]=0;
        if(this.tg==0||this.tg.mode=="dead"||this.envy>this.envymax){
          this.envy=0;
          var s=0;
          var l=[];
          for(var i=0;i<spr.length;i++){
            s=spr[i];
            if(s.type=="Chr")if(s.mode==""){
              l.push(s);
            }
          }
          if(l.length>0){
           this.tg=l[rnd(l.length)];
           if(rnd(100)<this.tg.iq)this.tg.tg=s;
           this.tgmx=this.tg.mx;
           this.tgmy=this.tg.my;
          }
        }
        if(this.tg!=0){
          var r=-1;     
          if(this.tgmx==-1)
          if(this.tgmy==-1)
          {
             this.tgmx=this.tg.mx;
             this.tgmy=this.tg.my;
          }
          if(this.mx==this.tgmx)
          if(this.my==this.tgmy)

          {
             this.tgmx=this.tg.mx;
             this.tgmy=this.tg.my;
          }
          var d=datR[this.tgmx][this.tgmy][this.mx][this.my];
          var d0=datR[this.tgmx][this.tgmy][this.mx-1][this.my];
          var d1=datR[this.tgmx][this.tgmy][this.mx][this.my-1];
          var d2=datR[this.tgmx][this.tgmy][this.mx+1][this.my];
          var d3=datR[this.tgmx][this.tgmy][this.mx][this.my+1];

  /*        var d=get(this.tgmx,this.tgmy,this.mx,this.my);
          var d0=get(this.tgmx,this.tgmy,this.mx-1,this.my);
          var d1=get(this.tgmx,this.tgmy,this.mx,this.my-1);
          var d2=get(this.tgmx,this.tgmy,this.mx+1,this.my);
          var d3=get(this.tgmx,this.tgmy,this.mx,this.my+1);
*/
          var p=rnd(4);
          for(var q=0;q<4;q++){
            if((p+q)%4==0)if(d0!=-1)if(d0<d){r=0;d=d0;}
            if((p+q)%4==1)if(d1!=-1)if(d1<d){r=1;d=d1;}
            if((p+q)%4==2)if(d2!=-1)if(d2<d){r=2;d=d2;}
            if((p+q)%4==3)if(d3!=-1)if(d3<d){r=3;d=d3;}
          }
          if(r!=-1)this.ky[37+r]=1;
        }
      }else{
        
      }
      var h=this.hit(0,0);
      if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";}

      if(this.ky[37]>0){
        this.dr=0;
        var h=this.hit(-1,0);
        var a=0;
        if(h[0]=="landok")a=1;
        if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
        if(a){
          this.mx-=1;
          //if(h[1]!=32+3)
            this.x-=this.sp; 
          //else this.x-=this.sp*2;
        }
      }else if(this.ky[38]>0){
        this.dr=1;
        var h=this.hit(0,-1);
        var a=0;
        if(h[0]=="landok")a=1;
        if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
        if(a){
          this.my-=1;
          //if(h[1]!=32+3)
          this.y-=this.sp; 
          //else this.y-=this.sp*2;
        }
      }else if(this.ky[39]>0){
        this.dr=2;
        var h=this.hit(1,0);
        var a=0;
        if(h[0]=="landok")a=1;
        if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
        if(a){
          this.mx+=1;
          //if(h[1]!=32+3)
          this.x+=this.sp; 
          //else this.x+=this.sp*2;
        }
      }else if(this.ky[40]>0){
        this.dr=3;
        var h=this.hit(0,1);
        var a=0;
        if(h[0]=="landok")a=1;
        if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
        if(a){
          this.my+=1;
          //if(h[1]!=32+3)
          this.y+=this.sp; 
          //lse this.y+=this.sp*2;
        }
      }
    }else{
      if(this.dr==0)this.x-=this.sp;
      if(this.dr==1)this.y-=this.sp;
      if(this.dr==2)this.x+=this.sp;
      if(this.dr==3)this.y+=this.sp;
    }
    
    //vox[""+this.mx+","+this.my]=this;
   }
	this.draw=function(){
    //this.col=10;
    if(this.ai==0){
      var dx=this.col%5*16*5+flr((this.x+this.y)/16)%4*16;
      var dy=flr(this.col/5)*(32*4+16)+32*[2,1,3,0][this.dr];
      var s=1;
      //(this.mode=="muteki")s=this.time%5;
      if(s)draw0(sw,dx,dy,16,32,this.x,this.y-16-4);
    }
    if(this.ai==1){
      var dx=this.col%5*16*5+flr((this.x+this.y)/16)%4*16;
      var dy=flr(this.col/5)*(32*4+16)+32*[2,1,3,0][this.dr];
      var s=1;
      //(this.mode=="muteki")s=this.time%5;
      if(s)draw0(sw,dx,dy,16,32,this.x,this.y-16-4);
    }
  
//    mes(this.name+" lv."+this.lv,this.x,this.y-20);
//    mes("rt:"+this.rt,this.x,this.y-20);
//    mes(""+this.tgmx+","+this.tgmy,this.x,this.y-20);
    //mes(" hp."+this.hp,this.x,this.y-6);
     //mes(" en."+this.en,this.x,this.y-13);
    //mes(" r."+this.r,this.x,this.y-20);
    //mes(" x."+(this.x+this.y)%16,this.x,this.y-20);
    //if(this.chan=="player")log(this.r)
  }  
}
function Eft(){
 	Spr.apply(this);
  this.lay=-1;
  this.act=function(){
    if(this.time==fps*3)del(this);
  }
	this.draw=function(){
    draw0(sw,352,flr(this.time/5)%2*32,48,32,this.x-16,this.y-16);
  }  
}
function Item(){
 	Spr.apply(this);
  //this.lay=0;
  this.type="Item";
  this.act=function(){
      this.mx=this.x/16;
      this.my=this.y/16;
      var v=vox[""+this.mx+","+this.my];
      if(v)if(v.type=="Chr"){
        v.money+=500; 
        del(this);
      }
  }
	this.draw=function(){
    draw0(sw,16*0,432,16,16,this.x,this.y-4);
  }  
}
function Wall(){
 	Spr.apply(this);
  //this.lay=0;
  this.type="Wall";
  this.act=function(){
      this.mx=this.x/16;
      this.my=this.y/16;
      var v=voxE[""+this.mx+","+this.my];
      if(v)if(v.type=="Enm"){
        v.sp=2;
        v.walltime=fps*5;
        del(this);
      }
     // vox[""+this.mx+","+this.my]=this;
  }
	this.draw=function(){
    draw0(sw,32,432,16,16,this.x,this.y-4);
  }  
}
var t=0;
var numUsers = 0;


var spr=new Array();
spr.push(stage=new Stage());






var update=function(){
  
  var l=data.toString().length;
  data=[];
  //data.push([0,"numData="+l+"文字"]);
  //data.push([0,"numUsers="+numUsers]);
  //data.push([0,"numHashs="+Object.keys(hash).length]);
  //data.push([0,"numSprs="+spr.length]);
  
  
  var s="";
  s+="ms:"+(Date.now()-date)+"\n";
  s+="fps:"+flr(1000/(Date.now()-date))+"\n";
  date=Date.now();
  /*for(var key in hash)if(hash.hasOwnProperty(key)){
    var h=hash[key];
    s+="socket.id:"+key+"\n";
    s+="m: "+h.mac+"\n";
    s+="name:"+h.name+",";
    s+="mode:"+h.mode+",";
    s+="x:"+h.x+",";
    s+="y:"+h.y+",";
    s+="mx:"+h.mx+",";
    s+="my:"+h.my+",";
    s+="dr:"+h.dr+",";
    s+="ky[37]:"+h.ky[37]+",";
    s+="ky[38]:"+h.ky[38]+",";
    s+="ky[39]:"+h.ky[39]+",";
    s+="ky[40]:"+h.ky[40]+",";
    s+="\n\n";
    

  }
  for(var key in vox)if(vox.hasOwnProperty(key)){
    var h=vox[key];
    s+="key:"+key+"  ";
  }*/
  
//  data.push([0,s]);
//  data.push([0,"debug="+debug]);
  //data.push([1,dat]);

//datR 最短距離
//datX Enm分布
//datD 先端経路
  vox={};
  voxE={};
  for(var i=0;i<spr.length;i++){
    var s=spr[i];
    //if(s.type=="Enm"||s.type=="Chr"||s.type=="Wall"){
    if(s.type=="Chr"&&s.mode!="dead"){
      var dx=flr(s.x/16);
      var dy=flr(s.y/16);
      vox[s.mx+","+s.my]=s;
    }
    if(s.type=="Enm"&&s.mode!="dead"){
      var dx=flr(s.x/16);
      var dy=flr(s.y/16);
      voxE[s.mx+","+s.my]=s;
    }
  }
  for(var b=0;b<wy/16;b++)
  for(var a=0;a<wx/16;a++)datX[b][a]=0;

  for(var i=0;i<spr.length;i++){
    var s=spr[i];
    if(s.type=="Enm")
    for(var a=-4;a<=4;a++)
    for(var b=-4;b<=4;b++)
    if(s.my+b>=0)
    if(s.mx+a>=0)
    if(s.my+b<wy/16)
    if(s.mx+a<wx/16){
      var c=9-datR[s.mx][s.my][s.mx+a][s.my+b]*2;
      if(c<0)c=0;
      //var c=9-Math.max(abs(a),abs(b))*2;
      datX[s.my+b][s.mx+a]+=c;
    }
  }
  /*
  for(var b=0;b<wy/16;b++)
  for(var a=0;a<wx/16;a++)datY[b][a]=0;
  
  for(var i=0;i<spr.length;i++){
    var s=spr[i];
    if(s.type=="Enm"){
      for(var b=0;b<wy/16;b++)
      for(var a=0;a<wx/16;a++)datY[b][a]+=datR[s.mx][s.my][a][b];
    }
  }*/
//  for(var i=0;i<5;i++)
 // for(var j=0;j<4;j++)
  //mesA(datX[1+j][1+i],64+i*48,64+j*48);
  
  for(var i=0;i<spr.length;i++){
    var s=spr[i];
    s.task();
    s.act();
   	if(s.lay==0)
    for(var j=0;j<num.length;j++){
      if(s.ky[num[j]]>0)s.ky[num[j]]++;
    }
  }
	spr.sort(function(a,b){
		if(a.lay==b.lay){
      if(a.y==b.y){
        //if(a.x==b.x)return a.id-a.id;
        //return a.x-b.x;
        return a.id-b.id;
      }
		  return a.y-b.y;
    }
    return a.lay-b.lay;
	});
  
  
  for(var key in hash)if(hash.hasOwnProperty(key)){
    var h=hash[key];
    io.to(key).json.emit("tg",[h.x,h.y,h.tgmx,h.tgmy]);
  }
  
	for(var i=0;i<spr.length;i++)spr[i].draw();
  

  var a=0;
  var b=0;
  //var s1=0;
  for(var i=0;i<spr.length;i++){
     var s=spr[i];
     if(s.type=="Chr")a++;
     if(s.type=="Enm")b++;
  }
  data.push([100,a,a+b]);
  
  t++;

  
  io.sockets.emit("chroutput",data);
        console.log("deb:"+data.length+"\n");
   //     console.log("deb:"+data+"\n\n\n\n");
}
///


//read();
io.sockets.on('connection', function (socket) {

  debug++;
  numUsers++;
  //console.log('コネクション数:',socket.client.conn.server.clientsCount);
  {
    //socket.username=name;
    
    //socket.emit("login",{username:socket.username});
    var h=hash[socket.id]=new Chr();
    //h.name=name;
    h.socket=socket.id;

    /*var address = require('getmac');

    address.getMac((err, macAddress) => {

      // エラー時の処理
      if (err) {
        throw err;
      }
      var timezoneoffset = -9     // UTC-表示したいタイムゾーン(単位:hour)。JSTなら-9
      var dt= new Date(Date.now() - (timezoneoffset * 60 - new Date().getTimezoneOffset()) * 60000);
      rec.push(
        {
          "mac":macAddress,
          "time":(dt.getFullYear()+" "+(dt.getMonth()+1)+"/"+dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()),
        }
      );      h.mac=macAddress;
      
     // write();
     // read();

    });*/
    //load(this);
    
    
    
 
    //h.col=(numUsers+1)%2;
    spr.push(h);
    socket.emit("usrdata",[h.name,h.winword,h.lastword,h.playtime]);

  }
    
  socket.on("name",function(data){
     hash[socket.id].name=data;
  });
  socket.on("winword",function(data){
     hash[socket.id].winword=data;
  });
  socket.on("lastword",function(data){
     hash[socket.id].lastword=data;
  });
  
  socket.on("password",function(data){
    // var load=function(data){
     hash[socket.id].password=data;
     //load(password);
      var b;
      var path="usr/usr.txt";
      fs.readFile(path,'utf-8', (err, b)=>{
        if (err) {
            throw err;
        }else{
          console.log(b);
          var l=b.split(",");
          var find=0;
          for(var i=l.length-1;i>=0;i--){
             var s=l[i];
             if(i%5==0){
               if(s==hash[socket.id].password){
                 if(find==0){
                    hash[socket.id].name=l[i+1];
                    hash[socket.id].winword=l[i+2];
                    hash[socket.id].lastword=l[i+3];
                    hash[socket.id].playtime=l[i+4];
                    socket.emit("usrdata",[h.name,h.winword,h.lastword,h.playtime]);
                    console.log("\n"+hash[socket.id].name+"のキャラデータをロードしました");
                    console.log(">"+l.join(",")+"\n");
                    find=1;
                 }else if(find==1){
                    l.splice(i,5);
                 }
               }
             }
          }
          var path="usr/usr.txt";
          fs.writeFile(path,l,(err) => {
            if(err){
              console.log("\nエラーが発生しました。\n" + err)
              throw err
            }
            // 書き出しに成功した場合
            else{
              console.log("\nファイルがスリム化されました")
              console.log(">"+l.join(",")+"\n");
            }
          });
        }
      });
  });
    
  socket.on('keyinput', function (data) {
    var h=hash[socket.id];
    //if(data[1]==0)h.ky[data[0]]=data[1];
    //if(data[1]==1)if(h.ky[data[0]]==0)h.ky[data[0]]=data[1];
    h.ky[37]=data[0];
    h.ky[38]=data[1];
    h.ky[39]=data[2];
    h.ky[40]=data[3];
    h.ky[75]=data[4];
    h.ky[73]=data[5];
  
  });
  socket.on('xyinput', function (data) {
    var h=hash[socket.id];
    h.tgmx=data[0];
    h.tgmy=data[1];
    
  });
  
  socket.on('reset', function (data) {
    var path="usr/usr.txt";
    fs.writeFile(path,"", (err) => {
      if(err){
        console.log("エラーが発生しました。" + err)
        throw err
      }
      // 書き出しに成功した場合
      else{
        console.log("\nファイルが正常に初期化されました\n")
      }
    });
    /*make();
    spr=[];
    for(var key in hash)if(hash.hasOwnProperty(key)){
      var p=hash[key];
      var h=hash[key]=new Chr();
      h.socket=p.socket;
      spr.push(h);
    }
    spr.push(stage=new Stage());*/
    
  });
  
  socket.on('exit', function (data) {
     process.exit(1);
  });


  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    var h=hash[socket.id];
    if(h.password=="")h.password="a";
    if(h.name=="")h.name="名無し";
    if(h.winword=="")h.winword="勝利！";
    if(h.lastword=="")h.lastword="ぐはっ！";
    var s=[];
    s.push(h.password.replace(/,/g,""));
    s.push(h.name.replace(/,/g,""));
    s.push(h.winword.replace(/,/g,""));
    s.push(h.lastword.replace(/,/g,""));
    s.push(h.playtime);
    var path="usr/usr.txt";
    fs.appendFile(path,s+",","utf-8", (err) => {
      if(err){
        console.log("エラーが発生しました。" + err)
        throw err
      }
      // 書き出しに成功した場合
      else{
        console.log("\n終了時に"+h.name+"のデータを保存しました");
        console.log(">"+s.join(",")+"\n");
      }
    });
    
    
   // if (addedUser) {
      --numUsers;
      hash[socket.id].socket=0;      
      //del(hash[socket.id]);
      delete hash[socket.id];
      
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    //}
  });
  return socket.id;
  //return name;

});


var run=function(){
   setInterval(
     function(){update();},
     1000.0/fps);
};


run();

