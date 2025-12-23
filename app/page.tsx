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
  const [status, setStatus] = useState<'idle' | 'success' | 'exists' | 'error'>('idle')

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
    <main className="min-h-screen bg-pattern flex flex-col items-center px-4 py-12 sm:py-16 gap-16">

      {/* HERO */}
      <section className="w-full max-w-xl">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 text-center shadow-sm">
          <h1 className="brand text-3xl sm:text-4xl font-bold mb-3">
            VibeNest
          </h1>

          <p className="text-sm sm:text-base text-[var(--color-muted)]">
            Meet people the way it actually happens.
            <br />
            Real time. Real activities.
          </p>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="w-full max-w-xl text-center">
        <h2 className="brand text-lg font-semibold mb-6">
          Meet over what you actually want to do
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <IconItem icon={<Coffee size={18} />} label="Food" />
          <IconItem icon={<Dumbbell size={18} />} label="Sports" />
          <IconItem icon={<Footprints size={18} />} label="Walks" />
          <IconItem icon={<Film size={18} />} label="Movies" />
        </div>
      </section>

      {/* WHY */}
      <section className="w-full max-w-xl">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="brand text-lg font-semibold mb-3">
            This is how real socialising happens
          </h3>

          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            You talk before you meet. You understand the vibe.
            No swiping. No pressure to impress.
            Just people meeting around shared intent.
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="w-full max-w-xl">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h4 className="brand text-base font-semibold mb-1 text-center">
            Be the first to know
          </h4>

          <p className="text-xs text-[var(--color-muted)] mb-5 text-center">
            We’re launching city by city.
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

            {status === 'success' && (
              <p className="text-xs text-green-600 text-center mt-2">
                You’re on the list ✨
              </p>
            )}

            {status === 'exists' && (
              <p className="text-xs text-[var(--color-muted)] text-center mt-2">
                You’re already on the list 👀
              </p>
            )}

            {status === 'error' && (
              <p className="text-xs text-red-600 text-center mt-2">
                Something went wrong. Try again.
              </p>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}

function IconItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-[var(--color-muted)]">
        {label}
      </span>
    </div>
  )
}
