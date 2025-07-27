'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Settings,
  HelpCircle,
  Bus,
  Route,
  Calendar,
  DollarSign,
  UserCheck,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  FileText,
  Shield
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: ('admin' | 'vendor')[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'vendor']
  },
  // Admin-only items
  {
    title: 'Vendor Management',
    href: '/admin/vendors',
    icon: Building2,
    roles: ['admin']
  },
  {
    title: 'User Management',
    href: '/admin/users',
    icon: Users,
    roles: ['admin']
  },
  {
    title: 'Reports & Analytics',
    href: '/admin/reports',
    icon: BarChart3,
    roles: ['admin']
  },
  {
    title: 'Content Management',
    href: '/admin/content',
    icon: FileText,
    roles: ['admin']
  },
  {
    title: 'Support Tickets',
    href: '/admin/support',
    icon: MessageSquare,
    roles: ['admin']
  },
  // Vendor-only items
  {
    title: 'Fleet Management',
    href: '/admin/fleet',
    icon: Bus,
    roles: ['vendor']
  },
  {
    title: 'Route Management',
    href: '/admin/routes',
    icon: Route,
    roles: ['vendor']
  },
  {
    title: 'Booking Management',
    href: '/admin/bookings',
    icon: Calendar,
    roles: ['vendor']
  },
  {
    title: 'Revenue Reports',
    href: '/admin/revenue',
    icon: DollarSign,
    roles: ['vendor']
  },
  {
    title: 'Staff Management',
    href: '/admin/staff',
    icon: UserCheck,
    roles: ['vendor']
  },
  {
    title: 'Customer Support',
    href: '/admin/customer-support',
    icon: HelpCircle,
    roles: ['vendor']
  },
  // Common items
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    roles: ['admin', 'vendor']
  }
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MM</span>
            </div>
            <span className="font-semibold text-gray-900">MetroMerge</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {user && (
            <div className="mb-4">
              {!collapsed && (
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {user.role === 'admin' ? 'Admin Panel' : 'Vendor Panel'}
                </div>
              )}
            </div>
          )}
          
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}>
                  <Icon className={cn("flex-shrink-0 h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                  {!collapsed && <span>{item.title}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
