import { TypeCode } from "@/types/global";

type TermType = 'T' | 'M' | 'G';

// Interface for individual term translations
interface TermTranslations {
  [key: string]: string;
}
interface LanguageTerms {
  vi: TermTranslations;
  en: TermTranslations;
}
interface Terms {
  [key: string]: LanguageTerms;
}
interface TermsListProps {
  terms: Terms;
  type: TermType;
}

const TermsList: React.FC<TermsListProps> = ({ terms, type }) => {
  const selectedTerms = terms[type];
  const entries = Object.entries(selectedTerms.vi);

  return (
    <div className="absolute lg:w-[80%]  w-[80%] top-[28%] sm:px-4 412:px-3 px-2">
      <div className="grid grid-cols-2 lg:gap-1">
        {/* Vietnamese Column */}
        <div className="col-span-1 md:pr-1">
          {entries.map(([key, viText]) => (
            <h3
              key={`vi-${key}`}
             className={`text-black sm:text-[12px] ${type !== TypeCode.GIFT_VOUCHER ? 
              'text-[7px]' : 'text-[6px] leading-tight'
             } font-medium border-b `}
            >
              {viText}
            </h3>
          ))}
        </div>
        
        {/* English Column */}
        <div className="col-span-1 md:pr-1">
          {entries.map(([key]) => (
            <h3
              key={`en-${key}`}
              className={`text-black sm:text-[12px] ${type !== TypeCode.GIFT_VOUCHER ? 
                'text-[7px]' : 'text-[6px] leading-tight'
               } font-medium border-b`}
            >
              {selectedTerms.en[key]}
            </h3>
          ))}
        </div>
      </div>
    </div>
   
  );
};
export default TermsList;