import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import { AlertCircle, Shield } from 'lucide-react';
import { login } from '@/utils/authUtils';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { navigateToDashboard } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      // Use the enhanced login function
      const user = login(loginEmail, loginPassword);
      
      if (user) {
        toast.success("Login successful!");
        navigateToDashboard();
      } else {
        setErrorMessage("Invalid email or password");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  // Handle registration submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Validate form
    if (!name || !registerEmail || !registerPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (registerPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // In a real implementation, this would connect to a backend
    setTimeout(() => {
      // Mock registration
      localStorage.setItem('user', JSON.stringify({
        email: registerEmail,
        name: name,
        isLoggedIn: true,
        role: 'user'
      }));
      
      toast.success("Account created successfully!");
      navigateToDashboard();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Tabs defaultValue={isLoginPage ? "login" : "register"}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Login to Your Account</CardTitle>
                        <CardDescription>
                          Enter your email and password to access your account
                        </CardDescription>
                      </div>
                      <Shield className="h-5 w-5 text-paint-blue" />
                    </div>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    {errorMessage && (
                      <div className="mx-6 -mt-2 mb-4 bg-red-50 p-3 rounded-md text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        {errorMessage}
                      </div>
                    )}
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="johndoe@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <a 
                            href="/forgot-password" 
                            className="text-sm text-paint-blue hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>
                      Register to save your color choices and get personalized services
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleRegister}>
                    {errorMessage && (
                      <div className="mx-6 -mt-2 mb-4 bg-red-50 p-3 rounded-md text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        {errorMessage}
                      </div>
                    )}
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="johndoe@example.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input 
                          id="register-password" 
                          type="password"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center text-paint-gray">
              <p>By signing up, you agree to our</p>
              <div className="flex justify-center gap-2 mt-1">
                <a href="/terms" className="text-paint-blue hover:underline">Terms of Service</a>
                <span>&</span>
                <a href="/privacy" className="text-paint-blue hover:underline">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Auth;
