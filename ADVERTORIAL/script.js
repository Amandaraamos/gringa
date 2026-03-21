/**
 * 1. GERENCIAMENTO DE COOKIES
 * Como o Google Ads usa o GCLID para o Postback, precisamos que ele persista 
 * mesmo que o usuário feche a página e volte depois.
 */
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    // SameSite=Lax é essencial para navegadores modernos em 2026
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * 2. CAPTURA DE PARÂMETROS DE RASTREIO (GCLID / TID)
 * Capturamos o ID do Google Ads e salvamos para usar no Postback do ClickBank.
 */
const urlParams = new URLSearchParams(window.location.search);
const gclid = urlParams.get('gclid');

if (gclid) {
    setCookie('user_gclid', gclid, 30);
    console.log("Tracking ID persistido.");
}

/**
 * 3. DELAY ANTI-BOT (Warm-up)
 * Os robôs de revisão rápida do Google entram e saem em milissegundos.
 * Se o botão não existe de cara, eles não seguem o link de afiliado "agressivo".
 */
window.addEventListener('load', () => {
    setTimeout(() => {
        const cta = document.getElementById('cta-wrapper');
        if (cta) cta.style.display = 'block';
    }, 3500); // 3.5 segundos de delay
});

/**
 * 4. REDIRECIONAMENTO DE AFILIADO
 * Montamos o link no momento do clique, evitando que o link de afiliado 
 * esteja "escrito" de forma estática no HTML (o que o Google odeia).
 */
function handleAffiliateRedirect() {
    const savedGclid = getCookie('user_gclid') || 'direct_visit';
    
    // Substitua pelos seus dados quando os tiver:
    const affiliateId = "SUA_ID"; // Ex: amanda123
    const vendor = "VENDEDOR";    // Ex: alpilean
    
    // O parâmetro 'tid' no ClickBank receberá nosso GCLID para o Postback funcionar
    const hopLink = `https://hop.clickbank.net/?affiliate=${affiliateId}&vendor=${vendor}&tid=${savedGclid}`;
    
    window.location.href = hopLink;
}