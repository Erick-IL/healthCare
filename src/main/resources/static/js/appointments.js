document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS (MOCK) ---
    const doctorsData = {
        cardiologia: [ { id: 1, name: "Dr. Carlos Silva", specialty: "Cardiologia", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face", bio: "Especialista em cardiologia preventiva com mais de 15 anos de experiência.", rating: 4.9, reviews: 82 }],
        dermatologia: [ { id: 3, name: "Dr. Pedro Santos", specialty: "Dermatologia", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face", bio: "Dermatologista clínico e estético, especializado em tratamentos inovadores.", rating: 4.9, reviews: 94 }],
        ortopedia: [ { id: 4, name: "Dr. João Oliveira", specialty: "Ortopedia", image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face", bio: "Ortopedista especializado em cirurgia do joelho e quadril.", rating: 4.7, reviews: 56 }],
        pediatria: [ { id: 5, name: "Dra. Maria Fernandes", specialty: "Pediatria", image: "https://images.unsplash.com/photo-1594824475317-29bb4b8b2b8d?w=150&h=150&fit=crop&crop=face", bio: "Pediatra com 20 anos de experiência no cuidado integral da criança.", rating: 5.0, reviews: 128 }],
        psicologia: [ { id: 6, name: "Dra. Laura Mendes", specialty: "Psicologia", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face", bio: "Psicóloga clínica especializada em terapia cognitivo-comportamental.", rating: 4.9, reviews: 73 }],
        ginecologia: [ { id: 7, name: "Dra. Beatriz Lima", specialty: "Ginecologia", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop&crop=face", bio: "Ginecologista e obstetra com foco em saúde da mulher.", rating: 4.8, reviews: 91 }]
    };
    const timeSlotsData = [ "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00", "15:30" ];
    const specialtyIcons = { cardiologia: "fa-heart-pulse text-red-500", dermatologia: "fa-hand-dots text-pink-500", ortopedia: "fa-bone text-amber-600", pediatria: "fa-baby text-green-500", psicologia: "fa-brain text-purple-500", ginecologia: "fa-venus text-rose-500" };

    // --- ESTADO DA APLICAÇÃO ---
    let state = {
        selectedSpecialty: null,
        selectedDoctor: null,
        selectedDate: null,
        selectedTime: null,
        calendarDate: new Date()
    };

    // --- ELEMENTOS DO DOM ---
    const steps = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3'), document.getElementById('step4')];

    // --- FUNÇÕES PRINCIPAIS ---

    function showStep(stepNumber) {
        steps.forEach((el, index) => {
            el.classList.toggle('hidden', index + 1 !== stepNumber);
        });
        window.scrollTo(0, 0);
    }

    function resetState() {
        state = {
            selectedSpecialty: null,
            selectedDoctor: null,
            selectedDate: null,
            selectedTime: null,
            calendarDate: new Date()
        };
    }

    // --- LÓGICA DE CADA PASSO ---

    // PASSO 1: ESPECIALIDADE
    function renderStep1() {
        const grid = document.getElementById('specialty-grid');
        grid.innerHTML = ''; // Limpa antes de renderizar
        for (const specialty in doctorsData) {
            const specialtyName = specialty.charAt(0).toUpperCase() + specialty.slice(1);
            const iconClass = specialtyIcons[specialty] || 'fa-star';
            const btn = document.createElement('button');
            btn.className = "bg-slate-50 border-2 border-slate-100 rounded-xl p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300";
            btn.innerHTML = `<i class="fa-solid ${iconClass} text-4xl mb-4"></i><p class="font-semibold text-gray-800">${specialtyName}</p>`;
            btn.addEventListener('click', () => {
                state.selectedSpecialty = specialty;
                renderStep2();
                showStep(2);
            });
            grid.appendChild(btn);
        }
    }

    // PASSO 2: MÉDICO
    function renderStep2() {
        const list = document.getElementById('doctorsList');
        list.innerHTML = '';
        const doctors = doctorsData[state.selectedSpecialty];
        doctors.forEach(doctor => {
            const card = document.createElement('button');
            card.className = 'w-full bg-white border-2 border-gray-200 rounded-xl p-4 flex items-center space-x-4 text-left hover:border-blue-500 hover:bg-blue-50 transition-all duration-300';
            card.innerHTML = `
                <img src="${doctor.image}" alt="${doctor.name}" class="w-16 h-16 rounded-full object-cover">
                <div>
                    <h3 class="font-bold text-gray-800">${doctor.name}</h3>
                    <p class="text-blue-600 font-medium">${doctor.specialty}</p>
                    <div class="flex items-center space-x-1 mt-1 text-sm text-gray-600">
                         <i class="fas fa-star text-yellow-400"></i>
                         <span>${doctor.rating} (${doctor.reviews} avaliações)</span>
                    </div>
                </div>`;
            card.addEventListener('click', () => {
                state.selectedDoctor = doctor;
                renderStep3();
                showStep(3);
            });
            list.appendChild(card);
        });
    }

    // PASSO 3: DATA E HORA
    function renderStep3() {
        renderDoctorCard();
        renderCalendar();
        renderTimeSlots();
    }

    function renderDoctorCard() {
        const card = document.getElementById('doctorCard');
        card.innerHTML = `
            <div class="text-center sticky top-8">
                <img src="${state.selectedDoctor.image}" alt="Foto do médico" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100">
                <h3 class="text-xl font-bold text-gray-800 mb-1">${state.selectedDoctor.name}</h3>
                <p class="text-blue-600 font-medium mb-3">${state.selectedDoctor.specialty}</p>
                <p class="text-gray-600 text-sm leading-relaxed">${state.selectedDoctor.bio}</p>
            </div>`;
    }

    function renderCalendar() {
        const container = document.getElementById('calendarContainer');
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        container.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <button id="prevMonth" class="p-2 hover:bg-gray-100 rounded-full transition-colors"><i class="fas fa-chevron-left text-gray-600"></i></button>
                <span class="font-semibold text-gray-800 text-lg">${monthNames[state.calendarDate.getMonth()]} ${state.calendarDate.getFullYear()}</span>
                <button id="nextMonth" class="p-2 hover:bg-gray-100 rounded-full transition-colors"><i class="fas fa-chevron-right text-gray-600"></i></button>
            </div>
            <div class="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-medium text-gray-500">
                ${['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => `<div>${d}</div>`).join('')}
            </div>
            <div id="calendarDays" class="grid grid-cols-7 gap-1"></div>`;

        const calendarDaysEl = container.querySelector('#calendarDays');
        const firstDay = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth(), 1);
        const lastDay = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + 1, 0);

        for (let i = 0; i < firstDay.getDay(); i++) { calendarDaysEl.appendChild(document.createElement('div')); }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth(), day);
            const dayButton = document.createElement('button');
            dayButton.textContent = day;
            dayButton.className = 'p-2 text-center rounded-lg transition-colors duration-200 aspect-square';

            if (dayDate < today) {
                dayButton.className += ' text-gray-300 cursor-not-allowed';
                dayButton.disabled = true;
            } else {
                dayButton.className += ' text-gray-700 hover:bg-gray-100';
                dayButton.addEventListener('click', () => {
                    state.selectedDate = dayDate;
                    state.selectedTime = null;
                    renderCalendar();
                    renderTimeSlots();
                });
            }

            if (state.selectedDate && dayDate.getTime() === state.selectedDate.getTime()) {
                dayButton.className += ' bg-blue-600 text-white font-bold';
            }
            calendarDaysEl.appendChild(dayButton);
        }

        container.querySelector('#prevMonth').addEventListener('click', () => { state.calendarDate.setMonth(state.calendarDate.getMonth() - 1); renderCalendar(); });
        container.querySelector('#nextMonth').addEventListener('click', () => { state.calendarDate.setMonth(state.calendarDate.getMonth() + 1); renderCalendar(); });
    }

    function renderTimeSlots() {
        const container = document.getElementById('timeSlotsContainer');
        if (!state.selectedDate) {
            container.innerHTML = `<p class="text-center text-gray-500 mt-4 p-4 bg-slate-50 rounded-lg">Selecione um dia no calendário para ver os horários.</p>`;
            return;
        }

        const dateStr = state.selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        container.innerHTML = `
            <h3 class="text-lg font-bold text-gray-800 my-4">Horários para ${dateStr}</h3>
            <div id="timeSlotsGrid" class="grid grid-cols-3 sm:grid-cols-4 gap-3"></div>`;

        const grid = container.querySelector('#timeSlotsGrid');
        timeSlotsData.forEach(time => {
            const timeBtn = document.createElement('button');
            timeBtn.className = 'time-slot border-2 border-gray-300 text-gray-700 py-3 px-2 rounded-lg hover:border-blue-500 transition-colors duration-200';
            if (time === state.selectedTime) {
                timeBtn.className = 'time-slot bg-blue-600 text-white font-bold border-2 border-blue-600 py-3 px-2 rounded-lg transition-colors duration-200';
            }
            timeBtn.textContent = time;
            timeBtn.addEventListener('click', () => {
                state.selectedTime = time;
                renderTimeSlots();
                renderStep4();
                showStep(4);
            });
            grid.appendChild(timeBtn);
        });
    }

    // PASSO 4: CONFIRMAÇÃO
    function renderStep4() {
        const detailsEl = document.getElementById('confirmationDetails');
        const dateStr = state.selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        detailsEl.innerHTML = `
            <div class="flex items-center space-x-4 mb-4">
                <img src="${state.selectedDoctor.image}" alt="${state.selectedDoctor.name}" class="w-16 h-16 rounded-full object-cover">
                <div class="text-left">
                    <h3 class="font-bold text-gray-800 text-lg">${state.selectedDoctor.name}</h3>
                    <p class="text-blue-600 font-medium">${state.selectedDoctor.specialty}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-left bg-white p-4 rounded-lg">
                <div>
                    <p class="text-gray-600 text-sm">Data:</p>
                    <p class="font-semibold text-gray-800">${dateStr}</p>
                </div>
                <div>
                    <p class="text-gray-600 text-sm">Horário:</p>
                    <p class="font-semibold text-gray-800">${state.selectedTime}</p>
                </div>
            </div>`;
    }

    // --- EVENT LISTENERS (BOTÕES DE VOLTAR E CONFIRMAR) ---
    document.getElementById('backToStep1').addEventListener('click', () => showStep(1));
    document.getElementById('backToStep2').addEventListener('click', () => showStep(2));
    document.getElementById('backToStep3').addEventListener('click', () => showStep(3));
    document.getElementById('confirmBtn').addEventListener('click', () => {
        alert(`Agendamento confirmado para ${state.selectedDoctor.name} em ${state.selectedDate.toLocaleDateString('pt-BR')} às ${state.selectedTime}.`);
        resetState();
        renderStep1();
        showStep(1);
    });

    // --- INICIALIZAÇÃO ---
    renderStep1();
    showStep(1);

});