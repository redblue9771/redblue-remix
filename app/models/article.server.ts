import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import grayMatter from "gray-matter";
import rehypeMathjax from "rehype-mathjax";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import { toString } from "mdast-util-to-string";
import { remove } from "unist-util-remove";
import remarkStringify from "remark-stringify";
import { generateTocHtmlFromMarkdownAST } from "~/lib/utils";
const markdownModules = import.meta.glob("/app/assets/contents/articles/*.md", {
  import: "default",
  query: "?raw",
}) as Record<string, () => Promise<string>>;

export interface IArticle {
  title: string;
  date: string;
  description: string;
  slug: string;
  content: string;
  draft?: boolean;
  summary: string;
  toc: string;
}

const mdast = unified().use(remarkParse);
/* 1. 只留 heading，其余全删 */
const mdToToc = unified().use(remarkParse);
const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeHighlightLines, {
    showLineNumbers: true,
    keepOuterBlankLine: true,
  })
  .use(rehypeMathjax)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypeStringify);

export interface IArticleQuery {
  title?: string;
  date?: string;
  description?: string;
  content?: string;
  draft?: boolean;
}

export async function getArticleList(query?: IArticleQuery) {
  const articles: IArticle[] = await Promise.all(
    Object.entries(markdownModules).map(async ([filepath, loader]) => {
      const raw = await loader();
      // const ctx = await markdownProcessor.process(content.default);
      const { data, content } = grayMatter(raw);
      const { value } = await markdownProcessor.process(content);
      const text = toString(mdast.parse(content)).replace(/\s+/g, " ").trim();
      const toc = generateTocHtmlFromMarkdownAST(mdToToc.parse(content));

      console.dir(toc);
      return {
        ...data,
        date:
          Object.prototype.toString.call(data.date) === "[object Date]"
            ? data.date.toLocaleDateString()
            : new Date(data.date).toLocaleDateString(),
        slug: filepath
          .replace("/app/assets/contents/articles/", "")
          .replace(".md", ""),
        content: value,
        toc: toc,
        summary: data.summary
          ? data.summary.slice(0, 100) +
            (data.summary.length > 100 ? "..." : "")
          : text.slice(0, 100) + (text.length > 100 ? "..." : ""),
      } as IArticle;
    })
  );
  return articles.filter((article) => {
    for (const key in query) {
      if (
        key in article &&
        article[key as keyof IArticle] !== query[key as keyof IArticleQuery]
      ) {
        return false;
      }
    }
    return true;
  });
  // .sort((a, b) => {
  //   console.log(Object.prototype.toString.call(a.date) === "[object Date]");
  //   const aTmp =
  //     a.date && Object.prototype.toString.call(a.date) === "[object Date]"
  //       ? a.date.getTime()
  //       : Date.parse(a.date);
  //   const bTmp =
  //     a.date && Object.prototype.toString.call(b.date) === "[object Date]"
  //       ? b.date.getTime()
  //       : Date.parse(b.date);
  //   if (isNaN(aTmp) || isNaN(bTmp)) {
  //     return 0;
  //   }
  //   return bTmp - aTmp;
  // });
}

export async function getArticleBySlug(slug: string) {
  const articles = await getArticleList();
  return articles.find((article) => article.slug === slug);
}
