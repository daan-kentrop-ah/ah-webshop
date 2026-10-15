import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <Card className="w-full max-w-xs">
            <CardHeader>
                <Skeleton className="aspect-square w-full" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-2/3 mb-2" />
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Skeleton className="h-8 w-full" />
            </CardContent>
        </Card>
    )
}