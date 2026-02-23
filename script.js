let jobs = [
    { 
        id: 1, 
        company: "Mobile First Corp", 
        role: "React Native Developer", 
        details: "Remote • Full-time • $130,000 - $175,000",
        description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
        status: "pending" 
    },
    { 
        id: 2, 
        company: "WebFlow Agency", 
        role: "Web Designer & Developer", 
        details: "Los Angeles, CA • Part-time • $80,000 - $110,000",
        description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
        status: "pending" 
    },
    { 
        id: 3, 
        company: "DataViz Solutions", 
        role: "Data Scientist", 
        details: "Remote • Contract • $100/hr - $150/hr",
        description: "Analyze large datasets and create beautiful visualizations to help businesses make data-driven decisions.",
        status: "pending" 
    },
    { 
        id: 4, 
        company: "CloudFirst Inc", 
        role: "Backend Developer", 
        details: "San Francisco, CA • Full-time • $150,000 - $200,000",
        description: "Scale backend infrastructure using Node.js and AWS. Help build the next generation of cloud storage solutions.",
        status: "pending" 
    },
    { 
        id: 5, 
        company: "Creative Sync", 
        role: "UI/UX Designer", 
        details: "Remote • Full-time • $90,000 - $130,000",
        description: "Design user-friendly interfaces for mobile and web applications. Focus on user research and prototyping.",
        status: "pending" 
    },
    { 
        id: 6, 
        company: "Tech Frontier", 
        role: "Frontend Engineer", 
        details: "New York, NY • Full-time • $120,000 - $160,000",
        description: "Develop highly interactive user interfaces using React and Tailwind CSS. Focus on performance and accessibility.",
        status: "pending" 
    },
    { 
        id: 7, 
        company: "App Logic Ltd", 
        role: "Android Developer", 
        details: "Remote • Full-time • $110,000 - $150,000",
        description: "Build native Android apps using Kotlin. Collaborate with backend and design teams to deliver high-quality apps.",
        status: "pending" 
    },
    { 
        id: 8, 
        company: "DevOps Masters", 
        role: "DevOps Engineer", 
        details: "Austin, TX • Full-time • $140,000 - $180,000",
        description: "Manage CI/CD pipelines and infrastructure as code. Automate deployment processes and ensure system stability.",
        status: "pending" 
    }
];

let currentFilter = 'all';

function renderJobs() {
    const jobList = document.getElementById('job-list');
    const emptyState = document.getElementById('empty-state');
    const jobCountBadge = document.getElementById('job-count-badge');
    
    const filtered = jobs.filter(job => currentFilter === 'all' ? true : job.status === currentFilter);

   
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;

    
    jobCountBadge.innerText = `${filtered.length} Jobs`;

    if (filtered.length === 0) {
        jobList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    jobList.innerHTML = filtered.map(job => {
        let tagText = "NOT APPLIED";
        let tagClass = "tag-pending";
        if(job.status === 'interview') { tagText = "INTERVIEW"; tagClass = "tag-interview"; }
        if(job.status === 'rejected') { tagText = "REJECTED"; tagClass = "tag-rejected"; }

        return `
            <div class="job-card">
                <button class="btn-del" onclick="deleteJob(${job.id})">Delete</button>
                <h3>${job.company}</h3>
                <p style="font-weight: 600; color: #475569; margin: 5px 0 0 0;">${job.role}</p>
                <div class="job-details">${job.details}</div>
                
                <span class="tag ${tagClass}">${tagText}</span>
                
                <p class="job-desc">${job.description}</p>

                <div class="actions">
                    <button class="btn-int ${job.status === 'interview' ? 'active' : ''}" 
                        onclick="toggleStatus(${job.id}, 'interview')">INTERVIEW</button>
                    <button class="btn-rej ${job.status === 'rejected' ? 'active' : ''}" 
                        onclick="toggleStatus(${job.id}, 'rejected')">REJECTED</button>
                </div>
            </div>
        `;
    }).join('');
}

function toggleStatus(id, newStatus) {
    const index = jobs.findIndex(j => j.id === id);
    jobs[index].status = jobs[index].status === newStatus ? 'pending' : newStatus;
    renderJobs();
}

function deleteJob(id) {
    
        jobs = jobs.filter(j => j.id !== id);
        renderJobs();
    
}

function filterJobs(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === filter) btn.classList.add('active');
    });
    renderJobs();
}


renderJobs();