namespace AxsisDemoProject.Controllers.Domain.UserSection.Service.Results
{
    public class AddingUserResult
    {
        public readonly bool emailAlreadyUsed;
        public readonly bool idRepeated;
        public readonly bool validEmail;
        public readonly bool validPassword;
        public readonly bool shouldBeAdded;

        public AddingUserResult(
            bool emailAlreadyUsed,
            bool idRepeated,
            bool validEmail,
            bool validPassword
            )
        {
            this.emailAlreadyUsed = emailAlreadyUsed;
            this.idRepeated = idRepeated;
            this.validEmail = validEmail;
            this.validPassword = validPassword;

            shouldBeAdded = (
                emailAlreadyUsed == false
                && idRepeated == false
                && validEmail == true
                && validPassword == true
                );
        }
    }
}
