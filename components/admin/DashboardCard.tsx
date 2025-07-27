import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className
}: DashboardCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-gray-400" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {(description || trend) && (
          <div className="flex items-center justify-between mt-2">
            {description && (
              <p className="text-xs text-gray-500">
                {description}
              </p>
            )}
            {trend && (
              <p className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
