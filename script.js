// Toggle Dark Mode
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeBtn.querySelector('i');
    const isDark = document.body.classList.contains('dark-theme');
    icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
});

// Fetch Repos with Modern Layout
async function getRepos() {
    const grid = document.getElementById('repo-grid');
    const stats = document.getElementById('github-data');
    
    try {
        const res = await fetch('https://api.github.com/users/Raghavan-04/repos?sort=updated');
        const data = await res.json();
        
        stats.innerHTML = `<h3>Activity</h3><p>I currently have <strong>${data.length}</strong> public repositories. Here are my latest projects:</p>`;
        
        grid.innerHTML = data.slice(0, 6).map(repo => `
            <div class="card">
                <h3 style="margin-bottom: 0.5rem">${repo.name}</h3>
                <p style="font-size: 0.9rem; opacity: 0.7; margin-bottom: 1rem">
                    ${repo.description || 'No description provided for this repository.'}
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center">
                    <span style="font-size: 0.8rem; font-weight: 600">⭐ ${repo.stargazers_count}</span>
                    <a href="${repo.html_url}" target="_blank" class="btn-secondary" style="margin: 0">View Repo →</a>
                </div>
            </div>
        `).join('');
    } catch (e) {
        stats.innerText = "Error loading live data.";
    }
}

getRepos();
