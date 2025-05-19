
import { ReactNode } from 'react';
import Logo from '@/components/Logo';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

const OnboardingLayout = ({ children, currentStep, totalSteps }: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Logo size="small" />
      </header>

      {/* Progress bar - Only show if steps are provided */}
      {currentStep !== undefined && totalSteps !== undefined && (
        <div className="w-full px-4 mt-2">
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-traingo-primary h-2 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="text-sm text-gray-400 text-center mt-2">
            Etapa {Math.min(currentStep + 1, totalSteps)} de {totalSteps} (
            {Math.round((currentStep / totalSteps) * 100)}%)
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;
