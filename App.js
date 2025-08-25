document.addEventListener('DOMContentLoaded', () => {

    const pages = {
        news: document.getElementById('news'),
        releases: document.getElementById('releases'),
        ai: document.getElementById('ai')
    };

    const navItems = document.querySelectorAll('.nav-item');
    const newsList = document.querySelector('.news-list');
    const releasesList = document.querySelector('.releases-list');
    const repoInput = document.getElementById('repo-input');
    const fetchBtn = document.getElementById('fetch-releases-btn');
    const chatLog = document.querySelector('.chat-log');
    const chatForm = document.getElementById('ai-chat-form');
    const userInput = document.getElementById('user-input');

    // 1. Navigation Logic
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = e.currentTarget.dataset.page;

            // Remove active class from all nav items and pages
            navItems.forEach(nav => nav.classList.remove('active'));
            Object.values(pages).forEach(page => page.classList.add('hidden'));

            // Add active class to the selected item and show the corresponding page
            e.currentTarget.classList.add('active');
            pages[pageName].classList.remove('hidden');

            if (pageName === 'news' && newsList.children.length === 0) {
                fetchCodingNews();
            }
        });
    });

    // 2. Fetch Coding News (Placeholder)
    async function fetchCodingNews() {
        const loadingSpinner = document.querySelector('.loading-spinner');
        loadingSpinner.style.display = 'block';

        // **This is a placeholder. You'd need a real news API and backend.**
        const mockNews = [
            { title: "New Release: Node.js 20", summary: "Node.js 20 is out with new features like..." },
            { title: "GitHub Universe 2025 Highlights", summary: "Key announcements from the event include..." },
            { title: "The Future of WebAssembly", summary: "A deep dive into the growing ecosystem of Wasm." }
        ];

        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            mockNews.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.className = 'news-article';
                articleDiv.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                `;
                newsList.appendChild(articleDiv);
            });
        }, 1500); // Simulate API call delay
    }

    // 3. Fetch GitHub Releases Logic
    fetchBtn.addEventListener('click', async () => {
        const repo = repoInput.value.trim();
        if (!repo) {
            alert("Please enter a repository name.");
            return;
        }

        releasesList.innerHTML = '<div class="loading-spinner"></div>';
        const url = `https://api.github.com/repos/${repo}/releases`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Repository not found or API limit exceeded.');
            const releases = await response.json();

            releasesList.innerHTML = ''; // Clear previous results
            if (releases.length === 0) {
                releasesList.innerHTML = '<p class="text-secondary">No releases found for this repository.</p>';
                return;
            }

            releases.forEach(release => {
                const releaseDiv = document.createElement('div');
                releaseDiv.className = 'release-item';
                releaseDiv.innerHTML = `
                    <h3>${release.name || release.tag_name}</h3>
                    <p>Published: ${new Date(release.published_at).toLocaleDateString()}</p>
                    <a href="${release.html_url}" target="_blank">View on GitHub</a>
                `;
                releasesList.appendChild(releaseDiv);
            });

        } catch (error) {
            releasesList.innerHTML = `<p class="text-secondary">Error: ${error.message}</p>`;
        }
    });

    // 4. AI Chat Logic (Placeholder)
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // Display user message in chat log
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'user-message';
        userMessageDiv.textContent = userMessage;
        chatLog.appendChild(userMessageDiv);
        userInput.value = '';
        chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to bottom

        // **This is a placeholder for an AI API call.**
        // You would send userMessage to a backend server with an AI model (e.g., Gemini, OpenAI)
        // and receive a response.
        setTimeout(() => {
            const aiResponse = "That's a great question! I'm sorry, my real-time knowledge is limited to what's been pre-programmed. For live information, please check the 'News' or 'Releases' sections.";
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'ai-message';
            aiMessageDiv.textContent = aiResponse;
            chatLog.appendChild(aiMessageDiv);
            chatLog.scrollTop = chatLog.scrollHeight;
        }, 1000); // Simulate AI thinking delay
    });

    // Initial load
    fetchCodingNews();
});