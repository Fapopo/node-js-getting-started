
// Setup basic express server

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
server.listen(port);
app.use(express.static('public'));


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

var wx=800;
var wy=640;
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
var box=[];
var vox={};
var craft=0;

for(var i=0;i<wx/16;i++){
  dat.push([]);
  for(var j=0;j<wy/16;j++){
    var r=2;
    if(i<wx/16/3*2)r=1;
    if(i<wx/16/3*1)r=0;
    dat[i].push(r);    
  }
}
for(var i=0;i<wx/16;i++){
  box.push([]);
  for(var j=0;j<wy/16;j++){
    box[i].push([]);    
  }
}
    
var none=new Spr();
var imgBase={};
var sw=img("https://cdn.glitch.com/4679d61f-4eb5-40f6-9323-8bc67bc4e544%2Fchr.png?1528546370510");
//global func
function flr(a){
	return Math.floor(a);
}
function rnd(a){
	return Math.floor(Math.random()*a);
}
function abs(a){
	return Math.abs(a);
}

function mes(a,b,c){
	var moji=23;
	if(a.length<23)mes3(a,b,c);
	else{
    mes3(a,b,c);
		//mes3(a.substr(0,moji),b,c);
		//mes3(a.substr(moji,a.length-moji),b,c+fsize);
	}
}

function mes3(a,b,c){
	var wx3=wx*2;
  data.push([3,a,b,c]);
}
      
      
function img(a){
}

