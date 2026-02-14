const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const topicsList = document.getElementById("topicsList");
const topicSearch = document.getElementById("topicSearch");
const chatTitle = document.getElementById("chatTitle");
const typingIndicator = document.getElementById("typingIndicator");

const darkModeBtn = document.getElementById("darkModeBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");

const languageSelect = document.getElementById("languageSelect");

let currentMode = "General Chat 🍓";
let currentLanguage = "en";

// ===== LANGUAGE PACKS =====
const LANG = {
  en: {
    greeting: "🍓 Hi Gabriel! I'm Stroburry AI. What do you want to research today?",
    respectful: "⚠️ Please be respectful, Gabriel.",
    illegal: "⛔ Sorry Gabriel, I can't help with illegal or dangerous requests.",
    hate: "⚠️ Sorry Gabriel, I can't support hateful content.",
    weatherFail: "⚠️ Sorry Gabriel, I couldn't get the weather right now.",
    mathFail: "⚠️ Please type a valid math expression like: 5*(3+2)",
    modeChanged: (mode) => `🍓 Mode changed to: ${mode}`,
    cleared: "🍓 Chat cleared. Hi Gabriel! What do you want to research now?",
    learned: (q, a) => `🧠 Done Gabriel! I learned:\n"${q}" = "${a}"`,
    learnTip: "💡 Use: Learn that question: answer",
    memorySays: (ans) => `🧠 Memory says:\n${ans}`,
    weather: (city, w) => `🌤️ Weather in ${city}: ${w}`,
    result: (r) => `🔢 Result: ${r}`,
    wiki: (txt) => `📚 ${txt}`,
    notFound: (q, mode) =>
      `🍓 Gabriel, I couldn't find an exact answer, but here is a helpful response:\n\n• Question: "${q}"\n• Mode: ${mode}\n\nTry selecting a topic like History, Weather, or Mathematics for better results.`
  },

  es: {
    greeting: "🍓 ¡Hola Gabriel! Soy Stroburry AI. ¿Qué quieres investigar hoy?",
    respectful: "⚠️ Por favor sé respetuoso, Gabriel.",
    illegal: "⛔ Lo siento Gabriel, no puedo ayudar con cosas ilegales o peligrosas.",
    hate: "⚠️ Lo siento Gabriel, no puedo apoyar contenido de odio.",
    weatherFail: "⚠️ Lo siento Gabriel, no pude obtener el clima ahora.",
    mathFail: "⚠️ Escribe una operación válida como: 5*(3+2)",
    modeChanged: (mode) => `🍓 Modo cambiado a: ${mode}`,
    cleared: "🍓 Chat borrado. ¡Hola Gabriel! ¿Qué quieres investigar ahora?",
    learned: (q, a) => `🧠 ¡Listo Gabriel! Aprendí:\n"${q}" = "${a}"`,
    learnTip: "💡 Usa: Aprende que pregunta: respuesta",
    memorySays: (ans) => `🧠 Memoria dice:\n${ans}`,
    weather: (city, w) => `🌤️ Clima en ${city}: ${w}`,
    result: (r) => `🔢 Resultado: ${r}`,
    wiki: (txt) => `📚 ${txt}`,
    notFound: (q, mode) =>
      `🍓 Gabriel, no encontré una respuesta exacta, pero aquí tienes una respuesta útil:\n\n• Pregunta: "${q}"\n• Modo: ${mode}\n\nIntenta elegir un tema como Historia, Clima o Matemáticas.`
  },

  fr: {
    greeting: "🍓 Salut Gabriel ! Je suis Stroburry AI. Que veux-tu rechercher aujourd’hui ?",
    respectful: "⚠️ S'il te plaît, sois respectueux, Gabriel.",
    illegal: "⛔ Désolé Gabriel, je ne peux pas aider avec des demandes illégales ou dangereuses.",
    hate: "⚠️ Désolé Gabriel, je ne peux pas soutenir du contenu haineux.",
    weatherFail: "⚠️ Désolé Gabriel, je ne peux pas obtenir la météo maintenant.",
    mathFail: "⚠️ Écris une expression mathématique valide comme : 5*(3+2)",
    modeChanged: (mode) => `🍓 Mode changé en : ${mode}`,
    cleared: "🍓 Discussion effacée. Salut Gabriel ! Que veux-tu rechercher maintenant ?",
    learned: (q, a) => `🧠 C'est fait Gabriel ! J'ai appris:\n"${q}" = "${a}"`,
    learnTip: "💡 Utilise: Learn that question: answer",
    memorySays: (ans) => `🧠 Mémoire:\n${ans}`,
    weather: (city, w) => `🌤️ Météo à ${city}: ${w}`,
    result: (r) => `🔢 Résultat: ${r}`,
    wiki: (txt) => `📚 ${txt}`,
    notFound: (q, mode) =>
      `🍓 Gabriel, je n'ai pas trouvé une réponse exacte, mais voici une réponse utile:\n\n• Question: "${q}"\n• Mode: ${mode}\n\nEssaie de choisir un sujet comme Histoire, Météo ou Mathématiques.`
  },

  ko: {
    greeting: "🍓 안녕 Gabriel! 나는 Stroburry AI야. 오늘 무엇을 조사할까?",
    respectful: "⚠️ 예의 있게 말해줘, Gabriel.",
    illegal: "⛔ 미안해 Gabriel, 불법적이거나 위험한 요청은 도와줄 수 없어.",
    hate: "⚠️ 미안해 Gabriel, 혐오 콘텐츠는 지원할 수 없어.",
    weatherFail: "⚠️ 미안해 Gabriel, 지금 날씨 정보를 가져올 수 없어.",
    mathFail: "⚠️ 올바른 수식을 입력해줘. 예: 5*(3+2)",
    modeChanged: (mode) => `🍓 모드 변경됨: ${mode}`,
    cleared: "🍓 채팅이 삭제되었어. Gabriel, 이제 무엇을 조사할까?",
    learned: (q, a) => `🧠 완료! 배웠어:\n"${q}" = "${a}"`,
    learnTip: "💡 Use: Learn that question: answer",
    memorySays: (ans) => `🧠 메모리:\n${ans}`,
    weather: (city, w) => `🌤️ ${city} 날씨: ${w}`,
    result: (r) => `🔢 결과: ${r}`,
    wiki: (txt) => `📚 ${txt}`,
    notFound: (q, mode) =>
      `🍓 Gabriel, 정확한 답을 찾지 못했지만 도움이 되는 답변을 줄게:\n\n• 질문: "${q}"\n• 모드: ${mode}\n\nHistory, Weather, Mathematics 같은 모드를 선택하면 더 좋아.`
  }
};

