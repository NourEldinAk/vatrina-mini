import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const steps = ['معلومات التواصل', 'العنوان', 'الشحن', 'الدفع'];

const Steps = forwardRef((props, ref) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  useImperativeHandle(ref, () => ({
    handleNext() {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  }));

  const isStepOptional = (step) => {
    // Define optional steps if needed
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if (props.onStepChange) {
      props.onStepChange(activeStep); 
    }
  }, [activeStep, props]);


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">اختياري</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel sx={{ gap: '10px' }} {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            تم تأكيد الشراء
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>اعادة تعبئة النماذج</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack} 
              sx={{ mr: 1 ,color:'#e2bc6a',fontWeight:'bold',marginTop:'6px' ,fontSize:'1.6rem',gap:"9px" }}
              
            >
              {activeStep !== 0 ? (
                  <>
                  <FontAwesomeIcon icon={faArrowRight} />
                  {steps[activeStep-1]}
                </>

              ):(<div></div>)}

            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {/* <Button onClick={() => ref.current.handleNext()}> Exposed handleNext via ref
              {activeStep === steps.length - 1 ? 'الانتهاء' : 'التالي'}
            </Button> */}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
});

Steps.displayName = "Steps";

export default Steps;
