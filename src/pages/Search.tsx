import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { client, urlFor, type Article } from "../lib/sanity";
import { getTimeAgo, getCategoryDisplay } from "../lib/utils";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const searchArticles = async () => {
      if (!query || query.trim().length < 2) {
        setArticles([]);
        setSearched(false);
        return;
      }

      setLoading(true);
      setSearched(true);
      try {
        // Search in title, excerpt, and category
        const searchQuery = `*[_type == "article" && (
          title match $searchTerm ||
          excerpt match $searchTerm ||
          category match $searchTerm
        )] | order(publishedAt desc)`;

        const searchTerm = `*${query}*`;
        const results = await client.fetch(searchQuery, { searchTerm });
        setArticles(results);
      } catch (error) {
        console.error("Error searching articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    searchArticles();
  }, [query]);

  return (
    <main className="main">
      <div className="container">
        <div className="search-header">
          <h1 className="search-title">
            {!searched && "Search Articles"}
            {searched && !loading && `Search Results for "${query}"`}
            {loading && `Searching for "${query}"...`}
          </h1>
          {searched && !loading && (
            <p className="search-results-count">
              {articles.length === 0 && "No articles found"}
              {articles.length === 1 && "1 article found"}
              {articles.length > 1 && `${articles.length} articles found`}
            </p>
          )}
        </div>

        {loading ? (
          <div className="loading">Searching...</div>
        ) : !searched ? (
          <div className="search-empty">
            <p>Enter a search term to find articles</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="search-results">
            {articles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug.current}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article className="search-result-card">
                  <div className="search-result-image">
                    <img
                      src={urlFor(article.mainImage)
                        .width(300)
                        .height(200)
                        .url()}
                      alt={article.title}
                    />
                    <span className="category-badge small">
                      {getCategoryDisplay(article.category)}
                    </span>
                  </div>
                  <div className="search-result-content">
                    <h2 className="search-result-title">{article.title}</h2>
                    <p className="search-result-excerpt">{article.excerpt}</p>
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
          <div className="search-no-results">
            <h2>No articles found for "{query}"</h2>
            <p>Try different keywords or browse our categories:</p>
            <div className="search-categories">
              {["Investing", "Guides", "Opinion", "Updates"].map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="search-category-link"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
