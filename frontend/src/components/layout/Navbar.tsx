"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaMenu from "./MegaMenu";

const navLinks = [
    { label: "Work", href: "/works" },
    { label: "Company", href: "/company" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    transition: "all 300ms ease",
                    backgroundColor: isScrolled || isMenuOpen ? "#ffffff" : "transparent",
                    borderBottom: isScrolled
                        ? "1px solid #e8e6df"
                        : "1px solid transparent",
                }}
            >
                <div
                    className="container-custom"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "72px",
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "var(--color-black)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Waft<span style={{ color: "var(--color-brand-teal)" }}>.</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2rem",
                            opacity: isMenuOpen ? 0 : 1,
                            pointerEvents: isMenuOpen ? "none" : "auto",
                            transition: "opacity 200ms ease",
                        }}
                        className="desktop-nav"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.9rem",
                                    fontWeight: 400,
                                    color:
                                        pathname === link.href
                                            ? "var(--color-black)"
                                            : "var(--color-gray-mid)",
                                    transition: "color 150ms ease",
                                    letterSpacing: "0.01em",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--color-black)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color =
                                        pathname === link.href
                                            ? "var(--color-black)"
                                            : "var(--color-gray-mid)";
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side — CTA + Hamburger */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        {/* CTA Button */}
                        <Link
                            href="/contact"
                            className="desktop-nav"
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                color: "#ffffff",
                                backgroundColor: "var(--color-black)",
                                padding: "0.625rem 1.25rem",
                                borderRadius: "var(--radius-full)",
                                transition: "background-color 150ms ease",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    "var(--color-brand-teal)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--color-black)";
                            }}
                        >
                            Start your project
                        </Link>

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "5px",
                                width: "40px",
                                height: "40px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "8px",
                            }}
                            aria-label="Toggle menu"
                        >
              <span
                  style={{
                      display: "block",
                      width: "22px",
                      height: "1.5px",
                      backgroundColor: "var(--color-black)",
                      transition: "all 300ms ease",
                      transform: isMenuOpen
                          ? "translateY(6.5px) rotate(45deg)"
                          : "none",
                  }}
              />
                            <span
                                style={{
                                    display: "block",
                                    width: "22px",
                                    height: "1.5px",
                                    backgroundColor: "var(--color-black)",
                                    transition: "all 300ms ease",
                                    opacity: isMenuOpen ? 0 : 1,
                                }}
                            />
                            <span
                                style={{
                                    display: "block",
                                    width: "22px",
                                    height: "1.5px",
                                    backgroundColor: "var(--color-black)",
                                    transition: "all 300ms ease",
                                    transform: isMenuOpen
                                        ? "translateY(-6.5px) rotate(-45deg)"
                                        : "none",
                                }}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mega Menu */}
            <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Mobile nav padding helper */}
            <div style={{ height: "72px" }} />

            {/* Desktop nav styles */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
        </>
    );
}