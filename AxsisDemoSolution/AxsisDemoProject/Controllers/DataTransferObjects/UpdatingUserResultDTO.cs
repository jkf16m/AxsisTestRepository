namespace AxsisDemoProject.Controllers.DataTransferObjects
{
    public class UpdatingUserResultDTO
    {
        public UpdatingUserResultDTO() { }
        public bool BothPasswordsMatched { get; set; }
        public bool ShouldBeUpdated { get; set; }

        public bool IsPasswordValid { get; set; }

        public bool WasPasswordEncrypted { get; set; }
    }
}
