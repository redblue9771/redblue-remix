import { useLoaderData } from "react-router";
import { getArticleBySlug, type IArticle } from "~/models/article.server";
import type { Route } from "./+types/articles.$slug";
import "highlight.js/styles/github-dark.min.css";
import { useEffect } from "react";
import "katex/dist/katex.min.css";

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;
  //   if (!slug) return notFound();

  const article = await getArticleBySlug(slug);
  //   if (!article) return notFound();
  // console.log({ article });

  return { article };
}
// export function meta({}: Route.MetaArgs) {
//   return [{ tagName: "link", rel: "stylesheet", href: highlighCSS }];
// }

export default function ArticlePage() {
  const { article } = useLoaderData<{ article: IArticle }>();
  useEffect(() => {}, []);
  return (
    <main className="container mx-auto py-8 px-4 max-w-5xl">
      <article
        className="article-wrap "
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <aside
        dangerouslySetInnerHTML={{
          __html: article.toc,
        }}
      ></aside>
    </main>
  );
}
