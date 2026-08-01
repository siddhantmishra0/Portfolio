import { inject } from '@vercel/analytics';

inject({
  mode: 'auto',
  debug: false
});

const ASCII = `
███████╗██╗██████╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗████████╗
██╔════╝██║██╔══██╗██╔══██╗██║  ██║██╔══██╗████╗  ██║╚══██╔══╝
███████╗██║██║  ██║██║  ██║███████║███████║██╔██╗ ██║   ██║
╚════██║██║██║  ██║██║  ██║██╔══██║██╔══██║██║╚██╗██║   ██║
███████║██║██████╔╝██████╔╝██║  ██║██║  ██║██║ ╚████║   ██║
╚══════╝╚═╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝`;

const SOCIAL = {
  email: 'mishrasiddhant2605@gmail.com',
  github: 'siddhantmishra0',
  linkedin: 'siddhantmishra0',
};

const RESUME_URL = 'resume.pdf';

const ABOUT = `Name      Siddhant Mishra
Role      Software Engineer — Full-Stack
Location  Mumbai, India (open to relocation)
Education B.Tech , TCET Mumbai
Status    Immediate joiner, open to full-time roles

I am a passionate Full-Stack Developer specializing in building
scalable web applications and AI-powered platforms. Experienced in
the MERN stack and integrating intelligent capabilities into products.`;

const PROJECTS = [
  {
    name: 'ArchiAI',
    tech: 'React.js, TypeScript, Tailwind CSS, Google Gemini API, Puter.js',
    description: 'Generative AI-powered architectural visualization platform converting 2D floor plans into interactive 3D designs in real time. Features intelligent layout recognition, interactive before/after comparisons, and cloud-synced project history.',
    link: 'https://archi-ai-nine.vercel.app/',
  },
  {
    name: 'SpendSense',
    tech: 'React.js, TailwindCSS, Node.js, Express.js, MongoDB, Zustand, React Query, Vitest',
    description: 'Full-stack MERN personal finance platform with expense tracking, budgeting, and PWA support. Integrated Groq LLMs and Tesseract.js OCR for an AI financial assistant and receipt scanning, reducing manual entry by 80%.',
    link: 'https://spendsense-ten.vercel.app/',
  },
  {
    name: 'CareKaro',
    tech: 'React.js, TypeScript, Supabase, TailwindCSS, ShadCN',
    description: 'AI-powered personal health management platform for medical reports and health metrics. Features role-based dashboards, medical report analysis, specialist recommendations, and secure record sharing.',
    link: 'https://care-karo-nine.vercel.app/',
  }
];

const SKILLS = [
  {
    category: 'Languages',
    items: 'Java, JavaScript, SQL, NoSQL',
  },
  {
    category: 'Dev Tools',
    items: 'VS Code, Git, GitHub, Postman, Chrome DevTools, MySQL Workbench, Figma',
  },
  {
    category: 'Tech/Frameworks',
    items: 'React.js, Node.js, Express.js, Puter.js, Tailwind CSS, MySQL, MongoDB, Zustand, React Query, Vitest, Github Actions',
  },
];

const EXPERIENCE = [
  {
    role: 'Technical Lead',
    company: 'BharatWatch',
    period: 'Oct 2025 – Dec 2025 | Mumbai',
    bullets: [
      'Served as the first Technical Lead and founding engineering team member at BharatWatch, leading a team of 3–4 developers in building a scalable video-streaming platform using the MERN stack',
      'Architected and developed core platform features, including video upload, streaming, user authentication, content management, and backend APIs, ensuring performance and scalability',
      'Led technical planning, code reviews, and team coordination, driving product development from initial concept to production-ready releases',
    ],
  },
  {
    role: 'React.js Developer Intern',
    company: 'CodTech IT Solutions',
    period: 'Nov 2024 – Jan 2025 | Mumbai',
    bullets: [
      'Developed and optimized reusable React components, implemented state management, and integrated REST APIs to deliver dynamic user experiences',
      'Collaborated on project development, debugging, and performance optimization while following industry-standard coding practices and version control workflows',
    ],
  }
];

const ACHIEVEMENTS = [
  'Postman API Fundamentals Student Expert - Postman',
  'Software Engineering Job Simulation - JPMorgan Chase & Co.',
];

const span = (text, cls) => `<span class="${cls}">${text}</span>`;
const escapeHTML = (str) => str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag]));

class Terminal {
  constructor(outputEl, inputEl) {
    this.output = outputEl;
    this.input = inputEl;
    this.history = [];
    this.histIdx = -1;
    this.isProcessing = false;

    this.COMMANDS = {
      help:         async () => await this.printHelp(),
      about:        async () => await this.printAbout(),
      projects:     async () => await this.printProjects(),
      skills:       async () => await this.printSkills(),
      experience:   async () => await this.printExperience(),
      achievements: async () => await this.printAchievements(),
      socials:      async () => await this.printSocials(),
      whoami:       async () => await this.printWhoami(),
      resume:       async () => await this.openResume(),
      clear:        async () => await this.clear(),
      agent:        async () => await this.runAgentEasterEgg(),
    };

    this.bindKeys();
    this.init();
  }

