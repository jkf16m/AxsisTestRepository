namespace AxsisDemoProject.Controllers.Domain.UserSection.Service.Results
{
    public class UpdatingUserResult
    {
        public readonly bool bothPasswordsMatched;
        public readonly bool shouldBeUpdated;
        public readonly bool wasPasswordEncrypted;

        public UpdatingUserResult(bool bothPasswordsMatched, bool wasPasswordEncrypted)
        {
            this.bothPasswordsMatched = bothPasswordsMatched;
            this.wasPasswordEncrypted = wasPasswordEncrypted;
            this.shouldBeUpdated = (this.bothPasswordsMatched == true && this.wasPasswordEncrypted == true);
        }
    }
}
