// Captura o GCLID da URL e salva no Cookie (Conceito que já vimos)
const urlParams = new URLSearchParams(window.location.search);
const gclid = urlParams.get('gclid');
if (gclid) {
    document.cookie = `user_gclid=${gclid}; max-age=${30*24*60*60}; path=/; SameSite=Lax`;
}

// Lógica de UX: Revelar o CTA no Scroll
window.addEventListener('scroll', () => {
    const cta = document.getElementById('cta-section');
    // Se o usuário desceu mais de 500px, mostramos a oferta
    if (window.scrollY > 500) {
        cta.classList.replace('opacity-0', 'opacity-100');
        cta.classList.replace('translate-y-10', 'translate-y-0');
    }
});

function handleAffiliateRedirect() {
    // Busca o GCLID ou usa um padrão
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('user_gclid='))
        ?.split('=')[1] || 'organic';

    // Link de Afiliado (Ex: Alpilean/Puravive)
    const affiliateId = "amanda_leoo";
    const vendor = "pivive"; // Exemplo de vendor
    
    window.location.href = `https://hop.clickbank.net/?affiliate=${affiliateId}&vendor=${vendor}&tid=${cookieValue}`;
}