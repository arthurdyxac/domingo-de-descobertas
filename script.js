const CHECKOUTS = { Essencial: 'https://pay.kiwify.com.br/NvOpzKx', Completa: 'https://pay.kiwify.com.br/UT0Vm9e' };
const samples = {
  guia: { src: 'assets/guia-4.webp', alt: 'Lição A Criação, página real do Guia do Professor', note: 'História, perguntas, dinâmica e oração em uma sequência para conduzir a aula.' },
  colorir: { src: 'assets/colorir-3.webp', alt: 'Atividades reais para colorir: A Criação e Adão e Eva', note: '52 atividades para colorir, incluídas nas duas edições. Imprima as folhas que pretende usar.' },
  atividades: { src: 'assets/atividades-3.webp', alt: 'Atividades complementares reais das lições A Criação e Adão e Eva', note: '104 atividades complementares na Completa: propostas para observar, relacionar e conversar.' },
  cartoes: { src: 'assets/cartoes-3.webp', alt: 'Página real de cartões de versículos', note: 'Bônus da Completa: 52 cartões de versículos organizados por lição, distribuídos em 10 páginas.' }
};

const sampleImage = document.querySelector('#sample-image');
const sampleNote = document.querySelector('#sample-note');
const sampleTabs = [...document.querySelectorAll('[data-sample]')];
let sampleIndex = 0;
let sampleTimer;
function stopSampleRotation() {
  clearInterval(sampleTimer);
  const hint = document.querySelector('.tap-hint');
  if (hint) hint.textContent = 'Você está no controle. Toque em outra aba para explorar; toque na página para ampliar.';
}
function showSample(index, focus = false) {
  if (focus) stopSampleRotation();
  sampleIndex = (index + sampleTabs.length) % sampleTabs.length;
  const tab = sampleTabs[sampleIndex], sample = samples[tab.dataset.sample];
  sampleTabs.forEach(item => item.setAttribute('aria-selected', 'false'));
  tab.setAttribute('aria-selected', 'true');
  sampleImage.classList.remove('sample-image-swap'); void sampleImage.offsetWidth; sampleImage.classList.add('sample-image-swap');
  sampleImage.src = sample.src; sampleImage.alt = sample.alt; sampleNote.textContent = sample.note;
  document.querySelector('#sample-open').setAttribute('aria-label', `Ampliar ${sample.alt}`);
  if (focus) tab.focus({ preventScroll: true });
}
sampleTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showSample(index, true));
  tab.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); showSample(index + (event.key === 'ArrowRight' ? 1 : -1), true); }
  });
});
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) sampleTimer = setInterval(() => {
  const rect = document.querySelector('.sample-content').getBoundingClientRect();
  if (!document.hidden && rect.top < innerHeight && rect.bottom > 0) showSample(sampleIndex + 1);
}, 2600);

const imageDialog = document.querySelector('#image-dialog');
document.querySelector('#sample-open').addEventListener('click', () => {
  stopSampleRotation();
  document.querySelector('#dialog-image').src = sampleImage.src;
  document.querySelector('#dialog-image').alt = sampleImage.alt;
  imageDialog.showModal();
});
document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));
document.querySelectorAll('.next').forEach(link => link.addEventListener('click', event => {
  const href = link.getAttribute('href');
  if (!href || !href.startsWith('#')) return;
  const target = document.querySelector(href); if (!target) return;
  event.preventDefault(); target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); history.replaceState(null, '', link.getAttribute('href'));
}));
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

