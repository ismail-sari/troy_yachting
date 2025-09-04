// Translations are embedded directly to avoid fetch() issues when running from file:// protocol
const translations = {
  "en": {
    "html_lang": "en",
    "title": "Troy Yachting — Yacht Manufacturing & Marine Services",
    "meta_description": "Troy Yachting offers luxury yacht manufacturing and comprehensive marine services. We are here to design and build the yacht of your dreams.",
    "og_description": "Luxury yacht manufacturing and comprehensive marine services.",
    "skip_link": "Skip to main content",
    "logo_aria": "Troy Yachting Homepage",
    "lang_select_label": "Select Language",
    "nav_about": "About Us",
    "nav_dreams": "Our Dreams",
    "nav_contact": "Contact Us",
    "card_manufacturing": "Yacht Manufacturing",
    "card_services": "Marine Services",
    "alt_manufacturing": "A luxury yacht in a manufacturing hangar.",
    "alt_services": "A modern yacht cruising at speed on the sea.",
    "section_about_title": "About Us",
    "section_about_content": "With years of experience in the maritime industry, Troy Yachting combines traditional craftsmanship with modern technology to create unparalleled yachts. Our passion for the sea and commitment to quality drive every project we undertake.",
    "section_dreams_title": "Our Dreams",
    "section_dreams_content": "We dream of pushing the boundaries of yacht design and engineering. Our goal is to build vessels that are not only luxurious and high-performing but also sustainable and in harmony with the ocean environment.",
    "section_contact_title": "Contact Us",
    "section_contact_content": "Ready to start your journey? Contact us to discuss your vision. We are excited to help you bring your dream yacht to life. Reach out via email at info@troyyachting.com or visit us at our shipyard.",
    "footer_copyright": "© 2025 Troy Yachting — all rights reserved."
  },
  "tr": {
    "html_lang": "tr",
    "title": "Troy Yachting — Yat Üretimi ve Denizcilik Hizmetleri",
    "meta_description": "Troy Yachting, lüks yat üretimi ve kapsamlı denizcilik hizmetleri sunar. Hayallerinizdeki yatı tasarlamak ve inşa etmek için buradayız.",
    "og_description": "Lüks yat üretimi ve kapsamlı denizcilik hizmetleri.",
    "skip_link": "Ana İçeriğe Geç",
    "logo_aria": "Troy Yachting Ana Sayfa",
    "lang_select_label": "Dil Seçin",
    "nav_about": "Hakkımızda",
    "nav_dreams": "Hayallerimiz",
    "nav_contact": "Bize Ulaşın",
    // Fix: Corrected Turkish translations.
    "card_manufacturing": "Yat Üretimi",
    "card_services": "Denizcilik Hizmetleri",
    "alt_manufacturing": "Üretim hangarında lüks bir yat.",
    "alt_services": "Denizde hızla ilerleyen modern bir yat.",
    "section_about_title": "Hakkımızda",
    "section_about_content": "Denizcilik sektöründeki yılların deneyimiyle Troy Yachting, geleneksel işçiliği modern teknolojiyle birleştirerek eşsiz yatlar yaratır. Deniz tutkumuz ve kaliteye olan bağlılığımız, üstlendiğimiz her projeye yön verir.",
    "section_dreams_title": "Hayallerimiz",
    "section_dreams_content": "Yat tasarımı ve mühendisliğinin sınırlarını zorlamayı hayal ediyoruz. Amacımız sadece lüks ve yüksek performanslı değil, aynı zamanda sürdürülebilir ve okyanus çevresiyle uyumlu tekneler inşa etmektir.",
    "section_contact_title": "Bize Ulaşın",
    "section_contact_content": "Yolculuğunuza başlamaya hazır mısınız? Vizyonunuzu görüşmek için bizimle iletişime geçin. Hayalinizdeki yatı hayata geçirmenize yardımcı olmaktan heyecan duyuyoruz. Bize info@troyyachting.com adresinden e-posta ile ulaşın veya tersanemizde bizi ziyaret edin.",
    "footer_copyright": "© 2025 Troy Yachting — tüm hakları saklıdır."
  }
};


document.addEventListener('DOMContentLoaded', () => {

    const langSelect = document.getElementById('lang-select') as HTMLSelectElement;
    const supportedLangs = ['en', 'tr'];
    const defaultLang = 'tr';

    const setupNavigation = (): void => {
        const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
        const menuToggle = document.getElementById('menu-toggle') as HTMLInputElement;

        if (!menuToggle) return;

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuToggle.checked) {
                    menuToggle.checked = false;
                }
            });
        });
    };

    // Fix: Added types for parameters and return values.
    const applyTranslations = (lang: string): void => {
        if (!translations[lang]) {
            console.error(`Translations for '${lang}' not found.`);
            return;
        }

        document.documentElement.lang = lang;
        if (langSelect) {
            langSelect.value = lang;
        }

        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = (element as HTMLElement).dataset.i18nKey;
            const attr = (element as HTMLElement).dataset.i18nAttr;
            const translation = translations[lang][key];

            if (translation) {
                if (attr) {
                    element.setAttribute(attr, translation);
                } else {
                    element.textContent = translation;
                }
            }
        });
    };

    // Fix: Added return type.
    const getInitialLanguage = (): string => {
        const storedLang = localStorage.getItem('lang');
        if (storedLang && supportedLangs.includes(storedLang)) {
            return storedLang;
        }
        const browserLang = navigator.language.split('-')[0];
        if (supportedLangs.includes(browserLang)) {
            return browserLang;
        }
        return defaultLang;
    };

    // Determine and set the initial language
    const initialLang = getInitialLanguage();
    applyTranslations(initialLang);
    
    // Listen for language changes
    if (langSelect) {
        langSelect.addEventListener('change', () => {
            const newLang = langSelect.value;
            localStorage.setItem('lang', newLang);
            applyTranslations(newLang);
        });
    }
    
    // Setup other UI interactions
    setupNavigation();
});

// Fix: Convert this file to a module to prevent global scope pollution and the variable redeclaration error.
export {};
