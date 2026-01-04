'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Coffee,
  Dumbbell,
  Footprints,
  Film,
  Instagram,
  Users
} from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] =
    useState<'idle' | 'success' | 'exists' | 'error'>('idle')

  async function joinWaitlist() {
    if (!email || !city) {
      setStatus('error')
      return
    }

    setLoading(true)
    setStatus('idle')

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, city: city.trim() }])

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

          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
            Create or join real time plans with people nearby.
            <br />
            Meet people through shared intent, not endless profiles.
          </p>

          {/* STATIC SOCIAL PROOF */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full">
            <Users size={14} className="text-[var(--color-accent)]" />
            <span className="text-xs font-medium text-[var(--color-accent)]">
              100+ people on the waitlist
            </span>
          </div>
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
              placeholder="Your city (e.g. Hyderabad)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />

            <button
              onClick={joinWaitlist}
              disabled={loading || !email || !city}
              className="rounded-xl bg-[var(--color-accent)] py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {loading ? 'Joining…' : 'Join the waitlist'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-green-700 text-center bg-green-50 py-2 rounded-lg">
                You’re on the list
              </p>
            )}

            {status === 'exists' && (
              <p className="text-xs text-[var(--color-muted)] text-center bg-gray-50 py-2 rounded-lg">
                You’re already on the list
              </p>
            )}

            {status === 'error' && (
              <p className="text-xs text-red-600 text-center bg-red-50 py-2 rounded-lg">
                Please fill in all fields
              </p>
            )}

            <p className="text-[11px] text-[var(--color-muted)] text-center">
              No spam. Just launch updates when we go live in your city.
            </p>
          </div>
        </div>
      </section>

      {/* INSTAGRAM CTA */}
      <section className="w-full max-w-xl">
        <a
          href="https://www.instagram.com/vibenestapp/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-white border border-[var(--color-border)] rounded-xl p-4 shadow-sm hover:border-[var(--color-accent)] transition-colors group"
        >
          <Instagram
            size={20}
            className="text-[var(--color-accent)] group-hover:scale-110 transition-transform"
          />
          <span className="text-sm font-medium text-[var(--color-text)]">
            Follow us on Instagram
          </span>
          <span className="text-xs text-[var(--color-muted)]">
            @vibenestapp
          </span>
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-xs text-[var(--color-muted)] mt-2 text-center">
        <p>© 2025 VibeNest. All rights reserved.</p>
        <p className="mt-1">Made with love in Hyderabad</p>
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
      <div className="w-11 h-11 rounded-full border border-[var(--color-border)] flex items-center justify-center bg-white">
        {icon}
      </div>
      <span className="text-xs text-[var(--color-muted)]">
        {label}
      </span>
    </div>
  )
}
