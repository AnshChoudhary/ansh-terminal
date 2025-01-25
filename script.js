document.addEventListener("DOMContentLoaded", function() {
    const terminalBody = document.querySelector(".terminal-body");
    const terminalHeader = document.querySelector(".terminal-header");
    const terminal = document.querySelector(".terminal");
    const commandHistory = [];
    let historyIndex = -1;
    let themeColors = {
        textColor: '#00ff00', // Default text color (green)
        headerColor: 'white',
    };

    const commands = {
        "help": () => {
            return `
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
            `;
        },
        "themes": `Available themes: <br>ubuntu<br>git-bash<br>sunset<br>sweet<br><br>To change themes, type 'themes go to "theme-name"'.<br>Example: themes go to sunset`,
        "themes go to ubuntu": () => {
            terminal.style.backgroundColor = '#300a24';
            terminalHeader.style.backgroundColor = '#595959';
            terminalHeader.style.color = 'white';
            terminalBody.style.color = '#00ff00';
            themeColors.textColor = '#00ff00';
            return "Switched to Ubuntu theme!";
        },

        "themes go to git-bash": () => {
            terminal.style.background = 'linear-gradient(135deg, #1a1a1a, #2e2e2e)'; 
            terminalHeader.style.background = 'linear-gradient(135deg, #2e2e2e, #444444)';
            terminalHeader.style.color = '#00ff00'; 
            terminalBody.style.color = '#00ff00'; 
            themeColors.textColor = '#00ff00';
            return "Switched to Git-Bash theme!";
        },

        "themes go to sunset": () => {
            terminal.style.background = 'linear-gradient(in oklab, #ffff00, red)'; 
            terminalHeader.style.background = 'linear-gradient(135deg, #ff7f50, #ff4500)'; 
            terminalHeader.style.color = '#ffffff'; 
            terminalBody.style.color = '#fffb00'; 
            themeColors.textColor = '#fffb00';
            return "Switched to Sunset theme!";
        },

        "themes go to sweet": () => {
            terminal.style.background = 'linear-gradient(135deg, #ffb6c1, #ff69b4)'; 
            terminalHeader.style.background = 'linear-gradient(135deg, #ffd9df, #ff69b4)'; 
            terminalHeader.style.color = '#ff178b'; 
            terminalBody.style.color = '#ff178b'; 
            themeColors.textColor = '#ff0f9f';
            return "Switched to Sweet theme!";
        },

        "about": "Passionately creative developer with a knack for innovation.<br> AI researcher and data scientist who thrives on building impactful projects and exploring the cutting edge of technology. 🚀<br> Football analyst, hackathon enthusiast, and always eager to learn, grow, and make a difference.",
        
        "portfolio": () => {
            window.open("https://ansh-portfolio.web.app/", "_blank");
            return 'Opening Portfolio...';
        }, 
        
        "clear": () => { terminalBody.innerHTML = ''; return ''; },
        
        "echo": (args) => args.join(" "),
        
        "education": () => {
            return `<span style="color:${themeColors.textColor};">BITS Pilani</span> | 2021 - 2025 <br><span style="color:${themeColors.textColor};">The Emerald Heights International School</span> | 2005 - 2020`
        },
        
        "work": () => {
            return `<span style="color:${themeColors.textColor};">AI Researcher at NYU Abu Dhabi</span> | Jun 2024 - Jan 2025 <br><span style="color:${themeColors.textColor};">Full Stack Developer at Dnyanda Sustainable Engineering Solutions</span> | Jun 2023 ‐ Sept 2023 <br><span style="color:${themeColors.textColor};">Computer Vision Intern at Dronamaps Inc.</span> | June 2022 ‐ Sept 2022 <br><span style="color:${themeColors.textColor};">Research Intern at Shiv Nadar University</span> | Jun 2019 - July 2019`
        },
        
        "email": () => {
            window.open("mailto:anshc19@gmail.com");
            return 'You can reach me at: anshc19@gmail.com';
        },
        
        "exit": () => window.close(),
        
        "history": () => commandHistory.join("<br>"),
        
        "projects": "You can visit my portfolio website / github to see all my projects. <hr> These are my personal favorites: <br>1. Lane Detection Model for Autonomous Driving <br> <img src='/images/lanedetection.png' style='width:75%; height:auto;'><br>2. Football Tracking and xG Model <br><img src='/images/football-tracking.png' style='width:75%; height:auto;'><br>3. Lankmark Indexing with VLMs <br><img src='/images/landmarking.png' style='width:75%; height: auto;'>",
        
        "pwd": "You are currently in the root directory.",
        
        "skills": () => {
            return `I am a fast learner and highly motivated individual. <hr> <span style="color:${themeColors.textColor};">Languages</span>: Python, C++, JavaScript, Svelte, React <br><span style="color:${themeColors.textColor};">Tools</span>: Docker, Kubernetes, Git, Framer, Webflow <br><span style="color:${themeColors.textColor};">ML/Data Science Libraries</span>: Tensorflow, Pytorch, Keras, Pandas, Scikit‐learn, OpenCV, Matplotlib, HuggingFace <br><span style="color:${themeColors.textColor};">Strengths</span>: DSA, Data Analysis, Frontend Development, Generative AI <br><span style="color:${themeColors.textColor};">Soft Skills</span>: Leadership, Team work, Communication, Time Management`},
        
        "socials": () => {
            return `Connect with me on <br>
            1. LinkedIn: <a href="https://www.linkedin.com/in/ansh-choudhary19" target="_blank" style="color:${themeColors.textColor}; text-decoration: none;">https://www.linkedin.com/in/ansh-choudhary19</a>,<br>
            2. GitHub: <a href="https://github.com/AnshChoudhary" target="_blank" style="color:${themeColors.textColor}; text-decoration: none;">https://github.com/AnshChoudhary</a>,<br>
            3. Twitter: <a href="https://x.com/ughhnsh" target="_blank" style="color:${themeColors.textColor}; text-decoration: none;">https://x.com/ughhnsh</a>,<br>
            4. Instagram: <a href="https://www.instagram.com/ughhnsh" target="_blank" style="color:${themeColors.textColor}; text-decoration: none;">https://www.instagram.com/ughhnsh</a>`;
        },
        
        "welcome": "Hey There! I am Ansh Choudhary, Senior at BITS Pilani. <br> An aspiring computer science student with strong interest in coding and ML/AI. <br> Currently working as a Data Analyst at Sharaf DG in Dubai and conducting research at NYU Abu Dhabi.",
        
        "achievements": () => {
            return `I actively participate in diverse extracurricular activities and competitions. <hr> 
            <span style="color:${themeColors.textColor};">MaskEX University Trading Competition (2022)</span> - Secured 1st place in the UAE University Trading Competition organized by MaskEX Global, winning 1500 USDT in prize money. <br>
            <span style="color:${themeColors.textColor};">IPSC National IT Fest (2019)</span> - Quiz Winner and Overall Champion out of 25 teams. <br>
            <span style="color:${themeColors.textColor};">TCS IT Wiz (2019)</span> - 1st Runner-up out of 1000 teams. <br>
            <span style="color:${themeColors.textColor};">Technothon (2019)</span> - Quiz Winner and Overall Champion. <br>
            <span style="color:${themeColors.textColor};">Round Square International Conference</span> - Won the Best Inventiveness Award for developing the C-Aware App to assist staff and patients at the Indore Cancer Foundation in self-diagnosing cancer symptoms. <br>
            <span style="color:${themeColors.textColor};">Indian National Space Settlement Design Competition (2018)</span> - Collaborated with 54 students from 5 schools to design a space settlement on the moon; won the Runner-up trophy and advanced to the Asian Regional Space Settlement Design Competition. <br>
            <span style="color:${themeColors.textColor};">Award for Excellence in International Extra-curricular Activities</span> - Honored by Mrs. Pratibha Patil, Former President of India. <br>
            <span style="color:${themeColors.textColor};">Editor-in-Chief - EHIS Yearbook (2020)</span> - Led the editorial team for the school's first-ever yearbook, collecting 147 submissions, designing layouts, editing drafts, and writing about key events.`},
        
        "game": () => {
            window.open("https://ansh-typing-game.vercel.app/", "_blank");
            return 'Opening typing game...';
        },
        
        "github": () => {
            window.open("https://github.com/AnshChoudhary", "_blank");
            return 'Opening Ansh\'s Github...';
        },
        
        "nutriscan": () => {
            window.open("https://calorie-tracker-app-mocha.vercel.app/", "_blank");
            return 'Opening NutriScan...';
        },
        
        "goat": () => {
            window.open("https://www.youtube.com/watch?v=IscGtF_A14A&t=2406s&ab_channel=MessiTheBoss", "_blank");
            return 'Lionel Andrés "Leo" Messi';
        },
        
        "whoami": "guest@user. But you should know who you are!",
        
        "hello": "Hey There! I am Ansh Choudhary, Senior at BITS Pilani. <br> Learn more about me with commands like 'education' and 'projects', or play a typing game that I created by typing in 'game'.",

        "rps": (args) => {
            const choices = ["rock", "paper", "scissors"];
            const userChoice = args[0];
            if (!choices.includes(userChoice)) {
                return "Invalid choice. Please choose rock, paper, or scissors.";
            }
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            let result;
            if (userChoice === computerChoice) {
                result = "It's a tie!";
            } else if (
                (userChoice === "rock" && computerChoice === "scissors") ||
                (userChoice === "paper" && computerChoice === "rock") ||
                (userChoice === "scissors" && computerChoice === "paper")
            ) {
                result = "You win!";
            } else {
                result = "You lose!";
            }
            return `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
        },

        "8ball": () => {
            const responses = [
                "Yes, definitely!",
                "No, not at all.",
                "Ask again later.",
                "It is certain.",
                "Very doubtful.",
                "Cannot predict now.",
                "My sources say no."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return `8ball says: ${randomResponse}`;
        },

        "blackjack": () => {
            const deck = [];
            const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
            const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

            // Initialize deck
            for (let suit of suits) {
                for (let value of values) {
                    deck.push({ value, suit });
                }
            }

            // Shuffle deck
            deck.sort(() => Math.random() - 0.5);

            // Draw a card
            const drawCard = () => deck.pop();

            // Calculate hand value
            const calculateHandValue = (hand) => {
                let value = 0;
                let aces = 0;
                for (let card of hand) {
                    if (['J', 'Q', 'K'].includes(card.value)) {
                        value += 10;
                    } else if (card.value === 'A') {
                        aces += 1;
                        value += 11;
                    } else {
                        value += parseInt(card.value);
                    }
                }
                while (value > 21 && aces) {
                    value -= 10;
                    aces -= 1;
                }
                return value;
            };

            // Initial hands
            const playerHand = [drawCard(), drawCard()];
            const dealerHand = [drawCard(), drawCard()];

            let playerValue = calculateHandValue(playerHand);
            let dealerValue = calculateHandValue(dealerHand);

            // Player's turn
            let playerTurn = true;
            while (playerTurn) {
                const playerAction = prompt(`Your hand: ${playerHand.map(card => `${card.value} of ${card.suit}`).join(', ')} (Value: ${playerValue})\nDo you want to "hit" or "stand"?`);
                if (playerAction.toLowerCase() === 'hit') {
                    playerHand.push(drawCard());
                    playerValue = calculateHandValue(playerHand);
                    if (playerValue > 21) {
                        return `You busted with a hand value of ${playerValue}. Dealer wins!`;
                    }
                } else if (playerAction.toLowerCase() === 'stand') {
                    playerTurn = false;
                } else {
                    return 'Invalid action. Please type "hit" or "stand".';
                }
            }

            // Dealer's turn
            while (dealerValue < 17) {
                dealerHand.push(drawCard());
                dealerValue = calculateHandValue(dealerHand);
            }

            // Determine winner

        },
    };

    function processCommand(input) {
        const [commandName, ...args] = input.toLowerCase().split(" ");
        let response;
    
        if (commands[`${commandName} ${args.join(" ")}`]) {
            response = typeof commands[`${commandName} ${args.join(" ")}`] === "function" ? commands[`${commandName} ${args.join(" ")}`](args) : commands[`${commandName} ${args.join(" ")}`];
        } else if (commands[commandName]) {
            response = typeof commands[commandName] === "function" ? commands[commandName](args) : commands[commandName];
        } else {
            response = `Command not found: ${commandName}`;
        }
    
        return response;
    }
    

    function addNewPrompt() {
        const newPrompt = document.createElement("p");
        newPrompt.classList.add("prompt");
        newPrompt.innerHTML = `ansh@desktop:~$ <span contenteditable="true" class="user-input"></span>`;
        terminalBody.appendChild(newPrompt);

        const newUserInput = newPrompt.querySelector(".user-input");
        newUserInput.focus();

        newUserInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                const input = newUserInput.textContent.trim();
                if (input) {
                    commandHistory.push(input);
                    historyIndex = commandHistory.length;
                    newUserInput.setAttribute("contenteditable", "false");
                    const response = processCommand(input);
                    if (response) {
                        const responseElement = document.createElement("p");
                        responseElement.style.color = 'white'; 
                        responseElement.innerHTML = response;
                        terminalBody.appendChild(responseElement);
                    }
                    addNewPrompt();
                }
            } else if (e.key === "ArrowUp") {
                if (historyIndex > 0) {
                    historyIndex--;
                    newUserInput.textContent = commandHistory[historyIndex];
                    placeCaretAtEnd(newUserInput);
                }
            } else if (e.key === "ArrowDown") {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    newUserInput.textContent = commandHistory[historyIndex];
                    placeCaretAtEnd(newUserInput);
                } else {
                    historyIndex = commandHistory.length;
                    newUserInput.textContent = "";
                }
            }
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

    addNewPrompt();
});
