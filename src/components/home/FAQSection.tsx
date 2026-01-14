import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/context/LanguageContext';

// FAQ items - each has a question and answer key for translations
const faqItems = [
  { questionKey: 'faqDeliveryQ', answerKey: 'faqDeliveryA' },
  { questionKey: 'faqPaymentQ', answerKey: 'faqPaymentA' },
  { questionKey: 'faqReturnQ', answerKey: 'faqReturnA' },
  { questionKey: 'faqWarrantyQ', answerKey: 'faqWarrantyA' },
  { questionKey: 'faqInstallmentQ', answerKey: 'faqInstallmentA' },
  { questionKey: 'faqTrackingQ', answerKey: 'faqTrackingA' },
];

const FAQSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {t('faq')}
        </h2>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {t(item.questionKey)}
                </AccordionTrigger>
                <AccordionContent>
                  {t(item.answerKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
