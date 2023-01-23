namespace AxsisDemoProject.Controllers.Domain.UserSection.Service.Results
{
    public class UpdatingUserResult
    {
        public readonly bool bothPasswordsMatched;
        public readonly bool shouldBeUpdated;
        public readonly bool wasPasswordEncrypted;
        public readonly bool isPasswordValid;

        public UpdatingUserResult(bool bothPasswordsMatched, bool wasPasswordEncrypted, bool isPasswordValid)
        {
            this.bothPasswordsMatched = bothPasswordsMatched;
            this.wasPasswordEncrypted = wasPasswordEncrypted;
            this.isPasswordValid= isPasswordValid;
            this.shouldBeUpdated = (this.bothPasswordsMatched == true && this.wasPasswordEncrypted == true && this.isPasswordValid == true);
        }
    }
}
