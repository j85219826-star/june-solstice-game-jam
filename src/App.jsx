import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

// IMPORTANT: For the hackathon demo, you can initialize the client.
// In production, keys should be protected, but for a pure frontend jam prototype,
// you can replace this string or grab it from environment variables.
const ai = new GoogleGenAI({ apiKey: "YOUR_GEMINI_API_KEY_HERE" });

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [currentAlignment, setCurrentAlignment] = useState('LIGHT'); // LIGHT or SHADOW
  const [aiPromptText, setAiPromptText] = useState('The Solstice begins...');
  const [loadingAi, setLoadingAi] = useState(false);
  
  const timerRef = useRef(null);
  const aiIntervalRef = useRef(null);

  // Function to call Gemini API for dynamic theme riddles
  const fetchAiSolarFlare = async () => {
    setLoadingAi(true);
    try {
      const target = Math.random() > 0.5 ? 'LIGHT' : 'SHADOW';
      setCurrentAlignment(target);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a celestial entity controlling the June Solstice. Generate a very short, one-sentence cryptic riddle or statement representing either absolute light/sunshine or absolute darkness/shadows. If the target is LIGHT, make it about the sun or longest day. If the target is SHADOW, make it about night or darkness. Target: ${target}. Do not include the word "${target}" in the response. Keep it under 15 words.`,
      });

      if (response && response.text) {
        setAiPromptText(response.text().trim());
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      // Fallback if API key isn't provided yet or fails
      const fallbacks = [
        { text: "The sun reaches its highest peak in the northern sky.", align: "LIGHT" },
        { text: "Long shadows stretch across the grass as evening falls.", align: "SHADOW" }
      ];
      const selected = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setCurrentAlignment(selected.align);
      setAiPromptText(selected.text);
    } finally {
      setLoadingAi(false);
    }
  };

  // Game Loop Controls
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('PLAYING');
    fetchAiSolarFlare();
  };

  useEffect(() => {
    if (gameState === 'PLAYING') {
      // Countdown Timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            clearInterval(aiIntervalRef.current);
            setGameState('GAMEOVER');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Fetch a new AI riddle every 6 seconds
      aiIntervalRef.current = setInterval(() => {
        fetchAiSolarFlare();
      }, 6000);
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(aiIntervalRef.current);
    };
  }, [gameState]);

  // Player Interaction Handling
  const handlePlayerChoice = (choice) => {
    if (gameState !== 'PLAYING' || loadingAi) return;

    if (choice === currentAlignment) {
      setScore((prev) => prev + 10);
      fetchAiSolarFlare(); // Instantly cycle to next challenge
    } else {
      setScore((prev) => Math.max(0, prev - 5)); // Penalty for wrong sync
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>SOLSTICE SYNC</h1>
        <p style={styles.subtitle}>A CRDT-Style Gemini AI Prompt Alignment Game</p>
      </header>

      {gameState === 'START' && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Balance the Celestial Cycle</h2>
          <p style={styles.text}>
            The June Solstice is arriving. Read the cryptic messages generated live by the 
            <strong> Gemini 2.5-Flash AI engine</strong>. Align the energy array by selecting 
            whether the statement represents Morning Light or Midnight Shadow before time runs out!
          </p>
          <button style={styles.buttonStart} onClick={startGame}>Initiate Solstice</button>
        </div>
      )}

      {gameState === 'PLAYING' && (
        <div style={styles.gameZone}>
          <div style={styles.statsBar}>
            <div style={styles.stat}>Time Remaining: <span style={styles.boldText}>{timeLeft}s</span></div>
            <div style={styles.stat}>Solar Sync Score: <span style={styles.boldText}>{score}</span></div>
          </div>

          <div style={{
            ...styles.orb,
            backgroundColor: currentAlignment === 'LIGHT' ? '#F59E0B' : '#4B5563',
            boxShadow: currentAlignment === 'LIGHT' ? '0 0 40px #F59E0B' : '0 0 40px #1F2937'
          }}>
            {loadingAi ? "🌀" : "🌞"}
          </div>

          <div style={styles.aiTerminal}>
            <span style={styles.terminalLabel}>📡 GEMINI AI LIVE SIGNAL:</span>
            <p style={styles.terminalText}>"{aiPromptText}"</p>
          </div>

          <div style={styles.buttonContainer}>
            <button 
              style={{...styles.gameButton, ...styles.lightButton}} 
              onClick={() => handlePlayerChoice('LIGHT')}
              disabled={loadingAi}
            >
              ☀️ Sync Light
            </button>
            <button 
              style={{...styles.gameButton, ...styles.shadowButton}} 
              onClick={() => handlePlayerChoice('SHADOW')}
              disabled={loadingAi}
            >
              🌙 Sync Shadow
            </button>
          </div>
        </div>
      )}

      {gameState === 'GAMEOVER' && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Solstice Stabilized!</h2>
          <p style={styles.text}>The celestial alignment sequence has closed successfully.</p>
          <div style={styles.finalScore}>Final Score: {score} points</div>
          <button style={styles.buttonStart} onClick={startGame}>Re-Align System</button>
        </div>
      )}
    </div>
  );
}

// Inline styles mimicking a sleek dark-green/blue modern UI framework
const styles = {
  container: {
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    minHeight: '100vh',
    fontFamily: '"SF Pro Display", -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    letterSpacing: '-0.05em',
    margin: '0',
    background: 'linear-gradient(to right, #38BDF8, #34D399)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    color: '#94A3B8',
    marginTop: '10px',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '500px',
    textAlign: 'center',
    border: '1px solid #334155',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  text: {
    color: '#94A3B8',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  buttonStart: {
    backgroundColor: '#10B981',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 28px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  gameZone: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '30px',
    backgroundColor: '#1E293B',
    padding: '15px 25px',
    borderRadius: '12px',
    border: '1px solid #334155',
  },
  stat: {
    fontSize: '1.1rem',
    color: '#94A3B8',
  },
  boldText: {
    color: '#F8FAFC',
    fontWeight: '700',
  },
  orb: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    marginBottom: '40px',
    transition: 'all 0.5s ease',
  },
  aiTerminal: {
    backgroundColor: '#020617',
    border: '1px solid #1E293B',
    borderRadius: '8px',
    padding: '20px',
    width: '100%',
    textAlign: 'center',
    marginBottom: '40px',
  },
  terminalLabel: {
    fontSize: '0.8rem',
    color: '#34D399',
    fontWeight: '700',
    letterSpacing: '0.05em',
  },
  terminalText: {
    fontSize: '1.25rem',
    fontStyle: 'italic',
    marginTop: '10px',
    color: '#E2E8F0',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    width: '100%',
  },
  gameButton: {
    flex: 1,
    border: 'none',
    borderRadius: '8px',
    padding: '18px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#FFFFFF',
  },
  lightButton: {
    backgroundColor: '#D97706',
  },
  shadowButton: {
    backgroundColor: '#374151',
  },
  finalScore: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#10B981',
    margin: '20px 0 40px 0',
  }
};

export default App;