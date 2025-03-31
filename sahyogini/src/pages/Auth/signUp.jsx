import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("entrepreneur");

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container relative flex flex-1 items-center justify-center px-4 py-12 md:px-8">
        <a
          href="/"
          className="absolute left-4 top-4 flex items-center text-sm font-medium text-gray-600 hover:text-primary md:left-8 md:top-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </a>

        <div className="grid w-full max-w-[1200px] grid-cols-1 overflow-hidden rounded-xl shadow-lg md:grid-cols-2">
          <div className="relative hidden md:block">
            <img
              src="/wsign.jpg?height=600&width=600"
              alt="Rural women entrepreneur"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-primary/30" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="mb-2 text-2xl font-bold">Join Sahyogini</h2>
              <p>Create an account to connect with investors, access funding, and grow your business.</p>
            </div>
          </div>

          <Card className="border-0 shadow-none">
            <CardHeader className="space-y-1 pt-8">
              <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
              <CardDescription>Create an account to get started with Sahyogini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup defaultValue={userType} onChange={(e) => setUserType(e.target.value)} className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="entrepreneur" id="entrepreneur" className="peer sr-only" />
                  <Label htmlFor="entrepreneur" className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary">
                    <span className="mb-2 font-medium">Entrepreneur</span>
                    <span className="text-xs text-gray-500">I want to grow my business</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="investor" id="investor" className="peer sr-only" />
                  <Label htmlFor="investor" className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary">
                    <span className="mb-2 font-medium">Investor</span>
                    <span className="text-xs text-gray-500">I want to invest in women entrepreneurs</span>
                  </Label>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter your first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter your last name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password" required />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referral">Referral Code (Optional)</Label>
                <Input id="referral" placeholder="Enter referral code if you have one" />
              </div>

              <Button className="w-full bg-primary text-white hover:bg-primary/90">Create Account</Button>

              <div className="text-center text-sm">
                Already have an account? <a href="/login" className="font-medium text-primary hover:underline">Log in</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
