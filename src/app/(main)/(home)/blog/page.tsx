'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  ArrowUpRight,
  Clock,
  Sparkles,
  ArrowRight,
  Mail,
  ShieldCheck,
  Tag,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
}

const posts: BlogPost[] = [
  {
    id: '1',
    slug: 'architecture-of-forgetting-zero-knowledge',
    title: 'The Architecture of Forgetting: Why Real Privacy Requires Mathematical Trust',
    excerpt: 'In a surveillance economy where every keystroke is harvested for training datasets, how do you build a digital sanctum where words remain truly private until their scheduled resurrection?',
    category: 'Cryptography',
    readTime: '6 min read',
    publishedAt: 'Aug 24, 2026',
    author: {
      name: 'Elena Vance',
      role: 'Cryptographic Engineer',
    },
    featured: true,
  },
  {
    id: '2',
    slug: 'psychology-of-future-letters',
    title: 'Speaking Across Decades: The Deep Psychology of Future-Directed Letters',
    excerpt: 'Writing to who you might become forces an unusual brand of radical honesty. We studied the recurring patterns across thousands of unsealed reflections.',
    category: 'Reflections',
    readTime: '4 min read',
    publishedAt: 'Aug 12, 2026',
    author: {
      name: 'Marcus Sterling',
      role: 'Research Fellow',
    },
  },
  {
    id: '3',
    slug: 'in-browser-aes-gcm-256-guide',
    title: 'Deep Dive: Implementing Browser-Native AES-GCM-256 with Web Crypto API',
    excerpt: 'A technical walkthrough on key derivation with PBKDF2, initialization vectors, and preventing server-side leakage without sacrificing user experience.',
    category: 'Engineering',
    readTime: '8 min read',
    publishedAt: 'Jul 29, 2026',
    author: {
      name: 'Elena Vance',
      role: 'Cryptographic Engineer',
    },
  },
  {
    id: '4',
    slug: 'designing-software-for-temporal-longevity',
    title: 'Digital Permanence: Building Systems Designed to Outlive Their Creators',
    excerpt: 'How to engineer cron schedulers, decentralized payload cold-storage, and delivery pipelines that will continue firing reliably 5 years down the line.',
    category: 'Architecture',
    readTime: '5 min read',
    publishedAt: 'Jul 14, 2026',
    author: {
      name: 'Soren Ward',
      role: 'Protocol Lead',
    },
  },
  {
    id: '5',
    slug: 'why-ephemeral-social-media-failed-us',
    title: 'The Loss of Stillness: Why 24-Hour Stories Eroded Human Memory',
    excerpt: 'Ephemeral stories were supposed to make digital sharing spontaneous. Instead, they conditioned us to discard everything that requires deliberate rumination.',
    category: 'Philosophy',
    readTime: '4 min read',
    publishedAt: 'Jun 28, 2026',
    author: {
      name: 'Aria Chen',
      role: 'Essayist & Curator',
    },
  },
  {
    id: '6',
    slug: 'recovering-unopened-vaults-safely',
    title: 'Zero-Knowledge Key Recovery Without Centralized Backdoors',
    excerpt: 'The cryptographic dilemma: when a sender loses access to their inbox, how can they securely rotate destination credentials without compromising payload privacy?',
    category: 'Engineering',
    readTime: '7 min read',
    publishedAt: 'Jun 05, 2026',
    author: {
      name: 'Soren Ward',
      role: 'Protocol Lead',
    },
  },
];

