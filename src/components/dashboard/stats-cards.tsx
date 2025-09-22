import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Newspaper, CheckCircle, Edit, Shield } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      title: "Total Blogs",
      value: "10",
      icon: Newspaper,
      color: "text-blue-500",
    },
    {
      title: "Published Blogs",
      value: "7",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Draft Blogs",
      value: "2",
      icon: Edit,
      color: "text-yellow-500",
    },
    {
      title: "Private Blogs",
      value: "1",
      icon: Shield,
      color: "text-gray-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
