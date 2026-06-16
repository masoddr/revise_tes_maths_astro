/** Interactive demo: handwritten digit classification with lycée-level maths. */

const GRID_SIZE = 28;
const DRAW_SIZE = 280;
const BRUSH_RADIUS = 12;

interface DigitTemplate {
  digit: number;
  pixels: Float32Array;
  centerX: number;
  centerY: number;
  meanIntensity: number;
}

interface ClassificationResult {
  digit: number;
  distance: number;
}

interface FeaturePoint {
  digit: number;
  x: number;
  y: number;
  isUser?: boolean;
}

const COLORS = {
  background: "#0f172a",
  gridLine: "#1e293b",
  pixelOn: "#60a5fa",
  pixelOff: "#111827",
  prototype: "#94a3b8",
  userPoint: "#f472b6",
  winner: "#34d399",
  axis: "#475569",
  label: "#f8fafc",
};

const DIGIT_COLORS = [
  "#f87171",
  "#fb923c",
  "#fbbf24",
  "#a3e635",
  "#34d399",
  "#2dd4bf",
  "#38bdf8",
  "#818cf8",
  "#a78bfa",
  "#f472b6",
];

function formatNumber(value: number, digits = 3): string {
  if (!Number.isFinite(value)) {
    return "—";
  }
  return value.toFixed(digits);
}

/** Build reference prototypes by rasterizing digits on a tiny canvas. */
function createDigitTemplate(digit: number): DigitTemplate {
  const offscreen = document.createElement("canvas");
  offscreen.width = GRID_SIZE;
  offscreen.height = GRID_SIZE;
  const ctx = offscreen.getContext("2d");

  if (!ctx) {
    return {
      digit,
      pixels: new Float32Array(GRID_SIZE * GRID_SIZE),
      centerX: 0.5,
      centerY: 0.5,
      meanIntensity: 0,
    };
  }

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px Inter, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(digit), GRID_SIZE / 2, GRID_SIZE / 2 + 1);

  const imageData = ctx.getImageData(0, 0, GRID_SIZE, GRID_SIZE);
  const pixels = new Float32Array(GRID_SIZE * GRID_SIZE);

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i += 1) {
    pixels[i] = imageData.data[i * 4] / 255;
  }

  const { centerX, centerY, meanIntensity } = computeFeatures(pixels);
  return { digit, pixels, centerX, centerY, meanIntensity };
}

/** Center of mass (normalized) and mean pixel intensity — 2nde-friendly features. */
function computeFeatures(pixels: Float32Array): {
  centerX: number;
  centerY: number;
  meanIntensity: number;
} {
  let totalWeight = 0;
  let sumX = 0;
  let sumY = 0;
  let sumIntensity = 0;

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const weight = pixels[row * GRID_SIZE + col];
      sumIntensity += weight;
      totalWeight += weight;
      sumX += col * weight;
      sumY += row * weight;
    }
  }

  if (totalWeight < 1e-6) {
    return { centerX: 0.5, centerY: 0.5, meanIntensity: 0 };
  }

  return {
    centerX: sumX / totalWeight / (GRID_SIZE - 1),
    centerY: sumY / totalWeight / (GRID_SIZE - 1),
    meanIntensity: sumIntensity / pixels.length,
  };
}

function euclideanDistance(a: Float32Array, b: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    const delta = a[i] - b[i];
    sum += delta * delta;
  }
  return Math.sqrt(sum);
}

function classifyDigit(
  pixels: Float32Array,
  templates: DigitTemplate[],
): ClassificationResult[] {
  return templates
    .map((template) => ({
      digit: template.digit,
      distance: euclideanDistance(pixels, template.pixels),
    }))
    .sort((left, right) => left.distance - right.distance);
}