function t(key, ...args) {
  const pack = LANG[currentLanguage] || LANG.en;
  const val = pack[key] || LANG.en[key];
  return typeof val === "function" ? val(...args) : val;
}

// ===== TOPICS =====
const topics = [
  { name: "General Chat", emoji: "🍓" },
  { name: "Physics", emoji: "⚛️" },
  { name: "Biology", emoji: "🧬" },
  { name: "Mathematics", emoji: "🔢" },
  { name: "Programming", emoji: "💻" },
  { name: "Weather", emoji: "🌤️" },
  { name: "History", emoji: "🏛️" },
  { name: "Geography", emoji: "🌍" },
  { name: "Chemistry", emoji: "🧪" },
  { name: "Medicine", emoji: "🏥" },
  { name: "Psychology", emoji: "🧠" },
  { name: "Astronomy", emoji: "🌌" },
  { name: "Space", emoji: "🚀" },
  { name: "Cybersecurity", emoji: "🔐" },
  { name: "Robotics", emoji: "🤖" },
  { name: "Engineering", emoji: "🛠️" },
  { name: "Architecture", emoji: "🏗️" },
  { name: "Economics", emoji: "💰" },
  { name: "Business", emoji: "📈" },
  { name: "Marketing", emoji: "📣" },
  { name: "Languages", emoji: "🌎" },
  { name: "Literature", emoji: "📖" },
  { name: "Grammar", emoji: "✍️" },
  { name: "Art", emoji: "🎨" },
  { name: "Music", emoji: "🎼" },
  { name: "Movies", emoji: "🎬" },
  { name: "Video Games", emoji: "🎮" },
  { name: "Sports", emoji: "🏀" },
  { name: "Nutrition", emoji: "🍎" },
  { name: "Cooking", emoji: "🍳" },
  { name: "Animals", emoji: "🐶" },
  { name: "Environment", emoji: "♻️" },
  { name: "Politics", emoji: "🗳️" },
  { name: "Law", emoji: "⚖️" },
  { name: "Mythology", emoji: "🐉" },
  { name: "Religion", emoji: "⛪" },
  { name: "Technology", emoji: "📱" },
  { name: "AI", emoji: "🤖" },
  { name: "Science", emoji: "🔬" },
  { name: "Education", emoji: "🎓" },
  { name: "Travel", emoji: "🗺️" },
  { name: "Automotive", emoji: "🚗" },
  { name: "Mechanics", emoji: "🔧" },
  { name: "Agriculture", emoji: "🌾" },
  { name: "Survival", emoji: "🏕️" },
  { name: "News", emoji: "📰" },
  { name: "Culture", emoji: "🎭" },
  { name: "Finance", emoji: "🏦" },
  { name: "Investing", emoji: "📊" }
];

