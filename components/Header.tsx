"use client"
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { ModeToggle } from './mode-toggle';


export default function Header() {
    return (
        <header className="sticky text-lg top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <MaxWidthWrapper>
                <div className="container flex h-14 items-center">
                    {/* Left Side: Brand/Logo */}
                    <div className="mr-4 flex">
                        <Link href="/" className="mr-6 flex items-center space-x-2">
                            {/* <YourLogoComponent /> Optional */}
                            <span className="font-bold sm:inline-block">VizKno AI</span>
                        </Link>
                    </div>

                    {/* Right Side: Desktop Nav + Actions */}
                    <div className="flex flex-1 items-center justify-end space-x-2">
                        {/* Desktop Navigation */}
                        <nav className="md:flex md:items-center md:space-x-6 text-sm font-medium">
                            <div>
                                <ModeToggle />
                            </div>
                        </nav>
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    );
}