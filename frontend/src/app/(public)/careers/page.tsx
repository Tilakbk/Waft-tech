"use client";

import { useState } from "react";
import Link from "next/link";
import { DollarSign, UserCheck, Heart, Users, Utensils, Laugh, Cpu, GraduationCap, Home } from "lucide-react";
import CoreValues from "@/components/company/CoreValues";
import OpenRoles from "@/components/careers/OpenRoles";

const benefits = [
  { label: "Competitive Salary and Benefits", Icon: DollarSign },
  { label: "A Hassle-Free Interview Process", Icon: UserCheck },
  { label: "Hone your interests", Icon: Heart },
  { label: "Passionate, and dedicated colleagues", Icon: Users },
  { label: "Healthy Lunch and snacks", Icon: Utensils },
  { label: "Open and fun working environment", Icon: Laugh },
  { label: "Work with new technologies", Icon: Cpu },
  { label: "Learn from the experts", Icon: GraduationCap },
  { label: "Flexible Options for Working from Home", Icon: Home },
];

const photos = [
  "/images/careers/team-1.jpg",
  "/images/careers/team-2.jpg",
  "/images/careers/team-3.jpg",
  "/images/careers/team-4.jpg",
  "/images/careers/team-5.jpg",
];

export default function CareersPage() {
  return (
    <main>
      {/* Hero — two column, text left + image right */}
      <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "8rem", paddingBottom: "0", overflow: "hidden" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-end" }}>
          <div style={{ paddingBottom: "6rem" }}>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 700,
              color: "var(--color-black)",
              lineHeight: 1.0,
              marginBottom: "1.5rem",
            }}>
              Your dream job awaits
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "420px" }}>
              We are always on the lookout for enthusiastic and talented professionals. Let us make a positive impact on the world through our work!
            </p>
            
            <a 
              href="mailto:hr@wafttech.io"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#ffffff",
                backgroundColor: "var(--color-brand-teal)",
                padding: "1rem 2rem",
                borderRadius: "var(--radius-full)",
                transition: "background-color 150ms ease",
                textDecoration: "none"
              }}
            >
              Get connected &#x2192;
            </a>
          </div>

          {/* Hero image — sits flush at bottom */}
          <div style={{
            width: "100%",
            height: "min(60vw, 520px)",
            overflow: "hidden",
            borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
            backgroundColor: "var(--color-gray-border)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/careers/hero.jpg" alt="Team working" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
        </div>
      </section>

      {/* Working Together */}
      <section style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.0,
          }}>
            Working Together
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--color-brand-teal)", lineHeight: 1.8 }}>
            We value your personal and professional growth. From having impromptu knowledge-sharing sessions to having dedicated formal training, we do everything to ensure that you learn the ropes of the job while on the job. We are always looking for enthusiastic and talented individuals who love collaborating to solve real-world problems. Time to elevate your career.
          </p>
        </div>
      </section>

      {/* Core Values — reuse from company */}
      <CoreValues />

      {/* Open Positions */}
      <OpenRoles />

      {/* Diversity */}
      <section style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-gray-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Diversity</p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              color: "var(--color-black)",
              lineHeight: 1.15,
            }}>
              We are more than just a company. We are a group of musicians, athletes, movie buffs, cooks, poets, and outdoor enthusiasts (to name a few). More than that, we are friends who encourage one another to do their best.
            </h2>
          </div>
          <div style={{ width: "100%", height: "min(45vw, 440px)", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/careers/diversity.jpg" alt="Team diversity" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* Live your fullest — benefits grid */}
      <section style={{ paddingTop: "7rem", paddingBottom: "7rem", backgroundColor: "var(--color-white)" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "var(--color-black)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}>
              Live your fullest at Waft Tech.
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-brand-teal)", lineHeight: 1.8 }}>
              We are committed to hiring diverse talent and ensuring you receive respect and assistance throughout the interview process and after you start working for Waft Tech. We value diversity and want to provide an environment where everyone has an equal chance to succeed.
            </p>
          </div>

          {/* Benefits grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3rem" }}>
            {benefits.map(({ label, Icon }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--color-brand-teal-light)",
                  borderRadius: "var(--radius-md)",
                }}>
                  <Icon size={28} strokeWidth={1.5} color="var(--color-brand-teal)" />
                </div>
                <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--color-black)", lineHeight: 1.4 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery — full-width horizontal scroll */}
      <section style={{ paddingTop: "4rem", paddingBottom: "4rem", overflow: "hidden" }}>
        <div style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }}
          className="hide-scrollbar"
        >
          {photos.map((src, i) => (
            <div key={i} style={{
              flex: "0 0 auto",
              width: "min(40vw, 380px)",
              height: "min(30vw, 280px)",
              overflow: "hidden",
              backgroundColor: "var(--color-gray-bg)",
              scrollSnapAlign: "start",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={"Team photo " + (i + 1)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      </section>

      {/* Looking for someone like you */}
      <section style={{ paddingTop: "7rem", paddingBottom: "7rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            color: "var(--color-black)",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}>
            We are looking for someone like you.
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Leave your information, and we will get back to you with any openings that suit your skillset.
          </p>
          
          <a 
            href="mailto:hr@wafttech.io"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#ffffff",
              backgroundColor: "var(--color-brand-teal)",
              padding: "1rem 2rem",
              borderRadius: "var(--radius-full)",
              textDecoration: "none"
            }}
          >
            Get connected &#x2192;
          </a>
        </div>
      </section>

      {/* Bottom callout boxes */}
      <section style={{ backgroundColor: "var(--color-gray-bg)", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1rem" }}>
              Looking for internships?
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1rem" }}>
              If you want to get exposure and enhance your skills in design or development, we can help you. Apply for an internship at Waft Tech today! To apply, send your resume at:
            </p>
            <a href="mailto:hr@wafttech.io" style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--color-brand-teal)", borderBottom: "1px solid var(--color-brand-teal)", paddingBottom: "2px", textDecoration: "none" }}>
              hr@wafttech.io
            </a>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-black)", marginBottom: "1rem" }}>
              Didn&apos;t find the right fit?
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--color-gray-mid)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Did not find the right position that you are applying for or there is no vacancy for the job you want? Apply anyway — we will definitely get back to you after a while.
            </p>
            <a href="mailto:hr@wafttech.io" style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--color-brand-teal)", borderBottom: "1px solid var(--color-brand-teal)", paddingBottom: "2px", textDecoration: "none" }}>
              hr@wafttech.io
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}