document.querySelectorAll('.brand img, .hero-art > img').forEach(image => image.src = 'assets/identidade.webp');
document.querySelector('.hero-art > img').alt = 'Duas crianças descobrindo histórias em uma Bíblia azul';
document.querySelector('.hero-copy .lead').innerHTML = 'Chega de preparar a aula correndo e ainda sentir que faltou algo.<br>Abra a lição, escolha as atividades e conduza o encontro com segurança.';
document.querySelector('.hero-copy > p:not(.lead):not(.micro)').innerHTML = 'Você recebe <strong>52 lições bíblicas organizadas</strong>, com guia do professor e atividades para imprimir — feitas para crianças de <strong>4 a 8 anos</strong>.';
document.querySelector('.samples .section-heading p').textContent = 'Quando tudo fica espalhado, preparar o encontro vira uma corrida. Aqui você abre um roteiro pronto, escolhe o que usar e ganha tempo para o que realmente importa: ensinar e acolher.';
document.querySelector('.sample-intro h3').innerHTML = 'Veja o material <br>por dentro.';
document.querySelector('.sample-tabs').insertAdjacentHTML('beforebegin', '<p class="tap-hint" aria-live="polite">4 materiais para explorar. Toque em uma aba para escolher e pausar a troca automática.</p>');
document.querySelector('.helena-signature span').textContent = 'Um olhar acolhedor para cada descoberta.';
document.querySelector('.helena-photo img').alt = 'Tia Helena em uma sala infantil';
document.querySelector('.helena-photo figcaption').textContent = 'Conheça a Tia Helena';
document.querySelector('.draft-note')?.remove();

const reviews = [
  ['marilia', 'Marília Gonçalves', 5, 'Me ajudou muito a organizar a aula sem ficar procurando atividade em vários lugares.'],
  ['renata', 'Renata Souza', 4, 'Gostei principalmente porque as lições e atividades realmente combinam entre si.'],
  ['patricia', 'Patrícia Lima', 5, 'Material bonito, simples de usar e bem organizado. Facilitou bastante minha preparação.'],
  ['juliana', 'Juliana Martins', 5, 'As crianças gostaram das atividades e eu consegui conduzir a aula com mais tranquilidade.'],
  ['camila-nova', 'Camila Rocha', 4, 'A edição completa tem bastante opção. Já estou separando o que vou usar nas próximas semanas.']
];
document.querySelector('.quote-grid').innerHTML = reviews.map(([photo, name, stars, quote]) => `<article class="quote-card"><div class="stars" aria-label="${stars} de 5 estrelas">${'★'.repeat(stars)}<span class="empty-stars" aria-hidden="true">${'☆'.repeat(5-stars)}</span></div><p>“${quote}”</p><div class="quote-person"><img src="assets/testimonial-${photo}.jpeg" alt="${name}" width="46" height="46" loading="lazy"><div><b>${name}</b></div></div></article>`).join('');
document.querySelector('.offers .section-heading p').textContent = 'Escolha o apoio que evita improvisos: o Essencial resolve a sua próxima aula; a Completa amplia cada encontro com mais atividades e cartões de versículos.';
document.querySelector('.product-display figcaption').textContent = 'Material digital em PDF. Você recebe o acesso após a confirmação do pagamento.';
document.querySelectorAll('.choice').forEach(button => { const edition = button.dataset.edition; button.href = CHECKOUTS[edition]; button.classList.remove('next'); });
document.querySelector('.final-buttons').innerHTML = `<a class="button outline" href="${CHECKOUTS.Essencial}">Quero o Essencial · R$12,90</a><a class="button" href="${CHECKOUTS.Completa}">Quero a Completa · R$29,90</a>`;
document.querySelector('.final-inner .micro').textContent = 'Acesse agora o material digital que combina com a sua turma.';
document.querySelector('.offer-grid').insertAdjacentHTML('beforebegin', '<aside class="offer-note" aria-label="Promoção por tempo limitado"><span class="promo-tag">OFERTA DE LANÇAMENTO</span><h3>Sua próxima aula organizada, com preço de lançamento.</h3><p>Essencial por <strong>R$12,90</strong> ou Completa por <strong>R$29,90</strong>. Pagamento único e acesso digital após a confirmação.</p><p class="countdown-label">Esta oferta termina em:</p><div class="countdown" role="timer" aria-label="Tempo restante da promoção"></div></aside>');
// Prazo global do rascunho: 02/10 às 04:40:45 até 05/10 às 04:40:45 (Brasília).
// Antes de publicar, fixar a janela definitiva de 72h aprovada pelo responsável.
const promotionDeadline = Date.parse('2026-10-05T04:40:45-03:00');
document.querySelector('.preview-bar').innerHTML = '<strong>OFERTA DE LANÇAMENTO</strong><span class="banner-detail">52 lições a partir de R$12,90 · Por tempo limitado</span>';
function updateCountdown(now = Date.now()) {
  const total = Math.max(0, Math.floor((promotionDeadline - now) / 1000));
  const values = [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60];
  const bannerDetail = document.querySelector('.banner-detail');
  if (bannerDetail) bannerDetail.textContent = `Termina em ${Math.ceil(total / 3600)}h · A partir de R$12,90`;
  document.querySelector('.countdown').innerHTML = values.map((value, i) => `<div><b>${String(value).padStart(2, '0')}</b><small>${['horas', 'min', 'seg'][i]}</small></div>`).join('');
  if (!total) {
    document.querySelector('.preview-bar').textContent = 'Promoção encerrada';
    document.querySelector('.offer-note').innerHTML = '<h3>Esta promoção terminou.</h3><p>Aguarde a próxima oferta.</p>';
    document.querySelectorAll('a[href^="https://pay.kiwify.com.br/"]').forEach(link => { link.removeAttribute('href'); link.setAttribute('aria-disabled', 'true'); link.textContent = 'Promoção encerrada'; });
    clearInterval(promotionTimer);
  }
}
const promotionTimer = setInterval(updateCountdown, 1000);
updateCountdown();

