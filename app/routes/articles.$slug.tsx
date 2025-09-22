import { useLoaderData } from "react-router";
import { getArticleBySlug, type IArticle } from "~/models/article.server";
import type { Route } from "./+types/articles.$slug";
import "highlight.js/styles/github-dark.min.css";
import { useEffect } from "react";
import "katex/dist/katex.min.css";
import { SITE_NAME } from "~/constants";
import { genSiteTitle } from "~/lib/utils";

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;
  //   if (!slug) return notFound();

  const article = await getArticleBySlug(slug);
  //   if (!article) return notFound();
  // console.log({ article });

  return { article };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: genSiteTitle(loaderData?.article?.title ?? "") }];
}

export default function ArticlePage() {
  const { article } = useLoaderData<{ article: IArticle }>();
  useEffect(() => {}, []);
  return (
    <main className="container mx-auto max-w-7xl flex flex-wrap gap-3 p-4">
      <article
        className="article-wrap w-full lg:flex-1 lg:w-auto"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <aside className="article-toc-wrap w-full lg:sticky lg:top-20 lg:w-3xs lg:self-start">
        <nav
          dangerouslySetInnerHTML={{
            __html: article.toc,
          }}
        />
      </aside>
    </main>
  );
}
