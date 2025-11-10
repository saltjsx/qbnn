import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { client, urlFor, type Article } from "../lib/sanity";
import { getTimeAgo, getCategoryDisplay } from "../lib/utils";

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!category) return;

      setLoading(true);
      try {
        // Fetch articles for this category
        const query = `*[_type == "article" && category == $category] | order(publishedAt desc)`;
        const result = await client.fetch(query, { category });
        setArticles(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  if (loading) {
    return (
      <main className="main">
        <div className="container">
          <div className="loading">Loading articles...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">{getCategoryDisplay(category || "")}</h1>
          <p className="category-description">
            Latest articles in {getCategoryDisplay(category || "")}
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="articles-list">
            {articles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug.current}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article className="article-card">
                  <div className="article-card-image">
                    <img
                      src={urlFor(article.mainImage)
                        .width(800)
                        .height(450)
                        .url()}
                      alt={article.title}
                    />
                    <span className="category-badge">
                      {getCategoryDisplay(article.category)}
                    </span>
                  </div>
                  <div className="article-card-content">
                    <h2 className="article-card-title">{article.title}</h2>
                    <p className="article-card-excerpt">{article.excerpt}</p>
                    <div className="article-meta">
                      <span className="time">
                        {getTimeAgo(article.publishedAt)}
                      </span>
                      {article.author && (
                        <span className="author">By {article.author}</span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-articles-message">
            <p>No articles found in this category yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
