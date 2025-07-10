
let symptoms = ""
let step = 1
// Quiz functions

function appendSymptoms(symptom) {
    symptoms += symptom + ","
    document.getElementById("step-" + step).classList.add("hidden")
    step++
    document.getElementById("step-" + step).classList.remove("hidden")
    console.log(symptoms)
}

async function sendSymptoms() {
    document.getElementById('step-4').classList.add('hidden')
    document.getElementById('result').classList.remove('hidden')
    let textarea;
    if (!document.getElementById("Symptoms").value || document.getElementById("Symptoms").value.trim() === "") {
        textarea = document.getElementById("userSymptoms");
    } else {
        textarea = document.getElementById("Symptoms");
    }
    const chatArea = document.getElementById("chatArea");
    const symptoms = textarea.value.trim();
    if (!symptoms) return;

    // Mostrar mensagem do usuário
    const userMsg = document.createElement("div");
    userMsg.className = "text-right";
    userMsg.innerHTML = `<div class="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs break-words">${symptoms}</div>`;
    chatArea.appendChild(userMsg);

    // Loader da IA
    const loaderWrapper = document.createElement("div");
    loaderWrapper.className = "text-left";
    loaderWrapper.innerHTML = `
    <div class="inline-block bg-white border px-4 py-2 rounded-lg">
      <div class="loader"><span></span><span></span><span></span></div>
    </div>`;
    chatArea.appendChild(loaderWrapper);
    chatArea.scrollTop = chatArea.scrollHeight;

    // Envia pro backend
    try {
        textarea.value = "";
        const res = await fetch('/ai/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: symptoms.replace(/\n/g, ' ').trim()
        });

        const resposta = await res.text();

        // Remove loader
        chatArea.removeChild(loaderWrapper);

        // Mensagem da IA
        const aiMsg = document.createElement("div");
        aiMsg.className = "text-left";
        aiMsg.innerHTML = `
          <div class="inline-block bg-gray-200 text-black px-4 py-2 rounded-lg max-w-xs break-words whitespace-pre-line">
            ${marked.parse(resposta)}
          </div>`;
        chatArea.appendChild(aiMsg);


    } catch (err) {
        chatArea.removeChild(loaderWrapper);
        const errorMsg = document.createElement("div");
        errorMsg.className = "text-left";
        errorMsg.innerHTML = `<div class="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-lg max-w-xs break-words">Erro ao se comunicar com a IA.</div>`;
        chatArea.appendChild(errorMsg);
    }

    textarea.value = "";
}



function resetQuizInterface() {
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-interface').classList.remove('hidden');
}