// Templates pour la génération d'idées
const templates = {
    fr: {
        blog: [
            "Guide complet : Comment [keyword]",
            "10 astuces pour [keyword] efficacement",
            "Pourquoi [keyword] est important en 2024",
            "Les erreurs à éviter avec [keyword]",
            "Comment débuter avec [keyword]",
            "[keyword] : Guide pour débutants",
            "Les meilleures pratiques pour [keyword]",
            "Comment optimiser [keyword]",
            "L'art de [keyword] : Guide détaillé",
            "5 mythes sur [keyword] démystifiés"
        ],
        video: [
            "3 secrets pour [keyword] en 60 secondes",
            "Tutorial rapide : [keyword]",
            "Le meilleur conseil pour [keyword]",
            "[keyword] expliqué simplement",
            "Comment j'ai appris [keyword]",
            "Découvrez [keyword] en 5 minutes",
            "Les bases de [keyword]",
            "Astuces pro pour [keyword]",
            "Révolutionnez votre [keyword]",
            "[keyword] : Tutoriel pas à pas"
        ],
        seo: [
            "[keyword] : Guide étape par étape",
            "Meilleurs outils pour [keyword] en 2024",
            "[keyword] : Comparatif et avis",
            "Comment choisir [keyword]",
            "[keyword] pour débutants",
            "Top 10 [keyword] : Guide d'achat",
            "Avis expert : [keyword]",
            "Comment trouver le meilleur [keyword]",
            "[keyword] : Prix et comparatif",
            "Guide ultime du [keyword]"
        ]
    },
    en: {
        blog: [
            "Complete Guide: How to [keyword]",
            "10 Tips for Effective [keyword]",
            "Why [keyword] Matters in 2024",
            "Common Mistakes to Avoid with [keyword]",
            "Getting Started with [keyword]",
            "[keyword]: Beginner's Guide",
            "Best Practices for [keyword]",
            "How to Optimize [keyword]",
            "The Art of [keyword]: Detailed Guide",
            "5 [keyword] Myths Debunked"
        ],
        video: [
            "3 [keyword] Secrets in 60 Seconds",
            "Quick Tutorial: [keyword]",
            "Best Advice for [keyword]",
            "[keyword] Explained Simply",
            "How I Learned [keyword]",
            "Discover [keyword] in 5 Minutes",
            "[keyword] Basics",
            "Pro Tips for [keyword]",
            "Revolutionize Your [keyword]",
            "[keyword]: Step-by-Step Tutorial"
        ],
        seo: [
            "[keyword]: Step-by-Step Guide",
            "Best Tools for [keyword] in 2024",
            "[keyword]: Comparison and Reviews",
            "How to Choose [keyword]",
            "[keyword] for Beginners",
            "Top 10 [keyword]: Buying Guide",
            "Expert Review: [keyword]",
            "How to Find the Best [keyword]",
            "[keyword]: Prices and Comparison",
            "Ultimate Guide to [keyword]"
        ]
    },
    es: {
        blog: [
            "Guía completa: Cómo [keyword]",
            "10 consejos para [keyword] eficazmente",
            "Por qué [keyword] es importante en 2024",
            "Errores comunes a evitar con [keyword]",
            "Comenzando con [keyword]",
            "[keyword]: Guía para principiantes",
            "Mejores prácticas para [keyword]",
            "Cómo optimizar [keyword]",
            "El arte de [keyword]: Guía detallada",
            "5 mitos sobre [keyword] desmentidos"
        ],
        video: [
            "3 secretos de [keyword] en 60 segundos",
            "Tutorial rápido: [keyword]",
            "El mejor consejo para [keyword]",
            "[keyword] explicado simplemente",
            "Cómo aprendí [keyword]",
            "Descubre [keyword] en 5 minutos",
            "Fundamentos de [keyword]",
            "Consejos profesionales para [keyword]",
            "Revoluciona tu [keyword]",
            "[keyword]: Tutorial paso a paso"
        ],
        seo: [
            "[keyword]: Guía paso a paso",
            "Mejores herramientas para [keyword] en 2024",
            "[keyword]: Comparativa y opiniones",
            "Cómo elegir [keyword]",
            "[keyword] para principiantes",
            "Top 10 [keyword]: Guía de compra",
            "Opinión experta: [keyword]",
            "Cómo encontrar el mejor [keyword]",
            "[keyword]: Precios y comparativa",
            "Guía definitiva de [keyword]"
        ]
    }
};

// Fonction pour mélanger un tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fonction pour afficher un toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('visible');
    
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3000);
}

// Fonction pour copier dans le presse-papiers
async function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = Array.from(element.children)
        .map(li => li.textContent)
        .join('\n');

    try {
        await navigator.clipboard.writeText(text);
        showToast('Copié dans le presse-papiers !');
    } catch (err) {
        showToast('Erreur lors de la copie');
    }
}

// Fonction principale pour générer les idées
function generateIdeas() {
    const keyword = document.getElementById('keyword').value.trim();
    const language = document.getElementById('language').value;

    if (!keyword) {
        showToast('Veuillez entrer un mot-clé');
        return;
    }

    // Afficher les résultats avec animation
    const results = document.getElementById('results');
    results.classList.add('visible');

    // Générer les idées pour chaque catégorie
    generateIdeasForCategory('blog', keyword, language);
    generateIdeasForCategory('video', keyword, language);
    generateIdeasForCategory('seo', keyword, language, 'seoTitles');
}

// Fonction pour régénérer les idées d'une catégorie
function regenerateIdeas(category) {
    const keyword = document.getElementById('keyword').value.trim();
    const language = document.getElementById('language').value;
    
    if (!keyword) {
        showToast('Veuillez entrer un mot-clé');
        return;
    }

    generateIdeasForCategory(category, keyword, language, category === 'seo' ? 'seoTitles' : category + 'Ideas');
}

// Fonction pour générer les idées pour une catégorie spécifique
function generateIdeasForCategory(category, keyword, language, targetId = category + 'Ideas') {
    const ideas = shuffleArray([...templates[language][category]])
        .slice(0, 5)
        .map(template => template.replace('[keyword]', keyword));

    const ul = document.getElementById(targetId);
    if (ul) {
        ul.innerHTML = ideas.map(idea => `<li>${idea}</li>`).join('');
        ul.style.animation = 'none';
        ul.offsetHeight; // Force reflow
        ul.style.animation = 'fadeIn 0.5s ease forwards';
    }
}

// Ajouter l'événement pour la touche Entrée
document.getElementById('keyword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateIdeas();
    }
});

// Sauvegarder le dernier mot-clé dans le localStorage
document.getElementById('keyword').value = localStorage.getItem('lastKeyword') || '';
document.getElementById('keyword').addEventListener('input', function(e) {
    localStorage.setItem('lastKeyword', e.target.value);
});

// Sauvegarder la dernière langue sélectionnée
document.getElementById('language').value = localStorage.getItem('lastLanguage') || 'fr';
document.getElementById('language').addEventListener('change', function(e) {
    localStorage.setItem('lastLanguage', e.target.value);
});