const promiseRail = document.querySelector('.promise-strip');
if (promiseRail) promiseRail.outerHTML = '<div class="discovery-marquee" aria-label="Destaques do kit"><div class="marquee-track"><span>✦ 52 LIÇÕES ORGANIZADAS</span><span>✦ ATIVIDADES PARA IMPRIMIR</span><span>✦ CRIANÇAS DE 4 A 8 ANOS</span><span>✦ GUIA PARA O PROFESSOR</span><span aria-hidden="true">✦ 52 LIÇÕES ORGANIZADAS</span><span aria-hidden="true">✦ ATIVIDADES PARA IMPRIMIR</span><span aria-hidden="true">✦ CRIANÇAS DE 4 A 8 ANOS</span><span aria-hidden="true">✦ GUIA PARA O PROFESSOR</span></div></div>';

const icons = {
  Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle class="dot" cx="17.4" cy="6.7" r="1"></circle></svg>',
  Facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.1 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2H8.3v3H11v8z"></path></svg>',
  YouTube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.4 7.2a2.7 2.7 0 0 0-1.9-1.9C17.8 5 12 5 12 5s-5.8 0-7.5.3a2.7 2.7 0 0 0-1.9 1.9C2.3 8.9 2.3 12 2.3 12s0 3.1.3 4.8a2.7 2.7 0 0 0 1.9 1.9C6.2 19 12 19 12 19s5.8 0 7.5-.3a2.7 2.7 0 0 0 1.9-1.9c.3-1.7.3-4.8.3-4.8s0-3.1-.3-4.8Z"></path><path class="cut" d="m10 15.4 5-3.4-5-3.4z"></path></svg>',
  TikTok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 3c.4 2.5 1.8 4 4.3 4.2v3.1c-1.6 0-3-.5-4.3-1.4v6.3a5.7 5.7 0 1 1-5-5.7v3.2a2.6 2.6 0 1 0 1.8 2.5V3z"></path></svg>',
  Kwai: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3.1"></circle><circle cx="16" cy="8" r="3.1"></circle><path d="M5 12.5v3.2A4.3 4.3 0 0 0 9.3 20h5.4a4.3 4.3 0 0 0 4.3-4.3v-3.2"></path><path d="M10.4 14.5h3.2"></path></svg>'
};
const socialLinks = [['Instagram', 'https://www.instagram.com/domingodedescobertas/'], ['Facebook', 'https://www.facebook.com/domingodedescobertas'], ['YouTube', 'https://www.youtube.com/@domingodedescobertas'], ['TikTok', 'https://www.tiktok.com/@domingodedescobertas'], ['Kwai', 'https://www.kwai.com/@domingodedescobertas']];
const footer = document.querySelector('.footer-inner'); footer.querySelector('.footer-socials')?.remove();
const socials = document.createElement('nav'); socials.className = 'footer-socials'; socials.setAttribute('aria-label', 'Redes sociais'); socials.innerHTML = socialLinks.map(([name, href]) => `<a href="${href}" target="_blank" rel="noreferrer" aria-label="${name}">${icons[name]}</a>`).join(''); footer.querySelector('p').before(socials); footer.querySelector('small').textContent = '@domingodedescobertas · © 2026 · Todos os direitos reservados.';