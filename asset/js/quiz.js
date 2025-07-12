// Definimos nuestro conjunto de preguntas y respuestas
const quizData = [
  {
    question: "¿Qué significa IoT?",
    options: [
      "Internet of Technology",
      "Integration of Things",
      "Internet of Things",
      "Interface of Tools"
    ],
    correctIndex: 2
  },
  {
    question: "¿Cuál no es una fase del ciclo de IoT?",
    options: [
      "Data Collection",
      "Data Transmission",
      "Data Disappearance",
      "Action"
    ],
    correctIndex: 2
  },
  {
    question: "¿Qué tecnología NO se menciona como conectividad IoT?",
    options: [
      "Wi-Fi",
      "Bluetooth",
      "5G",
      "HDMI"
    ],
    correctIndex: 3
  },
  {
    question: "¿Qué sensor NO aparece en la descripción?",
    options: [
      "Temperatura",
      "Humedad",
      "Movimiento",
      "pH"
    ],
    correctIndex: 3
  },
  {
    question: "¿Cuál es una aplicación del IoT en agricultura?",
    options: [
      "Sensores de suelo",
      "Dispositivos ponibles de salud",
      "Gestión de tráfico",
      "Iluminación inteligente"
    ],
    correctIndex: 0
  },
  {
    question: "¿Cuál NO es un beneficio clave del IoT?",
    options: [
      "Eficiencia operativa",
      "Mayor comodidad",
      "Tareas manuales incrementadas",
      "Mejora en la toma de decisiones"
    ],
    correctIndex: 2
  },
  {
    question: "¿Cuál es un desafío mencionado para IoT?",
    options: [
      "Seguridad de datos",
      "Reducción del volumen de datos",
      "Interoperabilidad",
      "Privacidad"
    ],
    correctIndex: 1
  },
  {
    question: "¿Con qué tecnologías se menciona la futura convergencia de IoT?",
    options: [
      "Realidad virtual y blockchain",
      "IA y 5G",
      "Computación cuántica y NFT",
      "Impresión 3D y drones"
    ],
    correctIndex: 1
  },
  {
    question: "¿Qué describe mejor 'edge computing'?",
    options: [
      "Procesamiento de datos en la nube",
      "Procesamiento de datos cerca de la fuente",
      "Sensores remotos sin análisis",
      "Almacenamiento offline"
    ],
    correctIndex: 1
  },
  {
    question: "¿Cuál plataforma NO aparece en los recursos?",
    options: [
      "IBM Cloud",
      "AWS IoT",
      "Azure IoT",
      "Google Cloud IoT"
    ],
    correctIndex: 3
  },
  {
    question: "En ciudades inteligentes, ¿qué se gestiona?",
    options: [
      "Control de iluminación doméstica",
      "Monitoreo de cultivos",
      "Gestión de tráfico",
      "Monitoreo de pacientes"
    ],
    correctIndex: 2
  },
  {
    question: "En eHealth, ¿qué se utiliza?",
    options: [
      "Monitoreo de pacientes",
      "Riego automatizado",
      "Iluminación de calles",
      "Gestión de activos industriales"
    ],
    correctIndex: 0
  },
  {
    question: "¿Qué modelo de negocio surge como beneficio?",
    options: [
      "Nuevos servicios",
      "Disminución de costos de sensores",
      "Eliminación del análisis",
      "Supervisión manual"
    ],
    correctIndex: 0
  },
  {
    question: "¿Qué sistema puede reaccionar automáticamente?",
    options: [
      "Ajuste de temperatura",
      "Alertas manuales solo",
      "Envió de correo postal",
      "Monitoreo sin acción"
    ],
    correctIndex: 0
  },
  {
    question: "¿Cuál es un uso de IoT en la industria 4.0?",
    options: [
      "Juegos online",
      "Mantenimiento predictivo",
      "Mensajería instantánea",
      "Diseño gráfico"
    ],
    correctIndex: 1
  }
];

