export function timeAgo(ts) {
  const diff = Date.now() - ts;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function makeShareUrl(note) {
  const payload = { title: note.title, content: note.content };
  const enc = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  const url = new URL(window.location.href);
  url.searchParams.set("shared", enc);
  return url.toString();
}

export function readSharedFromUrl() {
  const url = new URL(window.location.href);
  const val = url.searchParams.get("shared");
  if (!val) return null;
  try {
    const json = decodeURIComponent(escape(atob(val)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}