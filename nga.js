// Navbar scroll
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>40);
});
// Hamburger
const hbg=document.getElementById('hbg');
const nl=document.getElementById('nl');
if(hbg&&nl) hbg.addEventListener('click',()=>nl.classList.toggle('open'));

// Scroll reveal
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}});
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Tab switcher
function showTab(id,btn){
  const wrap=btn.closest('.tab-wrap');
  wrap.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('on'));
  wrap.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('on'));
  wrap.querySelector('#'+id).classList.add('on');
  btn.classList.add('on');
  wrap.querySelectorAll('#'+id+' .reveal').forEach(el=>{
    el.classList.remove('in');
    setTimeout(()=>el.classList.add('in'),60);
  });
}

// Contact form
const cf=document.getElementById('cf');
if(cf){
  cf.addEventListener('submit',function(e){
    e.preventDefault();
    let ok=true;
    const fields=['fname','lname','email','interest','country','msg'];
    fields.forEach(id=>{
      const f=document.getElementById(id);
      const er=document.getElementById('e-'+id);
      if(f){f.classList.remove('err');if(er)er.textContent='';}
    });
    const check=(id,msg,test)=>{
      const f=document.getElementById(id);
      const er=document.getElementById('e-'+id);
      if(!f)return;
      const val=f.value.trim();
      if(!val||( test&&!test(val))){
        f.classList.add('err');
        if(er)er.textContent=msg;
        ok=false;
      }
    };
    check('fname','Please enter your first name.');
    check('lname','Please enter your last name.');
    check('email','Please enter a valid email.',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    check('interest','Please select an option.');
    check('country','Please select your country.');
    check('msg','Please write a message (min 10 chars).',v=>v.length>=10);
    const ag=document.getElementById('agree');
    if(ag&&!ag.checked){document.getElementById('e-agree').textContent='Please agree to be contacted.';ok=false;}
    if(ok){
      const btn=cf.querySelector('.submit-btn');
      btn.textContent='Sending…';btn.disabled=true;
      setTimeout(()=>{
        document.getElementById('form-ok').style.display='block';
        btn.textContent='Sent ✓';btn.style.background='#059669';
        setTimeout(()=>{cf.reset();btn.disabled=false;btn.textContent='Send Message';btn.style.background='';document.getElementById('form-ok').style.display='none';},6000);
      },900);
    }
  });
}
