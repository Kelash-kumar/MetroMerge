import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Mail, Phone } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" type="password" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me for 30 days
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="phone">
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input id="phone-number" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="phone-password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="phone-password" type="password" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="phone-remember" />
                      <Label htmlFor="phone-remember" className="text-sm">
                        Remember me for 30 days
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="social">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Sign in using your social media account
                    </p>
                    <div className="grid gap-2">
                      <Button variant="outline" className="w-full">
                        <Facebook className="mr-2 h-4 w-4" />
                        Continue with Facebook
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Continue with Google
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        Continue with Apple
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
