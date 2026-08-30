'use client';

import { ArrowUpRight, BookOpen, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import catalog from '@/data/catalog.json';

type Course = (typeof catalog.courses)[number];
const agents = [
  { id: 'claude-code', label: 'Claude Code', logo: '/agents/claude-code.svg' },
  { id: 'codex', label: 'Codex', logo: '/agents/codex.png' },
  { id: 'cursor', label: 'Cursor', logo: '/agents/cursor.svg' },
  { id: 'copilot', label: 'GitHub Copilot', logo: '/agents/copilot.svg' },
  { id: 'antigravity', label: 'Antigravity', logo: '/agents/antigravity.png' },
  { id: 'pi', label: 'Pi', logo: '/agents/pi.svg' },
] as const;
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const results = useMemo(() => {
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
    return catalog.courses.filter((course) => {
      if (activeAgent && course.agentId !== activeAgent) return false;
      if (!terms.length) return true;
      const haystack = normalize([course.title, course.agent, course.summary, course.level, course.path.join(' '), course.tags.join(' ')].join(' '));
      return terms.every((term) => haystack.includes(term));
    });
  }, [activeAgent, query]);
  const hasFilter = Boolean(query.trim() || activeAgent);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-20 pt-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <a href="#top" className="group flex items-center gap-3" aria-label="Agent Code Academy, home">
            <span className="relative grid size-8 place-items-center overflow-hidden border border-white/30 font-mono text-[10px] font-semibold tracking-[-0.08em] transition group-hover:border-white/70">
              <span className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
              <span className="relative">A/</span>
            </span>
            <span className="text-sm font-medium tracking-[-0.025em]">Agent Code Academy</span>
          </a>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 sm:block">Technical catalog · v0.1</p>
        </header>

        <section id="top" className="flex min-h-[58vh] flex-col justify-center py-20 sm:py-28">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">Technical paths for coding agents</p>
          <h1 className="max-w-5xl text-balance text-[clamp(3.2rem,9vw,7.4rem)] font-medium leading-[0.86] tracking-[-0.075em]">Agent Code<br />Academy.</h1>
          <p className="mt-7 max-w-xl text-sm leading-6 text-white/45 sm:text-base">Curated, practical learning for the tools changing how software gets built.</p>
          <div className="relative mt-10 max-w-3xl sm:mt-14">
            <Search aria-hidden="true" className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-white/40" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses, agents, skills or paths…" aria-label="Search the course catalog" className="h-16 rounded-none border-white/20 bg-white/[0.035] pl-14 pr-5 text-base text-white placeholder:text-white/30 focus-visible:border-white/50 focus-visible:ring-0" />
          </div>
        </section>

        <section aria-labelledby="agents-heading" className="border-y border-white/10 py-7">
          <div className="mb-5 flex items-end justify-between">
            <h2 id="agents-heading" className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Browse by agent</h2>
            {activeAgent && <button onClick={() => setActiveAgent(null)} className="text-xs text-white/50 underline underline-offset-4 hover:text-white">Clear filter</button>}
          </div>
          <div className="logo-marquee" role="group" aria-label="Coding agents">
            <div className="logo-marquee-track">
              {[...agents, ...agents].map((agent, index) => (
                <button
                  key={`${agent.id}-${index}`}
                  onClick={() => setActiveAgent(activeAgent === agent.id ? null : agent.id)}
                  aria-label={`Filter by ${agent.label}`}
                  aria-pressed={activeAgent === agent.id}
                  tabIndex={index < agents.length ? 0 : -1}
                  className="logo-mark"
                >
                  <span className="grid h-12 place-items-center sm:h-14">
                    <img
                      src={agent.logo}
                      alt=""
                      className={`w-auto object-contain ${agent.id === 'codex' ? 'h-11 sm:h-12' : 'h-9 max-w-16 sm:h-11 sm:max-w-20'}`}
                    />
                  </span>
                  <span className="logo-label">{agent.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="results-heading" className="pt-14">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div><p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{hasFilter ? 'Search results' : 'Catalog preview'}</p><h2 id="results-heading" className="text-2xl font-medium tracking-tight">{results.length} {results.length === 1 ? 'course' : 'courses'}</h2></div>
            <p className="hidden max-w-sm text-right text-xs leading-5 text-white/40 md:block">Curated technical learning paths from official and community sources.</p>
          </div>
          {results.length ? <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">{results.map((course) => <CourseCard key={course.id} course={course} />)}</div> : (
            <div className="border border-white/10 px-6 py-16 text-center"><p className="text-base text-white/75">No courses found.</p><button onClick={() => { setQuery(''); setActiveAgent(null); }} className="mt-3 text-sm text-white/45 underline underline-offset-4 hover:text-white">Reset search</button></div>
          )}
        </section>
        <footer className="mt-20 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><span>Agent Code Academy</span><span>Static catalog · No account required</span></footer>
      </div>
    </main>
  );
}

function CourseCard({ course }: { course: Course }) {
  return <article className="group flex min-h-72 flex-col bg-[#090909] p-6 transition hover:bg-[#101010]">
    <div className="mb-7 flex items-start justify-between gap-4"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{course.agent}</span><span className="border border-white/12 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white/45">{course.level}</span></div>
    <BookOpen aria-hidden="true" className="mb-5 size-5 text-white/35" /><h3 className="text-xl font-medium leading-tight tracking-tight text-white/90">{course.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-white/45">{course.summary}</p>
    <div className="mt-auto pt-7"><div className="mb-4 flex flex-wrap items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-white/35">{course.path.map((segment, index) => <span key={segment} className="flex items-center gap-1.5">{index > 0 && <span aria-hidden="true">/</span>}<span>{segment}</span></span>)}</div><a href={course.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white/60 transition group-hover:text-white">Open resource <ArrowUpRight className="size-3.5" /></a></div>
  </article>;
}
