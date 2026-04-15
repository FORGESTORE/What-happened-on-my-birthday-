import { useState, useCallback } from "react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function Stars() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: ((i * 13.7 + 3) % 100).toFixed(2),
    top: ((i * 7.3 + 5) % 100).toFixed(2),
    size: 1 + (i % 3),
    dur: 2 + (i % 6),
    delay: ((i * 0.19) % 4).toFixed(2),
  }));
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,pointerEvents:"none",zIndex:0}}>
      {stars.map(s => (
        <div key={s.id} style={{
          position:"absolute",
          left:`${s.left}%`,
          top:`${s.top}%`,
          width:`${s.size}px`,
          height:`${s.size}px`,
          background:"white",
          borderRadius:"50%",
          opacity:0.3,
          animation:`twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
        }}/>
      ))}
    </div>
  );
}

function Confetti({ active }) {
  if (!active) return null;
  const pieces = Array.from({ length: 70 }, (_, i) => {
    const colors = ['#FFD700','#FF6B6B','#4ECDC4','#C084FC','#FB923C','#34D399','#F472B6','#60A5FA'];
    const shapes = ["50%", "2px", "0", "50%", "0"];
    return {
      id: i,
      left: ((i * 17.3 + 1) % 100).toFixed(1),
      delay: ((i * 0.06) % 1.8).toFixed(2),
      dur: (2.5 + (i % 5) * 0.25).toFixed(2),
      color: colors[i % colors.length],
      size: 6 + (i % 5) * 2,
      borderRadius: shapes[i % shapes.length],
    };
  });
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,pointerEvents:"none",zIndex:200,overflow:"hidden"}}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position:"absolute",
          left:`${p.left}%`,
          top:"-24px",
          width:`${p.size}px`,
          height:`${p.size}px`,
          background:p.color,
          borderRadius:p.borderRadius,
          animation:`confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
        }}/>
      ))}
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Nunito:wght@300;400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0820;
    min-height: 100vh;
    font-family: 'Nunito', sans-serif;
  }

  .bday-app {
    min-height: 100vh;
    background: radial-gradient(ellipse at 20% 20%, #1a1250 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, #1a0a30 0%, transparent 50%),
                linear-gradient(160deg, #0a0820 0%, #130d3a 40%, #0d0825 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 20px 80px;
    position: relative;
    overflow-x: hidden;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.8); }
  }

  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translateY(105vh) rotate(800deg) scale(0.5); opacity: 0; }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes goldShimmer {
    0% { background-position: -300% center; }
    100% { background-position: 300% center; }
  }

  @keyframes cakeBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    25% { transform: translateY(-8px) scale(1.05); }
    75% { transform: translateY(-4px) scale(1.02); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(255,170,0,0.1), 0 0 60px rgba(255,170,0,0.05); }
    50% { box-shadow: 0 0 40px rgba(255,170,0,0.2), 0 0 80px rgba(255,170,0,0.1); }
  }

  @keyframes resultReveal {
    0% { opacity: 0; transform: translateY(20px) scale(0.97); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  .bday-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 660px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;
  }

  .bday-header {
    text-align: center;
    animation: fadeSlideUp 0.9s ease-out both;
  }

  .bday-cake {
    font-size: 72px;
    display: block;
    margin-bottom: 20px;
    animation: cakeBounce 3.5s ease-in-out infinite;
    filter: drop-shadow(0 0 24px rgba(255,200,0,0.4));
    line-height: 1;
  }

  .bday-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 7vw, 3.8rem);
    font-weight: 900;
    background: linear-gradient(135deg, #ffe066 0%, #ffaa00 25%, #fff5c0 50%, #ffaa00 75%, #ffe066 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: goldShimmer 4s linear infinite;
    line-height: 1.1;
    margin-bottom: 14px;
  }

  .bday-subtitle {
    color: rgba(200,185,255,0.6);
    font-size: 1.05rem;
    font-weight: 300;
    letter-spacing: 0.04em;
  }

  .bday-card {
    background: rgba(255,255,255,0.055);
    border: 1px solid rgba(255,215,0,0.18);
    border-radius: 28px;
    padding: 44px 40px;
    width: 100%;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    animation: fadeSlideUp 0.9s ease-out 0.15s both, glowPulse 4s ease-in-out infinite;
  }

  .bday-card-label {
    font-family: 'Playfair Display', serif;
    color: rgba(255,210,80,0.75);
    font-size: 0.85rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 30px;
  }

  .bday-selectors {
    display: grid;
    grid-template-columns: 2fr 1fr 1.3fr;
    gap: 14px;
    margin-bottom: 30px;
  }

  .bday-sel-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .bday-sel-label {
    color: rgba(200,185,255,0.5);
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 600;
    padding-left: 2px;
  }

  .bday-select {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 14px;
    color: white;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 13px 38px 13px 16px;
    cursor: pointer;
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255%2C215%2C0%2C0.5)'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    background-size: 10px;
  }

  .bday-select:focus {
    border-color: rgba(255,215,0,0.5);
    background-color: rgba(255,255,255,0.12);
    box-shadow: 0 0 0 3px rgba(255,215,0,0.1);
  }

  .bday-select option {
    background: #1a1450;
    color: white;
    font-weight: 600;
  }

  .bday-btn {
    width: 100%;
    padding: 18px 24px;
    border: none;
    border-radius: 16px;
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
    color: #1a0d00;
    letter-spacing: 0.03em;
    position: relative;
    overflow: hidden;
  }

  .bday-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transition: left 0.5s;
  }

  .bday-btn:hover:not(:disabled)::before {
    left: 100%;
  }

  .bday-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(255,165,0,0.45), 0 4px 15px rgba(255,165,0,0.3);
    filter: brightness(1.05);
  }

  .bday-btn:active:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(255,165,0,0.3);
  }

  .bday-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .bday-note {
    color: rgba(200,185,255,0.3);
    font-size: 0.78rem;
    text-align: center;
    margin-top: 16px;
    letter-spacing: 0.04em;
  }

  .bday-result {
    width: 100%;
    background: rgba(255,255,255,0.065);
    border: 1px solid rgba(255,215,0,0.28);
    border-radius: 28px;
    padding: 44px 40px;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    text-align: center;
    animation: resultReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    position: relative;
    overflow: hidden;
  }

  .bday-result::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FFD700, #FFA500, #FFD700, transparent);
  }

  .bday-result-emoji {
    font-size: 44px;
    display: block;
    margin-bottom: 16px;
    line-height: 1;
  }

  .bday-result-date {
    font-family: 'Playfair Display', serif;
    color: #FFD700;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .bday-result-tag {
    color: rgba(200,185,255,0.5);
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 24px;
    font-weight: 600;
  }

  .bday-divider {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent);
    margin: 0 auto 28px;
  }

  .bday-result-text {
    color: rgba(230,225,255,0.9);
    font-size: 1.13rem;
    line-height: 1.85;
    font-weight: 400;
  }

  .bday-again-btn {
    margin-top: 28px;
    padding: 11px 28px;
    border: 1px solid rgba(255,215,0,0.3);
    border-radius: 50px;
    background: transparent;
    color: rgba(255,215,0,0.75);
    font-family: 'Nunito', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    letter-spacing: 0.05em;
  }

  .bday-again-btn:hover {
    background: rgba(255,215,0,0.1);
    color: #FFD700;
    border-color: rgba(255,215,0,0.5);
  }

  .bday-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
  }

  .bday-loading-icons {
    display: flex;
    gap: 10px;
    font-size: 28px;
    margin-bottom: 4px;
  }

  .bday-loading-icon {
    display: inline-block;
    animation: cakeBounce 1.2s ease-in-out infinite;
  }

  .bday-loading-icon:nth-child(2) { animation-delay: 0.2s; }
  .bday-loading-icon:nth-child(3) { animation-delay: 0.4s; }

  .bday-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid rgba(255,215,0,0.15);
    border-top-color: #FFD700;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  .bday-loading-text {
    color: rgba(200,185,255,0.6);
    font-size: 0.98rem;
    text-align: center;
    line-height: 1.6;
  }

  .bday-loading-sub {
    color: rgba(200,185,255,0.35);
    font-size: 0.82rem;
    font-style: italic;
    margin-top: 4px;
  }

  .bday-error {
    color: #FF8585;
    text-align: center;
    padding: 16px;
    font-size: 0.98rem;
  }

  .bday-corner-star {
    position: absolute;
    color: rgba(255,215,0,0.12);
    font-size: 80px;
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }

  .bday-corner-tl { top: -20px; left: -20px; }
  .bday-corner-tr { top: -20px; right: -20px; transform: scaleX(-1); }
  .bday-corner-bl { bottom: -20px; left: -20px; transform: scaleY(-1); }
  .bday-corner-br { bottom: -20px; right: -20px; transform: scale(-1); }

  @media (max-width: 500px) {
    .bday-selectors {
      grid-template-columns: 1fr 1fr;
    }
    .bday-sel-group:first-child {
      grid-column: 1 / -1;
    }
    .bday-card, .bday-result {
      padding: 28px 22px;
    }
    .bday-title {
      font-size: 2rem;
    }
  }
