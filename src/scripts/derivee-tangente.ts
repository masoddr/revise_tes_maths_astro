/** Interactive demo: derivative as limit of secant slope. */

interface FunctionSpec {
  label: string;
  f: (x: number) => number;
  df: (x: number) => number;
  yMin: number;
  yMax: number;
}

const FUNCTIONS: Record<string, FunctionSpec> = {
  quadratic: {
    label: "x²",
    f: (x) => x * x,
    df: (x) => 2 * x,
    yMin: -1,
    yMax: 8,
  },
  cubic: {
    label: "x³ − 2x",
    f: (x) => x ** 3 - 2 * x,
    df: (x) => 3 * x ** 2 - 2,
    yMin: -6,
    yMax: 6,
  },
  sine: {
    label: "sin(x)",
    f: (x) => Math.sin(x),
    df: (x) => Math.cos(x),
    yMin: -1.4,
    yMax: 1.4,
  },
  gaussian: {
    label: "e^(−x²/4)",
    f: (x) => Math.exp(-(x * x) / 4),
    df: (x) => (-x / 2) * Math.exp(-(x * x) / 4),
    yMin: -0.2,
    yMax: 1.2,
  },
};

const COLORS = {
  background: "#0f172a",
  grid: "#1e293b",
  axes: "#475569",
  curve: "#3b82f6",
  secant: "#f59e0b",
  tangent: "#10b981",
  pointA: "#ec4899",
  pointB: "#8b5cf6",
  label: "#f8fafc",
};

const VIEW = {
  xMin: -5,
  xMax: 5,
  padding: 42,
};

function formatNumber(value: number, digits = 3): string {
  if (!Number.isFinite(value)) {
    return "∞";
  }
  return value.toFixed(digits);
}

function secantSlope(x: number, h: number, fn: FunctionSpec): number {
  if (Math.abs(h) < 1e-6) {
    return fn.df(x);
  }
  return (fn.f(x + h) - fn.f(x)) / h;
}

