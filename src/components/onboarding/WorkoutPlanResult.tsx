
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';
import WorkoutPlanDisplay from '@/components/WorkoutPlanDisplay';
import { WorkoutPlan } from '@/data/workoutPlans';

interface WorkoutPlanResultProps {
  workoutPlan: WorkoutPlan;
  personalizedMessage: string;
}

const WorkoutPlanResult = ({ workoutPlan, personalizedMessage }: WorkoutPlanResultProps) => {
  const navigate = useNavigate();
  const dashboardButtonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to make the button visible
    if (dashboardButtonRef.current) {
      setTimeout(() => {
        dashboardButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 500);
    }
  }, []);

  const goToDashboard = () => {
    console.log("[TrainGO] Navegando para o dashboard com plano:", workoutPlan);
    // Navegar para o dashboard após o onboarding
    navigate('/dashboard', { replace: true });
  }

  return (
    <>
      <WorkoutPlanDisplay 
        plan={workoutPlan}
        personalizedMessage={personalizedMessage}
      />
      
      <div className="mt-10 mb-28 pb-4 text-center" ref={dashboardButtonRef}>
        <Button 
          onClick={goToDashboard}
          rightIcon={<ArrowRight />}
          fullWidth
        >
          Ir para o Dashboard
        </Button>
      </div>
    </>
  );
};

export default WorkoutPlanResult;
