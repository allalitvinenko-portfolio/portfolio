const buttons=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.catalog-card')];
const groups=[...document.querySelectorAll('.catalog-group')];

buttons.forEach(btn=>btn.addEventListener('click',()=>{
  buttons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=btn.dataset.filter;

  cards.forEach(c=>{
    c.hidden=!(f==='all'||c.dataset.niche===f);
  });

  groups.forEach(g=>{
    const visible=[...g.querySelectorAll('.catalog-card')].some(c=>!c.hidden);
    g.hidden=!visible;
  });
}));