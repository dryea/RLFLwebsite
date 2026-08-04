import type { SeoIssue } from "../db/schema";

export interface SeoAnalyzerInput {
  title: string;
  description?: string;
  content?: string;
  focusKeyword?: string;
  slug?: string;
  imageAlt?: string;
  headings?: string[];
  internalLinks?: number;
  externalLinks?: number;
  images?: { alt?: string }[];
}

export interface SeoAnalysisResult {
  score: number;
  issues: SeoIssue[];
  data: {
    wordCount: number;
    titleLength: number;
    descriptionLength: number;
    keywordDensity: number;
    keywordInTitle: boolean;
    keywordInDescription: boolean;
    keywordInFirstParagraph: boolean;
    headingCount: number;
    imageCount: number;
    imagesWithAlt: number;
    internalLinks: number;
    externalLinks: number;
    slugKeyword: boolean;
    readability: {
      score: number;
      label: string;
      avgSentenceLength: number;
    };
  };
}

function stripHtml(html: string): string {
  return (html || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function countKeywordOccurrences(text: string, keyword: string): number {
  if (!keyword) return 0;
  const lower = text.toLowerCase();
  const kw = keyword.toLowerCase();
  const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
  return (lower.match(regex) || []).length;
}

function avgSentenceLength(text: string): number {
  const sentences = text.split(/[.!?।]+/).filter((s) => s.trim().split(/\s+/).filter(Boolean).length > 0);
  if (!sentences.length) return 0;
  const words = countWords(text);
  return Math.round(words / sentences.length);
}

function readabilityScore(text: string): { score: number; label: string; avg: number } {
  const avg = avgSentenceLength(text);
  let score = 60;
  if (avg <= 12) score = 90;
  else if (avg <= 16) score = 80;
  else if (avg <= 20) score = 70;
  else if (avg <= 25) score = 55;
  else if (avg <= 35) score = 40;
  else score = 25;
  const label = score >= 80 ? "Very easy to read" : score >= 60 ? "Easy to read" : score >= 40 ? "Moderately difficult" : "Difficult to read";
  return { score, label, avg };
}

export function analyzeSeo(input: SeoAnalyzerInput): SeoAnalysisResult {
  const title = (input.title || "").trim();
  const description = stripHtml(input.description || "").trim();
  const content = stripHtml(input.content || "").trim();
  const keyword = (input.focusKeyword || "").trim();

  const issues: SeoIssue[] = [];
  const wordCount = countWords(content);
  const titleLength = title.length;
  const descriptionLength = description.length;
  const keywordCount = countKeywordOccurrences(`${title} ${description} ${content}`, keyword);
  const keywordDensity = wordCount > 0 ? Math.round((keywordCount / wordCount) * 1000) / 10 : 0;
  const keywordInTitle = keyword ? title.toLowerCase().includes(keyword.toLowerCase()) : false;
  const keywordInDescription = keyword ? description.toLowerCase().includes(keyword.toLowerCase()) : false;
  const firstParagraph = content.split(/[.!?।]/)[0] || "";
  const keywordInFirstParagraph = keyword ? firstParagraph.toLowerCase().includes(keyword.toLowerCase()) : false;
  const headingCount = input.headings?.length || 0;
  const images = input.images || [];
  const imagesWithAlt = images.filter((img) => (img.alt || "").trim().length > 0).length;
  const internalLinks = input.internalLinks || 0;
  const externalLinks = input.externalLinks || 0;
  const slugKeyword = keyword ? (input.slug || "").includes(keyword.toLowerCase().replace(/\s+/g, "-")) : false;
  const readability = readabilityScore(content);

  // ── Title checks ──
  if (!title) {
    issues.push({ code: "title-missing", severity: "error", message: "The content has no SEO title. Add a title that describes the page.", action: "Add an SEO title." });
  } else if (titleLength < 30) {
    issues.push({ code: "title-short", severity: "warning", message: `The SEO title is only ${titleLength} characters. Aim for 40-60 characters.`, action: "Expand the title to 40-60 characters." });
  } else if (titleLength > 65) {
    issues.push({ code: "title-long", severity: "warning", message: `The SEO title is ${titleLength} characters. It may be truncated in search results.`, action: "Shorten the title to under 60 characters." });
  } else {
    issues.push({ code: "title-length", severity: "good", message: `The SEO title length is optimal (${titleLength} characters).` });
  }

  if (keyword) {
    if (keywordInTitle) issues.push({ code: "keyword-title", severity: "good", message: "The focus keyword appears in the SEO title." });
    else issues.push({ code: "keyword-title", severity: "warning", message: "The focus keyword is not in the SEO title.", action: "Include the focus keyword in the title." });
  }

  // ── Description checks ──
  if (!description) {
    issues.push({ code: "desc-missing", severity: "error", message: "No meta description found. Add one between 120-160 characters.", action: "Add a meta description." });
  } else if (descriptionLength < 120) {
    issues.push({ code: "desc-short", severity: "warning", message: `The meta description is only ${descriptionLength} characters. Aim for 120-160.`, action: "Expand the meta description." });
  } else if (descriptionLength > 160) {
    issues.push({ code: "desc-long", severity: "warning", message: `The meta description is ${descriptionLength} characters. It may be truncated.`, action: "Shorten the meta description to under 160 characters." });
  } else {
    issues.push({ code: "desc-length", severity: "good", message: `The meta description length is optimal (${descriptionLength} characters).` });
  }

  if (keyword && keywordInDescription) {
    issues.push({ code: "keyword-desc", severity: "good", message: "The focus keyword appears in the meta description." });
  } else if (keyword) {
    issues.push({ code: "keyword-desc", severity: "warning", message: "The focus keyword is not in the meta description.", action: "Add the focus keyword to the description." });
  }

  // ── Content checks ──
  if (wordCount < 300) {
    issues.push({ code: "content-short", severity: "error", message: `Content is too short (${wordCount} words). Aim for at least 300 words.`, action: "Add more in-depth content." });
  } else if (wordCount < 600) {
    issues.push({ code: "content-length", severity: "warning", message: `Content has ${wordCount} words. Aim for 600+ for better rankings.`, action: "Expand the content." });
  } else {
    issues.push({ code: "content-length", severity: "good", message: `Content length is good (${wordCount} words).` });
  }

  if (keyword) {
    if (keywordCount === 0) {
      issues.push({ code: "keyword-usage", severity: "error", message: "The focus keyword does not appear in the content.", action: "Mention the focus keyword naturally in the content." });
    } else if (keywordDensity >= 0.5 && keywordDensity <= 2.5) {
      issues.push({ code: "keyword-density", severity: "good", message: `Keyword density is optimal (${keywordDensity}%).` });
    } else if (keywordDensity > 2.5) {
      issues.push({ code: "keyword-density", severity: "warning", message: `Keyword density is ${keywordDensity}% (over 2.5%). Avoid keyword stuffing.`, action: "Reduce keyword usage." });
    } else {
      issues.push({ code: "keyword-density", severity: "warning", message: `Keyword density is only ${keywordDensity}%. Aim for 0.5-2.5%.`, action: "Add more keyword mentions." });
    }

    if (keywordInFirstParagraph) issues.push({ code: "keyword-first", severity: "good", message: "The focus keyword appears in the first paragraph." });
    else issues.push({ code: "keyword-first", severity: "warning", message: "The focus keyword is not in the first paragraph.", action: "Move the keyword mention earlier in the content." });

    if (slugKeyword) issues.push({ code: "keyword-slug", severity: "good", message: "The focus keyword is in the URL slug." });
    else issues.push({ code: "keyword-slug", severity: "warning", message: "The focus keyword is not in the URL slug.", action: "Include the keyword in the URL." });
  }

  // ── Readability ──
  if (readability.score >= 60) issues.push({ code: "readability", severity: "good", message: `Readability is good: ${readability.label}.` });
  else issues.push({ code: "readability", severity: "warning", message: `Readability is ${readability.label}.`, action: "Use shorter sentences and simpler language." });

  // ── Headings ──
  if (headingCount === 0) issues.push({ code: "headings", severity: "error", message: "No headings (H2/H3) found. Use headings to structure the content.", action: "Add H2/H3 headings." });
  else issues.push({ code: "headings", severity: "good", message: `Content has ${headingCount} headings — good structure.` });

  // ── Images ──
  if (images.length === 0) {
    issues.push({ code: "images", severity: "warning", message: "No images found in the content. Add relevant images with alt text.", action: "Add images." });
  } else if (imagesWithAlt === images.length) {
    issues.push({ code: "images-alt", severity: "good", message: `All ${images.length} images have alt text.` });
  } else {
    issues.push({ code: "images-alt", severity: "warning", message: `${images.length - imagesWithAlt} of ${images.length} images are missing alt text.`, action: "Add alt text to all images." });
  }

  // ── Links ──
  if (internalLinks === 0 && externalLinks === 0) {
    issues.push({ code: "links", severity: "warning", message: "No internal or external links found.", action: "Add internal links to related content." });
  } else if (internalLinks >= 2) {
    issues.push({ code: "links", severity: "good", message: `Content has ${internalLinks} internal links.` });
  } else {
    issues.push({ code: "links", severity: "warning", message: `Only ${internalLinks} internal link(s) found.`, action: "Add more internal links." });
  }

  // ── Final score ──
  const goodCount = issues.filter((i) => i.severity === "good").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const total = issues.length || 1;
  let score = Math.round((goodCount / total) * 70 + (total - warningCount * 0.5 - errorCount * 1.5) / total * 30);
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    issues,
    data: {
      wordCount,
      titleLength,
      descriptionLength,
      keywordDensity,
      keywordInTitle,
      keywordInDescription,
      keywordInFirstParagraph,
      headingCount,
      imageCount: images.length,
      imagesWithAlt,
      internalLinks,
      externalLinks,
      slugKeyword,
      readability: {
        score: readability.score,
        label: readability.label,
        avgSentenceLength: readability.avg,
      },
    },
  };
}