// ===== MEMORY SYSTEM =====
function loadMemory() {
  return JSON.parse(localStorage.getItem("stroburry_memory") || "{}");
}

function saveMemory(memory) {
  localStorage.setItem("stroburry_memory", JSON.stringify(memory));
}

// ===== LANGUAGE SAVE =====
function loadLanguage() {
  const saved = localStorage.getItem("stroburry_language");
  if (saved && LANG[saved]) currentLanguage = saved;
  languageSelect.value = currentLanguage;
}

function saveLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("stroburry_language", lang);
}

// ===== SECURITY FILTERS =====
function isUnsafe(text) {
  const t = text.toLowerCase();

  const badWords = [
    "idiot", "stupid", "pendejo", "imbecil", "fuck", "shit",
    "asshole", "bitch", "mierda", "puta"
  ];

  const illegal = [
    "how to hack", "hack instagram", "steal", "rob",
    "make a bomb", "explosive", "meth", "cocaine",
    "how to kill", "weapon", "gun", "knife attack"
  ];

  const hate = [
    "kill all", "hate all", "nazis", "hitler was right"
  ];

  if (badWords.some(w => t.includes(w))) return "bad_language";
  if (illegal.some(w => t.includes(w))) return "illegal";
  if (hate.some(w => t.includes(w))) return "hate";

  return null;
}

// ===== UI HELPERS =====
function getTimeNow() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  const time = document.createElement("div");
  time.className = "time";
  time.textContent = getTimeNow();

  msg.appendChild(bubble);
  msg.appendChild(time);

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping(show) {
  typingIndicator.style.display = show ? "block" : "none";
}

// ===== TOPICS RENDER =====
function renderTopics(filter = "") {
  topicsList.innerHTML = "";

  topics
    .filter(t => t.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((topic) => {
      const item = document.createElement("div");
      item.className = "topic";

      if (topic.name === "General Chat") item.classList.add("active");

      item.innerHTML = `
        <div class="topic-icon">${topic.emoji}</div>
        <div class="topic-name">${topic.name}</div>
      `;

      item.onclick = () => {
        document.querySelectorAll(".topic").forEach(x => x.classList.remove("active"));
        item.classList.add("active");

        currentMode = `${topic.name} ${topic.emoji}`;
        chatTitle.textContent = currentMode;

        addMessage(t("modeChanged", currentMode), "bot");
      };

      topicsList.appendChild(item);
    });
}

renderTopics();

// ===== WIKIPEDIA =====
async function getWikipediaSummary(query) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const res = await fetch(url);

    if (!res.ok) return null;

    const data = await res.json();

    if (data.type === "disambiguation") {
      return "This topic has multiple meanings. Please be more specific.";
    }

    return data.extract || null;
  } catch {
    return null;
  }
}

