const quizData = [
    {
        q: "How many minutes does it take you to fall asleep?",
        options: ["Less than 15 minutes", "15 - 30 minutes", "31 - 60 minutes", "Over an hour"]
    },
    {
        q: "Do you experience brain fog or grogginess in the morning?",
        options: ["Never", "Rarely", "Frequently", "Every day"]
    },
    {
        q: "What is your current age group?",
        options: ["Under 30", "30 - 45", "46 - 60", "60+"]
    }
];

let currentStep = 0;

function renderQuiz() {
    const title = document.getElementById('question-title');
    const grid = document.getElementById('options-grid');
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');

    const percent = Math.round(((currentStep + 1) / (quizData.length + 1)) * 100);
    bar.style.width = percent + "%";
    text.innerText = percent + "%";

    title.innerText = quizData[currentStep].q;
    grid.innerHTML = '';

    quizData[currentStep].options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "p-6 bg-white border-2 border-slate-100 rounded-2xl text-slate-700 font-bold hover:border-blue-600 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-100 transition-all text-center";
        btn.innerText = opt;
        btn.onclick = () => {
            if (currentStep < quizData.length - 1) {
                currentStep++;
                renderQuiz();
            } else {
                showLoading();
            }
        };
        grid.appendChild(btn);
    });
}

function showLoading() {
    document.getElementById('question-area').style.display = 'none';
    document.getElementById('loading-screen').style.display = 'block';
    document.getElementById('progress-bar').style.width = "100%";
    document.getElementById('progress-text').innerText = "100%";

    const steps = ['check-1', 'check-2', 'check-3'];
    steps.forEach((id, index) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            el.classList.replace('text-slate-400', 'text-blue-600');
            el.querySelector('div').classList.add('bg-blue-600', 'text-white', 'border-blue-600');
        }, (index + 1) * 1000);
    });

    setTimeout(() => {
        const affiliateId = "amanda_leoo";
        const vendor = "sleepwell";
        window.location.href = `https://hop.clickbank.net/?affiliate=${affiliateId}&vendor=${vendor}`;
    }, 4500);
}

document.addEventListener('DOMContentLoaded', renderQuiz);
