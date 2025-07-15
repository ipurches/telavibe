import { useState, useEffect } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TranslationContext, translations, type Language } from "@/lib/i18n";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Set document direction and language
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Update page title
    document.title = language === 'en' 
      ? 'TEL AVIBE Cyprus - Israeli & Greek Cultural Events'
      : 'TEL AVIBE Cyprus - אירועים תרבותיים ישראליים ויווניים';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'he' : 'en');
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationContext.Provider value={{ language, toggleLanguage, t }}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </TranslationContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
