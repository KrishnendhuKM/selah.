
import { Copy, Share2, RefreshCw, Check } from "lucide-react";

function VerseDisplay({
  verse,
  loading,
  error,
  copied,
  onRefresh,
  onCopy,
  onShare
}) {
  return (
    <section className="verse-container" aria-live="polite">

      <div
        className="verse-content"
        key={verse?.reference || (loading ? "loading" : "empty")}
      >
        {loading ? (
          <div className="loading">
            <span />
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : verse ? (
          <>
            <p className="verse-text">
              “{verse.text}”
            </p>

            <p className="verse-reference">
              {verse.reference}
            </p>

            <p className="verse-version">
              {verse.version.toUpperCase()}
            </p>

            {verse.copyright && (
              <p className="verse-copyright">
                {verse.copyright}
              </p>
            )}
          </>
        ) : null}
      </div>

      <div className="verse-actions">
        <button
          onClick={onRefresh}
          disabled={loading}
          aria-label="Get another verse"
          title="Another verse"
        >
          <RefreshCw size={17} />
        </button>

        <button
          onClick={onCopy}
          disabled={!verse || loading}
          aria-label={copied ? "Copied" : "Copy verse"}
          title={copied ? "Copied" : "Copy verse"}
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
        </button>

        <button
          onClick={onShare}
          disabled={!verse || loading}
          aria-label="Share verse"
          title="Share verse"
        >
          <Share2 size={17} />
        </button>
      </div>

      <p
        className={`copy-message ${copied ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {copied && (
          <>
            <Check size={14} />
            Verse copied — carry His words with you.
          </>
        )}
      </p>

    </section>
  );
}

export default VerseDisplay;
