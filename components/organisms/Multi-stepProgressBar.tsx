"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import StepCircle from "../atoms/StepCircle";

// Each step only needs a label for display.
type Step = {
  label: string;
};

// Props that the MultiStepProgressBar can receive.
type MultiStepProgressBarProps = {
  steps?: Step[];
  currentStep?: number;
  className?: string;
};

// Default steps if the parent doesn’t pass any.
const defaultSteps: Step[] = [
  { label: "Personal Info" },
  { label: "Preferences" },
  { label: "Review" },
];

// Main progress bar component.
const MultiStepProgressBar = ({
  steps = defaultSteps,
  currentStep = 0,
  className,
}: MultiStepProgressBarProps) => {
  // Clamp currentStep so it stays within 0 and steps.length - 1.
  const safeCurrent = Math.min(Math.max(currentStep, 0), steps.length - 1);

  // Calculate progress as a percentage.
  const progressPercent = ((safeCurrent + 1) / Math.max(steps.length, 1)) * 100;

  return (
    <section
      className={cn(
        "rounded-md border border-primary-300 bg-primary-50 p-4 w-10/12 mx-auto",
        className
      )}
      aria-label="Progress through multi-step form"
    >
      {/* <h3 className="text-2xl font-semibold mb-6">Multi-step Progress Bar</h3> */}
      <div className="max-w-3xl mx-auto">
        {/* Row that holds all step circles and connecting lines. */}
        <div className="flex items-center justify-between mb-8" role="list">
          {steps.map((step, index) => {
            // A step is completed if its index is less than the current.
            const isCompleted = index < safeCurrent;
            // A step is active if its index equals the current.
            const isActive = index === safeCurrent;

            // Text status used for styling and aria labels.
            const status = isCompleted
              ? "completed"
              : isActive
              ? "active"
              : "pending";
            const isLast = index === steps.length - 1;
            // Render a StepItem for each step.
            return (
              // key={step.label}
              <React.Fragment key={step.label}>
                <StepCircle
                  circleContent={index}
                  circleLabel={step.label}
                  circleState={status}
                  size="sm"
                />
                {!isLast ? (
                  <div
                    aria-hidden="true" // Decorative only, not read by screen readers.
                    className={cn(
                      "flex-1 h-1 mx-4", // Line fills leftover space between steps.
                      index < safeCurrent ? "bg-primary-600" : "bg-slate-200"
                    )}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
        <p className="text-center text-sm text-slate-600" role="status">
          Step {safeCurrent + 1} of {steps.length} -{" "}
          {Math.floor(progressPercent)}% complete
        </p>
      </div>
    </section>
  );
};

export default MultiStepProgressBar; // Export the component for use in other files.
