'use client';

import { ArrowUpRight, BookOpen, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import catalog from '@/data/catalog.json';

type Course = (typeof catalog.courses)[number];
const agents = [
  { id: 'claude-code', label: 'Claude Code', mark: 'C' }, { id: 'codex', label: 'Codex', mark: '◎' },
  { id: 'cursor', label: 'Cursor', mark: '◩' }, { id: 'copilot', label: 'Copilot', mark: '⌁' },
  { id: 'antigravity', label: 'Antigravity', mark: 'A' }, { id: 'pi', label: 'Pi', mark: 'π' },
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
          <a href="#top" className="flex items-center gap-2.5" aria-label="Agent Code Academy, home">
            <span className="grid size-7 place-items-center border border-white/25 font-mono text-[11px] font-semibold">ACA</span>
            <span className="text-sm font-medium tracking-tight">Agent Code Academy</span>
          </a>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 sm:block">Technical catalog · v0.1</p>
        </header>

        <section id="top" className="flex min-h-[58vh] flex-col justify-center py-20 sm:py-28">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">Learn the tools that write software</p>
          <h1 className="max-w-4xl text-balance text-[clamp(2.8rem,8vw,6.7rem)] font-medium leading-[0.92] tracking-[-0.065em]">Find your next<br />coding agent path.</h1>
          <div className="relative mt-10 max-w-3xl sm:mt-14">
            <Search aria-hidden="true" className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-white/40" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses, agents, skills or paths…" aria-label="Search the course catalog" className="h-16 rounded-none border-white/20 bg-white/[0.035] pl-14 pr-5 text-base text-white placeholder:text-white/30 focus-visible:border-white/50 focus-visible:ring-0" />
          </div>
        </section>

        <section aria-labelledby="agents-heading" className="border-y border-white/10 py-8">
          <div className="mb-5 flex items-end justify-between">
            <h2 id="agents-heading" className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Browse by agent</h2>
            {activeAgent && <button onClick={() => setActiveAgent(null)} className="text-xs text-white/50 underline underline-offset-4 hover:text-white">Clear filter</button>}
          </div>
          <Carousel opts={{ align: 'start', dragFree: true }} className="mx-10 sm:mx-12">
            <CarouselContent className="-ml-3">
              {agents.map((agent) => (
                <CarouselItem key={agent.id} className="basis-1/2 pl-3 sm:basis-1/3 lg:basis-1/6">
                  <button onClick={() => setActiveAgent(activeAgent === agent.id ? null : agent.id)} aria-pressed={activeAgent === agent.id} className="group flex h-28 w-full flex-col items-center justify-center gap-3 border border-white/10 bg-white/[0.02] grayscale transition hover:border-white/30 hover:bg-white/[0.055] aria-pressed:border-white/55 aria-pressed:bg-white/10">
                    <span className="grid size-8 place-items-center font-mono text-xl text-white/80 transition group-hover:text-white">{agent.mark}</span>
                    <span className="text-xs font-medium text-white/55 transition group-hover:text-white/90">{agent.label}</span>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-10 border-white/15 bg-black text-white hover:bg-white/10 hover:text-white sm:-left-12" />
            <CarouselNext className="-right-10 border-white/15 bg-black text-white hover:bg-white/10 hover:text-white sm:-right-12" />
          </Carousel>
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
