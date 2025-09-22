"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { saveCategory } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Category name is required." }),
  heroImageUrl: z.string().url({ message: "Please enter a valid image URL." }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export function CategoryEditor() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      heroImageUrl: "",
    },
  });

  function onSubmit(values: CategoryFormValues) {
    setError(undefined);
    startTransition(() => {
        saveCategory(values).then((data) => {
            if (data?.error) {
                setError(data.error);
            } else {
                toast({
                    title: "Category Created!",
                    description: "Your new category has been saved successfully.",
                });
                router.push('/dashboard/blogs'); // Redirect or update as needed
            }
        });
    });
  }

  return (
    <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {error && (
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Technology" {...field} disabled={isPending}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="heroImageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hero Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.png" {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Saving..." : "Save Category"}
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