const categories = [
  'All Articles',
  'Cryptography',
  'Engineering',
  'Reflections',
  'Architecture',
  'Philosophy',
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredPost = posts.find((post) => post.featured) || posts[0];

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesCategory =
      activeCategory === 'All Articles' ||
      post.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailInput.trim()) return;

    setSubscribed(true);
    setEmailInput('');

    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">
      {/* Cinematic Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#991b1b]/8 blur-[120px] dark:bg-[#991b1b]/12" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-rose-500/5 blur-[120px] dark:bg-rose-950/10" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col space-y-10 px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-10 lg:pb-20">
        {/* Page Header */}
        <section className="mx-auto max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 px-3 py-1 text-[10px] font-mono tracking-[0.2em] text-[#991b1b] dark:text-rose-400 sm:text-xs">
            <BookOpen className="size-3" />
            <span>DISPATCHES & ESSAYS</span>
          </div>

          <h1 className="font-serif text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The Chronicles of Time
          </h1>

          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
            Essays on zero-knowledge cryptography, temporal permanence, human
            memory, and the engineering behind Unseal.
          </p>
        </section>

        {/* Featured Article */}
        {activeCategory === 'All Articles' && !searchQuery.trim() && (
          <section className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#991b1b]/40 sm:p-7 lg:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#991b1b]/8 blur-3xl transition-transform duration-500 group-hover:scale-110 dark:bg-rose-950/20" />

            <div className="relative z-10 max-w-4xl space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono sm:text-xs">
                <span className="rounded-md border border-[#991b1b]/30 bg-[#991b1b]/10 px-2 py-1 font-semibold tracking-wide text-[#991b1b] dark:text-rose-400">
                  FEATURED DISPATCH
                </span>

                <span className="text-muted-foreground/40">•</span>

                <span className="text-muted-foreground">
                  {featuredPost.category}
                </span>

                <span className="text-muted-foreground/40">•</span>

                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="size-3" />
                  {featuredPost.readTime}
                </span>
              </div>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="block space-y-3"
              >
                <h2 className="font-serif text-2xl font-medium leading-tight tracking-tight text-foreground transition-colors group-hover:text-[#991b1b] dark:group-hover:text-rose-400 sm:text-3xl lg:text-4xl">
                  {featuredPost.title}
                </h2>

                <p className="max-w-3xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                  {featuredPost.excerpt}
                </p>
              </Link>

              <div className="flex flex-col gap-4 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-serif text-sm font-bold text-foreground">
                    {featuredPost.author.name.charAt(0)}
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-foreground">
                      {featuredPost.author.name}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      {featuredPost.author.role}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#991b1b] transition-all hover:gap-2.5 dark:text-rose-400 sm:text-xs"
                >
                  <span>Read Full Dispatch</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Search & Category Filters */}
        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search essays by title, topic, or author..."
                className="h-10 rounded-xl border-border/80 bg-card/60 pl-9 text-xs text-foreground backdrop-blur-md placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-[#991b1b] sm:h-11"
              />
            </div>

            <span className="text-[10px] font-mono text-muted-foreground sm:text-xs">
              Showing{' '}
              <span className="font-semibold text-foreground">
                {filteredPosts.length}
              </span>{' '}
              articles
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-mono tracking-wide transition-all duration-200 sm:px-3.5 sm:text-xs ${
                  activeCategory === category
                    ? 'border-[#991b1b] bg-[#991b1b] text-white shadow-md shadow-[#991b1b]/20'
                    : 'border-border/70 bg-card/60 text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Grid */}
        {filteredPosts.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
            <Tag className="mx-auto mb-3 size-9 text-muted-foreground/40" />

            <h3 className="font-serif text-lg font-medium text-foreground">
              No Dispatches Found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs font-light leading-relaxed text-muted-foreground">
              We couldn&apos;t find any articles matching your search criteria.
              Try a different query or category.
            </p>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative flex min-h-[270px] flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#991b1b]/40 hover:shadow-lg hover:shadow-[#991b1b]/5 sm:min-h-[285px] sm:p-6"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-36 rounded-full bg-[#991b1b]/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-rose-950/10" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="rounded-md border border-border bg-muted/50 px-2 py-1 text-muted-foreground">
                      {post.category}
                    </span>

                    <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
                      <Clock className="size-3 text-[#991b1b] dark:text-rose-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl font-normal leading-snug text-foreground transition-colors group-hover:text-[#991b1b] dark:group-hover:text-rose-400 sm:text-[22px]">
                      {post.title}
                    </h3>

                    <p className="line-clamp-3 font-serif text-sm leading-relaxed text-muted-foreground/90">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-xs font-medium text-foreground">
                      {post.author.name}
                    </span>

                    <span className="text-[10px] text-muted-foreground">
                      {post.publishedAt}
                    </span>
                  </div>

                  <span className="flex shrink-0 items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wide text-[#991b1b] transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 dark:text-rose-400 sm:text-[11px]">
                    <span>Read</span>
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* Newsletter */}
        <section className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-6 text-center shadow-lg backdrop-blur-md sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(153,27,27,0.08)_0%,transparent_70%)]" />

          <div className="relative z-10 space-y-5">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full border border-[#991b1b]/30 bg-[#991b1b]/10 text-[#991b1b] shadow-[0_0_20px_rgba(153,27,27,0.15)] dark:text-rose-400 sm:size-12">
              <Mail className="size-4 sm:size-5" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#991b1b] dark:text-rose-400">
                <Sparkles className="size-3" />
                <span>THE LEDGER</span>
              </div>

              <h3 className="font-serif text-2xl font-normal text-foreground sm:text-3xl">
                Subscribe to the Ledger
              </h3>

              <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-muted-foreground sm:text-sm">
                Periodic essays on cryptography, privacy protocols, and digital
                permanence. No promotional noise or third-party trackers.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="mx-auto flex max-w-md flex-col gap-2.5 sm:flex-row"
            >
              <Input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="your.email@domain.com"
                className="h-10 rounded-full border-border bg-background/80 px-5 text-xs text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-[#991b1b] sm:h-11"
              />

              <Button
                type="submit"
                className="h-10 w-full shrink-0 rounded-full bg-[#991b1b] px-6 text-xs font-mono font-semibold uppercase tracking-wider text-white shadow-md shadow-[#991b1b]/20 transition-all hover:bg-[#7f1d1d] sm:h-11 sm:w-auto"
              >
                Subscribe
              </Button>
            </form>

            {subscribed && (
              <p className="animate-in fade-in text-[10px] font-mono text-emerald-500 sm:text-xs">
                ✦ You have been subscribed to our cryptographic dispatches.
              </p>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-muted-foreground/70 sm:text-[10px]">
              <ShieldCheck className="size-3.5 text-[#991b1b] dark:text-rose-400" />
              <span>Zero-spam guarantee • Unsubscribe at any moment</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default BlogPage;