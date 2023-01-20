namespace AxsisDemoProject.Controllers.DataTransferObjects
{
    public class AddingUserResultDTO
    {
        public AddingUserResultDTO()
        {
        }

        public bool EmailAlreadyUsed { get; set; }
        public bool IdRepeated { get; set; }
        public bool ValidEmail { get; set; }
        public bool ValidPassword { get; set; }
        public bool ShouldBeAdded { get; set; }
    }
}
