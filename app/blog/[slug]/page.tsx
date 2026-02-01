// app/blog/[slug]/page.tsx
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

// Örnek blog verisi fonksiyonu
const getPostData = (slug: string) => {
    const allPosts = {
        "modern-web-teknolojileri-inovasyon": {
            title: "Modern Web Teknolojilerinde İnovasyon: Next.js 14 ve Ötesi",
            date: "20 Ekim 2023",
            readTime: "5 dk okuma",
            content: `
                <p class="lead text-xl text-neutral-300 mb-8">Web geliştirme dünyası, özellikle React ekosistemi, son yıllarda baş döndürücü bir hızla evriliyor. Next.js 14'ün gelişiyle birlikte, sunucu taraflı render (SSR) ve statik site üretimi (SSG) kavramları yepyeni bir boyuta taşındı.</p>
                <h2>Server Components Nedir?</h2>
                <p>React Server Components (RSC), bileşenlerimizin sunucuda render edilip, istemciye sadece gerekli HTML ve minimum JavaScript'in gönderilmesini sağlayan bir mimaridir. Bu, özellikle büyük JavaScript bundle boyutlarından muzdarip modern web uygulamaları için bir devrim niteliğinde.</p>
                <p>Artık veritabanı sorgularımızı doğrudan bileşenin içinde, güvenli bir şekilde yapabiliyoruz:</p>
                <pre><code>async function RecentPosts() {
  const posts = await db.query('SELECT * FROM posts...');
  return (
    &lt;div&gt;{posts.map(p => ...)}&lt;/div&gt;
  );
}</code></pre>
                <h2>Streaming ve Suspense</h2>
                <p>Sayfanın tamamının yüklenmesini beklemek yerine, hazır olan kısımları anında kullanıcıya göstermek (Streaming), kullanıcı deneyimini (UX) inanılmaz derecede iyileştiriyor. React'in <code>Suspense</code> özelliği ile birleştiğinde, yükleniyor durumlarını yönetmek çocuk oyuncağı haline geliyor.</p>
                <h2>Sonuç</h2>
                <p>Next.js 14, sadece bir framework güncellemesi değil, web'i nasıl inşa ettiğimize dair bir zihniyet değişimidir. Bu yeni paradigmaları benimsemek, daha hızlı, daha güvenli ve daha iyi kullanıcı deneyimine sahip uygulamalar geliştirmemizi sağlayacak.</p>
            `
        }
        // Diğer yazılar...
    };
    return allPosts[slug as keyof typeof allPosts];
};

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug);

  if (!post) return <div className="text-white p-8">Yazı bulunamadı.</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans p-4 md:p-8">
        <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10"></div>
        
        <div className="max-w-3xl mx-auto mt-12">
            <Link href="/#blog" className="inline-flex items-center gap-2 text-neutral-400 hover:text-cyan-400 transition-colors mb-12">
                <ArrowLeft size={20} /> Blog'a Dön
            </Link>
            
            <header className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
                <div className="flex justify-center items-center gap-6 text-neutral-400 text-sm">
                    <div className="flex items-center gap-2"><Calendar size={16} /> {post.date}</div>
                    <div className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</div>
                </div>
            </header>

            <article className="prose prose-invert prose-lg max-w-none prose-headings:text-cyan-50 text-neutral-300 prose-a:text-cyan-400 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800">
                 <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            <footer className="mt-20 pt-8 border-t border-neutral-900 text-center text-neutral-500">
                <p>Okuduğunuz için teşekkürler.</p>
            </footer>
        </div>
    </main>
  );
}