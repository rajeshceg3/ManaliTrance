// Interface only: keeps the existing tour, map, audio and idle behavior intact.
(() => {
 const trigger=document.createElement('button');trigger.id='explore-manali';trigger.type='button';trigger.textContent='Explore';trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls','manali-controls');trigger.setAttribute('aria-expanded','false');
 const panel=document.createElement('dialog');panel.id='manali-controls';panel.setAttribute('aria-labelledby','manali-controls-title');
 panel.innerHTML='<div class="explore-heading"><h2 id="manali-controls-title">Explore Manali</h2><button type="button" id="close-manali-controls">Done</button></div>';
 const section=(title,...nodes)=>{const s=document.createElement('section'),h=document.createElement('h3');h.textContent=title;s.append(h,...nodes.filter(Boolean));panel.append(s)};
 section('Places',document.getElementById('filter-container'));
 const mapControls=document.querySelector('.map-controls');
 for(const b of mapControls.querySelectorAll('button')){const t=document.createElement('span');t.textContent=b.getAttribute('aria-label');b.append(t)}
 section('View & journey',mapControls);
 const about=document.querySelector('.about-btn');const label=document.createElement('span');label.textContent='About Manali';about.append(label);
 section('About',about,document.getElementById('weather-widget'));
 document.body.append(trigger,panel);
 trigger.addEventListener('click',()=>{panel.showModal();trigger.setAttribute('aria-expanded','true');document.getElementById('close-manali-controls').focus()});
 document.getElementById('close-manali-controls').addEventListener('click',()=>panel.close());
 panel.addEventListener('close',()=>{trigger.setAttribute('aria-expanded','false');if(document.getElementById('about-modal').getAttribute('aria-hidden')==='true')trigger.focus()});
 panel.addEventListener('click',e=>{const b=e.target.closest('button');if(b&&b.id!=='close-manali-controls')panel.close()},true);
 const closeAbout=document.querySelector('#about-modal .close-modal');
 closeAbout.addEventListener('click',()=>trigger.focus());
})();
