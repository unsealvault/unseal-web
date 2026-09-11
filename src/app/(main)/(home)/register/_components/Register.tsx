'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import ReusableForm from '@/components/reuse/ReusableForm';
import { useUser } from '@/providers/user.provider';
import { FormInput } from '@/components/reuse/form-input';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useRegister } from '@/graphql/hooks/auth.hook';

const Register = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { register, isLoading } = useRegister();
    const { refetchUser } = useUser();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setError(null);

        const { name, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const result = await register(name, email, password);

            console.log("result signup page", result)

            if (result) {
                if (refetchUser) {
                    await refetchUser();
                }
                router.push('/');
                router.refresh();
            }
        } catch (err: any) {
            setError(err?.response?.message);
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
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#991b1b]/20 bg-[#991b1b]/5 text-[10px] font-mono text-[#991b1b] dark:text-rose-400 mb-1">
                            <ShieldCheck className="size-3" />
                            <span>End-to-End Encrypted</span>
                        </div>
                        <h1 className="text-2xl font-serif font-medium tracking-tight text-foreground">
                            Create Account
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground font-light px-3">
                            Store, protect, and track all your scheduled letters in one place.
                        </p>
                    </div>

                    {/* Error Notice */}
                    {error && (
                        <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-rose-300 text-xs text-center font-mono">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <ReusableForm onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <FormInput
                                name="name"
                                label="Full Name"
                                type="text"
                                required
                                placeholder="John Doe"
                            />

                            <FormInput
                                name="email"
                                label="Email"
                                type="email"
                                required
                                placeholder="name@gmail.com"
                            />

                            <FormInput
                                name="password"
                                label="Password"
                                type="password"
                                required
                                placeholder="At least 8 characters"
                            />

                            <FormInput
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                required
                                placeholder="Repeat your password"
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 text-xs tracking-wider uppercase font-medium rounded-lg bg-[#991b1b] hover:bg-[#7f1d1d] text-white shadow-lg shadow-[#991b1b]/25 transition-all cursor-pointer"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="size-3.5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                                        Creating Account...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <span>Create Account</span>
                                        <ArrowRight className="size-3.5 text-rose-200" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </ReusableForm>

                    {/* Footer Card */}
                    <div className="pt-2 border-t border-border/60 text-center space-y-2.5">
                        <p className="text-xs text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-[#991b1b] dark:text-rose-400 font-medium hover:underline">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;