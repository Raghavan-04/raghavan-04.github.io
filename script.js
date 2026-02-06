const btn = document.getElementById('theme-toggle');
btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    btn.innerText = document.body.classList.contains('dark-theme') ? "☀️ Light Mode" : "🌙 Dark Mode";
});

async function fetchRepoData() {
    const repoList = document.getElementById('repo-list');
    const statsContainer = document.getElementById('stats-container');

    try {
        // Fetching from your actual GitHub profile
        const response = await fetch('https://api.github.com/users/Raghavan-04/repos?sort=updated');
        const repos = await response.json();

        if (repos.length > 0) {
            statsContainer.innerText = `You have ${repos.length} public projects live!`;
            repoList.innerHTML = repos.slice(0, 4).map(repo => `
                <div class="repo-card">
                    <strong>${repo.name}</strong>
                    <p>⭐ ${repo.stargazers_count} Stars</p>
                    <a href="${repo.html_url}" target="_blank" style="color: var(--accent)">View Code</a>
                </div>
            `).join('');
        }
    } catch (error) {
        statsContainer.innerText = "Error loading GitHub data. Check your internet connection.";
    }
}

fetchRepoData();