function log(a){
// logtext.value+=a;
 //logtext.scrollTop = logtext.scrollHeight;

}
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
var num=[37,38,39,40,97,98,99,100];
var id=0;
function Spr(){
	this.mode="muteki";
	this.lay=0;
	this.dr=0;
	this.x=0;
	this.y=0;
  this.mac=0;
  this.name="";
  this.id=id++;
	this.mx=0;
	this.my=0;
  this.ai=0;
	this.hp=0;
  this.ky=[];
  this.time=0;
  this.deadtime=0;
  this.craft=0;
  this.en=0;
  this.col=0;
  this.rate=5;
  this.r=0;
	this.j=0;
  this.lv=0;
  //this.tg=none;
  this.step=1;
  this.norma=1;
  //this.parent=none;
  this.type="Spr";
	this.task=function(){
    this.time++;
    if(this.mode=="muteki")if(this.time>fps*3)this.mode="";
    if(this.mode=="dead")this.deadtime++;
  };
	this.act=function(){};
	this.draw=function(){};
  this.ky[37]=this.ky[38]=this.ky[39]=this.ky[40]=this.ky[97]=this.ky[98]=this.ky[99]=0;
	this.del=function(){
    spr.splice(spr.indexOf(this),1);
  };
	this.hit=function(a,b){
    return this.hit1(this.mx+a,this.my+b);
  }
	this.hit1=function(a,b){
    var dx=a;
    var dy=b;
    if(dx<0)return ["kabe",0];
    if(dy<0)return ["kabe",0];
    if(dx>=wx/16)return ["kabe",0];
    if(dy>=wy/16)return ["kabe",0];  
    if(vox.hasOwnProperty(""+dx+","+dy)){
        var v=vox[""+dx+","+dy];
       if(this.type==v.type)return ["landok",v];
       
       if(this.type!=v.type){
         if(this.type=="Enm")if(v.type=="Chr")if(v.mode=="dead")return ["landok",dat[dx][dy]];
         return ["obj",v];
      }
    }
    if(dat[dx][dy]<32)return ["landx",dat[dx][dy]];
    else return ["landok",dat[dx][dy]];
  }
}	
function Stage(){
	Spr.apply(this);
  this.lay=-2;
  dat[wx/16/2][wy/16/2]+=32;
  this.act=function(){}
	this.draw=function(){
    /*var a=0;
    for(var i=0;i<wx/16;i++)
    for(var j=0;j<wy/16;j++){
      if(dat[i][j]>=32)a++;
      //draw0(sw,256+dat[i][j]%32*16,flr(dat[i][j]/32)*16,16,16,i*16,j*16);      
    }
    craft=a;
    var c=(wx/16)*(wy/16);
    //mes("CRAFT "+craft/c*100+"%/100%",wx-100,32);
    //mes("CRAFT "+Math.floor((craft/c*100),1)+"% ("+craft+"/"+c+")",wx-150,32);
    */
  } 
}
function Chr(){
 	Spr.apply(this);
  this.sp=4;
  this.name="yuna";
  this.type="Chr";
  this.hp=100;
  this.en=100;
  this.act=function(){
    if(this.mode=="dead"){
      
     if(this.deadtime==100){
        this.mode="muteki";
        this.time=0;
        this.deadtime=0;
        this.craft=flr(this.craft/2);
        this.x=wx/2;
        this.y=wy/2;
        this.mx=this.x/16;
        this.my=this.y/16;
        vox[""+this.mx+","+this.my]=this;
     }
     return;
      
      
    }
    if((this.x+this.y)%16==0){
      this.mx=this.x/16;
      this.my=this.y/16;
      if(this.ky[97]>0){
        var dx=this.x/16+[-1,0,1,0][this.dr];
        var dy=this.y/16+[0,-1,0,1][this.dr];
        if(dx>=0)if(dy>=0)if(dx<wx/16)if(dy<wy/16)if(dat[dx][dy]<32){
          dat[dx][dy]=(dat[dx][dy]+32)%64;
          this.craft+=1;
          var e=new Eft();
          e.x=dx*16;
          e.y=dy*16;
          spr.push(e);
          var r=rnd(100);
          if(r<5){
             var e=new Enm();
              e.x=dx*16;
              e.y=dy*16;
              e.mx=dx;
              e.my=dy;
              e.ai=0;
              e.sp=2;
              vox[dx+","+dy]=e;
              spr.push(e);
          }else if(r<15){
             var e=new Enm();
              e.x=dx*16;
              e.y=dy*16;
              e.mx=dx;
              e.my=dy;
              e.ai=1;
              e.sp=4;
              vox[dx+","+dy]=e;
              spr.push(e);
          }
        }      
      }
      if(this.ky[98]==1){
        var dx=this.x/16+[-1,0,1,0][this.dr];
        var dy=this.y/16+[0,-1,0,1][this.dr];
        if(dx>=0)if(dy>=0)if(dx<wx/16)if(dy<wy/16){
          dat[dx][dy]=32+3;
          var e=new Eft();
          e.x=dx*16;
          e.y=dy*16;
          spr.push(e);
        }        
      }
      if(this.ky[99]==1){
        var dx=this.mx+[-1,0,1,0][this.dr];
        var dy=this.my+[0,-1,0,1][this.dr];
        var h=this.hit1(dx,dy);
        if(h[0]=="landok"){
          var a=new Wall();
          a.x=dx*16;
          a.y=dy*16;
          a.mx=dx;
          a.my=dy;
          vox[dx+","+dy]=a;
          spr.push(a);
        }else if(h[0]=="obj")if(h[1].type=="Wall")h[1].del();
      }
      if(this.ky[37]>0){
        this.dr=0;
        var h=this.hit(-1,0);
        if(h[0]=="landok"){
          this.mx-=1;
          if(h[1]!=32+3)this.x-=this.sp; 
          else this.x-=this.sp*2;
        }
      }else if(this.ky[38]>0){
        this.dr=1;
        var h=this.hit(0,-1);
        if(h[0]=="landok"){
          this.my-=1;
          if(h[1]!=32+3)this.y-=this.sp; 
          else this.y-=this.sp*2;
        }
      }else if(this.ky[39]>0){
        this.dr=2;
        var h=this.hit(1,0);
        if(h[0]=="landok"){
          this.mx+=1;
          if(h[1]!=32+3)this.x+=this.sp; 
          else this.x+=this.sp*2;
        }
      }else if(this.ky[40]>0){
        this.dr=3;
        var h=this.hit(0,1);
        if(h[0]=="landok"){
          this.my+=1;
          if(h[1]!=32+3)this.y+=this.sp; 
          else this.y+=this.sp*2;
        }
      }
    }else{
      if(this.dr==0)this.x-=this.sp;
      if(this.dr==1)this.y-=this.sp;
      if(this.dr==2)this.x+=this.sp;
      if(this.dr==3)this.y+=this.sp;
    }
    vox[""+this.mx+","+this.my]=this;
   }
	this.draw=function(){
    if(this.mode==""||this.mode=="muteki"){
      var dx=this.col*16*4+flr((this.x+this.y)/16)%4*16;
      var dy=32*this.dr;
      var s=1;
      if(this.mode=="muteki")s=this.time%5;
      if(s)draw0(sw,dx,dy,16,32,this.x,this.y-16-4);
    }else if(this.mode=="dead"){
      var dx=this.col*16*4;
      var dy=32*4;
      draw0(sw,dx,dy,16,32,this.x,this.y-16-4);
      var s="";
      for(var i=0;i<10;i++){
        if(i*10<this.deadtime)s+="■";
        else s+="□";
      }
      mes("reborn time:"+s,this.x,this.y-10);
    }
    mes(this.name+" lv."+this.lv,this.x,this.y-20);
    mes("craft"+this.craft,this.x,this.y-30);
    //mes(" hp."+this.hp,this.x,this.y-6);
     //mes(" en."+this.en,this.x,this.y-13);
    //mes(" r."+this.r,this.x,this.y-20);
    //mes(" x."+(this.x+this.y)%16,this.x,this.y-20);
    //if(this.chan=="player")log(this.r)
  }  
}
function Enm(){
 	Spr.apply(this);
  this.sp=4;
  this.name="魔物";
  this.type="Enm";
  this.hp=100;
  this.en=100;
  this.act=function(){
    if(this.time<fps*3)return;
    if((this.x+this.y)%16==0){
      this.mx=this.x/16;
      this.my=this.y/16;
      this.dr=rnd(4);
      if(this.ai==0){
        if(this.dr==0){
          this.dr=0;
          var h=this.hit(-1,0);
          var a=0;
          if(h[0]=="landok")a=1;
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
          if(a){
            this.mx-=1;
            if(h[1]!=32+3)this.x-=this.sp; 
            else this.x-=this.sp*2;
          }
        }else if(this.dr==1){
          this.dr=1;
          var h=this.hit(0,-1);
          var a=0;
          if(h[0]=="landok")a=1;
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
          if(a){
            this.my-=1;
            if(h[1]!=32+3)this.y-=this.sp; 
            else this.y-=this.sp*2;
          }
        }else if(this.dr==2){
          this.dr=2;
          var h=this.hit(1,0);
          var a=0;
          if(h[0]=="landok")a=1;
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
          if(a){
            this.mx+=1;
            if(h[1]!=32+3)this.x+=this.sp; 
            else this.x+=this.sp*2;
          }
        }else if(this.dr==3){
          this.dr=3;
          var h=this.hit(0,1);
          var a=0;
          if(h[0]=="landok")a=1;
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
          if(a){
            this.my+=1;
            if(h[1]!=32+3)this.y+=this.sp; 
            else this.y+=this.sp*2;
          }
        }
      }else if(this.ai==1){
        if(this.dr==0){
          this.dr=0;
          var h=this.hit(-1,0);
          var a=0;
          if(h[0]=="landok"||h[0]=="landx")a=1;
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
          if(a){
            this.mx-=1;
            if(h[1]!=32+3)this.x-=this.sp; 
            else this.x-=this.sp*2;
          }
        }else if(this.dr==1){
          this.dr=1;
          var h=this.hit(0,-1);
          var a=0;
          if(h[0]=="landok"||h[0]=="landx")a=1;
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
          if(a){
            this.my-=1;
            if(h[1]!=32+3)this.y-=this.sp; 
            else this.y-=this.sp*2;
          }
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode=="")h[1].mode="dead";
        }else if(this.dr==2){
          this.dr=2;
          var h=this.hit(1,0);
          var a=0;
          if(h[0]=="landok"||h[0]=="landx")a=1;
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
          if(a){
            this.mx+=1;
            if(h[1]!=32+3)this.x+=this.sp; 
            else this.x+=this.sp*2;
          }
        }else if(this.dr==3){
          this.dr=3;
          var h=this.hit(0,1);
          var a=0;
          if(h[0]=="landok"||h[0]=="landx")a=1;
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode==""){h[1].mode="dead";a=1}
          if(a){
            this.my+=1;
            if(h[1]!=32+3)this.y+=this.sp; 
            else this.y+=this.sp*2;
          }
          if(h[0]=="obj")if(h[1].type=="Chr")if(h[1].mode=="")h[1].mode="dead";
        }
        
        
      }
    }else{
      if(this.dr==0)this.x-=this.sp;
      if(this.dr==1)this.y-=this.sp;
      if(this.dr==2)this.x+=this.sp;
      if(this.dr==3)this.y+=this.sp;
    }
    vox[""+this.mx+","+this.my]=this;
   }
	this.draw=function(){
    this.col=0;
    if(this.ai==0){
      var dx=128 +flr((this.x+this.y)/16)%2*16;
      var dy=0;
      draw0(sw,dx,dy,16,32,this.x,this.y-16-4);
    }
    if(this.ai==1){
      var dx=128 +flr((this.x+this.y)/16)%2*32;
      var dy=32;
      draw0(sw,dx,dy,32,32,this.x-8,this.y-16-4);
    }
  
    mes(this.name+" lv."+this.lv,this.x,this.y-20);
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
function Wall(){
 	Spr.apply(this);
  this.lay=0;
  this.type="Wall";
  this.act=function(){
      this.mx=this.x/16;
      this.my=this.y/16;
      vox[""+this.mx+","+this.my]=this;
  }
	this.draw=function(){
    draw0(sw,192,0,16,32,this.x,this.y-16-4);
  }  
}
var t=0;
var numUsers = 0;


var spr=new Array();
spr.push(stage=new Stage());

var update=function(){
  //var l=data.length;
  var l=data.toString().length;
  data=[];
  data.push([0,"numData="+l+"文字"]);
  data.push([0,"numUsers="+numUsers]);
  data.push([0,"numHashs="+Object.keys(hash).length]);
  data.push([0,"numSprs="+spr.length]);
  var s="";
  s+="ms:"+(Date.now()-date)+"\n";
  s+="fps:"+flr(1000/(Date.now()-date))+"\n";
  date=Date.now();
  for(var key in hash)if(hash.hasOwnProperty(key)){
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
  }
  
  data.push([0,s]);
  data.push([0,"debug="+debug]);
  data.push([1,dat]);

  vox={};
  for(var i=0;i<spr.length;i++){
    var s=spr[i];
    if(s.type=="Enm"||s.type=="Chr"||s.type=="Wall"){
      var dx=flr(s.x/16);
      var dy=flr(s.y/16);
      vox[s.mx+","+s.my]=s;
    }
  }
  for(var i=0;i<spr.length;i++){
    var s=spr[i];
    s.task();
    s.act();
   	if(s.lay==0)
    for(var j=0;j<num.length;j++){
      if(s.ky[num[j]]>0)s.ky[num[j]]++;
    }
  }
/*	spr.sort(function(a,b){
		//if(a.lay==1&&b.lay==1)
		if(a.lay==b.lay)
		return a.y-b.y;
		return a.lay-b.lay;
	});*/
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

	for(var i=0;i<spr.length;i++)spr[i].draw();
  
  t++;

  
  io.sockets.emit("chroutput",data);
}
///


read();
io.sockets.on('connection', function (socket) {

  debug++;
  numUsers++;
  console.log('コネクション数:',socket.client.conn.server.clientsCount);
  {
    var name=["ゆな","まり","れな"][rnd(3)];
    socket.username=name;
    
    //socket.emit("login",{username:socket.username});
    var h=hash[socket.id]=new Chr();
    h.name=name;
    
    var address = require('getmac');

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
      write();
      read();

    });
    
    
    
    h.x=wx/2;
    h.y=wy/2;
    h.mx=wx/2/16;
    h.my=wy/2/16;
    h.col=(numUsers+1)%2;
    spr.push(h);
    socket.emit("name",name);

  }
    
  socket.on("name",function(data){
     hash[socket.id].name=data;
  });
    
  socket.on('keyinput', function (data) {
    var h=hash[socket.id];
    if(data[1]==0)h.ky[data[0]]=data[1];
    if(data[1]==1)if(h.ky[data[0]]==0)h.ky[data[0]]=data[1];
    if(data[0]==105){
    }
  });
  
  socket.on('reset', function (data) {
    spr=[];
    dat=[];
    for(var i=0;i<wx/16;i++){
      dat.push([]);
      for(var j=0;j<wy/16;j++){
        var r=2;
        if(i<wx/16/3*2)r=1;
        if(i<wx/16/3*1)r=0;
        dat[i].push(r);
      }
    }
    for(var key in hash)if(hash.hasOwnProperty(key)){
      var h=hash[key];
      spr.push(h);
    }
    spr.push(stage=new Stage());
  });
  
  socket.on('exit', function (data) {
     process.exit(1);
  });


  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
   // if (addedUser) {
      --numUsers;
      del(hash[socket.id]);
      delete hash[socket.id];
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    //}
  });
  return name;

});


var run=function(){
   setInterval(
     function(){update();},
     1000.0/fps);
};


run();


function write(){   
  var dataJ=JSON.stringify(rec);
  fs.writeFile("rec.txt",dataJ,(err)=>{
    if(err){
      console.log("エラーが発生しました。"+err);
      throw err;
    }else{
      console.log("ファイルが正常に書き出しされました")
      for(var i=0;i<rec.length;i++)console.log("rec["+i+"]:"+JSON.stringify(rec[i]));
      console.log("↓");
      console.log("dataJ:"+dataJ);
      console.log("");
    }
  });
}
//ファイル読み込み関数
function read() {
  fs.readFile("rec.txt", 'utf8', (err, dataJ)=> {
    if (err) {
        throw err;
    }else{
      rec=JSON.parse(dataJ);
      console.log("ファイルが正常に読み込まれました");
      console.log("dataJ:"+dataJ);
      console.log("↓");
      for(var i=0;i<rec.length;i++)console.log("rec["+i+"]:"+JSON.stringify(rec[i]));
      console.log("");
    }
  });
}

