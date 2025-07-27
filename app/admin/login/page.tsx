'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async (role: 'admin' | 'vendor') => {
    const demoCredentials = {
      admin: { email: 'admin@metromerge.com', password: 'password' },
      vendor: { email: 'vendor@metromerge.com', password: 'password' }
    };

    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
    
    const success = await login(demoCredentials[role].email, demoCredentials[role].password);
    if (success) {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">MetroMerge Admin</CardTitle>
          <CardDescription>Sign in to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="demo">Demo Access</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="demo" className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Quick access for demonstration purposes:
              </div>
              
              <Button 
                onClick={() => handleDemoLogin('admin')} 
                className="w-full mb-2"
                variant="outline"
              >
                Login as Super Admin
              </Button>
              
              <Button 
                onClick={() => handleDemoLogin('vendor')} 
                className="w-full"
                variant="outline"
              >
                Login as Vendor
              </Button>
              
              <div className="text-xs text-gray-500 mt-4">
                <p><strong>Admin:</strong> admin@metromerge.com / password</p>
                <p><strong>Vendor:</strong> vendor@metromerge.com / password</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
