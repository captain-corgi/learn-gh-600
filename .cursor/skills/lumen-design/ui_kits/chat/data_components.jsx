// ui_kits/chat/data_components.jsx — BI / data-analysis components for Lumen chat

// ---------- Helpers ----------
function fmtNum(n, opts = {}) {
  if (opts.money) return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (opts.pct)   return (n > 0 ? '+' : '') + n.toFixed(1) + '%';
  return n.toLocaleString('en-US');
}

// ---------- Sparkline (inline SVG) ----------
function Sparkline({ values, width = 64, height = 18, color }) {
  if (!values || !values.length) return null;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1 || 1);
  const pts = values.map((v, i) => [i * step, height - ((v - min) / range) * (height - 2) - 1]);
  const d = 'M' + pts.map(p => p.map(n => n.toFixed(1)).join(',')).join(' L ');
  const fill = d + ` L ${width},${height} L 0,${height} Z`;
  return (
    <svg className="sparkline" width={width} height={height} viewBox={`0 0 ${width} ${height}`}
         style={color ? { '--accent': color } : undefined}>
      <path className="fill" d={fill} />
      <path d={d} />
    </svg>
  );
}

// ---------- KPI tile ----------
function KPI({ label, value, delta, sparkline, money, pct }) {
  const up = delta != null && delta >= 0;
  return (
    <div className="kpi">
      <div className="lbl">{label}</div>
      <div className="row">
        <div className="val">{typeof value === 'number' ? fmtNum(value, { money, pct }) : value}</div>
        {delta != null && (
          <div className={'delta ' + (up ? 'up' : 'down')}>
            <Icon name={up ? 'trending-up' : 'trending-down'} size={12} />
            {(up ? '+' : '') + delta.toFixed(1)}%
          </div>
        )}
      </div>
      {sparkline && <Sparkline values={sparkline} width={120} height={22} color={up ? 'var(--delta-up)' : 'var(--delta-down)'} />}
    </div>
  );
}

function KPIRow({ children }) {
  return <div className="kpi-row">{children}</div>;
}

// ---------- Source chip ----------
function SourceChip({ source, rows }) {
  return (
    <span className="source-chip">
      <Icon name="database" size={12} />
      <span>From <b>{source}</b>{rows != null ? ' · ' + rows.toLocaleString() + ' rows' : ''}</span>
    </span>
  );
}

// ---------- Chart scaffold ----------
function ChartCard({ title, subtitle, legend, foot, children, actions = true }) {
  return (
    <div className="chart-card">
      <div className="chart-head">
        <div>
          <div className="chart-title">{title}</div>
          {subtitle && <div className="chart-sub">{subtitle}</div>}
        </div>
        {actions && (
          <div className="chart-actions">
            <button className="icon-btn" title="Open"><Icon name="maximize-2" size={15}/></button>
            <button className="icon-btn" title="Download"><Icon name="download" size={15}/></button>
          </div>
        )}
      </div>
      {legend && (
        <div className="chart-legend">
          {legend.map((l, i) => (
            <span className="item" key={i}>
              <span className="dot" style={{ background: l.color }} /> {l.label}
            </span>
          ))}
        </div>
      )}
      <div className="chart-body">{children}</div>
      {foot && <div className="chart-foot">{foot}</div>}
    </div>
  );
}

