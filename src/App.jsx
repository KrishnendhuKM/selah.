
import { useEffect, useState } from "react";

import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import VerseDisplay from "./components/VerseDisplay";
import Background from "./components/Background";

import { categories } from "./data/categories";
import { getBibleVerse } from "./services/bibleApi";

import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [lastReference, setLastReference] = useState("");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("selah-theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("selah-theme", theme);
  }, [theme]);

  async function loadVerse(category = selectedCategory) {
    const references = categories[category];

    const available = references.filter(
      reference => reference !== lastReference
    );

    const pool = available.length ? available : references;

    const randomReference =
      pool[Math.floor(Math.random() * pool.length)];

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const result = await getBibleVerse(randomReference);

      setVerse(result);
      setLastReference(randomReference);
    } catch (err) {
      console.error("Selah API error:", err);
      setError("Unable to load verse. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVerse("All");
    // Initial load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    loadVerse(category);
  }

  async function handleCopy() {
    if (!verse) return;

    try {
      await navigator.clipboard.writeText(
        `"${verse.text}" — ${verse.reference}`
      );

      setCopied(true);
    } catch {
      setError("Unable to copy verse.");
    }
  }

  async function handleShare() {
    if (!verse) return;

    const text = `"${verse.text}" — ${verse.reference}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Selah",
          text
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    } else {
      handleCopy();
    }
  }

  return (
    <main className={`app ${theme}`}>
      <Background />

      <Header
        theme={theme}
        onToggleTheme={() =>
          setTheme(current =>
            current === "light" ? "dark" : "light"
          )
        }
      />

      <div className="content">
        <CategoryNav
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
        />

        <VerseDisplay
          verse={verse}
          loading={loading}
          error={error}
          copied={copied}
          onRefresh={() => loadVerse()}
          onCopy={handleCopy}
          onShare={handleShare}
        />
      </div>

      <footer className="footer">
          <span>© 2026 Selah</span>
          <span className="footer-divider">·</span>
          <span>Made with ♡</span>
      </footer>
    </main>
  );
}

export default App;
