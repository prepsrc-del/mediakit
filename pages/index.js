import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Head from 'next/head'

const DEFAULT = {
  views: '2.0M', followers: '19.5K', interactions: '36.9K', reached: '489K',
  r1: 'Rs. 10,000', r2: 'Rs. 15,000', r3: 'Rs. 22,000', r4: 'Open to discuss', r5: 'Rs. 6,000'
}

export default function MediaKit() {
  const [stats, setStats] = useState(DEFAULT)

  useEffect(() => {
    async function fetchStats() {
      const { data } = await supabase.from('stats').select('key, value')
      if (data && data.length > 0) {
        const obj = {}
        data.forEach(({ key, value }) => { obj[key] = value })
        setStats(prev => ({ ...prev, ...obj }))
      }
    }
    fetchStats()
  }, [])

  return (
    <>
      <Head>
        <title>Danish Ali — Media Kit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --bg: #0A0A0F; --card: #12121A; --border: #1E1E2E;
          --purple: #7C3AED; --purple-light: #A78BFA; --purple-glow: rgba(124,58,237,0.15);
          --green: #10B981; --yellow: #F59E0B; --pink: #EC4899;
          --white: #F8F8FF; --gray: #6B7280; --cyan: #06B6D4;
        }
        body { background: var(--bg); color: #E2E8F0; font-family: 'Space Grotesk', sans-serif; }
        .kit { max-width: 680px; margin: 0 auto; padding: 24px 16px 60px; }

        /* HERO */
        .hero { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 28px 24px; margin-bottom: 20px; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; background: radial-gradient(circle, var(--purple-glow) 0%, transparent 70%); pointer-events: none; }
        .hero-top { display: flex; align-items: center; gap: 18px; margin-bottom: 16px; }
        .avatar { width: 76px; height: 76px; border-radius: 50%; background: linear-gradient(135deg, var(--purple), #EC4899); display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 700; color: white; flex-shrink: 0; border: 2px solid var(--purple); box-shadow: 0 0 24px rgba(124,58,237,0.4); font-family: 'Space Mono', monospace; }
        .hero-name { font-size: 24px; font-weight: 700; color: var(--white); margin-bottom: 3px; }
        .hero-handle { font-size: 13px; color: var(--purple-light); font-family: 'Space Mono', monospace; margin-bottom: 8px; }
        .verified { display: inline-block; background: rgba(29,155,240,0.1); border: 1px solid rgba(29,155,240,0.3); color: #1D9BF0; padding: 3px 8px; border-radius: 50px; font-size: 10px; font-weight: 600; }
        .hero-niche { display: inline-flex; align-items: center; gap: 6px; background: var(--purple-glow); border: 1px solid var(--purple); color: var(--purple-light); padding: 7px 16px; border-radius: 50px; font-size: 12px; font-weight: 600; }

        /* SECTION TITLE */
        .section-title { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--purple-light); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        /* STATS 2x2 */
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px 16px; text-align: center; position: relative; overflow: hidden; }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 16px 16px 0 0; }
        .stat-card.purple::before { background: var(--purple); }
        .stat-card.green::before { background: var(--green); }
        .stat-card.yellow::before { background: var(--yellow); }
        .stat-card.pink::before { background: var(--pink); }
        .stat-value { font-size: 26px; font-weight: 700; margin-bottom: 5px; font-family: 'Space Mono', monospace; }
        .stat-card.purple .stat-value { color: var(--purple-light); }
        .stat-card.green .stat-value { color: var(--green); }
        .stat-card.yellow .stat-value { color: var(--yellow); }
        .stat-card.pink .stat-value { color: var(--pink); }
        .stat-label { font-size: 11px; color: var(--gray); font-weight: 500; }

        /* RATES */
        .rates-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .rate-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px 18px; display: flex; justify-content: space-between; align-items: center; border-left: 3px solid; }
        .rate-card.c1 { border-left-color: var(--purple); }
        .rate-card.c2 { border-left-color: var(--green); }
        .rate-card.c3 { border-left-color: var(--yellow); }
        .rate-card.c4 { border-left-color: var(--pink); }
        .rate-card.c5 { border-left-color: var(--cyan); }
        .rate-desc { font-size: 13px; color: var(--gray); max-width: 60%; }
        .rate-price { font-size: 17px; font-weight: 700; font-family: 'Space Mono', monospace; }
        .rate-card.c1 .rate-price { color: var(--purple-light); }
        .rate-card.c2 .rate-price { color: var(--green); }
        .rate-card.c3 .rate-price { color: var(--yellow); }
        .rate-card.c4 .rate-price { color: var(--pink); }
        .rate-card.c5 .rate-price { color: var(--cyan); }

        /* CONTACT */
        .contact-wrap { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-bottom: 32px; }
        .contact-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid var(--border); }
        .contact-item:last-child { border-bottom: none; }
        .contact-lbl { font-size: 11px; color: var(--gray); text-transform: uppercase; letter-spacing: 0.08em; }
        .contact-val { font-size: 13px; font-weight: 600; color: var(--purple-light); font-family: 'Space Mono', monospace; }

        .footer { text-align: center; font-size: 10px; color: var(--gray); font-family: 'Space Mono', monospace; }
        .footer span { color: var(--purple-light); }
      `}</style>

      <div className="kit">
        {/* HERO */}
        <div className="hero">
          <div className="hero-top">
            <div className="avatar">DA</div>
            <div>
              <div className="hero-name">Danish Ali</div>
              <div className="hero-handle">@tech_stack01 <span className="verified">✓ Verified</span></div>
            </div>
          </div>
          <div className="hero-niche">🤖 AI & Tech — Simplified for You</div>
        </div>

        {/* STATS */}
        <div className="section-title">Performance — Last 30 Days</div>
        <div className="stats-grid">
          <div className="stat-card purple">
            <div className="stat-value">{stats.views}</div>
            <div className="stat-label">Total Views</div>
          </div>
          <div className="stat-card green">
            <div className="stat-value">{stats.followers}</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="stat-card yellow">
            <div className="stat-value">{stats.interactions}</div>
            <div className="stat-label">Interactions</div>
          </div>
          <div className="stat-card pink">
            <div className="stat-value">{stats.reached}</div>
            <div className="stat-label">Accounts Reached</div>
          </div>
        </div>

        {/* RATES */}
        <div className="section-title">Collaboration Rates</div>
        <div className="rates-grid">
          <div className="rate-card c1">
            <span className="rate-desc">2 UGC Reels (with collab tag)</span>
            <span className="rate-price">{stats.r1}</span>
          </div>
          <div className="rate-card c2">
            <span className="rate-desc">2 UGC Reels (without collab tag)</span>
            <span className="rate-price">{stats.r2}</span>
          </div>
          <div className="rate-card c3">
            <span className="rate-desc">Combo Package (all 4 Reels)</span>
            <span className="rate-price">{stats.r3}</span>
          </div>
          <div className="rate-card c5">
            <span className="rate-desc">Ad Rights (1 Month)</span>
            <span className="rate-price">{stats.r5}</span>
          </div>
          <div className="rate-card c4">
            <span className="rate-desc">Barter Collaboration</span>
            <span className="rate-price">{stats.r4}</span>
          </div>
        </div>

        {/* CONTACT */}
        <div className="section-title">Contact</div>
        <div className="contact-wrap">
          <div className="contact-item">
            <span className="contact-lbl">Instagram</span>
            <span className="contact-val">@tech_stack01</span>
          </div>
          <div className="contact-item">
            <span className="contact-lbl">Email</span>
            <span className="contact-val">Danishali19ims@gmail.com</span>
          </div>
          <div className="contact-item">
            <span className="contact-lbl">Phone</span>
            <span className="contact-val">+91 9536025616</span>
          </div>
        </div>

        <div className="footer"><span>Danish Ali</span> · @tech_stack01 · AI & Tech Simplified</div>
      </div>
    </>
  )
}
