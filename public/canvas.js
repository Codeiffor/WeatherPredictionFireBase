canvas=document.querySelector('#particles');
var w,h,count,particles;
window.onload=loadcanvas;
window.onresize=function(){
    w=canvas.attributes.width.value=document.body.clientWidth;
    h=canvas.attributes.height.value=document.documentElement.clientHeight;
    count=Math.floor(Math.sqrt(w*h)/20);
    particles=[];
    for(var i=0;i<count;i++){
      var speed=Math.random()*count/25+1;
      var angle=Math.random()*2*Math.PI;  
      particles.push({
        x:Math.random()*w,
        y:Math.random()*h,
        xspeed:speed*Math.cos(angle),
        yspeed:speed*Math.sin(angle)
      });
    }
};
function loadcanvas(){
    w=canvas.attributes.width.value=document.body.clientWidth;
    h=canvas.attributes.height.value=document.documentElement.clientHeight;
    
    ctx=canvas.getContext('2d');
    var gradient=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);
    gradient.addColorStop(0,'rgba(0, 20, 53,0.5)');
    gradient.addColorStop(1,'rgba(0, 15, 40,0.1)');
    //particles' configuration
    
    particles=[];
    count=Math.floor(Math.sqrt(w*h)/20);
    for(var i=0;i<count;i++){
      var speed=Math.random()*count/25+1;
      var angle=Math.random()*2*Math.PI;  
      particles.push({
        x:Math.random()*w,
        y:Math.random()*h,
        xspeed:speed*Math.cos(angle),
        yspeed:speed*Math.sin(angle)
      });
    }

    //--------add more particles on click---------
    
    // document.addEventListener('click',function(event){
    //   var newparticles;
    //   var l=particles.length;
    //   if(l>250)newparticles=1;
    //   else if(l>200)newparticles=2;
    //   else if(l>150)newparticles=5;
    //   else newparticles=10;
    //   for(var i=0;i<newparticles;i++){
    //     var speed=Math.random()*count/25+1;
    //     var angle=Math.random()*2*Math.PI;  
    //     particles.push({
    //       x:event.pageX+Math.random()*10-5,
    //       y:event.pageY+Math.random()*10-5,
    //       xspeed:speed*Math.cos(angle),
    //       yspeed:speed*Math.sin(angle)
    //     });
    //   }
    // });
    
    function particleRecovery(i){
      if(particles[i].x<0){
        particles[i].x=w;
      }
      if(particles[i].x>w){
        particles[i].x=0;
      }
      if(particles[i].y<0){
        particles[i].y=h;
      }
      if(particles[i].y>h){
        particles[i].y=0;
      }
    }
    
    //particle animation
    
    particleAnimation();
    function particleAnimation(){
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle='black';
      ctx.fillRect(0,0,w,h);
      ctx.fillStyle=gradient;
      ctx.fillRect(0,0,w,h);
      var l=particles.length;
      
      for(var i=0;i<l;i++){
        drawParticle(particles[i]);
        particles[i].x-=-particles[i].xspeed;
        particles[i].y-=-particles[i].yspeed;
        if(particles[i].x<0|| particles[i].x>w|| particles[i].y<0|| particles[i].y>h){
          if(i<count){
            particleRecovery(i);
          }
          else{
            particles.splice(i,1);
            l--;
          }
        }
      }
      l=particles.length;
      for(var i=0;i<l;i++){
        for(var j=0;j<l;j++){
          if(i==j)continue;
          if(Math.sqrt(Math.pow(particles[i].x-particles[j].x,2)+Math.pow(particles[i].y-particles[j].y,2))<Math.min(w,h)/5){
            joinParticle(particles[i],particles[j]);
          }
        }
      }
      requestAnimationFrame(particleAnimation);
    }
    
    //draw particles
    
    function drawParticle(p){
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle='rgba(255,255,255,0.15)';
      ctx.arc(p.x,p.y,6,0,2*Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle='rgba(255,255,255,1)';
      ctx.arc(p.x,p.y,1.5,0,2*Math.PI);
      ctx.fill();
      ctx.restore();
    }
    
    //Join Particles
    
    function joinParticle(p1,p2){
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p1.x,p1.y);
      ctx.lineTo(p2.x,p2.y);
      ctx.lineWidth=0.2;
      ctx.strokeStyle='rgba(255,255,255,0.5)';
      ctx.stroke();
      ctx.restore();
    }
}