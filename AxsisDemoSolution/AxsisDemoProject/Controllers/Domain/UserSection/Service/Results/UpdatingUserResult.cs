namespace AxsisDemoProject.Controllers.Domain.UserSection.Service.Results
{
    public class UpdatingUserResult
    {
        public readonly bool bothPasswordsMatched;
        public readonly bool shouldBeUpdated;

        public UpdatingUserResult(bool bothPasswordsMatched)
        {
            this.bothPasswordsMatched = bothPasswordsMatched;
            this.shouldBeUpdated = (this.bothPasswordsMatched == true);
        }
    }
}
