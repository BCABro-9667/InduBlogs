import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CommentsSection() {
  const comments = [
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?u=a",
      date: "2 days ago",
      text: "This was a fantastic read! Really appreciate the detailed insights. Looking forward to more content like this.",
    },
    {
      id: 2,
      author: "Maria Garcia",
      avatar: "https://i.pravatar.cc/150?u=b",
      date: "1 day ago",
      text: "Great points! I'd also suggest looking into how this applies to smaller teams. Do you have any thoughts on that?",
    },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold font-headline mb-6">Comments & Ideas</h2>
      <div className="mb-8">
        <form>
          <Textarea
            placeholder="Share your thoughts or suggest an idea..."
            className="mb-4 min-h-[120px]"
          />
          <Button type="submit" className="bg-accent hover:bg-accent/90">Post Comment</Button>
        </form>
      </div>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-xs text-muted-foreground">{comment.date}</span>
              </div>
              <p className="text-muted-foreground">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