// Referencias a elementos del DOM
const quizContainer = document.getElementById('quiz-container');
const nextBtn     = document.getElementById('next-btn');

let currentQuestion = 0;   // Índice de la pregunta actual
let score           = 0;   // Contador de aciertos
const userAnswers   = [];  // Para almacenar el índice de la opción elegida por cada pregunta

/**
 * Muestra la pregunta actual y sus opciones.
 */
function showQuestion() {
  quizContainer.innerHTML = '';
  const qData = quizData[currentQuestion];

  // Pregunta
  const questionEl = document.createElement('div');
  questionEl.className = 'question';
  questionEl.textContent = `${currentQuestion + 1}. ${qData.question}`;
  quizContainer.appendChild(questionEl);

  // Opciones
  const optionsList = document.createElement('ul');
  optionsList.className = 'options';

  qData.options.forEach((opt, i) => {
    const li    = document.createElement('li');
    const label = document.createElement('label');
    const radio = document.createElement('input');

    radio.type  = 'radio';
    radio.name  = 'answer';
    radio.value = i;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(opt));
    li.appendChild(label);
    optionsList.appendChild(li);
  });

  quizContainer.appendChild(optionsList);

  // Desactivar siguiente hasta selección
  nextBtn.disabled = true;
  optionsList.addEventListener('change', () => {
    nextBtn.disabled = false;
  });
}

/**
 * Muestra los resultados y el detalle de aciertos/errores.
 */
function showResultsDetail() {
  quizContainer.innerHTML = `<div id="results">
    <h2>Resultados: ${score} de ${quizData.length}</h2>
  </div>`;

  // Recorremos todas las preguntas para mostrar detalle
  quizData.forEach((q, idx) => {
    const userAnsIdx   = userAnswers[idx];
    const correctAnsIdx = q.correctIndex;

    const qDiv = document.createElement('div');
    qDiv.className = 'question-detail';

    // Texto de la pregunta
    const qText = document.createElement('p');
    qText.textContent = `${idx + 1}. ${q.question}`;
    qDiv.appendChild(qText);

    // Lista de respuestas con marcación
    const ul = document.createElement('ul');
    ul.className = 'options-detail';

    q.options.forEach((opt, i) => {
      const li = document.createElement('li');
      li.textContent = opt;

      // Marcamos la tuya (✖) y la correcta (✔)
      if (i === correctAnsIdx) {
        li.textContent += ' ✔';
        li.style.fontWeight = '700';
      }
      if (i === userAnsIdx && i !== correctAnsIdx) {
        li.textContent += ' ✖';
        li.style.color = '#c00';
      }

      ul.appendChild(li);
    });

    qDiv.appendChild(ul);
    quizContainer.appendChild(qDiv);
  });

  // Cambiamos funcionalidad del botón
  nextBtn.textContent = 'Reiniciar';
  nextBtn.disabled   = false;
}

/**
 * Al hacer clic en "Siguiente" o "Reiniciar"
 */
nextBtn.addEventListener('click', () => {
  // Si estamos tras el resultado, reiniciamos todo
  if (currentQuestion >= quizData.length) {
    currentQuestion = 0;
    score           = 0;
    userAnswers.length = 0;
    nextBtn.textContent = 'Siguiente';
    showQuestion();
    return;
  }

  // Leemos selección
  const sel = document.querySelector('input[name="answer"]:checked');
  if (!sel) return;

  const ansIdx = parseInt(sel.value, 10);
  userAnswers.push(ansIdx);

  // Comprobamos
  if (ansIdx === quizData[currentQuestion].correctIndex) {
    score++;
  }

  currentQuestion++;

  // Si ya no quedan preguntas, mostramos detalle
  if (currentQuestion === quizData.length) {
    showResultsDetail();
  } else {
    showQuestion();
  }
});

// Iniciamos el quiz
showQuestion();
