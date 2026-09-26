const buttons=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.catalog-card')];
buttons.forEach(btn=>btn.addEventListener('click',()=>{
  buttons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=btn.dataset.filter;
  cards.forEach(c=>c.hidden=!(f==='all'||c.dataset.niche===f));
}));
