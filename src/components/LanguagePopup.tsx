import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useLanguage, Language } from '@/context/LanguageContext';

const languages: { code: Language; name: string; flagUrl: string }[] = [
  { 
    code: 'uz', 
    name: "O'zbekcha", 
    flagUrl: 'https://flagcdn.com/w40/uz.png'
  },
  { 
    code: 'ru', 
    name: 'Русский', 
    flagUrl: 'https://flagcdn.com/w40/ru.png'
  },
  { 
    code: 'en', 
    name: 'English', 
    flagUrl: 'https://flagcdn.com/w40/gb.png'
  },
];

const LanguagePopup = () => {
  const { showLanguagePopup, setLanguage, setShowLanguagePopup } = useLanguage();

  return (
    <Dialog open={showLanguagePopup} onOpenChange={setShowLanguagePopup}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        <div className="p-6 pb-4 text-center">
          <h2 className="text-lg font-semibold">
            Tilni tanlang / Выберите язык / Select Language
          </h2>
        </div>
        <div className="px-4 pb-6 space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-accent transition-all duration-200"
            >
              <img 
                src={lang.flagUrl} 
                alt={lang.name}
                className="w-8 h-6 object-cover rounded shadow-sm"
              />
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguagePopup;
