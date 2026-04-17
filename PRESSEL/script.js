// Capture GCLID if present in URL
const urlParams = new URLSearchParams(window.location.search);
const gclid = urlParams.get('gclid');
if (gclid) {
    document.cookie = `user_gclid=${gclid}; max-age=${30*24*60*60}; path=/; SameSite=Lax`;
}

// Affiliate redirect handler
function handleAffiliateRedirect() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('user_gclid='))
        ?.split('=')[1] || 'organic';

    const affiliateId = "amanda_leoo";
    const vendor = "pivive";
    window.location.href = `https://hop.clickbank.net/?affiliate=${affiliateId}&vendor=${vendor}&tid=${cookieValue}`;
}
