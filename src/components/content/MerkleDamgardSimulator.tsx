"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import katex from "katex";

const BLUE = "#2a78d6";
const AMBER = "#c67b1f";
const GREEN = "#2a7d46";
const RED = "#c0392b";

// ── 실제 SHA-256 (FIPS 180-4) ────────────────────────────────────────────────
const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];
const H_INIT = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
];

const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));
const wordsHex = (h: number[]) => h.map((w) => (w >>> 0).toString(16).padStart(8, "0")).join("");

/** 입력을 SHA-256 패딩 → 64바이트 블록으로 나누고, 블록마다 갱신되는 중간 상태를 기록한다. */
function sha256Trace(msg: Uint8Array) {
  const bitLen = msg.length * 8;
  const totalLen = Math.ceil((msg.length + 1 + 8) / 64) * 64;
  const buf = new Uint8Array(totalLen);
  buf.set(msg);
  buf[msg.length] = 0x80;
  const dv = new DataView(buf.buffer);
  dv.setUint32(totalLen - 8, Math.floor(bitLen / 0x100000000));
  dv.setUint32(totalLen - 4, bitLen >>> 0);

  const H = H_INIT.slice();
  const states: string[] = [wordsHex(H)]; // states[0] = IV
  const blocks: Uint8Array[] = [];
  const W = new Uint32Array(64);

  for (let off = 0; off < totalLen; off += 64) {
    const block = buf.slice(off, off + 64);
    blocks.push(block);
    const bdv = new DataView(block.buffer);
    for (let t = 0; t < 16; t++) W[t] = bdv.getUint32(t * 4);
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(W[t - 15], 7) ^ rotr(W[t - 15], 18) ^ (W[t - 15] >>> 3);
      const s1 = rotr(W[t - 2], 17) ^ rotr(W[t - 2], 19) ^ (W[t - 2] >>> 10);
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[t] + W[t]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;
      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }
    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
    H[5] = (H[5] + f) >>> 0;
    H[6] = (H[6] + g) >>> 0;
    H[7] = (H[7] + h) >>> 0;
    states.push(wordsHex(H));
  }
  return { blocks, states, msgLen: msg.length };
}

const shortHex = (hex: string) => (hex.length > 20 ? `${hex.slice(0, 8)}…${hex.slice(-8)}` : hex);

function ArrowDown() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path
        d="M8 0 V19 M8 19 L3 13 M8 19 L13 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Trace = { blocks: Uint8Array[]; states: string[]; msgLen: number };

export default function MerkleDamgardSimulator() {
  const [input, setInput] = useState("hello world");
  const [trace, setTrace] = useState<Trace | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const bytes = new TextEncoder().encode(input);
    const t = sha256Trace(bytes);
    setTrace(t);
    setRevealed(0);
    setPlaying(false);
    setVerified(null);
    crypto.subtle.digest("SHA-256", bytes).then((d) => {
      if (cancelled) return;
      const hex = Array.from(new Uint8Array(d), (b) => b.toString(16).padStart(2, "0")).join("");
      setVerified(hex === t.states[t.states.length - 1]);
    });
    return () => {
      cancelled = true;
    };
  }, [input]);

  const blockCount = trace?.blocks.length ?? 0;

  useEffect(() => {
    if (!playing) return;
    if (revealed >= blockCount) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setRevealed((r) => r + 1), 850);
    return () => clearTimeout(timer);
  }, [playing, revealed, blockCount]);

  const done = blockCount > 0 && revealed >= blockCount;

  const handlePlay = useCallback(() => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (done) setRevealed(0);
    setPlaying(true);
  }, [playing, done]);

  const digest = trace ? trace.states[trace.states.length - 1] : wordsHex(H_INIT);

  const formula = useMemo(() => {
    const n = Math.max(blockCount, 1);
    let nested = `\\mathrm{IV}`;
    for (let i = 1; i <= n; i++) nested = `f\\bigl(${nested},\\; M_{${i}}\\bigr)`;
    return katex.renderToString(`\\text{digest} = ${nested} = h_{${n}}`, {
      displayMode: true,
      throwOnError: false,
    });
  }, [blockCount]);

  return (
    <div style={{ maxWidth: 640, margin: "1.5rem 0" }}>
      <input
        type="text"
        value={input}
        maxLength={140}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 10px",
          fontFamily: "monospace",
          fontSize: 14,
          border: "0.5px solid var(--border, #e1e0d9)",
          borderRadius: 8,
          background: "var(--surface-1, #fcfcfb)",
        }}
      />

      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <button onClick={handlePlay}>{playing ? "일시정지" : done ? "다시 재생" : "재생"}</button>
        <button
          onClick={() => {
            setPlaying(false);
            setRevealed((r) => Math.min(r + 1, blockCount));
          }}
          disabled={done}
        >
          한 블록씩
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setRevealed(0);
          }}
        >
          리셋
        </button>
      </div>

      {/* 머클-담고르 다이어그램: 메시지 블록은 위에서, 체인값(IV·hᵢ)은 왼쪽에서 f 로 들어간다 */}
      <div style={{ overflowX: "auto", padding: "4px 0 10px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", minWidth: "min-content" }}>
          <Terminal label="IV = h0" full={trace ? trace.states[0] : wordsHex(H_INIT)} tone="iv" active />
          {trace?.blocks.map((block, i) => {
            const on = i < revealed;
            const isLast = i === blockCount - 1;
            return (
              <div key={i} style={{ display: "contents" }}>
                <Connector label={`h${i}`} active={on} />
                <Stage index={i} block={block} active={on} />
                {isLast && <Connector label="hₙ" active={on} />}
                {isLast && (
                  <Terminal label="다이제스트" full={trace.states[i + 1]} tone="digest" active={on} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 점화식: 이전 체인값과 메시지 블록이 압축 함수로 합쳐진다 */}
      <div
        style={{
          border: "0.5px solid var(--border, #e1e0d9)",
          borderRadius: 8,
          padding: "0.75rem 1rem",
          background: "var(--surface-1, #fcfcfb)",
          overflowX: "auto",
          margin: "2px 0 8px",
        }}
        dangerouslySetInnerHTML={{ __html: formula }}
      />

      {done && (
        <p style={{ fontSize: 14, marginTop: "1rem", wordBreak: "break-all" }}>
          <code style={{ fontFamily: "monospace" }}>{digest}</code>
        </p>
      )}
      {done && verified !== null && (
        <p style={{ fontSize: 13, marginTop: 4, color: verified ? GREEN : RED }}>
          {verified
            ? '✓ 브라우저 crypto.subtle.digest("SHA-256") 결과와 일치합니다.'
            : "✗ 내장 구현과 불일치"}
        </p>
      )}
    </div>
  );
}

const M_ROW_H = 62; // 메시지 블록이 놓이는 위쪽 영역 높이 (f 박스 정렬 기준)
const F_H = 50; // f 박스 / 터미널 박스 높이

/** 파이프라인 양 끝 박스: IV(=h0) 와 다이제스트 */
function Terminal({
  label,
  full,
  tone,
  active,
}: {
  label: string;
  full: string;
  tone: "iv" | "digest";
  active: boolean;
}) {
  const accent = tone === "iv" ? "var(--text-secondary, #52514e)" : BLUE;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto" }}>
      <div style={{ height: M_ROW_H }} />
      <div style={{ height: F_H, display: "flex", alignItems: "center" }}>
        <div
          title={full}
          style={{
            border: `1px solid ${active ? accent : "var(--border, #e1e0d9)"}`,
            borderRadius: 8,
            padding: "5px 10px",
            textAlign: "center",
            background: active && tone === "digest" ? "rgba(42,120,214,0.08)" : "var(--surface-1, #fcfcfb)",
            opacity: active ? 1 : 0.5,
          }}
        >
          <div style={{ fontSize: 10, color: "var(--text-muted, #898781)" }}>{label}</div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              fontWeight: tone === "digest" ? 700 : 400,
              color: active ? accent : "var(--text-muted, #898781)",
            }}
          >
            {shortHex(full)}
          </div>
        </div>
      </div>
    </div>
  );
}