// ===== WEATHER =====
async function getWeather(city) {
  try {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=%C+%t`;
    const res = await fetch(url);
    const text = await res.text();
    return text;
  } catch {
    return null;
  }
}

// ===== SAFE MATH =====
function safeMath(expression) {
  if (!/^[0-9+\-*/().\s^]+$/.test(expression)) return null;

  try {
    const clean = expression.replace(/\^/g, "**");
    const result = Function(`"use strict"; return (${clean})`)();
    return result;
  } catch {
    return null;
  }
}

// ===== CLEAN QUERY FOR WIKIPEDIA =====
function cleanWikipediaQuery(input) {
  let q = input.toLowerCase().trim();

  // English
  q = q.replace("where is", "");
  q = q.replace("who is", "");
  q = q.replace("what is", "");
  q = q.replace("define", "");
  q = q.replace("tell me about", "");
  q = q.replace("information about", "");
  q = q.replace("facts about", "");
  q = q.replace("explain", "");

  // Spanish
  q = q.replace("donde esta", "");
  q = q.replace("donde queda", "");
  q = q.replace("quien es", "");
  q = q.replace("que es", "");
  q = q.replace("dime sobre", "");
  q = q.replace("informacion sobre", "");
  q = q.replace("explica", "");

  // remove extra symbols
  q = q.replace(/\?/g, "");
  q = q.replace(/\!/g, "");
  q = q.replace(/\./g, "");
  q = q.trim();

  // capitalize first letter (Wikipedia works better)
  if (q.length > 1) {
    q = q.charAt(0).toUpperCase() + q.slice(1);
  }

  return q;
}

// ===== SMART ANSWER SYSTEM =====
async function stroburryResponse(input) {
  const text = input.trim();
  const lower = text.toLowerCase();

  // Security
  const unsafeType = isUnsafe(text);
  if (unsafeType === "bad_language") return t("respectful");
  if (unsafeType === "illegal") return t("illegal");
  if (unsafeType === "hate") return t("hate");

  // Greetings
  const greetings = ["hi", "hello", "hey", "hola", "good morning", "good afternoon", "good evening"];
  if (greetings.includes(lower)) return t("greeting");

  // Learn memory (English + Spanish)
  if (lower.startsWith("learn that") || lower.startsWith("aprende que")) {
    let content = text;

    content = content.replace(/learn that/i, "");
    content = content.replace(/aprende que/i, "");
    content = content.trim();

    if (content.includes(":")) {
      const [q, a] = content.split(":");
      const memory = loadMemory();

      memory[q.trim().toLowerCase()] = a.trim();
      saveMemory(memory);

      return t("learned", q.trim(), a.trim());
    }

    return t("learnTip");
  }

  // Use memory
  const memory = loadMemory();
  for (const key in memory) {
    if (lower.includes(key)) {
      return t("memorySays", memory[key]);
    }
  }

  // Weather mode
  if (currentMode.includes("Weather") || lower.startsWith("weather") || lower.startsWith("clima")) {
    let city = text
      .replace(/weather/i, "")
      .replace(/clima/i, "")
      .replace(/in /i, "")
      .replace(/en /i, "")
      .trim();

    if (!city) city = "Mexico City";

    const w = await getWeather(city);
    if (w) return t("weather", city, w);

    return t("weatherFail");
  }

  // Math mode OR automatic math detection
  if (currentMode.includes("Mathematics") || /[0-9+\-*/^()]/.test(text)) {
    const result = safeMath(text);
    if (result !== null) return t("result", result);

    if (currentMode.includes("Mathematics")) return t("mathFail");
  }

  // Programming mode
  if (currentMode.includes("Programming")) {
    return `💻 Programming Response:\n\n"${text}"\n\nTip: Tell me the language (Python/JavaScript) and what you want the code to do.`;
  }

  // Wikipedia for all other topics
  const query = cleanWikipediaQuery(text);

  if (query.length > 1) {
    const wiki = await getWikipediaSummary(query);
    if (wiki) return t("wiki", wiki);
  }

  // Default smart response
  return t("notFound", text, currentMode);
}

// ===== SEND MESSAGE =====
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  showTyping(true);

  setTimeout(async () => {
    const reply = await stroburryResponse(text);
    showTyping(false);
    addMessage(reply, "bot");
  }, 650);
}

sendBtn.onclick = sendMessage;

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// ===== SEARCH FILTER =====
topicSearch.addEventListener("input", () => {
  renderTopics(topicSearch.value);
});

// ===== DARK MODE =====
darkModeBtn.onclick = () => {
  document.body.classList.toggle("dark");
};

// ===== CLEAR CHAT =====
clearBtn.onclick = () => {
  chatBox.innerHTML = "";
  addMessage(t("cleared"), "bot");
};

// ===== DOWNLOAD CHAT =====
downloadBtn.onclick = () => {
  let text = "";
  document.querySelectorAll(".message").forEach(msg => {
    const sender = msg.classList.contains("user") ? "Gabriel" : "Stroburry";
    const bubble = msg.querySelector(".bubble").textContent;
    text += `${sender}: ${bubble}\n\n`;
  });

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "stroburry_chat.txt";
  link.click();
};

// ===== LANGUAGE SELECT =====
languageSelect.addEventListener("change", () => {
  saveLanguage(languageSelect.value);
  addMessage(t("greeting"), "bot");
});

// ===== INIT =====
loadLanguage();
addMessage(t("greeting"), "bot");
