"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiStepProgressBar from "@/components/organisms/Multi-stepProgressBar";
import FirstPage from "../pages/FirstPage";
import SecondPage from "../pages/SecondPage";
import SubmitPage from "../pages/SubmitPage";
import ButtonWithIcon from "../molecules/ButtonWithIcon";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Gender,
  personalInfoSchema,
  PersonalInfoSchemaType,
  preferencesSchema,
  PreferencesSchemaType,
} from "@/lib/utils";

type StepperFormData = Partial<PersonalInfoSchemaType & PreferencesSchemaType>;

const ChallangeLayout = () => {
  const [formData, setFormData] = React.useState<StepperFormData>({});
  const [step, setStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const personalInfoForm = useForm<PersonalInfoSchemaType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: Gender.Male,
      country: "",
      age: 18,
    },
  });

  const preferencesForm = useForm<PreferencesSchemaType>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      category: "",
      interests: [],
      avatar: null,
    },
  });

  const updateFormData = React.useCallback((values: StepperFormData) => {
    setFormData((prev) => ({ ...prev, ...values }));
  }, []);

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (step === 0) {
      personalInfoForm.handleSubmit((values) => {
        updateFormData(values);
        setStep(1);
      })();
      return;
    }

    if (step === 1) {
      preferencesForm.handleSubmit((values) => {
        updateFormData(values);
        setStep(2);
      })();
    }
  };

  const handleReset = () => {
    personalInfoForm.reset();
    preferencesForm.reset();
    setFormData({});
    setStep(0);
  };

  return (
    <section className="bg-secondary-100 pt-18 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <MultiStepProgressBar
        currentStep={step}
        className="bg-transparent border-none"
      />
      <div className="bg-white rounded-xl p-12 shadow-subtle max-w-[832px] mx-auto">
        {step === 0 && <FirstPage form={personalInfoForm} />}
        {step === 1 && <SecondPage form={preferencesForm} />}
        {step === 2 && (
          <SubmitPage
            openState={open}
            setOpen={setOpen}
            data={formData}
            onReset={handleReset}
          />
        )}
        <div className="flex mt-4 justify-between items-center w-full">
          <ButtonWithIcon
            place="before"
            icon={<ChevronLeft />}
            className={`px-6 py-6 border bg-white border-slate-300 rounded-lg hover:bg-slate-50 font-medium flex items-center gap-2 text-slate-800 ${
              step === 0 ? "opacity-0 pointer-events-none" : ""
            }`}
            content="Back"
            onClick={step === 0 ? undefined : handleBack}
          />

          {step < 2 && (
            <ButtonWithIcon
              className="py-6"
              icon={<ChevronRight />}
              content="Next Step"
              onClick={handleNext}
            />
          )}
          {step === 2 && (
            <ButtonWithIcon
              place="before"
              className="py-6"
              icon={<CheckCircle />}
              content="Submit User"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ChallangeLayout;