/** Wire up the canvas demo once the DOM is ready. */
export function initDeriveeTangenteDemo(): void {
  const canvas = document.getElementById("plot") as HTMLCanvasElement | null;
  const functionSelect = document.getElementById("functionSelect") as HTMLSelectElement | null;
  const xSlider = document.getElementById("xSlider") as HTMLInputElement | null;
  const hSlider = document.getElementById("hSlider") as HTMLInputElement | null;
  const xValue = document.getElementById("xValue");
  const hValue = document.getElementById("hValue");
  const rateValue = document.getElementById("rateValue");
  const derivValue = document.getElementById("derivValue");
  const gapValue = document.getElementById("gapValue");
  const fxValue = document.getElementById("fxValue");
  const narration = document.getElementById("narration");

  if (
    !canvas ||
    !functionSelect ||
    !xSlider ||
    !hSlider ||
    !xValue ||
    !hValue ||
    !rateValue ||
    !derivValue ||
    !gapValue ||
    !fxValue ||
    !narration
  ) {
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  function currentFunction(): FunctionSpec {
    return FUNCTIONS[functionSelect!.value];
  }

  function worldToScreen(x: number, y: number, yMin: number, yMax: number) {
    const { padding } = VIEW;
    const width = canvas!.width;
    const height = canvas!.height;
    const plotW = width - padding * 2;
    const plotH = height - padding * 2;

    const sx = padding + ((x - VIEW.xMin) / (VIEW.xMax - VIEW.xMin)) * plotW;
    const sy = height - padding - ((y - yMin) / (yMax - yMin)) * plotH;
    return { x: sx, y: sy };
  }

  function drawGrid(yMin: number, yMax: number): void {
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    ctx!.fillStyle = COLORS.background;
    ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

    ctx!.strokeStyle = COLORS.grid;
    ctx!.lineWidth = 1;

    for (let x = Math.ceil(VIEW.xMin); x <= VIEW.xMax; x += 1) {
      const p1 = worldToScreen(x, yMin, yMin, yMax);
      const p2 = worldToScreen(x, yMax, yMin, yMax);
      ctx!.beginPath();
      ctx!.moveTo(p1.x, p1.y);
      ctx!.lineTo(p2.x, p2.y);
      ctx!.stroke();
    }

    const yStep = (yMax - yMin) / 8;
    for (let y = yMin; y <= yMax + 1e-9; y += yStep) {
      const p1 = worldToScreen(VIEW.xMin, y, yMin, yMax);
      const p2 = worldToScreen(VIEW.xMax, y, yMin, yMax);
      ctx!.beginPath();
      ctx!.moveTo(p1.x, p1.y);
      ctx!.lineTo(p2.x, p2.y);
      ctx!.stroke();
    }

    ctx!.strokeStyle = COLORS.axes;
    ctx!.lineWidth = 1.5;
    const xAxisY = worldToScreen(0, 0, yMin, yMax).y;
    const yAxisX = worldToScreen(0, 0, yMin, yMax).x;
    ctx!.beginPath();
    ctx!.moveTo(VIEW.padding, xAxisY);
    ctx!.lineTo(canvas!.width - VIEW.padding, xAxisY);
    ctx!.moveTo(yAxisX, VIEW.padding);
    ctx!.lineTo(yAxisX, canvas!.height - VIEW.padding);
    ctx!.stroke();
  }

  function drawCurve(
    fn: (x: number) => number,
    yMin: number,
    yMax: number,
    color: string,
    lineWidth = 2.5,
  ): void {
    ctx!.strokeStyle = color;
    ctx!.lineWidth = lineWidth;
    ctx!.beginPath();
    let started = false;
    const steps = 600;

    for (let i = 0; i <= steps; i += 1) {
      const x = VIEW.xMin + (i / steps) * (VIEW.xMax - VIEW.xMin);
      const y = fn(x);
      if (!Number.isFinite(y) || y < yMin - 2 || y > yMax + 2) {
        started = false;
        continue;
      }
      const p = worldToScreen(x, y, yMin, yMax);
      if (!started) {
        ctx!.moveTo(p.x, p.y);
        started = true;
      } else {
        ctx!.lineTo(p.x, p.y);
      }
    }
    ctx!.stroke();
  }

  function drawLineThroughPoint(
    slope: number,
    x0: number,
    y0: number,
    color: string,
    dash: number[] = [],
  ): void {
    const fn = currentFunction();
    const yMin = fn.yMin;
    const yMax = fn.yMax;
    const xLeft = VIEW.xMin;
    const xRight = VIEW.xMax;
    const yLeft = y0 + slope * (xLeft - x0);
    const yRight = y0 + slope * (xRight - x0);
    const p1 = worldToScreen(xLeft, yLeft, yMin, yMax);
    const p2 = worldToScreen(xRight, yRight, yMin, yMax);

    ctx!.save();
    ctx!.strokeStyle = color;
    ctx!.lineWidth = 2;
    ctx!.setLineDash(dash);
    ctx!.beginPath();
    ctx!.moveTo(p1.x, p1.y);
    ctx!.lineTo(p2.x, p2.y);
    ctx!.stroke();
    ctx!.restore();
  }

  function drawPoint(x: number, y: number, color: string, label: string): void {
    const fn = currentFunction();
    const p = worldToScreen(x, y, fn.yMin, fn.yMax);
    ctx!.fillStyle = color;
    ctx!.beginPath();
    ctx!.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx!.fill();

    ctx!.fillStyle = COLORS.label;
    ctx!.font = "600 13px Inter, system-ui, sans-serif";
    ctx!.fillText(label, p.x + 10, p.y - 10);
  }

  function updateMetrics(
    x: number,
    h: number,
    fn: FunctionSpec,
    derivative: number,
    rate: number,
    gap: number,
  ): void {
    xValue.textContent = formatNumber(x, 2);
    hValue.textContent = formatNumber(h, 2);
    rateValue.textContent = formatNumber(rate, 4);
    derivValue.textContent = formatNumber(derivative, 4);
    gapValue.textContent = formatNumber(gap, 4);
    fxValue.textContent = `${formatNumber(fn.f(x), 3)} → ${formatNumber(fn.f(x + h), 3)}`;

    const absH = Math.abs(h);
    if (absH < 0.05) {
      narration.innerHTML =
        '<strong class="text-gray-900">Presque tangente :</strong> |h| est très petit, le taux d\'accroissement ≈ f′(x). ' +
        "C'est la définition de la dérivée comme limite.";
    } else if (absH < 0.3) {
      narration.innerHTML =
        '<strong class="text-gray-900">On se rapproche :</strong> la sécante se rapproche de la tangente. ' +
        "Observez l'écart |Δpente| diminuer.";
    } else {
      narration.innerHTML =
        '<strong class="text-gray-900">Idée clé :</strong> la sécante joint A et B. Diminuez |h| pour voir le quotient ' +
        "(f(x+h)−f(x))/h converger vers f′(x).";
    }
  }

  function render(): void {
    const fn = currentFunction();
    const x = Number(xSlider.value);
    let h = Number(hSlider.value);

    // Avoid division by zero while keeping the limit intuitive.
    if (Math.abs(h) < 0.02) {
      h = h >= 0 ? 0.02 : -0.02;
      hSlider.value = String(h);
    }

    const yA = fn.f(x);
    const yB = fn.f(x + h);
    const derivative = fn.df(x);
    const rate = secantSlope(x, h, fn);
    const gap = Math.abs(rate - derivative);

    drawGrid(fn.yMin, fn.yMax);
    drawCurve(fn.f, fn.yMin, fn.yMax, COLORS.curve);
    drawLineThroughPoint(rate, x, yA, COLORS.secant);
    drawLineThroughPoint(derivative, x, yA, COLORS.tangent, [8, 6]);
    drawPoint(x, yA, COLORS.pointA, "A");
    drawPoint(x + h, yB, COLORS.pointB, "B");

    updateMetrics(x, h, fn, derivative, rate, gap);
  }

  [functionSelect, xSlider, hSlider].forEach((el) => {
    el.addEventListener("input", render);
  });

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const xPixel = (event.clientX - rect.left) * scaleX;
    const { padding } = VIEW;
    const plotW = canvas.width - padding * 2;
    const ratio = (xPixel - padding) / plotW;
    const x = VIEW.xMin + ratio * (VIEW.xMax - VIEW.xMin);
    const clamped = Math.max(Number(xSlider.min), Math.min(Number(xSlider.max), x));
    xSlider.value = String(Math.round(clamped * 20) / 20);
    render();
  });

  render();
}
