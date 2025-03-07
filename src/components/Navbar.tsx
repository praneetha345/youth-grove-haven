
import { useState } from 'react';
import { Menu, X, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-well-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">YW</span>
              </div>
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-well-gradient">Youth Well-Being</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-slate-700 hover:text-well-blue transition-colors">Dashboard</a>
            <a href="#mental-health" className="text-slate-700 hover:text-well-blue transition-colors">Mental Health</a>
            <a href="#career" className="text-slate-700 hover:text-well-blue transition-colors">Career Growth</a>
            <a href="#digital-detox" className="text-slate-700 hover:text-well-blue transition-colors">Digital Detox</a>
            <a href="#community" className="text-slate-700 hover:text-well-blue transition-colors">Community</a>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5 text-slate-600" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Achievements</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3 animate-fade-in">
            <a href="#" className="block py-2 text-slate-700 hover:text-well-blue transition-colors">Dashboard</a>
            <a href="#mental-health" className="block py-2 text-slate-700 hover:text-well-blue transition-colors">Mental Health</a>
            <a href="#career" className="block py-2 text-slate-700 hover:text-well-blue transition-colors">Career Growth</a>
            <a href="#digital-detox" className="block py-2 text-slate-700 hover:text-well-blue transition-colors">Digital Detox</a>
            <a href="#community" className="block py-2 text-slate-700 hover:text-well-blue transition-colors">Community</a>
            <div className="pt-4 flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5 text-slate-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5 text-slate-600" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
