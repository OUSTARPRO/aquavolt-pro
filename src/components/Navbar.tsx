import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { translations } from "@/lib/translations";
import {
  Menu,
  X,
  Zap,
  Globe,
  LogOut,
  Shield,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { language, toggleLanguage, dir } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const T = translations[language];

  const navLinks = [
    { label: T.home, href: "/" },
    { label: T.services, href: isHome ? "#services" : "/#services" },
    { label: T.gallery, href: isHome ? "#gallery" : "/#gallery" },
    { label: T.catalogue, href: "/catalogue", highlight: true },
    { label: T.quote, href: "/devis" },
    { label: T.contact, href: isHome ? "#contact" : "/#contact" },
  ];

  const isAdmin = user?.role === "admin";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-emerald-500/20"
          : "bg-transparent"
      }`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Aqua<span className="text-emerald-400">Volt</span>
              <span className="text-teal-300 text-sm font-medium ml-0.5">
                Pro
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.highlight ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-3 py-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors rounded-md hover:bg-violet-500/10 flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors rounded-md hover:bg-white/5"
                >
                  {link.label}
                </a>
              )
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors rounded-md hover:bg-emerald-500/10 flex items-center gap-1"
              >
                <Shield className="w-3.5 h-3.5" />
                {T.admin}
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-slate-300 hover:text-emerald-400 hover:bg-white/5 gap-1.5"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold">
                {language === "fr" ? "AR" : "FR"}
              </span>
            </Button>

            <Link to="/devis">
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25"
              >
                <MessageSquare className="w-4 h-4 mr-1.5" />
                {T.quote}
              </Button>
            </Link>

            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-slate-300 hover:text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-1" />
                {T.logout}
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                >
                  {T.login}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-xl border-t border-emerald-500/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) =>
              link.highlight ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-violet-400 hover:bg-violet-500/10 rounded-md"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded-md"
                >
                  {link.label}
                </a>
              )
            )}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 rounded-md"
              >
                {T.admin}
              </Link>
            )}
            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-slate-300 hover:text-emerald-400"
              >
                <Globe className="w-4 h-4 mr-1" />
                {language === "fr" ? "العربية" : "Français"}
              </Button>
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-slate-300 hover:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  {T.logout}
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-500/30 text-emerald-400"
                  >
                    {T.login}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
