import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { resendEmailConfirmation } from "../../_actions/auth.actions";

function ResendEmailConfirmationPage() {
  return (
    <div className="flex flex-col items-center space-y-5">
      <h1>Resend Email Confirmation</h1>
      <form className="flex flex-col space-y-5">
        <Input name="email" type="email" placeholder="Email" />
        <SubmitButton formAction={resendEmailConfirmation}>Resend</SubmitButton>
      </form>
    </div>
  );
}

export default ResendEmailConfirmationPage;
