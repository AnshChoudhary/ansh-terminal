document.addEventListener("DOMContentLoaded", function() {
    const terminalBody = document.querySelector(".terminal-body");
    const terminalHeader = document.querySelector(".terminal-header");
    const terminal = document.querySelector(".terminal");
    const commandHistory = [];
    let historyIndex = -1;
    let currentUserInput = null;
    let suggestionContainer = null;
    
    // Enhanced theme colors with CSS variable support
    let themeColors = {
        textColor: 'var(--accent-green)',
        headerColor: 'var(--text-primary)',
    };

    // Available commands list for auto-completion
    const availableCommands = [
        'about', 'achievements', 'clear', 'cls', 'echo', 'education', 'email', 
        'exit', 'game', 'github', 'help', 'history', 'nutriscan', 'portfolio', 
        'projects', 'pwd', 'skills', 'socials', 'themes', 'welcome', 'whoami',
        'hello', 'rps', '8ball', 'blackjack', 'work', 'goat'
    ];

    const commands = {
        "help": () => {
            return `
                <div class="command-output">
                    <strong>Available Commands:</strong><br><br>
                    <span style="color:${themeColors.textColor};">about</span>          - learn more about me <br>
                    <span style="color:${themeColors.textColor};">achievements</span>   - list out my achievements <br>
                    <span style="color:${themeColors.textColor};">clear</span>          - clear the terminal display <br>
                    <span style="color:${themeColors.textColor};">echo</span>           - display custom text or messages <br>
                    <span style="color:${themeColors.textColor};">education</span>      - explore my academic journey <br>
                    <span style="color:${themeColors.textColor};">email</span>          - reach out via Email <br>
                    <span style="color:${themeColors.textColor};">exit</span>           - close the current session <br>
                    <span style="color:${themeColors.textColor};">game</span>           - play a fun typing game that i developed <br>
                    <span style="color:${themeColors.textColor};">github</span>         - checkout my github profile <br>
                    <span style="color:${themeColors.textColor};">help</span>           - get a list of available commands <br>
                    <span style="color:${themeColors.textColor};">history</span>        - see your command usage history <br>
                    <span style="color:${themeColors.textColor};">nutriscan</span>      - try nutriscan and track your food intake <br>
                    <span style="color:${themeColors.textColor};">portfolio</span>      - view my website <br>
                    <span style="color:${themeColors.textColor};">projects</span>       - check out my projects <br>
                    <span style="color:${themeColors.textColor};">pwd</span>            - show the current working directory <br>
                    <span style="color:${themeColors.textColor};">skills</span>         - view my skill set <br>
                    <span style="color:${themeColors.textColor};">socials</span>        - discover my social media profiles <br>
                    <span style="color:${themeColors.textColor};">themes</span>         - browse through available themes <br>
                    <span style="color:${themeColors.textColor};">welcome</span>        - view the introductory section <br>
                    <span style="color:${themeColors.textColor};">whoami</span>         - find out who the current user is <br>
                    <br>
                    <em>💡 Tip: Use Tab for auto-completion and ↑/↓ arrows for command history</em>
                </div>
            `;
        },

        "themes": `<div class="command-output">Available themes: <br><br>🌟 <strong>ubuntu</strong><br>🌟 <strong>git-bash</strong><br>🌟 <strong>sunset</strong><br>🌟 <strong>sweet</strong><br><br>To change themes, type '<span style="color:var(--accent-green);">themes go to "theme-name"</span>'.<br>Example: <code>themes go to sunset</code></div>`,
        
        "themes go to ubuntu": () => {
            applyTheme('ubuntu', {
                terminal: '#300a24',
                header: '#595959',
                headerText: 'white',
                bodyText: '#00ff00',
                textColor: '#00ff00'
            });
            return '<div class="success-message">✅ Switched to Ubuntu theme!</div>';
        },

        "themes go to git-bash": () => {
            applyTheme('git-bash', {
                terminal: 'linear-gradient(135deg, #1a1a1a, #2e2e2e)',
                header: 'linear-gradient(135deg, #2e2e2e, #444444)',
                headerText: '#00ff00',
                bodyText: '#00ff00',
                textColor: '#00ff00'
            });
            return '<div class="success-message">✅ Switched to Git-Bash theme!</div>';
        },

        "themes go to sunset": () => {
            applyTheme('sunset', {
                terminal: 'linear-gradient(in oklab, #ffff00, red)',
                header: 'linear-gradient(135deg, #ff7f50, #ff4500)',
                headerText: '#ffffff',
                bodyText: '#fffb00',
                textColor: '#fffb00'
            });
            return '<div class="success-message">✅ Switched to Sunset theme!</div>';
        },

        "themes go to sweet": () => {
            applyTheme('sweet', {
                terminal: 'linear-gradient(135deg, #ffb6c1, #ff69b4)',
                header: 'linear-gradient(135deg, #ffd9df, #ff69b4)',
                headerText: '#ff178b',
                bodyText: '#ff178b',
                textColor: '#ff0f9f'
            });
            return '<div class="success-message">✅ Switched to Sweet theme!</div>';
        },

        "about": () => {
            return typeWriter(`
                <div class="command-output">
                    <strong>About Ansh Choudhary</strong><br><br>
                    🚀 Passionately creative developer with a knack for innovation.<br>
                    🔬 AI researcher and data scientist who thrives on building impactful projects and exploring the cutting edge of technology.<br>
                    ⚽ Football analyst, hackathon enthusiast, and always eager to learn, grow, and make a difference.<br><br>
                    <em>"Innovation distinguishes between a leader and a follower." - Steve Jobs</em>
                </div>
            `);
        },
        
        "portfolio": () => {
            showLoading('Opening Portfolio...');
            setTimeout(() => {
                window.open("https://ansh-portfolio.web.app/", "_blank");
            }, 500);
            return '<div class="success-message">🌐 Opening Portfolio...</div>';
        }, 
        
        "clear": () => { 
            terminalBody.innerHTML = ''; 
            return ''; 
        },

        "cls": () => { 
            terminalBody.innerHTML = ''; 
            return ''; 
        },
        
        "echo": (args) => {
            if (args.length === 0) {
                return '<div class="error-message">❌ echo: missing argument</div>';
            }
            return `<div class="command-output">${args.join(" ")}</div>`;
        },
        
        "education": () => {
            return `
                <div class="command-output">
                    <strong>🎓 Education</strong><br><br>
                    <span style="color:${themeColors.textColor};">🏛️ BITS Pilani</span> | 2021 - 2025<br>
                    <span style="color:${themeColors.textColor};">🏫 The Emerald Heights International School</span> | 2005 - 2020
                </div>
            `;
        },
        
        "work": () => {
            return `
                <div class="command-output">
                    <strong>💼 Work Experience</strong><br><br>
                    <span style="color:${themeColors.textColor};">🔬 AI Researcher at NYU Abu Dhabi</span> | Jun 2024 - Jan 2025<br>
                    <span style="color:${themeColors.textColor};">💻 Full Stack Developer at Dnyanda Sustainable Engineering Solutions</span> | Jun 2023 ‐ Sept 2023<br>
                    <span style="color:${themeColors.textColor};">👁️ Computer Vision Intern at Dronamaps Inc.</span> | June 2022 ‐ Sept 2022<br>
                    <span style="color:${themeColors.textColor};">🔬 Research Intern at Shiv Nadar University</span> | Jun 2019 - July 2019
                </div>
            `;
        },
        
        "email": () => {
            showLoading('Opening email client...');
            setTimeout(() => {
                window.open("mailto:anshc19@gmail.com");
            }, 500);
            return '<div class="success-message">📧 You can reach me at: anshc19@gmail.com</div>';
        },
        
        "exit": () => {
            showLoading('Goodbye! 👋');
            setTimeout(() => {
                window.close();
            }, 1000);
            return '<div class="success-message">Goodbye! Thanks for visiting! 👋</div>';
        },
        
        "history": () => {
            if (commandHistory.length === 0) {
                return '<div class="command-output">No commands in history.</div>';
            }
            return `<div class="command-output"><strong>Command History:</strong><br><br>${commandHistory.map((cmd, index) => `${index + 1}. ${cmd}`).join("<br>")}</div>`;
        },
        
        "projects": () => {
            return `
                <div class="command-output">
                    <strong>🚀 Featured Projects</strong><br><br>
                    You can visit my <a href="https://ansh-portfolio.web.app/" target="_blank">portfolio website</a> or <a href="https://github.com/AnshChoudhary" target="_blank">GitHub</a> to see all my projects.<br><br>
                    <strong>Personal Favorites:</strong><br><br>
                    
                    <strong>1. 🛣️ Lane Detection Model for Autonomous Driving</strong><br>
                    <img src='/images/lanedetection.png' style='width:75%; height:auto; margin: 10px 0;'><br><br>
                    
                    <strong>2. ⚽ Football Tracking and xG Model</strong><br>
                    <img src='/images/football-tracking.png' style='width:75%; height:auto; margin: 10px 0;'><br><br>
                    
                    <strong>3. 🗺️ Landmark Indexing with VLMs</strong><br>
                    <img src='/images/landmarking.png' style='width:75%; height: auto; margin: 10px 0;'>
                </div>
            `;
        },
        
        "pwd": () => {
            return '<div class="command-output">📂 /home/ansh/portfolio</div>';
        },
        
        "skills": () => {
            return `
                <div class="command-output">
                    <strong>🛠️ Skills & Expertise</strong><br><br>
                    I am a fast learner and highly motivated individual.<br><br>
                    
                    <span style="color:${themeColors.textColor};">💻 Languages</span>: Python, C++, JavaScript, Svelte, React<br>
                    <span style="color:${themeColors.textColor};">🔧 Tools</span>: Docker, Kubernetes, Git, Framer, Webflow<br>
                    <span style="color:${themeColors.textColor};">🤖 ML/Data Science Libraries</span>: TensorFlow, PyTorch, Keras, Pandas, Scikit-learn, OpenCV, Matplotlib, HuggingFace<br>
                    <span style="color:${themeColors.textColor};">💪 Strengths</span>: DSA, Data Analysis, Frontend Development, Generative AI<br>
                    <span style="color:${themeColors.textColor};">🤝 Soft Skills</span>: Leadership, Teamwork, Communication, Time Management
                </div>
            `;
        },
        
        "socials": () => {
            return `
                <div class="command-output">
                    <strong>🌐 Connect with me</strong><br><br>
                    1. 💼 <strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/ansh-choudhary19" target="_blank">ansh-choudhary19</a><br>
                    2. 💻 <strong>GitHub</strong>: <a href="https://github.com/AnshChoudhary" target="_blank">AnshChoudhary</a><br>
                    3. 🐦 <strong>Twitter</strong>: <a href="https://x.com/ughhnsh" target="_blank">@ughhnsh</a><br>
                    4. 📸 <strong>Instagram</strong>: <a href="https://www.instagram.com/ughhnsh" target="_blank">@ughhnsh</a>
                </div>
            `;
        },
        
        "welcome": () => {
            return typeWriter(`
                <div class="command-output">
                    <strong>🎉 Welcome to Ansh's Terminal!</strong><br><br>
                    👋 Hey There! I am <strong>Ansh Choudhary</strong>, AI Engineer at Deriv.<br>
                    🎓 An aspiring computer science student with strong interest in coding and ML/AI.<br>
                    💼 Currently working as an AI Engineer at Deriv in Dubai and conducting research at NYU Abu Dhabi.<br><br>
                    <em>Type '<span style="color:var(--accent-green);">help</span>' to see all available commands!</em>
                </div>
            `);
        },
        
        "achievements": () => {
            return `
                <div class="command-output">
                    <strong>🏆 Achievements & Recognition</strong><br><br>
                    I actively participate in diverse extracurricular activities and competitions.<br><br>
                    
                    <span style="color:${themeColors.textColor};">🥇 MaskEX University Trading Competition (2022)</span> - Secured 1st place in the UAE University Trading Competition organized by MaskEX Global, winning 1500 USDT in prize money.<br><br>
                    
                    <span style="color:${themeColors.textColor};">🏆 IPSC National IT Fest (2019)</span> - Quiz Winner and Overall Champion out of 25 teams.<br><br>
                    
                    <span style="color:${themeColors.textColor};">🥈 TCS IT Wiz (2019)</span> - 1st Runner-up out of 1000 teams.<br><br>
                    
                    <span style="color:${themeColors.textColor};">🏆 Technothon (2019)</span> - Quiz Winner and Overall Champion.<br><br>
                    
                    <span style="color:${themeColors.textColor};">💡 Round Square International Conference</span> - Won the Best Inventiveness Award for developing the C-Aware App to assist staff and patients at the Indore Cancer Foundation in self-diagnosing cancer symptoms.<br><br>
                    
                    <span style="color:${themeColors.textColor};">🚀 Indian National Space Settlement Design Competition (2018)</span> - Collaborated with 54 students from 5 schools to design a space settlement on the moon; won the Runner-up trophy and advanced to the Asian Regional Space Settlement Design Competition.<br><br>
                    
                    <span style="color:${themeColors.textColor};">🎖️ Award for Excellence in International Extra-curricular Activities</span> - Honored by Mrs. Pratibha Patil, Former President of India.<br><br>
                    
                    <span style="color:${themeColors.textColor};">📖 Editor-in-Chief - EHIS Yearbook (2020)</span> - Led the editorial team for the school's first-ever yearbook, collecting 147 submissions, designing layouts, editing drafts, and writing about key events.
                </div>
            `;
        },
        
        "game": () => {
            showLoading('Loading typing game...');
            setTimeout(() => {
                window.open("https://ansh-typing-game.vercel.app/", "_blank");
            }, 500);
            return '<div class="success-message">🎮 Opening typing game...</div>';
        },
        
        "github": () => {
            showLoading('Opening GitHub profile...');
            setTimeout(() => {
                window.open("https://github.com/AnshChoudhary", "_blank");
            }, 500);
            return '<div class="success-message">💻 Opening Ansh\'s GitHub...</div>';
        },
        
        "nutriscan": () => {
            showLoading('Opening NutriScan...');
            setTimeout(() => {
                window.open("https://calorie-tracker-app-mocha.vercel.app/", "_blank");
            }, 500);
            return '<div class="success-message">🥗 Opening NutriScan...</div>';
        },
        
        "goat": () => {
            showLoading('Opening GOAT content...');
            setTimeout(() => {
                window.open("https://www.youtube.com/watch?v=IscGtF_A14A&t=2406s&ab_channel=MessiTheBoss", "_blank");
            }, 500);
            return '<div class="success-message">🐐 Lionel Andrés "Leo" Messi</div>';
        },
        
        "whoami": () => {
            return '<div class="command-output">👤 guest@ansh-terminal ~ You are currently exploring Ansh\'s interactive portfolio!</div>';
        },
        
        "hello": () => {
            return typeWriter(`
                <div class="command-output">
                    👋 <strong>Hello there!</strong><br><br>
                    I am <strong>Ansh Choudhary</strong>, AI Engineer at Deriv.<br>
                    Learn more about me with commands like '<span style="color:var(--accent-green);">education</span>' and '<span style="color:var(--accent-green);">projects</span>', or play a typing game that I created by typing '<span style="color:var(--accent-green);">game</span>'.<br><br>
                    <em>Welcome to my digital space! 🚀</em>
                </div>
            `);
        },

        "rps": (args) => {
            const choices = ["rock", "paper", "scissors"];
            const userChoice = args[0]?.toLowerCase();
            
            if (!userChoice || !choices.includes(userChoice)) {
                return '<div class="error-message">❌ Invalid choice. Please choose: rock, paper, or scissors.<br>Example: <code>rps rock</code></div>';
            }
            
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            let result, emoji;
            
            if (userChoice === computerChoice) {
                result = "It's a tie!";
                emoji = "🤝";
            } else if (
                (userChoice === "rock" && computerChoice === "scissors") ||
                (userChoice === "paper" && computerChoice === "rock") ||
                (userChoice === "scissors" && computerChoice === "paper")
            ) {
                result = "You win!";
                emoji = "🎉";
            } else {
                result = "You lose!";
                emoji = "😢";
            }
            
            return `
                <div class="command-output">
                    <strong>🎮 Rock Paper Scissors</strong><br><br>
                    You chose: <strong>${userChoice}</strong><br>
                    Computer chose: <strong>${computerChoice}</strong><br><br>
                    ${emoji} <strong>${result}</strong>
                </div>
            `;
        },

        "8ball": () => {
            const responses = [
                { text: "Yes, definitely!", emoji: "✅" },
                { text: "No, not at all.", emoji: "❌" },
                { text: "Ask again later.", emoji: "⏰" },
                { text: "It is certain.", emoji: "💯" },
                { text: "Very doubtful.", emoji: "🤔" },
                { text: "Cannot predict now.", emoji: "🔮" },
                { text: "My sources say no.", emoji: "📰" },
                { text: "Outlook good.", emoji: "👍" },
                { text: "Don't count on it.", emoji: "🚫" }
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            return `
                <div class="command-output">
                    <strong>🎱 Magic 8-Ball</strong><br><br>
                    ${randomResponse.emoji} <strong>${randomResponse.text}</strong>
                </div>
            `;
        },

        "blackjack": () => {
            return `
                <div class="command-output">
                    <strong>🃏 Blackjack Game</strong><br><br>
                    <em>This feature is currently under development!</em><br>
                    Stay tuned for an enhanced card game experience. 🚧
                </div>
            `;
        },
    };

    // Utility functions
    function applyTheme(themeName, colors) {
        terminal.style.background = colors.terminal;
        terminalHeader.style.background = colors.header;
        terminalHeader.style.color = colors.headerText;
        terminalBody.style.color = colors.bodyText;
        themeColors.textColor = colors.textColor;
        
        // Save theme preference
        localStorage.setItem('preferred-theme', themeName);
    }

    function showLoading(message) {
        const loadingEl = document.createElement('div');
        loadingEl.className = 'loading';
        loadingEl.innerHTML = message;
        terminalBody.appendChild(loadingEl);
        
        setTimeout(() => {
            loadingEl.remove();
        }, 2000);
    }

    function typeWriter(text, speed = 20) {
        // For now, return immediately - can implement actual typing effect later
        return text;
    }

    function getCommandSuggestions(input) {
        if (!input) return availableCommands.slice(0, 5);
        
        return availableCommands.filter(cmd => 
            cmd.toLowerCase().startsWith(input.toLowerCase())
        ).slice(0, 5);
    }

    function showSuggestions(suggestions, input) {
        removeSuggestions();
        
        if (suggestions.length === 0 || !input) return;
        
        suggestionContainer = document.createElement('div');
        suggestionContainer.style.cssText = `
            position: absolute;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--spacing-sm);
            margin-top: 2px;
            z-index: 1000;
            font-size: var(--font-size-sm);
            max-width: 300px;
        `;
        
        suggestions.forEach(suggestion => {
            const suggestionEl = document.createElement('div');
            suggestionEl.style.cssText = `
                padding: 2px 4px;
                color: var(--text-secondary);
                cursor: pointer;
                border-radius: 2px;
            `;
            suggestionEl.textContent = suggestion;
            
            suggestionEl.addEventListener('click', () => {
                currentUserInput.textContent = suggestion;
                removeSuggestions();
                currentUserInput.focus();
                placeCaretAtEnd(currentUserInput);
            });
            
            suggestionEl.addEventListener('mouseenter', () => {
                suggestionEl.style.background = 'var(--border-color)';
            });
            
            suggestionEl.addEventListener('mouseleave', () => {
                suggestionEl.style.background = 'transparent';
            });
            
            suggestionContainer.appendChild(suggestionEl);
        });
        
        currentUserInput.parentElement.appendChild(suggestionContainer);
    }

    function removeSuggestions() {
        if (suggestionContainer) {
            suggestionContainer.remove();
            suggestionContainer = null;
        }
    }

    function processCommand(input) {
        const [commandName, ...args] = input.toLowerCase().split(" ");
        let response;
    
        if (commands[`${commandName} ${args.join(" ")}`]) {
            response = typeof commands[`${commandName} ${args.join(" ")}`] === "function" 
                ? commands[`${commandName} ${args.join(" ")}`](args) 
                : commands[`${commandName} ${args.join(" ")}`];
        } else if (commands[commandName]) {
            response = typeof commands[commandName] === "function" 
                ? commands[commandName](args) 
                : commands[commandName];
        } else {
            response = `
                <div class="error-message">
                    ❌ Command not found: <strong>${commandName}</strong><br><br>
                    <em>Type '<span style="color:var(--accent-green);">help</span>' to see available commands.</em>
                </div>
            `;
        }
    
        return response;
    }
    
    function addNewPrompt() {
        const newPrompt = document.createElement("p");
        newPrompt.classList.add("prompt");
        newPrompt.innerHTML = `<span contenteditable="true" class="user-input" placeholder="Type a command..."></span>`;
        terminalBody.appendChild(newPrompt);

        currentUserInput = newPrompt.querySelector(".user-input");
        currentUserInput.focus();

        currentUserInput.addEventListener("input", function() {
            const input = this.textContent.trim();
            const suggestions = getCommandSuggestions(input);
            showSuggestions(suggestions, input);
        });

        currentUserInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                removeSuggestions();
                
                const input = this.textContent.trim();
                if (input) {
                    commandHistory.push(input);
                    historyIndex = commandHistory.length;
                    this.setAttribute("contenteditable", "false");
                    
                    const response = processCommand(input);
                    if (response) {
                        const responseElement = document.createElement("div");
                        responseElement.innerHTML = response;
                        terminalBody.appendChild(responseElement);
                    }
                    
                    addNewPrompt();
                    
                    // Scroll to bottom
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            } else if (e.key === "Tab") {
                e.preventDefault();
                const input = this.textContent.trim();
                const suggestions = getCommandSuggestions(input);
                
                if (suggestions.length === 1) {
                    this.textContent = suggestions[0];
                    placeCaretAtEnd(this);
                    removeSuggestions();
                } else if (suggestions.length > 1) {
                    showSuggestions(suggestions, input);
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                removeSuggestions();
                
                if (historyIndex > 0) {
                    historyIndex--;
                    this.textContent = commandHistory[historyIndex];
                    placeCaretAtEnd(this);
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                removeSuggestions();
                
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    this.textContent = commandHistory[historyIndex];
                    placeCaretAtEnd(this);
                } else {
                    historyIndex = commandHistory.length;
                    this.textContent = "";
                }
            } else if (e.key === "Escape") {
                removeSuggestions();
            }
        });

        currentUserInput.addEventListener("blur", function() {
            setTimeout(() => removeSuggestions(), 150);
        });
    }

    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            const textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    // Initialize terminal
    function init() {
        // Load saved theme
        const savedTheme = localStorage.getItem('preferred-theme');
        if (savedTheme && commands[`themes go to ${savedTheme}`]) {
            commands[`themes go to ${savedTheme}`]();
        }
        
        addNewPrompt();
        
        // Add welcome animation
        setTimeout(() => {
            terminal.style.opacity = '1';
            terminal.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }

    // Easter eggs and keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + L to clear (like in real terminals)
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            terminalBody.innerHTML = '';
            addNewPrompt();
        }
        
        // Konami code easter egg
        if (e.key === 'ArrowUp' && e.shiftKey) {
            // Could add special easter egg here
        }
    });

    init();
});
