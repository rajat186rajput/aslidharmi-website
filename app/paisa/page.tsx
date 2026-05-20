"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface DashboardData {
  total_donations_cash: number;
  total_donations_inkind: number;
  total_expenses: number;
  unutilized_balance: number;
  generated_at: string;
  by_sub_system: Record<string, number>;
  recent_transactions: Array<{
    date: string;
    type: string;
    amount: number;
    sub_system: string;
    description: string;
    donor?: string;
  }>;
}

const SUB_SYSTEM_LABELS: Record<string, string> = {
  content_creation: "Content Banane Mein",
  women_empowerment: "Mahila Sashaktikaran Mein",
  self_sustainable: "Self-Sustainable Projects Mein",
  sangha: "Sangha App Mein",
  movement_wide: "Movement Admin Mein",
};

function StatCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      viewport={{ once: true }}
      className="p-8 border border-cream/10"
    >
      <p className="font-sans text-xs uppercase tracking-widest text-cream/40 mb-3">{label}</p>
      <p className="font-heading text-4xl text-cream font-semibold mb-1">
        ₹{value.toLocaleString("en-IN")}
      </p>
      {sub && <p className="font-sans text-xs text-cream/30">{sub}</p>}
    </motion.div>
  );
}

export default function PaisaPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/paisa")
      .then(r => r.json())
      .then(setData)
      .catch(() => {
        // Fallback to static dashboard.json
        fetch("/dashboard.json")
          .then(r => r.json())
          .then(setData)
          .catch(() => {});
      });
  }, []);

  // Placeholder data while loading or if no data
  const d: DashboardData = data ?? {
    total_donations_cash: 0,
    total_donations_inkind: 0,
    total_expenses: 0,
    unutilized_balance: 0,
    generated_at: new Date().toISOString(),
    by_sub_system: {},
    recent_transactions: [],
  };

  const totalIn = d.total_donations_cash + d.total_donations_inkind;
  const maxSubSystem = Math.max(...Object.values(d.by_sub_system), 1);

  return (
    <main className="bg-charcoal text-cream min-h-screen">

      {/* ── HEADER ── */}
      <section className="pt-32 pb-20 px-6 md:px-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-4xl relative"
        >
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">Transparency</p>
          <h1 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92] mb-6">
            Paisa Kahan<br />
            <em className="text-ochre">Ja Raha Hai</em>
          </h1>
          <p className="font-sans text-xl text-cream/50 max-w-xl leading-relaxed">
            Har rupaya public hai. Kuch bhi chhupaana nahi.
            Jo bhi donation aata hai — uska ek-ek rupaya yahan dikhta hai.
          </p>
        </motion.div>
      </section>

      {/* ── STAT CARDS ── */}
      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">Abhi Tak Ka Hisaab</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <StatCard label="Total Donations (Cash)" value={d.total_donations_cash} />
            <StatCard label="Total Donations (In-Kind)" value={d.total_donations_inkind} />
            <StatCard label="Total Spent" value={d.total_expenses} />
            <StatCard label="Bacha Hua (Unutilized)" value={d.unutilized_balance} sub={`${totalIn > 0 ? Math.round((d.unutilized_balance / totalIn) * 100) : 0}% of total received`} />
          </div>
        </div>
      </section>

      {/* ── SUB-SYSTEM BREAKDOWN ── */}
      {Object.keys(d.by_sub_system).length > 0 && (
        <section className="px-6 md:px-16 py-16 border-t border-cream/8">
          <div className="max-w-3xl mx-auto">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">Kahan Gaya Paisa</p>
            <div className="space-y-5">
              {Object.entries(d.by_sub_system).map(([key, val], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-sans text-sm text-cream/60">{SUB_SYSTEM_LABELS[key] ?? key}</p>
                    <p className="font-sans text-sm text-cream/40">₹{val.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="h-px bg-cream/8 relative">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                      viewport={{ once: true }}
                      className="absolute top-0 left-0 h-[2px] bg-ochre origin-left"
                      style={{ width: `${(val / maxSubSystem) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RECENT TRANSACTIONS ── */}
      <section className="px-6 md:px-16 py-16 border-t border-cream/8">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">Pichhle Transactions</p>
          {d.recent_transactions.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-sans text-cream/30 text-sm">
                Abhi tak koi transaction nahi hua hai.<br />
                Movement abhi shuruwati phase mein hai.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-cream/8">
              {d.recent_transactions.slice(0, 5).map((tx, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="py-4 grid grid-cols-2 md:grid-cols-5 gap-4"
                >
                  <p className="font-sans text-xs text-cream/40">{tx.date}</p>
                  <p className="font-sans text-xs text-cream/60">{tx.type}</p>
                  <p className="font-sans text-sm text-cream font-medium">₹{tx.amount.toLocaleString("en-IN")}</p>
                  <p className="font-sans text-xs text-ochre/70">{SUB_SYSTEM_LABELS[tx.sub_system] ?? tx.sub_system}</p>
                  <p className="font-sans text-xs text-cream/40 md:col-span-1">{tx.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER NOTE ── */}
      <section className="px-6 md:px-16 py-12 border-t border-cream/8">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs text-cream/30 leading-relaxed">
            Yeh numbers manually update hote hain jab bhi koi transaction hota hai.
            Last updated:{" "}
            {d.generated_at
              ? new Date(d.generated_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
              : "—"}
            <br />
            Koi sawaal ho toh:{" "}
            <a href="mailto:aslidharmi@gmail.com" className="text-ochre/60 hover:text-ochre transition-colors">
              aslidharmi@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* ── PRINCIPLE BOX ── */}
      <section className="px-6 md:px-16 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 border border-ochre/20">
            <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-3">Principle</p>
            <p className="font-sans text-base text-cream/50 leading-relaxed italic">
              &ldquo;Anti-power-concentration. Paisa ek jagah nahi rukna chahiye.
              Isliye har rupaya public hai — hisaab dena movement ka farz hai, option nahi.&rdquo;
            </p>
            <p className="font-sans text-xs text-cream/30 mt-3">— Manifesto §1.8</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-cream/8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-cream/30">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-cream/30">
          <Link href="/" className="hover:text-cream/60 transition-colors">Home</Link>
          <Link href="/join" className="hover:text-cream/60 transition-colors">Shaamil Ho</Link>
          <a href="mailto:aslidharmi@gmail.com" className="hover:text-cream/60 transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}
