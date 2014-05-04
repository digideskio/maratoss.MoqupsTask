namespace Moqups.App.Exceptions
{
    public class FriendlyUserErrorMessage
    {
        public FriendlyUserErrorMessage(string title, string message, string conclusions)
        {
            Title = title;
            Message = message;
            Conclusions = conclusions;
        }

        public FriendlyUserErrorMessage()
        {
        }

        public string Title { get; set; }
        public string Message { get; set; }
        public string Conclusions { get; set; }
    }
}