  async init() {
    this.isProcessing = true;
    this.input.disabled = true;
    await this.printBanner();
    await this.printHelp();
    this.isProcessing = false;
    this.input.disabled = false;
    this.input.focus();
  }

  bindKeys() {
    this.input.addEventListener('keydown', (e) => {
      if (this.isProcessing) { e.preventDefault(); return; }

      if (e.key === 'Enter') {
        const val = this.input.value.trim();
        this.input.value = '';
        this.execute(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.histIdx < this.history.length - 1) this.histIdx++;
        this.input.value = this.history[this.histIdx] ?? '';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.histIdx > 0) this.histIdx--;
        else { this.histIdx = -1; this.input.value = ''; return; }
        this.input.value = this.history[this.histIdx] ?? '';
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const val = this.input.value.trim().toLowerCase();
        if (!val) return;
        const cmds = Object.keys(this.COMMANDS);
        const matches = cmds.filter(c => c.startsWith(val));

        if (matches.length === 1) {
          this.input.value = matches[0];
        } else if (matches.length > 1) {
          // Sync print for autocomplete to avoid weird UX
          this.printSync('');
          this.printSyncCmd(val);
          this.printSync(`  ${span(matches.join('   '), 'c-green')}`);
          this.printSync('');
        }
      }
    });

