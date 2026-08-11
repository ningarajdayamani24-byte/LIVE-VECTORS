import { useMemo, useState } from 'react'

const GRID = 40
const ORIGIN = { x: 50, y: 50 }

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function App() {
  const [vector, setVector] = useState({ x: 180, y: -110 })
  const [showComponents, setShowComponents] = useState(true)
  const [showGrid, setShowGrid] = useState(true)

  const magnitude = useMemo(() => Math.hypot(vector.x, vector.y), [vector])
  const angle = useMemo(
    () => (Math.atan2(-vector.y, vector.x) * 180) / Math.PI,
    [vector],
  )

  const updateComponent = (axis, value) => {
    setVector((current) => ({
      ...current,
      [axis]: Number(value),
    }))
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">↗</span>
          <span>LIVE VECTORS</span>
        </div>
        <div className="topbar-meta">
          <span className="status-dot" />
          <span>VECTOR LAB / 01</span>
        </div>
      </header>

      <section className="workspace">
        <div className="workspace-heading">
          <div>
            <p className="eyebrow">KINEMATICS / FOUNDATIONS</p>
            <h1>Vector Addition</h1>
            <p className="subhead">Move the vector. Watch the mathematics respond.</p>
          </div>
          <div className="readout">
            <span>STATE</span>
            <strong>LIVE</strong>
          </div>
        </div>

        <div className="lab-grid">
          <section className="canvas-panel">
            <div className="canvas-toolbar">
              <span>COORDINATE SPACE</span>
              <div className="toolbar-actions">
                <button onClick={() => setShowGrid((value) => !value)}>
                  GRID {showGrid ? 'ON' : 'OFF'}
                </button>
                <button onClick={() => setShowComponents((value) => !value)}>
                  COMPONENTS {showComponents ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            <div className={`vector-stage ${showGrid ? '' : 'no-grid'}`}>
              <div className="axis axis-x" />
              <div className="axis axis-y" />
              <span className="axis-label x-label">x</span>
              <span className="axis-label y-label">y</span>

              {showComponents && (
                <>
                  <div
                    className="component component-x"
                    style={{ width: `${Math.abs(vector.x) / 3.2}px`, left: ORIGIN.x + '%', top: `${ORIGIN.y}%` }}
                  />
                  <div
                    className="component component-y"
                    style={{ height: `${Math.abs(vector.y) / 2.2}px`, left: `${ORIGIN.x + vector.x / 6.4}%`, top: `${ORIGIN.y}%`, transform: vector.y < 0 ? 'translateY(-100%)' : '' }}
                  />
                </>
              )}

              <div
                className="vector-line"
                style={{
                  width: `${magnitude / 3.2}px`,
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <span className="vector-head" />
              </div>

              <div className="origin-point" />
              <div className="vector-tip" style={{ left: `calc(${ORIGIN.x}% + ${vector.x / 6.4}%)`, top: `calc(${ORIGIN.y}% + ${vector.y / 4.4}%)` }} />
              <span className="origin-label">O</span>
              <span className="vector-label">A</span>
            </div>
          </section>

          <aside className="control-panel">
            <div className="panel-section">
              <p className="eyebrow">VECTOR A</p>
              <div className="metric-main">
                <strong>{magnitude.toFixed(1)}</strong>
                <span>units</span>
              </div>
              <div className="metric-row">
                <span>θ</span>
                <strong>{angle.toFixed(1)}°</strong>
              </div>
            </div>

            <div className="panel-section controls">
              <label>
                <span>X COMPONENT</span>
                <output>{vector.x}</output>
              </label>
              <input type="range" min="-240" max="240" value={vector.x} onChange={(event) => updateComponent('x', event.target.value)} />

              <label>
                <span>Y COMPONENT</span>
                <output>{vector.y}</output>
              </label>
              <input type="range" min="-180" max="180" value={vector.y} onChange={(event) => updateComponent('y', event.target.value)} />
            </div>

            <div className="equation">
              <span>MAGNITUDE</span>
              <code>|A| = √(Aₓ² + Aᵧ²)</code>
              <code>|A| = {magnitude.toFixed(2)}</code>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
