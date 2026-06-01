import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.notify("how-to-Pi course extension loaded.", "info");
  });

  pi.on("tool_execution_end", async (event, ctx) => {
    if (event.isError) {
      ctx.ui.notify(`Tool failed: ${event.toolName}`, "warn");
    }
  });

  pi.registerCommand("course-status", {
    description: "Show how-to-Pi extension status",
    handler: async (_args, ctx) => {
      const sessionName = pi.getSessionName() || "unnamed";
      ctx.ui.notify(`Course extension active. Session: ${sessionName}`, "info");
    },
  });

  pi.registerTool({
    name: "course_echo",
    label: "Course Echo",
    description: "Echo a short message for extension learning exercises.",
    parameters: Type.Object({
      message: Type.String({ description: "Message to echo" }),
    }),
    async execute(_toolCallId, params) {
      return {
        content: [{ type: "text", text: `Echo: ${params.message}` }],
        details: { length: params.message.length },
      };
    },
  });
}