    document.getElementById('terminal-screen').addEventListener('click', () => {
      const selection = window.getSelection();
      if (!selection || selection.toString().length === 0) this.input.focus();
    });
  }

  async typeNode(sourceNode, targetNode, speed) {
    if (sourceNode.nodeType === Node.TEXT_NODE) {
      const text = sourceNode.textContent;
      let currentText = '';
      const textNode = document.createTextNode('');
      targetNode.appendChild(textNode);
      for (let i = 0; i < text.length; i++) {
        currentText += text[i];
        textNode.textContent = currentText;
        this.output.scrollTop = this.output.scrollHeight;
        if (speed > 0) await new Promise(r => setTimeout(r, speed));
      }
    } else if (sourceNode.nodeType === Node.ELEMENT_NODE) {
      const clone = sourceNode.cloneNode(false);
      targetNode.appendChild(clone);
      for (const child of sourceNode.childNodes) {
        await this.typeNode(child, clone, speed);
      }
    }
  }

  async print(html, speed = 2) {
    const div = document.createElement('div');
    this.output.appendChild(div);
    if (speed === 0) {
      div.innerHTML = html;
      this.output.scrollTop = this.output.scrollHeight;
      return;
    }
    const temp = document.createElement('div');
    temp.innerHTML = html;
    for (const child of temp.childNodes) {
      await this.typeNode(child, div, speed);
    }
    this.output.scrollTop = this.output.scrollHeight;
  }

  printSync(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    this.output.appendChild(div);
    this.output.scrollTop = this.output.scrollHeight;
  }

  printSyncCmd(text) {
    this.printSync(`${span('guest@macbook-pro', 'c-dim')} ${span('~', 'c-blue')} ${span('%', 'c-dim')} ${span(text, 'c-white')}`);
  }

  async printCmd(text) {
    await this.print(`${span('guest@macbook-pro', 'c-dim')} ${span('~', 'c-blue')} ${span('%', 'c-dim')} ${span(text, 'c-white')}`, 0);
  }

  async execute(raw) {
    if (!raw) return;
    this.history.unshift(raw);
    this.histIdx = -1;
    
    this.isProcessing = true;
    this.input.disabled = true;

    const safeRaw = escapeHTML(raw);
    await this.printCmd(safeRaw);
    
    const cmd = raw.toLowerCase();
    if (this.COMMANDS[cmd]) {
      await this.COMMANDS[cmd]();
    } else {
      await this.print(`\n${span('zsh: command not found:', 'c-red')} ${safeRaw} — type ${span('help', 'c-yellow')} for available commands\n`, 5);
    }

    this.isProcessing = false;
    this.input.disabled = false;
    this.input.focus();
  }

  async clear() { 
    this.output.innerHTML = ''; 
  }

  async printBanner() {
    await this.print(`<pre class="ascii-art">${ASCII}</pre>`, 0);
    await this.print(`  Welcome to ${span('macOS', 'c-dim')} (Darwin Kernel Version 22.5.0)`);
    await this.print(`  ${span('Siddhant Mishra', 'c-cyan')} — Software Engineer & Full-Stack Developer`);
    await this.print(`  ${span('Type ', 'c-dim')}${span('help', 'c-yellow')}${span(' or click the chips below to navigate.', 'c-dim')}\n`, 5);
  }

  async printHelp() {
    const cmds = [
      ['about',        'who am I'],
      ['projects',     'things I have built'],
      ['skills',       'my tech stack'],
      ['experience',   'work history'],
      ['achievements', 'certifications'],
      ['socials',      'find me online'],
      ['whoami',       'one-line identity'],
      ['resume',       'open resume PDF'],
      ['clear',        'clear the terminal'],
    ];
    await this.print(`\n${span('available commands:', 'c-yellow')}\n`, 2);
    for (const [cmd, desc] of cmds) {
      await this.print(`  ${span(cmd.padEnd(14), 'c-green')}${span('— ' + desc, 'c-dim')}`, 1);
    }
    await this.print('', 0);
  }

  async printAbout() {
    await this.print(`\n${span('// about', 'c-yellow')}\n`, 0);
    const lines = ABOUT.split('\n');
    for (const line of lines) {
      await this.print(`  ${line}`, 2);
    }
    await this.print('', 0);
  }

  async printProjects() {
    await this.print(`\n${span('// projects', 'c-yellow')}\n`, 0);
    for (let i = 0; i < PROJECTS.length; i++) {
      const p = PROJECTS[i];
      const num = String(i + 1).padStart(2, '0');
      await this.print(`  ${span('[' + num + ']', 'c-cyan')} ${span(p.name, 'c-green')}`, 2);
      await this.print(`<div class="indent-7">       ${span(p.tech, 'c-yellow')}</div>`, 2);
      await this.print(`<div class="indent-7">       ${span(p.description, 'c-white')}</div>`, 1);
      await this.print(`<div class="indent-7">       <a href="${p.link}" target="_blank" rel="noopener noreferrer">${p.link}</a></div>`, 0);
      await this.print('', 0);
    }
  }

  async printSkills() {
    await this.print(`\n${span('// skills', 'c-yellow')}\n`, 0);
    for (const s of SKILLS) {
      await this.print(`<div class="indent-15">  ${span(s.category.padEnd(12), 'c-cyan')} ${span(s.items, 'c-white')}</div>`, 2);
    }
    await this.print('', 0);
  }

  async printExperience() {
    await this.print(`\n${span('// experience', 'c-yellow')}\n`, 0);
    for (const e of EXPERIENCE) {
      await this.print(`  ${span(e.role, 'c-green')} ${span('@', 'c-dim')} ${span(e.company, 'c-cyan')}`, 2);
      await this.print(`  ${span(e.period, 'c-dim')}\n`, 1);
      for (const b of e.bullets) {
        await this.print(`<div class="indent-4">  ${span('›', 'c-dim')} ${span(b, 'c-white')}</div>`, 1);
      }
      await this.print('', 0);
    }
  }

  async printAchievements() {
    await this.print(`\n${span('// achievements', 'c-yellow')}\n`, 0);
    for (const a of ACHIEVEMENTS) {
      await this.print(`<div class="indent-4">  ${span('★', 'c-magenta')} ${span(a, 'c-white')}</div>`, 2);
    }
    await this.print('', 0);
  }

  async printSocials() {
    await this.print(`\n${span('// socials', 'c-yellow')}\n`, 0);
    await this.print(`<div class="indent-13">  ${span('github'.padEnd(10), 'c-cyan')} <a href="https://github.com/${SOCIAL.github}" target="_blank" rel="noopener noreferrer">github.com/${SOCIAL.github}</a></div>`, 2);
    await this.print(`<div class="indent-13">  ${span('linkedin'.padEnd(10), 'c-cyan')} <a href="https://linkedin.com/in/${SOCIAL.linkedin}" target="_blank" rel="noopener noreferrer">linkedin.com/in/${SOCIAL.linkedin}</a></div>`, 2);
    await this.print(`<div class="indent-13">  ${span('email'.padEnd(10), 'c-cyan')} <a href="mailto:${SOCIAL.email}">${SOCIAL.email}</a></div>`, 2);
    await this.print('', 0);
  }

  async printWhoami() {
    await this.print(`\n  ${span('siddhant mishra', 'c-cyan')} — software engineer, full-stack developer\n`, 5);
  }

  async openResume() {
    await this.print(`\n${span('opening resume...', 'c-green')}\n`, 5);
    const w = window.open(RESUME_URL, '_blank');
    if (!w) {
      await this.print(`${span('blocked by browser. visit directly:', 'c-red')} <a href="${RESUME_URL}" target="_blank" rel="noopener noreferrer">${RESUME_URL}</a>\n`, 0);
    }
  }

  async runAgentEasterEgg() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const logs = [
      span('[System] Elevating privileges...', 'c-dim'),
      span('[System] Bypassing firewall... Done.', 'c-dim'),
      span('[System] Scanning for vulnerabilities...', 'c-dim'),
    ];

    await this.print('', 0);
    for (const log of logs) {
      await sleep(500 + Math.random() * 500);
      await this.print(`  ${log}`, 10);
    }
    await sleep(800);
    await this.print(`\n  ${span('Just kidding! Have a great day.', 'c-green')}\n`, 5);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const outputEl = document.getElementById('output');
  const inputEl = document.getElementById('cmd-input');

  const terminal = new Terminal(outputEl, inputEl);

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      terminal.execute(cmd);
      inputEl.focus();
    });
  });
});