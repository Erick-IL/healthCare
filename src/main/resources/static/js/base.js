document.addEventListener('DOMContentLoaded', () => {

    // --- Configuração Inicial ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const pageTitle = document.getElementById('page-title');

    // --- 1. Lógica do Sidebar (Menu Lateral) ---
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    // --- 2. Lógica do Tema (Dark/Light Mode) ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // Aplica o tema salvo ao carregar a página
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);


    // --- 3. Lógica de Navegação entre Páginas ---
    const pageContents = document.querySelectorAll('.page-content');
    const navItems = document.querySelectorAll('.nav-item');

    window.showPage = (pageId) => {
        // Esconde todas as páginas
        pageContents.forEach(page => page.classList.add('hidden'));

        // Remove a classe ativa de todos os itens do menu
        navItems.forEach(item => {
            item.classList.remove('bg-light-purple', 'dark:bg-gray-700', 'text-primary-purple');
        });

        // Mostra a página selecionada
        const activePage = document.getElementById(`page-${pageId}`);
        if (activePage) {
            activePage.classList.remove('hidden');
        }

        // Adiciona a classe ativa ao item do menu correspondente
        const activeNavItem = document.querySelector(`.nav-item[onclick="showPage('${pageId}')"]`);
        if(activeNavItem) {
            activeNavItem.classList.add('bg-light-purple', 'dark:bg-gray-700', 'text-primary-purple');
            pageTitle.textContent = activeNavItem.textContent.trim();
        }
    };

    // Define a página inicial
    showPage('inicio');


    // --- 4. Lógica de Agendamento de Consulta ---
    const specialtyBtns = document.querySelectorAll('.specialty-btn');
    const dateBtns = document.querySelectorAll('.date-btn');
    const timeBtns = document.querySelectorAll('.time-btn');
    const confirmAppointmentBtn = document.getElementById('confirm-appointment');

    let agendamento = { especialidade: null, data: null, horario: null };

    const handleSelection = (buttons, selectedBtn, category) => {
        buttons.forEach(btn => {
            btn.classList.remove('border-primary-purple', 'bg-light-purple', 'dark:bg-gray-700', 'border-primary-blue', 'bg-light-blue');
        });

        let selectedClass = category === 'especialidade' ? ['border-primary-purple', 'bg-light-purple', 'dark:bg-gray-700'] : ['border-primary-blue', 'bg-light-blue', 'dark:bg-gray-700'];
        selectedBtn.classList.add(...selectedClass);

        agendamento[category] = selectedBtn.innerText;
    };

    specialtyBtns.forEach(btn => {
        btn.addEventListener('click', () => handleSelection(specialtyBtns, btn, 'especialidade'));
    });

    dateBtns.forEach(btn => {
        btn.addEventListener('click', () => handleSelection(dateBtns, btn, 'data'));
    });

    timeBtns.forEach(btn => {
        btn.addEventListener('click', () => handleSelection(timeBtns, btn, 'horario'));
    });

    confirmAppointmentBtn.addEventListener('click', () => {
        if(agendamento.especialidade && agendamento.data && agendamento.horario){
            alert(`Consulta agendada!\n\nEspecialidade: ${agendamento.especialidade.split('\n')[0]}\nData: ${agendamento.data} de Dezembro\nHorário: ${agendamento.horario}`);
        } else {
            alert('Por favor, selecione a especialidade, a data e o horário.');
        }
    });


    // --- 5. Lógica do Quiz de Sintomas ---
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const totalQuestions = quizQuestions.length;
    const progressBar = document.getElementById('quiz-progress-bar');
    const progressText = document.getElementById('quiz-progress-text');
    const quizResult = document.getElementById('quiz-result');
    const resultEmoji = document.getElementById('result-emoji');
    const resultText = document.getElementById('result-text');
    let currentQuestion = 1;
    let quizAnswers = {};

    window.answerQuiz = (questionNumber, answer) => {
        quizAnswers[questionNumber] = answer;

        const currentQuestionEl = document.getElementById(`quiz-question-${questionNumber}`);
        currentQuestionEl.classList.add('hidden');

        currentQuestion++;

        if (currentQuestion <= totalQuestions) {
            const nextQuestionEl = document.getElementById(`quiz-question-${currentQuestion}`);
            nextQuestionEl.classList.remove('hidden');
            updateQuizProgress();
        } else {
            updateQuizProgress();
            showQuizResult();
        }
    };

    const updateQuizProgress = () => {
        const progress = ((currentQuestion - 1) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${currentQuestion - 1}/${totalQuestions}`;
    };

    const showQuizResult = () => {
        let recomendacao = "Clínico Geral";
        let emoji = "🩺";

        if (quizAnswers[2] === 'sim' || quizAnswers[5] === 'sim') {
            recomendacao = "Cardiologista";
            emoji = "❤️";
        } else if (quizAnswers[3] === 'sim') {
            recomendacao = "Dermatologista";
            emoji = "🔬";
        } else if (quizAnswers[1] === 'sim' || quizAnswers[4] === 'sim') {
            recomendacao = "Clínico Geral";
            emoji = "🩺";
        }

        resultText.textContent = `Com base em suas respostas, recomendamos uma consulta com um(a) ${recomendacao}. Lembre-se, este é apenas um guia inicial.`;
        resultEmoji.textContent = emoji;
        quizResult.classList.remove('hidden');
    };

    window.restartQuiz = () => {
        quizAnswers = {};
        currentQuestion = 1;

        quizQuestions.forEach(q => q.classList.add('hidden'));
        document.getElementById('quiz-question-1').classList.remove('hidden');
        quizResult.classList.add('hidden');

        updateQuizProgress();
    };

    // --- 6. Lógica do Perfil ---
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const profileForm = document.getElementById('profile-form');
    const profileInputs = document.querySelectorAll('.profile-input');
    const profileActions = document.getElementById('profile-actions');

    const toggleEditMode = (isEditing) => {
        profileInputs.forEach(input => {
            input.readOnly = !isEditing;
            input.classList.toggle('bg-gray-50', !isEditing);
            input.classList.toggle('dark:bg-gray-700', !isEditing);
            input.classList.toggle('bg-white', isEditing);
            input.classList.toggle('dark:bg-dark-card', isEditing);
        });
        profileActions.classList.toggle('hidden', !isEditing);
        editProfileBtn.classList.toggle('hidden', isEditing);
    };

    editProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleEditMode(true);
    });

    cancelEditBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Opcional: recarregar os dados originais se necessário
        profileForm.reset();
        toggleEditMode(false);
    });

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Lógica para salvar os dados (ex: enviar para um servidor)
        alert('Perfil atualizado com sucesso!');
        toggleEditMode(false);
    });
});