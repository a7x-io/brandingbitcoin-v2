'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Logo } from '@/components/ui/logo'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Globe, Smartphone, Zap, Palette, FileText, Target, BarChart3, CheckCircle } from 'lucide-react'

// TidyCal Embed Component
const TidyCalEmbed = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="tidycal-embed" data-path="brandingbtc/15-minute-meeting"></div>
    );
};

const currentYear = new Date().getFullYear()

export default function Home() {
    const [showBanner, setShowBanner] = useState(true)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [showLogoModal, setShowLogoModal] = useState(false)
    const [showLandingModal, setShowLandingModal] = useState(false)
    const [showSocialModal, setShowSocialModal] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    // ESC key to close modal and prevent background scrolling
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && (showLogoModal || showLandingModal || showSocialModal)) {
                setShowLogoModal(false)
                setShowLandingModal(false)
                setShowSocialModal(false)
            }
        }

        if (showLogoModal || showLandingModal || showSocialModal) {
            document.addEventListener('keydown', handleEscKey)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey)
            document.body.style.overflow = 'unset'
        }
    }, [showLogoModal, showLandingModal, showSocialModal])



    const handleMouseMove = (e: React.MouseEvent) => {
        // Only track mouse movement on medium screens and up (768px+)
        if (window.innerWidth >= 768) {
            const { clientX, clientY } = e
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2
            const deltaX = (clientX - centerX) * 0.01
            const deltaY = (clientY - centerY) * 0.01
            
            setMousePosition({ x: deltaX, y: deltaY })
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Promotional Banner */}
            {showBanner && (
                <div className="bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground py-1 px-4 relative">
                    <div className="container mx-auto flex items-center justify-center gap-2">
                        <button 
                            onClick={() => {
                                const servicesSection = document.getElementById('services');
                                if (servicesSection) {
                                    const offset = 80; // Account for reduced padding
                                    const elementPosition = servicesSection.offsetTop - offset;
                                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                                }
                            }}
                            className="text-xs font-medium hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            🦡 Use Code <strong>HONEYBADGER</strong> for 15% off on
                            Services {/* Vercel integration test - should auto-deploy! */}
                        </button>
                        <button
                            onClick={() => setShowBanner(false)}
                            className="absolute right-4 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <span className="text-primary-foreground text-sm">
                                ×
                            </span>
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <a
                            href="#"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <Logo priority />
                        </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-foreground hover:text-primary transition-colors cursor-pointer"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                const servicesSection = document.getElementById('services');
                                if (servicesSection) {
                                    const offset = 80; // Account for reduced padding
                                    const elementPosition = servicesSection.offsetTop - offset;
                                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                                }
                            }}
                            className="text-foreground hover:text-primary transition-colors cursor-pointer"
                        >
                            Services
                        </a>
                        {/* <a
                            href="#about"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#contact"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Contact
                        </a> */}
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer px-4 py-2 text-base font-medium"
                            onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ cursor: 'pointer' }}
                        >
                            Free Strategy Call
                        </Button>
                        <ThemeToggle />
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center">
                            <span className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 origin-center ${showMobileMenu ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                            <span className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${showMobileMenu ? 'opacity-0 scale-x-0' : ''}`}></span>
                            <span className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 origin-center ${showMobileMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </nav>



            {/* Mobile Menu Drawer */}
            {showMobileMenu && (
                <div className="md:hidden">
                    {/* Backdrop */}
                    <div 
                        className="fixed top-18 left-0 right-0 bottom-0 bg-black/50 z-20"
                        onClick={() => setShowMobileMenu(false)}
                    />
                    
                    {/* Drawer Panel */}
                    <div className="fixed top-18 left-0 right-0 bg-background shadow-lg border-b border-border z-30">
                        {/* Navigation Links */}
                        <div className="pt-6 px-4 pb-4 space-y-2">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowMobileMenu(false);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="block py-3 px-4 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowMobileMenu(false);
                                    const servicesSection = document.getElementById('services');
                                    if (servicesSection) {
                                        const offset = 80;
                                        const elementPosition = servicesSection.offsetTop - offset;
                                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                                    }
                                }}
                                className="block py-3 px-4 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                            >
                                Services
                            </a>
                        </div>
                        
                        {/* CTA Button */}
                        <div className="px-4 pt-4 pb-4 border-t border-border bg-muted flex items-center justify-center">
                            <Button
                                variant="outline"
                                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 font-medium"
                                onClick={() => {
                                    setShowMobileMenu(false);
                                    document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Free Strategy Call
                            </Button>
                        </div>
                        
                        {/* Theme Toggle */}
                        <div className="px-4 pt-2 pb-4 flex items-center justify-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section 
                className="relative bg-gradient-to-b from-background via-primary/10 via-primary/5 to-white dark:to-background"
                onMouseMove={handleMouseMove}
            >
                {/* Background Noise Image */}
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/noise.png"
                        alt=""
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                
                {/* Floating Bitcoin Icons */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Large icon - top left */}
                    <div 
                        className="absolute md:transform md:transition-transform"
                        style={{
                            top: '15%',
                            left: '10%',
                            transform: `rotate(15deg) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        <Image
                            src="/bitcoin-color-icon.svg"
                            alt=""
                            width={128}
                            height={128}
                            className="opacity-20"
                        />
                    </div>
                    
                    {/* Medium icon - top right */}
                    <div 
                        className="absolute md:transform md:transition-transform"
                        style={{
                            top: '20%',
                            right: '15%',
                            transform: `rotate(-25deg) translate(${mousePosition.x * -10}px, ${mousePosition.y * -6}px)`,
                            transition: 'transform 0.15s ease-out'
                        }}
                    >
                        <Image
                            src="/bitcoin-color-icon.svg"
                            alt=""
                            width={96}
                            height={96}
                            className="opacity-15"
                        />
                    </div>
                    
                    {/* Small icon - bottom left */}
                    <div 
                        className="absolute md:transform md:transition-transform"
                        style={{
                            bottom: '25%',
                            left: '20%',
                            transform: `rotate(45deg) translate(${mousePosition.x * 6}px, ${mousePosition.y * -10}px)`,
                            transition: 'transform 0.2s ease-out'
                        }}
                    >
                        <Image
                            src="/bitcoin-color-icon.svg"
                            alt=""
                            width={64}
                            height={64}
                            className="opacity-25"
                        />
                    </div>
                    
                    {/* Medium icon - bottom right */}
                    <div 
                        className="absolute md:transform md:transition-transform"
                        style={{
                            bottom: '30%',
                            right: '25%',
                            transform: `rotate(-10deg) translate(${mousePosition.x * -8}px, ${mousePosition.y * 12}px)`,
                            transition: 'transform 0.12s ease-out'
                        }}
                    >
                        <Image
                            src="/bitcoin-color-icon.svg"
                            alt=""
                            width={80}
                            height={80}
                            className="opacity-20"
                        />
                    </div>
                    
                    {/* Tiny icon - center */}
                    <div 
                        className="absolute md:transform md:transition-transform"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(30deg) translate(${mousePosition.x * 4}px, ${mousePosition.y * 4}px)`,
                            transition: 'transform 0.25s ease-out'
                        }}
                    >
                        <Image
                            src="/bitcoin-color-icon.svg"
                            alt=""
                            width={48}
                            height={48}
                            className="opacity-10"
                        />
                    </div>
                </div>
                
                <div className="container mx-auto px-4 py-20 text-center relative z-10">
                    <Badge
                        variant="secondary"
                        className="mb-4 bg-gradient-to-t from-primary to-primary/80 text-primary-foreground border-0"
                    >
                        Branding, Ads, Websites
                    </Badge>
                    <h1
                        className="text-5xl md:text-8xl font-bold text-foreground mb-6 tracking-tight"
                        style={{ lineHeight: '0.85' }}
                    >
                        Bitcoin-First
                        <span className="gradient-text block">
                            Digital Agency
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                        We create digital assets that help{' '}
                        <strong>Bitcoin brands</strong> stand out, win
                        customers, and attract serious investors.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer px-8 py-4 text-[16px] font-semibold"
                            onClick={() => {
                                const servicesSection = document.getElementById('services');
                                if (servicesSection) {
                                    const offset = 80; // Account for reduced padding
                                    const elementPosition = servicesSection.offsetTop - offset;
                                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            Explore Services
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer px-8 py-4 text-[16px] font-semibold"
                            onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ cursor: 'pointer' }}
                        >
                            Book a Call
                        </Button>
                    </div>

                    <div className="flex flex-row gap-4 sm:gap-8 justify-center text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Lightning-fast</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Free Strategy Call</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Pay me in Bitcoin</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Marquee Section */}
            <section className="pt-8 pb-16 bg-gray-50/50 dark:bg-transparent">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                            Trusted by fiat brands {/* Reconnection test - should trigger Vercel */}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            We&apos;ve helped these companies build their digital presence
                            {/* Repository now public - testing improved GitHub integration! */}
                        </p>
                    </div>
                    
                    <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16 lg:gap-24 px-4 sm:px-8">
                        <div className="flex-shrink-0">
                            <Image
                                src="/marquee/1nissan.svg"
                                alt="Nissan"
                                width={120}
                                height={60}
                                className="h-8 sm:h-12 md:h-14 w-auto opacity-60 hover:opacity-80 transition-opacity dark:opacity-40 dark:hover:opacity-60"
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <Image
                                src="/marquee/2pfizer.svg"
                                alt="Pfizer"
                                width={120}
                                height={60}
                                className="h-6 sm:h-8 md:h-10 w-auto opacity-60 hover:opacity-80 transition-opacity dark:opacity-40 dark:hover:opacity-60"
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <Image
                                src="/marquee/3radisson.svg"
                                alt="Radisson"
                                width={120}
                                height={60}
                                className="h-5 sm:h-6 md:h-9 w-auto opacity-60 hover:opacity-80 transition-opacity dark:opacity-40 dark:hover:opacity-60"
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <Image
                                src="/marquee/4mcd.svg"
                                alt="McDonald&apos;s"
                                width={120}
                                height={60}
                                className="h-7 sm:h-10 md:h-11 w-auto opacity-60 hover:opacity-80 transition-opacity dark:opacity-40 dark:hover:opacity-60"
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <Image
                                src="/marquee/5tbwa.svg"
                                alt="TBWA"
                                width={120}
                                height={60}
                                className="h-4 sm:h-5 md:h-6 w-auto opacity-60 hover:opacity-80 transition-opacity dark:opacity-40 dark:hover:opacity-60"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="container mx-auto px-4 py-10 pb-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                        Our Services
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Professional digital assets and branding solutions for
                        Bitcoin businesses
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Logo */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Gradient Header */}
                        <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 relative">
                            <div className="absolute top-0 left-0 w-12 h-2 bg-blue-400/30 rounded-r-full blur-sm"></div>
                            <div className="absolute top-0 right-0 w-6 h-2 bg-orange-400/30 rounded-l-full blur-sm"></div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Logo Design/Redesign
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                Professional logo and brand package
                            </p>

                            {/* Pricing */}
                            <div className="mb-4">
                                <div className="text-3xl font-bold text-gray-800">
                                    $299
                                </div>
                                <div className="text-gray-500 text-sm">
                                    one-time payment
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                                    What you get:
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Palette className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                            <strong>5-Page PDF</strong>{' '}
                                            with strategy and applications
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                            <strong>All necessary file formats</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                            <strong>48-hour delivery</strong>{' '}
                                            guaranteed
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex gap-2">
                                <a 
                                    href="https://buy.stripe.com/7sY9AUaOs7Yva31etnaAw0x"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm cursor-pointer text-center flex items-center justify-center"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Start Your Project
                                </a>
                                <button 
                                    onClick={() => setShowLogoModal(true)}
                                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Learn More
                                </button>
                            </div>

                            {/* Guarantee */}
                            <p className="text-center text-gray-500 text-xs mt-3">
                                Pixel-perfect, ready to use.
                            </p>
                        </div>
                    </div>

                    {/* Web */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Gradient Header */}
                        <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 relative">
                            <div className="absolute top-0 left-0 w-12 h-2 bg-blue-400/30 rounded-r-full blur-sm"></div>
                            <div className="absolute top-0 right-0 w-6 h-2 bg-orange-400/30 rounded-l-full blur-sm"></div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Landing Page
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                High-converting page for Bitcoin brands
                            </p>

                            {/* Pricing */}
                            <div className="mb-4">
                                <div className="text-3xl font-bold text-gray-800">
                                    $799
                                </div>
                                <div className="text-gray-500 text-sm">
                                    one-time payment
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                                    What you get:
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                            <strong>Premium landing page</strong> built to convert visitors
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Smartphone className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                            <strong>Mobile responsive</strong>{' '}
                                            design
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Zap className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                            <strong>SEO optimized</strong> for
                                            search engines
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex gap-2">
                                <a 
                                    href="https://buy.stripe.com/9B63cw09ObaHcb91GBaAw0y"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm cursor-pointer text-center flex items-center justify-center"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Start Your Project
                                </a>
                                <button 
                                    onClick={() => setShowLandingModal(true)}
                                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Learn More
                                </button>
                            </div>

                            {/* Guarantee */}
                            <p className="text-center text-gray-500 text-xs mt-3">
                            Custom designs, conversion-optimized.
                            </p>
                        </div>
                    </div>

                    {/* Social/Ads */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Gradient Header */}
                        <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 relative">
                            <div className="absolute top-0 left-0 w-12 h-2 bg-blue-400/30 rounded-r-full blur-sm"></div>
                            <div className="absolute top-0 right-0 w-6 h-2 bg-orange-400/30 rounded-l-full blur-sm"></div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Social Posts/Ads
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                Strategic social media advertising solutions
                            </p>

                            {/* Pricing */}
                            <div className="mb-4">
                                <div className="text-3xl font-bold text-gray-800">
                                    $499
                                </div>
                                <div className="text-gray-500 text-sm">
                                    one-time payment
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                                    What you get:
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Smartphone className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                            <strong>5 custom designs</strong> for posts or ads
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Target className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                            <strong>Optimized for Instagram/TikTok</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <BarChart3 className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                            <strong>Source files</strong> for future edits
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex gap-2">
                                <a 
                                    href="https://buy.stripe.com/fZu14o4q4baH1wvgBvaAw0z"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm cursor-pointer text-center flex items-center justify-center"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Start Your Project
                                </a>
                                <button 
                                    onClick={() => setShowSocialModal(true)}
                                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Learn More
                                </button>
                            </div>

                            {/* Guarantee */}
                            <p className="text-center text-gray-500 text-xs mt-3">
                                Content your audience will love.
                            </p>
                        </div>
                    </div>


                </div>

                {/* Additional Services Section */}
                <div className="max-w-4xl mx-auto text-center mt-12">
                    <button 
                        onClick={() => {
                            const content = document.getElementById('additional-services-content');
                            const arrow = document.getElementById('additional-services-arrow');
                            if (content && arrow) {
                                if (content.classList.contains('opacity-0')) {
                                    // Expand
                                    content.classList.remove('opacity-0', 'max-h-0');
                                    content.classList.add('opacity-100', 'max-h-96', 'mb-6');
                                    arrow.classList.add('rotate-180');
                                } else {
                                    // Collapse
                                    content.classList.add('opacity-0', 'max-h-0');
                                    content.classList.remove('opacity-100', 'max-h-96', 'mb-6');
                                    arrow.classList.remove('rotate-180');
                                }
                            }
                        }}
                        className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold text-foreground mb-4 hover:text-primary transition-colors cursor-pointer"
                    >
                        Need more? We offer additional services
                        <svg 
                            id="additional-services-arrow"
                            className="w-6 h-6 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div id="additional-services-content" className="grid grid-cols-2 md:grid-cols-3 gap-4 opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                        <div className="flex items-center gap-3 py-2 pl-3 pr-1 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-3.5 h-3.5 md:w-5 md:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-xs md:text-sm">App Design</span>
                        </div>
                        <div className="flex items-center gap-3 py-2 pl-3 pr-1 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-3.5 h-3.5 md:w-5 md:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-xs md:text-sm">Video Editing</span>
                        </div>
                        <div className="flex items-center gap-3 py-2 pl-3 pr-1 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-3.5 h-3.5 md:w-5 md:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-xs md:text-sm">Motion Graphics</span>
                        </div>
                        <div className="flex items-center gap-3 py-2 pl-3 pr-1 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-3.5 h-3.5 md:w-5 md:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-xs md:text-sm">Brand Style Guides</span>
                        </div>
                        <div className="flex items-center gap-3 py-2 pl-3 pr-1 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-3.5 h-3.5 md:w-5 md:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-xs md:text-sm">Email Newsletters</span>
                        </div>
                        <div className="flex items-center gap-3 py-2 pl-3 pr-1 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-3.5 h-3.5 md:w-5 md:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-xs md:text-sm">Custom Projects</span>
                        </div>
                    </div>
                    
                    {/* Book a Call Button */}
                    <div className="mt-2">
                        <button 
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-sm md:text-base"
                            onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ cursor: 'pointer' }}
                        >
                            Book a Call
                        </button>
                    </div>
                </div>
            </section>

            <Separator className="my-8" />

            {/* Book a Call Section */}
            <section id="book-call" className="container mx-auto px-4 py-10 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full mb-4">
                            <span className="text-orange-600 font-medium text-sm">Schedule a Meeting</span>
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Ready to Transform Your Brand?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Let&apos;s discuss how we can help your Bitcoin business stand out.
                        </p>
                    </div>

                    {/* TidyCal Embed */}
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-4">
                            {/*
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    Book Your Free Strategy Call
                                </h3>
                                <p className="text-gray-600">
                                    Choose a time that works for you - no commitment required
                                </p>
                            </div>
                            */}
                            
                            {/* TidyCal Embed */}
                            <div className="flex justify-center">
                                <TidyCalEmbed />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <Separator className="my-16" /> */}



            {/* <Separator className="my-16" /> */}

            {/* CTA Section - Commented Out */}
            {false && (
            <section
                id="contact"
                className="container mx-auto px-4 py-24 relative overflow-hidden"
            >
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-1/4 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-secondary rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Main CTA Card */}
                        <div className="bg-gradient-to-br from-white/90 via-white/80 to-primary/5 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-white/30 shadow-2xl relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-2xl"></div>
                            
                            {/* Content */}
                            <div className="relative z-10 text-center">
                                {/* Badge */}
                                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 rounded-full mb-8 border border-primary/20">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    <span className="text-sm font-semibold text-primary">Let&apos;s Get Started</span>
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                </div>
                                
                                {/* Main Heading */}
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
                                    Ready to Transform Your{' '}
                                    <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                                        Brand?
                                    </span>
                                </h2>
                                
                                {/* Description */}
                                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                                    Let&apos;s discuss how we can help your Bitcoin business stand out in the competitive crypto market 
                                    and create a brand that resonates with your audience.
                                </p>
                                
                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <span className="mr-2">🚀</span>
                                        Schedule a Consultation
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                    >
                                        <span className="mr-2">📊</span>
                                        View Case Studies
                                    </Button>
                                </div>
                                
                                {/* Trust Indicators */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span>Free Strategy Call</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span>No Commitment Required</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        <span>Bitcoin Payment Accepted</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </section>
            )}

            {/* <Separator className="my-16" /> */}

            {/* Footer */}
            <footer className="border-t border-border bg-gradient-to-b from-gray-50 to-gray-200 dark:from-black dark:to-background relative">
                {/* Background Noise Image */}
                <div className="absolute inset-0 opacity-10 dark:opacity-5">
                    <Image
                        src="/noise.png"
                        alt=""
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                
                <div className="container mx-auto px-4 py-12 relative z-10">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Logo />
                            </div>
                            <p className="text-muted-foreground">
                                Digital solutions for the Bitcoin
                                ecosystem.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">
                                Services
                            </h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => setShowLogoModal(true)}>Logo Design</li>
                                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => setShowLandingModal(true)}>Landing Pages</li>
                                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => setShowSocialModal(true)}>Social Media Ads</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</li>
                                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })}>Book a Call</li>
                                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => {
                                    const servicesSection = document.getElementById('services');
                                    if (servicesSection) {
                                        const offset = 80; // Account for reduced padding
                                        const elementPosition = servicesSection.offsetTop - offset;
                                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                                    }
                                }}>Services</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">
                                Contact
                            </h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => {
                                    navigator.clipboard.writeText('hey@brandingbitcoin.com');
                                    const audio = new Audio('/sounds/pop.mp3');
                                    audio.play().catch(e => console.log('Audio playback failed:', e));
                                    
                                    const popup = document.createElement('div');
                                    popup.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform -translate-y-full transition-transform duration-300';
                                    popup.textContent = '📋 Email copied to clipboard!';
                                    document.body.appendChild(popup);
                                    
                                    setTimeout(() => popup.classList.remove('-translate-y-full'), 10);
                                    setTimeout(() => {
                                        if (document.body.contains(popup)) {
                                            document.body.removeChild(popup);
                                        }
                                    }, 2000);
                                }}>hey@brandingbitcoin.com</li>
                                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })}>Free Strategy Call</li>
                            </ul>
                        </div>
                    </div>
                    <Separator className="my-8" />
                    <div className="text-center text-muted-foreground mt-8">
                        <p>
                            &copy; {currentYear} BrandingBitcoin. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Logo Design Modal */}
            {showLogoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowLogoModal(false)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-xl shadow-2xl max-w-[95vw] md:max-w-2xl w-full overflow-hidden">
                        {/* Gradient Header */}
                        <div className="h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 relative -mt-0.5 -ml-0.5 -mr-0.5 w-[calc(100%+1px)]">
                            <div className="absolute top-0 left-0 w-12 h-3 bg-blue-400/30 rounded-r-full blur-sm"></div>
                            <div className="absolute top-0 right-0 w-6 h-3 bg-orange-400/30 rounded-l-full blur-sm"></div>
                        </div>
                        
                        {/* Close Button */}
                        <button
                            onClick={() => setShowLogoModal(false)}
                            className="absolute top-5 right-3 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Modal Body */}
                        <div className="p-4 md:p-6">
                            {/* Header */}
                            <div className="text-center mb-4 md:mb-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <Palette className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                    Logo Design & Branding Package
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
                                    Professional logo and brand package
                                </p>
                            </div>
                            
                            {/* Service Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            Process
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600 font-semibold text-xs md:text-sm">
                                                    1
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm"><strong>Quick Start</strong>: Fill out a short form about your goals.</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600 font-semibold text-xs md:text-sm">
                                                    2
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm"><strong>Creative Direction</strong>: Receive a tailored moodboard.</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600 font-semibold text-xs md:text-sm">
                                                    3
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm"><strong>Final Design</strong>: Once approved, we deliver your logo.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            Your Delivery Includes
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <div className="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm">Custom Logo Design crafted for your brand</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm">5-Page PDF brand guide with applications and strategy</span>
                                            </div>

                                            <div className="flex items-start gap-2">
                                                <div className="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm">All Source Files (AI, SVG, PNG, JPEG) for any use</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* CTA Section */}
                            <div className="text-center pt-4 border-t border-gray-200">
                                <div className="mb-3">
                                    <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">$299</div>
                                    <div className="text-gray-600 text-xs md:text-sm">One-time payment</div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                    <a 
                                        href="https://buy.stripe.com/7sY9AUaOs7Yva31etnaAw0x"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl text-xs md:text-sm cursor-pointer text-center flex items-center justify-center"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Start Your Project
                                    </a>
                                    <button 
                                        className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl text-xs md:text-sm cursor-pointer"
                                        onClick={() => {
                                            setShowLogoModal(false);
                                            document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Book a Call
                                    </button>
                                    <button 
                                        onClick={() => setShowLogoModal(false)}
                                        className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm cursor-pointer"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Close
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    <strong>Prefer to pay in Bitcoin?</strong> Book a call or email us at{' '}
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText('hey@brandingbitcoin.com');
                                            
                                            // Play pop sound
                                            const audio = new Audio('/sounds/pop.mp3');
                                            audio.play().catch(e => console.log('Audio playback failed:', e));
                                            
                                            // Show popup
                                            const popup = document.createElement('div');
                                            popup.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform -translate-y-full transition-transform duration-300';
                                            popup.textContent = '📋 Copied to Clipboard!';
                                            document.body.appendChild(popup);
                                            
                                            // Animate popup sliding down
                                            setTimeout(() => {
                                                popup.classList.remove('-translate-y-full');
                                            }, 10);
                                            
                                            // Remove popup after 2 seconds
                                            setTimeout(() => {
                                                if (document.body.contains(popup)) {
                                                    document.body.removeChild(popup);
                                                }
                                            }, 2000);
                                        }}
                                        className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                                    >
                                        hey@brandingbitcoin.com
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Landing Page Modal */}
            {showLandingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowLandingModal(false)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-xl shadow-2xl max-w-[95vw] md:max-w-2xl w-full overflow-hidden">
                        {/* Gradient Header */}
                        <div className="h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 relative -mt-0.5 -ml-0.5 -mr-0.5 w-[calc(100%+1px)]">
                            <div className="absolute top-0 left-0 w-12 h-3 bg-blue-400/30 rounded-r-full blur-sm"></div>
                            <div className="absolute top-0 right-0 w-6 h-3 bg-orange-400/30 rounded-l-full blur-sm"></div>
                        </div>
                        
                        {/* Close Button */}
                        <button
                            onClick={() => setShowLandingModal(false)}
                            className="absolute top-5 right-3 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Modal Body */}
                        <div className="p-4 md:p-6">
                            {/* Header */}
                            <div className="text-center mb-4 md:mb-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                    Landing Page Design Package
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
                                    High-converting page for Bitcoin brands
                                </p>
                            </div>
                            
                            {/* Service Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            Process
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600 font-semibold text-xs md:text-sm">
                                                    1
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm"><strong>Quick Start</strong>: Fill out a form about your brand and website goals.</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600 font-semibold text-xs md:text-sm">
                                                    2
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm"><strong>Creative Direction</strong>: Receive a tailored wireframe of your site capturing your vision.</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600 font-semibold text-xs md:text-sm">
                                                    3
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm"><strong>Final Design</strong>: Once approved, we deliver your conversion-optimized site.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            Your Delivery Includes
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <div className="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm">Premium landing page built to convert visitors</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm">Mobile responsive design optimized for all devices</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm">SEO optimization for better search engine visibility</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* CTA Section */}
                            <div className="text-center pt-4 border-t border-gray-200">
                                <div className="mb-3">
                                    <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">$799</div>
                                    <div className="text-gray-600 text-xs md:text-sm">One-time payment</div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                    <a 
                                        href="https://buy.stripe.com/9B63cw09ObaHcb91GBaAw0y"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl text-xs md:text-sm cursor-pointer text-center flex items-center justify-center"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Start Your Project
                                    </a>
                                    <button 
                                        className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl text-xs md:text-sm cursor-pointer"
                                        onClick={() => {
                                            setShowLandingModal(false);
                                            document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Book a Call
                                    </button>
                                    <button 
                                        onClick={() => setShowLandingModal(false)}
                                        className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm cursor-pointer"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Close
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    <strong>Prefer to pay in Bitcoin?</strong> Book a call or email us at{' '}
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText('hey@brandingbitcoin.com');
                                            
                                            // Play pop sound
                                            const audio = new Audio('/sounds/pop.mp3');
                                            audio.play().catch(e => console.log('Audio playback failed:', e));
                                            
                                            // Show popup
                                            const popup = document.createElement('div');
                                            popup.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform -translate-y-full transition-transform duration-300';
                                            popup.textContent = '📋 Copied to Clipboard!';
                                            document.body.appendChild(popup);
                                            
                                            // Animate popup sliding down
                                            setTimeout(() => {
                                                popup.classList.remove('-translate-y-full');
                                            }, 10);
                                            
                                            // Remove popup after 2 seconds
                                            setTimeout(() => {
                                                if (document.body.contains(popup)) {
                                                    document.body.removeChild(popup);
                                                }
                                            }, 2000);
                                        }}
                                        className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                                    >
                                        hey@brandingbitcoin.com
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Social Posts/Ads Modal */}
            {showSocialModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowSocialModal(false)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-xl shadow-2xl max-w-[95vw] md:max-w-2xl w-full overflow-hidden">
                        {/* Gradient Header */}
                        <div className="h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 relative -mt-0.5 -ml-0.5 -mr-0.5 w-[calc(100%+1px)]">
                            <div className="absolute top-0 left-0 w-12 h-3 bg-blue-400/30 rounded-r-full blur-sm"></div>
                            <div className="absolute top-0 right-0 w-6 h-3 bg-orange-400/30 rounded-l-full blur-sm"></div>
                        </div>
                        
                        {/* Close Button */}
                        <button
                            onClick={() => setShowSocialModal(false)}
                            className="absolute top-5 right-3 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Modal Body */}
                        <div className="p-4 md:p-6">
                            {/* Header */}
                            <div className="text-center mb-4 md:mb-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                    Social Media & Advertising Package
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
                                    Strategic social media advertising solutions
                                </p>
                            </div>
                            
                            {/* Service Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            Process
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600 font-semibold text-xs md:text-sm">
                                                    1
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm"><strong>Quick Start</strong>: Fill out a short form about your brand and goals.</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600 font-semibold text-xs md:text-sm">
                                                    2
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm"><strong>Creative Direction</strong>: Receive a tailored moodboard capturing your style and vision.</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600 font-semibold text-xs md:text-sm">
                                                    3
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm"><strong>Final Designs</strong>: We deliver 5 custom posts/ads optimized for Instagram or TikTok.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            Your Delivery Includes
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <div className="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm">5 custom designs for posts or ads</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm">Optimized for Instagram/TikTok platforms</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-orange-600" />
                                                </div>
                                                <span className="text-gray-700 text-xs md:text-sm">Source files for future edits and modifications</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* CTA Section */}
                            <div className="text-center pt-4 border-t border-gray-200">
                                <div className="mb-3">
                                    <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">$499</div>
                                    <div className="text-gray-600 text-xs md:text-sm">One-time payment</div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                    <a 
                                        href="https://buy.stripe.com/fZu14o4q4baH1wvgBvaAw0z"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl text-xs md:text-sm cursor-pointer text-center flex items-center justify-center"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Start Your Project
                                    </a>
                                    <button 
                                        className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl text-xs md:text-sm cursor-pointer"
                                        onClick={() => {
                                            setShowSocialModal(false);
                                            document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Book a Call
                                    </button>
                                    <button 
                                        onClick={() => setShowSocialModal(false)}
                                        className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm cursor-pointer"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Close
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    <strong>Prefer to pay in Bitcoin?</strong> Book a call or email us at{' '}
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText('hey@brandingbitcoin.com');
                                            
                                            // Play pop sound
                                            const audio = new Audio('/sounds/pop.mp3');
                                            audio.play().catch(e => console.log('Audio playback failed:', e));
                                            
                                            // Show popup
                                            const popup = document.createElement('div');
                                            popup.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform -translate-y-full transition-transform duration-300';
                                            popup.textContent = '📋 Copied to Clipboard!';
                                            popup.textContent = '📋 Copied to Clipboard!';
                                            document.body.appendChild(popup);
                                            
                                            // Animate popup sliding down
                                            setTimeout(() => {
                                                popup.classList.remove('-translate-y-full');
                                            }, 10);
                                            
                                            // Remove popup after 2 seconds
                                            setTimeout(() => {
                                                if (document.body.contains(popup)) {
                                                    document.body.removeChild(popup);
                                                }
                                            }, 2000);
                                        }}
                                        className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                                    >
                                        hey@brandingbitcoin.com
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