// ---------- Bar chart ----------
function BarChart({ data, height = 200, valueFmt = (n) => n.toLocaleString() }) {
  // data: [{ label, value, color? }]
  const W = 560, H = height;
  const pad = { l: 44, r: 12, t: 10, b: 28 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const max = Math.max(...data.map(d => d.value)) * 1.1;
  const bw = iw / data.length * 0.62;
  const step = iw / data.length;

  // y ticks
  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => max * i / ticks);

  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`}>
      {yTicks.map((t, i) => {
        const y = pad.t + ih - (t / max) * ih;
        return (
          <g key={i}>
            <line className="grid" x1={pad.l} x2={W - pad.r} y1={y} y2={y} />
            <text className="axis-text" x={pad.l - 6} y={y + 3} textAnchor="end">{valueFmt(Math.round(t))}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const x = pad.l + i * step + (step - bw) / 2;
        const h = (d.value / max) * ih;
        const y = pad.t + ih - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} rx={3} fill={d.color || 'var(--chart-1)'} />
            <text className="axis-text" x={x + bw / 2} y={H - 10} textAnchor="middle">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------- Line chart ----------
function LineChart({ series, labels, height = 220, valueFmt = (n) => n.toLocaleString() }) {
  // series: [{ name, color, values: [] }]
  const W = 560, H = height;
  const pad = { l: 44, r: 12, t: 10, b: 28 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const all = series.flatMap(s => s.values);
  const min = Math.min(...all), max = Math.max(...all);
  const range = max - min || 1;
  const step = iw / (labels.length - 1 || 1);

  const path = (vals) => vals.map((v, i) => {
    const x = pad.l + i * step;
    const y = pad.t + ih - ((v - min) / range) * ih;
    return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');

  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => min + (range * i / ticks));

  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`}>
      {yTicks.map((t, i) => {
        const y = pad.t + ih - ((t - min) / range) * ih;
        return (
          <g key={i}>
            <line className="grid" x1={pad.l} x2={W - pad.r} y1={y} y2={y} />
            <text className="axis-text" x={pad.l - 6} y={y + 3} textAnchor="end">{valueFmt(Math.round(t))}</text>
          </g>
        );
      })}
      {labels.map((lbl, i) => {
        if (i % Math.ceil(labels.length / 8) !== 0 && i !== labels.length - 1) return null;
        const x = pad.l + i * step;
        return <text key={i} className="axis-text" x={x} y={H - 10} textAnchor="middle">{lbl}</text>;
      })}
      {series.map((s, i) => (
        <g key={i}>
          <path d={path(s.values)} fill="none" stroke={s.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          {s.values.map((v, j) => {
            const x = pad.l + j * step;
            const y = pad.t + ih - ((v - min) / range) * ih;
            return <circle key={j} cx={x} cy={y} r="2.5" fill={s.color} />;
          })}
        </g>
      ))}
    </svg>
  );
}

// ---------- Area chart ----------
function AreaChart({ values, labels, height = 180, color = 'var(--chart-1)' }) {
  const W = 560, H = height;
  const pad = { l: 44, r: 12, t: 10, b: 28 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const max = Math.max(...values) * 1.1;
  const step = iw / (values.length - 1 || 1);
  const pts = values.map((v, i) => [pad.l + i * step, pad.t + ih - (v / max) * ih]);
  const d = 'M' + pts.map(p => p.map(n => n.toFixed(1)).join(',')).join(' L ');
  const fill = d + ` L ${pad.l + iw},${pad.t + ih} L ${pad.l},${pad.t + ih} Z`;
  const id = 'ag_' + Math.random().toString(36).slice(2, 8);
  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((p, i) => {
        const y = pad.t + ih * (1 - p);
        return <line key={i} className="grid" x1={pad.l} x2={W - pad.r} y1={y} y2={y} />;
      })}
      <path d={fill} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {labels.map((lbl, i) => {
        if (i % Math.ceil(labels.length / 8) !== 0 && i !== labels.length - 1) return null;
        return <text key={i} className="axis-text" x={pad.l + i * step} y={H - 10} textAnchor="middle">{lbl}</text>;
      })}
    </svg>
  );
}

