import { Mail } from "lucide-react";
import { GenericInputs } from "../atoms/Inputs";

const InputFieldLE = ({ inputType }: { inputType: "email" | "password" }) => {
  return (
    <div className="mb-12 rounded-md border border-primary-300 bg-primary-50 p-4 w-10/12 mx-auto">
      <h3 className="text-2xl font-semibold mb-6">
        Input Field with Label & Error
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {inputType === "email" ? (
          <div id="email">
            <div className="relative grid gap-y-3">
              <Mail
                className="absolute left-3 bottom-3 w-5 h-5
                text-slate-400"
              />
              <label className="capitalize font-semibold pl-1" htmlFor="email">
                email address
              </label>
              <GenericInputs
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
              />
            </div>
            <p className="pl-1 text-sm text-slate-500 mt-2">
              We will never share your email.
            </p>
          </div>
        ) : inputType === "password" ? (
          <div id="password">
            <label
              className="capitalize font-semibold pl-1 text-destructive"
              htmlFor="password"
            >
              password
            </label>
            <GenericInputs
              id="password"
              type="password"
              name="password"
              className="border border-destructive focus:border-2 focus-visible:border-destructive"
            />
            <p
              data-slot="form-message"
              className="text-destructive text-sm mt-2.5"
            >
              Password must be at least 8 characters.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputFieldLE;
