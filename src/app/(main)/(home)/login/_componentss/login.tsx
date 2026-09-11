"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useUser } from '@/providers/user.provider';
import ReusableForm from '@/components/reuse/ReusableForm';
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useLogin } from '@/graphql/hooks/auth.hook';
import { FormInput } from '@/components/reuse/form-input';

const LoginPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");

    const [isMagicLink, setIsMagicLink] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { login, isLoading } = useLogin();
    const { refetchUser } = useUser();


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await login(data.email, data.password);

            if (res?.login?.success) {
                await refetchUser();

                const target = redirect || "/";
                router.push(target);
                router.refresh();
            }
        } catch (err) {
            console.error("Login Error:", err);
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">
            {/* Crimson Wax Ambient Glow */}
            <div className="pointer-events-none fixed inset-0 flex justify-center overflow-hidden">
                <div className="w-162.5 h-80 bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[140px] rounded-full" />
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-32 pb-20 flex-1 flex flex-col justify-center">
                <div className="rounded-2xl border border-border/80 bg-card text-card-foreground p-7 sm:p-9 shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/60 space-y-6">

                    {/* Header */}
                    <div className="space-y-1.5 text-center">
                        <h1 className="text-2xl font-serif font-medium tracking-tight text-foreground">
                            Welcome Back
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground font-light">
                            Log in to read and manage your future letters.
                        </p>
                    </div>

                    {/* Error Notice */}
                    {error && (
                        <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-rose-300 text-xs text-center font-mono">
                            {error}
                        </div>
                    )}

                    {/* Login Method Switcher */}
                    <div className="flex p-1 bg-muted/60 rounded-lg border border-border/60 text-xs font-medium">
                        <button
                            type="button"
                            onClick={() => setIsMagicLink(false)}
                            className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${!isMagicLink ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Password
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsMagicLink(true)}
                            className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${isMagicLink ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Sparkles className="size-3 text-[#991b1b] dark:text-rose-400" />
                            <span>Email Link</span>
                        </button>
                    </div>

                    <ReusableForm onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <FormInput
                                name="email"
                                label="Email"
                                type="email"
                                required
                                placeholder="name@gmail.com"
                            />

                            {!isMagicLink && (
                                <div className="space-y-2">
                                    
                                    <FormInput
                                        name="password"
                                        label="Password"
                                        type="password"
                                        required
                                        placeholder="••••••••••••"
                                    />

                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                                            {/* Label FormInput এর ভেতরেই হ্যান্ডেল হয়, তবে ফরগট পাসওয়ার্ড লিংক পজিশন ঠিক রাখার জন্য এখানে রাখা হলো */}
                                        </span>
                                        <Link
                                            href="/forgot-password"
                                            className="text-[11px] text-muted-foreground hover:text-[#991b1b] dark:hover:text-rose-400 transition-colors"
                                        >
                                            Forgot password ?
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 text-xs tracking-wider uppercase font-medium rounded-lg bg-[#991b1b] hover:bg-[#7f1d1d] text-white shadow-lg shadow-[#991b1b]/25 transition-all cursor-pointer"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="size-3.5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                                        Logging In...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <span>{isMagicLink ? 'Send Login Link' : 'Log In'}</span>
                                        <ArrowRight className="size-3.5 text-rose-200" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </ReusableForm>

                    {/* Footer Card */}
                    <div className="pt-2 border-t border-border/60 text-center space-y-2.5">
                        <p className="text-xs text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-[#991b1b] dark:text-rose-400 font-medium hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default LoginPage;