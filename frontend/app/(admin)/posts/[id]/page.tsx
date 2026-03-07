import PostForm from "@/components/post-form";

export default function PostPage(){
    return (
        <div className='p-8 flex flex-col'>
          <PostForm
          id=""
            title=""
            content=""
            imageUrl=""
            categoryId=""
            tags={[]}
            status=""
            categories={[]}
            slug=""
          />
        </div>
    )
}