function downsampleDrawCanvas(source: HTMLCanvasElement): Float32Array {
  const offscreen = document.createElement("canvas");
  offscreen.width = GRID_SIZE;
  offscreen.height = GRID_SIZE;
  const ctx = offscreen.getContext("2d");

  if (!ctx) {
    return new Float32Array(GRID_SIZE * GRID_SIZE);
  }

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);
  ctx.drawImage(source, 0, 0, GRID_SIZE, GRID_SIZE);

  const imageData = ctx.getImageData(0, 0, GRID_SIZE, GRID_SIZE);
  const pixels = new Float32Array(GRID_SIZE * GRID_SIZE);

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i += 1) {
    pixels[i] = imageData.data[i * 4] / 255;
  }

  return pixels;
}

function hasInk(pixels: Float32Array): boolean {
  return pixels.some((value) => value > 0.08);
}

function drawPixelGrid(
  canvas: HTMLCanvasElement,
  pixels: Float32Array,
  cellSize = 10,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const width = GRID_SIZE * cellSize;
  const height = GRID_SIZE * cellSize;
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, width, height);

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const value = pixels[row * GRID_SIZE + col];
      const x = col * cellSize;
      const y = row * cellSize;

      ctx.fillStyle = value > 0.05
        ? `rgba(96, 165, 250, ${Math.min(1, value * 1.15)})`
        : COLORS.pixelOff;
      ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
    }
  }

  ctx.strokeStyle = COLORS.gridLine;
  ctx.lineWidth = 1;
  for (let i = 0; i <= GRID_SIZE; i += 1) {
    const offset = i * cellSize;
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, offset);
    ctx.lineTo(width, offset);
    ctx.stroke();
  }
}

function drawFeatureSpace(
  canvas: HTMLCanvasElement,
  points: FeaturePoint[],
  winnerDigit: number | null,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const padding = 36;
  const width = canvas.width;
  const height = canvas.height;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, width, height);

  const toScreen = (x: number, y: number) => ({
    x: padding + x * plotWidth,
    y: height - padding - y * plotHeight,
  });

  ctx.strokeStyle = COLORS.axis;
  ctx.lineWidth = 1.5;
  const origin = toScreen(0, 0);
  const xEnd = toScreen(1, 0);
  const yEnd = toScreen(0, 1);
  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(xEnd.x, xEnd.y);
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(yEnd.x, yEnd.y);
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillText("Centre de gravité horizontal", padding, 18);
  ctx.fillText("Centre de gravité vertical", 12, padding - 8);

  points
    .filter((point) => !point.isUser)
    .forEach((point) => {
      const screen = toScreen(point.x, point.y);
      const color = DIGIT_COLORS[point.digit] ?? COLORS.prototype;
      const isWinner = winnerDigit === point.digit;

      ctx.fillStyle = isWinner ? COLORS.winner : color;
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, isWinner ? 9 : 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = COLORS.label;
      ctx.font = "600 11px Inter, system-ui, sans-serif";
      ctx.fillText(String(point.digit), screen.x - 3, screen.y + 4);
    });

  const userPoint = points.find((point) => point.isUser);
  if (userPoint) {
    const screen = toScreen(userPoint.x, userPoint.y);
    ctx.fillStyle = COLORS.userPoint;
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.label;
    ctx.font = "700 12px Inter, system-ui, sans-serif";
    ctx.fillText("?", screen.x - 4, screen.y + 4);
  }
}

