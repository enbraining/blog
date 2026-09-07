"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// SHA-256 출력을 앞 BITS 비트만 남기고 잘라낸 공간에서 충돌을 관찰한다.
const BITS = 12;
const SPACE = 2 ** BITS; // 가능한 값의 수
const COLS = 2 ** Math.ceil(BITS / 2); // 그리드 한 변 (BITS 짝수면 정사각형)
const BOUND = 2 ** (BITS / 2); // 생일 한계: 2^(비트/2) = √(2^비트)

/** 12 -> "1011 0010 1101" */
function toBitString(value: number) {
  return value
    .toString(2)
    .padStart(BITS, "0")
    .replace(/(.{4})(?=.)/g, "$1 ");
}

export default function BirthdayCollisionSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filledRef = useRef<Uint8Array>(new Uint8Array(0));
  const runningRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cellSizeRef = useRef(1);

  const [attempts, setAttempts] = useState(0);
  const [hashLabel, setHashLabel] = useState("앞 12비트: —");
  const [result, setResult] = useState("");
  const [running, setRunning] = useState(false);

  const drawCell = useCallback((idx: number, color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cellSize = cellSizeRef.current;
    const x = (idx % COLS) * cellSize;
    const y = Math.floor(idx / COLS) * cellSize;
    ctx.fillStyle = color;
    ctx.fillRect(x + 0.5, y + 0.5, Math.max(cellSize - 1, 1), Math.max(cellSize - 1, 1));
  }, []);

  const setup = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    if (timerRef.current) clearTimeout(timerRef.current);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    cellSizeRef.current = canvas.width / COLS;
    filledRef.current = new Uint8Array(SPACE);

    setAttempts(0);
    setHashLabel("앞 12비트: —");
    setResult("");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(136,135,128,0.35)";
    ctx.lineWidth = 1;
    for (let i = 0; i < SPACE; i++) {
      const x = (i % COLS) * cellSizeRef.current;
      const y = Math.floor(i / COLS) * cellSizeRef.current;
      ctx.strokeRect(x, y, cellSizeRef.current, cellSizeRef.current);
    }
  }, []);

  useEffect(() => {
    setup();
  }, [setup]);

  const step = useCallback(async () => {
    if (!runningRef.current) return;

    const randBytes = crypto.getRandomValues(new Uint8Array(16));
    const digest = await crypto.subtle.digest("SHA-256", randBytes);
    const view = new DataView(digest);
    // 해시의 앞 32비트에서 다시 앞 BITS 비트만 취한다 (= 해시를 BITS 비트로 자름)
    const idx = view.getUint32(0, false) >>> (32 - BITS);

    setAttempts((a) => a + 1);
    setHashLabel(`앞 12비트: ${toBitString(idx)}`);

    if (filledRef.current[idx]) {
      drawCell(idx, "#e34948");
      runningRef.current = false;
      setRunning(false);
      setAttempts((a) => {
        setResult(
          `${a}번째 시도에서 충돌 발생 (${toBitString(idx)}). ` +
            `12비트 공간의 생일 한계는 2^6 = ${BOUND}회. 256비트라면 2^128회입니다.`
        );
        return a;
      });
      return;
    }

    filledRef.current[idx] = 1;
    drawCell(idx, "#2a78d6");

    timerRef.current = setTimeout(step, 12);
  }, [drawCell]);

  const handleToggle = () => {
    if (runningRef.current) {
      runningRef.current = false;
      setRunning(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      runningRef.current = true;
      setRunning(true);
      step();
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "1.5rem 0" }}>
      <p style={{ fontSize: 14, color: "var(--text-secondary, #52514e)", margin: "0 0 12px" }}>
        SHA-256 출력을 앞 {BITS}비트만 남기고 잘라낸 공간 · 2<sup>{BITS}</sup> ={" "}
        {SPACE.toLocaleString()}가지
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
        <button onClick={handleToggle}>{running ? "일시정지" : "시작"}</button>
        <button onClick={setup}>리셋</button>
      </div>

      <canvas
        ref={canvasRef}
        width={640}
        height={640}
        role="img"
        aria-label="12비트 해시 값 그리드. 빈 칸은 테두리만, 채워진 칸은 파란색, 충돌 칸은 빨간색"
        style={{
          width: "100%",
          height: "auto",
          border: "0.5px solid var(--border, #e1e0d9)",
          borderRadius: 8,
          display: "block",
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 12, marginTop: "1rem" }}>
        <div style={{ background: "var(--surface-1, #fcfcfb)", borderRadius: 8, padding: "1rem" }}>
          <p style={{ fontSize: 13, color: "var(--text-secondary, #52514e)", margin: "0 0 4px" }}>시도 횟수</p>
          <p style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>{attempts.toLocaleString()}</p>
        </div>
        <div style={{ background: "var(--surface-1, #fcfcfb)", borderRadius: 8, padding: "1rem" }}>
          <p style={{ fontSize: 13, color: "var(--text-secondary, #52514e)", margin: "0 0 4px" }}>
            생일 한계 2<sup>비트/2</sup>
          </p>
          <p style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>~{BOUND.toLocaleString()}</p>
        </div>
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--text-muted, #898781)",
          fontFamily: "monospace",
          margin: "1rem 0 0",
          wordBreak: "break-all",
        }}
      >
        {hashLabel}
      </p>
      {result && <p style={{ fontSize: 14, margin: "8px 0 0" }}>{result}</p>}
    </div>
  );
}
