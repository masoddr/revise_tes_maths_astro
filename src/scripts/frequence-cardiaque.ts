/** Interactive demo: fetal heart rate monitoring with 2nde-level statistics. */

interface HeartRateSample {
  timeSec: number;
  bpm: number;
}

interface Scenario {
  id: string;
  label: string;
  description: string;
  samples: HeartRateSample[];
}

interface HistogramBin {
  start: number;
  end: number;
  count: number;
}

interface WindowStats {
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  abnormalCount: number;
  abnormalRate: number;
}

const COLORS = {
  background: "#0f172a",
  grid: "#1e293b",
  axis: "#475569",
  label: "#94a3b8",
  curve: "#f43f5e",
  normalZone: "rgba(52, 211, 153, 0.18)",
  normalBorder: "#34d399",
  abnormal: "#fb7185",
  histogram: "#38bdf8",
  histogramAlert: "#f97316",
  window: "rgba(99, 102, 241, 0.25)",
  windowBorder: "#818cf8",
};

const NORMAL_MIN_DEFAULT = 110;
const NORMAL_MAX_DEFAULT = 160;

function formatNumber(value: number, digits = 1): string {
  if (!Number.isFinite(value)) {
    return "—";
  }
  return value.toFixed(digits);
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

/** Deterministic pseudo-random noise for stable visuals across reloads. */
function pseudoNoise(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

/** Build synthetic fetal heart-rate traces inspired by clinical monitoring. */
function buildScenario(id: string, label: string, description: string): Scenario {
  const samples: HeartRateSample[] = [];
  const durationSec = 600;
  const stepSec = 5;

  for (let timeSec = 0; timeSec <= durationSec; timeSec += stepSec) {
    const noise = (pseudoNoise(timeSec * 0.17) - 0.5) * 14;
    let bpm = 135 + Math.sin(timeSec / 42) * 10 + noise;

    if (id === "bradycardie" && timeSec >= 210 && timeSec <= 330) {
      bpm = 92 + (pseudoNoise(timeSec * 0.31) - 0.5) * 8;
    }

    if (id === "tachycardie" && timeSec >= 360 && timeSec <= 480) {
      bpm = 176 + (pseudoNoise(timeSec * 0.23) - 0.5) * 10;
    }

    if (id === "mixte") {
      if (timeSec >= 150 && timeSec <= 240) {
        bpm = 96 + (pseudoNoise(timeSec * 0.29) - 0.5) * 7;
      }
      if (timeSec >= 420 && timeSec <= 510) {
        bpm = 172 + (pseudoNoise(timeSec * 0.19) - 0.5) * 9;
      }
    }

    samples.push({
      timeSec,
      bpm: Math.max(70, Math.min(200, Math.round(bpm))),
    });
  }

  return { id, label, description, samples };
}

const SCENARIOS: Scenario[] = [
  buildScenario(
    "normal",
    "Surveillance normale",
    "La fréquence reste majoritairement dans la zone attendue.",
  ),
  buildScenario(
    "bradycardie",
    "Épisode de bradycardie",
    "Un ralentissement prolongé apparaît au milieu de l'enregistrement.",
  ),
  buildScenario(
    "tachycardie",
    "Épisode de tachycardie",
    "La fréquence dépasse durablement le seuil haut.",
  ),
  buildScenario(
    "mixte",
    "Deux alertes",
    "Un ralentissement puis une accélération anormale.",
  ),
];

function getSamplesInWindow(
  samples: HeartRateSample[],
  startSec: number,
  endSec: number,
): HeartRateSample[] {
  return samples.filter(
    (sample) => sample.timeSec >= startSec && sample.timeSec <= endSec,
  );
}

function computeStats(
  samples: HeartRateSample[],
  normalMin: number,
  normalMax: number,
): WindowStats {
  if (samples.length === 0) {
    return {
      mean: 0,
      median: 0,
      stdDev: 0,
      min: 0,
      max: 0,
      abnormalCount: 0,
      abnormalRate: 0,
    };
  }

  const values = samples.map((sample) => sample.bpm);
  const sorted = [...values].sort((left, right) => left - right);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const median =
    sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  const abnormalCount = values.filter(
    (value) => value < normalMin || value > normalMax,
  ).length;

  return {
    mean,
    median,
    stdDev: Math.sqrt(variance),
    min: sorted[0],
    max: sorted[sorted.length - 1],
    abnormalCount,
    abnormalRate: abnormalCount / values.length,
  };
}

function buildHistogram(
  samples: HeartRateSample[],
  binCount: number,
  minBpm: number,
  maxBpm: number,
): HistogramBin[] {
  const safeBinCount = Math.max(4, binCount);
  const width = (maxBpm - minBpm) / safeBinCount;
  const bins: HistogramBin[] = [];

  for (let index = 0; index < safeBinCount; index += 1) {
    const start = minBpm + index * width;
    const end = start + width;
    const count = samples.filter((sample) => {
      const isLast = index === safeBinCount - 1;
      return sample.bpm >= start && (isLast ? sample.bpm <= end : sample.bpm < end);
    }).length;
    bins.push({ start, end, count });
  }

  return bins;
}

function drawHeartRateChart(
  canvas: HTMLCanvasElement,
  samples: HeartRateSample[],
  windowStart: number,
  windowEnd: number,
  normalMin: number,
  normalMax: number,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx || samples.length === 0) {
    return;
  }

  const padding = { top: 24, right: 20, bottom: 42, left: 52 };
  const width = canvas.width;
  const height = canvas.height;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const minTime = samples[0].timeSec;
  const maxTime = samples[samples.length - 1].timeSec;
  const minBpm = 80;
  const maxBpm = 190;

  const toScreen = (timeSec: number, bpm: number) => ({
    x: padding.left + ((timeSec - minTime) / (maxTime - minTime)) * plotWidth,
    y: padding.top + (1 - (bpm - minBpm) / (maxBpm - minBpm)) * plotHeight,
  });

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, width, height);

  const normalTop = toScreen(minTime, normalMax).y;
  const normalBottom = toScreen(minTime, normalMin).y;
  ctx.fillStyle = COLORS.normalZone;
  ctx.fillRect(padding.left, normalTop, plotWidth, normalBottom - normalTop);
  ctx.strokeStyle = COLORS.normalBorder;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(padding.left, normalTop);
  ctx.lineTo(width - padding.right, normalTop);
  ctx.moveTo(padding.left, normalBottom);
  ctx.lineTo(width - padding.right, normalBottom);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  for (let bpm = 90; bpm <= 180; bpm += 20) {
    const y = toScreen(minTime, bpm).y;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillStyle = COLORS.label;
    ctx.font = "11px Inter, system-ui, sans-serif";
    ctx.fillText(String(bpm), 12, y + 4);
  }

  const windowLeft = toScreen(windowStart, minBpm).x;
  const windowRight = toScreen(windowEnd, minBpm).x;
  ctx.fillStyle = COLORS.window;
  ctx.fillRect(windowLeft, padding.top, windowRight - windowLeft, plotHeight);
  ctx.strokeStyle = COLORS.windowBorder;
  ctx.lineWidth = 2;
  ctx.strokeRect(windowLeft, padding.top, windowRight - windowLeft, plotHeight);

  ctx.strokeStyle = COLORS.curve;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  samples.forEach((sample, index) => {
    const point = toScreen(sample.timeSec, sample.bpm);
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();

  samples.forEach((sample) => {
    const isAbnormal = sample.bpm < normalMin || sample.bpm > normalMax;
    if (!isAbnormal) {
      return;
    }
    const point = toScreen(sample.timeSec, sample.bpm);
    ctx.fillStyle = COLORS.abnormal;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = COLORS.label;
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillText("Temps (min:sec)", padding.left, height - 12);
  ctx.fillText("Fréquence (bpm)", 4, 16);
}

function drawHistogram(
  canvas: HTMLCanvasElement,
  bins: HistogramBin[],
  normalMin: number,
  normalMax: number,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx || bins.length === 0) {
    return;
  }

  const padding = { top: 24, right: 20, bottom: 52, left: 44 };
  const width = canvas.width;
  const height = canvas.height;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxCount = Math.max(...bins.map((bin) => bin.count), 1);
  const barWidth = plotWidth / bins.length;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, width, height);

  bins.forEach((bin, index) => {
    const barHeight = (bin.count / maxCount) * plotHeight;
    const x = padding.left + index * barWidth + 4;
    const y = padding.top + plotHeight - barHeight;
    const overlapsNormal = bin.end > normalMin && bin.start < normalMax;
    ctx.fillStyle = overlapsNormal ? COLORS.histogram : COLORS.histogramAlert;
    ctx.fillRect(x, y, barWidth - 8, barHeight);

    ctx.fillStyle = COLORS.label;
    ctx.font = "10px Inter, system-ui, sans-serif";
    const label = `${Math.round(bin.start)}`;
    ctx.fillText(label, x, height - 28);
    if (bin.count > 0) {
      ctx.fillText(String(bin.count), x + 2, y - 4);
    }
  });

  ctx.strokeStyle = COLORS.axis;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top + plotHeight);
  ctx.lineTo(width - padding.right, padding.top + plotHeight);
  ctx.stroke();

  ctx.fillStyle = COLORS.label;
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillText("Classes de fréquence (bpm)", padding.left, height - 8);
  ctx.fillText("Effectifs", 6, 18);
}

/** Wire up the fetal heart-rate statistics demo once the DOM is ready. */
export function initFrequenceCardiaqueDemo(): void {
  const signalCanvas = document.getElementById("signalPlot") as HTMLCanvasElement | null;
  const histogramCanvas = document.getElementById("histogramPlot") as HTMLCanvasElement | null;
  const scenarioSelect = document.getElementById("scenarioSelect") as HTMLSelectElement | null;
  const windowStartSlider = document.getElementById("windowStart") as HTMLInputElement | null;
  const windowEndSlider = document.getElementById("windowEnd") as HTMLInputElement | null;
  const binCountSlider = document.getElementById("binCount") as HTMLInputElement | null;
  const normalMinSlider = document.getElementById("normalMin") as HTMLInputElement | null;
  const normalMaxSlider = document.getElementById("normalMax") as HTMLInputElement | null;
  const windowStartValue = document.getElementById("windowStartValue");
  const windowEndValue = document.getElementById("windowEndValue");
  const binCountValue = document.getElementById("binCountValue");
  const normalMinValue = document.getElementById("normalMinValue");
  const normalMaxValue = document.getElementById("normalMaxValue");
  const meanValue = document.getElementById("meanValue");
  const medianValue = document.getElementById("medianValue");
  const stdDevValue = document.getElementById("stdDevValue");
  const minValue = document.getElementById("minValue");
  const maxValue = document.getElementById("maxValue");
  const abnormalValue = document.getElementById("abnormalValue");
  const alertBadge = document.getElementById("alertBadge");
  const narration = document.getElementById("narration");
  const stepIndicator = document.getElementById("stepIndicator");
  const scenarioDescription = document.getElementById("scenarioDescription");

  if (
    !signalCanvas ||
    !histogramCanvas ||
    !scenarioSelect ||
    !windowStartSlider ||
    !windowEndSlider ||
    !binCountSlider ||
    !normalMinSlider ||
    !normalMaxSlider ||
    !windowStartValue ||
    !windowEndValue ||
    !binCountValue ||
    !normalMinValue ||
    !normalMaxValue ||
    !meanValue ||
    !medianValue ||
    !stdDevValue ||
    !minValue ||
    !maxValue ||
    !abnormalValue ||
    !alertBadge ||
    !narration ||
    !stepIndicator ||
    !scenarioDescription
  ) {
    return;
  }

  function currentScenario(): Scenario {
    return SCENARIOS.find((scenario) => scenario.id === scenarioSelect.value) ?? SCENARIOS[0];
  }

  function syncWindowSliders(): void {
    const start = Number(windowStartSlider.value);
    let end = Number(windowEndSlider.value);
    if (end <= start + 30) {
      end = start + 30;
      windowEndSlider.value = String(end);
    }
    windowStartValue.textContent = formatTime(start);
    windowEndValue.textContent = formatTime(end);
  }

  function updateAlert(stats: WindowStats, normalMin: number, normalMax: number): void {
    if (stats.abnormalRate === 0) {
      alertBadge.className =
        "inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800";
      alertBadge.textContent = "Aucune alerte";
      narration.innerHTML =
        `<strong class="text-gray-900">Analyse rassurante :</strong> toutes les mesures de la fenêtre sont entre ` +
        `<strong>${normalMin}</strong> et <strong>${normalMax}</strong> bpm. ` +
        `La moyenne vaut <strong>${formatNumber(stats.mean, 1)}</strong> bpm.`;
      return;
    }

    if (stats.abnormalRate >= 0.35) {
      alertBadge.className =
        "inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-800";
      alertBadge.textContent = "Alerte forte";
      narration.innerHTML =
        `<strong class="text-gray-900">Alerte :</strong> ${stats.abnormalCount} mesures sur ${Math.round(stats.abnormalRate * 100)} % ` +
        `sortent de l'intervalle [${normalMin} ; ${normalMax}]. ` +
        "L'histogramme montre quelles classes de fréquence sont sur-représentées.";
      return;
    }

    alertBadge.className =
      "inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800";
    alertBadge.textContent = "Surveillance renforcée";
    narration.innerHTML =
      `<strong class="text-gray-900">Points isolés :</strong> quelques valeurs sortent de la zone normale, ` +
      `mais la moyenne reste à <strong>${formatNumber(stats.mean, 1)}</strong> bpm. ` +
      "Affinez la fenêtre temporelle pour zoomer sur l'épisode suspect.";
  }

  function render(): void {
    const scenario = currentScenario();
    const windowStart = Number(windowStartSlider.value);
    const windowEnd = Number(windowEndSlider.value);
    const binCount = Number(binCountSlider.value);
    const normalMin = Number(normalMinSlider.value);
    const normalMax = Number(normalMaxSlider.value);

    if (normalMax <= normalMin + 10) {
      normalMaxSlider.value = String(normalMin + 10);
    }

    syncWindowSliders();
    scenarioDescription.textContent = scenario.description;
    binCountValue.textContent = String(binCount);
    normalMinValue.textContent = String(Number(normalMinSlider.value));
    normalMaxValue.textContent = String(Number(normalMaxSlider.value));

    const windowSamples = getSamplesInWindow(scenario.samples, windowStart, windowEnd);
    const stats = computeStats(windowSamples, Number(normalMinSlider.value), Number(normalMaxSlider.value));
    const histogramMin = Math.max(70, stats.min - 8);
    const histogramMax = Math.min(200, stats.max + 8);
    const bins = buildHistogram(windowSamples, binCount, histogramMin, histogramMax);

    drawHeartRateChart(
      signalCanvas,
      scenario.samples,
      windowStart,
      windowEnd,
      Number(normalMinSlider.value),
      Number(normalMaxSlider.value),
    );
    drawHistogram(
      histogramCanvas,
      bins,
      Number(normalMinSlider.value),
      Number(normalMaxSlider.value),
    );

    meanValue.textContent = formatNumber(stats.mean, 1);
    medianValue.textContent = formatNumber(stats.median, 1);
    stdDevValue.textContent = formatNumber(stats.stdDev, 1);
    minValue.textContent = formatNumber(stats.min, 0);
    maxValue.textContent = formatNumber(stats.max, 0);
    abnormalValue.textContent = `${stats.abnormalCount} (${formatNumber(stats.abnormalRate * 100, 0)} %)`;

    const windowIsFull =
      windowStart <= 0 && windowEnd >= scenario.samples[scenario.samples.length - 1].timeSec;
    if (windowIsFull) {
      stepIndicator.textContent = "Étape 1 / 3 — Observer le signal";
    } else {
      stepIndicator.textContent = "Étape 2 / 3 — Fenêtre d'analyse sélectionnée";
    }
    updateAlert(stats, Number(normalMinSlider.value), Number(normalMaxSlider.value));
  }

  scenarioSelect.innerHTML = SCENARIOS.map(
    (scenario) => `<option value="${scenario.id}">${scenario.label}</option>`,
  ).join("");

  [
    scenarioSelect,
    windowStartSlider,
    windowEndSlider,
    binCountSlider,
    normalMinSlider,
    normalMaxSlider,
  ].forEach((element) => {
    element.addEventListener("input", render);
  });

  windowStartSlider.addEventListener("input", () => {
    stepIndicator.textContent = "Étape 2 / 3 — Choisir la fenêtre d'analyse";
  });

  binCountSlider.addEventListener("input", () => {
    narration.innerHTML =
      '<strong class="text-gray-900">Histogramme :</strong> changez le nombre de classes pour voir comment la ' +
      "répartition des fréquences devient plus ou moins précise.";
  });

  render();
}
