// src/app/blog/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  ShieldCheck,
  Tag
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
    excerpt:
      'In a surveillance economy where every keystroke is harvested for training datasets, how do you build a digital sanctum where words remain truly private until their scheduled resurrection?',
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
    excerpt:
      'Writing to who you might become forces an unusual brand of radical honesty. We studied the recurring patterns across thousands of unsealed reflections.',
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
    excerpt:
      'A technical walkthrough on key derivation with PBKDF2, initialization vectors, and preventing server-side leakage without sacrificing user experience.',
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
    excerpt:
      'How to engineer cron schedulers, decentralized payload cold-storage, and delivery pipelines that will continue firing reliably 5 years down the line.',
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
    excerpt:
      'Ephemeral stories were supposed to make digital sharing spontaneous. Instead, they conditioned us to discard everything that requires deliberate rumination.',
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
    excerpt:
      'The cryptographic dilemma: when a sender loses access to their inbox, how can they securely rotate destination credentials without compromising payload privacy?',
    category: 'Engineering',
    readTime: '7 min read',
    publishedAt: 'Jun 05, 2026',
    author: {
      name: 'Soren Ward',
      role: 'Protocol Lead',
    },
  },
];

const categories = ['All Articles', 'Cryptography', 'Engineering', 'Reflections', 'Architecture', 'Philosophy'];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === 'All Articles' || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড সিনেমাটিক গ্লো */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="w-175 h-85 bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[150px] rounded-full" />
      </div>
       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 pb-20 flex-1 space-y-16">
        
        {/* ================= ১. পেজ হেডার ================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 text-[#991b1b] dark:text-rose-400 text-xs font-mono tracking-widest">
            <BookOpen className="size-3.5" />
            <span>DISPATCHES & ESSAYS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
            The Chronicles of Time
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
            Essays on zero-knowledge cryptography, temporal permanence, human memory, and the engineering behind Unseal.
          </p>
        </div>

        {/* ================= ২. ফিচার্ড আর্টিকেল কার্ড ================= */}
        {activeCategory === 'All Articles' && !searchQuery && (
          <div className="relative rounded-3xl border border-border/80 bg-card/80 backdrop-blur-md p-7 sm:p-10 lg:p-12 shadow-xl hover:border-[#991b1b]/50 transition-all duration-300 group overflow-hidden">
            {/* ওয়াটারমার্ক গ্লো */}
            <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-[#991b1b]/10 dark:bg-rose-950/20 blur-3xl group-hover:scale-110 transition-transform duration-500" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md border border-[#991b1b]/30 bg-[#991b1b]/10 text-[#991b1b] dark:text-rose-400 font-semibold">
                  FEATURED DISPATCH
                </span>
                <span className="text-border">•</span>
                <span className="text-muted-foreground">{featuredPost.category}</span>
                <span className="text-border">•</span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" />
                  {featuredPost.readTime}
                </span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`} className="block space-y-3 group-hover:text-[#991b1b] dark:group-hover:text-rose-400 transition-colors">
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-[1.2]">
                  {featuredPost.title}
                </h2>
                <p className="font-serif text-base sm:text-lg text-muted-foreground leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </Link>

              <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full border border-border bg-muted flex items-center justify-center text-foreground font-serif font-bold text-sm">
                    {featuredPost.author.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-foreground font-medium block">{featuredPost.author.name}</span>
                    <span className="text-muted-foreground text-[11px]">{featuredPost.author.role}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#991b1b] dark:text-rose-400 hover:gap-2.5 transition-all font-semibold"
                >
                  <span>Read Full Dispatch</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ================= ৩. সার্চ ও ক্যাটাগরি ফিল্টার বার ================= */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* সার্চ ইনপুট */}
            <div className="relative w-full sm:max-w-md">
              <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search essays by title, topic, or author..."
                className="h-11 pl-10 bg-card/60 backdrop-blur-md border-border/80 text-xs text-foreground placeholder:text-muted-foreground/60 rounded-xl hover:border-border focus-visible:ring-1 focus-visible:ring-[#991b1b]"
              />
            </div>

            <span className="text-xs font-mono text-muted-foreground self-end sm:self-center">
              Showing <span className="text-foreground font-semibold">{filteredPosts.length}</span> articles
            </span>
          </div>

          {/* ক্যাটাগরি ফিল্টার পিলস */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#991b1b] text-white shadow-md shadow-[#991b1b]/20 font-medium'
                    : 'bg-card/70 border border-border/70 text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ================= ৪. ব্লগ কার্ড গ্রিড ================= */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-card/40 p-8 space-y-3">
            <Tag className="size-10 mx-auto text-muted-foreground/40 stroke-[1.2]" />
            <h3 className="font-serif text-lg text-foreground font-medium">No Dispatches Found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto font-light">
              We couldn&apos;t find any articles matching your search criteria. Try a different query or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md p-6 sm:p-7 transition-all duration-300 hover:border-[#991b1b]/50 hover:shadow-xl hover:shadow-[#991b1b]/5 hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <div className="space-y-4">
                  {/* ট্যাগ ও রিড টাইম */}
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-md border border-border bg-muted/60 text-muted-foreground">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="size-3 text-[#991b1b] dark:text-rose-400" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* টাইটেল ও বিবরণ */}
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug text-foreground group-hover:text-[#991b1b] dark:group-hover:text-rose-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-serif text-sm text-muted-foreground/90 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* ফুটার মেটাডাটা */}
                <div className="pt-5 mt-6 border-t border-border/60 flex items-center justify-between text-xs font-mono">
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium">{post.author.name}</span>
                    <span className="text-[10px] text-muted-foreground">{post.publishedAt}</span>
                  </div>

                  <span className="text-[11px] text-[#991b1b] dark:text-rose-400 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform flex items-center gap-1 font-semibold">
                    <span>Read</span>
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ================= ৫. ডিসপ্যাচ নিউজলেটার সেকশন ================= */}
        <div className="relative rounded-3xl border border-border/80 bg-card p-8 sm:p-12 text-center space-y-6 max-w-3xl mx-auto shadow-xl overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(153,27,27,0.08)_0%,transparent_70%)]" />

          <div className="relative z-10 size-12 mx-auto rounded-full bg-[#991b1b]/10 border border-[#991b1b]/30 flex items-center justify-center text-[#991b1b] dark:text-rose-400 shadow-[0_0_20px_rgba(153,27,27,0.2)]">
            <Mail className="size-5" />
          </div>

          <div className="relative z-10 space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
              Subscribe to the Ledger
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
              Periodic essays on cryptography, privacy protocols, and digital permanence. No promotional noise or third-party trackers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <Input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="your.email@domain.com"
              className="h-11 bg-background/80 border-border text-xs text-foreground placeholder:text-muted-foreground/60 rounded-full px-5 hover:border-border focus-visible:ring-1 focus-visible:ring-[#991b1b]"
            />
            <Button
              type="submit"
              className="w-full sm:w-auto h-11 px-6 rounded-full bg-[#991b1b] hover:bg-[#7f1d1d] text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-md shadow-[#991b1b]/25 transition-all cursor-pointer shrink-0"
            >
              <span>Subscribe</span>
            </Button>
          </form>

          {subscribed && (
            <p className="relative z-10 text-xs font-mono text-emerald-500 animate-in fade-in">
              ✦ You have been subscribed to our cryptographic dispatches.
            </p>
          )}

          <div className="relative z-10 flex items-center justify-center gap-2 text-[11px] font-mono text-muted-foreground/75">
            <ShieldCheck className="size-3.5 text-[#991b1b] dark:text-rose-400" />
            <span>Zero-spam guarantee • Unsubscribe at any moment</span>
          </div>
        </div>

      </div>
    </main>
  );
}