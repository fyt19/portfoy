// app/projects/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Code2, Github } from "lucide-react";

// Bu veriler normalde bir veritabanından ID'ye göre çekilir.
// Şimdilik örnek statik veri kullanıyoruz.
const getProjectData = (id: string) => {
    // Simüle edilmiş veri tabanı sorgusu
    const allProjects = {
        "ihtiyacim-ne": {
            title: "İhtiyacım Ne?",
            category: "Sosyal Yardımlaşma Platformu",
            date: "Mart 2023",
            tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "jQuery"],
            desc: "İnsanların ihtiyaçlarını anonim veya açık bir şekilde dile getirebildiği, lokasyon ve kategori bazlı filtreleme yapabildiği bir sosyal yardımlaşma ağıdır. Gelişmiş admin paneli ile içerik moderasyonu sağlanmaktadır.",
            content: `
                <p>Bu proje, toplumdaki yardımlaşma ihtiyacını dijital bir platformda güvenli bir şekilde karşılamak amacıyla geliştirilmiştir. Kullanıcılar hızlıca üye olup ihtiyaç talebi oluşturabilir veya mevcut taleplere yardım teklifinde bulunabilirler.</p>
                <h3 class="text-2xl font-bold mt-8 mb-4">Temel Özellikler</h3>
                <ul class="list-disc pl-5 space-y-2 mb-6">
                    <li>Kategori ve İl/İlçe bazlı filtreleme</li>
                    <li>Kullanıcı profilleri ve güven puanı sistemi</li>
                    <li>Anlık bildirimler (Yardım teklifi geldiğinde)</li>
                    <li>Admin onaylı ilan sistemi</li>
                </ul>
                <h3 class="text-2xl font-bold mt-8 mb-4">Geliştirme Süreci</h3>
                <p>Projenin backend tarafında PHP ve MySQL kullanılarak sağlam bir yapı kuruldu. Frontend'de ise Bootstrap ile responsive bir tasarım sağlandı ve JavaScript/jQuery ile dinamik etkileşimler eklendi.</p>
            `,
            demoLink: "#",
            githubLink: "https://linkedin.com/in/furkanyukseltemelci",
            image: "/project-placeholder.jpg" // public klasörüne bir görsel koymalısın
        }
        // Diğer projeler de buraya eklenebilir...
    };
    return allProjects[id as keyof typeof allProjects];
};


export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = getProjectData(params.id);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-white">Proje bulunamadı.</div>;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans p-4 md:p-8">
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10"></div>
      
      <div className="max-w-4xl mx-auto">
        {/* Geri Dön Butonu */}
        <Link href="/#projects" className="inline-flex items-center gap-2 text-neutral-400 hover:text-cyan-400 transition-colors mb-8">
            <ArrowLeft size={20} /> Tüm Projelere Dön
        </Link>

        {/* Başlık Alanı */}
        <header className="mb-12">
            <div className="flex items-center gap-3 text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4">
                <Code2 size={18} /> {project.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-neutral-400 text-sm">
                <div className="flex items-center gap-2">
                    <Calendar size={16} /> {project.date}
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg">{t}</span>
                    ))}
                </div>
            </div>
        </header>

        {/* Görsel Alanı (Placeholder) */}
        <div className="w-full h-[400px] bg-neutral-900 border border-neutral-800 rounded-3xl mb-12 flex items-center justify-center text-neutral-500">
            <span>Proje Görseli Buraya Gelecek (public/{project.image})</span>
            {/* <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-3xl" /> */}
        </div>

        {/* İçerik */}
        <article className="prose prose-invert prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </article>

        {/* Linkler */}
        <div className="flex gap-4 mb-20">
            <a href={project.demoLink} target="_blank" className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-colors flex items-center gap-2">
                Canlı Demo <ExternalLink size={18} />
            </a>
            <a href={project.githubLink} target="_blank" className="px-6 py-3 border border-neutral-700 rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-2">
                GitHub Kodu <Github size={18} />
            </a>
        </div>

      </div>
    </main>
  );
}