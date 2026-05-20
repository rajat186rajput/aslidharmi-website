"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLang, t, tx } from "@/lib/i18n";
import { LangSelector } from "@/components/LangSelector";

// Asli Dharmi routes (brand wordmark on the left links to Home)
const navItems = [
  { key: "about", href: "/about" },
  { key: "philosophy", href: "/philosophy" },
  { key: "kaam", href: "/kaam" },
  { key: "content", href: "/content" },
  { key: "paisa", href: "/paisa" },
] as const;

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
} as const;

const logoVariants = {
  expanded: { opacity: 1, x: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, transition: { duration: 0.3 } },
} as const;

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
} as const;

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.15 },
  },
} as const;

export function AnimatedNavFramer() {
  const pathname = usePathname();
  const { lang } = useLang();
  const [isExpanded, setExpanded] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  // Close the mobile menu whenever the route changes
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <>
      {/* ════════ DESKTOP: animated pill ════════ */}
      <div className="hidden md:block fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          whileHover={!isExpanded ? { scale: 1.1 } : {}}
          whileTap={!isExpanded ? { scale: 0.95 } : {}}
          onClick={handleNavClick}
          className={cn(
            "flex items-center overflow-hidden rounded-full border border-charcoal/10 bg-cream/85 shadow-lg backdrop-blur-md h-12",
            !isExpanded && "cursor-pointer justify-center"
          )}
        >
          <motion.div variants={logoVariants} className="flex-shrink-0 flex items-center pl-5 pr-3">
            <Link
              href="/"
              onClick={(e) => e.stopPropagation()}
              className="font-heading text-base font-semibold text-charcoal hover:text-ochre transition-colors tracking-tight whitespace-nowrap"
            >
              {tx(t.nav.brand, lang)}
            </Link>
          </motion.div>

          <motion.div className={cn("flex items-center gap-1 lg:gap-2 pr-2", !isExpanded && "pointer-events-none")}>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <motion.div key={item.key} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "block text-sm font-medium transition-colors px-2.5 py-1 whitespace-nowrap",
                      active ? "text-ochre" : "text-charcoal/55 hover:text-charcoal"
                    )}
                  >
                    {tx(t.nav[item.key], lang)}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div variants={itemVariants}>
              <Link
                href="/join"
                onClick={(e) => e.stopPropagation()}
                className="block px-4 py-1.5 bg-ochre text-cream text-sm font-medium rounded-full hover:bg-charcoal transition-colors whitespace-nowrap"
              >
                {tx(t.nav.join, lang)}
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
              <LangSelector />
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div variants={collapsedIconVariants} animate={isExpanded ? "expanded" : "collapsed"}>
              <Menu className="h-5 w-5 text-charcoal" />
            </motion.div>
          </div>
        </motion.nav>
      </div>

      {/* ════════ MOBILE: compact bar + overlay menu ════════ */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-5 h-14 bg-cream/90 backdrop-blur-md border-b border-charcoal/10">
          <Link href="/" className="font-heading text-lg font-semibold text-charcoal tracking-tight">
            {tx(t.nav.brand, lang)}
          </Link>
          <button
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="text-charcoal w-9 h-9 -mr-2 flex items-center justify-center"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-cream border-b border-charcoal/10 shadow-lg"
            >
              <div className="flex flex-col px-5 py-3">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-sans text-base py-3 border-b border-charcoal/5",
                      pathname === item.href ? "text-ochre" : "text-charcoal/75"
                    )}
                  >
                    {tx(t.nav[item.key], lang)}
                  </Link>
                ))}
                <Link
                  href="/join"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 px-5 py-3 bg-ochre text-cream font-sans text-sm font-medium rounded-sm text-center"
                >
                  {tx(t.nav.join, lang)}
                </Link>
                <div className="mt-4 pb-1">
                  <LangSelector />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
