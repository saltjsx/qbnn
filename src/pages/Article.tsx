import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { client, urlFor, type Article as ArticleType } from "../lib/sanity";
import { getTimeAgo, getCategoryDisplay } from "../lib/utils";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        // Fetch the article
        const articleQuery = `*[_type == "article" && slug.current == $slug][0]`;
        const articleData = await client.fetch(articleQuery, { slug });
        setArticle(articleData);

        // Fetch related articles (same category, excluding current)
        if (articleData) {
          const relatedQuery = `*[_type == "article" && category == $category && slug.current != $slug] | order(publishedAt desc)[0...3]`;
          const related = await client.fetch(relatedQuery, {
            category: articleData.category,
            slug,
          });
          setRelatedArticles(related);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <main className="main">
        <div className="container">
          <div className="loading">Loading article...</div>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="main">
        <div className="container">
          <div className="error-message">
            <h1>Article not found</h1>
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const portableTextComponents = {
    block: {
      h1: ({ children }: { children?: React.ReactNode }) => (
        <h1 className="article-body-h1">{children}</h1>
      ),
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="article-body-h2">{children}</h2>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="article-body-h3">{children}</h3>
      ),
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p className="article-body-p">{children}</p>
      ),
      blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="article-body-blockquote">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <ul className="article-body-ul">{children}</ul>
      ),
      number: ({ children }: { children?: React.ReactNode }) => (
        <ol className="article-body-ol">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <li className="article-body-li">{children}</li>
      ),
      number: ({ children }: { children?: React.ReactNode }) => (
        <li className="article-body-li">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong>{children}</strong>
      ),
      em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
      link: ({
        children,
        value,
      }: {
        children?: React.ReactNode;
        value?: { href: string };
      }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="article-body-link"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({
        value,
      }: {
        value: { asset: { _ref: string }; alt?: string };
      }) => (
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || "Article image"}
          className="article-body-image"
        />
      ),
    },
  };

  return (
    <main className="main">
      <div className="container">
        <article className="article-page">
          <div className="article-header">
            <Link
              to={`/category/${article.category}`}
              className="article-category-link"
            >
              <span className="category-badge large">
                {getCategoryDisplay(article.category)}
              </span>
            </Link>
            <h1 className="article-page-title">{article.title}</h1>
            <div className="article-page-meta">
              <span className="time">{getTimeAgo(article.publishedAt)}</span>
              {article.author && (
                <>
                  <span className="separator">•</span>
                  <span className="author">By {article.author}</span>
                </>
              )}
            </div>
          </div>

          <div className="article-featured-image">
            <img
              src={urlFor(article.mainImage).width(1200).height(600).url()}
              alt={article.title}
            />
          </div>

          <div className="article-content">
            <div className="article-excerpt">
              <p>{article.excerpt}</p>
            </div>

            <div className="article-body">
              <PortableText
                value={article.body}
                components={portableTextComponents}
              />
            </div>
          </div>

          {relatedArticles.length > 0 && (
            <div className="related-articles">
              <h2 className="related-title">Related Articles</h2>
              <div className="related-grid">
                {relatedArticles.map((related) => (
                  <Link
                    key={related._id}
                    to={`/article/${related.slug.current}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <article className="related-card">
                      <div className="related-image">
                        <img
                          src={urlFor(related.mainImage)
                            .width(400)
                            .height(250)
                            .url()}
                          alt={related.title}
                        />
                        <span className="category-badge small">
                          {getCategoryDisplay(related.category)}
                        </span>
                      </div>
                      <div className="related-content">
                        <h3 className="related-card-title">{related.title}</h3>
                        <p className="related-excerpt">{related.excerpt}</p>
                        <span className="time">
                          {getTimeAgo(related.publishedAt)}
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
