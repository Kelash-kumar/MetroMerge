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

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Sign up for MetroMerge to manage your bookings and get exclusive deals
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
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter your full name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="phone">
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone-name">Full Name</Label>
                      <Input id="phone-name" placeholder="Enter your full name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input id="phone-number" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone-password">Password</Label>
                      <Input id="phone-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone-confirm-password">Confirm Password</Label>
                      <Input id="phone-confirm-password" type="password" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="phone-terms" />
                      <Label htmlFor="phone-terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="social">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Sign up using your social media account
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
                    <div className="text-center text-sm">
                      By continuing, you agree to our{" "}
                      <Link href="/terms" className="text-primary underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary underline">
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary underline">
                  Sign in
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
