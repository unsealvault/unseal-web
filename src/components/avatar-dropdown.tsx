// components/user-nav.tsx
'use client';

import Link from 'next/link';
import {
  User,
  ScrollText,
  KeyRound,
  Settings,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useUser } from '@/providers/user.provider';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/graphql/auth/auth.server';
import { protectedRoutes } from '@/constant';


export function AvatarDropdown() {

  const { user, setUser } = useUser();

  console.log("NavDropdownMenu:", user);

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();


  const router = useRouter();
  const pathname = usePathname();


  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push("/login");
      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/");
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="relative flex rounded-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform active:scale-95 cursor-pointer"
        >
          {/* সরাসরি Avatar বসিয়ে দেওয়া হয়েছে, পেছনের লাল গ্রেডিয়েন্ট র‍্যাপার div-টি বাদ দেওয়া হয়েছে */}
          <Avatar className="size-9 sm:size-10 border-2 border-amber-800/80">
            <AvatarImage
              src="{user?.profilePhoto}"
              alt={user?.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-red-900/50 text-muted-foreground font-medium text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-xl border border-border/80 dark:border-white/10 bg-background/95 dark:bg-[#0c0d12]/95 backdrop-blur-xl p-1.5 shadow-xl shadow-black/20"
      >
        {/* প্রোফাইল হেডার */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal px-2.5 py-2">
            <div className="flex flex-col space-y-1 leading-none">

              <div className="flex items-center justify-between">
                <span className="font-serif font-medium text-sm text-foreground">
                  {user?.name}
                </span>

                <span
                  className="
      text-[9px] font-mono uppercase tracking-wide
      bg-amber-500/10
      text-amber-700 dark:text-amber-300
      px-1.5 py-0.5
      rounded-md
      border border-amber-500/20
      shadow-[0_0_10px_rgba(245,158,11,0.08)]
    "
                >
                  Sealer
                </span>
              </div>

              <span className="text-[11px] font-mono text-muted-foreground truncate"> {user?.email}</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/60 dark:bg-white/10 my-1" />

        {/* লিংক মেনু আইটেম */}
        <DropdownMenuGroup className="space-y-0.5">
          <DropdownMenuItem className="cursor-pointer rounded-lg text-xs py-2 focus:bg-[#991b1b]/10 focus:text-foreground">
            <Link href="/dashboard" className="flex items-center gap-2.5 w-full">
              <ScrollText className="size-3.5 text-muted-foreground group-focus:text-[#991b1b]" />
              <span>My Time Capsules</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer rounded-lg text-xs py-2 focus:bg-[#991b1b]/10 focus:text-foreground">
            <Link href="/profile" className="flex items-center gap-2.5 w-full">
              <User className="size-3.5 text-muted-foreground" />
              <span>Profile Details</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer rounded-lg text-xs py-2 focus:bg-[#991b1b]/10 focus:text-foreground">
            <Link href="/security" className="flex items-center gap-2.5 w-full">
              <KeyRound className="size-3.5 text-muted-foreground" />
              <span>Encryption Keys</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer rounded-lg text-xs py-2 focus:bg-[#991b1b]/10 focus:text-foreground">
            <Link href="/settings" className="flex items-center gap-2.5 w-full">
              <Settings className="size-3.5 text-muted-foreground" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/60 dark:bg-white/10 my-1" />

        {/* লগআউট বাটন */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer rounded-lg text-xs py-2 text-rose-600 dark:text-rose-400 focus:bg-rose-500/10 focus:text-rose-600 dark:focus:text-rose-400 flex items-center gap-2.5"
        >
          <LogOut className="size-3.5" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}