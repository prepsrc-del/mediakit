import { useState } from 'react'
import Head from 'next/head'

const DEFAULT = {
  views: '2.0M', followers: '19.5K', interactions: '36.9K', reached: '489K',
  r1: 'Rs. 10,000', r2: 'Rs. 15,000', r3: 'Rs. 22,000', r4: 'Open to discuss', r5: 'Rs. 6,000'
}

export default function Admin() {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [stats, setStats] = useState(DEFAULT)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [wrongPass, setWrongPass] = useState(false)
  const [checkingPass, setCheckingPass] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setCheckingPass(true)
    setWrongPass(false)
    try {
      const res = await fetch('/api/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) setLoggedIn(true)
      else setWrongPass(true)
    } catch { setWrongPass(true) }
    setCheckingPass(false)
  }

  async function handleSave() {
    setLoading(true)
    setStatus('')
    try {
      const res = await fetch('/api/update-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, stats })
      })
      const data = await res.json()
      if (data.success) setStatus('✅ Live ho gaya!')
      else setStatus('❌ Error: ' + data.error)
    } catch { setStatus('❌ Something went wrong!') }
    setLoading(false)
  }

  if (!loggedIn) return (
    <>
      <Head><title>Admin — Media Kit</title></Head>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:#0A0A0F; font-family:'Arial',sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; padding:20px; }
        .box { background:#12121A; border:1px solid #1E1E2E; border-radius:20px; padding:32px 24px; width:100%; max-width:360px; }
        h2 { color:#F8F8FF; font-size:20px; margin-bottom:6px; }
        p { color:#6B7280; font-size:13px; margin-bottom:24px; }
        label { display:block; font-size:11px; color:#A78BFA; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px; }
        input { width:100%; background:#0A0A0F; border:1px solid #1E1E2E; border-radius:10px; padding:12px 14px; color:#F8F8FF; font-size:14px; margin-bottom:16px; }
        input:focus { outline:none; border-color:#7C3AED; }
        button { width:100%; background:#7C3AED; color:white; border:none; padding:13px; border-radius:10px; font-size:15px; font-weight:700; cursor:pointer; }
        button:disabled { opacity:0.6; }
        .err { color:#EC4899; font-size:12px; margin-top:10px; text-align:center; }
      `}</style>
      <div className="box">
        <h2>🔐 Admin Login</h2>
        <p>Media Kit admin panel</p>
        <form onSubmit={handleLogin}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
          <button type="submit" disabled={checkingPass}>{checkingPass ? '⏳ Checking...' : 'Login'}</button>
          {wrongPass && <p className="err">❌ Wrong password!</p>}
        </form>
      </div>
    </>
  )

  return (
    <>
      <Head><title>Admin — Media Kit</title></Head>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:#0A0A0F; font-family:'Arial',sans-serif; color:#E2E8F0; }
        .wrap { max-width:560px; margin:0 auto; padding:24px 16px 80px; }
        h1 { font-size:22px; color:#F8F8FF; margin-bottom:4px; }
        .sub { font-size:13px; color:#6B7280; margin-bottom:24px; }
        .section { background:#12121A; border:1px solid #1E1E2E; border-radius:16px; padding:20px; margin-bottom:14px; }
        .section-title { font-size:11px; font-weight:700; color:#A78BFA; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:14px; }
        .field { margin-bottom:12px; }
        label { display:block; font-size:11px; color:#6B7280; margin-bottom:5px; }
        input { width:100%; background:#0A0A0F; border:1px solid #1E1E2E; border-radius:8px; padding:10px 12px; color:#F8F8FF; font-size:14px; }
        input:focus { outline:none; border-color:#7C3AED; }
        .grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .save-btn { width:100%; background:#7C3AED; color:white; border:none; padding:15px; border-radius:12px; font-size:16px; font-weight:700; cursor:pointer; }
        .save-btn:disabled { opacity:0.6; }
        .status { text-align:center; margin-top:12px; font-size:15px; font-weight:600; }
        .preview { display:block; text-align:center; color:#A78BFA; font-size:13px; margin-top:14px; text-decoration:none; }
      `}</style>

      <div className="wrap">
        <h1>📊 Media Kit Admin</h1>
        <p className="sub">Stats update karo — brand ka page turant update ho jaayega!</p>

        <div className="section">
          <div className="section-title">📈 Performance Stats</div>
          <div className="grid">
            <div className="field"><label>Total Views</label><input value={stats.views} onChange={e => setStats({...stats, views: e.target.value})} /></div>
            <div className="field"><label>Followers</label><input value={stats.followers} onChange={e => setStats({...stats, followers: e.target.value})} /></div>
            <div className="field"><label>Interactions</label><input value={stats.interactions} onChange={e => setStats({...stats, interactions: e.target.value})} /></div>
            <div className="field"><label>Accounts Reached</label><input value={stats.reached} onChange={e => setStats({...stats, reached: e.target.value})} /></div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">💰 Rates</div>
          <div className="field"><label>2 UGC Reels (with collab tag)</label><input value={stats.r1} onChange={e => setStats({...stats, r1: e.target.value})} /></div>
          <div className="field"><label>2 UGC Reels (without collab tag)</label><input value={stats.r2} onChange={e => setStats({...stats, r2: e.target.value})} /></div>
          <div className="field"><label>Combo Package (all 4 Reels)</label><input value={stats.r3} onChange={e => setStats({...stats, r3: e.target.value})} /></div>
          <div className="field"><label>Ad Rights (1 Month)</label><input value={stats.r5} onChange={e => setStats({...stats, r5: e.target.value})} /></div>
          <div className="field"><label>Barter</label><input value={stats.r4} onChange={e => setStats({...stats, r4: e.target.value})} /></div>
        </div>

        <button className="save-btn" onClick={handleSave} disabled={loading}>
          {loading ? '⏳ Saving...' : '✅ Save & Go Live'}
        </button>
        {status && <p className="status">{status}</p>}
        <a href="/" className="preview" target="_blank">👁️ Preview Media Kit →</a>
      </div>
    </>
  )
}
