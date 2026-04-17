// Cookie management for tracking
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

// Capture GCLID if present in URL
const urlParams = new URLSearchParams(window.location.search);
const gclid = urlParams.get('gclid');
if (gclid) {
    setCookie('user_gclid', gclid, 30);
}

// Affiliate redirect handler
function handleAffiliateRedirect() {
    const savedGclid = getCookie('user_gclid') || 'direct_visit';
    const affiliateId = "amanda_leoo";
    const vendor = "pivive";
    window.location.href = `https://hop.clickbank.net/?affiliate=${affiliateId}&vendor=${vendor}&tid=${savedGclid}`;
}
