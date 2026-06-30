import Link from "next/link";
import projects from "@/mock/projects.json"; // using your mock data

export default function FeaturedProjects() {
    return (
        <section className="container-custom section-padding">
            <h2 className="text-3xl font-display mb-12">Featured Projects</h2>
            <div className="grid gap-8 md:grid-cols-3">
                {projects.slice(0, 6).map((p) => (
                    <article
                        key={p.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                    >
                        <Link href={`/works/${p.slug}`} className="block group">
                            {p.heroImage ? (
                                <img
                                    src={p.heroImage}
                                    alt={p.title}
                                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform"
                                />
                            ) : (
                                <div className="w-full h-44 bg-gray-100" />
                            )}
                            <div className="p-4">
                                <h3 className="font-display text-lg mb-1">{p.title}</h3>
                                <p className="text-sm text-muted">{p.summary}</p>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