/** Wire up the digit classification demo once the DOM is ready. */
export function initClassificationChiffresDemo(): void {
  const drawCanvas = document.getElementById("drawPad") as HTMLCanvasElement | null;
  const pixelCanvas = document.getElementById("pixelGrid") as HTMLCanvasElement | null;
  const featureCanvas = document.getElementById("featurePlot") as HTMLCanvasElement | null;
  const clearButton = document.getElementById("clearPad");
  const classifyButton = document.getElementById("classifyBtn");
  const exampleButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-example-digit]"),
  );
  const predictionValue = document.getElementById("predictionValue");
  const distanceValue = document.getElementById("distanceValue");
  const featureXValue = document.getElementById("featureXValue");
  const featureYValue = document.getElementById("featureYValue");
  const meanValue = document.getElementById("meanValue");
  const vectorPreview = document.getElementById("vectorPreview");
  const rankingList = document.getElementById("rankingList");
  const narration = document.getElementById("narration");
  const stepIndicator = document.getElementById("stepIndicator");

  if (
    !drawCanvas ||
    !pixelCanvas ||
    !featureCanvas ||
    !clearButton ||
    !classifyButton ||
    !predictionValue ||
    !distanceValue ||
    !featureXValue ||
    !featureYValue ||
    !meanValue ||
    !vectorPreview ||
    !rankingList ||
    !narration ||
    !stepIndicator
  ) {
    return;
  }

  const drawCtx = drawCanvas.getContext("2d");
  if (!drawCtx) {
    return;
  }

  const templates = Array.from({ length: 10 }, (_, digit) => createDigitTemplate(digit));
  let isDrawing = false;
  let hasDrawn = false;

  function resetDrawPad(): void {
    drawCtx.fillStyle = "#000000";
    drawCtx.fillRect(0, 0, DRAW_SIZE, DRAW_SIZE);
    drawCtx.strokeStyle = "#1e293b";
    drawCtx.lineWidth = 2;
    drawCtx.strokeRect(0, 0, DRAW_SIZE, DRAW_SIZE);
    hasDrawn = false;
    updateIdleState();
  }

  function updateIdleState(): void {
    predictionValue.textContent = "—";
    distanceValue.textContent = "—";
    featureXValue.textContent = "—";
    featureYValue.textContent = "—";
    meanValue.textContent = "—";
    vectorPreview.textContent = "Dessinez un chiffre pour voir le début du vecteur…";
    rankingList.innerHTML = "";
    stepIndicator.textContent = "Étape 1 / 3 — Dessinez un chiffre";
    narration.innerHTML =
      '<strong class="text-gray-900">Défi :</strong> une appli d\'IA doit reconnaître un chiffre manuscrit. ' +
      "Ici, on résout ce problème avec la <strong>distance euclidienne</strong> du programme de Seconde.";
    drawPixelGrid(pixelCanvas, new Float32Array(GRID_SIZE * GRID_SIZE));
    drawFeatureSpace(
      featureCanvas,
      templates.map((template) => ({
        digit: template.digit,
        x: template.centerX,
        y: template.centerY,
      })),
      null,
    );
  }

  function paintAt(clientX: number, clientY: number): void {
    const rect = drawCanvas.getBoundingClientRect();
    const scaleX = drawCanvas.width / rect.width;
    const scaleY = drawCanvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    drawCtx.fillStyle = "#ffffff";
    drawCtx.beginPath();
    drawCtx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    drawCtx.fill();
    hasDrawn = true;
  }

  function renderVectorPreview(pixels: Float32Array): void {
    const previewLength = 18;
    const slice = Array.from(pixels.slice(0, previewLength), (value) => formatNumber(value, 2));
    vectorPreview.textContent = `[${slice.join(", ")}, …]  (${pixels.length} nombres)`;
  }

  function renderRanking(results: ClassificationResult[]): void {
    rankingList.innerHTML = results
      .map((result, index) => {
        const badgeClass = index === 0 ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700";
        return `
          <li class="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm">
            <span class="font-medium text-gray-900">
              <span class="inline-flex h-6 w-6 items-center justify-center rounded-full ${badgeClass} mr-2">${result.digit}</span>
              Chiffre ${result.digit}
            </span>
            <span class="tabular-nums text-gray-600">d = ${formatNumber(result.distance, 3)}</span>
          </li>
        `;
      })
      .join("");
  }

  function classifyCurrentDrawing(): void {
    const pixels = downsampleDrawCanvas(drawCanvas);

    if (!hasInk(pixels)) {
      narration.innerHTML =
        '<strong class="text-gray-900">Astuce :</strong> dessinez un chiffre plus visible, ou chargez un exemple.';
      return;
    }

    const results = classifyDigit(pixels, templates);
    const best = results[0];
    const features = computeFeatures(pixels);

    drawPixelGrid(pixelCanvas, pixels);
    drawFeatureSpace(
      featureCanvas,
      [
        ...templates.map((template) => ({
          digit: template.digit,
          x: template.centerX,
          y: template.centerY,
        })),
        {
          digit: best.digit,
          x: features.centerX,
          y: features.centerY,
          isUser: true,
        },
      ],
      best.digit,
    );

    predictionValue.textContent = String(best.digit);
    distanceValue.textContent = formatNumber(best.distance, 3);
    featureXValue.textContent = formatNumber(features.centerX, 3);
    featureYValue.textContent = formatNumber(features.centerY, 3);
    meanValue.textContent = formatNumber(features.meanIntensity, 3);
    renderVectorPreview(pixels);
    renderRanking(results.slice(0, 5));

    const runnerUp = results[1];
    const margin = runnerUp ? runnerUp.distance - best.distance : 0;

    stepIndicator.textContent = "Étape 3 / 3 — Classification par plus proche voisin";
    if (margin < 0.35) {
      narration.innerHTML =
        `<strong class="text-gray-900">Résultat serré :</strong> le chiffre <strong>${best.digit}</strong> est le plus proche ` +
        `(d = ${formatNumber(best.distance, 3)}), mais le ${runnerUp.digit} est presque aussi proche. ` +
        "C'est typique en IA : on compare des <em>représentations numériques</em> bruitées.";
    } else {
      narration.innerHTML =
        `<strong class="text-gray-900">Prédiction :</strong> votre dessin ressemble le plus au modèle <strong>${best.digit}</strong> ` +
        `car sa distance euclidienne est la plus petite : ` +
        `<em>d = √Σ(aᵢ − bᵢ)² = ${formatNumber(best.distance, 3)}</em>.`;
    }
  }

  function loadExample(digit: number): void {
    const template = templates[digit];
    if (!template) {
      return;
    }

    resetDrawPad();
    const offscreen = document.createElement("canvas");
    offscreen.width = GRID_SIZE;
    offscreen.height = GRID_SIZE;
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      return;
    }

    const imageData = ctx.createImageData(GRID_SIZE, GRID_SIZE);
    for (let i = 0; i < template.pixels.length; i += 1) {
      const value = Math.round(template.pixels[i] * 255);
      imageData.data[i * 4] = value;
      imageData.data[i * 4 + 1] = value;
      imageData.data[i * 4 + 2] = value;
      imageData.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    drawCtx.drawImage(offscreen, 0, 0, DRAW_SIZE, DRAW_SIZE);
    hasDrawn = true;
    classifyCurrentDrawing();
  }

  drawCanvas.addEventListener("pointerdown", (event) => {
    isDrawing = true;
    drawCanvas.setPointerCapture(event.pointerId);
    paintAt(event.clientX, event.clientY);
    stepIndicator.textContent = "Étape 2 / 3 — Image convertie en données";
    narration.innerHTML =
      '<strong class="text-gray-900">Étape données :</strong> votre trait est converti en une grille de ' +
      `${GRID_SIZE}×${GRID_SIZE} = ${GRID_SIZE * GRID_SIZE} nombres entre 0 et 1.`;
  });

  drawCanvas.addEventListener("pointermove", (event) => {
    if (!isDrawing) {
      return;
    }
    paintAt(event.clientX, event.clientY);
  });

  const stopDrawing = (event: PointerEvent) => {
    if (!isDrawing) {
      return;
    }
    isDrawing = false;
    drawCanvas.releasePointerCapture(event.pointerId);
    classifyCurrentDrawing();
  };

  drawCanvas.addEventListener("pointerup", stopDrawing);
  drawCanvas.addEventListener("pointercancel", stopDrawing);

  clearButton.addEventListener("click", resetDrawPad);
  classifyButton.addEventListener("click", classifyCurrentDrawing);
  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const digit = Number(button.dataset.exampleDigit);
      loadExample(digit);
    });
  });

  resetDrawPad();
}
