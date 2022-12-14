import gmail from "../../gmail_custom_oauth.app.mjs";
import googleCloud from "../../../google_cloud/google_cloud.app.mjs";

const docLink = "https://developers.google.com/gmail/api/reference/rest/v1/users.settings.sendAs/patch";

export default {
  key: "gmail_custom_oauth-update-signature",
  name: "Update Signature",
  description: `Update the signature for a specific email address. [See the docs](${docLink})`,
  version: "0.0.2",
  type: "action",
  props: {
    gmail,
    googleCloud,
    signature: {
      type: "string",
      label: "Signature",
      description: "The new signature.",
    },
    email: {
      type: "string",
      label: "Email",
      description: "The email address that will have the signature updated. Leave blank for primary address.",
      optional: true,
    },
  },
  async run({ $ }) {
    if (!this.email) this.email = (await this.gmail.userInfo()).email;
    /**
     * Get Service Account credentials from connected Google Cloud account
     * Service Account needs to have domain-wide delegation enabled
    */
    const credentials = this.googleCloud.authKeyJson();
    const response = await this.gmail.updateSignature(credentials, this.signature, this.email);
    $.export("$summary", "Successfully updated signature");
    return response;
  },
};
