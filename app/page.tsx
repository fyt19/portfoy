"use client";

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform, Variants } from "framer-motion";
import { 
  Github, Linkedin, ArrowRight, Code2, 
  Database, Server, LayoutTemplate, Smartphone, Download,
  Briefcase, GraduationCap, Globe, Layers,
  Sun, Moon
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect, MouseEvent, useRef } from "react";

// --- ANIMASYON VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 }, 
  visible: { 
    opacity: 1, y: 0, 
    transition: { type: "spring", stiffness: 60, damping: 20 } 
  }
};

// --- SPOTLIGHT KART BİLEŞENİ ---
function SpotlightCard({ children, className = "", spotlightColor = "rgba(6, 182, 212, 0.2)" }: { children: React.ReactNode, className?: string, spotlightColor?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`group relative border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full z-20">{children}</div>
    </motion.div>
  );
}

// --- VERİLER ---
const projects = [
    {
      id: "ihtiyacim-ne", title: "İhtiyacım Ne?", category: "Sosyal Platform",
      desc: "İnsanların ihtiyaçlarını dile getirebildiği, filtrelemeli sosyal yardımlaşma ağı.",
      tech: ["PHP", "JavaScript", "MySQL"],
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      id: "kucuk-burjuvazi", title: "Küçük Burjuvazi", category: "E-Ticaret",
      desc: "Lüks tüketim odaklı, yüksek performanslı ve animasyonlu e-ticaret arayüzü.",
      tech: ["Next.js", "Tailwind", "Framer"],
      gradient: "from-purple-600 to-pink-500"
    },
    {
      id: "gazete-ege", title: "Gazete Ege CMS", category: "CMS Sistemi",
      desc: "Yerel bir haber platformu için özel geliştirilmiş dijital içerik yönetim paneli.",
      tech: ["Node.js", "MongoDB", "React Admin"],
      gradient: "from-orange-600 to-red-500"
    }
];

const timeline = [
  { year: "2026", title: "Master Hazırlığı", desc: "Veri Yapıları & Algoritmalar üzerine ileri seviye çalışmalar.", icon: GraduationCap },
  { year: "2025", title: "Bumm Production", desc: "Prodüksiyon ajansı için Next-Gen web altyapısı.", icon: Briefcase },
  { year: "2024", title: "Gazete Ege", desc: "Haber sistemleri ve dijital dönüşüm liderliği.", icon: Code2 }
];

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // SCROLL ANIMASYONU AYARLARI
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });

  const titleX = useTransform(scrollYProgress, [0, 0.35, 0.8], ["0%", "0%", "-30%"]); 
  const titleScale = useTransform(scrollYProgress, [0, 0.35, 0.8], [1, 1, 0.9]);
  const titleOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  
  const descX = useTransform(scrollYProgress, [0.35, 0.6], ["100px", "0px"]);
  const descOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);

  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen bg-neutral-50 text-neutral-900 dark:bg-[#050505] dark:text-white font-sans transition-colors duration-300">
      
      {/* CSS: RGB Text Animasyonu */}
      <style jsx global>{`
        @keyframes animatedgradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 300%;
          animation: animatedgradient 4s ease infinite alternate;
        }
        body { overflow-x: hidden; }
      `}</style>

      {/* Arka Plan Efektleri */}
      <div className="fixed inset-0 opacity-[0.06] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.06] pointer-events-none z-0"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full p-6 px-4 md:px-8 flex justify-between items-center z-50 bg-white/70 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-neutral-200 dark:border-white/5">
         <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
            FYT
         </div>
         <div className="flex items-center gap-4">
            {mounted && (
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:scale-110 transition-transform active:scale-95">
                {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-neutral-700" />}
              </button>
            )}
            <a href="mailto:ohufyt@gmail.com" className="hidden md:block px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-80 transition-opacity">İletişim</a>
         </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section ref={targetRef} className="relative h-[250vh] z-10">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-cyan-500/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none opacity-40 -z-10"></div>

            <div className="container max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
                {/* SOL TARAF: BAŞLIK */}
                <motion.div 
                    style={{ 
                        x: typeof window !== 'undefined' && window.innerWidth > 768 ? titleX : 0,
                        scale: typeof window !== 'undefined' && window.innerWidth > 768 ? titleScale : 1,
                        opacity: titleOpacity
                    }} 
                    className="md:col-span-2 text-center origin-center md:origin-left z-20"
                >
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-600 dark:text-cyan-400 font-bold tracking-wide">
                        🚀 Freelance Projeler İçin Uygun
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.9]">
                        NEXT <br /> LEVEL <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 animate-gradient">
                            CREATOR.
                        </span>
                    </h1>

                    <div className="md:hidden mt-8">
                         <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
                            Merhaba, ben Furkan. Modern web teknolojileriyle sıradışı dijital deneyimler tasarlıyorum.
                        </p>
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <a href="#projects" className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full w-full flex justify-center items-center gap-2">
                                Projeler <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* SAĞ TARAF: AÇIKLAMA */}
                <motion.div 
                    style={{ opacity: descOpacity, x: descX }}
                    className="hidden md:block absolute right-4 md:right-20 top-1/2 -translate-y-1/2 max-w-md text-right z-20"
                >
                    <p className="text-neutral-600 dark:text-neutral-400 text-2xl font-medium leading-relaxed mb-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm p-4 rounded-2xl border border-transparent">
                        Merhaba, ben Furkan. <br/>
                        Modern web teknolojileriyle <span className="text-black dark:text-white underline decoration-cyan-500 underline-offset-4">sıradışı</span> dijital deneyimler tasarlıyorum.
                    </p>
                    <div className="flex flex-col gap-4 items-end">
                        <a href="#projects" className="px-10 py-5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-cyan-500/20">
                           Çalışmalarım <ArrowRight size={20} />
                        </a>
                        <a href="/cv.pdf" download className="px-10 py-5 border border-neutral-300 dark:border-white/20 font-bold rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-all flex items-center gap-2">
                           CV İndir <Download size={20} />
                        </a>
                    </div>
                </motion.div>
            </div>
            
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="hidden md:block absolute bottom-10 text-neutral-400"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest opacity-70">Aşağı Kaydır</span>
                    <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2 opacity-50">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 2. UZMANLIK ALANLARI */}
      <section className="py-20 px-4 relative z-10 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="mb-12 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Uzmanlık Alanlarım</h2>
            <p className="text-xl text-neutral-500 max-w-2xl">Sadece kod yazmıyorum; yaşayan, nefes alan ve etkileşim kuran sistemler inşa ediyorum.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <SpotlightCard className="md:col-span-2 rounded-[32px] p-10 flex flex-col justify-between group" spotlightColor="rgba(6, 182, 212, 0.4)">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner shadow-cyan-500/20">
                    <Globe size={32} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-3 group-hover:text-cyan-500 transition-colors">Modern Web Geliştirme</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg">Next.js 14, React ve Tailwind CSS ile SEO uyumlu, ışık hızında web siteleri. Animasyonlar ve interaktif UI bileşenleri.</p>
                </div>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-1 rounded-[32px] p-8 flex flex-col justify-center items-center text-center group" spotlightColor="rgba(59, 130, 246, 0.4)">
                 <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-inner shadow-blue-500/20">
                    <Smartphone size={36} />
                 </div>
                 <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">Mobil Uygulama</h3>
                 <p className="text-neutral-500 dark:text-neutral-400">Flutter & React Native ile iOS ve Android için native deneyimler.</p>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-1 rounded-[32px] p-8 flex flex-col justify-center items-center text-center group" spotlightColor="rgba(168, 85, 247, 0.4)">
                 <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform shadow-inner shadow-purple-500/20">
                    <Database size={36} />
                 </div>
                 <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-500 transition-colors">Backend & API</h3>
                 <p className="text-neutral-500 dark:text-neutral-400">Node.js, SQL/NoSQL ve ölçeklenebilir bulut mimarileri.</p>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-2 rounded-[32px] p-10 flex flex-col justify-between group" spotlightColor="rgba(236, 72, 153, 0.4)">
                <div className="flex justify-between items-start">
                    <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mb-4 group-hover:rotate-[-10deg] transition-transform duration-500 shadow-inner shadow-pink-500/20">
                        <Layers size={32} />
                    </div>
                    <ArrowRight className="text-neutral-300 group-hover:text-pink-500 transition-colors -rotate-45" size={32} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-3 group-hover:text-pink-500 transition-colors">UI/UX & Tasarım Sistemleri</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg">Figma'dan koda kusursuz geçiş. Kullanıcı odaklı arayüzler, erişilebilirlik standartları ve estetik detaylar.</p>
                </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* 3. PROJELER */}
      <section id="projects" className="py-32 px-4 bg-neutral-100 dark:bg-[#080808] relative z-10">
        <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-bold mb-20">Seçili Projeler</motion.h2>
            <div className="space-y-32">
            {projects.map((project, index) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center group">
                  <div className={`md:col-span-5 ${index % 2 !== 0 && 'md:order-2'}`}>
                    <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-500 font-bold mb-4"><span className="w-8 h-[2px] bg-cyan-500"></span> {project.category}</div>
                    <h3 className="text-5xl font-black mb-6 leading-tight group-hover:text-cyan-500 transition-colors duration-300">{project.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8 leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-3 mb-10">{project.tech.map(t => (<span key={t} className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-lg text-sm font-medium">{t}</span>))}</div>
                    <a href="#" className="inline-flex items-center gap-3 text-lg font-bold border-b-2 border-black dark:border-white pb-1 hover:border-cyan-500 hover:text-cyan-500 transition-all">Projeyi İncele <ArrowRight size={20} /></a>
                  </div>
                  <div className={`md:col-span-7 ${index % 2 !== 0 && 'md:order-1'} relative perspective-1000`}>
                     <div className={`absolute inset-4 bg-gradient-to-r ${project.gradient} blur-[60px] opacity-40 rounded-full group-hover:opacity-60 transition-opacity duration-500`}></div>
                     <div className="relative aspect-[16/10] bg-neutral-200 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-[1.02] group-hover:-rotate-1 transition-transform duration-500 ease-out flex items-center justify-center">
                        <div className="text-center"><Code2 className="mx-auto mb-4 text-neutral-400 opacity-50" size={64} /><span className="text-neutral-500 font-mono text-sm">Project Preview</span></div>
                     </div>
                  </div>
                </motion.div>
            ))}
            </div>
        </div>
      </section>

      {/* 4. DENEYİM */}
      <section className="py-32 px-4 relative z-10">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">Kariyer Yolculuğu</h2>
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:dark:via-neutral-800 before:to-transparent">
              {timeline.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: index * 0.2 }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-neutral-900 bg-neutral-200 dark:bg-neutral-800 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform"><item.icon size={18} className="text-neutral-500 group-hover:text-cyan-500 transition-colors" /></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 shadow-sm group-hover:shadow-xl group-hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center justify-between space-x-2 mb-2 relative z-10"><div className="font-bold text-lg">{item.title}</div><time className="font-mono text-xs text-cyan-600 dark:text-cyan-500 font-bold">{item.year}</time></div>
                    <p className="text-neutral-500 text-sm relative z-10">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-4 text-center bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/30 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Birlikte Harika İşler Çıkaralım.</h2>
            <p className="text-neutral-400 text-xl mb-12">Projeniz için teknik bir ortak mı arıyorsunuz? Hemen tanışalım.</p>
            <div className="flex justify-center gap-6">
                <a href="mailto:ohufyt@gmail.com" className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-cyan-400 hover:scale-105 transition-all">Mail Gönder</a>
                <div className="flex gap-4">
                  <SocialButton icon={<Github size={24} />} link="https://github.com/fyt19" />
                  <SocialButton icon={<Linkedin size={24} />} link="https://linkedin.com/in/furkanyukseltemelci" />
                </div>
            </div>
            <div className="mt-20 pt-10 border-t border-white/10 text-neutral-500 text-sm">© 2026 Furkan Yüksel Temelci.</div>
        </div>
      </footer>
    </main>
  );
}

// GÜNCELLENMİŞ SOCIAL BUTTON: Link Desteği Eklendi
function SocialButton({ icon, link }: { icon: React.ReactNode, link: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all">
      {icon}
    </a>
  );
}