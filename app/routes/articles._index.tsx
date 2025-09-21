import { useLoaderData } from "react-router";
import type { Route } from "./+types/articles._index";
import { getArticleList, type IArticle } from "~/models/article.server";
import Geometric from "~/components/geometric";

export async function loader({ params }: Route.LoaderArgs) {
  const articles = await getArticleList({ draft: false });
  // console.log({ articles });
  return { articles };
}
export default function ArticlesPage() {
  const { articles } = useLoaderData<{ articles: IArticle[] }>();

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">文章列表</h1>
      <Geometric.Container>
        {articles.map((article) => (
          <Geometric.Item
            key={article.slug}
            date={article.date}
            title={article.title}
            description={article.summary}
          />
        ))}
      </Geometric.Container>
    </div>
  );
}

//  <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-8">文章列表</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {articles.map((article) => (
//           <article
//             key={article.slug}
//             className="p-6 border rounded-lg shadow-sm"
//           >
//             <h2 className="text-xl font-semibold mb-2">
//               <a
//                 href={`/articles/${article.slug}`}
//                 className="hover:text-blue-600"
//               >
//                 {article.title}
//               </a>
//             </h2>
//             <time className="text-sm text-gray-500">{article.date}</time>
//             <p className="mt-2 text-gray-700">{article.description}</p>
//           </article>
//         ))}
//       </div>
//     </div>