// ---------- Donut chart ----------
function DonutChart({ data, size = 180, thickness = 28 }) {
  // data: [{ label, value, color }]
  const total = data.reduce((a, d) => a + d.value, 0);
  const r = size / 2 - 4;
  const ri = r - thickness;
  const cx = size / 2, cy = size / 2;
  let angle = -Math.PI / 2;

  const arc = (a0, a1) => {
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + Math.cos(a0) * r, y0 = cy + Math.sin(a0) * r;
    const x1 = cx + Math.cos(a1) * r, y1 = cy + Math.sin(a1) * r;
    const xi1 = cx + Math.cos(a1) * ri, yi1 = cy + Math.sin(a1) * ri;
    const xi0 = cx + Math.cos(a0) * ri, yi0 = cy + Math.sin(a0) * ri;
    return `M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} L${xi1},${yi1} A${ri},${ri} 0 ${large} 0 ${xi0},${yi0} Z`;
  };

  return (
    <div style={{ display:'flex', alignItems:'center', gap:24, padding:'8px 12px' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
        {data.map((d, i) => {
          const a0 = angle;
          const a1 = angle + (d.value / total) * Math.PI * 2;
          angle = a1;
          return <path key={i} d={arc(a0, a1)} fill={d.color} />;
        })}
        <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="var(--font-serif)" fontSize="22" fontWeight="500" fill="var(--fg-1)">{total.toLocaleString()}</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="10" letterSpacing="0.08em" fill="var(--fg-3)">TOTAL</text>
      </svg>
      <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:13, color:'var(--fg-1)', fontFamily:'var(--font-sans)' }}>
        {data.map((d, i) => {
          const p = (d.value / total) * 100;
          return (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:10, height:10, borderRadius:2, background:d.color, flexShrink:0 }}/>
              <span style={{ flex:1 }}>{d.label}</span>
              <span style={{ color:'var(--fg-3)', fontVariantNumeric:'tabular-nums' }}>{p.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Data table ----------
function DataTable({ title, meta, columns, rows, showBar, footer }) {
  // columns: [{ key, label, type: 'text'|'num'|'bar', max? }]
  const maxByKey = {};
  columns.forEach(c => {
    if (c.type === 'bar' || showBar === c.key) {
      maxByKey[c.key] = Math.max(...rows.map(r => r[c.key]));
    }
  });
  return (
    <div className="table-card">
      {title && (
        <div className="table-head-bar">
          <span className="tt">{title}</span>
          {meta && <span className="meta">{meta}</span>}
        </div>
      )}
      <table className="dtable">
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} className={c.type === 'num' || c.type === 'bar' ? 'num' : ''}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map(c => {
                if (c.type === 'bar') {
                  const pct = (r[c.key] / maxByKey[c.key]) * 100;
                  return (
                    <td key={c.key} className="num bar-cell">
                      {typeof r[c.key] === 'number' ? r[c.key].toLocaleString() : r[c.key]}
                      <span className="bar"><i style={{ width: pct + '%', background: c.color || 'var(--chart-1)' }} /></span>
                    </td>
                  );
                }
                if (c.type === 'num') return <td key={c.key} className="num">{typeof r[c.key] === 'number' ? r[c.key].toLocaleString() : r[c.key]}</td>;
                return <td key={c.key}>{r[c.key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {footer && (
        <div className="table-foot">
          <span>{footer}</span>
          <span className="pager">
            <button><Icon name="chevron-left" size={12}/></button>
            <button><Icon name="chevron-right" size={12}/></button>
          </span>
        </div>
      )}
    </div>
  );
}

// ---------- Insight callout ----------
function Insight({ kind = 'insight', title, children }) {
  const icons = { insight: 'sparkles', warning: 'alert-triangle', trend: 'trending-up' };
  return (
    <div className="insight">
      <div className="dot"><Icon name={icons[kind] || 'sparkles'} size={15} /></div>
      <div className="body">
        <div className="hd">{kind === 'warning' ? 'Anomaly' : kind === 'trend' ? 'Trend' : 'Insight'}</div>
        <div className="title">{title}</div>
        {children && <div className="sub">{children}</div>}
      </div>
    </div>
  );
}

// ---------- Quote block ----------
function Quote({ children, cite }) {
  return (
    <blockquote className="quote">
      {children}
      {cite && <cite>{cite}</cite>}
    </blockquote>
  );
}

// ---------- SQL / Query block ----------
function QueryBlock({ lang = 'sql', code, rows, runtime }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="query-card">
      <div className="query-head">
        <span className="left"><Icon name="terminal" size={13}/>{lang}</span>
        <span className="act">
          <button onClick={() => { navigator.clipboard?.writeText(code.replace(/<[^>]+>/g, '')); setCopied(true); setTimeout(()=>setCopied(false),1400); }}>
            <Icon name={copied ? 'check' : 'copy'} size={12}/>{copied ? 'Copied' : 'Copy'}
          </button>
          <button><Icon name="play" size={12}/>Run again</button>
        </span>
      </div>
      <pre dangerouslySetInnerHTML={{ __html: code }} />
      {(rows != null || runtime) && (
        <div className="query-foot">
          {rows != null && <>Returned <b style={{ color: '#e8dfd1' }}>{rows.toLocaleString()}</b> rows</>}
          {runtime && <> · {runtime}</>}
        </div>
      )}
    </div>
  );
}

// ---------- Dataset preview ----------
function Dataset({ name, meta }) {
  return (
    <div className="dataset">
      <div className="ico"><Icon name="table" size={18}/></div>
      <div className="meta">
        <div className="n">{name}</div>
        <div className="s">{meta}</div>
      </div>
      <button className="icon-btn"><Icon name="external-link" size={15}/></button>
    </div>
  );
}

Object.assign(window, {
  Sparkline, KPI, KPIRow, SourceChip, ChartCard,
  BarChart, LineChart, AreaChart, DonutChart,
  DataTable, Insight, Quote, QueryBlock, Dataset,
  fmtNum,
});
