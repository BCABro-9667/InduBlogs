"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, View, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { Blog } from "@/lib/data";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlogListClientProps {
  blogs: Blog[];
}

export function BlogListClient({ blogs }: BlogListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Blog["status"]) => {
    switch (status) {
      case "published":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Published</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "private":
        return <Badge variant="outline">Private</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>{blog.category.name}</TableCell>
                <TableCell>{getStatusBadge(blog.status)}</TableCell>
                <TableCell>{format(new Date(blog.createdAt), "PPP")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/blog/${blog.slug}`)}>
                        <View className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/blogs/${blog._id}/edit`)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
