    var se=[];
      se["bgm0"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fbgm_maoudamashii_orchestra24.mp3?1533199571413");
      se["bgm1"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fbgm_maoudamashii_neorock83.mp3?1533221144705");

      se["bgm2"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fsong_kei_burning_heart.mp3?1534763008850");
      se["bgm3"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fsong_kuwabara_sekaiga_bokurani_yurerumade.mp3?1534763008977");
      se["bgm4"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fsong_kei_recuerdo.mp3?1534763009045");
      se["bgm5"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fsong_kei_harujion.mp3?1534763009101");
      se["bgm6"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fbgm_maoudamashii_fantasy15.mp3?1534763145389");
      se["bgm7"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fsong_minami_karenaihana.mp3?1534764397437");
      se["bgm8"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fsong_kei_still.mp3?1534764526332");
      
      se["dash"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fmagic-worp1.mp3?1533220776891");
      se["shot0"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fshot-struck1.mp3?1534769072506");
      se["shot1"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fshot-struck1.mp3?1534769072506");
      se["shot2"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fshot-struck1.mp3?1534769072506");
      se["bomb"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fbomb1.mp3?1534769069351");
      //se["stage"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Finfo-girl1-stage1.mp3?1533221655428");
      se["start0"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fline-girl1-scramble1.mp3?1534769936177");
      se["start1"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fline-girl1-shinnyuusyahakken1.mp3?1534770017829");
      se["start2"]=new Audio("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fline-girl1-kinkyuuzitaihassei1.mp3?1534770017725");
    //  se["bgm"]=se["bgm"+rnd(1)];
      //se["bgm"].play();
    var canvas=document.getElementById("first");
      var ctx=canvas.getContext("2d");
      var wx=canvas.width;
      var wy=canvas.height;
      var ky=[];
      var ky3=0;
      ky[37]=ky[38]=ky[39]=ky[40]=ky[41]=ky[75]=ky[90]=ky[88]=0;
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
      var shotno=0;
      var none=new Spr();
      var imgBase={};
      var sw=img("https://cdn.glitch.com/45dc55e1-a4ff-48e9-892b-1d33a503eee3%2Fsw.png?1526062592045");
      
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
		//mes3(a.substr(0,moji),b,c);
		//mes3(a.substr(moji,a.length-moji),b,c+fsize);
	}
}
function mes3(a,b,c){
	var wx3=wx*2;
	//ctx.fillStyle='#ffffff';
	ctx.fillStyle='#000000';
	ctx.fillText(a,b-1,c,wx3);
	ctx.fillText(a,b,c-1,wx3);
	ctx.fillText(a,b+1,c,wx3);
	ctx.fillText(a,b,c+1,wx3);
	ctx.fillStyle='#ffffff';
	ctx.fillText(a,b,c,wx3);
}

document.onkeydown=function(e){
	ky3=e.keyCode;
	if(ky3==65)ky3=37;
	if(ky3==87)ky3=38;
	if(ky3==68)ky3=39;
	if(ky3==83)ky3=40;
	if(ky3==13)ky3=41;
	if(ky[ky3]==0)ky[ky3]=1;
}
document.onkeyup=function(e){
	ky3=e.keyCode;
	if(ky3==65)ky3=37;
	if(ky3==87)ky3=38;
	if(ky3==68)ky3=39;
	if(ky3==83)ky3=40;
	if(ky3==13)ky3=41;
	ky[ky3]=0;
}
document.onmousemove =function(e){
    var rect = e.target.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
}
document.onmousedown =function(e){
  ky[88]++;
}
document.onmouseup =function(e){
  ky[88]=0;
}
function onMouseWheel(e) {
  ky[88]=1;
}
function onMouseOver(e) {
  canvasin=1;
}
function onMouseOut(e) {
  canvasin=0;
}
/*function onKeyDown(e) {
	ky3=e.keyCode;
	if(ky3==65)ky3=37;
	if(ky3==87)ky3=38;
	if(ky3==68)ky3=39;
	if(ky3==83)ky3=40;
	if(ky3==13)ky3=41;
	if(ky[ky3]==0)ky[ky3]=1;
}
function onKeyUp(e) {
	ky3=e.keyCode;
	if(ky3==65)ky3=37;
	if(ky3==87)ky3=38;
	if(ky3==68)ky3=39;
	if(ky3==83)ky3=40;
	if(ky3==13)ky3=41;
	ky[ky3]=0;
}
canvas.addEventListener('keydown', onKeyDown, false);
canvas.addEventListener('keyup', onKeyUp, false);
*/
canvas.addEventListener('mouseover', onMouseOver, false);
canvas.addEventListener('mouseout', onMouseOut, false);
//canvas.addEventListener('mousewheel',onMouseWheel,false);
window.addEventListener('mousewheel',onMouseWheel,false);
//window.addEventListener('mousewheel',onMouseWheel,false);
/*
function onMouseMove(e) {
    var rect = e.target.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
}
canvas.addEventListener('mousemove', onMouseMove, false);
*/      
      
      
/*
start=1;
function touch(e) {
	mcx=e.touches[0].pageX;
	mcy=e.touches[0].pageY;
	mcl++;	
	if(start==1)e.preventDefault();
}
function move(e) {
	mx=e.touches[0].pageX;
	my=e.touches[0].pageY;
	if(start==1)e.preventDefault();
}
function up(e) {
	mcl=0;
	if(start==1)e.preventDefault();
}
document.addEventListener("touchstart", touch, false);
document.addEventListener("touchmove", move, false);
document.addEventListener("touchend", up, false);*/
      
      function img(a){
        if(a in imgBase){
        }else{
          imgBase[a]=new Image();
          imgBase[a].src=a;
        }
        if(a=="")return 0;
        return imgBase[a];
      }
      function log(a){
       logtext.value+=a;
       logtext.scrollTop = logtext.scrollHeight;

      }

	    function draw0(a,b,c,d,e,f,g){
        if(a!=0)if(d!=0)if(e!=0)ctx.drawImage(a,b,c,d,e,f,g,d*zoom,e*zoom);
      }
	    function drawofs(a,b,c,d,e,f,g){
        if(a!=0)if(d!=0)if(e!=0)ctx.drawImage(a,b,c,d,e,f+lx,g+ly,d*zoom,e*zoom);
      }
  	
//class Spr
function del(a){
  spr.splice(spr.indexOf(a),1);

}
function Spr(){
	this.mode=0;
	this.lay=0;
	this.dr=0;
	this.x=0;
	this.y=0;
	this.vx=0;
	this.vy=0;
	this.hp=0;
  this.en=0;
  this.rate=5;
  this.r=0;
	this.j=0;
  this.lv=0;
  this.tg=none;
  //this.movetg=new Spr();
  this.name="";
  this.step=1;
  this.norma=1;
  this.ai=0;
  this.parent=none;
  this.type="spr";
  this.chan="spr";
  this.rt=[[50,50],[wx-50,50],[wx-50,wy-50],[50,wy-50]];
  this.rtno=0;
	this.task=function(){this.j++;};
	this.act=function(){};
	this.draw=function(){};
	this.del=function(){
    spr.splice(spr.indexOf(this),1);
  };
	this.hit=function(){
    for(var i=0;i<spr.length;i++){
       var s=spr[i]; 
      if(s!=this)
      if(s!=this.parent)
      if(abs(s.y-this.y)<8)
      if(abs(s.x-this.x)<8){
        return s;
        
      }
    }
    return 0;
      
	}
}	
function Stage(){
	Spr.apply(this);
  this.lay=-1;
  this.seed=rnd(7);
  this.init=function(){
    var p=none;
    for(var i=0;i<this.step;i++){
     // if(this.step<10){
        var a=new Chr();
        a.chan="enm";
        a.name="ŽG‹›"+i;
        a.lv=this.step+rnd(3);
        a.sp=1;
        a.chan="enm";
        spr.push(a);
        a.ai=i%3;
        if(this.step<3)a.ai=5+(this.seed+i)%4;
        else a.ai=5+(this.seed+i)%4;
//        a.ai=5;
      var r=[[50,50],[wx-50,50],[wx-50,wy-50],[50,wy-50]];
        a.x=r[i%4][0];
        a.y=r[i%4][1];
 //       a.x=flr(i/5)*50;
   //     a.y=i%5*50;
      
      //  a.x=30;
       // a.y=30;
        if(p!=none)a.parent=p;
        p=a;
      //}
    }
    if(se["bgm"])se["bgm"].pause();
    se["bgm"]=se["bgm"+((this.step+this.seed)%7)];
    se["bgm"].play();
    se["start"+(this.step+this.seed)%3].play();
  }
  this.init();
  this.act=function(){
     if(this.norma==0){
       this.step++;
       this.norma=this.step;
       this.j=0;
       this.init();
     }
   }
	this.draw=function(){
	  if(this.j<=fps*5){
      ctx.fillStyle="rgb(255,255,0)";
      ctx.fillRect(0,wy/2-16-100,wx,24);
      for(var i=0;i<20;i++)mes("STAGE:"+this.step,i*100-this.j*10,wy/2-100);
      ctx.fillStyle="rgb(255,255,0)";
      ctx.fillRect(0,wy/2-16,wx,24);
      for(var i=0;i<20;i++)mes("STAGE:"+this.step,-300+i*100+this.j*5,wy/2);
      ctx.fillStyle="rgb(255,255,0)";
      ctx.fillRect(0,wy/2-16+100,wx,24);
      for(var i=0;i<13;i++)mes("STAGE:"+this.step,i*100-this.j*3,wy/2+100);
    }else{
      mes("STAGE:"+this.step,wx-100,32);
      
    }
  } 
}
function Chr(){
 	Spr.apply(this);
  this.sp=2;
  this.name="‚ä‚È";
  this.type="chr";
  this.chan="player";
  this.hp=100;
  this.en=100;
  this.sptime=0;
  this.act=function(){
     if(this.en<100)this.en++;
     if(this.en>100)this.en=100;
     if(this.chan=="player"){
       if(Math.sqrt((mx-this.x)*(mx-this.x)+(my-this.y)*(my-this.y))<=this.sp){
         this.x=mx;
         this.y=my;
       }else{
         this.r=Math.atan2(my-this.y,mx-this.x);
         this.x+=this.vx=this.sp*Math.cos(this.r);
         this.y+=this.vy=this.sp*Math.sin(this.r);
       }
       if(this.x<0)this.x=0;
       if(this.y<0)this.x=0;
       if(this.x>wx)this.x=wx;
       if(this.y>wy)this.y=wy;
/*       if(ky[90]%this.rate==1)if(this.en>=10){
         var a=new Wep();
         a.x=this.x;
         a.y=this.y;
         a.r=this.r;
         a.parent=this;
         spr.push(a); 
         this.en-=10;
       }*/
       if(t%this.rate==1){
         var a=new Wep();
         a.x=this.x;
         a.y=this.y;
         a.r=this.r;
         a.parent=this;
         spr.push(a); 
        // this.en-=10;
       }
       
       if(this.sp==2){
         if(this.en>=10){
           if(ky[88]==1){
             se["dash"].play();
             this.sp=4;
             this.en-=10;
           }
         }
       }else if(this.sp==4){
          this.en-=2;
          this.sptime++;
          if(this.sptime==fps*1){
            this.sptime=0;
//          if(ky[88]==1){
             this.sp=2;
          }
          if(this.en<=0){
            this.sp=2;
            this.en=0;
          }
       }
     }
     if(this.chan=="enm"){
       if(this.hp==0){
          stage.norma--;
          del(this); 
          
         
       }
       if(this.ai==0){
         this.tg=chr;
         this.r=Math.atan2(this.tg.y-this.y,this.tg.x-this.x);
        
         /*if(abs(mx-this.x)<this.sp)this.x=mx;
         else this.x+=this.sp*Math.cos(this.r);
         if(abs(my-this.y)<this.sp)this.y=my;
         else this.y+=this.sp*Math.sin(this.r);
         
         if(this.x<0)this.x=0;
         if(this.y<0)this.x=0;
         if(this.x>wx)this.x=wx;
         if(this.y>wy)this.y=wy;*/
         if(this.en>=10)if(rnd(100)<3){
           var a=new Wep();
           a.x=this.x;
           a.y=this.y;
           a.r=this.r;
           a.parent=this;
           spr.push(a);
           this.en-=10; 
         }
       }
       if(this.ai==1){
         this.tg=chr;
         var phi=Math.atan2(chr.y-this.y,chr.x-this.x);
         //Math.sin(?-phi)=(Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/this.sp;
         var thi=Math.asin((Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/5);
         //?-phi=thi
         //?=thi+phi
         this.r=thi+phi;
         
         /*if(abs(mx-this.x)<this.sp)this.x=mx;
         else this.x+=this.sp*Math.cos(this.r);
         if(abs(my-this.y)<this.sp)this.y=my;
         else this.y+=this.sp*Math.sin(this.r);
         if(this.x<0)this.x=0;
         if(this.y<0)this.x=0;
         if(this.x>wx)this.x=wx;
         if(this.y>wy)this.y=wy;*/
         if(this.en>=10)if(rnd(100)<3){
           var a=new Wep();
           a.x=this.x;
           a.y=this.y;
           a.r=this.r;
           a.parent=this;
           spr.push(a);
           this.en-=10; 
         }
       }
       if(this.ai==2){
         this.tg=chr;
         var phi=Math.atan2(chr.y-this.y,chr.x-this.x);
         //Math.sin(?-phi)=(Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/this.sp;
         var thi=Math.asin((Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/5);
         //?-phi=thi
         //?=thi+phi
         this.r=thi+phi;
                   
         /*if(abs(mx-this.x)<this.sp)this.x=mx;
         else this.x+=this.sp*Math.cos(this.r);
         if(abs(my-this.y)<this.sp)this.y=my;
         else this.y+=this.sp*Math.sin(this.r);
         if(this.x<0)this.x=0;
         if(this.y<0)this.x=0;
         if(this.x>wx)this.x=wx;
         if(this.y>wy)this.y=wy;*/
         if(this.en>=10)if(rnd(100)<3){
           for(var i=0;i<10;i++){
             var a=new Wep();
             a.x=this.x;
             a.y=this.y;
             a.r=this.r+Math.PI*2/10*i;
             a.parent=this;
             spr.push(a);
           }
           this.en-=10;
         }
       }
       if(this.ai==5){
          this.rt=[[50,50],[wx-50,50],[wx-50,wy-50],[50,wy-50]];
         this.sp=3;
  //       if(this.x-this.rt[this.rtno][0]<=this.sp*2)
    //     if(this.y-this.rt[this.rtno][1]<=this.sp*2){
         if(abs(this.x-this.tg.x)<this.sp*3)
         if(abs(this.y-this.tg.y)<this.sp*3){
           this.rtno=(this.rtno+1)%this.rt.length;
           this.tg=new Chr();
           this.tg.x=this.rt[this.rtno][0];
           this.tg.y=this.rt[this.rtno][1];
         }
         var phi=Math.atan2(this.tg.y-this.y,this.tg.x-this.x);
 //        var phi=Math.atan2(chr.y-this.y,chr.x-this.x);
         //Math.sin(?-phi)=(Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/this.sp;
         var thi=Math.asin((Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/5);
         //?-phi=thi
         //?=thi+phi
         this.r=thi+phi;
         this.r=phi;
                   
         /*if(abs(mx-this.x)<this.sp)this.x=mx;
         else this.x+=this.sp*Math.cos(this.r);
         if(abs(my-this.y)<this.sp)this.y=my;
         else this.y+=this.sp*Math.sin(this.r);
         if(this.x<0)this.x=0;
         if(this.y<0)this.x=0;
         if(this.x>wx)this.x=wx;
         if(this.y>wy)this.y=wy;*/
         if(this.en>=10)if(rnd(100)<3){
           for(var i=0;i<10;i++){
             var a=new Wep();
             a.x=this.x;
             a.y=this.y;
             a.r=this.r+Math.PI*2/10*i;
             a.parent=this;
             spr.push(a);
           }
           this.en-=10;
         }
       }
       if(this.ai==6){
          this.rt=[[wx/2,50],[wx-50,wy-50],[50,wy-50]];
         this.sp=3;
  //       if(this.x-this.rt[this.rtno][0]<=this.sp*2)
    //     if(this.y-this.rt[this.rtno][1]<=this.sp*2){
         if(abs(this.x-this.tg.x)<this.sp*3)
         if(abs(this.y-this.tg.y)<this.sp*3){
           this.rtno=(this.rtno+1)%this.rt.length;
     //      this.tg=new Chr();
           this.tg.x=this.rt[this.rtno][0];
           this.tg.y=this.rt[this.rtno][1];
         }
         var phi=Math.atan2(this.tg.y-this.y,this.tg.x-this.x);
 //        var phi=Math.atan2(chr.y-this.y,chr.x-this.x);
         //Math.sin(?-phi)=(Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/this.sp;
         var thi=Math.asin((Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/5);
         //?-phi=thi
         //?=thi+phi
         this.r=thi+phi;
         this.r=phi;
                   
         /*if(abs(mx-this.x)<this.sp)this.x=mx;
         else this.x+=this.sp*Math.cos(this.r);
         if(abs(my-this.y)<this.sp)this.y=my;
         else this.y+=this.sp*Math.sin(this.r);
         if(this.x<0)this.x=0;
         if(this.y<0)this.x=0;
         if(this.x>wx)this.x=wx;
         if(this.y>wy)this.y=wy;*/
         if(this.en>=10)if(rnd(100)<3){
           for(var i=0;i<10;i++){
             var a=new Wep();
             a.x=this.x;
             a.y=this.y;
             a.r=this.r+Math.PI*2/10*i;
             a.parent=this;
             spr.push(a);
           }
           this.en-=10;
         }
       }
       if(this.ai==7){
          this.rt=[[50,wy/2],[wx-50,wy/2]];
         this.sp=4;
  //       if(this.x-this.rt[this.rtno][0]<=this.sp*2)
    //     if(this.y-this.rt[this.rtno][1]<=this.sp*2){
         if(abs(this.x-this.tg.x)<this.sp*3)
         if(abs(this.y-this.tg.y)<this.sp*3){
           this.rtno=(this.rtno+1)%this.rt.length;
     //      this.tg=new Chr();
           this.tg.x=this.rt[this.rtno][0];
           this.tg.y=this.rt[this.rtno][1];
         }
         var phi=Math.atan2(this.tg.y-this.y,this.tg.x-this.x);
 //        var phi=Math.atan2(chr.y-this.y,chr.x-this.x);
         //Math.sin(?-phi)=(Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/this.sp;
         var thi=Math.asin((Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/5);
         //?-phi=thi
         //?=thi+phi
         this.r=thi+phi;
         this.r=phi;
                   
         /*if(abs(mx-this.x)<this.sp)this.x=mx;
         else this.x+=this.sp*Math.cos(this.r);
         if(abs(my-this.y)<this.sp)this.y=my;
         else this.y+=this.sp*Math.sin(this.r);
         if(this.x<0)this.x=0;
         if(this.y<0)this.x=0;
         if(this.x>wx)this.x=wx;
         if(this.y>wy)this.y=wy;*/
         if(this.en>=10)if(rnd(100)<3){
           for(var i=0;i<10;i++){
             var a=new Wep();
             a.x=this.x;
             a.y=this.y;
             a.r=this.r+Math.PI*2/10*i;
             a.parent=this;
             spr.push(a);
           }
           this.en-=10;
         }
       }
       if(this.ai==8){
          this.rt=[[150,150],[wx-150,wy-150],[150,wy-150],[wx-150,150]];
         this.sp=4;
  //       if(this.x-this.rt[this.rtno][0]<=this.sp*2)
    //     if(this.y-this.rt[this.rtno][1]<=this.sp*2){
         if(abs(this.x-this.tg.x)<this.sp*3)
         if(abs(this.y-this.tg.y)<this.sp*3){
           this.rtno=(this.rtno+1)%this.rt.length;
     //      this.tg=new Chr();
           this.tg.x=this.rt[this.rtno][0];
           this.tg.y=this.rt[this.rtno][1];
         }
         var phi=Math.atan2(this.tg.y-this.y,this.tg.x-this.x);
 //        var phi=Math.atan2(chr.y-this.y,chr.x-this.x);
         //Math.sin(?-phi)=(Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/this.sp;
         var thi=Math.asin((Math.cos(phi)*chr.vy-Math.sin(phi)*chr.vx)/5);
         //?-phi=thi
         //?=thi+phi
         this.r=thi+phi;
         this.r=phi;
                   
         /*if(abs(mx-this.x)<this.sp)this.x=mx;
         else this.x+=this.sp*Math.cos(this.r);
         if(abs(my-this.y)<this.sp)this.y=my;
         else this.y+=this.sp*Math.sin(this.r);
         if(this.x<0)this.x=0;
         if(this.y<0)this.x=0;
         if(this.x>wx)this.x=wx;
         if(this.y>wy)this.y=wy;*/
         if(this.en>=10)if(rnd(100)<3){
           for(var i=0;i<10;i++){
             var a=new Wep();
             a.x=this.x;
             a.y=this.y;
             a.r=this.r+Math.PI*2/10*i;
             a.parent=this;
             spr.push(a);
           }
           this.en-=10;
         }
       }
      // if(this.parent!=none)this.r=Math.atan2(this.parent.y-this.y,this.parent.x-this.x);
       
       if(this.chan=="player"){
         if(abs(mx-this.x)<this.sp)this.x=mx;
         else this.x+=this.sp*Math.cos(this.r);
         if(abs(my-this.y)<this.sp)this.y=my;
         else this.y+=this.sp*Math.sin(this.r);
       }else{
        this.x+=this.sp*Math.cos(this.r);
         this.y+=this.sp*Math.sin(this.r);
       }
       if(this.x<0)this.x=0;
       if(this.y<0)this.x=0;
       if(this.x>wx)this.x=wx;
       if(this.y>wy)this.y=wy;
     }
   }
	this.draw=function(){
    var p=Math.PI*2/8;
    var q=Math.PI*2/16*1;
    if(this.chan=="player"){
      drawofs(sw,flr((this.r+Math.PI+q)/p)%8*16,80,16,16,this.x,this.y);
      //if(canvasin){
        ctx.strokeStyle='#ff00ff';
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(mx,my);
        ctx.stroke();
      //}
    }
    if(this.chan=="enm")drawofs(sw,flr((this.r+Math.PI+q)/p)%8*16,80+16,16,16,this.x,this.y);
    var dy=this.y-16;
    drawofs(sw,48,0,16,16,this.x,dy);
    drawofs(sw,48+16,0,flr(16*this.hp/100),16,this.x,dy);
    drawofs(sw,48,16,16,16,this.x,dy);
    drawofs(sw,48+16,16,flr(16*this.en/100),16,this.x,dy);
//    mes(this.name+" lv."+this.lv+" rtno"+this.rtno+"tg:"+this.tg.name+" xy["+this.tg.x+","+this.tg.y+"]",this.x,this.y);
      mes(this.name+" lv."+this.lv+" rtno"+this.rtno+" "+this.rt[this.rtno][0]+","+this.rt[this.rtno][1],this.x,this.y);
    //mes(" hp."+this.hp,this.x,this.y-6);
     //mes(" en."+this.en,this.x,this.y-13);
    //mes(" r."+this.r,this.x,this.y-20);
    //if(this.chan=="player")log(this.r)
  }  
}
function Wep(){
 	Spr.apply(this);
  this.lay=1;
  this.sp=5;
   this.act=function(){
     if(this.mode==0){
         this.x+=this.vx=this.sp*Math.cos(this.r);
         this.y+=this.vy=this.sp*Math.sin(this.r);
         if(this.x<-16||
            this.y<-16||
            this.x>wx||
            this.y>wy){
           del(this);
         }else{
            var s=this.hit();
             if(s!=0){
               if(this.parent.chan=="player"&&s.chan=="enm"||this.parent.chan=="enm"&&s.chan=="player"){
                s.hp-=10;
                if(s.chan=="enm"){
                    se["shot"+shotno%3].play(); 
                    shotno++;
                }
                if(s.hp<0)s.hp=0;
                 this.mode=5;
                 if(s.hp==0)if(s.chan=="enm")se["bomb"].play();
               } 
             }
         }
     }else{
        this.mode++;
       if(this.mode==15)del(this);
     }
   }
	this.draw=function(){
    if(this.parent.chan=="player")drawofs(sw,0,16+flr(this.mode/5)*16,16,16,this.x,this.y);
    if(this.parent.chan=="enm")drawofs(sw,16,16+flr(this.mode/5)*16,16,16,this.x,this.y);
  }  
}
var t=0;

spr=new Array();
spr.push(chr=new Chr());
chr.x=wx/2;
chr.y=wy/2;
spr.push(stage=new Stage());
update=function(){
  if(se["bgm"].ended)se["bgm"].play();

  
  //log("spr.length:"+spr.length+"\n");
  for(var i=0;i<spr.length;i++){
    spr[i].task();
    spr[i].act();
  }
	spr.sort(function(a,b){
		//if(a.lay==1&&b.lay==1)
		if(a.lay==b.lay)
		return a.y-b.y;
		return a.lay-b.lay;
	});
	ctx.fillStyle="rgb(0,0,0)";
	ctx.fillRect(0,0,wx,wy);
	for(var i=0;i<spr.length;i++)spr[i].draw();
	for(var i=0;i<ky.length;i++)if(ky[i]>0)ky[i]++;
  t++;
  if(t%(fps*3)==0)logtext.value="";
  log(Date.now()-date+"\n");
  date=Date.now();
}


setInterval("update()",1000/fps);