import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client, urlFor, type Article } from "../lib/sanity";
import { getTimeAgo, getCategoryDisplay } from "../lib/utils";

export default function Home() {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [topStories, setTopStories] = useState<Article[]>([]);
  const [sidebarNews, setSidebarNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch featured article
        const featuredQuery = `*[_type == "article" && featured == true] | order(publishedAt desc)[0]`;
        const featured = await client.fetch(featuredQuery);
        setFeaturedArticle(featured);

        // Fetch top stories (excluding featured)
        const topStoriesQuery = `*[_type == "article" && featured != true] | order(publishedAt desc)[0...4]`;
        const stories = await client.fetch(topStoriesQuery);
        setTopStories(stories);

        // Fetch sidebar news
        const sidebarQuery = `*[_type == "article"] | order(publishedAt desc)[0...5]`;
        const sidebar = await client.fetch(sidebarQuery);
        setSidebarNews(sidebar);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
        <div className="content-grid">
          <div className="main-content">
            {featuredArticle && (
              <section className="featured-section">
                <Link to={`/article/${featuredArticle.slug.current}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <article className="featured-article">
                    <div className="featured-image">
                      <img
                        src={urlFor(featuredArticle.mainImage)
                          .width(1200)
                          .height(600)
                          .url()}
                        alt={featuredArticle.title}
                      />
                      <span className="category-badge">
                        {getCategoryDisplay(featuredArticle.category)}
                      </span>
                    </div>
                    <div className="featured-content">
                      <h2 className="featured-title">
                        {featuredArticle.title}
                      </h2>
                      <p className="featured-excerpt">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="article-meta">
                        <span className="time">
                          {getTimeAgo(featuredArticle.publishedAt)}
                        </span>
                        {featuredArticle.author && (
                          <span className="author">
                            By {featuredArticle.author}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              </section>
            )}

            <section className="top-stories">
              <h2 className="section-title">Top Stories</h2>
              {topStories.length > 0 ? (
                <div className="stories-grid">
                  {topStories.map((story) => (
                    <Link
                      key={story._id}
                      to={`/article/${story.slug.current}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <article className="story-card">
                        <div className="story-image">
                          <img
                            src={urlFor(story.mainImage)
                              .width(600)
                              .height(400)
                              .url()}
                            alt={story.title}
                          />
                          <span className="category-badge small">
                            {getCategoryDisplay(story.category)}
                          </span>
                        </div>
                        <div className="story-content">
                          <h3 className="story-title">{story.title}</h3>
                          <p className="story-excerpt">{story.excerpt}</p>
                          <div className="article-meta">
                            <span className="time">
                              {getTimeAgo(story.publishedAt)}
                            </span>
                            {story.author && (
                              <span className="author">By {story.author}</span>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="no-articles">No articles available yet.</p>
              )}
            </section>
          </div>

          <aside className="sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Latest Updates</h3>
              {sidebarNews.length > 0 ? (
                <ul className="sidebar-list">
                  {sidebarNews.map((item) => (
                    <li key={item._id} className="sidebar-item">
                      <Link to={`/article/${item.slug.current}`}>
                        <span className="sidebar-category">
                          {getCategoryDisplay(item.category)}
                        </span>
                        <h4 className="sidebar-item-title">{item.title}</h4>
                        <span className="sidebar-time">
                          {getTimeAgo(item.publishedAt)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-articles">No updates available yet.</p>
              )}
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Categories</h3>
              <ul className="categories-list">
                {["Investing", "Guides", "Opinion", "Updates"].map((category) => (
                  <li key={category}>
                    <Link
                      to={`/category/${category.toLowerCase()}`}
                      className="category-link"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
