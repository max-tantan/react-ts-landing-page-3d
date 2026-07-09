import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BlurText,
  CornerBrackets,
  SectionDivider,
  ArrowUpRight,
  GlareHover,
  SpecimenLabel,
} from '../components'
import { fadeUp } from '../hooks/useFadeUp'
import { getArticleBySlug, getRelatedArticles } from '../data'
import type { Artikel } from '../types'

function estimateReadingTime(content: Artikel['content']): number {
  const totalWords = content.reduce((sum, item) => sum + item.text.split(/\s+/).length, 0)
  return Math.max(1, Math.round(totalWords / 200))
}

export function BeritaDetail() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return (
      <section className="min-h-screen bg-base pt-28">
        <div className="flex flex-col items-center justify-center px-6 text-center md:px-12 lg:px-16">
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Tidak Ditemukan
          </motion.p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-[-2px] text-copy">
            Artikel tidak ditemukan
          </h1>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-muted">
            Halaman yang kamu cari tidak tersedia.
          </p>
          <Link
            to="/berita"
            className="mt-8 inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-accent-hover"
          >
            Kembali ke Berita
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    )
  }

  const readingTime = estimateReadingTime(article.content)
  const relatedArticles = getRelatedArticles(article.slug, 3)

  return (
    <>
      {/* ─── HEADER ─── */}
      <section className="bg-base pt-28">
        <div className="px-6 pb-8 md:px-12 lg:px-16">
          <CornerBrackets className="relative mb-16 h-6" />

          <motion.div {...fadeUp(0.1)}>
            <Link
              to="/berita"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted transition-colors hover:text-copy"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-3.5 w-3.5"
              >
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Kembali ke Berita
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.15)}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <span className="tool-tag bg-accent/15 font-mono text-[10px] tracking-wide text-accent">
              {article.category}
            </span>
            <span className="font-mono text-[11px] tracking-wider text-muted/60">
              {article.date}
            </span>
            <span className="font-mono text-[11px] tracking-wider text-muted/40">
              &middot; {readingTime} menit membaca
            </span>
          </motion.div>

          <div className="mt-4 max-w-4xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-[-2px] text-copy">
            <BlurText
              text={article.title}
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
          </div>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-4 font-body text-sm text-muted"
          >
            Oleh{' '}
            <span className="text-copy/80">{article.author}</span>
          </motion.p>
        </div>
      </section>

      {/* ─── FEATURED IMAGE ─── */}
      <section className="bg-base">
        <div className="px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto max-w-5xl overflow-hidden"
          >
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="max-h-[20rem] w-full object-cover transition-all duration-700 hover:scale-[1.02] md:max-h-[28rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/20 to-transparent" />
            <div className="absolute inset-0 border border-copy/5" />
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ─── ARTICLE BODY ─── */}
      <section className="bg-base py-16 md:py-24">
        <div className="px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-3xl space-y-5 md:space-y-6"
          >
            {article.content.map((item, i) => (
              <div key={i}>
                <h3 className="font-mono text-xs font-bold tracking-wider text-copy uppercase">
                  {item.subtitle}
                </h3>
                <p className="mt-2 font-body text-[15px] leading-[1.8] text-muted md:text-lg md:leading-[1.85] text-left">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ─── RELATED ARTICLES ─── */}
      {relatedArticles.length > 0 && (
        <section className="bg-base py-20 md:py-28">
          <div className="px-6 md:px-12 lg:px-16">
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="narrative">
                Baca Juga
              </SpecimenLabel>
            </motion.p>
            <div className="mt-1 font-display text-2xl font-bold tracking-[-1px] text-copy md:text-3xl">
              <BlurText
                text="Berita lainnya"
                delay={150}
                animateBy="words"
                direction="bottom"
                className="my-0"
              />
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {relatedArticles.map((item, i) => (
                <Link key={item.id} to={`/berita/${item.slug}`}>
                  <GlareHover
                    width="100%"
                    background="#2C2721"
                    borderColor="rgba(245, 237, 224, 0.06)"
                    borderRadius="0"
                    glareColor="#0284C7"
                    glareOpacity={0.2}
                    glareAngle={-30}
                    glareSize={250}
                    transitionDuration={600}
                    className="group"
                    style={{ display: 'block', height: 'auto' }}
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeOut',
                        delay: i * 0.1,
                      }}
                      className="flex h-full flex-col"
                    >
                      <div className="aspect-[3/2] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="tool-tag bg-accent/10 font-mono text-[10px] tracking-wide text-accent">
                            {item.category}
                          </span>
                          <span className="font-mono text-[10px] tracking-wider text-muted/40">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-sm font-bold leading-snug text-copy">
                          {item.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 font-body text-xs leading-relaxed text-muted">
                          {item.excerpt}
                        </p>
                      </div>
                    </motion.article>
                  </GlareHover>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA BACK ─── */}
      <section className="bg-base pb-28">
        <div className="px-6 text-center md:px-12 lg:px-16">
          <motion.div {...fadeUp(0.2)}>
            <Link
              to="/berita"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-accent-hover"
            >
              Kembali ke Berita
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
