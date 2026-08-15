'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';

// A lightweight, in-browser code runtime for lessons that involve coding.
// No npm packages, no external sandbox service — just an iframe running
// on `srcDoc`, sandboxed so the code can't touch the rest of the page.
// Work is auto-saved to localStorage per lesson so it survives a refresh.
//
// console.log/warn/error/info calls made inside the student's JS are
// captured via postMessage and shown in a real console panel, and runtime
// errors are caught and shown the same way — closer to a real dev tool.

const DEFAULT_HTML = `<h1>Hello, Kingshima!</h1>
<p>Edit the HTML, CSS and JS tabs — the preview updates as you type.</p>`;

const DEFAULT_CSS = `body {
  font-family: sans-serif;
  padding: 1.5rem;
  color: #1a1a1a;
  background: #ffffff;
}
h1 {
  color: #ff6d40;
}`;

const DEFAULT_JS = `// Try adding some interactivity
console.log('Playground ready!');`;

function loadSaved(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

// Injected into the iframe so we can see console output and errors from
// the parent page, since the iframe is sandboxed and otherwise silent.
function buildRuntimeScript() {
  return `
    <script>
      (function () {
        function serialize(arg) {
          if (typeof arg === 'string') return arg;
          try { return JSON.stringify(arg); } catch (e) { return String(arg); }
        }
        function send(type, args) {
          try {
            window.parent.postMessage({ __playground: true, type, args: args.map(serialize) }, '*');
          } catch (e) {}
        }
        ['log', 'warn', 'error', 'info'].forEach(function (method) {
          var original = console[method];
          console[method] = function () {
            send(method, Array.prototype.slice.call(arguments));
            original.apply(console, arguments);
          };
        });
        window.addEventListener('error', function (e) {
          send('error', [e.message]);
        });
      })();
    <\/script>
  `;
}

export default function CodePlayground({ storageKey = 'playground' }) {
  const [tab, setTab] = useState('html');
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [hydrated, setHydrated] = useState(false);
  const [logs, setLogs] = useState([]);
  const iframeRef = useRef(null);

  // Load any saved work for this specific lesson once, on mount.
  useEffect(() => {
    setHtml(loadSaved(`${storageKey}_html`, DEFAULT_HTML));
    setCss(loadSaved(`${storageKey}_css`, DEFAULT_CSS));
    setJs(loadSaved(`${storageKey}_js`, DEFAULT_JS));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const persist = (key, value) => {
    if (typeof window !== 'undefined') window.localStorage.setItem(key, value);
  };

  const srcDoc = useMemo(() => `
    <html>
      <head>
        <style>${css}</style>
        ${buildRuntimeScript()}
      </head>
      <body>
        ${html}
        <script>
          try {
            ${js}
          } catch (err) {
            console.error(err && err.message ? err.message : String(err));
          }
        <\/script>
      </body>
    </html>
  `, [html, css, js]);

  // Every time the preview reloads (code changed), the old console output
  // is stale — clear it so students aren't reading last run's logs.
  useEffect(() => {
    setLogs([]);
  }, [srcDoc]);

  // Listen for console/error messages posted from inside the iframe.
  useEffect(() => {
    function handleMessage(e) {
      if (!e.data || !e.data.__playground) return;
      setLogs((prev) => [...prev, { type: e.data.type, text: e.data.args.join(' '), id: `${Date.now()}-${Math.random()}` }].slice(-50));
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleReset = () => {
    if (!window.confirm('Reset this playground back to the starting code? This clears your changes.')) return;
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
    setLogs([]);
    persist(`${storageKey}_html`, DEFAULT_HTML);
    persist(`${storageKey}_css`, DEFAULT_CSS);
    persist(`${storageKey}_js`, DEFAULT_JS);
  };

  if (!hydrated) return null;

  const tabs = [
    { key: 'html', label: 'HTML', value: html, onChange: (v) => { setHtml(v); persist(`${storageKey}_html`, v); } },
    { key: 'css', label: 'CSS', value: css, onChange: (v) => { setCss(v); persist(`${storageKey}_css`, v); } },
    { key: 'js', label: 'JS', value: js, onChange: (v) => { setJs(v); persist(`${storageKey}_js`, v); } },
  ];
  const activeTab = tabs.find((t) => t.key === tab);

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', marginTop: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex' }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              style={{
                padding: '0.5rem 1.1rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: tab === t.key ? 'rgba(255,255,255,0.07)' : 'transparent',
                border: 'none',
                borderBottom: tab === t.key ? '2px solid var(--accent-primary, #ff6d40)' : '2px solid transparent',
                color: tab === t.key ? '#fff' : 'var(--text-muted, #9ca3af)',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleReset}
          title="Reset to starting code"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted, #9ca3af)',
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.4rem 0.85rem',
          }}
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 260 }}>
        <textarea
          value={activeTab.value}
          onChange={(e) => activeTab.onChange(e.target.value)}
          spellCheck={false}
          aria-label={`${activeTab.label} code`}
          style={{
            background: '#0d0d0f',
            color: '#e5e5e5',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            padding: '0.85rem',
            border: 'none',
            outline: 'none',
            resize: 'vertical',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          }}
        />
        <iframe
          ref={iframeRef}
          title="Live preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          style={{ width: '100%', height: '100%', minHeight: 260, background: '#ffffff', border: 'none' }}
        />
      </div>

      {/* ── Console panel ─────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.85rem', background: 'rgba(255,255,255,0.02)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.03em', color: 'var(--text-muted, #9ca3af)', textTransform: 'uppercase' }}>
            Console
          </span>
          {logs.length > 0 && (
            <button
              type="button"
              onClick={() => setLogs([])}
              title="Clear console"
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', border: 'none', color: 'var(--text-muted, #9ca3af)', cursor: 'pointer', fontSize: '0.7rem' }}
            >
              <Trash2 size={12} /> Clear
            </button>
          )}
        </div>
        <div style={{ maxHeight: 120, overflowY: 'auto', background: '#0a0a0b', padding: logs.length ? '0.5rem 0.85rem' : 0 }}>
          {logs.length === 0 ? (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted, #6b7280)', padding: '0.5rem 0.85rem', margin: 0 }}>
              console.log output and errors from your JS will show up here when you run code.
            </p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '0.78rem',
                  padding: '0.15rem 0',
                  color: log.type === 'error' ? '#f87171' : log.type === 'warn' ? '#fbbf24' : '#e5e5e5',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {log.type === 'error' ? '✕ ' : log.type === 'warn' ? '⚠ ' : '› '}{log.text}
              </div>
            ))
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted, #9ca3af)', padding: '0.5rem 0.85rem', margin: 0 }}>
        Runs entirely in your browser — nothing to install. Your code is saved automatically as you type.
      </p>
    </div>
  );
}
