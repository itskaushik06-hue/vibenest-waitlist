'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Coffee,
  Dumbbell,
  Footprints,
  Film
} from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] =
    useState<'idle' | 'success' | 'exists' | 'error'>('idle')

  async function joinWaitlist() {
    if (!email) return

    setLoading(true)
    setStatus('idle')

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, city }])

    if (error) {
      if (error.code === '23505') {
        setStatus('exists')
      } else {
        setStatus('error')
      }
    } else {
      setStatus('success')
      setEmail('')
      setCity('')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-pattern flex flex-col items-center px-4 py-8 gap-10">

      {/* HERO */}
      <section className="w-full max-w-xl">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 text-center shadow-sm">
          <h1 className="brand text-3xl font-bold mb-2">
            VibeNest
          </h1>

          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            Create or join real time plans with people nearby.
            <br />
            Meet people through shared intent, not endless profiles.
          </p>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="w-full max-w-xl text-center">
        <h2 className="brand text-base font-semibold mb-4">
          Meet over shared activities
        </h2>

        <div className="grid grid-cols-2 gap-5">
          <IconItem icon={<Coffee size={22} />} label="Food" />
          <IconItem icon={<Dumbbell size={22} />} label="Sports" />
          <IconItem icon={<Footprints size={22} />} label="Walks" />
          <IconItem icon={<Film size={22} />} label="Movies" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full max-w-xl">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 text-center">
          <h3 className="brand text-base font-semibold mb-2">
            How VibeNest works
          </h3>

          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            VibeNest helps you discover people nearby who want to do the same
            things as you, now or soon.
            <br /><br />
            Instead of swiping on profiles, you join or create real world plans,
            see who is interested, and decide if it feels right.
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="w-full max-w-xl">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
          <h4 className="brand text-base font-semibold mb-1 text-center">
            Be the first to know
          </h4>

          <p className="text-xs text-[var(--color-muted)] mb-4 text-center">
            Launching city by city.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />

            <input
              type="text"
              placeholder="Your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />

            <button
              onClick={joinWaitlist}
              disabled={loading}
              className="rounded-xl bg-[var(--color-accent)] py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Joining…' : 'Join the waitlist'}
            </button>

            {/* TRUST MICRO-COPY */}
            <p className="text-[11px] text-[var(--color-muted)] text-center">
              No spam. Just launch updates.
            </p>

            {status === 'success' && (
              <p className="text-xs text-green-600 text-center mt-1">
                You’re on the list ✨
              </p>
            )}

            {status === 'exists' && (
              <p className="text-xs text-[var(--color-muted)] text-center mt-1">
                You’re already on the list 👀
              </p>
            )}

            {status === 'error' && (
              <p className="text-xs text-red-600 text-center mt-1">
                Something went wrong. Try again.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-xs text-[var(--color-muted)] mt-2">
        © 2026 VibeNest. All rights reserved.
      </footer>

    </main>
  )
}

function IconItem({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-11 h-11 rounded-full border border-[var(--color-border)] flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-[var(--color-muted)]">
        {label}
      </span>
    </div>
  )
}