/** f 사이를 잇는 가로 화살표 + 체인값 라벨 (hᵢ 가 왼쪽에서 다음 f 로) */
function Connector({ label, active }: { label: string; active: boolean }) {
  const color = active ? BLUE : "var(--text-muted, #898781)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto" }}>
      <div style={{ height: M_ROW_H }} />
      <div style={{ height: F_H, display: "flex", alignItems: "center", position: "relative" }}>
        <span
          style={{
            position: "absolute",
            top: 1,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 10,
            fontFamily: "monospace",
            color,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        {/* 박스에 딱 붙는 가로 막대 + 삼각 화살촉 */}
        <div style={{ position: "relative", width: 46, height: 1.6, background: color }}>
          <span
            style={{
              position: "absolute",
              right: -1,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "4.5px solid transparent",
              borderBottom: "4.5px solid transparent",
              borderLeft: `8px solid ${color}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** 한 라운드: 위에서 내려오는 메시지 블록 Mᵢ + 압축 함수 f */
function Stage({
  index,
  block,
  active,
}: {
  index: number;
  block: Uint8Array;
  active: boolean;
}) {
  const hex = Array.from(block, (b) => b.toString(16).padStart(2, "0"));
  const short = `${hex.slice(0, 4).join("")}…${hex.slice(-4).join("")}`;
  const line = active ? BLUE : "var(--border, #e1e0d9)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto" }}>
      <div
        style={{
          height: M_ROW_H,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: active ? 1 : 0.4,
        }}
      >
        <div
          title={hex.join("")}
          style={{
            border: `0.5px solid ${active ? AMBER : "var(--border, #e1e0d9)"}`,
            borderRadius: 6,
            padding: "4px 8px",
            textAlign: "center",
            background: "var(--surface-1, #fcfcfb)",
          }}
        >
          <div style={{ fontSize: 10, color: "var(--text-muted, #898781)" }}>M{index + 1} · 64B</div>
          <div style={{ fontFamily: "monospace", fontSize: 11 }}>{short}</div>
        </div>
        <span style={{ color: line, display: "block" }}>
          <ArrowDown />
        </span>
      </div>
      <div
        style={{
          // 위 M 카드가 칼럼 너비를 정하므로, f 박스를 stretch 시켜 칼럼 폭을 꽉 채운다.
          // (그러지 않으면 가운데 정렬되어 좌우 화살표와 사이가 벌어진다)
          alignSelf: "stretch",
          height: F_H,
          minWidth: 60,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${active ? BLUE : "var(--border, #e1e0d9)"}`,
          borderRadius: 8,
          background: active ? "rgba(42,120,214,0.08)" : "transparent",
          color: active ? BLUE : "var(--text-muted, #898781)",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        f
      </div>
    </div>
  );
}
