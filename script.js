// 1. Dark Mode Toggle logic
const btn = document.getElementById('theme-toggle');
btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    btn.innerText = document.body.classList.contains('dark-theme') ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// 2. Dynamic Data Fetching (GitHub API)
async function fetchRepoData() {
    const repoList = document.getElementById('repo-list');
    const statsContainer = document.getElementById('stats-container');

    try {
        const response = await fetch('https://api.github.com/users/Raghavan-04/repos?sort=updated');
        const repos = await response.json();

        // Clear loading message
        repoList.innerHTML = '';
        statsContainer.innerText = `Public Repos: ${repos.length}`;

        // Dynamically create list items for each repo
        repos.slice(0, 5).forEach(repo => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${repo.name}</strong> - ⭐ ${repo.stargazers_count}<br>
                            <a href="${repo.html_url}" target="_blank">View Project</a>`;
            repoList.appendChild(li);
        });
    } catch (error) {
        statsContainer.innerText = "Failed to load GitHub data.";
    }
}

fetchRepoData();
