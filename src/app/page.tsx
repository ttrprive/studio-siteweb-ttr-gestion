"use client";

import React, { useEffect } from 'react';
import AOS from 'aos';
import ThreeDCard from "@/components/three-d-card";

const FeaturesSection = () => (
  <section className="w-full py-20 px-4 md:px-8 bg-background">
    <div className="max-w-4xl mx-auto text-center">
      <h2 data-aos="fade-down" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        TTR GESTION
      </h2>
      <p data-aos="fade-up" className="text-lg text-muted-foreground mb-12">
        Un outil puissant pour simplifier chaque étape de votre organisation financière
      </p>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div data-aos="fade-up" data-aos-delay="0" className="bg-card p-6 rounded-lg border border-border/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">📊 Suivi complet des finances</h3>
          <p className="text-muted-foreground">Surveillez vos revenus, dépenses, dettes, marges en temps réel. Un tableau de bord épuré, toujours à jour.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="100" className="bg-card p-6 rounded-lg border border-border/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">🧮 Planification stratégique</h3>
          <p className="text-muted-foreground">Créez des prévisions, comparez des scénarios, gérez vos liquidités. TTR GESTION vous aide à anticiper l’avenir.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="200" className="bg-card p-6 rounded-lg border border-border/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">📁 Organisation par entité ou projet</h3>
          <p className="text-muted-foreground">Gérez plusieurs boutiques, comptes ou divisions depuis un seul espace, avec des options filtrées intelligentes.</p>
        </div>
      </div>
    </div>
  </section>
);

const TargetAudienceSection = () => (
  <section className="w-full py-20 px-4 md:px-8 bg-black">
    <div className="max-w-4xl mx-auto text-center">
      <h2 data-aos="fade-down" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
        Pour qui est TTR GESTION ?
      </h2>
      <p data-aos="fade-up" className="text-lg text-muted-foreground mb-12">
        Une solution pensée pour tous les profils, sans distinction
      </p>
      <div className="grid md:grid-cols-2 gap-8 text-left">
        <div data-aos="fade-up" data-aos-delay="0" className="bg-card p-6 rounded-lg border border-border/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">🏢 Grandes entreprises</h3>
          <p className="text-muted-foreground">Coordonnez plusieurs antennes, services ou départements, avec suivi consolidé et délégué.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="100" className="bg-card p-6 rounded-lg border border-border/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">🛍️ Petites boutiques</h3>
          <p className="text-muted-foreground">Gardez le contrôle sur votre activité, sans tracas ni jargon complexe. Un tableau de bord simple et visuel.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="200" className="bg-card p-6 rounded-lg border border-border/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">👤 Indépendants & freelances</h3>
          <p className="text-muted-foreground">Visualisez vos revenus et dépenses, préparez vos déclarations, gérez vos clients sereinement.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="300" className="bg-card p-6 rounded-lg border border-border/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">🌍 Tous les métiers</h3>
          <p className="text-muted-foreground">Que vous soyez dans la santé, le commerce, l’éducation, l’artisanat ou le conseil : TTR GESTION s’adapte.</p>
        </div>
      </div>
    </div>
  </section>
);

const AppFooter = () => (
    <footer className="w-full py-8 px-4 md:px-8 border-t border-border/20">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground">
            <p>&copy; 2025 TTR GESTION — L’intelligence au service de chaque métier</p>
        </div>
    </footer>
);

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <main className="bg-black text-foreground">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="absolute size-[500px] rounded-full bg-blue-500/30 blur-[200px]" />
        </div>
        <div className="relative z-10">
          <ThreeDCard />
        </div>
      </section>

      <FeaturesSection />

      <TargetAudienceSection />

      <AppFooter />
    </main>
  );
}