`;

const loadingMessages = [
  "Flipping through the history books…",
  "Consulting the birthday oracle…",
  "Dusting off the archives of that year…",
  "Asking the universe what it was up to…",
];

// Build year list: 1950 through last year
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1950 }, (_, i) => currentYear - 1 - i);

export default function BirthdayFacts() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0]);

  const maxDays = month && year ? getDaysInMonth(parseInt(month), parseInt(year)) : 31;
  const isValid = month && day && year && parseInt(day) >= 1 && parseInt(day) <= maxDays;

  const displayDate = month && day && year
    ? `${MONTHS[parseInt(month) - 1]} ${parseInt(day)}, ${year}`
    : null;

  const dayOptions = Array.from({ length: maxDays }, (_, i) => i + 1);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setFact(null);
    setError(null);
    if (day && e.target.value && year) {
      const newMax = getDaysInMonth(parseInt(e.target.value), parseInt(year));
      if (parseInt(day) > newMax) setDay(String(newMax));
    }
  };

  const fetchFact = useCallback(async () => {
    if (!isValid) return;
    setLoading(true);
    setError(null);
    setFact(null);
    setLoadingMsg(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);

    const monthName = MONTHS[parseInt(month) - 1];
    const dateStr = `${monthName} ${parseInt(day)}, ${year}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `What is one specific, real, verifiable thing that happened in the world on ${dateStr}? It can be from any domain: sports (a game result, a record broken), entertainment (a movie or album release, an awards show), politics or world events, science and technology, pop culture, nature (a notable storm, eclipse, etc.), or any other real happening. Choose something fun, interesting, or surprising. Write it in a warm, celebratory tone — like you're delighting someone by revealing what the world was up to the day they were born. Keep it to 2–3 engaging sentences. Include real specifics like names, scores, or figures where relevant. Do not invent or fabricate any facts. If you are not certain about a specific detail, describe the event more generally rather than guessing.`
          }]
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";

      if (text && text.length > 10) {
        setFact(text);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      } else {
        setError("Couldn't find anything for that date. Please try again!");
      }
    } catch (e) {
      setError(`Something went wrong: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }, [month, day, year, isValid]);

  const handleReset = () => {
    setFact(null);
    setError(null);
  };

  return (
    <>
      <style>{css}</style>
      <Confetti active={showConfetti} />
      <Stars />

      <div className="bday-app">
        <div className="bday-content">

          <header className="bday-header">
            <span className="bday-cake" role="img" aria-label="birthday cake">🎂</span>
            <h1 className="bday-title">What Happened On<br/>My Birthday?</h1>
            <p className="bday-subtitle">Uncover the world's story from the day you arrived</p>
          </header>

          <div className="bday-card" style={{position:"relative",overflow:"hidden"}}>
            <span className="bday-corner-star bday-corner-tl" aria-hidden="true">✦</span>
            <span className="bday-corner-star bday-corner-tr" aria-hidden="true">✦</span>
            <span className="bday-corner-star bday-corner-bl" aria-hidden="true">✦</span>
            <span className="bday-corner-star bday-corner-br" aria-hidden="true">✦</span>

            <p className="bday-card-label">✦ &nbsp; Enter Your Birthday &nbsp; ✦</p>

            <div className="bday-selectors">
              <div className="bday-sel-group">
                <label className="bday-sel-label" htmlFor="bday-month">Month</label>
                <select
                  id="bday-month"
                  className="bday-select"
                  value={month}
                  onChange={handleMonthChange}
                >
                  <option value="">Month</option>
                  {MONTHS.map((m, i) => (
                    <option key={i} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="bday-sel-group">
                <label className="bday-sel-label" htmlFor="bday-day">Day</label>
                <select
                  id="bday-day"
                  className="bday-select"
                  value={day}
                  onChange={e => { setDay(e.target.value); setFact(null); setError(null); }}
                >
                  <option value="">Day</option>
                  {dayOptions.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="bday-sel-group">
                <label className="bday-sel-label" htmlFor="bday-year">Year</label>
                <select
                  id="bday-year"
                  className="bday-select"
                  value={year}
                  onChange={e => { setYear(e.target.value); setFact(null); setError(null); }}
                >
                  <option value="">Year</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="bday-btn"
              disabled={!isValid || loading}
              onClick={fetchFact}
              aria-label="Reveal birthday fact"
            >
              {loading ? "✨ Searching the Archives…" : "✨ Reveal My Birthday Fact"}
            </button>

            <p className="bday-note">
              Available for any birthday from 1950 to present
            </p>
          </div>

          {loading && (
            <div className="bday-result">
              <div className="bday-loading">
                <div className="bday-loading-icons">
                  <span className="bday-loading-icon" role="img" aria-hidden="true">🎈</span>
                  <span className="bday-loading-icon" role="img" aria-hidden="true">🎁</span>
                  <span className="bday-loading-icon" role="img" aria-hidden="true">🎉</span>
                </div>
                <div className="bday-spinner" aria-hidden="true"/>
                <div>
                  <p className="bday-loading-text">{loadingMsg}</p>
                  {displayDate && (
                    <p className="bday-loading-sub">Looking up {displayDate}…</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="bday-result">
              <p className="bday-error">😕 {error}</p>
              <button className="bday-again-btn" onClick={handleReset}>Try Another Date</button>
            </div>
          )}

          {fact && !loading && (
            <div className="bday-result" role="region" aria-label="Birthday fact">
              <span className="bday-result-emoji" role="img" aria-label="party popper">🎉</span>
              <p className="bday-result-date">{displayDate}</p>
              <p className="bday-result-tag">On the day you were born</p>
              <div className="bday-divider" aria-hidden="true"/>
              <p className="bday-result-text">{fact}</p>
              <button className="bday-again-btn" onClick={handleReset}>
                Try Another Date ✦
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
