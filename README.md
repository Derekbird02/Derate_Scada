using PureCloudPlatform.Client.V2.Api;
using PureCloudPlatform.Client.V2.Client;
using PureCloudPlatform.Client.V2.Model;

namespace DOC.Data
{
    public class DOCData
    {
        private string clientId = "YOUR_CLIENT_ID";
        private string clientSecret = "YOUR_CLIENT_SECRET";
        private string region = "us-east-1"; // use your region, e.g., us-west-2, eu-west-1, etc.

        public void OpenDd()
        {
            // Your existing logic here
        }

        private void Authenticate()
        {
            var apiClient = new ApiClient($"https://api.{region}.mypurecloud.com");
            Configuration.Default.ApiClient = apiClient;
            apiClient.PostToken(clientId, clientSecret);
        }

        public void MakeCall(string phoneNumber)
        {
            Authenticate();

            var api = new ConversationsApi();

            var callRequest = new CreateCallRequest
            {
                PhoneNumber = phoneNumber,
                CallFrom = "+11234567890",      // your verified caller ID number
                CallerId = "Rick",
                CallFlowId = "YOUR_CALL_FLOW_ID" // Flow with the TTS message
            };

            try
            {
                var result = api.PostConversationsCalls(callRequest);
                Console.WriteLine($"Call started, conversation ID: {result.Id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error making call: " + ex.Message);
            }
        }
    }
}