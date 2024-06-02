import { IBlog } from "@/database/blog.model";
import { getPost } from "@/lib/actions/blog.action";
import { PortableText } from "@portabletext/react";

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: IBlog | null = await getPost(params.slug);

  if (!data) {
    return <div>Blog article not found</div>;
  }

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Jan Marshal - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
