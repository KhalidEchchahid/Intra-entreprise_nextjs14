import { Card, CardContent } from "@/components/ui/card";
import { IBlog } from "@/database/blog.model";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPosts } from "@/lib/actions/blog.action";



export default async function BlogPage() {
  const data: IBlog[] = await getPosts();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.description}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post._id}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
